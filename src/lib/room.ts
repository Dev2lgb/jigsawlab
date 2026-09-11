// 멀티 방 — Durable Object 하나가 방 하나. 상태(뭉치·잠금·플레이어)를 갖고 웹소켓으로 동기화. 절전(hibernation) API 사용
import { DurableObject } from 'cloudflare:workers';
import { gridFor, seeded, LIVE_ID, LIVE_PIECES } from './jigsaw';
import { WORK_BY_KEY, DAILY_POOL } from '../data/works';

// by = 지금 이 뭉치를 잡고 있는 사람. 상태에 같이 저장한다(절전으로 메모리가 날아가도 유지). 끊긴 사람의 점유는 holder() 가 자동으로 푼다
export interface RoomGroup { dx: number; dy: number; idx: number[]; by?: string; t?: number }
export interface RoomState { id: string; key: string; n: number; cols: number; rows: number; total: number; W: number; H: number; seed: number; groups: Record<string, RoomGroup>; locked: number[]; createdAt: number; doneAt?: number; lang: string; hostLeftAt?: number; dead?: boolean; live?: boolean; round?: number; lastAt?: number }
interface Player { id: string; nick: string; color: string; x?: number; y?: number }
type Att = { id: string; nick: string; color: string; photo?: boolean };
const COLORS = ['#e0245e', '#f0a71b', '#2f9e6b', '#3b5bff', '#a54cff', '#ff6a3d', '#0aa3b5', '#c2b31c'];
const MAX_PLAYERS = 8;
// ── 상설 공개 판 — 사이트가 굴리는 방 하나('live'). 아무도 만들지 않고 사라지지도 않으며, 한 판이 끝나면 다음 그림으로 이어진다
const LIVE_MAX = 16;        // 공개방 정원 (링크 초대 방은 MAX_PLAYERS)
const NEXT_WAIT = 25e3;     // 완성한 그림을 다 같이 보고 다음 판으로 넘어가기까지
const STALL = 7 * 86400e3;  // 이만큼 한 조각도 안 놓이면 미완인 채로 접고 다음 그림으로 (아무도 안 오는 판이 영영 남지 않게)
const HOLD_MAX = 90e3;      // 잡은 채 이만큼 가만히 있으면 점유를 푼다 — 공개방은 아무나 들어오므로
const HOST_GRACE = 45e3; // 사진 가진 사람이 모두 끊긴 뒤 방을 끝내기까지 기다리는 시간(잠깐 끊긴 것과 구분)
const rand32 = () => (Math.random() * 2 ** 32) >>> 0;
// 좌표는 정수로 반올림해 저장한다. 판 좌표가 이미지 픽셀 단위라 0.5px 차이는 보이지 않고,
// 1000조각 판은 뭉치가 많아 소수점을 그대로 두면 저장하는 상태가 몇 배로 불어난다
const num = (v: unknown, fb: number) => (Number.isFinite(+(v as number)) ? Math.round(+(v as number)) : fb);
const r0 = (v: unknown) => Math.round(+(v as number)) || 0;
/** 회차별 그림 — 후보를 한 바퀴 단위로 섞어 돌린다. 한 바퀴 안에서는 같은 그림이 두 번 나오지 않는다 */
function liveWork(round: number) {
  const n = DAILY_POOL.length, cycle = Math.floor(round / n), rnd = seeded((0x9e3779b9 ^ cycle) >>> 0);
  const idx = DAILY_POOL.map((_, i) => i);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return DAILY_POOL[idx[round % n]];
}

export class Room extends DurableObject {
  state: RoomState | null = null; saveT: ReturnType<typeof setTimeout> | null = null;
  async load() { if (!this.state) this.state = (await this.ctx.storage.get<RoomState>('state')) ?? null; return this.state; }
  scheduleSave() { if (this.saveT) return; this.saveT = setTimeout(() => { this.saveT = null; if (this.state) this.ctx.storage.put('state', this.state); }, 800); }
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url); let st = await this.load();
    const rid = url.pathname.match(/^\/api\/room\/([a-z0-9]{4,12})/)?.[1] ?? '';
    if (req.method === 'POST' && url.pathname.endsWith('/create')) {
      if (st) return Response.json({ id: st.id, exists: true });
      const b = await req.json<any>();
      // 내 사진 방: 사진은 서버에 오지 않고 크기만 받는다 (사진은 방장 브라우저 → 친구 브라우저 WebRTC 직접 전송)
      const w = b.key === 'photo' ? { key: 'photo', w: Math.round(Number(b.w)), h: Math.round(Number(b.h)) } : WORK_BY_KEY[b.key]; if (!w || !(w.w >= 50 && w.w <= 4000 && w.h >= 50 && w.h <= 4000)) return Response.json({ error: 'key' }, { status: 400 });
      const n = Math.max(6, Math.min(2000, Number(b.n) || 48)); const g = gridFor(n, w.w / w.h);
      // 혼자 하던 판을 가져온 경우: 같은 시드·격자에 잠긴 조각과 뭉치를 그대로, 트레이에 있던 조각은 흩뿌림
      const st0 = b.state && Number.isInteger(b.state.seed) && b.state.cols === g.cols && b.state.rows === g.rows ? b.state : null;
      const seed = st0 ? (st0.seed >>> 0) : rand32(); const total = g.cols * g.rows;
      let groups: Record<string, RoomGroup> = {}; let locked: number[] = [];
      if (st0) { const placed = new Set<number>(); locked = (st0.locked as number[]).filter((i) => Number.isInteger(i) && i >= 0 && i < total); locked.forEach((i) => placed.add(i)); const gs: Record<string, RoomGroup> = {};
        for (const sg of (st0.groups as { dx: number; dy: number; idx: number[] }[]) ?? []) { const idx = sg.idx.filter((i) => Number.isInteger(i) && i >= 0 && i < total && !placed.has(i)); if (!idx.length) continue; idx.forEach((i) => placed.add(i)); gs[String(idx[0])] = { dx: r0(sg.dx), dy: r0(sg.dy), idx }; }
        groups = gs; }
      this.state = { id: b.id, key: w.key, n, cols: g.cols, rows: g.rows, total, W: w.w, H: w.h, seed, groups, locked, createdAt: Date.now() - (st0 && Number.isFinite(st0.elapsed) ? Math.max(0, Math.min(st0.elapsed, 86400e3 * 7)) : 0), lang: String(b.lang || 'ko').slice(0, 2) };
      await this.ctx.storage.put('state', this.state); await this.ctx.storage.setAlarm(Date.now() + 48 * 3600e3);
      return Response.json({ id: this.state.id });
    }
    // 공개 판은 아무도 만들지 않는다 — 처음 두드리는 사람에게 첫 회차를 깔아 준다
    if (!st) { if (rid !== LIVE_ID) return Response.json({ error: 'no room' }, { status: 404 }); st = await this.startLive(0); }
    if (req.headers.get('upgrade') === 'websocket') {
      if (this.ctx.getWebSockets().length >= (st.live ? LIVE_MAX : MAX_PLAYERS)) return new Response('full', { status: 429 });
      const pair = new WebSocketPair(); const [client, server] = Object.values(pair);
      const id = Math.random().toString(36).slice(2, 8); const used = new Set(this.players().map((p) => p.color)); const color = COLORS.find((c) => !used.has(c)) ?? COLORS[Math.floor(Math.random() * COLORS.length)];
      const att: Att = { id, nick: '', color }; server.serializeAttachment(att); this.ctx.acceptWebSocket(server);
      return new Response(null, { status: 101, webSocket: client });
    }
    // hasPhoto: 지금 방 안에 사진을 가진 사람이 있는지(내 사진 방에서만 의미 있음). 없으면 새로 들어와도 사진을 받을 수 없다
    return Response.json({ id: st.id, key: st.key, photo: st.key === 'photo', hasPhoto: this.photoHere(), dead: !!st.dead, w: st.W, h: st.H, n: st.n, cols: st.cols, rows: st.rows, total: st.total, seed: st.seed, locked: st.locked.length, players: this.players().length, done: !!st.doneAt, createdAt: st.createdAt, lang: st.lang, live: !!st.live, round: st.round ?? 0 });
  }
  players(): Player[] { return this.ctx.getWebSockets().map((ws) => { const a = ws.deserializeAttachment() as Att; return { id: a.id, nick: a.nick, color: a.color }; }); }
  broadcast(msg: unknown, except?: WebSocket) { const s = JSON.stringify(msg); for (const ws of this.ctx.getWebSockets()) if (ws !== except) { try { ws.send(s); } catch {} } }
  /** 지금 붙어 있는 사람인지 */
  live(id?: string) { return !!id && this.ctx.getWebSockets().some((w) => (w.deserializeAttachment() as Att)?.id === id); }
  /** 이 뭉치를 잡고 있는 사람. 나갔거나 잡은 채 오래 가만히 있으면 점유를 푼다 —
   *  나간 사람의 점유가 남아 조각이 영영 안 움직이던 문제를 막고, 공개방에서 조각 하나를 붙들고 버티는 것도 저절로 풀린다 */
  holder(gr?: RoomGroup, g?: string) { if (!gr?.by) return undefined; const stale = !!gr.t && Date.now() - gr.t > HOLD_MAX; if (this.live(gr.by) && !stale) return gr.by; gr.by = undefined; gr.t = undefined; if (stale && g) this.broadcast({ t: 'release', g }); return undefined; }
  holderMap() { const o: Record<string, string> = {}; const st = this.state; if (!st) return o; for (const [g, gr] of Object.entries(st.groups)) { const h = this.holder(gr, g); if (h) o[g] = h; } return o; }
  photoHere(except?: WebSocket) { return this.ctx.getWebSockets().some((w) => w !== except && !!(w.deserializeAttachment() as Att)?.photo); }
  /** 서버와 판이 어긋났을 때: 이 사람만 전체 상태를 다시 받아 가게 한다 (조용히 무시하면 영영 어긋난 채로 남는다) */
  resync(ws: WebSocket) { try { ws.send('{"t":"resync"}'); } catch {} }
  initMsg(st: RoomState, att: Att) { return JSON.stringify({ t: 'init', state: st, you: att, players: this.players(), holders: this.holderMap(), hasPhoto: this.photoHere(), dead: !!st.dead }); }
  async webSocketMessage(ws: WebSocket, raw: string | ArrayBuffer) {
    const st = await this.load(); if (!st || typeof raw !== 'string') return; let m: any; try { m = JSON.parse(raw); } catch { return; }
    const att = ws.deserializeAttachment() as Att; const tol = Math.min(st.W / st.cols, st.H / st.rows) * 0.4;
    switch (m.t) {
      case 'nick': { const n = String(m.nick || '').trim().slice(0, 12); if (!n) return; att.nick = n; ws.serializeAttachment(att); this.broadcast({ t: 'nick', id: att.id, nick: n }); return; }
      case 'hello': { att.nick = String(m.nick || '').slice(0, 12) || `#${att.id.slice(0, 3)}`; att.photo = !!m.photo; ws.serializeAttachment(att); ws.send(this.initMsg(st, att)); this.broadcast({ t: 'join', p: { id: att.id, nick: att.nick, color: att.color } }, ws); if (att.photo) this.photoBack(ws); return; }
      case 'take': { const i = Number(m.g); if (!Number.isInteger(i) || i < 0 || i >= st.total || st.locked.includes(i) || Object.values(st.groups).some((gr) => gr.idx.includes(i))) { ws.send(JSON.stringify({ t: 'deny', g: String(i) })); return; } const g = String(i); st.groups[g] = { dx: r0(m.dx), dy: r0(m.dy), idx: [i], by: att.id, t: Date.now() }; this.broadcast({ t: 'take', id: att.id, g, dx: st.groups[g].dx, dy: st.groups[g].dy }, ws); this.scheduleSave(); return; }
      case 'untake': { const g = String(m.g); const gr = st.groups[g]; if (!gr || gr.idx.length !== 1) return; const h = this.holder(gr, g); if (h && h !== att.id) return this.resync(ws); delete st.groups[g]; this.broadcast({ t: 'untake', g }, ws); this.scheduleSave(); return; }
      case 'cur': this.broadcast({ t: 'cur', id: att.id, x: m.x, y: m.y }, ws); return;
      case 'grab': { const g = String(m.g); const gr = st.groups[g]; if (!gr) return; const h = this.holder(gr, g); if (h && h !== att.id) { ws.send(JSON.stringify({ t: 'deny', g })); return; } gr.by = att.id; gr.t = Date.now(); this.broadcast({ t: 'grab', id: att.id, g }, ws); return; }
      case 'mv': { const g = String(m.g); const gr = st.groups[g]; if (!gr) return; const h = this.holder(gr, g); if (h && h !== att.id) return; gr.by = att.id; gr.t = Date.now(); gr.dx = num(m.dx, gr.dx); gr.dy = num(m.dy, gr.dy); this.broadcast({ t: 'mv', g, dx: gr.dx, dy: gr.dy }, ws); return; }
      case 'drop': { const g = String(m.g); const gr = st.groups[g]; if (!gr) return; const h = this.holder(gr, g); if (h && h !== att.id) return this.resync(ws); gr.dx = num(m.dx, gr.dx); gr.dy = num(m.dy, gr.dy); gr.by = undefined; gr.t = undefined; this.broadcast({ t: 'drop', g, dx: gr.dx, dy: gr.dy }, ws); this.scheduleSave(); return; }
      // 붙이기·잠그기는 놓은 순간의 좌표를 같이 받는다. mv 는 40ms 마다라 서버 좌표가 조금 뒤처지는데,
      // 예전엔 그 뒤처진 좌표로 판정하다 조용히 거절되어 "한쪽은 맞춰졌는데 다른 쪽은 남의 손에 잡힌 채 굳는" 어긋남이 생겼다
      case 'merge': { const g = String(m.g), into = String(m.into); const A = st.groups[g], B = st.groups[into]; if (!A || !B || g === into) return; // 다른 사람이 이미 붙인 뒤 도착한 중복 요청
        const hA = this.holder(A, g); if (hA && hA !== att.id) return this.resync(ws);
        const ax = num(m.dx, A.dx), ay = num(m.dy, A.dy);
        if (Math.abs(ax - B.dx) > tol * 1.5 || Math.abs(ay - B.dy) > tol * 1.5) return this.resync(ws);
        B.idx.push(...A.idx); B.by = undefined; B.t = undefined; delete st.groups[g]; this.broadcast({ t: 'merge', g, into, dx: B.dx, dy: B.dy }); this.scheduleSave(); return; }
      case 'lock': { const g = String(m.g); const A = st.groups[g]; if (!A) return; const h = this.holder(A, g); if (h && h !== att.id) return this.resync(ws);
        const ax = num(m.dx, A.dx), ay = num(m.dy, A.dy);
        if (Math.abs(ax) > tol * 1.5 || Math.abs(ay) > tol * 1.5) return this.resync(ws);
        st.locked.push(...A.idx); delete st.groups[g]; st.lastAt = Date.now(); this.broadcast({ t: 'lock', g, idx: A.idx });
        // 공개 판은 완성해도 끝나지 않는다. 완성작을 잠깐 같이 보고 다음 그림으로 (알람은 아무도 안 남아 있어도 깨어난다)
        if (st.locked.length >= st.total && !st.doneAt) { st.doneAt = Date.now(); this.broadcast({ t: 'done', at: st.doneAt }); await this.countSolved(); if (st.live) { await this.ctx.storage.put('state', st); await this.ctx.storage.setAlarm(Date.now() + NEXT_WAIT); } }
        this.scheduleSave(); return; }
      case 'ping': ws.send('{"t":"pong"}'); return;
      // 상태 다시 받기 (사진을 늦게 받은 참가자가 판을 다시 맞출 때). 입장 알림은 다시 보내지 않음
      case 'sync': ws.send(this.initMsg(st, att)); return;
      // ── 내 사진 방: WebRTC 신호 중계. 서버는 sdp/ice 를 그대로 전달만 하고 사진은 보지 않는다
      case 'havephoto': att.photo = true; ws.serializeAttachment(att); this.photoBack(ws); return;
      case 'needphoto': { const holder = this.ctx.getWebSockets().find((w) => w !== ws && (w.deserializeAttachment() as Att)?.photo); if (!holder) { ws.send('{"t":"nophoto"}'); return; } try { holder.send(JSON.stringify({ t: 'needphoto', id: att.id })); } catch { ws.send('{"t":"nophoto"}'); } return; }
      case 'sig': { const to = String(m.to); const d = m.d; if (!d || typeof d !== 'object' || JSON.stringify(d).length > 20000) return; const dst = this.ctx.getWebSockets().find((w) => (w.deserializeAttachment() as Att)?.id === to); if (dst) try { dst.send(JSON.stringify({ t: 'sig', from: att.id, d })); } catch {} return; }
    }
  }
  /** 사이트 전체 완성 판 수 +1 (홈의 숫자). 판이 끝나는 곳은 여기 하나라 한 번만 — 전에는 접속자마다 /api/stats 를 올려 인원수만큼 부풀었다 */
  async countSolved() { const DB = (this.env as { DB?: D1Database }).DB; if (!DB) return; await DB.prepare("INSERT INTO stats (key, n) VALUES ('solved', 1) ON CONFLICT(key) DO UPDATE SET n = n + 1").run().catch(() => {}); }
  /** 사진 가진 사람이 (다시) 들어옴 — 끝난 것으로 표시했던 방을 되살린다 */
  photoBack(except?: WebSocket) { const st = this.state; if (!st || st.key !== 'photo') return; if (!st.hostLeftAt && !st.dead) return; st.hostLeftAt = 0; st.dead = false; this.ctx.storage.put('state', st); this.broadcast({ t: 'hostback' }, except); }
  /** 공개 판 한 회차 깔기 — 그림은 회차로 정해지고, 조각 수는 늘 1000 */
  async startLive(round: number) {
    const w = liveWork(round); const g = gridFor(LIVE_PIECES, w.w / w.h); const now = Date.now();
    const st: RoomState = { id: LIVE_ID, key: w.key, n: LIVE_PIECES, cols: g.cols, rows: g.rows, total: g.cols * g.rows, W: w.w, H: w.h, seed: rand32(), groups: {}, locked: [], createdAt: now, lang: 'ko', live: true, round, lastAt: now };
    this.state = st; if (this.saveT) { clearTimeout(this.saveT); this.saveT = null; }
    await this.ctx.storage.put('state', st); await this.ctx.storage.setAlarm(now + 6 * 3600e3);
    return st;
  }
  /** 다음 회차로 — 완성했거나(done) 너무 오래 멈춰 있어서. 방은 그대로 두고 판만 갈아 끼운다 */
  async rotate(done: boolean) {
    const prev = this.state; const st = await this.startLive((prev?.round ?? 0) + 1);
    this.broadcast({ t: 'next', state: st, done, prevKey: prev?.key ?? '' });
  }
  async webSocketClose(ws: WebSocket) { await this.dropPlayer(ws); }
  async webSocketError(ws: WebSocket) { await this.dropPlayer(ws); }
  async dropPlayer(ws: WebSocket) {
    const att = ws.deserializeAttachment() as Att | null; if (!att) return; const st = await this.load();
    if (st) for (const [g, gr] of Object.entries(st.groups)) if (gr.by === att.id) { gr.by = undefined; gr.t = undefined; this.broadcast({ t: 'release', g }); }
    this.broadcast({ t: 'leave', id: att.id });
    // 내 사진 방: 사진 가진 사람이 모두 나가면 아무도 사진을 받을 수 없다 → 남은 사람에게 바로 알리고, 잠깐 기다렸다 방을 끝낸다
    if (st && st.key === 'photo' && att.photo && !st.dead && !this.photoHere(ws)) { st.hostLeftAt = Date.now(); this.broadcast({ t: 'hostaway' }); await this.ctx.storage.put('state', st); await this.ctx.storage.setAlarm(Date.now() + HOST_GRACE); }
    else if (st) this.scheduleSave();
  }
  async alarm() {
    const st = await this.load(); if (!st) return;
    if (st.hostLeftAt) { const gone = st.key === 'photo' && !this.photoHere(); st.hostLeftAt = 0; if (gone) { st.dead = true; this.broadcast({ t: 'hostgone' }); } await this.ctx.storage.put('state', st); }
    // 공개 판: 완성했으면 다음 그림으로, 오래 멈춰 있어도 다음 그림으로. 어느 쪽이든 방 자체는 남는다
    if (st.live) {
      if (st.doneAt) return this.rotate(true);
      if (Date.now() - (st.lastAt ?? st.createdAt) > STALL) return this.rotate(false);
      await this.ctx.storage.setAlarm(Date.now() + 6 * 3600e3); return;
    }
    const idle = Date.now() - (st.doneAt ?? st.createdAt) > 47 * 3600e3 && this.ctx.getWebSockets().length === 0; if (idle) { await this.ctx.storage.deleteAll(); this.state = null; } else await this.ctx.storage.setAlarm(Date.now() + 24 * 3600e3);
  }
}

// 멀티 방 — Durable Object 하나가 방 하나. 상태(뭉치·잠금·플레이어)를 갖고 웹소켓으로 동기화. 절전(hibernation) API 사용
import { DurableObject } from 'cloudflare:workers';
import { gridFor } from './jigsaw';
import { WORK_BY_KEY } from '../data/works';

export interface RoomGroup { dx: number; dy: number; idx: number[] }
export interface RoomState { id: string; key: string; n: number; cols: number; rows: number; total: number; W: number; H: number; seed: number; groups: Record<string, RoomGroup>; locked: number[]; createdAt: number; doneAt?: number; lang: string }
interface Player { id: string; nick: string; color: string; x?: number; y?: number }
type Att = { id: string; nick: string; color: string };
const COLORS = ['#e0245e', '#f0a71b', '#2f9e6b', '#3b5bff', '#a54cff', '#ff6a3d', '#0aa3b5', '#c2b31c'];
const MAX_PLAYERS = 8;
const rand32 = () => (Math.random() * 2 ** 32) >>> 0;

export class Room extends DurableObject {
  state: RoomState | null = null; holders = new Map<string, string>(); saveT: ReturnType<typeof setTimeout> | null = null;
  async load() { if (!this.state) this.state = (await this.ctx.storage.get<RoomState>('state')) ?? null; return this.state; }
  scheduleSave() { if (this.saveT) return; this.saveT = setTimeout(() => { this.saveT = null; if (this.state) this.ctx.storage.put('state', this.state); }, 800); }
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url); const st = await this.load();
    if (req.method === 'POST' && url.pathname.endsWith('/create')) {
      if (st) return Response.json({ id: st.id, exists: true });
      const b = await req.json<any>(); const w = WORK_BY_KEY[b.key]; if (!w) return Response.json({ error: 'key' }, { status: 400 });
      const n = Math.max(6, Math.min(2000, Number(b.n) || 48)); const g = gridFor(n, w.w / w.h);
      // 혼자 하던 판을 가져온 경우: 같은 시드·격자에 잠긴 조각과 뭉치를 그대로, 트레이에 있던 조각은 흩뿌림
      const st0 = b.state && Number.isInteger(b.state.seed) && b.state.cols === g.cols && b.state.rows === g.rows ? b.state : null;
      const seed = st0 ? (st0.seed >>> 0) : rand32(); const total = g.cols * g.rows;
      let groups: Record<string, RoomGroup> = {}; let locked: number[] = [];
      if (st0) { const placed = new Set<number>(); locked = (st0.locked as number[]).filter((i) => Number.isInteger(i) && i >= 0 && i < total); locked.forEach((i) => placed.add(i)); const gs: Record<string, RoomGroup> = {};
        for (const sg of (st0.groups as { dx: number; dy: number; idx: number[] }[]) ?? []) { const idx = sg.idx.filter((i) => Number.isInteger(i) && i >= 0 && i < total && !placed.has(i)); if (!idx.length) continue; idx.forEach((i) => placed.add(i)); gs[String(idx[0])] = { dx: +sg.dx || 0, dy: +sg.dy || 0, idx }; }
        groups = gs; }
      this.state = { id: b.id, key: w.key, n, cols: g.cols, rows: g.rows, total, W: w.w, H: w.h, seed, groups, locked, createdAt: Date.now() - (st0 && Number.isFinite(st0.elapsed) ? Math.max(0, Math.min(st0.elapsed, 86400e3 * 7)) : 0), lang: String(b.lang || 'ko').slice(0, 2) };
      await this.ctx.storage.put('state', this.state); await this.ctx.storage.setAlarm(Date.now() + 48 * 3600e3);
      return Response.json({ id: this.state.id });
    }
    if (!st) return Response.json({ error: 'no room' }, { status: 404 });
    if (req.headers.get('upgrade') === 'websocket') {
      if (this.ctx.getWebSockets().length >= MAX_PLAYERS) return new Response('full', { status: 429 });
      const pair = new WebSocketPair(); const [client, server] = Object.values(pair);
      const id = Math.random().toString(36).slice(2, 8); const used = new Set(this.players().map((p) => p.color)); const color = COLORS.find((c) => !used.has(c)) ?? COLORS[Math.floor(Math.random() * COLORS.length)];
      const att: Att = { id, nick: '', color }; server.serializeAttachment(att); this.ctx.acceptWebSocket(server);
      return new Response(null, { status: 101, webSocket: client });
    }
    return Response.json({ id: st.id, key: st.key, n: st.n, cols: st.cols, rows: st.rows, total: st.total, seed: st.seed, locked: st.locked.length, players: this.players().length, done: !!st.doneAt, createdAt: st.createdAt, lang: st.lang });
  }
  players(): Player[] { return this.ctx.getWebSockets().map((ws) => { const a = ws.deserializeAttachment() as Att; return { id: a.id, nick: a.nick, color: a.color }; }); }
  broadcast(msg: unknown, except?: WebSocket) { const s = JSON.stringify(msg); for (const ws of this.ctx.getWebSockets()) if (ws !== except) { try { ws.send(s); } catch {} } }
  async webSocketMessage(ws: WebSocket, raw: string | ArrayBuffer) {
    const st = await this.load(); if (!st || typeof raw !== 'string') return; let m: any; try { m = JSON.parse(raw); } catch { return; }
    const att = ws.deserializeAttachment() as Att; const tol = Math.min(st.W / st.cols, st.H / st.rows) * 0.4;
    switch (m.t) {
      case 'nick': { const n = String(m.nick || '').trim().slice(0, 12); if (!n) return; att.nick = n; ws.serializeAttachment(att); this.broadcast({ t: 'nick', id: att.id, nick: n }); return; }
      case 'hello': { att.nick = String(m.nick || '').slice(0, 12) || `#${att.id.slice(0, 3)}`; ws.serializeAttachment(att); ws.send(JSON.stringify({ t: 'init', state: st, you: att, players: this.players(), holders: Object.fromEntries(this.holders) })); this.broadcast({ t: 'join', p: { id: att.id, nick: att.nick, color: att.color } }, ws); return; }
      case 'take': { const i = Number(m.g); if (!Number.isInteger(i) || i < 0 || i >= st.total || st.locked.includes(i) || Object.values(st.groups).some((gr) => gr.idx.includes(i))) { ws.send(JSON.stringify({ t: 'deny', g: String(i) })); return; } const g = String(i); st.groups[g] = { dx: +m.dx || 0, dy: +m.dy || 0, idx: [i] }; this.holders.set(g, att.id); this.broadcast({ t: 'take', id: att.id, g, dx: st.groups[g].dx, dy: st.groups[g].dy }, ws); this.scheduleSave(); return; }
      case 'untake': { const g = String(m.g); const gr = st.groups[g]; if (!gr || gr.idx.length !== 1 || this.holders.get(g) !== att.id) return; delete st.groups[g]; this.holders.delete(g); this.broadcast({ t: 'untake', g }, ws); this.scheduleSave(); return; }
      case 'cur': this.broadcast({ t: 'cur', id: att.id, x: m.x, y: m.y }, ws); return;
      case 'grab': { const g = String(m.g); if (!st.groups[g]) return; const h = this.holders.get(g); if (h && h !== att.id) { ws.send(JSON.stringify({ t: 'deny', g })); return; } this.holders.set(g, att.id); this.broadcast({ t: 'grab', id: att.id, g }, ws); return; }
      case 'mv': { const g = String(m.g); if (this.holders.get(g) !== att.id || !st.groups[g]) return; st.groups[g].dx = +m.dx; st.groups[g].dy = +m.dy; this.broadcast({ t: 'mv', g, dx: +m.dx, dy: +m.dy }, ws); return; }
      case 'drop': { const g = String(m.g); if (this.holders.get(g) !== att.id || !st.groups[g]) return; st.groups[g].dx = +m.dx; st.groups[g].dy = +m.dy; this.holders.delete(g); this.broadcast({ t: 'drop', g, dx: +m.dx, dy: +m.dy }, ws); this.scheduleSave(); return; }
      case 'merge': { const g = String(m.g), into = String(m.into); const A = st.groups[g], B = st.groups[into]; if (!A || !B || g === into) return; if (Math.abs(A.dx - B.dx) > tol * 1.5 || Math.abs(A.dy - B.dy) > tol * 1.5) return; B.idx.push(...A.idx); delete st.groups[g]; this.holders.delete(g); this.holders.delete(into); this.broadcast({ t: 'merge', g, into, dx: B.dx, dy: B.dy }); this.scheduleSave(); return; }
      case 'lock': { const g = String(m.g); const A = st.groups[g]; if (!A) return; if (Math.abs(A.dx) > tol * 1.5 || Math.abs(A.dy) > tol * 1.5) return; st.locked.push(...A.idx); delete st.groups[g]; this.holders.delete(g); this.broadcast({ t: 'lock', g, idx: A.idx }); if (st.locked.length >= st.total && !st.doneAt) { st.doneAt = Date.now(); this.broadcast({ t: 'done', at: st.doneAt }); } this.scheduleSave(); return; }
      case 'ping': ws.send('{"t":"pong"}'); return;
    }
  }
  async webSocketClose(ws: WebSocket) { this.dropPlayer(ws); }
  async webSocketError(ws: WebSocket) { this.dropPlayer(ws); }
  dropPlayer(ws: WebSocket) { const att = ws.deserializeAttachment() as Att | null; if (!att) return; for (const [g, h] of this.holders) if (h === att.id) { this.holders.delete(g); this.broadcast({ t: 'release', g }); } this.broadcast({ t: 'leave', id: att.id }); }
  async alarm() { const st = await this.load(); if (!st) return; const idle = Date.now() - (st.doneAt ?? st.createdAt) > 47 * 3600e3 && this.ctx.getWebSockets().length === 0; if (idle) { await this.ctx.storage.deleteAll(); this.state = null; } else await this.ctx.storage.setAlarm(Date.now() + 24 * 3600e3); }
}

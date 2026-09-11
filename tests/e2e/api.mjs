// API 라우트 + 방(Durable Object) 웹소켓 프로토콜. 배포 빌드 기준 (개발 모드 빌드에서는 없는 라우트에 POST 하면 wrangler 프록시가 죽는다)
// 검사하는 불변식: 조각·완성 정산과 paid, 하루 상한(한 묶음 통째 거절), 재도전 감산, 내 순위, 방 id 는 경로에서만,
// take/mv/grab→deny/drop/untake/lock/merge/resync/release 와 나간 사람의 점유 풀기
import { BASE, get, post, ok, finish } from './lib.mjs';

// ── 공개 라우트
{ const a = await get('/api/stats'); const r = await post('/api/stats', { action: 'solved' }); ok(r.body?.solved === a.solved + 1, `stats: RETURNING n (${a.solved}→${r.body?.solved})`); ok(r.hdr['cache-control'] === 'no-store', 'stats: no-store'); }
{ const r = await post('/api/stats', 'nope'); ok(r.status === 400, 'stats: bad json → 400'); }
{ const d = await get('/api/daily'); ok(typeof d.key === 'string' && d.pieces === 48, 'daily'); }
{ const d = await get('/api/me'); ok(d.user === null && typeof d.auth === 'boolean', 'me: 비회원'); }
{ const d = await get('/api/level'); ok(d.user === null, 'level: 비회원'); }
{ const d = await get('/api/rank?tab=week'); ok(d.tab === 'week' && Array.isArray(d.top) && d.me === null, 'rank: 비회원'); }
{ const r = await fetch(BASE + '/api/live'); const d = await r.json(); ok(r.headers.get('cache-control') === 'no-store' && d.total > 0 && d.work?.key === d.key && !('lang' in d), 'live: DO 정보 + 제목, lang 없음', JSON.stringify(d)); }
// ── 회원 (run.mjs 가 심은 테스트 회원, 세션 쿠키 위조)
{ const d = await get('/api/me', true); ok(d.user?.nick === 'tester', 'me: 회원', JSON.stringify(d)); }
{ const r = await post('/api/sync', { action: 'pieces', kind: 'gallery', key: 'wave', n: 100, placed: 60 }, true); const a = r.body?.award; ok(a?.gained === 60 && a.xp === 60 && a.rate === 1 && a.capped === false && a.level === 1, 'pieces: 60 → xp 60', JSON.stringify(r.body)); }
{ const r = await post('/api/sync', { action: 'pieces', kind: 'gallery', key: 'wave', n: 100, placed: 60 }, true); const a = r.body?.award; ok(a?.gained === 60 && a.xp === 120 && a.prevLevel === 1 && a.levelUp === true && a.level === 2, 'pieces: +60 → xp 120, 레벨업 2', JSON.stringify(r.body)); }
{ const r = await post('/api/sync', { action: 'done', entry: { kind: 'gallery', key: 'wave', name: 'wave', n: 100, sec: 150, moves: 100, at: Date.now(), mine: 100, paid: 120 } }, true); const a = r.body?.award;
  ok(a && a.gained === 0 && a.xp === 120 && a.stats.solved === 1 && a.stats.pieces === 100 && a.stats.works === 1 && a.badges.includes('first') && a.levelUp === false, 'done: paid 만큼 빼서 0, solved 1, first 업적', JSON.stringify(r.body)); }
{ const d = await get('/api/level', true); ok(d.xp === 120 && d.level === 2 && d.stats.solved === 1 && d.badges.some((b) => b.code === 'first') && d.rank === 1 && d.week.rank === 1 && d.week.xp === 120, 'level: xp·업적·순위', JSON.stringify(d)); }
{ const d = await get('/api/rank?tab=week', true); ok(d.me?.rank === 1 && d.me.xp === 120 && d.me.listed === true && d.top[0]?.nick === 'tester' && d.top[0].level === 2, 'rank(week): 내 순위 1', JSON.stringify(d)); }
{ const d = await get('/api/rank?tab=all', true); ok(d.me?.rank === 1 && d.me.xp === 120 && d.top[0]?.xp === 120, 'rank(all)'); }
// 재도전 감산: wave 는 100조각까지 깼으니 48조각 오늘의 퍼즐은 ×1.5×0.25
{ const r = await post('/api/sync', { action: 'pieces', kind: 'daily', key: 'wave', n: 48, placed: 48 }, true); const a = r.body?.award; ok(a?.rate === 0.375 && a.gained === 18 && a.xp === 138, 'pieces(daily 재도전): rate 0.375 → 18', JSON.stringify(r.body)); }
// 하루 상한 5000: 4000 은 들어가고(4138) 다음 1000 은 통째로 거절
{ const r = await post('/api/sync', { action: 'pieces', kind: 'gallery', key: 'wave', n: 4000, placed: 4000 }, true); const a = r.body?.award; ok(a?.gained === 4000 && a.xp === 4138, 'pieces: 4000 → 4138', JSON.stringify(r.body)); }
{ const r = await post('/api/sync', { action: 'pieces', kind: 'gallery', key: 'wave', n: 4000, placed: 1000 }, true); const a = r.body?.award; ok(a?.gained === 0 && a.xp === 4138 && a.capped === true, 'pieces: 상한 → capped, 0', JSON.stringify(r.body)); }
{ const r = await post('/api/sync', { action: 'done', entry: { kind: 'gallery', key: 'wave', name: 'wave', n: 4000, sec: 2000, moves: 4000, at: Date.now() + 1, mine: 4000, paid: 4000 } }, true); const a = r.body?.award; ok(a && a.gained === 0 && a.xp === 4138 && a.stats.solved === 2 && a.stats.best_n === 4000 && a.badges.includes('p2000'), 'done: 4000 조각 → best_n·p2000 업적', JSON.stringify(r.body)); }
{ const d = await get('/api/sync', true); ok(d.done?.length === 2 && d.done[0].n === 4000, 'sync GET: done 2건'); }
{ const r = await post('/api/me', { nick: 'tester2' }, true); ok(r.body?.user?.nick === 'tester2', 'me POST: 닉네임'); await post('/api/me', { nick: 'tester' }, true); }

// ── 방 프로토콜 (DO)
const room = await post('/api/room', { key: 'wave', n: 48 }); ok(typeof room.body?.id === 'string' && room.body.id.length === 6, 'room: 만들기', JSON.stringify(room));
const rid = room.body.id;
{ const r = await fetch(`${BASE}/api/room/${rid}/create`, { method: 'POST', body: '{}' }); ok(r.status >= 400 && r.status !== 400, `room: /create 는 밖에서 안 열림 — DO 가 아니라 Astro 가 막는다 (${r.status})`); }
{ const d = await get(`/api/room/${rid}`); ok(d.id === rid && d.total === 48 && !('lang' in d) && d.players === 0, 'room: 정보 (lang 없음)', JSON.stringify(d)); }
{ const r = await post('/api/room', { key: 'nope', n: 48 }); ok(r.status === 400, 'room: 없는 그림 → 400'); }
// ── 서버 렌더 페이지 — [...lang] 은 진짜 언어 접두어일 때만 (공유 카드 /s/, 초대 /i/)
const head = async (p) => { const r = await fetch(BASE + p, { redirect: 'manual' }); return { status: r.status, loc: r.headers.get('location'), html: r.status === 200 ? await r.text() : '' }; };
{ const r = await head('/s/?k=wave&n=48&t=100&m=50'); ok(r.status === 200 && r.html.includes('<html lang="ko"'), `s: 공유 카드 ko (${r.status})`); }
{ const r = await head('/en/s/?k=wave&n=48&t=100&m=50'); ok(r.status === 200 && r.html.includes('<html lang="en"'), `s: 공유 카드 en (${r.status})`); }
{ const r = await head('/s/'); ok(r.status === 302 && r.loc === '/', `s: 쿼리 없으면 홈으로 (${r.status} ${r.loc})`); }
{ const r = await head('/de/s/'); ok(r.status === 302 && r.loc === '/de/', `s: 쿼리 없으면 /de/ 로 (${r.status} ${r.loc})`); }
{ const r = await head('/xx/s/?k=wave&n=48'); ok(r.status === 404, `s: 모르는 접두어 → 404 (${r.status})`); }
{ const r = await head('/ko/s/?k=wave&n=48'); ok(r.status === 404, `s: /ko/ 접두어는 없다 → 404 (${r.status})`); }
{ const r = await head(`/i/?room=${rid}`); ok(r.status === 200 && r.html.includes('<html lang="ko"'), `i: 초대 랜딩 (${r.status})`); }
{ const r = await head(`/ja/i/?room=${rid}`); ok(r.status === 200 && r.html.includes('<html lang="ja"'), `i: 초대 랜딩 ja (${r.status})`); }
{ const r = await head('/a/b/i/'); ok(r.status === 404, `i: 여러 단 접두어 → 404 (${r.status})`); }
const WS = BASE.replace(/^http/, 'ws');
const open = (id) => new Promise((res, rej) => { const ws = new WebSocket(`${WS}/api/room/${id}/ws`); ws.inbox = []; ws.onmessage = (e) => ws.inbox.push(JSON.parse(e.data)); ws.onopen = () => res(ws); ws.onerror = rej; });
const next = (ws, t, ms = 1500) => new Promise((res, rej) => { const t0 = Date.now(); const tick = () => { const i = ws.inbox.findIndex((m) => m.t === t); if (i >= 0) return res(ws.inbox.splice(i, 1)[0]); if (Date.now() - t0 > ms) return rej(new Error(`timeout waiting ${t}; inbox=${JSON.stringify(ws.inbox).slice(0, 200)}`)); setTimeout(tick, 20); }; tick(); });
const none = (ws, t, ms = 400) => new Promise((res) => setTimeout(() => res(!ws.inbox.some((m) => m.t === t)), ms));
const send = (ws, m) => ws.send(JSON.stringify(m));
try {
  const A = await open(rid), B = await open(rid);
  send(A, { t: 'hello', nick: 'A' }); const init = await next(A, 'init'); ok(init.state?.total === 48 && init.you?.nick === 'A' && init.hasPhoto === false, 'ws: init');
  send(B, { t: 'hello', nick: 'B' }); await next(B, 'init'); const j = await next(A, 'join'); ok(j.p?.nick === 'B', 'ws: join 브로드캐스트');
  send(A, { t: 'take', g: 0, dx: 10.4, dy: 20.6 }); const tk = await next(B, 'take'); ok(tk.g === '0' && tk.dx === 10 && tk.dy === 21 && tk.id === init.you.id, 'ws: take (좌표 반올림)', JSON.stringify(tk));
  send(A, { t: 'mv', g: '0', dx: 15, dy: 25 }); const mv = await next(B, 'mv'); ok(mv.g === '0' && mv.dx === 15 && mv.dy === 25, 'ws: mv');
  send(B, { t: 'grab', g: '0' }); const dn = await next(B, 'deny'); ok(dn.g === '0', 'ws: 남이 잡은 뭉치 grab → deny');
  send(B, { t: 'mv', g: '0', dx: 99, dy: 99 }); ok(await none(A, 'mv'), 'ws: 남이 잡은 뭉치 mv 는 무시');
  send(A, { t: 'cur', x: 'abc', y: 12.7 }); const cu = await next(B, 'cur'); ok(cu.x === 0 && cu.y === 13, 'ws: cur 숫자 검증', JSON.stringify(cu));
  send(A, { t: 'drop', g: '0', dx: 30, dy: 40 }); const dr = await next(B, 'drop'); ok(dr.dx === 30 && dr.dy === 40, 'ws: drop');
  send(B, { t: 'grab', g: '0' }); const gb = await next(A, 'grab'); ok(gb.g === '0' && gb.id !== init.you.id, 'ws: 놓인 뭉치는 남이 grab 가능');
  send(B, { t: 'untake', g: '0' }); const ut = await next(A, 'untake'); ok(ut.g === '0', 'ws: untake');
  send(A, { t: 'take', g: 1, dx: 0, dy: 0 }); await next(B, 'take');
  send(B, { t: 'lock', g: '1', dx: 0, dy: 0 }); const rs = await next(B, 'resync'); ok(!!rs, 'ws: 남이 잡은 뭉치 lock → resync');
  send(A, { t: 'lock', g: '1', dx: 0, dy: 0 }); const lkA = await next(A, 'lock'), lkB = await next(B, 'lock'); ok(lkA.idx?.[0] === 1 && lkB.idx?.[0] === 1, 'ws: lock 양쪽 브로드캐스트');
  send(A, { t: 'lock', g: '9', dx: 0, dy: 0 }); ok(await none(B, 'lock'), 'ws: 없는 뭉치 lock 무시');
  send(A, { t: 'take', g: 3, dx: 0, dy: 0 }); await next(B, 'take'); send(A, { t: 'take', g: 4, dx: 0, dy: 0 }); await next(B, 'take');
  send(A, { t: 'merge', g: '4', into: '3', dx: 0, dy: 0 }); const mgA = await next(A, 'merge'), mgB = await next(B, 'merge'); ok(mgA.g === '4' && mgA.into === '3' && mgB.into === '3', 'ws: merge');
  send(A, { t: 'take', g: 5, dx: 500, dy: 500 }); await next(B, 'take'); send(A, { t: 'lock', g: '5', dx: 500, dy: 500 }); const rs2 = await next(A, 'resync'); ok(!!rs2, 'ws: 제자리 아닌 lock → resync');
  A.close(); const lv = await next(B, 'leave'); ok(lv.id === init.you.id, 'ws: leave');
  const rel = await next(B, 'release'); ok(rel.g === '5', 'ws: 나간 사람 점유 release', JSON.stringify(rel));
  B.close();
  const info = await get(`/api/room/${rid}`); ok(info.locked === 1 && info.players === 0, 'room: 잠긴 조각 1, 접속 0', JSON.stringify(info));
} catch (e) { ok(false, 'ws: ' + e.message); }
finish();

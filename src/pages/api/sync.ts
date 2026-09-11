// 로그인 회원의 업적(완성 기록)·하던 퍼즐 동기화 + 레벨/XP 반영
// GET → { done: [...], saves: [meta...] } / GET ?save=<id> → { data } / POST {action:'done'|'pieces'|'save'|'delsave'|'merge'|'live'}
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getUser } from '../../lib/auth';
import { json, readJson } from '../../lib/api';
import { award, awardPieces } from '../../lib/award';
import type { Kind, Solve } from '../../lib/level';
export const prerender = false;
const MAX_DONE = 500, MAX_SAVES = 30, MAX_SAVE_BYTES = 600_000;
// room·mine 은 XP 계산에만 쓰고 저장하지 않는다 (방에서 맞춘 판은 내가 놓은 조각만큼만 XP)
const doneRow = (e: any) => { const kind = ['gallery', 'daily', 'photo'].includes(e?.kind) ? e.kind : null; const at = Number(e?.at), n = Number(e?.n), sec = Number(e?.sec), moves = Number(e?.moves), mine = Number(e?.mine), paid = Number(e?.paid); if (!kind || !Number.isFinite(at) || !Number.isInteger(n) || !Number.isFinite(sec)) return null; return { at: Math.round(at), key: String(e.key ?? '').slice(0, 80), kind, name: String(e.name ?? '').slice(0, 200), n, sec: Math.round(sec), moves: Number.isFinite(moves) ? Math.round(moves) : 0, day: e.day ? String(e.day).slice(0, 10) : null, room: !!e.room, mine: Number.isFinite(mine) ? Math.round(mine) : undefined, paid: Number.isFinite(paid) ? Math.max(0, Math.round(paid)) : undefined }; };
type Done = NonNullable<ReturnType<typeof doneRow>>;
const toSolve = (r: Done): Solve => ({ kind: r.kind as Solve['kind'], key: r.key, n: r.n, sec: r.sec, at: r.at, day: r.day, room: r.room, mine: r.mine, paid: r.paid });
const saveMeta = (d: any) => ({ id: String(d.id), kind: d.kind, key: String(d.key), name: String(d.name ?? '').slice(0, 200), day: d.day ?? undefined, total: Number(d.total), done: Number(d.done), elapsed: Number(d.elapsed), savedAt: Number(d.savedAt), thumb: String(d.thumb ?? '').slice(0, 40_000) });

export const GET: APIRoute = async ({ request }) => {
  const u = await getUser(request); if (!u) return json({ error: 'auth' }, 401); const DB = env.DB; const url = new URL(request.url); const sid = url.searchParams.get('save');
  if (sid) { const r = await DB.prepare('SELECT data FROM user_saves WHERE user_id = ? AND id = ?').bind(u.id, sid).first<{ data: string }>(); return r ? new Response(r.data, { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } }) : json({ error: 'none' }, 404); }
  const [done, saves] = await Promise.all([
    DB.prepare('SELECT at, key, kind, name, n, sec, moves, day FROM user_done WHERE user_id = ? ORDER BY at DESC LIMIT ?').bind(u.id, MAX_DONE).all<Omit<Done, 'room' | 'mine' | 'paid'>>(),
    DB.prepare('SELECT meta FROM user_saves WHERE user_id = ? ORDER BY saved_at DESC LIMIT ?').bind(u.id, MAX_SAVES).all<{ meta: string }>(),
  ]);
  return json({ done: done.results, saves: saves.results.map((r) => { try { return JSON.parse(r.meta); } catch { return null; } }).filter(Boolean) });
};

export const POST: APIRoute = async ({ request }) => {
  const u = await getUser(request); if (!u) return json({ error: 'auth' }, 401); const DB = env.DB;
  const b = await readJson(request); if (!b) return json({ error: 'bad json' }, 400);
  const a = String(b.action);
  if (a === 'done' || a === 'merge') {
    // merge: 로그인 직후 이 기기의 localStorage 기록을 한 번에 올림 (같은 at 이면 무시)
    const rows = ((a === 'done' ? [b.entry] : (Array.isArray(b.entries) ? b.entries : [])) as any[]).map(doneRow).filter((x): x is Done => !!x).slice(0, MAX_DONE);
    let earned = null;
    if (rows.length) {
      const res = await DB.batch(rows.map((r) => DB.prepare('INSERT OR IGNORE INTO user_done (user_id, at, key, kind, name, n, sec, moves, day) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(u.id, r.at, r.key, r.kind, r.name, r.n, r.sec, r.moves, r.day)));
      // 실제로 새로 들어간 행만 XP 로 친다 — 같은 기록을 기기 여러 대에서 올려도 한 번만
      earned = await award(DB, u.id, rows.filter((_, i) => res[i]?.meta?.changes !== 0).map(toSolve));
      await DB.prepare('DELETE FROM user_done WHERE user_id = ? AND at NOT IN (SELECT at FROM user_done WHERE user_id = ? ORDER BY at DESC LIMIT ?)').bind(u.id, u.id, MAX_DONE).run();
    }
    return json({ ok: true, n: rows.length, award: earned });
  }
  if (a === 'live') {
    // 모두의 퍼즐 한 회차가 끝났을 때 내가 놓은 조각만큼. 완성 기록 목록에는 안 들어간다
    const n = Number(b.n), mine = Number(b.mine), paid = Number(b.paid);
    if (!Number.isFinite(n) || !Number.isFinite(mine) || mine <= 0) return json({ error: 'data' }, 400);
    const earned = await award(DB, u.id, [{ kind: 'live', key: String(b.key ?? '').slice(0, 80), n: Math.round(n), mine: Math.round(mine), paid: Number.isFinite(paid) ? Math.max(0, Math.round(paid)) : 0, sec: 0, at: Date.now() }]);
    return json({ ok: true, award: earned });
  }
  if (a === 'pieces') {
    // 맞추는 도중 모아 보내는 조각 수. 완성 기록은 안 남고 XP 만 붙는다 (완성 때 paid 로 빠진다)
    const kind = (['gallery', 'daily', 'photo', 'live'].includes(b.kind) ? b.kind : 'gallery') as Kind;
    const n = Number(b.n), placed = Number(b.placed);
    if (!Number.isFinite(n) || !Number.isFinite(placed) || placed <= 0 || n <= 0) return json({ error: 'data' }, 400);
    const total = Math.min(4000, Math.round(n));
    const earned = await awardPieces(DB, u.id, { kind, key: String(b.key ?? '').slice(0, 80), n: total, placed: Math.min(total, Math.round(placed)), at: Date.now() });
    return json({ ok: true, award: earned });
  }
  if (a === 'save') {
    const d = b.data; if (!d || typeof d.id !== 'string' || d.kind === 'photo') return json({ error: 'data' }, 400);
    const data = JSON.stringify(d); if (data.length > MAX_SAVE_BYTES) return json({ error: 'too big' }, 413);
    await DB.prepare('INSERT INTO user_saves (user_id, id, meta, data, saved_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(user_id, id) DO UPDATE SET meta = excluded.meta, data = excluded.data, saved_at = excluded.saved_at').bind(u.id, d.id.slice(0, 120), JSON.stringify(saveMeta(d)), data, Math.round(Number(d.savedAt) || Date.now())).run();
    await DB.prepare('DELETE FROM user_saves WHERE user_id = ? AND id NOT IN (SELECT id FROM user_saves WHERE user_id = ? ORDER BY saved_at DESC LIMIT ?)').bind(u.id, u.id, MAX_SAVES).run();
    return json({ ok: true });
  }
  if (a === 'delsave') { await DB.prepare('DELETE FROM user_saves WHERE user_id = ? AND id = ?').bind(u.id, String(b.id)).run(); return json({ ok: true }); }
  return json({ error: 'action' }, 400);
};

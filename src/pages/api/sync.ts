// 로그인 회원의 업적(완성 기록)·하던 퍼즐 동기화
// GET → { done: [...], saves: [meta...] } / GET ?save=<id> → { data } / POST {action:'done'|'save'|'delsave'|'merge'}
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getUser, json } from '../../lib/auth';
export const prerender = false;
const MAX_DONE = 500, MAX_SAVES = 30, MAX_SAVE_BYTES = 600_000;
const doneRow = (e: any) => { const kind = ['gallery', 'daily', 'photo'].includes(e?.kind) ? e.kind : null; const at = Number(e?.at), n = Number(e?.n), sec = Number(e?.sec), moves = Number(e?.moves); if (!kind || !Number.isFinite(at) || !Number.isInteger(n) || !Number.isFinite(sec)) return null; return { at: Math.round(at), key: String(e.key ?? '').slice(0, 80), kind, name: String(e.name ?? '').slice(0, 200), n, sec: Math.round(sec), moves: Number.isFinite(moves) ? Math.round(moves) : 0, day: e.day ? String(e.day).slice(0, 10) : null }; };
const saveMeta = (d: any) => ({ id: String(d.id), kind: d.kind, key: String(d.key), name: String(d.name ?? '').slice(0, 200), day: d.day ?? undefined, total: Number(d.total), done: Number(d.done), elapsed: Number(d.elapsed), savedAt: Number(d.savedAt), thumb: String(d.thumb ?? '').slice(0, 40_000) });

export const GET: APIRoute = async ({ request }) => {
  const u = await getUser(request); if (!u) return json({ error: 'auth' }, 401); const DB = env.DB; const url = new URL(request.url); const sid = url.searchParams.get('save');
  if (sid) { const r = await DB.prepare('SELECT data FROM user_saves WHERE user_id = ? AND id = ?').bind(u.id, sid).first<{ data: string }>(); return r ? new Response(r.data, { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } }) : json({ error: 'none' }, 404); }
  const [done, saves] = await Promise.all([
    DB.prepare('SELECT at, key, kind, name, n, sec, moves, day FROM user_done WHERE user_id = ? ORDER BY at DESC LIMIT ?').bind(u.id, MAX_DONE).all(),
    DB.prepare('SELECT meta FROM user_saves WHERE user_id = ? ORDER BY saved_at DESC LIMIT ?').bind(u.id, MAX_SAVES).all<{ meta: string }>(),
  ]);
  return json({ done: done.results, saves: saves.results.map((r) => { try { return JSON.parse(r.meta); } catch { return null; } }).filter(Boolean) });
};

export const POST: APIRoute = async ({ request }) => {
  const u = await getUser(request); if (!u) return json({ error: 'auth' }, 401); const DB = env.DB;
  let b: any; try { b = await request.json(); } catch { return json({ error: 'bad json' }, 400); }
  const a = String(b.action);
  if (a === 'done' || a === 'merge') {
    // merge: 로그인 직후 이 기기의 localStorage 기록을 한 번에 올림 (같은 at 이면 무시)
    const rows = ((a === 'done' ? [b.entry] : (Array.isArray(b.entries) ? b.entries : [])) as any[]).map(doneRow).filter((x): x is NonNullable<ReturnType<typeof doneRow>> => !!x).slice(0, MAX_DONE);
    if (rows.length) await DB.batch(rows.map((r: NonNullable<ReturnType<typeof doneRow>>) => DB.prepare('INSERT OR IGNORE INTO user_done (user_id, at, key, kind, name, n, sec, moves, day) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(u.id, r.at, r.key, r.kind, r.name, r.n, r.sec, r.moves, r.day)));
    await DB.prepare('DELETE FROM user_done WHERE user_id = ? AND at NOT IN (SELECT at FROM user_done WHERE user_id = ? ORDER BY at DESC LIMIT ?)').bind(u.id, u.id, MAX_DONE).run();
    return json({ ok: true, n: rows.length });
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

// 오늘의 퍼즐: GET → 오늘 그림·완성 수 / POST {action:'ranking'} → 오늘 순위 / {action:'solve'} → 기록 등록(기기당 1건, 더 빠르면 갱신)
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { todayKST, dailyPick, PAINTINGS, DAILY_PIECES } from '../../lib/jigsaw';
export const prerender = false;
const json = (d: unknown, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

export const GET: APIRoute = async () => {
  const day = todayKST(), pick = dailyPick(day, PAINTINGS);
  const cnt = await env.DB.prepare('SELECT COUNT(*) n FROM daily_solves WHERE day = ?').bind(day).first<{ n: number }>().catch(() => null);
  return json({ day, key: pick.painting.key, pieces: DAILY_PIECES, solved: cnt?.n ?? 0 });
};

export const POST: APIRoute = async ({ request }) => {
  const DB = env.DB;
  let b: any; try { b = await request.json(); } catch { return json({ error: 'bad json' }, 400); }
  const day = todayKST(), action = String(b.action);
  if (action === 'ranking') {
    const { results } = await DB.prepare('SELECT nick, tries, ms FROM daily_solves WHERE day = ? ORDER BY ms ASC, tries ASC LIMIT 20').bind(day).all();
    const cnt = await DB.prepare('SELECT COUNT(*) n FROM daily_solves WHERE day = ?').bind(day).first<{ n: number }>();
    return json({ day, rows: results, total: cnt?.n ?? 0 });
  }
  if (action === 'solve') {
    const nick = String(b.nick ?? '').trim().slice(0, 12), tries = Number(b.tries), ms = Number(b.ms), device = String(b.device ?? '').slice(0, 40);
    if (!nick || !device) return json({ error: 'nick' }, 400);
    if (!Number.isInteger(tries) || tries < DAILY_PIECES || tries > 5000 || !(ms >= 5000 && ms < 86400e3)) return json({ error: 'record' }, 400);
    const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
    const prev = await DB.prepare('SELECT tries, ms FROM daily_solves WHERE day = ? AND device = ?').bind(day, device).first<{ tries: number; ms: number }>();
    const better = !prev || ms < prev.ms;
    if (better) await DB.prepare('INSERT INTO daily_solves (day, device, nick, tries, ms, ip) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(day, device) DO UPDATE SET nick = excluded.nick, tries = excluded.tries, ms = excluded.ms, created_at = unixepoch(), ip = excluded.ip').bind(day, device, nick, tries, Math.round(ms), ip).run();
    await DB.prepare('UPDATE daily_solves SET ip = NULL WHERE ip IS NOT NULL AND created_at < unixepoch() - 7 * 86400').run();
    const best = better ? { tries, ms: Math.round(ms) } : prev!;
    const ahead = await DB.prepare('SELECT COUNT(*) n FROM daily_solves WHERE day = ? AND ms < ?').bind(day, best.ms).first<{ n: number }>();
    return json({ ok: true, rank: (ahead?.n ?? 0) + 1 });
  }
  return json({ error: 'action' }, 400);
};

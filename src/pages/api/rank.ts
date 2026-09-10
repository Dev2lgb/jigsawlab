// 랭킹 — GET ?tab=week|all → 상위 50명 + (로그인했으면) 내 순위. 읽기는 누구나, 등재는 로그인 회원만
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getUser, json } from '../../lib/auth';
import { kstDay, levelOf, weekOf } from '../../lib/level';
export const prerender = false;
const TOP = 50;

export const GET: APIRoute = async ({ request }) => {
  const DB = env.DB; const url = new URL(request.url);
  const tab = url.searchParams.get('tab') === 'all' ? 'all' : 'week';
  const week = weekOf(kstDay(Date.now()));
  const u = await getUser(request).catch(() => null);

  const top = tab === 'week'
    ? await DB.prepare(`SELECT u.nick AS nick, w.xp AS xp, COALESCE(s.xp, 0) AS total, (SELECT COUNT(*) FROM user_badges b WHERE b.user_id = w.user_id) AS badges
         FROM user_week w JOIN users u ON u.id = w.user_id LEFT JOIN user_stats s ON s.user_id = w.user_id
         WHERE w.week = ? AND w.xp > 0 AND u.nick <> '' ORDER BY w.xp DESC, u.nick ASC LIMIT ?`).bind(week, TOP).all<{ nick: string; xp: number; total: number; badges: number }>()
    : await DB.prepare(`SELECT u.nick AS nick, s.xp AS xp, s.xp AS total, (SELECT COUNT(*) FROM user_badges b WHERE b.user_id = s.user_id) AS badges
         FROM user_stats s JOIN users u ON u.id = s.user_id
         WHERE s.xp > 0 AND u.nick <> '' ORDER BY s.xp DESC, u.nick ASC LIMIT ?`).bind(TOP).all<{ nick: string; xp: number; total: number; badges: number }>();

  const rows = (top.results ?? []).map((r, i) => ({ r: i + 1, nick: r.nick, xp: r.xp, level: levelOf(r.total), badges: r.badges }));

  let me: { nick: string; xp: number; level: number; rank: number | null; listed: boolean } | null = null;
  if (u) {
    const [s, w] = await Promise.all([
      DB.prepare('SELECT xp FROM user_stats WHERE user_id = ?').bind(u.id).first<{ xp: number }>(),
      DB.prepare('SELECT xp FROM user_week WHERE user_id = ? AND week = ?').bind(u.id, week).first<{ xp: number }>(),
    ]);
    const total = s?.xp ?? 0, mine = tab === 'week' ? w?.xp ?? 0 : total;
    let rank: number | null = null;
    if (mine > 0) {
      const c = tab === 'week'
        ? await DB.prepare('SELECT COUNT(*) AS c FROM user_week w JOIN users u2 ON u2.id = w.user_id WHERE w.week = ? AND u2.nick <> \'\' AND w.xp > ?').bind(week, mine).first<{ c: number }>()
        : await DB.prepare('SELECT COUNT(*) AS c FROM user_stats s JOIN users u2 ON u2.id = s.user_id WHERE u2.nick <> \'\' AND s.xp > ?').bind(mine).first<{ c: number }>();
      rank = (c?.c ?? 0) + 1;
    }
    me = { nick: u.nick, xp: mine, level: levelOf(total), rank, listed: !!rank && rank <= TOP };
  }
  return json({ tab, week, top: rows, me });
};

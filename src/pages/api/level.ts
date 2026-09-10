// 내 레벨·업적 — GET → { user, xp, level, stats, badges, week, rank }. 로그인 안 했으면 { user: null }
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getUser, json } from '../../lib/auth';
import { award } from '../../lib/award';
import { EMPTY_STATS, kstDay, levelOf, weekOf, type Stats } from '../../lib/level';
export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const u = await getUser(request); if (!u) return json({ user: null });
  const DB = env.DB, week = weekOf(kstDay(Date.now()));
  // 레벨 기능 전부터 쓰던 회원 — user_stats 가 없으면 award 가 user_done 의 옛 기록을 접어 넣는다 (한 번만)
  const has = await DB.prepare('SELECT 1 AS x FROM user_stats WHERE user_id = ?').bind(u.id).first<{ x: number }>();
  if (!has) await award(DB, u.id, []).catch(() => null);
  const [s, b, w] = await Promise.all([
    DB.prepare('SELECT * FROM user_stats WHERE user_id = ?').bind(u.id).first<Stats & Record<string, unknown>>(),
    DB.prepare('SELECT code, at FROM user_badges WHERE user_id = ? ORDER BY at DESC').bind(u.id).all<{ code: string; at: number }>(),
    DB.prepare('SELECT xp FROM user_week WHERE user_id = ? AND week = ?').bind(u.id, week).first<{ xp: number }>(),
  ]);
  const stats: Stats = { ...EMPTY_STATS };
  if (s) for (const k of Object.keys(EMPTY_STATS) as (keyof Stats)[]) stats[k] = Number(s[k] ?? 0);
  const weekXp = w?.xp ?? 0;
  const [ra, rw] = await Promise.all([
    stats.xp > 0 ? DB.prepare('SELECT COUNT(*) AS c FROM user_stats s JOIN users u2 ON u2.id = s.user_id WHERE u2.nick <> \'\' AND s.xp > ?').bind(stats.xp).first<{ c: number }>() : Promise.resolve(null),
    weekXp > 0 ? DB.prepare('SELECT COUNT(*) AS c FROM user_week x JOIN users u2 ON u2.id = x.user_id WHERE x.week = ? AND u2.nick <> \'\' AND x.xp > ?').bind(week, weekXp).first<{ c: number }>() : Promise.resolve(null),
  ]);
  return json({ user: { id: u.id, nick: u.nick }, xp: stats.xp, level: levelOf(stats.xp), stats, badges: b.results ?? [], week: { key: week, xp: weekXp, rank: rw ? rw.c + 1 : null }, rank: ra ? ra.c + 1 : null });
};

// 내 레벨·업적 — GET → { user, xp, level, stats, badges, week, rank }. 로그인 안 했으면 { user: null }
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getUser } from '../../lib/auth';
import { json, thisWeek } from '../../lib/api';
import { ensureStats, pickStats, rankOf } from '../../lib/award';
import { levelOf } from '../../lib/level';
export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const u = await getUser(request); if (!u) return json({ user: null });
  const DB = env.DB, week = thisWeek();
  // 레벨 기능 전부터 쓰던 회원 — user_stats 가 없으면 award 가 user_done 의 옛 기록을 접어 넣는다 (한 번만)
  const stats = pickStats(await ensureStats(DB, u.id).catch(() => null));
  const [b, w] = await Promise.all([
    DB.prepare('SELECT code, at FROM user_badges WHERE user_id = ? ORDER BY at DESC').bind(u.id).all<{ code: string; at: number }>(),
    DB.prepare('SELECT xp FROM user_week WHERE user_id = ? AND week = ?').bind(u.id, week).first<{ xp: number }>(),
  ]);
  const weekXp = w?.xp ?? 0;
  const [rank, weekRank] = await Promise.all([rankOf(DB, 'all', week, stats.xp), rankOf(DB, 'week', week, weekXp)]);
  return json({ user: { id: u.id, nick: u.nick }, xp: stats.xp, level: levelOf(stats.xp), stats, badges: b.results ?? [], week: { key: week, xp: weekXp, rank: weekRank }, rank });
};

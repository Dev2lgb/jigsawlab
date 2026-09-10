// 서버 전용 — 완성 기록을 받아 XP·누적 지표·업적·주간 랭킹에 반영한다. 규칙 자체는 lib/level.ts
import { WORK_BY_KEY, WORKS } from '../data/works';
import { EMPTY_STATS, DAY_CAP, earnedCodes, kstDay, kstHour, levelOf, plausible, prevDay, weekOf, xpFor, type Solve, type Stats } from './level';

/** 카테고리(진열대)마다 그림이 몇 점인지 — '진열대 완주' 판정용 */
const CAT_TOTAL: Record<string, number> = {};
for (const w of WORKS) CAT_TOTAL[w.cat] = (CAT_TOTAL[w.cat] ?? 0) + 1;

export interface AwardResult { xp: number; gained: number; level: number; prevLevel: number; levelUp: boolean; badges: string[]; stats: Stats; capped: boolean }

interface Row extends Stats { last_day: string | null; day_xp: number; day_key: string | null }
const ZERO: Row = { ...EMPTY_STATS, last_day: null, day_xp: 0, day_key: null };

/**
 * solves 를 순서대로 반영한다. 호출 쪽에서 이미 기록으로 인정된 판만 넘겨야 한다
 * (user_done 에 실제로 새로 들어간 행만 — 같은 기록을 여러 기기에서 두 번 올려도 XP 는 한 번)
 */
export async function award(DB: D1Database, uid: string, solves: Solve[]): Promise<AwardResult | null> {
  if (!solves.length) return null;
  solves = [...solves].sort((a, b) => a.at - b.at);
  const keys = [...new Set(solves.filter((s) => s.kind === 'gallery' || s.kind === 'daily').map((s) => s.key))];

  const [srow, brow, crow, krow] = await Promise.all([
    DB.prepare('SELECT * FROM user_stats WHERE user_id = ?').bind(uid).first<Row>(),
    DB.prepare('SELECT code FROM user_badges WHERE user_id = ?').bind(uid).all<{ code: string }>(),
    keys.length ? DB.prepare('SELECT cat, COUNT(*) AS c FROM user_cleared WHERE user_id = ? GROUP BY cat').bind(uid).all<{ cat: string; c: number }>() : Promise.resolve({ results: [] as { cat: string; c: number }[] }),
    keys.length ? DB.prepare(`SELECT key, n FROM user_cleared WHERE user_id = ? AND key IN (${keys.map(() => '?').join(',')})`).bind(uid, ...keys).all<{ key: string; n: number }>() : Promise.resolve({ results: [] as { key: string; n: number }[] }),
  ]);

  const s: Row = { ...ZERO, ...(srow ?? {}) };
  const had = new Set((brow.results ?? []).map((r) => r.code));
  const catCount = new Map<string, number>((crow.results ?? []).map((r) => [r.cat, r.c]));
  const cleared = new Map<string, number>((krow.results ?? []).map((r) => [r.key, r.n]));

  // 하루 XP 상한 — 저장된 오늘치에서 이어 세고, 지난 날짜(로그인 직후 합치기)는 그 날짜별로 따로 센다
  const dayXp = new Map<string, number>(); if (s.day_key) dayXp.set(s.day_key, s.day_xp);
  const weekXp = new Map<string, number>();
  const writeCleared = new Map<string, { cat: string; n: number; at: number }>();
  const prevXp = s.xp, prevLevel = levelOf(prevXp);
  let gained = 0, lastDayKey = s.day_key, newWorks = false, capped = false;

  for (const sv of solves) {
    const work = sv.kind === 'gallery' || sv.kind === 'daily' ? WORK_BY_KEY[sv.key] : undefined;
    const n = Math.max(0, Math.min(4000, Math.round(sv.n)));
    const mine = sv.mine === undefined ? n : Math.max(0, Math.min(n, Math.round(sv.mine)));
    const clean = plausible(sv, mine);
    const day = kstDay(sv.at);

    // XP (하루 상한 안에서)
    let xp = xpFor(sv, work && sv.kind !== 'daily' ? cleared.get(sv.key) ?? null : null);
    const used = dayXp.get(day) ?? 0;
    if (xp > DAY_CAP - used) capped = true; // 하루 상한에 걸려 깎였다는 것만 알려 준다
    xp = Math.max(0, Math.min(xp, DAY_CAP - used));
    if (xp > 0) { dayXp.set(day, used + xp); lastDayKey = day; gained += xp; s.xp += xp; weekXp.set(weekOf(day), (weekXp.get(weekOf(day)) ?? 0) + xp); }

    // 누적 지표 — 사람 손으로 보기 어려운 기록은 여기에도 안 넣는다 (user_done 의 기록으로만 남는다)
    if (!clean) continue;
    s.pieces += mine;
    if (sv.kind === 'live') { s.live_n += 1; continue; }
    s.solved += 1;
    // 방에서 맞춘 판은 절반 넘게 내가 놓았을 때만 '가장 큰 판' 으로 친다
    if (n > s.best_n && (!sv.room || mine * 2 >= n)) s.best_n = n;
    if (sv.room) s.room_n += 1;
    if (sv.kind === 'photo') s.photo_n += 1;
    if (kstHour(sv.at) < 5) s.night_n += 1;
    if (!sv.room && n >= 300 && sv.sec > 0 && sv.sec <= n * 2) s.fast_n += 1;
    if (sv.kind === 'daily') {
      s.daily_n += 1;
      const d = sv.day || day;
      // 어제 것 다음에 오늘 것이면 이어지고, 하루라도 비면 1 부터. 이미 센 날짜보다 과거는 건드리지 않는다
      if (!s.last_day || d > s.last_day) { s.streak = s.last_day && prevDay(d) === s.last_day ? s.streak + 1 : 1; s.last_day = d; if (s.streak > s.streak_best) s.streak_best = s.streak; }
    }
    if (work) {
      const prev = cleared.get(sv.key);
      if (prev === undefined) { catCount.set(work.cat, (catCount.get(work.cat) ?? 0) + 1); newWorks = true; }
      if (prev === undefined || n > prev) { cleared.set(sv.key, Math.max(prev ?? 0, n)); writeCleared.set(sv.key, { cat: work.cat, n: Math.max(prev ?? 0, n), at: sv.at }); }
    }
  }

  if (newWorks || !srow) {
    s.works = [...catCount.values()].reduce((a, c) => a + c, 0);
    s.shelves = [...catCount.entries()].filter(([cat, c]) => c >= (CAT_TOTAL[cat] ?? Infinity)).length;
  }

  const stats: Stats = { xp: s.xp, solved: s.solved, pieces: s.pieces, best_n: s.best_n, works: s.works, shelves: s.shelves, daily_n: s.daily_n, streak: s.streak, streak_best: s.streak_best, photo_n: s.photo_n, room_n: s.room_n, live_n: s.live_n, night_n: s.night_n, fast_n: s.fast_n };
  const fresh = earnedCodes(stats).filter((c) => !had.has(c));
  const now = Math.floor(Date.now() / 1000);

  const w: D1PreparedStatement[] = [
    DB.prepare(`INSERT INTO user_stats (user_id, xp, solved, pieces, best_n, works, shelves, daily_n, streak, streak_best, last_day, photo_n, room_n, live_n, night_n, fast_n, day_xp, day_key, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, unixepoch())
      ON CONFLICT(user_id) DO UPDATE SET xp = excluded.xp, solved = excluded.solved, pieces = excluded.pieces, best_n = excluded.best_n, works = excluded.works, shelves = excluded.shelves,
        daily_n = excluded.daily_n, streak = excluded.streak, streak_best = excluded.streak_best, last_day = excluded.last_day, photo_n = excluded.photo_n, room_n = excluded.room_n,
        live_n = excluded.live_n, night_n = excluded.night_n, fast_n = excluded.fast_n, day_xp = excluded.day_xp, day_key = excluded.day_key, updated_at = unixepoch()`)
      .bind(uid, s.xp, s.solved, s.pieces, s.best_n, s.works, s.shelves, s.daily_n, s.streak, s.streak_best, s.last_day, s.photo_n, s.room_n, s.live_n, s.night_n, s.fast_n, lastDayKey ? dayXp.get(lastDayKey) ?? 0 : 0, lastDayKey),
  ];
  for (const [key, c] of writeCleared) w.push(DB.prepare('INSERT INTO user_cleared (user_id, key, cat, n, at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(user_id, key) DO UPDATE SET n = MAX(n, excluded.n)').bind(uid, key, c.cat, c.n, c.at));
  for (const [week, xp] of weekXp) w.push(DB.prepare('INSERT INTO user_week (user_id, week, xp) VALUES (?, ?, ?) ON CONFLICT(user_id, week) DO UPDATE SET xp = xp + excluded.xp').bind(uid, week, xp));
  for (const code of fresh) w.push(DB.prepare('INSERT OR IGNORE INTO user_badges (user_id, code, at) VALUES (?, ?, ?)').bind(uid, code, now));
  await DB.batch(w);

  const level = levelOf(s.xp);
  return { xp: s.xp, gained, level, prevLevel, levelUp: level > prevLevel, badges: fresh, stats, capped };
}

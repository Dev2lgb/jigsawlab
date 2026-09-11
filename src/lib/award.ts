// 서버 전용 — 완성 기록을 받아 XP·누적 지표·업적·주간 랭킹에 반영한다. 규칙 자체는 lib/level.ts
import { WORK_BY_KEY, WORKS } from '../data/works';
import { EMPTY_STATS, DAY_CAP, earnedCodes, kstDay, kstHour, levelOf, plausible, prevDay, rateFor, weekOf, xpFor, type Kind, type Solve, type Stats } from './level';

/** 카테고리(진열대)마다 그림이 몇 점인지 — '진열대 완주' 판정용 */
const CAT_TOTAL: Record<string, number> = {};
for (const w of WORKS) CAT_TOTAL[w.cat] = (CAT_TOTAL[w.cat] ?? 0) + 1;

export interface AwardResult { xp: number; gained: number; level: number; prevLevel: number; levelUp: boolean; badges: string[]; stats: Stats; capped: boolean; rate?: number }

interface Row extends Stats { last_day: string | null; day_xp: number; day_key: string | null }
const ZERO: Row = { ...EMPTY_STATS, last_day: null, day_xp: 0, day_key: null };

/**
 * solves 를 순서대로 반영한다. 호출 쪽에서 이미 기록으로 인정된 판만 넘겨야 한다
 * (user_done 에 실제로 새로 들어간 행만 — 같은 기록을 여러 기기에서 두 번 올려도 XP 는 한 번)
 *
 * user_stats 행이 없으면 = 레벨 기능 전부터 쓰던 회원이거나 첫 판이다. 이때 user_done 에 이미
 * 쌓여 있는 옛 기록을 한 번에 접어 넣는다 — 안 그러면 그 기록들은 merge 때 INSERT OR IGNORE 로
 * 걸러져 영영 XP 가 안 붙는다. 접어 넣고 나면 user_stats 행이 생기므로 두 번 돌지 않는다
 */
export async function award(DB: D1Database, uid: string, solves: Solve[]): Promise<AwardResult | null> {
  solves = [...solves].sort((a, b) => a.at - b.at);
  const srow = await DB.prepare('SELECT * FROM user_stats WHERE user_id = ?').bind(uid).first<Row>();
  if (!srow) {
    const old = await DB.prepare('SELECT at, key, kind, n, sec, day FROM user_done WHERE user_id = ? ORDER BY at ASC LIMIT 500').bind(uid).all<{ at: number; key: string; kind: string; n: number; sec: number; day: string | null }>();
    const have = new Set(solves.map((x) => x.at));
    const back = (old.results ?? []).filter((r) => !have.has(r.at)).map((r): Solve => ({ kind: r.kind as Solve['kind'], key: r.key, n: r.n, sec: r.sec, at: r.at, day: r.day }));
    if (back.length) solves = [...back, ...solves].sort((a, b) => a.at - b.at);
  }
  if (!solves.length) return null;
  const keys = [...new Set(solves.filter((s) => s.kind === 'gallery' || s.kind === 'daily').map((s) => s.key))];

  const [brow, crow, krow] = await Promise.all([
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
  const prevXp = s.xp;
  let gained = 0, lastDayKey = s.day_key, newWorks = false, capped = false;

  for (const sv of solves) {
    const work = sv.kind === 'gallery' || sv.kind === 'daily' ? WORK_BY_KEY[sv.key] : undefined;
    const n = Math.max(0, Math.min(4000, Math.round(sv.n)));
    const mine = sv.mine === undefined ? n : Math.max(0, Math.min(n, Math.round(sv.mine)));
    const clean = plausible(sv, mine);
    const day = kstDay(sv.at);
    // 이 그림을 처음 깨는가. 오늘의 퍼즐은 날마다 그림이 달라서 '그 날 것을 처음 깼는가' 와 같은 뜻이다
    const firstClear = !!work && cleared.get(sv.key) === undefined;

    // XP (하루 상한 안에서). 오늘의 퍼즐도 재도전 감산을 그대로 받는다 —
    // 판을 몇 번이고 다시 열 수 있어서, 빼 주면 48조각짜리를 계속 돌려 XP 를 캘 수 있다
    let xp = xpFor(sv, work ? cleared.get(sv.key) ?? null : null);
    const used = dayXp.get(day) ?? 0;
    if (xp > DAY_CAP - used) capped = true; // 하루 상한에 걸려 깎였다는 것만 알려 준다
    xp = Math.max(0, Math.min(xp, DAY_CAP - used));
    if (xp > 0) { dayXp.set(day, used + xp); if (!lastDayKey || day > lastDayKey) lastDayKey = day; gained += xp; s.xp += xp; weekXp.set(weekOf(day), (weekXp.get(weekOf(day)) ?? 0) + xp); }

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
      if (firstClear) s.daily_n += 1; // 같은 날 것을 여러 번 맞춰도 한 판으로 (오늘의 퍼즐 100번 업적)
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

  // XP 는 다른 칸과 갈라 따로 얹는다. 통째로 덮어쓰면(xp = excluded.xp) 이 판을 맞추는 동안 조각 단위
  // 정산이 올린 XP 가 그대로 사라지고, 하루 상한도 읽은 값으로 계산해 쓰면 동시에 온 요청이 저마다
  // 옛 day_xp 를 보고 상한을 몇 배로 넘긴다 — D1 은 문장 하나만 원자적이라 SELECT 와 UPDATE 사이가 빈다.
  // 그래서 상한 검사를 WHERE 로 옮겼다: 들어가면 정확히 그만큼, 안 들어가면 행이 안 돌아온다
  const dayGain = lastDayKey ? (dayXp.get(lastDayKey) ?? 0) - (lastDayKey === s.day_key ? s.day_xp : 0) : 0;
  const past = Math.max(0, gained - dayGain); // 지난 날짜 몫(로그인 직후 합치기) — 오늘 상한과 무관하다
  if (!srow) await DB.prepare('INSERT OR IGNORE INTO user_stats (user_id) VALUES (?)').bind(uid).run();
  let newXp = prevXp;
  if (gained > 0 && lastDayKey) {
    const r = await DB.prepare(`UPDATE user_stats SET xp = xp + ?, day_xp = (CASE WHEN day_key = ? THEN day_xp ELSE 0 END) + ?, day_key = ?, updated_at = unixepoch()
        WHERE user_id = ? AND (CASE WHEN day_key = ? THEN day_xp ELSE 0 END) + ? <= ?
        RETURNING xp`).bind(gained, lastDayKey, dayGain, lastDayKey, uid, lastDayKey, dayGain, DAY_CAP).first<{ xp: number }>();
    if (r) newXp = r.xp;
    else {
      // 그 날 몫이 상한에 막혔다 — 지난 날짜 몫만 얹고 주간 XP 에서도 그 날 몫을 뺀다
      capped = true; gained = past;
      const wk = weekOf(lastDayKey), left = (weekXp.get(wk) ?? 0) - dayGain;
      if (left > 0) weekXp.set(wk, left); else weekXp.delete(wk);
      const r2 = past > 0 ? await DB.prepare('UPDATE user_stats SET xp = xp + ?, updated_at = unixepoch() WHERE user_id = ? RETURNING xp').bind(past, uid).first<{ xp: number }>() : null;
      newXp = r2?.xp ?? prevXp;
    }
  }

  const w: D1PreparedStatement[] = [
    DB.prepare(`INSERT INTO user_stats (user_id, solved, pieces, best_n, works, shelves, daily_n, streak, streak_best, last_day, photo_n, room_n, live_n, night_n, fast_n, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, unixepoch())
      ON CONFLICT(user_id) DO UPDATE SET solved = excluded.solved, pieces = excluded.pieces, best_n = excluded.best_n, works = excluded.works, shelves = excluded.shelves,
        daily_n = excluded.daily_n, streak = excluded.streak, streak_best = excluded.streak_best, last_day = excluded.last_day, photo_n = excluded.photo_n, room_n = excluded.room_n,
        live_n = excluded.live_n, night_n = excluded.night_n, fast_n = excluded.fast_n, updated_at = unixepoch()`)
      .bind(uid, s.solved, s.pieces, s.best_n, s.works, s.shelves, s.daily_n, s.streak, s.streak_best, s.last_day, s.photo_n, s.room_n, s.live_n, s.night_n, s.fast_n),
  ];
  for (const [key, c] of writeCleared) w.push(DB.prepare('INSERT INTO user_cleared (user_id, key, cat, n, at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(user_id, key) DO UPDATE SET n = MAX(n, excluded.n)').bind(uid, key, c.cat, c.n, c.at));
  for (const [week, xp] of weekXp) w.push(DB.prepare('INSERT INTO user_week (user_id, week, xp) VALUES (?, ?, ?) ON CONFLICT(user_id, week) DO UPDATE SET xp = xp + excluded.xp').bind(uid, week, xp));
  for (const code of fresh) w.push(DB.prepare('INSERT OR IGNORE INTO user_badges (user_id, code, at) VALUES (?, ?, ?)').bind(uid, code, now));
  await DB.batch(w);

  const level = levelOf(newXp), prevLv = levelOf(newXp - gained);
  return { xp: newXp, gained, level, prevLevel: prevLv, levelUp: level > prevLv, badges: fresh, stats: { ...stats, xp: newXp }, capped };
}

/**
 * 조각을 놓는 동안 쌓이는 XP. 완성 정산(award)과 달리 XP·주간 XP 만 건드린다 —
 * 업적은 전부 완성 지표(solved·pieces·works…)에 걸려 있어 여기서 새로 딸 것이 없고,
 * 누적 지표도 완성 때 한 번에 세는 편이 어긋날 여지가 없다.
 * 두 번 주지 않기: 여기서 준 조각 수를 클라이언트가 세어 두었다가 완성 기록에 paid 로 실어 보내면
 * 그만큼 빼고 정산한다(xpFor). 그래서 완성 시점에는 아직 안 보낸 나머지만 붙는다.
 *
 * 조각마다 서버를 두드리면 무료 티어가 남아나지 않으므로 클라이언트가 모아서 보낸다(Jigsaw.astro 의 flushXp).
 */
export async function awardPieces(DB: D1Database, uid: string, p: { kind: Kind; key: string; n: number; placed: number; at: number }): Promise<AwardResult | null> {
  // user_stats 행이 없는 회원은 옛 기록 접어 넣기(award 의 백필)를 먼저 돌려야 한다.
  // 여기서 덜컥 행을 만들어 버리면 그 백필이 영영 안 돈다
  let srow = await DB.prepare('SELECT * FROM user_stats WHERE user_id = ?').bind(uid).first<Row>();
  if (!srow) { await award(DB, uid, []); srow = await DB.prepare('SELECT * FROM user_stats WHERE user_id = ?').bind(uid).first<Row>(); }
  const s: Row = { ...ZERO, ...(srow ?? {}) };
  const stats: Stats = { xp: s.xp, solved: s.solved, pieces: s.pieces, best_n: s.best_n, works: s.works, shelves: s.shelves, daily_n: s.daily_n, streak: s.streak, streak_best: s.streak_best, photo_n: s.photo_n, room_n: s.room_n, live_n: s.live_n, night_n: s.night_n, fast_n: s.fast_n };
  const prevLevel = levelOf(s.xp);
  const flat = (gained: number, capped: boolean, rate?: number): AwardResult => ({ xp: s.xp + gained, gained, level: levelOf(s.xp + gained), prevLevel, levelUp: levelOf(s.xp + gained) > prevLevel, badges: [], stats: { ...stats, xp: s.xp + gained }, capped, rate });

  const work = p.kind === 'gallery' || p.kind === 'daily' ? WORK_BY_KEY[p.key] : undefined;
  const prevN = work ? (await DB.prepare('SELECT n FROM user_cleared WHERE user_id = ? AND key = ?').bind(uid, p.key).first<{ n: number }>())?.n ?? null : null;
  const day = kstDay(p.at), week = weekOf(day);
  const want = xpFor({ kind: p.kind, key: p.key, n: p.n, sec: 0, mine: p.placed, at: p.at }, prevN);
  const rate = rateFor(p.kind, p.n, prevN); // 판 화면 HUD 가 쓸 실제 배율 (재도전 감산까지)
  if (want <= 0) return flat(0, false, rate);
  if (!srow) await DB.prepare('INSERT OR IGNORE INTO user_stats (user_id) VALUES (?)').bind(uid).run();

  // 하루 상한을 WHERE 로 건다. 읽고 나서 쓰면 동시에 날아온 요청들이 저마다 옛 day_xp 를 보고
  // 상한을 몇 배로 넘겨 버린다 — D1 은 문장 하나만 원자적이고 트랜잭션이 없다.
  // 통과하면 정확히 want 만큼, 못 하면 행이 안 돌아와 0. 상한에 닿는 그 한 묶음만 손해고 넘길 수는 없다
  const row = await DB.prepare(`UPDATE user_stats SET xp = xp + ?, day_xp = (CASE WHEN day_key = ? THEN day_xp ELSE 0 END) + ?, day_key = ?, updated_at = unixepoch()
      WHERE user_id = ? AND (CASE WHEN day_key = ? THEN day_xp ELSE 0 END) + ? <= ?
      RETURNING xp`).bind(want, day, want, day, uid, day, want, DAY_CAP).first<{ xp: number }>();
  if (!row) return flat(0, true, rate);

  await DB.prepare('INSERT INTO user_week (user_id, week, xp) VALUES (?, ?, ?) ON CONFLICT(user_id, week) DO UPDATE SET xp = xp + excluded.xp').bind(uid, week, want).run();
  const total = row.xp, level = levelOf(total), prevLv = levelOf(total - want);
  return { xp: total, gained: want, level, prevLevel: prevLv, levelUp: level > prevLv, badges: [], stats: { ...stats, xp: total }, capped: false, rate };
}

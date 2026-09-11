// 서버 전용 — 완성 기록을 받아 XP·누적 지표·업적·주간 랭킹에 반영한다. 규칙 자체는 lib/level.ts
import { WORK_BY_KEY, WORKS } from '../data/works';
import { EMPTY_STATS, DAY_CAP, earnedCodes, kstDay, kstHour, levelOf, plausible, prevDay, rateFor, weekOf, xpFor, type Kind, type Solve, type Stats } from './level';

/** 카테고리(진열대)마다 그림이 몇 점인지 — '진열대 완주' 판정용 */
const CAT_TOTAL: Record<string, number> = {};
for (const w of WORKS) CAT_TOTAL[w.cat] = (CAT_TOTAL[w.cat] ?? 0) + 1;

// 오늘의 퍼즐은 날짜마다 한 번만 세려고 user_cleared 에 'd:YYYY-MM-DD' 행을 따로 둔다(cat = DAILY_CAT).
// 그림 키로 세면 그 그림을 진열대에서 먼저 깬 사람은 오늘의 퍼즐을 완성해도 안 세어졌다. 이 행은 그림 수·진열대 셈에서 뺀다
const DAILY_CAT = '_daily';
const dailyKey = (s: Solve) => `d:${s.day || kstDay(s.at)}`;

export interface AwardResult { xp: number; gained: number; level: number; prevLevel: number; levelUp: boolean; badges: string[]; stats: Stats; capped: boolean; rate?: number }

export interface Row extends Stats { last_day: string | null; day_xp: number; day_key: string | null }
const ZERO: Row = { ...EMPTY_STATS, last_day: null, day_xp: 0, day_key: null };
const SELECT = 'SELECT * FROM user_stats WHERE user_id = ?';
// user_stats 에서 완성 정산이 통째로 덮어쓰는 칸 (xp·day_xp·day_key 는 빼고 — 그 셋은 addXp 만 만진다)
const STAT_COLS = ['solved', 'pieces', 'best_n', 'works', 'shelves', 'daily_n', 'streak', 'streak_best', 'last_day', 'photo_n', 'room_n', 'live_n', 'night_n', 'fast_n'] as const;

/** D1 행 → 화면·업적 판정에 쓰는 지표만 (없으면 0) */
export const pickStats = (r: Partial<Record<keyof Stats, unknown>> | null | undefined): Stats => { const s = { ...EMPTY_STATS }; if (r) for (const k of Object.keys(EMPTY_STATS) as (keyof Stats)[]) s[k] = Number(r[k] ?? 0); return s; };
/** 정산 결과. prevXp = 이 정산 전의 XP, gained = 이번에 붙은 XP */
const result = (stats: Stats, prevXp: number, gained: number, o: { badges?: string[]; capped?: boolean; rate?: number } = {}): AwardResult => {
  const xp = prevXp + gained, level = levelOf(xp), prevLevel = levelOf(prevXp);
  return { xp, gained, level, prevLevel, levelUp: level > prevLevel, badges: o.badges ?? [], stats: { ...stats, xp }, capped: !!o.capped, rate: o.rate };
};
/**
 * XP 를 하루 상한 안에서 더한다 — 상한 검사와 증가가 한 문장. 읽고 나서 쓰면 동시에 날아온 요청들이 저마다 옛 day_xp 를
 * 보고 상한을 몇 배로 넘겨 버린다(D1 은 문장 하나만 원자적이고 트랜잭션이 없다. /rank/ 가 공개라 랭킹이 통째로 무의미해진다).
 * 통과하면 새 xp, 못 하면 null(행이 안 돌아온다) — 상한에 닿는 그 한 묶음만 손해고 넘길 수는 없다.
 * xp = xp + ? 로 더하는 것도 같은 이유: 덮어쓰면 그 사이 조각 단위로 붙은 XP 가 사라진다
 */
export async function addXp(DB: D1Database, uid: string, xp: number, day: string): Promise<number | null> {
  const r = await DB.prepare(`UPDATE user_stats SET xp = xp + ?, day_xp = (CASE WHEN day_key = ? THEN day_xp ELSE 0 END) + ?, day_key = ?, updated_at = unixepoch()
      WHERE user_id = ? AND (CASE WHEN day_key = ? THEN day_xp ELSE 0 END) + ? <= ?
      RETURNING xp`).bind(xp, day, xp, day, uid, day, xp, DAY_CAP).first<{ xp: number }>();
  return r ? r.xp : null;
}
/** user_stats 행을 보장하고 돌려준다. 없으면 award 가 만들면서 user_done 의 옛 기록을 접어 넣으므로(백필) 여기서 직접 INSERT 하지 않는다 */
export async function ensureStats(DB: D1Database, uid: string): Promise<Row | null> {
  let r = await DB.prepare(SELECT).bind(uid).first<Row>();
  if (!r) { await award(DB, uid, []); r = await DB.prepare(SELECT).bind(uid).first<Row>(); }
  return r;
}
/** 내 순위 = 나보다 XP 가 많은 (닉네임 있는) 회원 수 + 1. XP 가 0 이면 순위 없음 */
export async function rankOf(DB: D1Database, tab: 'week' | 'all', week: string, xp: number): Promise<number | null> {
  if (!(xp > 0)) return null;
  const c = tab === 'week'
    ? await DB.prepare("SELECT COUNT(*) AS c FROM user_week w JOIN users u2 ON u2.id = w.user_id WHERE w.week = ? AND u2.nick <> '' AND w.xp > ?").bind(week, xp).first<{ c: number }>()
    : await DB.prepare("SELECT COUNT(*) AS c FROM user_stats s JOIN users u2 ON u2.id = s.user_id WHERE u2.nick <> '' AND s.xp > ?").bind(xp).first<{ c: number }>();
  return (c?.c ?? 0) + 1;
}

/**
 * solves 를 순서대로 반영한다. 호출 쪽에서 이미 기록으로 인정된 판만 넘겨야 한다
 * (user_done 에 실제로 새로 들어간 행만 — 같은 기록을 여러 기기에서 두 번 올려도 XP 는 한 번)
 *
 * user_stats 행이 없으면 = 레벨 기능 전부터 쓰던 회원이거나 첫 판이다. 이때 user_done 에 이미
 * 쌓여 있는 옛 기록을 한 번에 접어 넣는다 — 안 그러면 그 기록들은 merge 때 INSERT OR IGNORE 로
 * 걸러져 영영 XP 가 안 붙는다. 행을 먼저 만들고 실제로 만든 요청만 접어 넣는다: /api/level·merge·pieces 가
 * 같은 순간에 오면 저마다 빈 행을 보고 같은 기록을 겹으로 더했다
 */
export async function award(DB: D1Database, uid: string, solves: Solve[]): Promise<AwardResult | null> {
  solves = [...solves].sort((a, b) => a.at - b.at);
  let srow = await DB.prepare(SELECT).bind(uid).first<Row>();
  let fresh = false; // 이 요청이 user_stats 행을 만들었다 (그림 수·진열대 수를 처음부터 센다)
  if (!srow) {
    const ins = await DB.prepare('INSERT OR IGNORE INTO user_stats (user_id) VALUES (?)').bind(uid).run();
    if (ins.meta.changes) {
      fresh = true;
      const old = await DB.prepare('SELECT at, key, kind, n, sec, day FROM user_done WHERE user_id = ? ORDER BY at ASC LIMIT 500').bind(uid).all<{ at: number; key: string; kind: string; n: number; sec: number; day: string | null }>();
      const have = new Set(solves.map((x) => x.at));
      const back = (old.results ?? []).filter((r) => !have.has(r.at)).map((r): Solve => ({ kind: r.kind as Solve['kind'], key: r.key, n: r.n, sec: r.sec, at: r.at, day: r.day }));
      if (back.length) solves = [...back, ...solves].sort((a, b) => a.at - b.at);
    } else srow = await DB.prepare(SELECT).bind(uid).first<Row>(); // 동시에 온 다른 요청이 만들었다 — 그쪽이 접어 넣는다
  }
  if (!solves.length) return null;
  const now = Date.now(), today = kstDay(now);
  const keys = [...new Set(solves.flatMap((s) => (s.kind === 'gallery' ? [s.key] : s.kind === 'daily' ? [s.key, dailyKey(s)] : [])))];

  const [brow, crow, krow] = await Promise.all([
    DB.prepare('SELECT code FROM user_badges WHERE user_id = ?').bind(uid).all<{ code: string }>(),
    keys.length ? DB.prepare('SELECT cat, COUNT(*) AS c FROM user_cleared WHERE user_id = ? GROUP BY cat').bind(uid).all<{ cat: string; c: number }>() : Promise.resolve({ results: [] as { cat: string; c: number }[] }),
    keys.length ? DB.prepare(`SELECT key, n FROM user_cleared WHERE user_id = ? AND key IN (${keys.map(() => '?').join(',')})`).bind(uid, ...keys).all<{ key: string; n: number }>() : Promise.resolve({ results: [] as { key: string; n: number }[] }),
  ]);

  const s: Row = { ...ZERO, ...(srow ?? {}) };
  const had = new Set((brow.results ?? []).map((r) => r.code));
  const catCount = new Map<string, number>((crow.results ?? []).map((r) => [r.cat, r.c]));
  const cleared = new Map<string, number>((krow.results ?? []).map((r) => [r.key, r.n]));

  // 하루 XP 상한 — 이 요청에서 생기는 XP 는 기록의 날짜를 가리지 않고 전부 서버의 오늘 몫으로 센다.
  // 기록의 at 별로 나눠 세면 클라이언트가 날짜만 바꿔 보내 상한을 날짜 수만큼 곱해 갈 수 있다
  // (재시도로 여러 건이 한꺼번에 와도 첫날 상한 안에서만 — 그 대신 랭킹이 안전하다)
  let used = s.day_key === today ? s.day_xp : 0;
  const weekXp = new Map<string, number>();
  const writeCleared = new Map<string, { cat: string; n: number; at: number }>();
  const prevXp = s.xp;
  let gained = 0, newWorks = false, capped = false;

  for (const sv of solves) {
    const work = sv.kind === 'gallery' || sv.kind === 'daily' ? WORK_BY_KEY[sv.key] : undefined;
    const n = Math.max(0, Math.min(4000, Math.round(sv.n)));
    const mine = sv.mine === undefined ? n : Math.max(0, Math.min(n, Math.round(sv.mine)));
    const clean = plausible(sv, mine);
    const at = Math.min(sv.at, now), day = kstDay(at); // 클라이언트 시계가 앞서 있어도 오늘을 넘기지 않는다

    // XP (하루 상한 안에서). 오늘의 퍼즐도 재도전 감산을 그대로 받는다 —
    // 판을 몇 번이고 다시 열 수 있어서, 빼 주면 48조각짜리를 계속 돌려 XP 를 캘 수 있다
    let xp = xpFor(sv, work ? cleared.get(sv.key) ?? null : null);
    if (xp > DAY_CAP - used) capped = true; // 하루 상한에 걸려 깎였다는 것만 알려 준다
    xp = Math.max(0, Math.min(xp, DAY_CAP - used));
    if (xp > 0) { used += xp; gained += xp; const wk = weekOf(day); weekXp.set(wk, (weekXp.get(wk) ?? 0) + xp); }

    // 누적 지표 — 사람 손으로 보기 어려운 기록은 여기에도 안 넣는다 (user_done 의 기록으로만 남는다)
    if (!clean) continue;
    s.pieces += mine;
    if (sv.kind === 'live') { s.live_n += 1; continue; }
    s.solved += 1;
    // 방에서 맞춘 판은 절반 넘게 내가 놓았을 때만 '가장 큰 판' 으로 친다
    if (n > s.best_n && (!sv.room || mine * 2 >= n)) s.best_n = n;
    if (sv.room) s.room_n += 1;
    if (sv.kind === 'photo') s.photo_n += 1;
    if (kstHour(at) < 5) s.night_n += 1;
    if (!sv.room && n >= 300 && sv.sec > 0 && sv.sec <= n * 2) s.fast_n += 1;
    if (sv.kind === 'daily') {
      // 오늘의 퍼즐 100번: 날짜(그 날의 그림)마다 한 번. 같은 날 것을 여러 번 맞춰도 한 판
      const dk = dailyKey(sv);
      if (cleared.get(dk) === undefined) { s.daily_n += 1; cleared.set(dk, n); writeCleared.set(dk, { cat: DAILY_CAT, n, at }); }
      // 연속은 푼 날짜로 센다 — 지난 7일 판을 하루에 몰아 풀어도 하루다.
      // 어제 다음에 오늘이면 이어지고, 하루라도 비면 1 부터. 이미 센 날짜보다 과거는 건드리지 않는다
      if (!s.last_day || day > s.last_day) { s.streak = s.last_day && prevDay(day) === s.last_day ? s.streak + 1 : 1; s.last_day = day; if (s.streak > s.streak_best) s.streak_best = s.streak; }
    }
    if (work) {
      const prev = cleared.get(sv.key);
      if (prev === undefined) { catCount.set(work.cat, (catCount.get(work.cat) ?? 0) + 1); newWorks = true; }
      if (prev === undefined || n > prev) { cleared.set(sv.key, Math.max(prev ?? 0, n)); writeCleared.set(sv.key, { cat: work.cat, n: Math.max(prev ?? 0, n), at }); }
    }
  }

  if (newWorks || fresh) {
    const cats = [...catCount.entries()].filter(([cat]) => cat !== DAILY_CAT);
    s.works = cats.reduce((a, [, c]) => a + c, 0);
    s.shelves = cats.filter(([cat, c]) => c >= (CAT_TOTAL[cat] ?? Infinity)).length;
  }

  const stats = pickStats(s);
  const freshBadges = earnedCodes(stats).filter((c) => !had.has(c));
  const nowSec = Math.floor(now / 1000);

  // XP 는 다른 칸과 갈라 따로 얹는다(addXp — 상한 검사와 증가가 한 문장). 아래 UPSERT 는 xp 를 건드리지 않는다
  let newXp = prevXp;
  if (gained > 0) {
    const r = await addXp(DB, uid, gained, today);
    if (r !== null) newXp = r;
    else { capped = true; gained = 0; weekXp.clear(); } // 그 사이 다른 요청이 상한을 채웠다
  }

  const w: D1PreparedStatement[] = [
    DB.prepare(`INSERT INTO user_stats (user_id, ${STAT_COLS.join(', ')}, updated_at) VALUES (?, ${STAT_COLS.map(() => '?').join(', ')}, unixepoch())
      ON CONFLICT(user_id) DO UPDATE SET ${STAT_COLS.map((c) => `${c} = excluded.${c}`).join(', ')}, updated_at = unixepoch()`)
      .bind(uid, ...STAT_COLS.map((c) => s[c])),
  ];
  for (const [key, c] of writeCleared) w.push(DB.prepare('INSERT INTO user_cleared (user_id, key, cat, n, at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(user_id, key) DO UPDATE SET n = MAX(n, excluded.n)').bind(uid, key, c.cat, c.n, c.at));
  for (const [week, xp] of weekXp) w.push(DB.prepare('INSERT INTO user_week (user_id, week, xp) VALUES (?, ?, ?) ON CONFLICT(user_id, week) DO UPDATE SET xp = xp + excluded.xp').bind(uid, week, xp));
  for (const code of freshBadges) w.push(DB.prepare('INSERT OR IGNORE INTO user_badges (user_id, code, at) VALUES (?, ?, ?)').bind(uid, code, nowSec));
  await DB.batch(w);

  return result(stats, newXp - gained, gained, { badges: freshBadges, capped });
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
  // 여기서 덜컥 행을 만들어 버리면 그 백필이 영영 안 돈다 (award 가 행을 만들고 돌아온다)
  const s: Row = { ...ZERO, ...((await ensureStats(DB, uid)) ?? {}) };
  const stats = pickStats(s);

  const work = p.kind === 'gallery' || p.kind === 'daily' ? WORK_BY_KEY[p.key] : undefined;
  const prevN = work ? (await DB.prepare('SELECT n FROM user_cleared WHERE user_id = ? AND key = ?').bind(uid, p.key).first<{ n: number }>())?.n ?? null : null;
  const day = kstDay(p.at), week = weekOf(day);
  const want = xpFor({ kind: p.kind, key: p.key, n: p.n, sec: 0, mine: p.placed, at: p.at }, prevN);
  const rate = rateFor(p.kind, p.n, prevN); // 판 화면 HUD 가 쓸 실제 배율 (재도전 감산까지)
  if (want <= 0) return result(stats, s.xp, 0, { rate });
  // 하루 상한은 addXp 가 한 문장으로 건다. 못 들어가면 이 묶음은 0 (capped)
  const newXp = await addXp(DB, uid, want, day);
  if (newXp === null) return result(stats, s.xp, 0, { capped: true, rate });
  await DB.prepare('INSERT INTO user_week (user_id, week, xp) VALUES (?, ?, ?) ON CONFLICT(user_id, week) DO UPDATE SET xp = xp + excluded.xp').bind(uid, week, want).run();
  return result(stats, newXp - want, want, { rate });
}

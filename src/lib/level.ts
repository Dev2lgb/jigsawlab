// 레벨·XP·업적 규칙 (순수 계산). 서버(award.ts·api)와 브라우저(/my/·/rank/·완성 화면)가 같이 쓴다.
// 서버가 계산한 값만 진짜다 — 브라우저 쪽은 잠긴 업적을 회색으로 그리거나 다음 레벨까지 남은 양을 보여 주는 용도

export { TOTAL_WORKS } from '../data/counts';
import { TOTAL_WORKS } from '../data/counts';

// ── XP
// 조각 하나를 제자리에 놓으면 1 XP 가 기본. 시간·수순은 안 본다(클라이언트가 보내는 값이라 조작이 쉽고,
// 빨리 푸는 사람이 아니라 많이 맞춘 사람이 위로 가는 편이 랭킹으로도 건강하다)
export const XP_PER_PIECE = 1;
export const DAILY_BONUS = 1.5;   // 오늘의 퍼즐
export const REPEAT_RATE = 0.25;  // 이미 그만큼 깬 그림을 다시 (오늘의 퍼즐도 다시 열 수 있으므로 똑같이 적용)
export const DAY_CAP = 5000;      // 하루에 받을 수 있는 XP 상한
export const MIN_SEC_PER_PIECE = 0.25; // 조각 하나에 이보다 빠르면 사람 손이 아니라고 보고 XP 도 지표도 안 준다 (기록 자체는 남는다)

export type Kind = 'gallery' | 'daily' | 'photo' | 'live';
// paid = 조각을 놓는 동안 이미 준 XP 의 조각 수. 완성 정산에서 그만큼 빼야 두 번 주지 않는다
export interface Solve { kind: Kind; key: string; n: number; sec: number; mine?: number; paid?: number; at: number; day?: string | null; room?: boolean }

/** 사람이 손으로 놓은 것으로 볼 수 있는 기록인지 */
export const plausible = (s: Solve, mine: number) => s.kind === 'live' || !(s.sec > 0) || s.sec >= mine * MIN_SEC_PER_PIECE;

/** 이 판에 걸리는 배율 — 오늘의 퍼즐 보너스와 재도전 감산. 판 화면이 HUD 에 쓸 배율도 여기서 나온다 */
export const rateFor = (kind: Kind, n: number, prevN: number | null): number =>
  (kind === 'daily' ? DAILY_BONUS : 1) * (prevN !== null && n <= prevN ? REPEAT_RATE : 1);

/** 한 판이 주는 XP. prevN = 이 그림을 전에 깬 최대 조각 수(없으면 null) */
export function xpFor(s: Solve, prevN: number | null): number {
  const n = Math.max(0, Math.min(4000, Math.round(s.n)));
  const mine = s.mine === undefined ? n : Math.max(0, Math.min(n, Math.round(s.mine)));
  // 기준은 판 전체가 아니라 내가 놓은 조각 — 방에 늦게 들어와 몇 조각만 놓고 끝난 판도 정상이다
  if (!plausible(s, mine)) return 0;
  const paid = Math.max(0, Math.min(mine, Math.round(s.paid ?? 0)));
  return Math.round((mine - paid) * XP_PER_PIECE * rateFor(s.kind, n, prevN));
}

/** 이 조각 수를 끝내면 받을 XP (처음 맞추는 그림 기준 — 재도전 감산·하루 상한은 뺀 값) */
export const earnFor = (n: number, kind: Kind = 'gallery') => Math.round(n * (kind === 'daily' ? DAILY_BONUS : 1));

// ── 레벨 곡선: 레벨 L 에 닿는 데 필요한 누적 XP = 50·L·(L−1)
// L2 100 · L5 1,000 · L10 4,500 · L20 19,000 · L30 43,500 · L50 122,500
export const LEVEL_CAP = 99;
export const xpAtLevel = (l: number) => 50 * l * (l - 1);
export const levelOf = (xp: number) => Math.max(1, Math.min(LEVEL_CAP, Math.floor((1 + Math.sqrt(1 + Math.max(0, xp) / 12.5)) / 2)));
/** 지금 레벨 안에서 얼마나 왔는지 */
export function levelProgress(xp: number) {
  const level = levelOf(xp), cur = xpAtLevel(level), next = level >= LEVEL_CAP ? cur : xpAtLevel(level + 1);
  const span = Math.max(1, next - cur);
  return { level, xp, cur, next, into: xp - cur, need: Math.max(0, next - xp), pct: level >= LEVEL_CAP ? 100 : Math.min(100, ((xp - cur) / span) * 100) };
}
/** 레벨 구간 이름 (문구는 i18n/badges.ts 의 TIER_NAMES) */
export const TIERS = [1, 5, 10, 20, 30, 45, 60] as const;
export const tierOf = (level: number) => { let i = 0; for (let k = 0; k < TIERS.length; k++) if (level >= TIERS[k]) i = k; return i; };

// ── 업적
export interface Stats {
  xp: number; solved: number; pieces: number; best_n: number; works: number; shelves: number;
  daily_n: number; streak: number; streak_best: number; photo_n: number; room_n: number; live_n: number; night_n: number; fast_n: number;
}
export const EMPTY_STATS: Stats = { xp: 0, solved: 0, pieces: 0, best_n: 0, works: 0, shelves: 0, daily_n: 0, streak: 0, streak_best: 0, photo_n: 0, room_n: 0, live_n: 0, night_n: 0, fast_n: 0 };

export interface BadgeDef { code: string; icon: string; group: 'solve' | 'size' | 'daily' | 'collect' | 'social' | 'quirk'; goal: (s: Stats) => number; need: number }
const b = (code: string, icon: string, group: BadgeDef['group'], need: number, goal: (s: Stats) => number): BadgeDef => ({ code, icon, group, need, goal });
/** 순서 = 화면에 놓이는 순서 */
export const BADGES: BadgeDef[] = [
  b('first', '🧩', 'solve', 1, (s) => s.solved),
  b('solve10', '🎯', 'solve', 10, (s) => s.solved),
  b('solve50', '🏅', 'solve', 50, (s) => s.solved),
  b('solve100', '🏆', 'solve', 100, (s) => s.solved),
  b('solve500', '👑', 'solve', 500, (s) => s.solved),
  b('p300', '📐', 'size', 300, (s) => s.best_n),
  b('p500', '🧠', 'size', 500, (s) => s.best_n),
  b('p1000', '🗻', 'size', 1000, (s) => s.best_n),
  b('p2000', '🌋', 'size', 2000, (s) => s.best_n),
  b('pieces10k', '✨', 'size', 10_000, (s) => s.pieces),
  b('pieces100k', '🌌', 'size', 100_000, (s) => s.pieces),
  b('daily7', '🔥', 'daily', 7, (s) => s.streak_best),
  b('daily30', '☄️', 'daily', 30, (s) => s.streak_best),
  b('daily100', '📅', 'daily', 100, (s) => s.daily_n),
  b('works50', '🖼️', 'collect', 50, (s) => s.works),
  b('works150', '🏛️', 'collect', 150, (s) => s.works),
  b('worksAll', '🎨', 'collect', TOTAL_WORKS, (s) => s.works),
  b('shelf1', '📚', 'collect', 1, (s) => s.shelves),
  b('shelf5', '🗂️', 'collect', 5, (s) => s.shelves),
  b('photo1', '📷', 'social', 1, (s) => s.photo_n),
  b('room1', '🤝', 'social', 1, (s) => s.room_n),
  b('live1', '🌍', 'social', 1, (s) => s.live_n),
  b('night5', '🌙', 'quirk', 5, (s) => s.night_n),
  b('fast1', '⚡', 'quirk', 1, (s) => s.fast_n),
];
export const BADGE_BY_CODE: Record<string, BadgeDef> = Object.fromEntries(BADGES.map((x) => [x.code, x]));
/** 지금 지표로 조건을 채운 업적 코드 */
export const earnedCodes = (s: Stats): string[] => BADGES.filter((x) => x.goal(s) >= x.need).map((x) => x.code);

// ── 날짜 (KST 기준. 사이트 전체가 KST 로 하루를 센다)
export const kstDay = (ms: number) => new Date(ms + 9 * 3600e3).toISOString().slice(0, 10);
export const kstHour = (ms: number) => new Date(ms + 9 * 3600e3).getUTCHours();
/** 그 날짜가 속한 주의 월요일 (YYYY-MM-DD) */
export function weekOf(day: string): string {
  const d = new Date(day + 'T00:00:00Z'); const dow = (d.getUTCDay() + 6) % 7; // 월=0
  d.setUTCDate(d.getUTCDate() - dow); return d.toISOString().slice(0, 10);
}
/** 어제 날짜 */
export function prevDay(day: string): string { const d = new Date(day + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() - 1); return d.toISOString().slice(0, 10); }

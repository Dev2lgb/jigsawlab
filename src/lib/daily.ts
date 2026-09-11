// 오늘의 퍼즐 — 랜딩(홈·/play/·/puzzle/)용 가벼운 경로.
// 정적 페이지라 자정을 넘긴 탭·오래된 배포에서도 그날 그림을 맞추려면 브라우저가 다시 뽑아야 하는데, 그러자고 작품 목록(works, gzip 62KB)을
// 통째로 싣던 것이 랜딩 번들의 3분의 2였다. 대신 서버가 오늘 앞뒤 창(window)의 뽑기 결과만 JSON 으로 찍어 두고(#daily-win),
// 브라우저는 그걸 읽는다. 창 밖(두 달 넘게 배포가 없을 때)에만 작품 목록을 그때 내려받는다. 판(/board/)은 works 를 어차피 실으므로 dailyPick 을 그대로 쓴다.
// 이 파일은 works 를 정적으로 물지 않는다 — 물면 랜딩 번들이 도로 커진다.
import { hashStr, dailyPick, type Painting } from './jigsaw';
import { LI, type Lang } from '../i18n/langs';

export type DailyLite = { key: string; title: string; seed: number };
type Win = { from: string; to: string; days: Record<string, { k: string; t: string }> };

/** KST 날짜. offset 일만큼 앞뒤 (-1 = 어제) */
export const dayKST = (offset = 0) => new Date(Date.now() + 9 * 3600e3 + offset * 86400e3).toISOString().slice(0, 10);

/** 서버(프런트매터) — 오늘 앞뒤 창의 뽑기 결과. only 를 주면 그 작품이 뽑히는 날만 남긴다(상세 페이지 2,600장에 창을 통째로 박지 않게) */
export function dailyWindow(pool: Painting[], lang: Lang, only?: string, back = 7, ahead = 60): Win {
  const li = LI[lang]; const days: Win['days'] = {};
  for (let i = -back; i <= ahead; i++) { const d = dayKST(i); const p = dailyPick(d, pool).painting; if (!only || p.key === only) days[d] = { k: p.key, t: p.title[li] }; }
  return { from: dayKST(-back), to: dayKST(ahead), days };
}

let win: Win | null | undefined;
const readWin = (): Win | null => { if (win === undefined) { try { win = JSON.parse(document.getElementById('daily-win')?.textContent || 'null'); } catch { win = null; } } return win ?? null; };
const inWin = (w: Win, d: string) => d >= w.from && d <= w.to;

/** 브라우저 — 그날의 그림. 창 안이면 바로, 창 밖이면 그때만 작품 목록을 내려받는다 */
export async function dailyLite(day: string, li: number): Promise<DailyLite> {
  const w = readWin(); const e = w && inWin(w, day) ? w.days[day] : undefined;
  if (e) return { key: e.k, title: e.t, seed: hashStr('jigsaw:' + day) };
  const { DAILY_POOL } = await import('../data/works'); const p = dailyPick(day, DAILY_POOL);
  return { key: p.painting.key, title: p.painting.title[li], seed: p.seed };
}
/** 브라우저 — 이 작품이 오늘의 그림인지 (상세 페이지의 창에는 이 작품이 뽑히는 날만 들어 있다) */
export async function isDailyToday(key: string): Promise<boolean> {
  const w = readWin(), d = dayKST();
  if (w && inWin(w, d)) return w.days[d]?.k === key;
  return (await dailyLite(d, 0)).key === key;
}

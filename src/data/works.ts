// 전체 작품 목록 — 기존 22점(lib/jigsaw PAINTINGS + paintings.ts) + AIC 204점(aic.json) + 추가 소스 392점(extra.json: 위키미디어 공용·NASA·알폰스 무하 등).
// 제목은 titles.ts + 작가명은 artists.ts. 그림 이야기(about/)는 상세 페이지에서만 쓰므로 여기서 물지 않는다 — 물면 클라이언트 번들까지 따라간다
import { PAINTINGS, hashStr } from '../lib/jigsaw';
import { MUSEUM } from './paintings';
import { TITLES } from './titles';
import { TOTAL_WORKS, DAILY_SIG } from './counts';
import { multi, type Penta } from '../i18n/langs';
import { ARTISTS } from './artists';
import { CATEGORIES } from './catalog';
import { POPULAR } from './popular';
import aic from './aic.json';
import extra from './extra.json';
import base from './base.json';
import eras from './daily-eras.json';
export interface Work { key: string; title: Penta; artist: Penta; year: string; cat: string; museum: Penta; w: number; h: number; medium?: string; credit?: string; source?: string; license?: string }
const BASE_CAT: Record<string, string> = { dano: 'korean', ssireum: 'korean', mudong: 'korean', redfuji: 'ukiyoe', shower: 'ukiyoe', wave: 'masters' };
const baseDims = Object.fromEntries((base as { key: string; w: number; h: number }[]).map((b) => [b.key, b]));
const BASE: Work[] = PAINTINGS.map((p) => ({ key: p.key, title: p.title, artist: p.artist, year: p.year, cat: BASE_CAT[p.key] ?? 'masters', museum: multi(MUSEUM[p.key]), w: baseDims[p.key]?.w ?? 1200, h: baseDims[p.key]?.h ?? 950 }));
const AIC_MUSEUM: Penta = multi(['시카고 미술관', 'Art Institute of Chicago', 'シカゴ美術館']);
const AIC: Work[] = (aic as any[]).map((a) => { const t = TITLES[a.key], ar = ARTISTS[a.artist] ?? [a.artist, a.artist]; return { key: a.key, title: multi([t?.[0] ?? a.title, a.title, t?.[1] ?? a.title]), artist: multi([ar[0], a.artist, ar[1]]), year: String(a.date ?? a.year ?? ''), cat: a.cat, museum: AIC_MUSEUM, w: a.w, h: a.h, medium: a.medium, credit: a.credit, source: `https://www.artic.edu/artworks/${a.id}` }; });
const EXTRA: Work[] = (extra as any[]).map((a) => { const t = TITLES[a.key], ar = ARTISTS[a.artist] ?? [a.artist, a.artist]; return { key: a.key, title: multi([t?.[0] ?? a.title, a.title, t?.[1] ?? a.title]), artist: multi([ar[0], a.artist, ar[1]]), year: String(a.date ?? a.year ?? ''), cat: a.cat, museum: multi(a.museum), w: a.w, h: a.h, medium: a.medium, credit: a.credit || undefined, source: a.source, license: a.license }; });
export const WORKS: Work[] = [...BASE, ...AIC, ...EXTRA];
export const WORK_BY_KEY: Record<string, Work> = Object.fromEntries(WORKS.map((w) => [w.key, w]));
if (WORKS.length !== TOTAL_WORKS) throw new Error(`works: 작품이 ${WORKS.length}점인데 counts.ts 에는 ${TOTAL_WORKS} 입니다 — counts.ts 를 맞추세요`);
{ const cats = new Set(CATEGORIES.map((c) => c.id)); for (const w of WORKS) if (!cats.has(w.cat)) throw new Error(`works: '${w.key}' 의 카테고리 '${w.cat}' 가 catalog.ts 에 없습니다`); }
// 진열대 앞줄(popular.ts)에 적어둔 키가 실제로 그 카테고리에 있는지 확인
{ for (const [cat, keys] of Object.entries(POPULAR)) for (const k of keys) { const w = WORK_BY_KEY[k]; if (!w) throw new Error(`popular: '${cat}' 의 '${k}' 가 works 에 없습니다`); if (w.cat !== cat) throw new Error(`popular: '${k}' 는 '${cat}' 가 아니라 '${w.cat}' 입니다`); } }
/** 오늘의 퍼즐 후보 (패턴·포스터·추상 제외) */
const dailyCats = new Set(CATEGORIES.filter((c) => c.daily).map((c) => c.id));
export const DAILY_POOL: Work[] = WORKS.filter((w) => dailyCats.has(w.cat));

// ── 오늘의 퍼즐 후보는 시기별로 얼린다. 뽑기가 '날짜 해시 % 후보 수' 라서 후보가 하나라도 늘거나 줄거나 순서가 바뀌면 **지난 날짜까지 전부** 다른 그림이 된다 —
//  2026-09-14 무하 102점이 후보 중간에 끼자 그날(코토팍시 풍경)과 지난 7일이 통째로 바뀌었다(이미 맞춘 사람의 ✓·이어하기가 딴 그림에 붙는다).
//  그래서 후보가 바뀔 때마다 바뀌기 전 목록을 daily-eras.json 에 { until: 마지막 날(KST), keys } 로 붙이고, 그날까지는 그 목록으로 뽑는다.
//  지금 목록의 서명이 counts.ts 의 DAILY_SIG 와 다르면 빌드를 세운다 — `node scripts/daily-freeze.mjs` 가 직전 커밋의 목록을 오늘 날짜로 얼리고 서명을 새로 적는다.
//  until 은 배포하는 날이어야 한다: 그보다 이르면 그 사이 날짜가 옛 배포와 다른 그림이 된다
export const dailySig = (pool: { key: string }[]) => `${pool.length}-${hashStr(pool.map((w) => w.key).join(',')).toString(36)}`;
const ERAS = (eras as { until: string; keys: string[] }[]).map((e, i, all) => {
  if (i && all[i - 1].until >= e.until) throw new Error(`daily-eras: until 이 오름차순이 아닙니다 (${all[i - 1].until} → ${e.until})`);
  return { until: e.until, pool: e.keys.map((k) => { const w = WORK_BY_KEY[k]; if (!w) throw new Error(`daily-eras: ${e.until} 까지의 후보 '${k}' 가 works 에 없습니다 — 지난 오늘의 퍼즐이 가리키는 그림은 지우면 안 됩니다`); return w; }) };
});
if (dailySig(DAILY_POOL) !== DAILY_SIG && !(globalThis as { __DAILY_FREEZE?: boolean }).__DAILY_FREEZE)
  throw new Error(`works: 오늘의 퍼즐 후보가 바뀌었습니다(${DAILY_SIG} → ${dailySig(DAILY_POOL)}). 그대로 두면 지난 날짜 그림까지 전부 바뀝니다 — node scripts/daily-freeze.mjs 로 바뀌기 전 목록을 얼리세요`);
/** 그날의 후보 — 얼려 둔 시기면 그때의 목록, 아니면 지금 목록. 오늘의 퍼즐은 늘 dailyPick(day, dailyPool(day)) 로 뽑는다 */
export function dailyPool(day: string): Work[] { for (const e of ERAS) if (day <= e.until) return e.pool; return DAILY_POOL; }

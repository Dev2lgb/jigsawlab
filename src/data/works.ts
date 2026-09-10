// 전체 작품 목록 — 기존 22점(lib/jigsaw PAINTINGS + paintings.ts) + AIC 204점(aic.json) + 추가 소스 292점(extra.json: 위키미디어 공용·NASA 등).
// 제목은 titles.ts + 작가명은 artists.ts. 그림 이야기(about/)는 상세 페이지에서만 쓰므로 여기서 물지 않는다 — 물면 클라이언트 번들까지 따라간다
import { PAINTINGS } from '../lib/jigsaw';
import { MUSEUM } from './paintings';
import { TITLES } from './titles';
import { TOTAL_WORKS } from './counts';
import { multi, type Penta } from '../i18n/langs';
import { ARTISTS } from './artists';
import { CATEGORIES } from './catalog';
import { POPULAR } from './popular';
import aic from './aic.json';
import extra from './extra.json';
import base from './base.json';
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
export const img = (key: string) => `/jigsaw/${key}.webp`, thumb = (key: string) => `/jigsaw/t-${key}.webp`, og = (key: string) => `/jigsaw/o-${key}.jpg`;

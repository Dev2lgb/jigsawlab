// 전체 작품 목록 — 기존 22점(lib/jigsaw PAINTINGS + paintings.ts) + AIC 204점(aic.json) + 추가 소스(extra.json: 위키미디어 공용·NASA 등). 소개 글은 worksText + 작가명은 artists
import { PAINTINGS } from '../lib/jigsaw';
import { ABOUT } from './paintings';
import { TEXT } from './worksText';
import { ARTISTS } from './artists';
import { CATEGORIES } from './catalog';
import aic from './aic.json';
import extra from './extra.json';
import base from './base.json';
export interface Work { key: string; title: [string, string, string]; artist: [string, string, string]; year: string; cat: string; museum: [string, string, string]; about: [string, string, string]; w: number; h: number; medium?: string; credit?: string; source?: string; license?: string }
const BASE_CAT: Record<string, string> = { dano: 'korean', ssireum: 'korean', mudong: 'korean', redfuji: 'ukiyoe', shower: 'ukiyoe', wave: 'masters' };
const baseDims = Object.fromEntries((base as { key: string; w: number; h: number }[]).map((b) => [b.key, b]));
const BASE: Work[] = PAINTINGS.map((p) => ({ key: p.key, title: p.title, artist: p.artist, year: p.year, cat: BASE_CAT[p.key] ?? 'masters', museum: ABOUT[p.key].museum, about: ABOUT[p.key].about, w: baseDims[p.key]?.w ?? 1200, h: baseDims[p.key]?.h ?? 950 }));
const AIC_MUSEUM: [string, string, string] = ['시카고 미술관', 'Art Institute of Chicago', 'シカゴ美術館'];
const AIC: Work[] = (aic as any[]).map((a) => { const t = TEXT[a.key], ar = ARTISTS[a.artist] ?? [a.artist, a.artist]; return { key: a.key, title: [t?.t[0] ?? a.title, a.title, t?.t[1] ?? a.title], artist: [ar[0], a.artist, ar[1]], year: String(a.date ?? a.year ?? ''), cat: a.cat, museum: AIC_MUSEUM, about: t?.about ?? [a.title, a.title, a.title], w: a.w, h: a.h, medium: a.medium, credit: a.credit, source: `https://www.artic.edu/artworks/${a.id}` }; });
const EXTRA: Work[] = (extra as any[]).map((a) => { const t = TEXT[a.key], ar = ARTISTS[a.artist] ?? [a.artist, a.artist]; return { key: a.key, title: [t?.t[0] ?? a.title, a.title, t?.t[1] ?? a.title], artist: [ar[0], a.artist, ar[1]], year: String(a.date ?? a.year ?? ''), cat: a.cat, museum: a.museum, about: t?.about ?? [a.title, a.title, a.title], w: a.w, h: a.h, medium: a.medium, credit: a.credit || undefined, source: a.source, license: a.license }; });
export const WORKS: Work[] = [...BASE, ...AIC, ...EXTRA];
export const WORK_BY_KEY: Record<string, Work> = Object.fromEntries(WORKS.map((w) => [w.key, w]));
{ const cats = new Set(CATEGORIES.map((c) => c.id)); for (const w of WORKS) if (!cats.has(w.cat)) throw new Error(`works: '${w.key}' 의 카테고리 '${w.cat}' 가 catalog.ts 에 없습니다`); }
/** 오늘의 퍼즐 후보 (패턴·포스터·추상 제외) */
const dailyCats = new Set(CATEGORIES.filter((c) => c.daily).map((c) => c.id));
export const DAILY_POOL: Work[] = WORKS.filter((w) => dailyCats.has(w.cat));
export const img = (key: string) => `/jigsaw/${key}.webp`, thumb = (key: string) => `/jigsaw/t-${key}.webp`, og = (key: string) => `/jigsaw/o-${key}.jpg`;

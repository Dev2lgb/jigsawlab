import { PAINTINGS } from './jigsaw';
import { CATEGORIES } from '../data/catalog';
import { LI, type Lang } from '../i18n/ui';
export function shelvesFor(lang: Lang) {
  const li = LI[lang];
  const byKey = Object.fromEntries(PAINTINGS.map((p) => [p.key, { key: p.key, artist: p.artist[li], title: p.title[li], year: p.year }]));
  return CATEGORIES.map((c) => ({ id: c.id, name: c.name[li], items: c.keys.map((k) => byKey[k]).filter(Boolean) }));
}
export const paintingFor = (key: string, lang: Lang) => { const p = PAINTINGS.find((x) => x.key === key); if (!p) return null; const li = LI[lang]; return { key, title: p.title[li], artist: p.artist[li], year: p.year }; };
export const categoryOf = (key: string) => CATEGORIES.find((c) => c.keys.includes(key));

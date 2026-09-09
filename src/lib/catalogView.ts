import { WORKS, WORK_BY_KEY } from '../data/works';
import { CATEGORIES } from '../data/catalog';
import { POPULAR, SHELF_TOP } from '../data/popular';
import { LI, type Lang } from '../i18n/ui';
export const viewOf = (w: { key: string; title: string[]; artist: string[]; year: string }, lang: Lang) => ({ key: w.key, title: w.title[LI[lang]], artist: w.artist[LI[lang]], year: w.year, q: [...w.title, ...w.artist, w.year].join(' ').toLowerCase() });
/** 진열대. 각 카테고리는 popular.ts 에 적어둔 대표작 순서를 앞에 세우고, 나머지는 원래 순서로 잇는다 */
export function shelvesFor(lang: Lang) {
  return CATEGORIES.map((c) => {
    const rank = POPULAR[c.id] ?? [];
    const items = WORKS.filter((w) => w.cat === c.id)
      .map((w, i) => ({ w, i, r: rank.indexOf(w.key) }))
      .sort((a, b) => (a.r < 0 ? 1e9 : a.r) - (b.r < 0 ? 1e9 : b.r) || a.i - b.i)
      .map(({ w }) => viewOf(w, lang));
    return { id: c.id, name: c.name[LI[lang]], items, top: SHELF_TOP };
  }).filter((s) => s.items.length);
}
export const paintingFor = (key: string, lang: Lang) => { const w = WORK_BY_KEY[key]; return w ? viewOf(w, lang) : null; };
export const categoryOf = (key: string) => CATEGORIES.find((c) => c.id === WORK_BY_KEY[key]?.cat);

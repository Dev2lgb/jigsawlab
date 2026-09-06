import { WORKS, WORK_BY_KEY } from '../data/works';
import { CATEGORIES } from '../data/catalog';
import { LI, type Lang } from '../i18n/ui';
export const viewOf = (w: { key: string; title: string[]; artist: string[]; year: string }, lang: Lang) => ({ key: w.key, title: w.title[LI[lang]], artist: w.artist[LI[lang]], year: w.year });
export function shelvesFor(lang: Lang) { return CATEGORIES.map((c) => ({ id: c.id, name: c.name[LI[lang]], items: WORKS.filter((w) => w.cat === c.id).map((w) => viewOf(w, lang)) })).filter((s) => s.items.length); }
export const paintingFor = (key: string, lang: Lang) => { const w = WORK_BY_KEY[key]; return w ? viewOf(w, lang) : null; };
export const categoryOf = (key: string) => CATEGORIES.find((c) => c.id === WORK_BY_KEY[key]?.cat);

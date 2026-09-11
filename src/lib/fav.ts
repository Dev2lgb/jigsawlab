// 즐겨찾기(localStorage) + 카탈로그 검색·즐겨찾기 진열대 (홈·플레이 선택 화면 공용)
const KEY = 'fav:keys';
const read = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; } };
const write = (l: string[]) => { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch {} };
export const favs = () => read();
export function toggleFav(k: string) { const l = read(); const i = l.indexOf(k); if (i >= 0) l.splice(i, 1); else l.unshift(k); write(l); return i < 0; }
function paint() { const f = new Set(read()); document.querySelectorAll<HTMLElement>('.fav[data-fav]').forEach((b) => { const on = f.has(b.dataset.fav!); b.setAttribute('aria-pressed', String(on)); b.textContent = on ? '♥' : '♡'; }); }
/** 즐겨찾기 진열대: 페이지에 있는 상자를 복제해 채움 */
function buildFavShelf() {
  const shelf = document.getElementById('fav-shelf'), row = document.getElementById('fav-row'); if (!shelf || !row) return;
  const l = read(); row.innerHTML = '';
  for (const k of l) { const src = document.querySelector<HTMLElement>(`.boxw[data-key="${k}"]:not(#fav-row .boxw)`); if (src) row.appendChild(src.cloneNode(true)); }
  shelf.hidden = !row.children.length; const cnt = shelf.querySelector('.fav-count'); if (cnt) cnt.textContent = String(row.children.length);
}
export function initFavUI(opts?: { onToggle?: (k: string, on: boolean) => void }) {
  document.addEventListener('click', (e) => { const b = (e.target as HTMLElement).closest<HTMLElement>('.fav[data-fav]'); if (!b) return; e.preventDefault(); e.stopPropagation(); const on = toggleFav(b.dataset.fav!); paint(); buildFavShelf(); opts?.onToggle?.(b.dataset.fav!, on); });
  paint(); buildFavShelf();
}
/** 검색: input 값으로 .boxw[data-q] 필터, 빈 진열대 숨김 */
export function initSearch(input: HTMLInputElement, opts?: { onResult?: (n: number, q: string) => void }) {
  const run = () => {
    const q = input.value.trim().toLowerCase(); let n = 0;
    document.querySelectorAll<HTMLElement>('.shelf').forEach((sh) => { let vis = 0; sh.classList.toggle('searching', q !== ''); sh.querySelectorAll<HTMLElement>('.boxw').forEach((b) => { const ok = !q || (b.dataset.q ?? '').includes(q); b.hidden = !ok; if (ok) vis++; }); sh.hidden = (q !== '' && vis === 0) || (sh.id === 'fav-shelf' && !sh.querySelector('#fav-row')?.children.length); n += vis; });
    opts?.onResult?.(n, q);
  };
  input.addEventListener('input', run); run();
}

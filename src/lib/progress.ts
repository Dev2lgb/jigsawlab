// 컬렉션 진도 — 어느 그림을 깼는지 진열대 상자에 표시한다(완성 리본 + 진열대 제목의 "12 / 40").
// 이 기기의 완성 목록(localStorage done:list)에 회원이면 서버의 그림별 완성(user_cleared)을 합친다. 홈·/play/·/puzzle/ 이 같이 쓴다
import { getDone } from './store';
import { fetchCleared } from './account';

/** 그림 키 → 깬 최대 조각 수 (이 기기 + 서버) */
export async function clearedMap(): Promise<Map<string, number>> {
  const m = new Map<string, number>();
  for (const e of getDone()) if (e.kind !== 'photo' && (m.get(e.key) ?? 0) < e.n) m.set(e.key, e.n);
  try { const r = await fetchCleared(); if (r) for (const [k, n] of r) if ((m.get(k) ?? 0) < n) m.set(k, n); } catch {}
  return m;
}
/** 상자에 .done + data-done(조각 수), 진열대(.shelf) 제목에 진도. progress(a, b) 는 문구, 상자 표시는 CSS(Base.astro 의 .boxw.done) */
export function markBoxes(m: Map<string, number>, progress: (a: number, b: number) => string, root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('.boxw[data-key]').forEach((b) => { const n = m.get(b.dataset.key!); b.classList.toggle('done', n !== undefined); if (n !== undefined) b.dataset.done = String(n); else delete b.dataset.done; });
  root.querySelectorAll<HTMLElement>('.shelf').forEach((sh) => {
    const boxes = [...sh.querySelectorAll<HTMLElement>('.boxw[data-key]')]; const done = boxes.filter((b) => b.classList.contains('done')).length;
    let el = sh.querySelector<HTMLElement>(':scope > h3 .shelf-prog');
    if (!done) { el?.remove(); return; }
    if (!el) { const h = sh.querySelector(':scope > h3'); if (!h) return; el = document.createElement('small'); el.className = 'shelf-prog'; h.appendChild(el); }
    el.textContent = progress(done, boxes.length); el.classList.toggle('all', done >= boxes.length);
  });
}

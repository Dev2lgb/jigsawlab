// 가로 진열대(.shelf-row) 를 마우스로도 넘길 수 있게: 좌우 화살표(끝에 닿으면 숨김) + 마우스 드래그 스크롤.
// 터치 기기는 원래 손가락으로 넘기므로 화살표는 CSS(hover: none)에서 숨긴다. 세로 휠을 가로로 바꾸지는 않는다(페이지 스크롤을 가로채므로).
// 행이 동적으로 채워지거나(즐겨찾기·검색) 폭이 바뀌면 화살표 표시를 다시 계산한다
export function initShelves(root: ParentNode = document) {
  const I = (window as any).__i18n ?? {};
  root.querySelectorAll<HTMLElement>('.shelf-row').forEach((row) => {
    if (row.parentElement?.classList.contains('shelf-scroller')) return;
    const wrap = document.createElement('div'); wrap.className = 'shelf-scroller'; row.replaceWith(wrap); wrap.appendChild(row);
    const mk = (dir: -1 | 1) => { const b = document.createElement('button'); b.type = 'button'; b.className = `shelf-arrow ${dir < 0 ? 'prev' : 'next'}`; b.setAttribute('aria-label', dir < 0 ? I.prev ?? 'previous' : I.next ?? 'next'); b.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="${dir < 0 ? 'm15 5-7 7 7 7' : 'm9 5 7 7-7 7'}"/></svg>`; b.addEventListener('click', () => row.scrollBy({ left: dir * Math.max(160, row.clientWidth * 0.8), behavior: 'smooth' })); wrap.appendChild(b); return b; };
    const prev = mk(-1), next = mk(1);
    const update = () => { const max = row.scrollWidth - row.clientWidth; prev.hidden = row.scrollLeft <= 2; next.hidden = row.scrollLeft >= max - 2; wrap.classList.toggle('scrollable', max > 4); };
    row.addEventListener('scroll', update, { passive: true }); new ResizeObserver(update).observe(row); new MutationObserver(update).observe(row, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] }); update();
    // 마우스 드래그로 넘기기 — 6px 이상 움직였으면 놓을 때의 클릭(상자 링크)은 무시
    let x0 = 0, s0 = 0, drag = false, moved = false;
    row.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || e.button !== 0) return; drag = true; moved = false; x0 = e.clientX; s0 = row.scrollLeft; });
    row.addEventListener('pointermove', (e) => { if (!drag) return; const dx = e.clientX - x0; if (!moved && Math.abs(dx) < 6) return; if (!moved) { moved = true; row.classList.add('dragging'); row.setPointerCapture(e.pointerId); } row.scrollLeft = s0 - dx; });
    const end = () => { if (!drag) return; drag = false; row.classList.remove('dragging'); setTimeout(() => { moved = false; }, 0); };
    row.addEventListener('pointerup', end); row.addEventListener('pointercancel', end);
    row.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  });
}

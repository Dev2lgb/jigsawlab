// 애드센스 — 광고 칸(AdSlot.astro)은 화면 가까이 올 때 채운다.
// 판(/board/)은 head 에 스크립트를 싣지 않고, 결과 화면의 칸이 처음 보일 때 불러온다(맞추는 동안은 광고 코드가 안 돈다).
import { stripLang } from '../i18n/langs';

export const AD_CLIENT = 'ca-pub-5830650963828895';
export const AD_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;

/** 자리마다 광고 단위 하나 — 보고서에서 자리별 수익을 따로 본다. 대시보드 이름은 1~5 */
export const AD_SLOTS = {
  detail: '5135882306', // 1 그림 상세 — 시작 버튼 아래
  result: '7119881969', // 2 완성 결과 화면 — 버튼 줄 아래
  play: '4280085306', //   3 /play/ 진열대 사이
  home: '2967003634', //   4 홈 진열대 사이
  etc: '5806800296', //    5 /together/·/photo/·/rank/ 공용
} as const;
export type AdPlace = keyof typeof AD_SLOTS;

// 로컬·미리보기에서는 요청하지 않는다 — 칸만 자리를 잡아 레이아웃을 볼 수 있다
const live = () => location.hostname === 'jigsawlab.app' || location.hostname.endsWith('.jigsawlab.app');

function ensureScript() {
  if (document.querySelector('script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;
  const s = document.createElement('script'); s.async = true; s.src = AD_SRC; s.crossOrigin = 'anonymous'; document.head.appendChild(s);
}

function fill(ins: HTMLElement) {
  ensureScript();
  // push({}) 는 DOM 순서상 아직 안 채운 첫 ins.adsbygoogle 을 채운다. 아래 칸이 먼저 보여도(#앵커로 뛰어온 경우) 엉뚱한 칸이 채워지지 않게, 채울 차례가 온 칸에만 클래스를 붙인다
  ins.classList.add('adsbygoogle');
  try { ((window as any).adsbygoogle ||= []).push({}); } catch {}
}

export function initAds() {
  const slots = document.querySelectorAll<HTMLElement>('ins.ad-ins');
  if (!slots.length || !live() || !('IntersectionObserver' in window)) return;
  // 숨은 칸(판의 결과 화면은 완성 전까지 display:none)은 보일 때까지 교차가 안 생겨, 폭 0 으로 채우는 일이 없다
  const io = new IntersectionObserver((es) => { for (const e of es) { if (!e.isIntersecting) continue; io.unobserve(e.target); fill(e.target as HTMLElement); } }, { rootMargin: '600px 0px' });
  slots.forEach((s) => io.observe(s));
}

/** 전면 광고(자동 광고의 비네트)는 퍼즐을 시작하는 링크에서만 뜨게 한다.
 *  비네트는 사이트 안의 아무 링크로나 페이지를 떠날 때 뜨므로, 판(/board/)으로 가지 않는 링크에는
 *  구글이 정한 끄기 표시 data-google-vignette="false" 를 단다 — 둘러보는 동안(홈·진열대·그림 상세 사이)은 안 뜬다.
 *  진열대·하던 퍼즐·랭킹처럼 스크립트가 나중에 그리는 링크도 있어 새로 붙는 링크까지 지켜본다 */
export function vignetteOnlyToBoard() {
  const mark = (a: HTMLAnchorElement) => {
    if (a.hasAttribute('data-google-vignette')) return;
    let u: URL; try { u = new URL(a.href, location.href); } catch { return; }
    if (u.origin === location.origin && !stripLang(u.pathname).startsWith('/board/')) a.setAttribute('data-google-vignette', 'false');
  };
  const scan = (n: Document | Element) => n.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(mark);
  scan(document);
  new MutationObserver((ms) => { for (const m of ms) m.addedNodes.forEach((n) => { if (n instanceof HTMLAnchorElement) mark(n); else if (n instanceof Element) scan(n); }); }).observe(document.body, { childList: true, subtree: true });
}

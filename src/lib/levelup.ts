// 레벨업·업적 달성 다이얼로그. 마크업은 Base.astro 에 있고 여기서 채워 연다.
// 데이터(작품 목록)를 물고 있는 level.ts 를 쓰므로 부르는 쪽에서 동적 import 하는 게 좋다
import { BADGE_BY_CODE, tierOf } from './level';
import { BADGE_TEXT, TIER_NAMES } from '../i18n/badges';
import { UI, LI, LANGS, type Lang } from '../i18n/ui';
import { badge as badgeSound, confetti, levelUp as levelUpSound } from './celebrate';
import type { Award } from './account';

const langOf = (): Lang => { const l = document.documentElement.lang as Lang; return LANGS.includes(l) ? l : 'ko'; };
const $ = (id: string) => document.getElementById(id);
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let bound = false;

export function closeAward() {
  const d = $('aw-dlg'); if (!d) return; d.hidden = true;
  document.documentElement.classList.toggle('dlg-open', !!document.querySelector('.gdlg:not([hidden])'));
}

/** prevLevel → level 로 숫자를 굴려 올린다 */
function countTo(el: HTMLElement, from: number, to: number) {
  if (reduced() || to <= from) { el.textContent = String(to); return; }
  const t0 = performance.now(), dur = 260 + (to - from) * 90;
  const step = (now: number) => { const k = Math.min(1, (now - t0) / dur); el.textContent = String(Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

/** 레벨업이나 새 업적이 있으면 다이얼로그를 띄우고 true. 없으면 아무것도 안 하고 false */
export function showAwardDialog(a: Award): boolean {
  if (!a.levelUp && !a.badges.length) return false;
  const d = $('aw-dlg'), box = $('aw-box') ?? d?.querySelector<HTMLElement>('.aw-box'); if (!d || !box) return false;
  const lang = langOf(), li = LI[lang], V = UI[lang].lv;

  const lv = $('aw-lv')!, list = $('aw-list')!, nb = $('aw-nb')!;
  lv.hidden = !a.levelUp;
  if (a.levelUp) {
    $('aw-tier')!.textContent = TIER_NAMES[tierOf(a.level)][li];
    const jump = $('aw-jump')!; const many = a.level - a.prevLevel > 1;
    jump.textContent = many ? V.awJump(a.prevLevel, a.level) : ''; jump.hidden = !many;
    countTo($('aw-lv-n')!, a.prevLevel, a.level);
  }
  $('aw-h')!.textContent = a.levelUp ? V.awLevel : V.awBadge(a.badges.length);
  const xp = $('aw-xp')!; xp.textContent = a.gained > 0 ? V.gained(a.gained) : ''; xp.hidden = a.gained <= 0;

  list.innerHTML = '';
  nb.hidden = !a.badges.length || !a.levelUp; // 업적만 있을 때는 제목이 이미 '업적 달성!' 이라 소제목이 없어도 된다
  a.badges.forEach((code, i) => {
    const def = BADGE_BY_CODE[code], t = BADGE_TEXT[code]; if (!def || !t) return;
    const el = document.createElement('li'); el.style.animationDelay = `${(a.levelUp ? 0.62 : 0.12) + Math.min(i, 6) * 0.23}s`;
    const ic = document.createElement('span'); ic.className = 'i'; ic.textContent = def.icon;
    const tx = document.createElement('div');
    const nm = document.createElement('b'); nm.textContent = t.n[li];
    const ds = document.createElement('small'); ds.textContent = t.d[li];
    tx.appendChild(nm); tx.appendChild(ds); el.appendChild(ic); el.appendChild(tx); list.appendChild(el);
  });

  if (!bound) {
    bound = true;
    $('aw-x')?.addEventListener('click', closeAward);
    $('aw-ok')?.addEventListener('click', closeAward);
    $('aw-bg')?.addEventListener('click', closeAward);
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('aw-dlg')?.hidden) closeAward(); });
  }

  d.hidden = false;
  document.documentElement.classList.add('dlg-open');
  ($('aw-ok') as HTMLButtonElement | null)?.focus({ preventScroll: true });
  // 색종이는 판을 다 맞췄을 때와 같은 것. 소리는 셋을 갈라 뒀다 — 완성 팡파르 / 레벨업 / 업적
  if (a.levelUp) levelUpSound();
  a.badges.slice(0, 5).forEach((_, i) => setTimeout(badgeSound, (a.levelUp ? 620 : 120) + Math.min(i, 6) * 230));
  const fx = $('aw-fx') as HTMLCanvasElement | null;
  if (fx) { const r = d.getBoundingClientRect(); confetti(fx, r.width, r.height, () => {}, 110); }
  return true;
}

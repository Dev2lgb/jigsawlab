// 사이트 공통 다이얼로그 — 로그인(Google 로 시작하기)과 닉네임 입력. 마크업은 Base.astro 에 있고 여기서 열고 닫는다
import { loginUrl } from './account';
import { randomNick } from './nickgen';
import { docLang } from '../i18n/langs';

const $ = (id: string) => document.getElementById(id);
let nickResolve: ((v: string | null) => void) | null = null;
function show(id: string, on: boolean) { const m = $(id); if (!m) return; m.hidden = !on; document.documentElement.classList.toggle('dlg-open', !!document.querySelector('.gdlg:not([hidden])')); }
/** 로그인 다이얼로그. next = 로그인 뒤 돌아올 경로 */
export function openLogin(next = location.pathname + location.search) {
  const a = $('auth-google') as HTMLAnchorElement | null; if (!a) { location.href = loginUrl(next); return; }
  a.href = loginUrl(next); show('auth-dlg', true);
}
export const closeLogin = () => show('auth-dlg', false);
/** 닉네임 입력 다이얼로그. 취소하면 null (처음 정할 때는 호출한 쪽에서 randomNick 으로 채움). mode: 'new' 처음 정하기 / 'edit' 바꾸기 */
export function askNick(initial = '', mode: 'new' | 'edit' = 'edit'): Promise<string | null> {
  return new Promise((res) => {
    const d = $('nick-dlg'); const inp = $('nick-input') as HTMLInputElement | null; if (!d || !inp) { res((prompt(d?.dataset.title ?? '', initial) || '').trim().slice(0, 12) || null); return; }
    nickResolve?.(null); nickResolve = res; d.dataset.mode = mode; inp.value = initial || randomNick(docLang()); ($('nick-ok') as HTMLButtonElement).textContent = mode === 'new' ? d.dataset.start! : d.dataset.save!;
    show('nick-dlg', true); setTimeout(() => { inp.focus(); inp.select(); }, 40);
  });
}
function endNick(v: string | null) { const d = $('nick-dlg'), inp = $('nick-input') as HTMLInputElement | null; if (v === null && d?.dataset.mode === 'new') v = (inp?.value ?? '').trim().slice(0, 12) || randomNick(docLang()); show('nick-dlg', false); const r = nickResolve; nickResolve = null; r?.(v); } // 처음 정할 때 취소하면 제안된 이름으로
export function initAuthUI() {
  $('auth-close')?.addEventListener('click', closeLogin); $('auth-bg')?.addEventListener('click', closeLogin);
  const form = $('nick-form') as HTMLFormElement | null; const inp = $('nick-input') as HTMLInputElement | null;
  form?.addEventListener('submit', (e) => { e.preventDefault(); const n = (inp?.value ?? '').trim().replace(/\s+/g, ' ').slice(0, 12); if (!n) { inp?.focus(); return; } endNick(n); });
  $('nick-cancel')?.addEventListener('click', () => endNick(null)); $('nick-shuffle')?.addEventListener('click', () => { if (inp) { inp.value = randomNick(docLang()); inp.focus(); } }); $('nick-bg')?.addEventListener('click', () => endNick(null));
  addEventListener('keydown', (e) => { if (e.key !== 'Escape') return; if (!$('nick-dlg')?.hidden) endNick(null); else closeLogin(); });
  // 다른 스크립트(플레이 화면 등)에서도 쓸 수 있게
  (window as any).__authui = { openLogin, askNick, randomNick: () => randomNick(docLang()) };
}

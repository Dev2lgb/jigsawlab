/** 공유: Web Share API(모바일) → 미지원/실패 시 클립보드 복사. 토스트 */
export async function share(opts: { title: string; text?: string; url?: string }): Promise<'shared' | 'copied' | 'failed'> {
  const url = opts.url ?? location.href;
  if (navigator.share) { try { await navigator.share({ title: opts.title, text: opts.text, url }); return 'shared'; } catch (e) { if ((e as Error).name === 'AbortError') return 'failed'; } }
  try { await navigator.clipboard.writeText(url); return 'copied'; } catch { return 'failed'; }
}
let toastEl: HTMLElement | null = null, toastT = 0;
export function toast(msg: string) {
  if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
  toastEl.textContent = msg; toastEl.classList.add('show'); clearTimeout(toastT); toastT = window.setTimeout(() => toastEl?.classList.remove('show'), 1800);
}

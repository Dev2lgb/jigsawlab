// e2e 공용 — 서버 주소·테스트 회원·세션 쿠키 위조·검사 도우미. 실행은 run.mjs 가 맡는다
import { createHmac } from 'node:crypto';

export const BASE = process.env.E2E_BASE ?? 'http://localhost:8799';
export const HOST = new URL(BASE).hostname;
/** 로컬 D1 에 run.mjs 가 심어 두는 테스트 회원 (users.id = HMAC(sub) 가명 ID 와 같은 32자 꼴) */
export const UID = 't0000000000000000000000000000001';
export const NICK = 'tester';
/** 세션 쿠키 jl_s = uid.exp.HMAC(secret, `s:uid.exp`) — src/lib/auth.ts 와 같은 규칙. 로컬 SESSION_SECRET 이 없으면 서버는 'dev-secret' 을 쓴다 */
export function sessionCookie(secret = process.env.SESSION_SECRET || 'dev-secret') {
  const exp = Math.floor(Date.now() / 1000) + 86400;
  const sig = createHmac('sha256', secret).update(`s:${UID}.${exp}`).digest('hex');
  return `${UID}.${exp}.${sig}`;
}
export const COOKIE_HDR = () => `jl_s=${sessionCookie()}`;
export const COOKIE_PW = () => ({ name: 'jl_s', value: sessionCookie(), domain: HOST, path: '/' });

let fails = 0;
export const ok = (c, m, extra = '') => { console.log((c ? 'PASS ' : 'FAIL ') + m + (c || !extra ? '' : '  ' + String(extra).slice(0, 300))); if (!c) fails++; };
export const finish = () => { console.log(fails ? `\n${fails} FAIL` : '\nALL PASS'); process.exit(fails ? 1 : 0); };

export const get = async (p, auth = false) => (await fetch(BASE + p, { headers: auth ? { cookie: COOKIE_HDR() } : {} })).json();
export const post = async (p, body, auth = false) => { const r = await fetch(BASE + p, { method: 'POST', headers: { 'content-type': 'application/json', ...(auth ? { cookie: COOKIE_HDR() } : {}) }, body: JSON.stringify(body) }); return { status: r.status, hdr: Object.fromEntries(r.headers), body: await r.json().catch(() => null) }; };

/** KST 날짜 (offset 일) — src/lib/daily.ts 의 dayKST 와 같다 */
export const dayKST = (o = 0) => new Date(Date.now() + 9 * 3600e3 + o * 86400e3).toISOString().slice(0, 10);

// ── 브라우저 (Playwright). 헤드리스 크로미움은 en-US 라 Base.astro 의 언어 자동 이동이 /en/ 으로 보내 버린다 — 컨텍스트는 늘 ko-KR
export async function browser() { const { chromium } = await import('playwright'); return chromium.launch(); }
export async function newPage(br, { member = false, viewport = { width: 1200, height: 800 } } = {}) {
  const ctx = await br.newContext({ locale: 'ko-KR', viewport });
  if (member) await ctx.addCookies([COOKIE_PW()]);
  const page = await ctx.newPage();
  page.on('dialog', (d) => d.accept());
  page.on('pageerror', (e) => ok(false, 'pageerror ' + e.message));
  return { ctx, page };
}
/** 판이 열려 조각이 잘린 뒤까지. 훅(window.__jigsaw)은 개발 모드 빌드에만 있다 */
export const waitPlay = async (page, hook = true) => { await page.waitForFunction((h) => document.querySelector('.scene.play')?.classList.contains('active') && document.getElementById('jg-loading')?.hidden && document.querySelectorAll('#jg-tray .tp').length > 0 && (!h || !!window.__jigsaw), hook, { timeout: 30000 }); await page.waitForTimeout(300); };
export const trayCount = (page) => page.$$eval('#jg-tray .tp', (els) => els.length);
export const leftCount = async (page) => Number((await page.$eval('#jg-left', (e) => e.textContent)).replace(/\D/g, ''));
export const demo = (page, n) => page.evaluate((k) => window.__jigsaw.demo(k), n);
export const waitResult = (page) => page.waitForFunction(() => document.querySelector('.scene.result')?.classList.contains('active'), null, { timeout: 20000 });
export const hud = async (page) => ((await page.isVisible('#jg-xp-hud')) ? page.$eval('#jg-xp-hud', (e) => e.textContent) : null);

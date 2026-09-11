// 랜딩(홈·/play/·/puzzle/) — 오늘의 퍼즐 창(#daily-win): works 청크를 안 싣고도 서버와 같은 그림, 창이 없거나 창 밖 날짜면 그때만 works 를 받아 같은 결과
import { BASE, ok, finish, dayKST, browser, newPage, post } from './lib.mjs';

const html = await (await fetch(BASE + '/')).text();
const win = JSON.parse(html.match(/id="daily-win">([^<]*)</)[1]);
const today = dayKST(), tk = win.days[today].k;
console.log('window', win.from, '..', win.to, 'today', today, tk, Object.keys(win.days).length, 'days');
const br = await browser();
async function run(name, url, { strip = false, now = null } = {}) {
  const { ctx, page } = await newPage(br); const js = [];
  page.on('request', (r) => { if (r.url().includes('/_astro/') && r.url().endsWith('.js')) js.push(r.url().split('/').pop()); });
  if (now) await ctx.addInitScript((t) => { Date.now = () => t; }, now);
  // 이 서버의 응답만 가로챈다 — 광고 스크립트의 바깥 요청까지 잡으면 느린 요청이 ctx.close() 뒤에 route.fetch 로 터져 스위트가 통째로 죽었다
  if (strip) await page.route(BASE + '/**', async (route) => { try { const r = await route.fetch(); if (!(r.headers()['content-type'] || '').includes('text/html')) return await route.fulfill({ response: r }); const b = (await r.text()).replace(/<script type="application\/json" id="daily-win">[^<]*<\/script>/, ''); await route.fulfill({ response: r, body: b, headers: { ...r.headers(), 'content-length': String(Buffer.byteLength(b)) } }); } catch {} });
  await page.goto(BASE + url, { waitUntil: 'networkidle' }); await page.waitForTimeout(300);
  return { page, ctx, js, worksLoaded: js.some((f) => f.startsWith('works.')) };
}
const rowOf = (page) => page.$$eval('#past-row a', (as) => as.map((a) => ({ key: a.querySelector('img').getAttribute('src').match(/t-(.+)\.webp/)[1], title: a.title })));
const expRow = () => [...Array(7)].map((_, i) => win.days[dayKST(-i)]);
// A. 홈 — works 안 싣고, 지난 7일 행이 창(JSON)과 같은 그림
{ const { page, ctx, worksLoaded } = await run('home', '/');
  ok(!worksLoaded, 'home: works 청크를 안 싣는다');
  const row = await rowOf(page); ok(row.length === 7, `home: 지난 7일 행 ${row.length}개`);
  const exp = expRow(); ok(row.every((r, i) => r.key === exp[i].k && r.title === exp[i].t), 'home: 7일 그림·제목이 창과 일치');
  const heroT = await page.$eval('#hero-today', (a) => a.textContent), glow = await page.$eval('#glow-img', (i) => i.getAttribute('src'));
  ok(heroT.includes(win.days[today].t) && glow.includes(tk), 'home: 히어로 오늘 그림·제목');
  await ctx.close(); }
// B. /play/
{ const { page, ctx, worksLoaded } = await run('play', '/play/'); ok(!worksLoaded, 'play: works 청크를 안 싣는다'); ok((await page.$eval('#pk-daily', (a) => a.dataset.key)) === tk, 'play: 오늘의 퍼즐 key'); await ctx.close(); }
{ const { page, ctx, worksLoaded } = await run('play cat', '/play/masters/'); ok(!worksLoaded, 'play/masters: works 안 싣고'); ok(!(await page.$('#daily-win')), 'play/masters: 창 JSON 없음'); await ctx.close(); }
// C. /puzzle/ — 오늘 그림엔 CTA, 다른 그림엔 없음
{ const { page, ctx, worksLoaded } = await run('puzzle today', `/puzzle/${tk}/`); ok(!worksLoaded, 'puzzle(today): works 안 싣는다'); ok(!(await page.$eval('#daily-cta', (a) => a.hidden)), 'puzzle(today): 오늘의 퍼즐 CTA 보임'); await ctx.close(); }
{ const other = tk === 'wave' ? 'arnolfini' : 'wave'; const { page, ctx } = await run('puzzle other', `/puzzle/${other}/`); ok(await page.$eval('#daily-cta', (a) => a.hidden), `puzzle(${other}): CTA 숨김`); await ctx.close(); }
// D. 폴백 1 — 창 JSON 을 떼어 내면 works 를 내려받아 같은 결과
{ const { page, ctx, worksLoaded } = await run('home strip', '/', { strip: true });
  ok(worksLoaded, 'home(창 없음): works 청크를 그때 싣는다');
  const row = await rowOf(page), exp = expRow(); ok(row.length === 7 && row.every((r, i) => r.key === exp[i].k && r.title === exp[i].t), 'home(창 없음): 폴백 결과가 창과 같다');
  await ctx.close(); }
// E. 폴백 2 — 창 밖 날짜
{ const t = Date.parse('2027-03-01T03:00:00Z'); const { page, ctx, worksLoaded } = await run('home future', '/', { now: t });
  ok(worksLoaded, 'home(창 밖 날짜): works 청크를 싣는다');
  const n = await page.$$eval('#past-row a', (as) => as.filter((a) => /t-.+\.webp/.test(a.querySelector('img').getAttribute('src'))).length); ok(n === 7, `home(창 밖): 지난 7일 행 ${n}개 그려짐`);
  const { ctx: c2, worksLoaded: w2 } = await run('puzzle future', `/puzzle/${tk}/`, { now: t }); ok(w2, 'puzzle(창 밖): works 로 판단'); await c2.close(); await ctx.close(); }
// F. 계정 기록 — 이 기기에 기록이 없어도 계정에 남은 오늘의 퍼즐(다른 기기에서 맞춘 판)이 지난 7일 ✓·연속에 뜬다
{ const y = dayKST(-1); const r = await post('/api/sync', { action: 'done', entry: { kind: 'daily', key: win.days[y].k, name: 'e2e', n: 48, sec: 60, moves: 48, day: y, at: Date.now() } }, true); ok(r.status === 200, 'member: 어제 판 완성 기록을 계정에 올림', JSON.stringify(r.body));
  const { ctx, page } = await newPage(br, { member: true }); await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !document.getElementById('hero-streak').hidden, null, { timeout: 5000 }).catch(() => {});
  const m = await page.$$eval('#past-row .pd-st', (s) => s.map((e) => e.classList.contains('ok'))); ok(m.length === 7 && m[1] && m.filter(Boolean).length === 1, `member: 이 기기 기록 없이 어제 칸만 ✓ (${m})`);
  const st = await page.$eval('#hero-streak', (e) => (e.hidden ? '' : e.textContent)); ok(st.includes('1일 연속'), `member: 연속 1일 (${st})`); await ctx.close(); }
// G. 이 기기의 연속 — 마지막으로 푼 날이 어제면 이어지고, 사흘 전이면 끊긴 것이라 안 보인다 (전에는 옛 숫자가 계속 떴다)
for (const [o, show] of [[-1, true], [-3, false]]) { const { ctx, page } = await newPage(br); await ctx.addInitScript((d) => localStorage.setItem('daily:streak', JSON.stringify({ last: d, n: 5 })), dayKST(o)); await page.goto(BASE + '/', { waitUntil: 'networkidle' }); await page.waitForTimeout(300);
  const hidden = await page.$eval('#hero-streak', (e) => e.hidden); ok(hidden === !show, `guest: 마지막 ${-o}일 전 → 연속 ${show ? '보임' : '숨김'}`); await ctx.close(); }
await br.close(); finish();

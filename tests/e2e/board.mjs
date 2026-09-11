// 판(/board/) — 개발 모드 빌드(window.__jigsaw 훅) 기준. 솔로·회원 조각 XP 묶음·완성 정산(paid 제외)·이어하기에 실리는 paid·처음부터·오늘의 퍼즐
// 훅은 조각을 사람보다 빨리 놓으므로 완성 정산 전에 조각 수×0.25초(plausible)를 기다린다. 100조각을 청하면 격자에 맞춰 99조각이 된다
import { BASE, ok, finish, browser, newPage, waitPlay, trayCount as tray, leftCount as left, demo, waitResult, hud } from './lib.mjs';
const br = await browser();
const level = (page) => page.evaluate(() => fetch('/api/level').then((r) => r.json()));
// A. 비회원
{ const { ctx, page } = await newPage(br);
  await page.goto(`${BASE}/board/?k=arnolfini&n=48`); await waitPlay(page);
  ok((await tray(page)) === 48 && (await left(page)) === 48, 'solo: 48조각 판 (트레이 48)');
  await demo(page, 10); await page.waitForTimeout(300);
  ok((await left(page)) === 38 && (await tray(page)) === 38, 'solo: 10개 놓으면 남은 38', `${await left(page)} ${await tray(page)}`);
  ok((await hud(page)) === null, 'solo(비회원): XP HUD 숨김');
  await demo(page, 38); await waitResult(page);
  const t = await page.$eval('#jg-res-time', (e) => e.textContent), n = await page.$eval('#jg-res-n', (e) => e.textContent);
  ok(/\d:\d\d/.test(t) && n === '48', `solo: 결과 화면 (${t}, ${n}조각)`);
  const xpBox = await page.$eval('#jg-res-xp', (e) => ({ hidden: e.hidden, text: e.textContent })); ok(xpBox.hidden || xpBox.text.length > 0, 'solo(비회원): 결과 XP 칸은 숨김 또는 로그인 안내', JSON.stringify(xpBox));
  await ctx.close(); }
// B. 회원 — 조각 XP 묶음 → HUD, 완성 정산은 나머지만
let N1 = 0;
{ const { ctx, page } = await newPage(br, { member: true });
  await page.goto(`${BASE}/board/?k=arnolfini&n=100`); await waitPlay(page); const N = N1 = await left(page);
  ok(await page.evaluate(() => document.documentElement.classList.contains('member')), 'member: html.member');
  await demo(page, 30); await page.waitForTimeout(200); ok((await hud(page))?.includes('30'), 'member: 30개 → HUD +30 (아직 안 보냄)', String(await hud(page)));
  await demo(page, 30); await page.waitForTimeout(1500); ok((await hud(page))?.includes('60'), 'member: 60개 → 묶음 전송 뒤 HUD +60', String(await hud(page)));
  const lv1 = await level(page); ok(lv1.xp === 60 && lv1.stats.solved === 0, 'member: 서버 xp 60, 아직 완성 0', JSON.stringify(lv1));
  await page.waitForTimeout(26000); // N×0.25초
  await demo(page, N - 60); await waitResult(page); await page.waitForTimeout(1500);
  const box = await page.$eval('#jg-res-xp', (e) => ({ hidden: e.hidden, text: e.textContent })); ok(!box.hidden && box.text.includes(`+${N - 60} XP`), `member: 완성 정산은 나머지 ${N - 60} 만`, JSON.stringify(box));
  const lv2 = await level(page); ok(lv2.xp === N && lv2.stats.solved === 1 && lv2.stats.pieces === N && lv2.badges.some((b) => b.code === 'first'), `member: 서버 xp ${N}·완성 1·first 업적`, JSON.stringify(lv2));
  await ctx.close(); }
// C. 회원 — 이어하기에 paid 가 실려 간다 (5개 놓고 나가기 → resume → HUD +5 → 완성 정산 43)
{ const { ctx, page } = await newPage(br, { member: true });
  await page.goto(`${BASE}/board/?k=wave&n=48`); await waitPlay(page);
  await demo(page, 5); await page.waitForTimeout(900);
  await page.click('#jg-quit'); await page.waitForURL(/\/play\//, { timeout: 15000 }); ok(true, 'resume: 5개 놓고 나가기 → /play/');
  await page.goto(`${BASE}/board/?resume=wave:48`); await waitPlay(page);
  ok((await left(page)) === 43 && (await tray(page)) === 43, 'resume: 남은 43·트레이 43', `${await left(page)} ${await tray(page)}`);
  ok((await hud(page))?.includes('5'), 'resume: 물려받은 paid 5 가 HUD 에', String(await hud(page)));
  await page.waitForTimeout(13000); // 48×0.25초 (경과 시간은 저장에서 이어진다)
  await demo(page, 43); await waitResult(page); await page.waitForTimeout(1500);
  const box = await page.$eval('#jg-res-xp', (e) => ({ hidden: e.hidden, text: e.textContent })); ok(!box.hidden && /\+\s?43/.test(box.text), 'resume: 완성 정산 43 (paid 5 제외)', JSON.stringify(box));
  const lv = await level(page); ok(lv.xp === N1 + 48 && lv.stats.solved === 2, `resume: 서버 xp ${N1 + 48}·완성 2`, JSON.stringify(lv));
  await ctx.close(); }
// D. 처음부터
{ const { ctx, page } = await newPage(br);
  await page.goto(`${BASE}/board/?k=wave&n=48`); await waitPlay(page);
  await demo(page, 3); await page.waitForTimeout(200); ok((await left(page)) === 45, 'restart: 3개 놓음');
  await page.click('#jg-restart'); await page.waitForFunction(() => Number(document.getElementById('jg-left-n').textContent) === 48, null, { timeout: 15000 }); await page.waitForTimeout(300);
  ok((await tray(page)) === 48, 'restart: 트레이 48 로 복구');
  await ctx.close(); }
// E. 오늘의 퍼즐·큰 판
{ const { ctx, page } = await newPage(br); await page.goto(`${BASE}/board/?daily=1`); await waitPlay(page); ok((await tray(page)) === 48 && (await page.$eval('#jg-hud-name', (e) => e.textContent)).length > 0, 'daily: 48조각으로 열림'); await ctx.close(); }
{ const { ctx, page } = await newPage(br, { member: true }); await page.goto(`${BASE}/board/?k=wave&n=300`); await waitPlay(page); const l = await left(page); ok(Math.abs(l - 300) <= 30, `n=300 → 격자에 맞춘 ${l}조각`);
  // 조각 수 가중치: 200~300조각은 조각당 1.5 — 판의 HUD(localRate)도 서버 정산도 60조각에 90
  const lv0 = await level(page); await demo(page, 60); await page.waitForTimeout(1500); ok((await hud(page))?.includes('90'), 'weight(294조각): 60개 → HUD +90', String(await hud(page)));
  const lv1 = await level(page); ok(lv1.xp - lv0.xp === 90, 'weight(294조각): 서버 +90', JSON.stringify({ before: lv0.xp, after: lv1.xp }));
  await ctx.close(); }
// F. 윤곽선·밑그림 켜고 끈 것은 기기에 남는다 — 48조각(윤곽선 기본 켜짐)에서 윤곽선 끄고 밑그림 켠 뒤 다른 판을 열어도 그대로
{ const { ctx, page } = await newPage(br); const st = () => page.evaluate(() => ['jg-outline', 'jg-hint'].map((id) => document.getElementById(id).getAttribute('aria-pressed')).join(','));
  await page.goto(`${BASE}/board/?k=wave&n=48`); await waitPlay(page); const s0 = await st(); ok(s0 === 'true,false', `prefs: 처음엔 기본값 — 윤곽선 켜짐·밑그림 꺼짐 (${s0})`);
  await page.click('#jg-outline'); await page.click('#jg-hint');
  await page.goto(`${BASE}/board/?k=arnolfini&n=48`); await waitPlay(page); const s1 = await st(); ok(s1 === 'false,true', `prefs: 다른 판에서도 윤곽선 꺼짐·밑그림 켜짐 (${s1})`);
  await ctx.close(); }
await br.close(); finish();

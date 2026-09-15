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
  // 완성 기록에 그 판의 컷이, 놓은 순서는 IndexedDB replays 에 — /my/ 완성 보기가 조각 윤곽 완성본과 타임랩스를 그린다
  await page.waitForTimeout(500); const rec = await page.evaluate(() => JSON.parse(localStorage.getItem('done:list'))[0]); ok(rec && rec.seed > 0 && rec.cols * rec.rows === 48, 'done: 기록에 seed·cols·rows', JSON.stringify({ seed: rec?.seed, cols: rec?.cols, rows: rec?.rows }));
  const rp = await page.evaluate((at) => new Promise((res) => { const r = indexedDB.open('jigsawlab'); r.onsuccess = () => { const q = r.result.transaction('replays').objectStore('replays').get(at); q.onsuccess = () => res(q.result); }; }), rec.at); ok(rp?.seq?.length === 48, 'done: 놓은 순서 48개가 replays 에', JSON.stringify(rp?.seq?.slice(0, 5)));
  // 결과 화면의 '완성 보기' → /done/?at= 페이지: 실물처럼 새긴 완성본, 놓은 순서가 있으니 타임랩스가 바로 돌고 버튼으로 다시
  const viewHref = await page.$eval('#jg-res-view', (a) => (a.hidden ? '' : a.getAttribute('href'))); ok(viewHref.includes(`/done/?at=${rec.at}`), '결과: 완성 보기 링크', viewHref);
  await page.click('#jg-res-view'); await page.waitForFunction(() => document.getElementById('dv')?.dataset.ready === '1', null, { timeout: 30000 });
  ok((await page.$eval('#dv-cv', (c) => c.width)) > 100 && (await page.$eval('#dv-again', (a) => a.getAttribute('href'))).includes('/puzzle/arnolfini/') && (await page.$eval('#dv-title', (e) => e.textContent)).length > 0, '완성 보기: 페이지·완성본·다시 맞추기 링크');
  await page.waitForFunction(() => !document.getElementById('dv-play').hidden, null, { timeout: 8000 }); ok(await page.$eval('#dv-play', (b) => b.disabled), '완성 보기: 열자마자 타임랩스 재생 중');
  await page.waitForFunction(() => !document.getElementById('dv-play').disabled, null, { timeout: 12000 }); await page.click('#dv-play'); ok(await page.$eval('#dv-play', (b) => b.disabled), '완성 보기: 타임랩스 다시');
  await page.goto(`${BASE}/my/`); const cardHref = await page.$eval('#l-done .mc', (a) => a.getAttribute('href')); ok(cardHref?.includes('/done/?at='), '/my/: 완성 카드가 완성 보기 페이지로', cardHref);
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
// 오늘의 퍼즐은 48조각을 청하지만 그날 그림의 비율에 따라 격자가 45~50 으로 맞춰진다(2026-09-14 코토팍시는 45) — 정확히 48 을 기대하면 날짜 따라 깨진다
{ const { ctx, page } = await newPage(br); await page.goto(`${BASE}/board/?daily=1`); await waitPlay(page); const n = await tray(page); ok(Math.abs(n - 48) <= 6 && (await page.$eval('#jg-hud-name', (e) => e.textContent)).length > 0, `daily: 48조각 근처로 열림 (${n})`); await ctx.close(); }
// 오늘의 퍼즐 후보는 시기별로 얼린다(works.ts dailyPool) — 무하 102점이 후보 중간에 끼며 지난 날짜가 통째로 바뀌었던 것. 2026-09-14 까지는 옛 목록이라 그날은 코토팍시 풍경.
// 저장은 날짜로 찾으므로(daily:<날짜>) 그림이 다른 저장이 걸려 있으면 이어하지 않고 새 판
{ const { ctx, page } = await newPage(br); await page.goto(`${BASE}/board/?daily=2026-09-14`); await waitPlay(page);
  const name = await page.$eval('#jg-hud-name', (e) => e.textContent); ok(name.includes('코토팍시 풍경'), 'daily era: 2026-09-14 는 코토팍시 풍경', name); const n = await tray(page);
  await page.evaluate(() => new Promise((res) => { const r = indexedDB.open('jigsawlab'); r.onsuccess = () => { const tx = r.result.transaction('saves', 'readwrite'); tx.objectStore('saves').put({ id: 'daily:2026-09-14', v: 1, kind: 'daily', key: 'adam-three-kittens', name: 'x', day: '2026-09-14', seed: 1, cols: 8, rows: 6, total: 48, imgW: 1600, imgH: 1200, locked: [0, 1, 2, 3, 4], groups: [], tray: [], elapsed: 0, moves: 5, savedAt: Date.now(), thumb: '', done: 5 }); tx.oncomplete = res; }; }));
  await page.goto(`${BASE}/board/?daily=2026-09-14`); await waitPlay(page); const l = await left(page); ok(l === n && (await tray(page)) === n && (await page.$eval('#jg-hud-name', (e) => e.textContent)).includes('코토팍시 풍경'), 'daily era: 날짜로 찾은 저장이 딴 그림이면 이어하지 않고 새 판', `${l}/${n}`);
  await ctx.close(); }
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
// G. 스피드 다이얼·판 배경·단축키·모양순·전체 화면 버튼 (비회원, 데스크톱 뷰포트)
{ const { ctx, page } = await newPage(br);
  await page.goto(`${BASE}/board/?k=wave&n=100`); await waitPlay(page); const N = await left(page);
  const vis = () => page.$$eval('#jg-tray .tp:not([hidden])', (els) => els.length);
  const tool = async (id) => { await page.click('#jg-fab'); await page.waitForSelector(`${id}:visible`); await page.click(id); }; // 도구는 FAB(스피드 다이얼)를 열고 누른다
  ok((await page.$eval('#jg-dial', (e) => e.classList.contains('open'))) === false && !(await page.$('#jg-traybar #jg-sort')) && !!(await page.$('#jg-traybar #jg-full')), 'dial: 처음엔 닫혀 있고, 트레이 바에는 색상순·섞기 대신 원본보기만');
  // 배경: 팝오버에서 어두움 → 기기에 남고(board:bg) 판에 적용. B 키는 차례로 넘긴다
  await tool('#jg-bg'); await page.waitForSelector('#jg-bgpick:not([hidden])'); ok((await page.$eval('#jg-dial', (e) => e.classList.contains('open'))) === false, 'dial: 항목을 고르면 닫힘'); await page.click('#jg-bgpick-list button[data-bg="dark"]');
  ok((await page.evaluate(() => localStorage.getItem('board:bg'))) === 'dark' && (await page.$eval('.scene.play', (e) => e.dataset.bg)) === 'dark', 'bg: 어두움 선택 → 저장·적용');
  await page.keyboard.press('b'); ok((await page.$eval('.scene.play', (e) => e.dataset.bg)) === 'sepia', 'bg: B 키로 다음(세피아)');
  await page.keyboard.press('h'); ok((await page.$eval('#jg-hint', (e) => e.getAttribute('aria-pressed'))) === 'true', 'keys: H 밑그림');
  const o0 = await page.$eval('#jg-outline', (e) => e.getAttribute('aria-pressed')); await page.keyboard.press('o'); ok((await page.$eval('#jg-outline', (e) => e.getAttribute('aria-pressed'))) !== o0, `keys: O 윤곽선 토글 (${o0} → 반대)`);
  await page.keyboard.press('e'); const edgeN = await vis(); ok((await page.$eval('#jg-edge', (e) => e.getAttribute('aria-pressed'))) === 'true' && edgeN > 0 && edgeN < N, `keys: E 테두리 → 트레이 ${edgeN}/${N}`);
  await page.keyboard.press('e'); ok((await vis()) === N, 'keys: E 다시 → 전체');
  // 모양순: 같은 실루엣끼리 — 트레이 순서가 모양 키(테두리 → 톱니 수 → 배치) 오름차순
  await tool('#jg-shape'); await page.waitForTimeout(300);
  const ks = await page.evaluate(() => window.__jigsaw.state().trayShape); ok(ks.length === N && ks.every((v, i) => i === 0 || v >= ks[i - 1]) && ks[0] < 1000 && ks[ks.length - 1] >= 2000, `shape: 트레이가 모양순 (${ks.slice(0, 5).join(',')} … ${ks.slice(-2).join(',')})`);
  // 다이얼 상자가 판을 가리지 않는다 — FAB 위쪽 빈 자리(접힌 항목이 있던 곳)에서 끌면 판이 움직인다. 전에는 그 한 뼘이 캔버스에 안 닿아 끌기·핀치가 안 됐다
  { const wr = await (await page.$('#jg-boardwrap')).boundingBox(); const v0 = await page.evaluate(() => window.__jigsaw.state().view);
    await page.mouse.move(wr.x + wr.width - 40, wr.y + wr.height - 150); await page.mouse.down(); await page.mouse.move(wr.x + wr.width - 220, wr.y + wr.height - 320, { steps: 8 }); await page.mouse.up();
    const v1 = await page.evaluate(() => window.__jigsaw.state().view); ok(Math.abs(v1.tx - v0.tx) > 50 && Math.abs(v1.ty - v0.ty) > 50, 'dial: FAB 위 빈 자리에서 끌어도 판이 움직인다', JSON.stringify({ v0, v1 })); }
  // 판 위 조각 찾기: 판에 외톨이가 없으면 알림만. 꺼내 둔 조각이 화면 밖에 있으면 다 보이게 물러나며 5초 동안 반짝인다
  { const finding = () => page.evaluate(() => window.__jigsaw.state().finding);
    await tool('#jg-find'); await page.waitForTimeout(150);
    ok((await page.$eval('.toast', (e) => e.textContent)) === '판 위에 따로 떨어진 조각이 없어요' && !(await finding()), 'find: 판에 조각이 없으면 알림만');
    const wr = await (await page.$('#jg-boardwrap')).boundingBox(); const bb = await (await page.$('#jg-tray .tp:not([hidden])')).boundingBox();
    await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.mouse.down(); await page.mouse.move(bb.x + bb.width / 2, bb.y - 30, { steps: 4 }); await page.mouse.move(wr.x + wr.width / 2, wr.y + wr.height / 2, { steps: 12 }); await page.mouse.up();
    await page.mouse.move(wr.x + wr.width - 60, wr.y + 60); await page.mouse.down(); await page.mouse.move(wr.x + 60, wr.y + 60, { steps: 10 }); await page.mouse.up(); // 판을 왼쪽으로 끌어 조각을 화면 밖으로
    const onScreen = () => page.evaluate(() => { const s = window.__jigsaw.state(), p = s.loose[0], r = document.getElementById('jg-boardwrap').getBoundingClientRect(); const x = p.x * s.view.s + s.view.tx, y = p.y * s.view.s + s.view.ty; return x >= 0 && y >= 0 && x + s.pw * s.view.s <= r.width && y + s.ph * s.view.s <= r.height; });
    const lo = await page.evaluate(() => window.__jigsaw.state().loose.length); ok(lo === 1 && !(await onScreen()), 'find: 꺼낸 조각을 화면 밖으로 밀어 둠', String(lo));
    await tool('#jg-find'); await page.waitForTimeout(700);
    ok((await finding()) && (await onScreen()), 'find: 화면 밖 조각이 보이게 물러나고 반짝임 켜짐');
    await page.waitForTimeout(4700); ok(!(await finding()), 'find: 5초 뒤 꺼짐'); }
  ok(await page.$eval('#jg-fs', (e) => !e.hidden), 'fs: 데스크톱에 전체 화면 버튼');
  ok((await page.$eval('#jg-hint', (e) => e.title)).includes('H'), 'keys: 마우스 기기 버튼 설명에 단축키');
  await ctx.close(); }
// H. 이어하기에 놓은 순서(seq)가 실려 간다
{ const { ctx, page } = await newPage(br);
  await page.goto(`${BASE}/board/?k=wave&n=48`); await waitPlay(page); await demo(page, 7); await page.waitForTimeout(900);
  const sv = await page.evaluate(() => new Promise((res) => { const r = indexedDB.open('jigsawlab'); r.onsuccess = () => { const q = r.result.transaction('saves').objectStore('saves').get('wave:48'); q.onsuccess = () => res(q.result); }; }));
  ok(Array.isArray(sv?.seq) && sv.seq.length === 7 && sv.locked.length === 7 && sv.seq.every((i) => sv.locked.includes(i)), 'save: seq 7개 = locked', JSON.stringify({ seq: sv?.seq, locked: sv?.locked }));
  await ctx.close(); }
// I. 그림은 R2 에서 CORS 로 받는다 — 상세 페이지의 큰 상자가 같은 원본을 먼저 받아 두면 판은 그 브라우저 캐시를 쓰는데,
//    어느 쪽이든 crossorigin 이 빠지면 CORS 헤더 없는 사본이 판에 가서 그림 로드가 실패한다(lib/img.ts)
{ const { ctx, page } = await newPage(br); const bad = [];
  page.on('console', (m) => { if (m.type() === 'error' && /CORS|tainted/i.test(m.text())) bad.push(m.text()); });
  page.on('requestfailed', (r) => { if (r.url().includes('img.jigsawlab.app') && r.failure()?.errorText !== 'net::ERR_ABORTED') bad.push(`${r.url()} ${r.failure()?.errorText}`); });
  await page.goto(`${BASE}/puzzle/wave/`); await page.waitForFunction(() => { const im = document.querySelector('.box3d.big img'); return im?.complete && im.naturalWidth > 0; }, null, { timeout: 20000 });
  ok(await page.$eval('.box3d.big img', (im) => im.src.startsWith('https://img.jigsawlab.app/') && im.crossOrigin === 'anonymous'), 'img: 상세 페이지 큰 상자가 R2 원본을 crossorigin 으로');
  await page.goto(`${BASE}/board/?k=wave&n=48`); await waitPlay(page);
  ok((await tray(page)) === 48 && bad.length === 0, 'img: 같은 원본 캐시로 판이 뜨고 CORS 오류 없음', bad.join(' | '));
  await ctx.close(); }
await br.close(); finish();

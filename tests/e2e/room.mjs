// 방 — 두 브라우저. 진입 화면(닉네임)·접속 인원·트레이에서 꺼내기(take)·되돌리기(untake)·남이 든 조각·나가기(leave)
import { BASE, ok, finish, browser, newPage, waitPlay, trayCount as tray } from './lib.mjs';
const br = await browser();
const join = async (page, id, nick) => { await page.goto(`${BASE}/board/?room=${id}`); await page.waitForSelector('#jg-gate:not([hidden])', { timeout: 20000 }); await page.fill('#jg-gate-nick', nick); await page.press('#jg-gate-nick', 'Enter'); await waitPlay(page, false); };
const r = await fetch(`${BASE}/api/room`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ key: 'wave', n: 48 }) }); const { id } = await r.json(); ok(!!id, `room ${id}`);
const A = await newPage(br), B = await newPage(br);
await join(A.page, id, 'A'); await join(B.page, id, 'B'); await A.page.waitForTimeout(500);
ok((await A.page.$eval('#jg-pcount', (e) => e.textContent)) === '2' && (await B.page.$eval('#jg-pcount', (e) => e.textContent)) === '2', 'room: 둘 다 접속 2명');
ok((await tray(A.page)) === 48 && (await tray(B.page)) === 48, 'room: 트레이 48·48');
// A 가 트레이 첫 조각을 판으로 끌어올린다 (마우스: pointerdown → 6px 이상 → 들어 올림 → 판 위에서 놓기)
const el = await A.page.$('#jg-tray .tp'); const bb = await el.boundingBox(); const wrap = await (await A.page.$('#jg-boardwrap')).boundingBox();
const dropX = wrap.x + wrap.width * 0.75, dropY = wrap.y + wrap.height * 0.3;
await A.page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await A.page.mouse.down(); await A.page.mouse.move(bb.x + bb.width / 2, bb.y - 30, { steps: 4 }); await A.page.mouse.move(dropX, dropY, { steps: 12 }); await A.page.mouse.up();
await B.page.waitForFunction(() => document.querySelectorAll('#jg-tray .tp').length === 47, null, { timeout: 5000 }).catch(() => {});
ok((await tray(A.page)) === 47, 'room: A 트레이 47', String(await tray(A.page)));
ok((await tray(B.page)) === 47, 'room: B 도 47 (take 브로드캐스트)', String(await tray(B.page)));
// A 가 그 조각을 다시 트레이로 되돌린다
const trayBox = await (await A.page.$('#jg-tray')).boundingBox();
await A.page.mouse.move(dropX, dropY); await A.page.mouse.down(); await A.page.mouse.move(dropX, dropY + 40, { steps: 4 }); await A.page.mouse.move(trayBox.x + trayBox.width / 2, trayBox.y + trayBox.height / 2, { steps: 12 }); await A.page.mouse.up();
await B.page.waitForFunction(() => document.querySelectorAll('#jg-tray .tp').length === 48, null, { timeout: 5000 }).catch(() => {});
ok((await tray(A.page)) === 48, 'room: 되돌리기 → A 트레이 48', String(await tray(A.page)));
ok((await tray(B.page)) === 48, 'room: B 도 48 (untake 브로드캐스트)', String(await tray(B.page)));
// B 가 든 조각은 A 트레이에서 빠진다
const el2 = await B.page.$('#jg-tray .tp'); const b2 = await el2.boundingBox();
await B.page.mouse.move(b2.x + b2.width / 2, b2.y + b2.height / 2); await B.page.mouse.down(); await B.page.mouse.move(b2.x + b2.width / 2, b2.y - 30, { steps: 4 }); await B.page.mouse.move(dropX, dropY, { steps: 12 });
await A.page.waitForFunction(() => document.querySelectorAll('#jg-tray .tp').length === 47, null, { timeout: 5000 }).catch(() => {});
ok((await tray(A.page)) === 47, 'room: B 가 든 조각이 A 트레이에서 빠짐');
await B.page.mouse.up(); await A.page.waitForTimeout(400);
// A 나가기 → B 접속 1명
await A.page.click('#jg-quit'); await A.page.waitForURL(/\/play\//, { timeout: 15000 });
await B.page.waitForFunction(() => document.getElementById('jg-pcount').textContent === '1', null, { timeout: 5000 }).catch(() => {});
ok((await B.page.$eval('#jg-pcount', (e) => e.textContent)) === '1', 'room: A 나가면 B 에 1명');
const info = await (await fetch(`${BASE}/api/room/${id}`)).json(); ok(info.players === 1 && info.locked === 0, 'room: 서버 정보 players 1', JSON.stringify(info));
await A.ctx.close(); await B.ctx.close();

// 회원 — 방에서 내가 놓은 조각(mine)·조각 XP 가 재접속과 늦은 서버 확인에 새지 않는다. 전에는
//  ① 재접속·재동기화(init → start)가 mine·아직 안 보낸 XP 묶음·모두의 퍼즐 보고분을 0 으로 지웠고(XP 는 60조각마다 이미 갔는데 기여 보고는 사라져 둘이 어긋났다)
//  ② 스냅(140ms)이 서버 lock 확인보다 먼저 끝나면 뭉치가 bySid 에서 빠져 확인이 와도 내 조각으로 안 셌다(서버와 먼 접속은 거의 매번)
{ const level = (page) => page.evaluate(() => fetch('/api/level').then((r) => r.json()));
  const mine = (page) => page.evaluate(() => window.__jigsaw.state().mine);
  const reconnect = async (page) => { await page.evaluate(() => window.__jigsaw.drop()); await page.waitForFunction(() => document.querySelector('.toast')?.textContent === '다시 연결됐어요', null, { timeout: 30000 }); await page.waitForTimeout(300); };
  const r2 = await fetch(`${BASE}/api/room`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ key: 'wave', n: 48 }) }); const { id: id2 } = await r2.json(); const made = Date.now();
  // 모두의 퍼즐(1000조각, 조각당 3): 4개 → 재접속 → 늦은 확인 2개 → 나가기. 조각 XP 18 과 기여 보고 6조각이 둘 다 서버에
  { const { ctx, page } = await newPage(br, { member: true });
    await page.goto(`${BASE}/board/?room=live`); await waitPlay(page); const lv0 = await level(page);
    await page.evaluate(() => window.__jigsaw.demo(4)); await page.waitForTimeout(800); ok((await mine(page)) === 4, 'live: 4개 놓음 → mine 4', String(await mine(page)));
    await reconnect(page); ok((await mine(page)) === 4, 'live: 재접속해도 mine 4', String(await mine(page)));
    await page.evaluate(() => window.__jigsaw.demo(2, true)); await page.waitForTimeout(800); ok((await mine(page)) === 6, 'live: 스냅이 서버 확인보다 먼저 끝나도 mine 6', String(await mine(page)));
    await page.click('#jg-quit'); await page.waitForURL(/\/play\//, { timeout: 15000 }); await page.waitForTimeout(800);
    const lv1 = await level(page); const d = { xp: lv1.xp - lv0.xp, pieces: lv1.stats.pieces - lv0.stats.pieces, live: lv1.stats.live_n - lv0.stats.live_n };
    ok(d.xp === 18 && d.pieces === 6 && d.live === 1, 'live: 나가면 조각 XP 18·기여 6조각·live_n 1', JSON.stringify(d));
    await ctx.close(); }
  // 초대 방(48조각): 5개 → 재접속 → 늦은 확인 3개 → 나머지 40개로 완성. 완성 정산의 mine 48 = XP 48·조각 48
  { const { ctx, page } = await newPage(br, { member: true });
    await page.goto(`${BASE}/board/?room=${id2}`); await waitPlay(page); const lv0 = await level(page);
    await page.evaluate(() => window.__jigsaw.demo(5)); await page.waitForTimeout(800); ok((await mine(page)) === 5, 'room(회원): 5개 → mine 5');
    await reconnect(page); ok((await mine(page)) === 5 && (await tray(page)) === 43, 'room(회원): 재접속해도 mine 5·트레이 43', `${await mine(page)} ${await tray(page)}`);
    await page.evaluate(() => window.__jigsaw.demo(3, true)); await page.waitForTimeout(800); ok((await mine(page)) === 8, 'room(회원): 늦은 확인 3개도 mine 8', String(await mine(page)));
    await page.waitForTimeout(Math.max(0, 13000 - (Date.now() - made))); // 48×0.25초 (방의 경과 시간은 만든 때부터)
    await page.evaluate(() => window.__jigsaw.demo(40)); await page.waitForFunction(() => document.querySelector('.scene.result')?.classList.contains('active'), null, { timeout: 20000 }); await page.waitForTimeout(1500);
    const lv1 = await level(page); const d = { xp: lv1.xp - lv0.xp, pieces: lv1.stats.pieces - lv0.stats.pieces, room: lv1.stats.room_n - lv0.stats.room_n };
    ok(d.xp === 48 && d.pieces === 48 && d.room === 1, 'room(회원): 완성 정산 XP 48·조각 48·방 1판', JSON.stringify(d));
    await ctx.close(); }
  // 모두의 퍼즐이 끊겨 있는 동안 다 맞춰져 다음 그림으로 넘어갔다 → 재접속 init 에 새 그림이 온다. 전에는 받은 상태를 옛 그림 위에 깔았다.
  // 지난 회차에 놓고 아직 안 알린 조각(2개)도 판을 갈기 전에 알린다
  { const A = await newPage(br, { member: true }), B = await newPage(br);
    const liveKey = async () => (await (await fetch(`${BASE}/api/room/live`)).json()).key;
    await A.page.goto(`${BASE}/board/?room=live`); await waitPlay(A.page); const lv0 = await level(A.page); const name0 = await A.page.$eval('#jg-hud-name', (e) => e.textContent); const key0 = await liveKey();
    await A.page.evaluate(() => window.__jigsaw.demo(2)); await A.page.waitForTimeout(800); ok((await mine(A.page)) === 2, 'rotate: A 가 2개 놓음');
    await A.page.evaluate(() => { window.__WS = window.WebSocket; window.WebSocket = function () { throw new Error('offline'); }; window.__jigsaw.drop(); }); // 소켓이 죽고 다시 붙지도 못한다
    // 나눠서 놓는다 — 1000조각의 take·lock 2000개를 한꺼번에 쏘면 로컬 workerd 가 죽는다('Network connection lost')
    await join(B.page, 'live', 'B'); for (let i = 0; i < 60 && (await tray(B.page)) > 0; i++) { await B.page.evaluate(() => window.__jigsaw.demo(40)); await B.page.waitForTimeout(250); }
    let key1 = key0; for (let i = 0; i < 60 && key1 === key0; i++) { await B.page.waitForTimeout(1000); key1 = await liveKey(); } ok(key1 !== key0, `rotate: B 가 다 맞추자 다음 그림 (${key0} → ${key1})`);
    await A.page.evaluate(() => { window.WebSocket = window.__WS; });
    await A.page.waitForFunction((n0) => { const n = document.getElementById('jg-hud-name')?.textContent; return !!n && n !== n0 && document.getElementById('jg-loading')?.hidden && document.querySelectorAll('#jg-tray .tp').length > 0; }, name0, { timeout: 45000 }).catch(() => {});
    const name1 = await A.page.$eval('#jg-hud-name', (e) => e.textContent); ok(name1 !== name0 && (await tray(A.page)) > 0, `rotate: A 가 다시 붙자 새 그림으로 판을 새로 깐다 (${name0} → ${name1})`);
    await A.page.waitForTimeout(1500); const lv1 = await level(A.page); const d = { xp: lv1.xp - lv0.xp, pieces: lv1.stats.pieces - lv0.stats.pieces, live: lv1.stats.live_n - lv0.stats.live_n };
    ok(d.xp === 6 && d.pieces === 2 && d.live === 1 && (await mine(A.page)) === 0, 'rotate: 지난 회차의 2조각을 알리고(XP 6·조각 2) 새 회차는 0 부터', JSON.stringify(d));
    await A.ctx.close(); await B.ctx.close(); } }
await br.close(); finish();

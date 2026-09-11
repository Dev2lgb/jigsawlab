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
await A.ctx.close(); await B.ctx.close(); await br.close(); finish();

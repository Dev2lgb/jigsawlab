// 컨택트 시트(PNG): candidates.json 의 시트에서 고른 번호들의 320px 썸네일을 격자로 붙여 그림 한 장으로 — HTML 시트를 못 여는 자리(AI 검토·터미널)에서 후보를 훑을 때
//   node scripts/extra/sheet-png.mjs <시트> <번호들: 3,7,10-25 | all> <출력 접두어>   (TW/TH/TC/TR 환경변수로 칸 크기·열·행)
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
const [,, sheet, idxArg, outPrefix] = process.argv;
const C = JSON.parse(readFileSync('scripts/extra/candidates.json', 'utf8'))[sheet];
const idx = idxArg === 'all' ? C.map((_, i) => i) : idxArg.split(',').flatMap((r) => { const m = r.match(/^(\d+)-(\d+)$/); return m ? Array.from({ length: +m[2] - +m[1] + 1 }, (_, k) => +m[1] + k) : [+r]; });
const UA = { 'user-agent': 'jigsawlab-catalog/0.1 (seabow2@nate.com)' };
const W = +(process.env.TW || 150), H = +(process.env.TH || 190), COLS = +(process.env.TC || 8), ROWS = +(process.env.TR || 6), PER = COLS * ROWS;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function thumb(o) { const u = o.thumb ? o.thumb.replace(/\/1600px-/, '/320px-') : o.url; for (let i = 0; i < 3; i++) { try { const r = await fetch(u, { headers: UA }); if (r.ok) return Buffer.from(await r.arrayBuffer()); } catch {} await sleep(500); } return null; }
for (let p = 0; p * PER < idx.length; p++) {
  const part = idx.slice(p * PER, (p + 1) * PER); const comps = [];
  for (let k = 0; k < part.length; k++) {
    const i = part[k], o = C[i]; const x = (k % COLS) * W, y = Math.floor(k / COLS) * H;
    const buf = await thumb(o); await sleep(120);
    if (buf) { try { comps.push({ input: await sharp(buf).resize(W - 4, H - 24, { fit: 'inside' }).png().toBuffer(), left: x + 2, top: y + 2 }); } catch {} }
    const label = `<svg width="${W}" height="22"><rect width="${W}" height="22" fill="#222"/><text x="3" y="15" font-size="11" fill="#ffd54a" font-family="sans-serif">${i} <tspan fill="#ccc">${o.w}x${o.h}</tspan></text></svg>`;
    comps.push({ input: Buffer.from(label), left: x, top: y + H - 22 });
  }
  const rows = Math.ceil(part.length / COLS);
  await sharp({ create: { width: COLS * W, height: rows * H, channels: 3, background: '#111' } }).composite(comps).png().toFile(`${outPrefix}-${p}.png`);
  console.log(`${outPrefix}-${p}.png`, part.length);
}

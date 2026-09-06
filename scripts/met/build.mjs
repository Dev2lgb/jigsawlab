// 3단계: selected.json 의 원본을 IIIF 로 받아 WebP(1600 긴변) · 썸네일(480) · OG(400²) 생성, src/data/aic.json 작성
//   node scripts/met/build.mjs [--only key1,key2]
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';
const H = { 'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/128 Safari/537.36', 'AIC-User-Agent': 'jigsawlab catalog builder (seabow2@nate.com)' };
const sel = JSON.parse(readFileSync('scripts/met/selected.json', 'utf8'));
const only = (process.argv.find((a) => a.startsWith('--only='))?.slice(7) || '').split(',').filter(Boolean);
mkdirSync('scripts/met/orig', { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url) { for (let i = 0; i < 4; i++) { try { const r = await fetch(url, { headers: H }); if (r.ok) return Buffer.from(await r.arrayBuffer()); if (r.status === 403 || r.status === 429) await sleep(5000 * (i + 1)); } catch {} await sleep(1000); } return null; }
const out = []; let n = 0;
for (const s of sel) {
  if (only.length && !only.includes(s.key)) continue;
  const orig = `scripts/met/orig/${s.key}.jpg`;
  let buf = existsSync(orig) ? readFileSync(orig) : null;
  if (!buf) { buf = await get(`https://www.artic.edu/iiif/2/${s.img}/full/1686,/0/default.jpg`) || await get(`https://www.artic.edu/iiif/2/${s.img}/full/843,/0/default.jpg`); if (!buf) { console.log('FAIL', s.key); continue; } writeFileSync(orig, buf); await sleep(300); }
  const im = sharp(buf); const md = await im.metadata();
  await im.clone().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/jigsaw/${s.key}.webp`);
  await im.clone().resize({ width: 480, height: 480, fit: 'inside' }).webp({ quality: 80 }).toFile(`public/jigsaw/t-${s.key}.webp`);
  await im.clone().resize({ width: 400, height: 400, fit: 'cover', position: 'attention' }).jpeg({ quality: 82 }).toFile(`public/jigsaw/o-${s.key}.jpg`);
  const w = Math.min(1600, md.width), h = Math.round(md.height * (w / md.width));
  out.push({ key: s.key, id: s.id, cat: s.cat, title: s.title, artist: s.artist, date: s.date, year: s.year, medium: s.medium, credit: s.credit, origin: s.origin, w, h, src: md.width });
  process.stdout.write(`${++n} ${s.key} ${md.width}x${md.height}\n`);
}
if (!only.length) writeFileSync('src/data/aic.json', JSON.stringify(out, null, 1));
console.log('done', out.length);

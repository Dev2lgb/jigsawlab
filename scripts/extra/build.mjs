// 3단계(추가 소스): selected.json 의 이미지를 받아 WebP(1600 긴변)·썸네일(480)·OG(400²) 생성 → src/data/extra.json
//   node scripts/extra/build.mjs [--only=key1,key2]
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';
const H = { 'user-agent': 'jigsawlab-catalog/0.1 (seabow2@nate.com)' };
const sel = JSON.parse(readFileSync('scripts/extra/selected.json', 'utf8'));
const only = (process.argv.find((a) => a.startsWith('--only='))?.slice(7) || '').split(',').filter(Boolean);
mkdirSync('scripts/extra/orig', { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url) { for (let i = 0; i < 4; i++) { try { const r = await fetch(url, { headers: H }); if (r.ok) return Buffer.from(await r.arrayBuffer()); if (r.status === 429 || r.status === 403) await sleep(4000 * (i + 1)); } catch {} await sleep(1000); } return null; }
/** 포토크롬 원본 스캔의 검은 테두리·색상 보정 띠를 잘라낸다: 행·열별 '밝은 픽셀 비율'이 높은 가장 긴 연속 구간을 사진 영역으로 본다 */
async function autoCrop(buf) {
  const im = sharp(buf); const md = await im.metadata(); const W = 400, H = Math.round(md.height * W / md.width);
  const { data } = await im.clone().resize(W, H, { fit: 'fill' }).greyscale().raw().toBuffer({ resolveWithObject: true });
  // 네 모서리 표본으로 테두리 색을 잡고(균일하지 않으면 스캔 테두리가 없는 것으로 보고 그대로 둠), 그 색과 비슷한 픽셀이 90% 넘는 행·열을 테두리로 본다
  const patch = (x0, y0) => { const v = []; for (let y = y0; y < y0 + 12; y++) for (let x = x0; x < x0 + 12; x++) v.push(data[y * W + x]); const m = v.reduce((a, b) => a + b, 0) / v.length; const sd = Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / v.length); return { m, sd }; };
  const o = Math.round(Math.min(W, H) * 0.05); // 스캔 가장자리의 밝은 선·눈금을 피해 조금 안쪽에서 표본을 뜬다
  const corners = [patch(o, o), patch(W - 12 - o, o), patch(o, H - 12 - o), patch(W - 12 - o, H - 12 - o)];
  // 균일하고 어두운 모서리 중 가장 어두운 값을 테두리 색으로. 그런 모서리가 없으면(사진이 가장자리까지 차 있으면) 그대로 둔다
  const dark = corners.filter((c) => c.sd <= 12 && c.m < 80).map((c) => c.m); if (!dark.length) return { buf, crop: null };
  const border = Math.min(...dark);
  const like = (v) => Math.abs(v - border) < 22;
  // 테두리 줄 = 테두리 색과 비슷한 픽셀이 92% 이상인 줄 (사진 속 어두운 숲도 80%대에 머문다)
  const stat = (get, len) => { let n = 0, sum = 0, sq = 0; for (let i = 0; i < len; i++) { const v = get(i); if (like(v)) n++; sum += v; sq += v * v; } const m = sum / len, sd = Math.sqrt(Math.max(0, sq / len - m * m)); return n / len >= 0.92 ? 1 : 0; };
  const rows = Array.from({ length: H }, (_, y) => stat((x) => data[y * W + x], W));
  const cols = Array.from({ length: W }, (_, x) => stat((y) => data[y * W + x], H));
  // 가장자리에서 안쪽으로: 테두리·얇은 띠(스캐너 눈금·색상 보정 띠)를 모두 건너뛰고, 두툼한 첫 내용 블록(사진)이 시작되는 줄을 찾는다. 사진 안의 어두운 부분은 가장자리와 이어지지 않으니 안전
  const edge = (a) => { const n = a.length, isB = (k) => a[k] >= 0.85; let i = 0; while (i < n) { while (i < n && isB(i)) i++; let j = i; while (j < n && !isB(j)) j++; if (j >= n || j - i >= n * 0.12) return i; i = j; } return 0; };
  const span = (a) => [edge(a), a.length - edge([...a].reverse())];
  const [y0, y1] = span(rows), [x0, x1] = span(cols);
  if (y1 - y0 < H * 0.5 || x1 - x0 < W * 0.5) return { buf, crop: null };
  if (y0 === 0 && y1 === H && x0 === 0 && x1 === W) return { buf, crop: null };
  const inset = 0.006; const L = Math.round((x0 / W + inset) * md.width), T = Math.round((y0 / H + inset) * md.height), R = Math.round((x1 / W - inset) * md.width), B = Math.round((y1 / H - inset) * md.height);
  let out = await sharp(buf).extract({ left: L, top: T, width: R - L, height: B - T }).toBuffer();
  // 스캔에서 잘라낸 경우에만: 사진을 붙인 밝은 대지(臺紙)의 테두리를 한 번 더 다듬는다 (한 변 8% 넘게 깎이면 의심스러우니 건너뜀)
  try { const { data: tr, info } = await sharp(out).trim({ threshold: 32 }).toBuffer({ resolveWithObject: true }); const cw = R - L, ch = B - T; const cut = [-(info.trimOffsetLeft ?? 0) / cw, -(info.trimOffsetTop ?? 0) / ch, (cw + (info.trimOffsetLeft ?? 0) - info.width) / cw, (ch + (info.trimOffsetTop ?? 0) - info.height) / ch]; if (cut.every((c) => c >= 0 && c <= 0.08) && cut.some((c) => c > 0.003)) out = tr; } catch {}
  const m2 = await sharp(out).metadata();
  return { buf: out, crop: `${Math.round(100 * m2.width / md.width)}%×${Math.round(100 * m2.height / md.height)}%` };
}
const prev = existsSync('src/data/extra.json') ? JSON.parse(readFileSync('src/data/extra.json', 'utf8')) : [];
const out = only.length ? prev.filter((x) => !only.includes(x.key)) : []; let n = 0;
for (const s of sel) {
  if (only.length && !only.includes(s.key)) continue;
  const orig = `scripts/extra/orig/${s.key}.jpg`;
  let buf = existsSync(orig) ? readFileSync(orig) : null;
  if (!buf) { buf = await get(s.dl); if (!buf) { console.log('FAIL', s.key, s.dl); continue; } writeFileSync(orig, buf); await sleep(400); }
  let crop = null; if (s.cat === 'photo') ({ buf, crop } = await autoCrop(buf));
  const im = sharp(buf); const md = await im.metadata();
  await im.clone().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/jigsaw/${s.key}.webp`);
  await im.clone().resize({ width: 480, height: 480, fit: 'inside' }).webp({ quality: 80 }).toFile(`public/jigsaw/t-${s.key}.webp`);
  await im.clone().resize({ width: 400, height: 400, fit: 'cover', position: 'attention' }).jpeg({ quality: 82 }).toFile(`public/jigsaw/o-${s.key}.jpg`);
  const k = Math.min(1, 1600 / Math.max(md.width, md.height)); const w = Math.round(md.width * k), h = Math.round(md.height * k);
  out.push({ key: s.key, cat: s.cat, title: s.title, artist: s.artist, date: s.date, year: s.year, medium: s.medium, credit: s.credit, museum: s.museum, source: s.source, license: s.license, w, h });
  process.stdout.write(`${++n} ${s.key} ${md.width}x${md.height}${crop ? ' crop ' + crop : ''}\n`);
}
out.sort((a, b) => sel.findIndex((s) => s.key === a.key) - sel.findIndex((s) => s.key === b.key));
writeFileSync('src/data/extra.json', JSON.stringify(out, null, 1));
console.log('done', out.length);

// 파비콘·홈 화면 아이콘 생성 — `node scripts/icons.mjs` → public/ 에 favicon.svg·favicon-32.png·favicon.png(64)·apple-touch-icon.png(180)·icon-192.png·icon-512.png·icon-512-maskable.png
// 모양은 PieceLoader.astro 의 2×2 바람개비 조각을 그대로 읽어 쓴다(로더와 파비콘이 한 그림). 탭용(svg·32·64)은 맞춰진 판 — 작은 크기에서 또렷하게.
// 홈 화면용(180·192·512)은 왼쪽 위 조각이 살짝 들린 판 — 로더의 그 순간. apple-touch-icon 은 iOS 가 제 모양으로 깎으므로 모서리 없이 꽉 채우고,
// maskable 은 안드로이드 안전 영역(가운데 80% 원)에 판이 들어가게 작게 그린다. 이음매(흰 halo 8단위)는 32px 파비콘에서도 1px 가까이 보이게 로더보다 두껍다
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..'), OUT = join(ROOT, 'public');
const src = readFileSync(join(ROOT, 'src/components/PieceLoader.astro'), 'utf8');
const pieces = [...src.matchAll(/\['(M[^']+)', (-?1), (-?1)\]/g)].map((m) => [m[1], +m[2], +m[3]]);
if (pieces.length !== 4) throw new Error('PieceLoader.astro 에서 조각 4개를 못 읽었다');
const INK = '#14172a';
const svg = (lifted, { rx = 112, seam = 8, inset = 96, scale = 3.2 } = {}) => {
  const P = pieces.map(([d, dx, dy], i) => `<path d="${d}"${lifted && i === 0 ? ` transform="translate(${dx * 7} ${dy * 7}) rotate(-5 25 25)"` : ''}/>`);
  if (lifted) P.push(P.shift()); // 들린 조각은 맨 위에(문서 순서 = 쌓임 순서)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="${rx}" fill="#fff"/><g transform="translate(${inset} ${inset}) scale(${scale})" fill="${INK}" stroke="#fff" stroke-width="${seam}" stroke-linejoin="round" paint-order="stroke">${P.join('')}</g></svg>`;
};
const png = (s, size) => sharp(Buffer.from(s), { density: 72 * (size / 512) * 4 }).resize(size, size).png().toBuffer();
writeFileSync(join(OUT, 'favicon.svg'), svg(false));
const FILES = [
  ['favicon-32.png', 32, false, {}], ['favicon.png', 64, false, {}],
  ['apple-touch-icon.png', 180, true, { rx: 0 }], ['icon-192.png', 192, true, {}], ['icon-512.png', 512, true, {}],
  ['icon-512-maskable.png', 512, true, { rx: 0, inset: 111.5, scale: 2.89 }],
];
for (const [f, size, lifted, o] of FILES) writeFileSync(join(OUT, f), await png(svg(lifted, o), size));
console.log(`아이콘 ${FILES.length + 1}개 → public/`);

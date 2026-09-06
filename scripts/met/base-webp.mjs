// 기존 22점 jpg → webp(1600) + 썸네일 480 webp, 크기 기록 → src/data/base.json
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import sharp from 'sharp';
const keys = readFileSync('src/lib/jigsaw.ts', 'utf8').match(/key: '([a-z]+)'/g).map((m) => m.slice(6, -1));
const out = [];
for (const k of keys) {
  const src = `public/jigsaw/${k}.jpg`; if (!existsSync(src)) { console.log('no', k); continue; }
  const im = sharp(readFileSync(src)); const md = await im.metadata();
  await im.clone().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/jigsaw/${k}.webp`);
  await im.clone().resize({ width: 480, height: 480, fit: 'inside' }).webp({ quality: 80 }).toFile(`public/jigsaw/t-${k}.webp`);
  out.push({ key: k, w: md.width, h: md.height });
  unlinkSync(src); if (existsSync(`public/jigsaw/t-${k}.jpg`)) unlinkSync(`public/jigsaw/t-${k}.jpg`);
}
writeFileSync('src/data/base.json', JSON.stringify(out));
console.log('base', out.length);

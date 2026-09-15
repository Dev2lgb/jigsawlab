// 퍼즐 그림을 R2 버킷 jigsawlab-img 에 올린다 → https://img.jigsawlab.app/<파일>
//   node scripts/img-upload.mjs                   img/ 에 있는데 R2 에 없는 것만
//   node scripts/img-upload.mjs --only=key1,key2  그 작품의 원본·썸네일·OG 만(없는 것만)
//   node scripts/img-upload.mjs --only=key --force  이미 있어도 덮어쓴다 — 1년 immutable 캐시라 Cloudflare 에서 그 URL 을 퍼지해야 바뀐다
// 그림은 git 에 두지 않는다(저장소가 끝없이 불었다). 로컬 사본은 img/(gitignore), 원본 받기·변환은 scripts/{met,extra}/build.mjs 가 img/ 에 쓴다.
// wrangler 로그인만 있으면 된다. Cloudflare API 한도(5분에 1,200번)에 안 걸리게 초당 3건으로 올린다.
import { readdirSync } from 'node:fs';
import { spawn } from 'node:child_process';

const BUCKET = 'jigsawlab-img', BASE = 'https://img.jigsawlab.app', DIR = 'img';
const only = (process.argv.find((a) => a.startsWith('--only='))?.slice(7) || '').split(',').filter(Boolean);
const force = process.argv.includes('--force');
const TYPE = { webp: 'image/webp', jpg: 'image/jpeg' };
const keyOf = (f) => f.replace(/^[to]-/, '').replace(/\.(webp|jpg)$/, '');

const files = readdirSync(DIR).filter((f) => TYPE[f.split('.').pop()] && (!only.length || only.includes(keyOf(f)))).sort();
if (only.length) for (const k of only) if (!files.some((f) => keyOf(f) === k)) console.log('img/ 에 없음:', k);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// 캐시를 비켜 R2 에 직접 묻는다(쿼리가 다르면 캐시 키가 다르다)
const exists = async (f) => { for (let i = 0; i < 3; i++) { try { const r = await fetch(`${BASE}/${f}?probe=${Date.now()}`, { method: 'HEAD' }); if (r.status === 200) return true; if (r.status === 404) return false; } catch {} await sleep(1000); } return false; };
const put = (f) => new Promise((res) => {
  const p = spawn('npx', ['wrangler', 'r2', 'object', 'put', `${BUCKET}/${f}`, '--file', `${DIR}/${f}`, '--ct', TYPE[f.split('.').pop()], '--cc', 'public, max-age=31536000, immutable', '--remote'], { stdio: ['ignore', 'ignore', 'pipe'] });
  let err = ''; p.stderr.on('data', (d) => (err += d)); p.on('close', (code) => res(code === 0 ? null : err.trim().split('\n').pop()));
});

let todo = files;
if (!force) { const has = await Promise.all(files.map((f, i) => sleep(i * 5).then(() => exists(f)))); todo = files.filter((_, i) => !has[i]); }
console.log(`파일 ${files.length}개 중 올릴 것 ${todo.length}개`);

let done = 0; const failed = [];
const q = [...todo];
await Promise.all(Array.from({ length: 12 }, async () => {
  for (let f; (f = q.shift()); ) {
    const t0 = Date.now(); let e = await put(f);
    if (e) { await sleep(5000); e = await put(f); }
    if (e) failed.push(`${f}: ${e}`);
    if (++done % 50 === 0 || done === todo.length) console.log(`${done}/${todo.length}`);
    await sleep(Math.max(0, 3500 - (Date.now() - t0))); // 일꾼 12 × 3.5초에 한 건 = 초당 3.4건까지
  }
}));
if (failed.length) { console.log('실패', failed.length); for (const f of failed) console.log(' ', f); process.exit(1); }
console.log('완료');

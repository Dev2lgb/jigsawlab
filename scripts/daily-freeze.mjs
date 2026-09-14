// 오늘의 퍼즐 후보 얼리기 — works.ts 가 '오늘의 퍼즐 후보가 바뀌었습니다' 로 빌드를 세웠을 때 돌린다.
//   node scripts/daily-freeze.mjs [--rev <커밋>] [--until YYYY-MM-DD]
// <커밋>(기본 HEAD — 후보를 바꾸기 전 커밋)의 후보 목록을 src/data/daily-eras.json 에 until(기본 오늘 KST) 까지로 붙이고,
// 지금 작업 트리의 서명을 counts.ts 의 DAILY_SIG 에 적는다. until 은 배포하는 날로 — 그보다 이르면 그 사이 날짜의 그림이 바뀐다.
// 같은 until 이 이미 있으면(하루에 두 번 바꿈) 먼저 얼린 목록을 둔다: 그날 나간 그림은 그 목록에서 뽑혔다.
import { execSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : undefined; };
const rev = arg('--rev') ?? 'HEAD', until = arg('--until') ?? new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(until)) throw new Error(`--until 은 YYYY-MM-DD: ${until}`);
const ERAS = join(ROOT, 'src/data/daily-eras.json'), COUNTS = join(ROOT, 'src/data/counts.ts');
// works.ts 를 번들해 node 로 돌려 목록을 뽑는다. 서명 검사는 __DAILY_FREEZE 로 끈다(지금 트리는 서명이 어긋난 채라 import 만 해도 선다)
const esbuild = join(ROOT, 'node_modules/.bin/esbuild');
function pool(srcRoot) {
  const tmp = mkdtempSync(join(tmpdir(), 'daily-')); const entry = join(srcRoot, '__daily_entry.ts'), out = join(tmp, 'out.cjs');
  writeFileSync(entry, "import { DAILY_POOL } from './src/data/works';\nconsole.log(JSON.stringify(DAILY_POOL.map((w) => w.key)));\n");
  try { execSync(`${esbuild} ${entry} --bundle --platform=node --log-level=error --banner:js="globalThis.__DAILY_FREEZE=true" --outfile=${out}`); return JSON.parse(execSync(`node ${out}`, { maxBuffer: 1 << 24 }).toString()); }
  finally { rmSync(entry, { force: true }); rmSync(tmp, { recursive: true, force: true }); }
}
const old = mkdtempSync(join(tmpdir(), 'daily-rev-'));
let before; try { execSync(`git archive ${rev} src | tar -x -C ${old}`, { cwd: ROOT }); before = pool(old); } finally { rmSync(old, { recursive: true, force: true }); }
const now = pool(ROOT);
const hashStr = (s) => { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }; // lib/jigsaw.ts 와 같은 것
const sig = (keys) => `${keys.length}-${hashStr(keys.join(',')).toString(36)}`;
const eras = JSON.parse(readFileSync(ERAS, 'utf8'));
if (sig(before) === sig(now)) console.log(`${rev} 와 지금 후보가 같다(${sig(now)}) — 얼릴 것 없음`);
else if (eras.some((e) => e.until === until)) console.log(`${until} 까지의 목록이 이미 있다 — 그대로 둔다`);
else if (eras.length && eras[eras.length - 1].until > until) throw new Error(`마지막 시기(${eras[eras.length - 1].until})보다 이른 날짜로는 못 얼린다: ${until}`);
else { eras.push({ until, keys: before }); writeFileSync(ERAS, '[\n' + eras.map((e) => `  ${JSON.stringify(e)}`).join(',\n') + '\n]\n'); console.log(`얼림: ${until} 까지 ${before.length}점 (${rev})`); }
writeFileSync(COUNTS, readFileSync(COUNTS, 'utf8').replace(/export const DAILY_SIG = '[^']*';/, `export const DAILY_SIG = '${sig(now)}';`));
console.log(`DAILY_SIG = ${sig(now)} (지금 후보 ${now.length}점)`);

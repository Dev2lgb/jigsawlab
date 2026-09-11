// e2e 실행기 — 빌드 → 로컬 D1 에 테스트 회원 심기 → wrangler dev 띄우기 → 스위트 실행 → 정리. 스위트마다 서버를 새로 띄워 서로 안 섞이게 한다
//   pnpm test:e2e            전부 (api·landing 은 배포 빌드, board·room 은 훅이 살아 있는 개발 모드 빌드 — 두 번 빌드한다)
//   pnpm test:e2e api room   고른 것만
// 처음 한 번: npx playwright install chromium (브라우저), pnpm db:migrate:local (로컬 D1). 끝나면 dist 는 마지막 빌드(개발 모드일 수 있다) 그대로 — deploy 는 늘 다시 빌드하니 무방
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, unlinkSync, openSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { UID, NICK } from './lib.mjs';

const ROOT = new URL('../../', import.meta.url).pathname;
const PORT = Number(process.env.E2E_PORT ?? 8799), BASE = `http://localhost:${PORT}`;
const GROUPS = { prod: ['api', 'landing'], dev: ['board', 'room'] };
const ALL = [...GROUPS.prod, ...GROUPS.dev];
const want = process.argv.slice(2).filter((a) => a !== 'all'); const suites = want.length ? want : ALL;
for (const s of suites) if (!ALL.includes(s)) { console.error(`모르는 스위트: ${s} (${ALL.join(' | ')})`); process.exit(2); }

const sh = (cmd, args, opts = {}) => { const r = spawnSync(cmd, args, { cwd: ROOT, encoding: 'utf-8', ...opts }); if (r.status !== 0) { console.error(r.stdout, r.stderr); throw new Error(`${cmd} ${args.join(' ')} → ${r.status}`); } return r.stdout; };
const build = (mode) => { console.log(`\n== 빌드 (${mode})`); sh('npx', mode === 'dev' ? ['astro', 'build', '--mode', 'development'] : ['astro', 'build'], { env: { ...process.env, NODE_ENV: mode === 'dev' ? 'development' : 'production' } }); };

// .dev.vars — 회원 흐름(XP 전송)은 클라이언트가 /api/me 의 auth 를 보므로 비밀값 셋이 있어야 한다. 없으면 더미로 만들고 끝나면 지운다
const VARS = join(ROOT, '.dev.vars'); let madeVars = false;
if (!existsSync(VARS)) { writeFileSync(VARS, 'GOOGLE_CLIENT_ID=e2e-dummy\nGOOGLE_CLIENT_SECRET=e2e-dummy\nSESSION_SECRET=e2e-session-secret\n'); madeVars = true; }
const SECRET = (readFileSync(VARS, 'utf-8').match(/^SESSION_SECRET=(.*)$/m)?.[1] ?? '').trim() || 'dev-secret';

const RESET = `INSERT OR IGNORE INTO users (id, nick) VALUES ('${UID}', '${NICK}'); UPDATE users SET nick = '${NICK}' WHERE id = '${UID}'; ` +
  ['user_stats', 'user_done', 'user_week', 'user_cleared', 'user_badges', 'user_saves'].map((t) => `DELETE FROM ${t} WHERE user_id = '${UID}';`).join(' ');
const resetDb = () => sh('npx', ['wrangler', 'd1', 'execute', 'jigsawlab-db', '--local', '--command', RESET]);

let server = null; const LOG = join(tmpdir(), `jigsawlab-e2e-wrangler.log`);
async function startServer() {
  const fd = openSync(LOG, 'w');
  server = spawn('npx', ['wrangler', 'dev', '--port', String(PORT)], { cwd: ROOT, detached: true, stdio: ['ignore', fd, fd] });
  for (let i = 0; i < 60; i++) { await new Promise((r) => setTimeout(r, 1000)); try { const r = await fetch(`${BASE}/api/me`); if (r.ok) return; } catch {} }
  throw new Error(`wrangler dev 가 ${PORT} 에서 안 뜬다 — ${LOG}`);
}
function stopServer() { if (!server) return; try { process.kill(-server.pid, 'SIGTERM'); } catch {} server = null; }
const runSuite = (name) => new Promise((res) => { const c = spawn(process.execPath, [join(ROOT, 'tests/e2e', `${name}.mjs`)], { stdio: 'inherit', env: { ...process.env, E2E_BASE: BASE, SESSION_SECRET: SECRET } }); c.on('exit', (code) => res(code ?? 1)); });

const result = {};
try {
  for (const mode of ['prod', 'dev']) {
    const todo = GROUPS[mode].filter((s) => suites.includes(s)); if (!todo.length) continue;
    build(mode);
    for (const s of todo) {
      console.log(`\n== ${s}`); resetDb(); await startServer();
      try { result[s] = await runSuite(s); } finally { stopServer(); await new Promise((r) => setTimeout(r, 800)); }
    }
  }
} finally { stopServer(); if (madeVars) try { unlinkSync(VARS); } catch {} }
console.log('\n== 결과'); for (const [s, c] of Object.entries(result)) console.log(`${c === 0 ? 'PASS' : 'FAIL'} ${s}`);
process.exit(Object.values(result).some((c) => c !== 0) ? 1 : 0);

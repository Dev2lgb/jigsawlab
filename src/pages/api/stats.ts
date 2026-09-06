// 전체 통계: GET → { solved } / POST {action:'solved'} → 완성 1건 추가
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
export const prerender = false;
const json = (d: unknown, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
export const GET: APIRoute = async () => {
  const r = await env.DB.prepare("SELECT n FROM stats WHERE key = 'solved'").first<{ n: number }>().catch(() => null);
  return json({ solved: r?.n ?? 0 });
};
export const POST: APIRoute = async ({ request }) => {
  let b: any; try { b = await request.json(); } catch { return json({ error: 'bad json' }, 400); }
  if (b.action !== 'solved') return json({ error: 'action' }, 400);
  await env.DB.prepare("INSERT INTO stats (key, n) VALUES ('solved', 1) ON CONFLICT(key) DO UPDATE SET n = n + 1").run();
  const r = await env.DB.prepare("SELECT n FROM stats WHERE key = 'solved'").first<{ n: number }>();
  return json({ solved: r?.n ?? 0 });
};

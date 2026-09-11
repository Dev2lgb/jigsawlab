// 전체 통계: GET → { solved } / POST {action:'solved'} → 완성 1건 추가 (혼자 맞춘 판. 방은 DO 가 완성 순간에 센다)
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { json, readJson } from '../../lib/api';
export const prerender = false;
export const GET: APIRoute = async () => {
  const r = await env.DB.prepare("SELECT n FROM stats WHERE key = 'solved'").first<{ n: number }>().catch(() => null);
  return json({ solved: r?.n ?? 0 });
};
export const POST: APIRoute = async ({ request }) => {
  const b = await readJson(request); if (!b) return json({ error: 'bad json' }, 400);
  if (b.action !== 'solved') return json({ error: 'action' }, 400);
  const r = await env.DB.prepare("INSERT INTO stats (key, n) VALUES ('solved', 1) ON CONFLICT(key) DO UPDATE SET n = n + 1 RETURNING n").first<{ n: number }>();
  return json({ solved: r?.n ?? 0 });
};

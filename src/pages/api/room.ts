// 방 만들기: POST {key, n} → {id}. 이후 정보/웹소켓은 /api/room/<id> (worker.ts 가 DO 로 직결). id 는 여기서 만들고 DO 는 경로의 id 만 믿는다
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { readJson } from '../../lib/api';
export const prerender = false;
const ALPHA = 'abcdefghjkmnpqrstuvwxyz23456789';
export const POST: APIRoute = async ({ request }) => {
  const b = await readJson(request); if (!b) return new Response('{"error":"bad json"}', { status: 400 });
  const id = Array.from(crypto.getRandomValues(new Uint8Array(6)), (x) => ALPHA[x % ALPHA.length]).join('');
  const stub = env.ROOMS.get(env.ROOMS.idFromName(id));
  const r = await stub.fetch(new Request(`https://room/api/room/${id}/create`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(b) }));
  return new Response(await r.text(), { status: r.status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
};

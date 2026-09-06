// 방 만들기: POST {key, n, lang} → {id}. 이후 정보/웹소켓은 /api/room/<id> (worker.ts 가 DO 로 직결)
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
export const prerender = false;
const ALPHA = 'abcdefghjkmnpqrstuvwxyz23456789';
export const POST: APIRoute = async ({ request }) => {
  let b: any; try { b = await request.json(); } catch { return new Response('{"error":"bad json"}', { status: 400 }); }
  const id = Array.from(crypto.getRandomValues(new Uint8Array(6)), (x) => ALPHA[x % ALPHA.length]).join('');
  const stub = (env as any).ROOMS.get((env as any).ROOMS.idFromName(id));
  const r = await stub.fetch(new Request(`https://room/api/room/${id}/create`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...b, id }) }));
  return new Response(await r.text(), { status: r.status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
};

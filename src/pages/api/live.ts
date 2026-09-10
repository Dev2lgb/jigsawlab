// 상설 공개 판 상태 — 홈·/together/ 가 "지금 어떤 그림을 몇 %까지" 를 보여 줄 때 쓴다.
// 방이 아직 없으면 DO 가 첫 회차를 깔면서 답한다(누가 처음 보는지와 무관하게 판은 늘 있다).
// 홈에 사람이 몰릴 때 방문마다 DO 를 깨우지 않도록 15초 엣지 캐시를 씌운다 — 진행률이 그만큼 늦게 보이는 건 상관없다
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { LIVE_ID } from '../../lib/jigsaw';
import { WORK_BY_KEY } from '../../data/works';
export const prerender = false;
const KEY = 'https://jigsawlab.app/__live';
export const GET: APIRoute = async ({ locals }) => {
  const cache = (caches as any).default as Cache | undefined;
  const ck = new Request(KEY);
  const hit = await cache?.match(ck);
  if (hit) return hit;
  const stub = (env as any).ROOMS.get((env as any).ROOMS.idFromName(LIVE_ID));
  const r = await stub.fetch(new Request(`https://room/api/room/${LIVE_ID}`));
  const d: any = await r.json(); // stub.fetch 는 타입이 없어 json<any>() 를 못 쓴다
  // 제목은 여기서 얹는다 — 랜딩이 작품 목록(3개 국어 소개까지 들어 있다)을 통째로 내려받지 않게. 세 언어를 다 담아 캐시는 하나로
  const w = d && d.key ? WORK_BY_KEY[d.key] : null;
  if (w) d.work = { key: w.key, title: w.title, artist: w.artist, year: w.year };
  const res = new Response(JSON.stringify(d), { status: r.status, headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=15' } });
  if (cache && r.status === 200) {
    const put = cache.put(ck, res.clone());
    const cf = (locals as any).cfContext; // Astro v6: locals.runtime.ctx 는 없어졌다
    if (typeof cf?.waitUntil === 'function') cf.waitUntil(put); else await put;
  }
  return res;
};

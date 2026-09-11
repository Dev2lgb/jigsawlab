// 상설 공개 판 상태 — 홈·/together/ 가 "지금 어떤 그림을 몇 %까지" 를 보여 줄 때 쓴다.
// 방이 아직 없으면 DO 가 첫 회차를 깔면서 답한다(누가 처음 보는지와 무관하게 판은 늘 있다).
// 홈에 사람이 몰릴 때 방문마다 DO 를 깨우지 않도록 15초 엣지 캐시를 씌운다 — 진행률이 그만큼 늦게 보이는 건 상관없다.
// 단 그 15초는 워커 캐시에만 걸고, 브라우저에는 반드시 no-store 로 내보낸다:
// 캐시 가능한 헤더를 내보내면 Cloudflare 가 존의 Browser Cache TTL(기본 4시간)로 바꿔 버려서,
// 판을 맞추다 돌아와도 강제 새로고침 전까지 옛 진행률이 보인다
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { LIVE_ID } from '../../lib/jigsaw';
import { WORK_BY_KEY } from '../../data/works';
export const prerender = false;
const KEY = 'https://jigsawlab.app/__live';
const JSON_HDR = { 'content-type': 'application/json' };
/** 브라우저로 나가는 응답 — 진행률이 늘 최신이어야 하므로 절대 캐시하지 않는다 */
const fresh = (body: BodyInit | null, status: number) => new Response(body, { status, headers: { ...JSON_HDR, 'cache-control': 'no-store' } });
export const GET: APIRoute = async ({ locals }) => {
  const cache = (caches as unknown as { default?: Cache }).default; // DOM 의 CacheStorage 가 workers 타입을 가려 default 가 안 보인다
  const ck = new Request(KEY);
  const hit = await cache?.match(ck);
  if (hit) return fresh(hit.body, hit.status); // 캐시본은 max-age 를 달고 있으니 몸통만 꺼내 다시 싼다
  const stub = env.ROOMS.get(env.ROOMS.idFromName(LIVE_ID));
  const r = await stub.fetch(new Request(`https://room/api/room/${LIVE_ID}`));
  const d = await r.json<{ key?: string; work?: unknown } & Record<string, unknown>>();
  // 제목은 여기서 얹는다 — 랜딩이 작품 목록을 통째로 내려받지 않게. 다섯 언어를 다 담아 캐시는 하나로
  const w = d && d.key ? WORK_BY_KEY[d.key] : null;
  if (w) d.work = { key: w.key, title: w.title, artist: w.artist, year: w.year };
  const body = JSON.stringify(d);
  if (cache && r.status === 200) {
    // 워커 캐시에 넣는 사본만 max-age 를 갖는다. 이 헤더는 브라우저까지 안 간다
    const put = cache.put(ck, new Response(body, { status: r.status, headers: { ...JSON_HDR, 'cache-control': 'public, max-age=15' } }));
    const cf = locals.cfContext; // Astro v6: locals.runtime.ctx 는 없어졌다
    if (typeof cf?.waitUntil === 'function') cf.waitUntil(put); else await put;
  }
  return fresh(body, r.status);
};

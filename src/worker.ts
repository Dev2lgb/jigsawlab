// Worker 진입점 — Astro 핸들러 + Durable Object(Room) 내보내기. 방 웹소켓은 Astro 를 거치지 않고 바로 DO 로
import { handle } from '@astrojs/cloudflare/handler';
export { Room } from './lib/room';
export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    const url = new URL(request.url); const m = url.pathname.match(/^\/api\/room\/([a-z0-9]{4,12})(\/ws|\/create)?$/);
    if (m) { const stub = env.ROOMS.get(env.ROOMS.idFromName(m[1])); return stub.fetch(request); }
    return handle(request, env, ctx);
  },
};

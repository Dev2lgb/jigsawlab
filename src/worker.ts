// Worker 진입점 — Astro 핸들러 + Durable Object(Room) 내보내기. 방 웹소켓은 Astro 를 거치지 않고 바로 DO 로
import { handle } from '@astrojs/cloudflare/handler';
export { Room } from './lib/room';
export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    const url = new URL(request.url);
    // www 는 apex 로 301 — 같은 문서가 두 호스트로 잡히지 않게 (canonical 만으로는 신호가 약하다)
    if (url.hostname.startsWith('www.')) { url.hostname = url.hostname.slice(4); return Response.redirect(url.toString(), 301); }
    // /create 는 열지 않는다 — 방은 api/room.ts 가 id 를 만들어 stub 으로 직접 시킨다. 열어 두면 아무 id 로나 방을 만들 수 있다
    const m = url.pathname.match(/^\/api\/room\/([a-z0-9]{4,12})(\/ws)?$/);
    if (m) { const stub = env.ROOMS.get(env.ROOMS.idFromName(m[1])); return stub.fetch(request); }
    return handle(request, env, ctx);
  },
};

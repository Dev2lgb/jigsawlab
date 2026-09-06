// 구글 로그인 (선택 사항). /api/auth/login?next=/play/ → 구글 → /api/auth/callback → 세션 쿠키 → next
// scope 는 openid 하나만: 구글에서 받는 건 sub(고유 ID)뿐이고 그것도 HMAC 해서 저장. 이메일·이름·사진은 요청하지 않음
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { configured, userIdFromSub, sessionCookie, clearCookie, readCookie, hmac, sessionUid, json } from '../../../lib/auth';
export const prerender = false;
const E = () => env as unknown as { DB: D1Database; GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string };
const safeNext = (n: string | null) => (n && /^\/[^/\\]/.test(n) ? n : '/');
const redirectTo = (url: string, cookie?: string) => new Response(null, { status: 302, headers: { location: url, ...(cookie ? { 'set-cookie': cookie } : {}) } });

export const GET: APIRoute = async ({ request, params }) => {
  // 구글 콘솔에 등록한 redirect URI 와 정확히 같아야 하므로 실서비스는 apex 도메인으로 고정 (www 로 들어와도 동일)
  const url = new URL(request.url); const local = /^(localhost|127\.0\.0\.1)$/.test(url.hostname); const redirectUri = `${local ? url.origin : 'https://jigsawlab.app'}/api/auth/callback`;
  if (!configured()) return json({ error: 'auth not configured' }, 503);
  if (params.action === 'login') {
    const next = safeNext(url.searchParams.get('next')); const state = crypto.randomUUID(); const sig = (await hmac(`st:${state}`)).slice(0, 16);
    const g = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    Object.entries({ client_id: E().GOOGLE_CLIENT_ID, redirect_uri: redirectUri, response_type: 'code', scope: 'openid', state, prompt: 'select_account' }).forEach(([k, v]) => g.searchParams.set(k, v));
    return redirectTo(g.toString(), `jl_st=${state}.${sig}.${encodeURIComponent(next)}; Path=/api/auth; Max-Age=600; HttpOnly; Secure; SameSite=Lax`);
  }
  if (params.action === 'callback') {
    const st = readCookie(request, 'jl_st'); const [state, sig, nextEnc] = (st ?? '').split('.'); const next = safeNext(decodeURIComponent(nextEnc ?? ''));
    const clearSt = 'jl_st=; Path=/api/auth; Max-Age=0; HttpOnly; Secure; SameSite=Lax';
    if (!state || url.searchParams.get('state') !== state || (await hmac(`st:${state}`)).slice(0, 16) !== sig) return redirectTo(`${next}#login=fail`, clearSt);
    const code = url.searchParams.get('code'); if (!code) return redirectTo(`${next}#login=fail`, clearSt);
    const tr = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ code, client_id: E().GOOGLE_CLIENT_ID, client_secret: E().GOOGLE_CLIENT_SECRET, redirect_uri: redirectUri, grant_type: 'authorization_code' }) });
    const tok: any = await tr.json().catch(() => ({})); const idt = String(tok.id_token ?? '');
    // id_token 은 구글 토큰 엔드포인트에서 TLS 로 직접 받았으므로 페이로드의 iss/aud/exp 만 확인
    let sub = ''; try { const p = JSON.parse(atob(idt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))); if ((p.iss === 'https://accounts.google.com' || p.iss === 'accounts.google.com') && p.aud === E().GOOGLE_CLIENT_ID && p.exp > Date.now() / 1000) sub = String(p.sub); } catch {}
    if (!sub) return redirectTo(`${next}#login=fail`, clearSt);
    const uid = await userIdFromSub(sub);
    const prev = await E().DB.prepare('SELECT nick FROM users WHERE id = ?').bind(uid).first<{ nick: string }>();
    await E().DB.prepare('INSERT INTO users (id) VALUES (?) ON CONFLICT(id) DO UPDATE SET seen_at = unixepoch()').bind(uid).run();
    const h = new Headers({ location: `${next}#login=${prev?.nick ? 'ok' : 'new'}` }); h.append('set-cookie', await sessionCookie(uid)); h.append('set-cookie', clearSt);
    return new Response(null, { status: 302, headers: h });
  }
  return json({ error: 'action' }, 404);
};

export const POST: APIRoute = async ({ request, params }) => {
  if (params.action === 'logout') return json({ ok: true }, 200, { 'set-cookie': clearCookie() });
  if (params.action === 'delete') {
    const uid = await sessionUid(request); if (!uid) return json({ error: 'auth' }, 401);
    await E().DB.batch([E().DB.prepare('DELETE FROM user_saves WHERE user_id = ?').bind(uid), E().DB.prepare('DELETE FROM user_done WHERE user_id = ?').bind(uid), E().DB.prepare('DELETE FROM users WHERE id = ?').bind(uid)]);
    return json({ ok: true }, 200, { 'set-cookie': clearCookie() });
  }
  return json({ error: 'action' }, 404);
};

// 서버 인증 유틸 — 구글 OIDC 로그인(scope: openid 만), 서명 쿠키 세션. 저장하는 개인정보는 가명 ID(HMAC(sub))와 닉네임뿐
import { env } from 'cloudflare:workers';
import { clipNick } from './nick';
import { levelOf } from './level';
const enc = new TextEncoder();
const hex = (b: ArrayBuffer) => Array.from(new Uint8Array(b), (x) => x.toString(16).padStart(2, '0')).join('');
export async function hmac(msg: string, secret = env.SESSION_SECRET ?? ''): Promise<string> {
  const k = await crypto.subtle.importKey('raw', enc.encode(secret || 'dev-secret'), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', k, enc.encode(msg)));
}
export const configured = () => !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET && env.SESSION_SECRET);
export const userIdFromSub = async (sub: string) => (await hmac(`uid:${sub}`)).slice(0, 32);

const COOKIE = 'jl_s', DAYS = 180;
export async function sessionCookie(uid: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + DAYS * 86400; const sig = await hmac(`s:${uid}.${exp}`);
  return `${COOKIE}=${uid}.${exp}.${sig}; Path=/; Max-Age=${DAYS * 86400}; HttpOnly; Secure; SameSite=Lax`;
}
export const clearCookie = () => `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
export const readCookie = (req: Request, name: string) => { const m = (req.headers.get('cookie') ?? '').match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`)); return m ? decodeURIComponent(m[1]) : null; };
/** 쿠키 → 유저 ID (서명·만료 검증만, DB 조회 없음) */
export async function sessionUid(req: Request): Promise<string | null> {
  const v = readCookie(req, COOKIE); if (!v) return null; const [uid, exp, sig] = v.split('.'); if (!uid || !exp || !sig) return null;
  if (Number(exp) < Date.now() / 1000) return null; if ((await hmac(`s:${uid}.${exp}`)) !== sig) return null; return uid;
}
export interface User { id: string; nick: string; level: number }
/** 쿠키 → 유저 (DB 조회, 없으면 null). 레벨은 네임태그(nametag.ts) 몫 — 같은 문장에 user_stats 를 JOIN 하므로 D1 읽기가 늘지 않고, 행이 없으면(레벨 기능 전 회원) 1 */
export async function getUser(req: Request): Promise<User | null> {
  const uid = await sessionUid(req); if (!uid) return null;
  const r = await env.DB.prepare('SELECT u.id, u.nick, COALESCE(s.xp, 0) AS xp FROM users u LEFT JOIN user_stats s ON s.user_id = u.id WHERE u.id = ?').bind(uid).first<{ id: string; nick: string; xp: number }>().catch(() => null);
  return r ? { id: r.id, nick: r.nick, level: levelOf(r.xp) } : null;
}
export const cleanNick = (n: unknown) => clipNick(String(n ?? ''));

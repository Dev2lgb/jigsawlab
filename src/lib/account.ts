// 클라이언트 계정 유틸 — 로그인 상태 조회(페이지당 1회, sessionStorage 5분 캐시), 닉네임, 업적·하던 퍼즐 동기화
import { getDone, setNick } from './store';
import type { SaveData } from './db';
export interface Me { id: string; nick: string }
const ss = { get: (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } }, set: (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch {} }, del: (k: string) => { try { sessionStorage.removeItem(k); } catch {} } };
let mep: Promise<Me | null> | null = null;
/** 로그인한 사용자. 안 했으면 null. 로그인 직후(#login=ok|new)에는 캐시를 무시 */
export function me(force = false): Promise<Me | null> {
  if (!force && mep) return mep;
  const fromHash = /#login=/.test(location.hash);
  if (!force && !fromHash) { const c = ss.get('auth:me'); if (c) { try { const o = JSON.parse(c); if (o.t > Date.now() - 300e3) return (mep = Promise.resolve(o.u)); } catch {} } }
  return (mep = fetch('/api/me', { credentials: 'same-origin' }).then((r) => r.json()).then((d: any) => { const u: Me | null = d.user ?? null; ss.set('auth:me', JSON.stringify({ t: Date.now(), u })); ss.set('auth:on', d.auth ? '1' : '0'); if (u?.nick) setNick(u.nick); return u; }).catch(() => null));
}
export const authAvailable = () => ss.get('auth:on') !== '0';
export const loginUrl = (next = location.pathname + location.search) => `/api/auth/login?next=${encodeURIComponent(next)}`;
export async function logout() { await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {}); ss.del('auth:me'); mep = null; }
export async function deleteAccount() { const r = await fetch('/api/auth/delete', { method: 'POST', credentials: 'same-origin' }); ss.del('auth:me'); mep = null; return r.ok; }
export async function setNickRemote(nick: string): Promise<boolean> {
  const r = await fetch('/api/me', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ nick }) }).catch(() => null);
  if (!r?.ok) return false; const d: any = await r.json(); ss.set('auth:me', JSON.stringify({ t: Date.now(), u: d.user })); mep = Promise.resolve(d.user); setNick(nick); return true;
}
// keepalive 는 본문 64KB 제한이 있어 작은 요청에만 (큰 판 저장은 일반 요청)
const post = (body: unknown) => { const s = JSON.stringify(body); return fetch('/api/sync', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: s, keepalive: s.length < 60_000 }).catch(() => null); };
/** 로그인 상태면 완성 기록 1건 올림 */
export async function syncDone(entry: unknown) { if (!(await me())) return; await post({ action: 'done', entry }); }
/** 로그인 직후 한 번: 이 기기의 완성 기록을 서버에 합침 */
export async function mergeLocalDone() { if (ss.get('auth:merged')) return; const l = getDone(); if (l.length) await post({ action: 'merge', entries: l }); ss.set('auth:merged', '1'); }
export type SaveMeta = Pick<SaveData, 'id' | 'kind' | 'key' | 'name' | 'day' | 'total' | 'done' | 'elapsed' | 'savedAt' | 'thumb'>;
export async function fetchSync(): Promise<{ done: any[]; saves: SaveMeta[] } | null> { if (!(await me())) return null; const r = await fetch('/api/sync', { credentials: 'same-origin' }).catch(() => null); if (!r?.ok) return null; return r.json(); }
export async function fetchSave(id: string): Promise<SaveData | null> { const r = await fetch(`/api/sync?save=${encodeURIComponent(id)}`, { credentials: 'same-origin' }).catch(() => null); if (!r?.ok) return null; return r.json(); }
/** 하던 퍼즐 업로드. 주기 저장은 안 하고, 저장 버튼·나가기·화면 이탈 때만 (무료 티어 요청 수 절약). 기기 안 IndexedDB 저장은 별도로 계속 됨 */
export async function syncSave(data: SaveData): Promise<boolean> {
  if (data.kind === 'photo' || !(await me())) return false; const r = await post({ action: 'save', data }); return !!r?.ok;
}
export async function syncDelSave(id: string) { if (!(await me())) return; await post({ action: 'delsave', id }); }

// 클라이언트 계정 유틸 — 로그인 상태 조회(페이지당 1회, sessionStorage 5분 캐시), 닉네임, 업적·하던 퍼즐 동기화
import { getDone, setNick } from './store';
import type { SaveData } from './db';
import type { Stats } from './level';
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
/** 서버가 매긴 XP·레벨·새 업적 (회원만) */
export interface Award { xp: number; gained: number; level: number; prevLevel: number; levelUp: boolean; badges: string[]; stats: Stats; capped: boolean; rate?: number }
// 어디까지 합쳤는지(at)를 회원별로 localStorage 에 둔다 — 탭마다(sessionStorage) 기록 200건을 통째로 다시 보내면
// 전부 무시되더라도 요청과 정리 쿼리는 매번 돌았다. 회원별이라 같은 기기의 다른 계정은 제 몫을 따로 합친다
const ls = { get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch {} } };
const merged = (uid: string) => Number(ls.get(`auth:merged:${uid}`) ?? 0) || 0;
const markMerged = (uid: string, at: number) => { if (at > merged(uid)) ls.set(`auth:merged:${uid}`, String(at)); };
const awardOf = async (r: Response | null): Promise<Award | null> => { if (!r?.ok) return null; try { const d: any = await r.json(); return d?.award ?? null; } catch { return null; } };
/** 로그인 상태면 완성 기록 1건 올림 → 받은 XP·레벨·새 업적 */
export async function syncDone(entry: unknown): Promise<Award | null> {
  const u = await me(); if (!u) return null; const r = await post({ action: 'done', entry }); const at = Number((entry as { at?: number })?.at) || 0;
  // 이 기록이 안 합친 것 중 유일하면 표시를 올린다 — 아니면 다음 합치기가 옛 것과 같이 보낸다 (이미 올라간 건 서버가 무시)
  if (r?.ok && at && getDone().every((e) => !e.member || e.at <= merged(u.id) || e.at === at)) markMerged(u.id, at);
  return awardOf(r);
}
/** 모두의 퍼즐 한 회차에 내가 보탠 조각 (완성 기록 목록에는 안 남고 XP·업적에만 반영) */
export async function syncLive(key: string, n: number, mine: number, paid = 0): Promise<Award | null> { if (mine <= 0 || !(await me())) return null; return awardOf(await post({ action: 'live', key, n, mine, paid })); }
/** 맞추는 도중 제자리에 놓은 조각을 모아서 올림 — 완성까지 안 가도 XP 가 붙는다.
 *  조각마다 보내면 무료 티어 요청·D1 쓰기가 남아나지 않아 Jigsaw.astro 가 모았다가 부른다 */
export async function syncPieces(kind: string, key: string, n: number, placed: number): Promise<Award | null> {
  if (placed <= 0 || !(await me())) return null;
  return awardOf(await post({ action: 'pieces', kind, key, n, placed }));
}
/** 이 기기의 완성 기록 중 로그인한 채 맞췄는데(member) 아직 서버에 못 올린 것을 올림 — 완성 때 전송이 실패한 판의 재시도.
 *  비회원으로 맞춘 판은 로그인해도 안 보낸다: 로그인 전 기록은 서버가 검증할 길이 없고, '로그인하면 다음 판부터' 가 규칙으로 단순하다.
 *  페이지마다 부르지만 보낼 게 없으면 요청 자체를 안 한다 */
export async function mergeLocalDone(): Promise<Award | null> {
  const u = await me(); if (!u) return null;
  const l = getDone().filter((e) => e.member && e.at > merged(u.id)); if (!l.length) return null;
  const r = await post({ action: 'merge', entries: l }); if (!r?.ok) return null;
  markMerged(u.id, Math.max(...l.map((e) => e.at))); return awardOf(r);
}

export interface LevelInfo { user: { id: string; nick: string } | null; xp: number; level: number; stats: Stats; badges: { code: string; at: number }[]; week: { key: string; xp: number; rank: number | null }; rank: number | null }
export interface RankRow { r: number; nick: string; xp: number; level: number; badges: number }
export interface RankInfo { tab: 'week' | 'all'; week: string; top: RankRow[]; me: { nick: string; xp: number; level: number; rank: number | null; listed: boolean } | null }
/** 내 레벨·업적. 로그인 안 했으면 null */
export async function fetchLevel(): Promise<LevelInfo | null> { const r = await fetch('/api/level', { credentials: 'same-origin' }).catch(() => null); if (!r?.ok) return null; const d: any = await r.json().catch(() => null); return d?.user ? (d as LevelInfo) : null; }
/** 랭킹. 로그인 없이도 볼 수 있다 */
export async function fetchRank(tab: 'week' | 'all'): Promise<RankInfo | null> { const r = await fetch(`/api/rank?tab=${tab}`, { credentials: 'same-origin' }).catch(() => null); if (!r?.ok) return null; return r.json().catch(() => null) as Promise<RankInfo | null>; }
export type SaveMeta = Pick<SaveData, 'id' | 'kind' | 'key' | 'name' | 'day' | 'total' | 'done' | 'elapsed' | 'savedAt' | 'thumb'>;
export async function fetchSync(): Promise<{ done: any[]; saves: SaveMeta[] } | null> { if (!(await me())) return null; const r = await fetch('/api/sync', { credentials: 'same-origin' }).catch(() => null); if (!r?.ok) return null; return r.json(); }
export async function fetchSave(id: string): Promise<SaveData | null> { const r = await fetch(`/api/sync?save=${encodeURIComponent(id)}`, { credentials: 'same-origin' }).catch(() => null); if (!r?.ok) return null; return r.json(); }
/** 하던 퍼즐 업로드. 주기 저장은 안 하고, 저장 버튼·나가기·화면 이탈 때만 (무료 티어 요청 수 절약). 기기 안 IndexedDB 저장은 별도로 계속 됨 */
export async function syncSave(data: SaveData): Promise<boolean> {
  if (data.kind === 'photo' || !(await me())) return false; const r = await post({ action: 'save', data }); return !!r?.ok;
}
export async function syncDelSave(id: string) { if (!(await me())) return; await post({ action: 'delsave', id }); }

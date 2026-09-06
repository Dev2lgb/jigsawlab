/** 브라우저 저장(localStorage) + 오늘의 퍼즐 API 클라이언트 */
export type Order = 'asc' | 'desc';
const ls = { get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch {} } };

export const getBest = (key: string): number | null => { const v = ls.get(`best:${key}`); return v === null ? null : Number(v); };
/** 개인 최고기록 갱신되면 true */
export function saveBest(key: string, score: number, order: Order): boolean {
  const prev = getBest(key); const better = prev === null || (order === 'asc' ? score < prev : score > prev);
  if (better) ls.set(`best:${key}`, String(score)); return better;
}
export const getNick = () => ls.get('nick') ?? '';
export const setNick = (n: string) => ls.set('nick', n.trim().slice(0, 12));
/** 기기 ID (랭킹 기기당 1건용) */
export const deviceId = () => { let id = ls.get('dev:id'); if (!id) { id = Array.from(crypto.getRandomValues(new Uint8Array(12)), (b) => b.toString(36)).join('').slice(0, 20); ls.set('dev:id', id); } return id; };
/** 오늘 완료 처리 → 연속 일수 */
export function bumpStreak(day: string): number {
  let s: { last: string; n: number } = { last: '', n: 0 }; try { s = JSON.parse(ls.get('daily:streak') ?? '') || s; } catch {}
  if (s.last === day) return s.n;
  const y = new Date(day + 'T00:00:00'); y.setDate(y.getDate() - 1); const yd = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}`;
  s = { last: day, n: s.last === yd ? s.n + 1 : 1 }; ls.set('daily:streak', JSON.stringify(s)); return s.n;
}
export const getStreak = () => { try { return (JSON.parse(ls.get('daily:streak') ?? '{}') as { n?: number }).n ?? 0; } catch { return 0; } };

export const api = (body: unknown) => fetch('/api/daily', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }).then(async (r) => { const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.error ?? 'error'); return d; });

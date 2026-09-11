// 서버 라우트 공통 도우미. API 응답에는 캐시 가능한 cache-control 을 달지 않는다(CLAUDE.md 의 캐시 헤더 주의) — json() 이 늘 no-store 를 단다
import { kstDay, weekOf } from './level';
/** JSON 응답 (늘 no-store) */
export const json = (d: unknown, s = 200, headers: Record<string, string> = {}) => new Response(JSON.stringify(d), { status: s, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...headers } });
/** 요청 몸통 JSON. 못 읽으면 null — 라우트는 400 으로 답한다 */
export const readJson = async <T = any>(req: Request): Promise<T | null> => { try { return await req.json<T>(); } catch { return null; } };
/** 이번 주(월요일 시작, KST) — 주간 랭킹 키 */
export const thisWeek = () => weekOf(kstDay(Date.now()));

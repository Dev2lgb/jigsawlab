import { WORK_BY_KEY } from '../data/works';
/** 공유 카드 쿼리(k·n·t·m·d) 검사. 잘못됐으면 null → 페이지가 홈으로 리다이렉트 */
export function parseShare(url: URL) {
  const q = url.searchParams, k = q.get('k') ?? '', n = Number(q.get('n')), t = Number(q.get('t')), m = Number(q.get('m')) || 0, daily = q.get('d') === '1';
  if (!WORK_BY_KEY[k] || !(n > 0) || !(t > 0)) return null;
  return { k, n, t, m, daily };
}

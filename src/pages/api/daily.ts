// 오늘의 퍼즐: GET → 오늘 그림·조각 수
import type { APIRoute } from 'astro';
import { todayKST, dailyPick, DAILY_PIECES } from '../../lib/jigsaw';
import { DAILY_POOL } from '../../data/works';
export const prerender = false;

export const GET: APIRoute = async () => {
  const day = todayKST(), pick = dailyPick(day, DAILY_POOL);
  return new Response(JSON.stringify({ day, key: pick.painting.key, pieces: DAILY_PIECES }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
};

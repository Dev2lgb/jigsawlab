// 오늘의 퍼즐: GET → 오늘 그림·조각 수 (사이트 안에서는 안 쓴다 — 랜딩은 lib/daily.ts 의 창, 판은 dailyPick 직접. 외부용으로 남겨 둔다)
import type { APIRoute } from 'astro';
import { todayKST, dailyPick, DAILY_PIECES } from '../../lib/jigsaw';
import { DAILY_POOL } from '../../data/works';
import { json } from '../../lib/api';
export const prerender = false;

export const GET: APIRoute = async () => {
  const day = todayKST(), pick = dailyPick(day, DAILY_POOL);
  return json({ day, key: pick.painting.key, pieces: DAILY_PIECES });
};

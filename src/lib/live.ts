// 모두의 퍼즐 진행 상태 — /api/live(DO 정보 + 그림 제목 3개 국어)를 화면이 쓰기 좋게. 홈 띠와 /together/ 카드가 같이 쓴다. 못 받으면 null
export interface LiveInfo { key: string; total: number; locked: number; left: number; pct: number; players: number; round: number; work: { key: string; title: string[]; artist: string[]; year: string } | null }
export async function fetchLive(): Promise<LiveInfo | null> {
  try {
    const r = await fetch('/api/live', { cache: 'no-store', headers: { accept: 'application/json' } }); if (!r.ok) return null;
    const d = await r.json<any>(); if (!d || !d.total) return null;
    return { key: d.key, total: d.total, locked: d.locked, left: d.total - d.locked, pct: Math.min(100, Math.floor((d.locked / d.total) * 100)), players: d.players ?? 0, round: (d.round ?? 0) + 1, work: d.work ?? null };
  } catch { return null; }
}

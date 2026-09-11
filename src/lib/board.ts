// 판 상태 셈 — 순수 함수. 판 화면(Jigsaw.astro)이 쓰고, DOM 이 없어도 돌아가므로 따로 검증할 수 있다

/** 서버 판을 다시 받았을 때(재접속·재동기화·다음 회차)의 트레이 순서.
 *  남아 있던 순서(prevTray)는 지키고 — 안 그러면 판이 통째로 뒤집힌다 — 새로 트레이에 있어야 할 조각은 섞어서 뒤에 붙인다 */
export function trayOrderAfterSync(total: number, locked: number[], groups: number[][], prevTray: number[]): number[] {
  const used = new Set<number>(locked); for (const idx of groups) for (const i of idx) used.add(i);
  const keep = prevTray.filter((i) => !used.has(i)); const seen = new Set(keep);
  const rest: number[] = []; for (let i = 0; i < total; i++) if (!used.has(i) && !seen.has(i)) rest.push(i);
  for (let i = rest.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [rest[i], rest[j]] = [rest[j], rest[i]]; }
  return keep.concat(rest);
}

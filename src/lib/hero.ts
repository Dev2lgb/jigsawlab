// 홈·상세용 "조각 몇 개 빠진 그림" 렌더 — 실제 시드 컷으로 자르고 n개를 살짝 빼서 그림자와 함께 올려둔다
import { gridFor, makeCut, renderPiece, piecePath, seeded } from './jigsaw';
const loadImg = (u: string) => new Promise<HTMLImageElement>((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = u; });
export async function drawPopped(cv: HTMLCanvasElement, src: string, seed: number, pieces: number, popped = 4, hole = '#e7e9ef') {
  let im: HTMLImageElement; try { im = await loadImg(src); } catch { return; }
  const W = 720, H = Math.round(W * im.naturalHeight / im.naturalWidth), d = Math.min(2, devicePixelRatio || 1);
  cv.width = W * d; cv.height = H * d; const c = cv.getContext('2d')!; c.scale(d, d);
  const g = gridFor(pieces, W / H), cut = makeCut(W, H, g.cols, g.rows, seeded(seed));
  c.drawImage(im, 0, 0, W, H);
  const rand = seeded(seed ^ 0x9e3779b9), picked: [number, number][] = [];
  let guard = 0; while (picked.length < popped && guard++ < 200) { const r = 1 + Math.floor(rand() * (g.rows - 2)), col = 1 + Math.floor(rand() * (g.cols - 2)); if (!picked.some(([a, b]) => Math.abs(a - r) < 2 && Math.abs(b - col) < 2)) picked.push([r, col]); }
  for (const [r, col] of picked) { const p = piecePath(cut, r, col); c.save(); c.clip(p); c.fillStyle = hole; c.fillRect(0, 0, W, H); c.restore(); c.save(); c.lineWidth = 1; c.strokeStyle = 'rgba(20,23,42,.18)'; c.stroke(p); c.restore(); }
  for (const [r, col] of picked) {
    const b = renderPiece(cut, r, col, im, d), cx = col * cut.pw + cut.pw / 2, cy = r * cut.ph + cut.ph / 2;
    const dx = (rand() - 0.5) * cut.pw * 0.9, dy = (rand() - 0.5) * cut.ph * 0.9 + cut.ph * 0.35, rot = (rand() - 0.5) * 0.5;
    c.save(); c.translate(cx + dx, cy + dy); c.rotate(rot); c.shadowColor = 'rgba(20,23,42,.45)'; c.shadowBlur = 18; c.shadowOffsetY = 8; c.drawImage(b.canvas, -b.w / 2, -b.h / 2, b.w, b.h); c.restore();
  }
}

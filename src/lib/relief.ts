// 완성본을 실물 퍼즐처럼 새긴다 — 완성 보기 페이지(/done/)와 결과 화면이 쓴다.
// 조각은 판 위 조각과 같은 그리기(jigsaw.ts 의 paintPiece — 가는 단면·좁은 모서리 빛과 그늘·조각마다 옅게 다른 밝기)로 오려 넣고,
// 그 위에 조각 사이의 이음매를 가는 어두운 실선으로 긋는다 — 맞춘 퍼즐을 내려다보면 조각 사이 틈으로 그늘이 보인다.
// 전에는 shadowBlur 로 넓은 빛·그늘 띠(조각 변의 4.5%)를 깔았는데 조각이 베개처럼 부풀고 이음매가 밝게 벌어져 보였다
import { paintPiece, piecePath, type Cut, type PieceLook } from './jigsaw';
export interface ReliefOpts { chunk?: number; alive?: () => boolean; onProgress?: (done: number, total: number) => void; look?: PieceLook }

/** 조각 (r, c) 하나. k = 캔버스 픽셀 / 그림 픽셀 (변환은 안에서 잡는다) */
export function reliefPiece(ctx: CanvasRenderingContext2D, img: CanvasImageSource, cut: Cut, r: number, c: number, k: number, look?: PieceLook) {
  ctx.save(); ctx.setTransform(k, 0, 0, k, 0, 0); paintPiece(ctx, img, cut, r, c, k, look); ctx.restore();
}
/** 이음매 — 조각 사이의 가는 틈. 전체를 한 번에. 조각의 단면 선(paintPiece)이 양쪽에서 이미 어둡게 만나므로 여기서는 실낱만 */
export function seams(ctx: CanvasRenderingContext2D, cut: Cut, k: number) {
  const side = Math.min(cut.pw, cut.ph) * k;
  ctx.save(); ctx.setTransform(k, 0, 0, k, 0, 0); ctx.lineWidth = Math.max(0.6, Math.min(1.4, side * 0.006)) / k; ctx.strokeStyle = 'rgba(10,8,4,.42)'; ctx.lineJoin = 'round';
  for (let r = 0; r < cut.rows; r++) for (let c = 0; c < cut.cols; c++) ctx.stroke(piecePath(cut, r, c));
  ctx.restore();
}
/** 완성본 전체. 조각이 많으면 chunk 조각마다 한 프레임 쉬어 화면이 굳지 않게 하고, alive 가 false 를 주면 그만둔다(다른 판으로 넘어갔을 때). 다 그렸으면 true */
export async function renderRelief(canvas: HTMLCanvasElement, img: CanvasImageSource, cut: Cut, k: number, o: ReliefOpts = {}): Promise<boolean> {
  const ctx = canvas.getContext('2d')!, total = cut.rows * cut.cols, chunk = o.chunk ?? 48; let i = 0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let r = 0; r < cut.rows; r++) for (let c = 0; c < cut.cols; c++) {
    reliefPiece(ctx, img, cut, r, c, k, o.look);
    if (++i % chunk === 0) { o.onProgress?.(i, total); await new Promise(requestAnimationFrame); if (o.alive && !o.alive()) return false; }
  }
  seams(ctx, cut, k); o.onProgress?.(total, total); return true;
}
/** 다 새긴 완성본(still)에서 조각 하나를 옮겨 그린다 — 타임랩스가 조각을 하나씩 드러낼 때. 두 캔버스는 같은 크기·같은 k */
export function copyPiece(dst: CanvasRenderingContext2D, still: HTMLCanvasElement, cut: Cut, r: number, c: number, k: number) {
  const { pw, ph, padX, padY } = cut; const x = (c * pw - padX) * k, y = (r * ph - padY) * k, w = (pw + padX * 2) * k, h = (ph + padY * 2) * k;
  dst.save(); dst.setTransform(k, 0, 0, k, 0, 0); dst.clip(piecePath(cut, r, c)); dst.setTransform(1, 0, 0, 1, 0, 0); dst.drawImage(still, x, y, w, h, x, y, w, h); dst.restore();
}

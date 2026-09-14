// 완성본을 실물 퍼즐처럼 새긴다 — 완성 보기 페이지(/done/)와 결과 화면이 쓴다. 빛·테두리 세기는 두 번 낮췄다(처음 값은 너무 세다고 했고, 더 투명하게 해 달라고 했다)
// 조각마다 그림을 경로로 오려 넣고, 안쪽 가장자리에 빛(왼쪽 위)과 그늘(오른쪽 아래)을 떨어뜨려 두께를 내고, 조각 사이에 가는 틈을 낸다.
// 안쪽 그늘의 요령: 선은 캔버스 밖 멀리(OFF) 그리고 그림자(shadowOffset)만 제자리에 떨어뜨린다 — 클립이 조각 안쪽이라
// 그림자 중 조각 안으로 들어온 쪽만 남는다. 띠(lineWidth)보다 밀어내는 거리(d)가 커서 왼쪽 위 변에는 그늘이 남지 않고 오른쪽 아래 변에만 남는다(빛은 반대)
import { piecePath, type Cut } from './jigsaw';
const OFF = 1e5;
export interface ReliefOpts { chunk?: number; alive?: () => boolean; onProgress?: (done: number, total: number) => void }

/** 조각 (r, c) 하나. k = 캔버스 픽셀 / 그림 픽셀 (변환은 안에서 잡는다) */
export function reliefPiece(ctx: CanvasRenderingContext2D, img: CanvasImageSource, cut: Cut, r: number, c: number, k: number) {
  const { pw, ph, padX, padY } = cut, path = piecePath(cut, r, c);
  const x = c * pw - padX, y = r * ph - padY, w = pw + padX * 2, h = ph + padY * 2;
  const side = Math.min(pw, ph) * k, bev = Math.max(1.4, Math.min(14, side * 0.045)), d = bev * 0.85;      // 흐린 빛·그늘 띠 — 조각 변의 4.5%
  const edge = Math.max(0.6, Math.min(2.2, side * 0.012)), de = edge * 0.9;                                   // 그 위에 얇고 또렷한 모서리 선 — 잘린 종이의 단면
  ctx.save(); ctx.setTransform(k, 0, 0, k, 0, 0); ctx.clip(path);
  ctx.drawImage(img, x, y, w, h, x, y, w, h);
  // 조각마다 아주 옅게 다른 밝기 — 한 그림에서 오려도 조각은 저마다 조금씩 다르게 빛을 받는다
  const v = ((r * 7 + c * 13) % 11) / 11; ctx.fillStyle = `rgba(0,0,0,${(v * 0.035).toFixed(3)})`; ctx.fillRect(x, y, w, h);
  ctx.lineJoin = 'round'; ctx.strokeStyle = '#000'; ctx.setTransform(k, 0, 0, k, -OFF, 0);
  // 1) 흐린 띠: 빛(왼쪽 위)·그늘(오른쪽 아래)
  ctx.lineWidth = bev / k; ctx.shadowBlur = bev * 0.7;
  ctx.shadowColor = 'rgba(255,255,255,.2)'; ctx.shadowOffsetX = OFF + d; ctx.shadowOffsetY = d; ctx.stroke(path);
  ctx.shadowColor = 'rgba(0,0,0,.32)'; ctx.shadowOffsetX = OFF - d; ctx.shadowOffsetY = -d; ctx.stroke(path);
  // 2) 또렷한 모서리 선: 같은 방향으로 얇게, 거의 안 흐리게
  ctx.lineWidth = edge / k; ctx.shadowBlur = edge * 0.35;
  ctx.shadowColor = 'rgba(255,255,255,.26)'; ctx.shadowOffsetX = OFF + de; ctx.shadowOffsetY = de; ctx.stroke(path);
  ctx.shadowColor = 'rgba(0,0,0,.34)'; ctx.shadowOffsetX = OFF - de; ctx.shadowOffsetY = -de; ctx.stroke(path);
  ctx.restore();
}
/** 이음매 — 조각 사이의 가는 틈. 전체를 한 번에 */
export function seams(ctx: CanvasRenderingContext2D, cut: Cut, k: number) {
  ctx.save(); ctx.setTransform(k, 0, 0, k, 0, 0); ctx.lineWidth = 0.8 / k; ctx.strokeStyle = 'rgba(12,9,5,.18)'; ctx.lineJoin = 'round';
  for (let r = 0; r < cut.rows; r++) for (let c = 0; c < cut.cols; c++) ctx.stroke(piecePath(cut, r, c));
  ctx.restore();
}
/** 완성본 전체. 조각이 많으면 chunk 조각마다 한 프레임 쉬어 화면이 굳지 않게 하고, alive 가 false 를 주면 그만둔다(다른 판으로 넘어갔을 때). 다 그렸으면 true */
export async function renderRelief(canvas: HTMLCanvasElement, img: CanvasImageSource, cut: Cut, k: number, o: ReliefOpts = {}): Promise<boolean> {
  const ctx = canvas.getContext('2d')!, total = cut.rows * cut.cols, chunk = o.chunk ?? 48; let i = 0;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let r = 0; r < cut.rows; r++) for (let c = 0; c < cut.cols; c++) {
    reliefPiece(ctx, img, cut, r, c, k);
    if (++i % chunk === 0) { o.onProgress?.(i, total); await new Promise(requestAnimationFrame); if (o.alive && !o.alive()) return false; }
  }
  seams(ctx, cut, k); o.onProgress?.(total, total); return true;
}
/** 다 새긴 완성본(still)에서 조각 하나를 옮겨 그린다 — 타임랩스가 조각을 하나씩 드러낼 때. 두 캔버스는 같은 크기·같은 k */
export function copyPiece(dst: CanvasRenderingContext2D, still: HTMLCanvasElement, cut: Cut, r: number, c: number, k: number) {
  const { pw, ph, padX, padY } = cut; const x = (c * pw - padX) * k, y = (r * ph - padY) * k, w = (pw + padX * 2) * k, h = (ph + padY * 2) * k;
  dst.save(); dst.setTransform(k, 0, 0, k, 0, 0); dst.clip(piecePath(cut, r, c)); dst.setTransform(1, 0, 0, 1, 0, 0); dst.drawImage(still, x, y, w, h, x, y, w, h); dst.restore();
}

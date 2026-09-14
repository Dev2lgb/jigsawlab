// 판 위 조각 찾기 — 아직 어디에도 안 붙은 한 조각짜리들이 5초 동안 반짝인다(Jigsaw.astro 의 findLone).
// 판 좌표로 셈해 view 변환이 걸린 판 캔버스에 그리되 선 굵기·별 크기는 화면 px 로 잡는다 — 1000조각 판을 한눈에 볼 만큼 물러나
// 조각이 손톱만 해져도 보여야 찾기다. 판은 프레임마다 지금의 외톨이 목록을 넘긴다 — 5초 사이에 붙거나 잠긴 조각은 바로 꺼지고, 끌면 따라온다.
//
// 두 번에 나눠 그린다:
//  back()  — 조각 밑에 까는 금빛 번짐. 굵고 옅은 선에서 가늘고 짙은 선으로 겹쳐 실루엣(톱니·홈) 바깥으로만 새어 나오게(조각이 안쪽을 덮는다)
//  front() — 조각 위에 얹는 흰 테·빛줄기(윤기가 대각선으로 스친다)·네 갈래 별. 뭉치 밑에 깔린 조각도 이걸로 드러난다
// 번짐과 테는 조각마다 한 번 그려 둔 그림(art)을 알파만 바꿔 찍는다 — 프레임마다 선을 그으면 비용이 경로 분할이라 조각 수에 그대로 비례해
// 300조각에 선 다섯 겹이 한 프레임을 다 먹었다(shadowBlur 는 더 비싸다). 확대가 1.5배 넘게 바뀌면 다시 그린다
// 조각마다 박자를 흩어 한꺼번에 깜빡이지 않게. 조각이 많으면 빛줄기·별을 덜어 내고, 움직임 줄이기면 깜빡임 없이 테만 은은하게.

/** 반짝일 조각 하나 — path 는 제자리(격자) 좌표의 외곽선, (dx, dy) 만큼 옮겨 그린다. (x, y, w, h) 는 제자리 칸 */
export type Lone = { id: object; path: Path2D; dx: number; dy: number; x: number; y: number; w: number; h: number };

const DUR = 5000;
const GOLD = '255,184,28';
// 번짐 겹 [화면 px 굵기, 알파, 색] — 넓고 옅은 겹에서 좁은 겹으로. 짙은 한 줄이 조각을 감으면 번짐이 아니라 '선택 테두리' 처럼 보였다
const HALO = [[40, 0.07, GOLD], [27, 0.11, GOLD], [17, 0.17, GOLD], [9, 0.26, '255,206,90']] as const;
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (v: number) => { const u = clamp01(v); return u * u * (3 - 2 * u); };
const frac = (v: number) => v - Math.floor(v);

/** 조각 하나의 번짐·테 그림. 제자리 칸에서 사방 m 만큼 넓힌 상자를 q(px/판 단위) 로 담는다 */
type Art = { s: number; m: number; halo: HTMLCanvasElement; rim: HTMLCanvasElement };

export function createSparkle() {
  let t0 = -1;
  const phases = new WeakMap<object, number>();
  const phase = (id: object) => { let v = phases.get(id); if (v === undefined) phases.set(id, (v = Math.random())); return v; };
  const arts = new Map<object, Art>(); // 반짝임이 끝나면 비운다
  /** 지금 시각의 공통값. 끝났으면 null */
  function frame(now: number) {
    if (t0 < 0) return null; const t = now - t0; if (t >= DUR) { t0 = -1; arts.clear(); return null; }
    return { t, env: smooth(t / 220) * smooth((DUR - t) / 800), still: reduced() };
  }
  function art(it: Lone, s: number): Art {
    const a = arts.get(it.id); if (a && Math.abs(Math.log(a.s / s)) < 0.4) return a;
    // 조각이 화면에서 작을수록 번짐을 줄인다 — 손톱만 한 조각에 40px 번짐이면 이웃끼리 뭉개져 한 덩이로 보인다
    const k = Math.max(0.45, Math.min(1, (Math.min(it.w, it.h) * s) / 48));
    const m = Math.max(it.w, it.h) * 0.4 + (HALO[0][0] * k) / s / 2; // 톱니가 칸 밖으로 나오는 만큼 + 가장 넓은 번짐의 반
    const W = it.w + m * 2, H = it.h + m * 2, q = Math.min(s * Math.min(2, devicePixelRatio || 1), 280 / Math.max(W, H));
    const mk = (draw: (c: CanvasRenderingContext2D) => void) => {
      const cv = document.createElement('canvas'); cv.width = Math.max(1, Math.ceil(W * q)); cv.height = Math.max(1, Math.ceil(H * q));
      const c = cv.getContext('2d')!; c.scale(q, q); c.translate(m - it.x, m - it.y); c.lineJoin = 'round'; draw(c); return cv;
    };
    const halo = mk((c) => { for (const [w, al, col] of HALO) { c.lineWidth = (w * k) / s; c.strokeStyle = `rgba(${col},${al})`; c.stroke(it.path); } });
    const rim = mk((c) => { c.lineWidth = 1.6 / s; c.strokeStyle = 'rgba(255,250,232,.95)'; c.stroke(it.path); });
    const out = { s, m, halo, rim }; arts.set(it.id, out); return out;
  }
  const stamp = (ctx: CanvasRenderingContext2D, it: Lone, s: number, which: 'halo' | 'rim') => { const a = art(it, s); ctx.drawImage(a[which], it.dx + it.x - a.m, it.dy + it.y - a.m, it.w + a.m * 2, it.h + a.m * 2); };
  /** 조각마다 박자 — 0..1 사이를 오가되 꼭대기에서 잠깐 머물게(반짝) */
  const pulse = (t: number, ph: number) => { const u = 0.5 - 0.5 * Math.cos((t / 1000 * 0.9 + ph) * Math.PI * 2); return u * u * (3 - 2 * u); };

  /** 가느다란 네 갈래 빛살 (R 끝까지, k 가 허리 굵기) */
  function rays(ctx: CanvasRenderingContext2D, R: number, k: number) {
    ctx.beginPath(); ctx.moveTo(0, -R); ctx.quadraticCurveTo(k, -k, R, 0); ctx.quadraticCurveTo(k, k, 0, R); ctx.quadraticCurveTo(-k, k, -R, 0); ctx.quadraticCurveTo(-k, -k, 0, -R); ctx.fill();
  }
  /** 반짝 — 부드러운 빛 무리 위에 긴 십자 빛살, 45° 로 짧은 빛살, 가운데 흰 점. 종이별처럼 보이지 않게 빛살은 가늘게 */
  function twinkle(ctx: CanvasRenderingContext2D, R: number, v: number) {
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 1.05);
    g.addColorStop(0, `rgba(255,236,160,${0.95 * v})`); g.addColorStop(0.3, `rgba(${GOLD},${0.5 * v})`); g.addColorStop(1, `rgba(${GOLD},0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, R * 1.05, 0, Math.PI * 2); ctx.fill();
    // 금빛 빛살을 조금 굵게 깔고 흰 빛살을 얹는다 — 흰 것만이면 밝은 판·밝은 그림 위에서 안 보인다
    ctx.fillStyle = `rgba(${GOLD},${0.5 * v})`; rays(ctx, R * 1.04, R * 0.12);
    ctx.fillStyle = `rgba(255,255,252,${v})`; rays(ctx, R, R * 0.065);
    ctx.save(); ctx.rotate(Math.PI / 4); ctx.fillStyle = `rgba(${GOLD},${0.4 * v})`; rays(ctx, R * 0.5, R * 0.08); ctx.fillStyle = `rgba(255,252,235,${0.85 * v})`; rays(ctx, R * 0.46, R * 0.04); ctx.restore();
    ctx.fillStyle = `rgba(255,255,255,${v})`; ctx.beginPath(); ctx.arc(0, 0, Math.max(1.2, R * 0.1), 0, Math.PI * 2); ctx.fill();
  }

  return {
    start(now = performance.now()) { t0 = now; },
    stop() { t0 = -1; arts.clear(); },
    get on() { return t0 >= 0; },
    back(ctx: CanvasRenderingContext2D, now: number, items: Lone[], s: number) {
      const f = frame(now); if (!f || !items.length) return;
      ctx.save();
      for (const it of items) { ctx.globalAlpha = f.env * (f.still ? 0.8 : 0.45 + 0.55 * pulse(f.t, phase(it.id))); stamp(ctx, it, s, 'halo'); }
      ctx.restore();
    },
    /** 살아 있으면 true — 판이 다음 프레임을 청한다 */
    front(ctx: CanvasRenderingContext2D, now: number, items: Lone[], s: number): boolean {
      const f = frame(now); if (!f) return false; if (!items.length) return true;
      const gloss = !f.still && items.length <= 40, stars = f.still ? 0 : items.length <= 60 ? 2 : items.length <= 200 ? 1 : 0;
      ctx.save();
      for (const it of items) {
        const ph = phase(it.id), p = f.still ? 0.6 : pulse(f.t, ph), a = f.env * (0.4 + 0.6 * p);
        ctx.globalAlpha = a; stamp(ctx, it, s, 'rim'); ctx.globalAlpha = 1;
        if (gloss) {
          ctx.save(); ctx.translate(it.dx, it.dy);
          // 살짝 밝아지고, 한 바퀴(1.1초)에 한 번 빛줄기가 왼쪽 위에서 오른쪽 아래로 스친다 — 박자의 꼭대기에 맞춰
          ctx.clip(it.path);
          ctx.fillStyle = `rgba(255,244,214,${0.2 * f.env * p})`; ctx.fillRect(it.x - it.w, it.y - it.h, it.w * 3, it.h * 3);
          const u = frac(f.t / 1000 * 0.9 + ph + 0.25) / 0.45;
          if (u < 1) {
            const e = smooth(u), bx = it.x - it.w * 0.6 + e * it.w * 2.2, by = it.y - it.h * 0.6 + e * it.h * 2.2, bw = it.w * 0.6, bh = it.h * 0.6;
            const g = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
            g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, `rgba(255,255,255,${0.7 * f.env})`); g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = g; ctx.fillRect(it.x - it.w, it.y - it.h, it.w * 3, it.h * 3);
          }
          ctx.restore();
        }
        // 네 갈래 별 — 조각 둘레(탭 언저리) 두 군데에서 번갈아 켜졌다 꺼진다. 크기는 화면 px 로
        for (let j = 0; j < stars; j++) {
          const u = frac(f.t / 1000 * 1.25 + ph * 3.1 + j * 0.5); if (u > 0.42) continue;
          const v = Math.sin((u / 0.42) * Math.PI), sd = frac(ph * 7.3 + j * 0.37);
          // 네 모서리 중 하나 언저리, 조금 바깥으로
          const cx = it.dx + it.x + it.w * (sd < 0.5 ? -0.08 + sd * 0.5 : 1.08 - (sd - 0.5) * 0.5), cy = it.dy + it.y + it.h * (frac(sd * 3.7) < 0.5 ? -0.06 : 1.06);
          const R = Math.max(9, Math.min(26, Math.min(it.w, it.h) * s * 0.42)) * (0.35 + 0.65 * v);
          ctx.save(); ctx.translate(cx, cy); ctx.scale(1 / s, 1 / s); ctx.rotate((ph - 0.5) * 0.4 + u * 0.5);
          twinkle(ctx, R, v * f.env); ctx.restore();
        }
      }
      ctx.restore();
      return true;
    },
  };
}

// 조각이 제자리에 딱 들어갈 때 가장자리에서 먼지가 훅 피어올랐다 흩어지는 연출.
// 판 좌표계로 셈해 두고 판 캔버스에 view 변환이 걸린 채로 그리므로, 확대·축소에 관계없이 조각 크기에 맞는 비율로 보인다.
// 조각을 놓는 순간(Jigsaw.astro 의 lockGroup·merge)에 puff() 로 심고 drawNow 가 프레임마다 render() 를 부른다 —
// 살아 있는 알갱이가 남아 있으면 true 를 돌려 다음 프레임을 청하게 한다. 소리(celebrate.ts 의 click)와 같은 순간에 난다.
//
// 진짜 먼지처럼 보이게 한 것들(고른 고리 하나가 밖으로 밀려나는 모양이면 '후광' 처럼 보였다):
// ① 얼룩은 완벽한 원이 아니라 방사형 감쇠 × 값 노이즈로 찢어진 솜뭉치를 미리 그려 두고 알갱이마다 다른 모양·다른 각도로 찍는다(돌면서 퍼진다)
// ② 둘레 몇 군데(뭉치)에서 크게 뭉게뭉게 솟고 나머지는 옅게 ③ 속도를 밑동 쪽에 몰아 두어 대부분은 조각 곁에 남고 몇몇만 멀리 간다 —
// 밑동은 짙고 바깥으로 갈수록 옅어진다 ④ 큰 구름은 옆으로 낮게 새어 나와 부풀며 천천히 떠오르고, 잔 알갱이는 튀어 올랐다 중력에 떨어진다
// ⑤ 공기 저항 — 처음 100ms 에 거의 다 나가고 뒤로 갈수록 멈춘다 ⑥ 옆으로 살짝 흔들리는 난류와 한 번 피운 먼지가 같이 흘러가는 바람
// ⑦ 확 나타나서(20ms) 천천히 사라진다(0.5~1초). 색은 밝은 판에서는 살짝 어둡게, 어두운 그림에서는 살짝 밝게 보이는 중간 톤의 따뜻한 회색

/** 뭉치의 바깥 변 하나 — (x0,y0)→(x1,y1), 바깥쪽 법선 (nx,ny) */
export type Seg = { x0: number; y0: number; x1: number; y1: number; nx: number; ny: number; len: number };

/**
 * 격자 칸 묶음의 바깥 변들 — 이웃 칸이 묶음 안에 없는 쪽만. 먼지는 조각 밑에서 밖으로 새어 나오므로 이음매에서는 안 난다.
 * `also` 는 안쪽으로 치되 변은 안 내는 칸들(붙이기 때 상대 뭉치 — 그쪽과 맞닿는 변에서는 먼지가 안 난다)
 */
export function outerEdges(cells: { r: number; c: number }[], pw: number, ph: number, ox = 0, oy = 0, also: { r: number; c: number }[] = []): Seg[] {
  const key = (r: number, c: number) => r * 100000 + c;
  const inside = new Set<number>(); for (const p of cells) inside.add(key(p.r, p.c)); for (const p of also) inside.add(key(p.r, p.c));
  const out: Seg[] = [];
  for (const { r, c } of cells) {
    const x = c * pw + ox, y = r * ph + oy;
    if (!inside.has(key(r - 1, c))) out.push({ x0: x, y0: y, x1: x + pw, y1: y, nx: 0, ny: -1, len: pw });
    if (!inside.has(key(r + 1, c))) out.push({ x0: x, y0: y + ph, x1: x + pw, y1: y + ph, nx: 0, ny: 1, len: pw });
    if (!inside.has(key(r, c - 1))) out.push({ x0: x, y0: y, x1: x, y1: y + ph, nx: -1, ny: 0, len: ph });
    if (!inside.has(key(r, c + 1))) out.push({ x0: x + pw, y0: y, x1: x + pw, y1: y + ph, nx: 1, ny: 0, len: ph });
  }
  return out;
}

// 구름(cloud): 부드러운 얼룩, 부풀며 옅어진다 / 알갱이(grain): 작은 점, 튀었다 떨어진다
type P = { grain: boolean; x: number; y: number; vx: number; vy: number; wx: number; wy: number; rise: number; wob: number; ph: number; rot: number; spin: number; r0: number; r1: number; a0: number; t0: number; life: number; spr: number };
// 먼지 색 — 밝은 판(#e6e8ee) 위에서는 살짝 어둡게, 어두운 그림 위에서는 살짝 밝게 보이는 중간 톤의 따뜻한 회색. 알갱이는 조금 더 진하게
const TONES = ['184,176,160', '204,197,183', '166,158,142'];
const GRAIN = 'rgba(140,132,116,';
const VARIANTS = 4; // 톤마다 모양 4가지
const MAX = 480; // 한꺼번에 살아 있을 수 있는 알갱이 상한 — 훅으로 99조각을 한 번에 놓아도 판이 안 멈춘다
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

export function createDust() {
  const ps: P[] = [];
  let sprites: HTMLCanvasElement[] | null = null;
  /**
   * 톤×모양 개수만큼 얼룩을 미리 그려 둔다 — 가운데는 빽빽하고 가장자리는 찢어진 솜뭉치. 픽셀마다 (방사형 감쇠)² × (값 노이즈 3옥타브) 로
   * 알파를 정해 동그란 원반이 아니라 뭉게뭉게한 모양이 된다. 처음 한 번 96²×12 장뿐이라 몇 ms. 알갱이마다 그라디언트를 만드는 것보다 훨씬 싸다
   */
  function sprite(i: number) {
    if (!sprites) sprites = TONES.flatMap((t) => { const [r, g, b] = t.split(',').map(Number); return Array.from({ length: VARIANTS }, () => {
      const S = 96, G = 5, cv = document.createElement('canvas'); cv.width = cv.height = S; const c = cv.getContext('2d')!; const im = c.createImageData(S, S), d = im.data;
      const lat = (o: number) => { const m = (G << o) + 2; return Array.from({ length: m }, () => Array.from({ length: m }, Math.random)); };
      const L = [lat(0), lat(1), lat(2)]; const sm = (u: number) => u * u * (3 - 2 * u);
      const val = (l: number[][], x: number, y: number) => { const xi = Math.floor(x), yi = Math.floor(y), fx = sm(x - xi), fy = sm(y - yi); const a = l[yi][xi], bb = l[yi][xi + 1], cc = l[yi + 1][xi], dd = l[yi + 1][xi + 1]; return (a + (bb - a) * fx) * (1 - fy) + (cc + (dd - cc) * fx) * fy; };
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
        const u = (x + 0.5) / S, v = (y + 0.5) / S, dist = Math.hypot(u - 0.5, v - 0.5) * 2, fall = Math.max(0, 1 - dist);
        let nz = 0, amp = 0.55; for (let o = 0; o < 3; o++) { nz += val(L[o], u * (G << o), v * (G << o)) * amp; amp *= 0.5; }
        const a = Math.max(0, Math.min(1, fall * fall * (0.3 + nz * 1.4) - 0.08));
        const k = (y * S + x) * 4; d[k] = r; d[k + 1] = g; d[k + 2] = b; d[k + 3] = Math.round(a * 255);
      }
      c.putImageData(im, 0, 0); return cv;
    }); });
    return sprites[i];
  }
  /**
   * 바깥 변(segs)을 따라 먼지를 피운다. size 는 조각 한 변(짧은 쪽) — 알갱이 크기·퍼지는 거리의 기준.
   * k 는 세기(제자리 잠그기 1, 이웃에 붙이기 0.5). 변의 길이에 비례해 알갱이를 나눠 심는다
   */
  function puff(segs: Seg[], size: number, k = 1) {
    if (!segs.length || reduced()) return;
    const now = performance.now(); let total = 0; for (const s of segs) total += s.len;
    const clouds = Math.round(Math.min(96, Math.max(24, (total / size) * 10)) * k), grains = Math.round(clouds * 0.4);
    const wa = rnd(0, Math.PI * 2), wf = size * rnd(0.04, 0.1), wx = Math.cos(wa) * wf, wy = Math.sin(wa) * wf; // 이번 먼지가 흘러가는 바람
    // 둘레 위의 자리 t(0..total)를 변과 좌표로
    const seg = (t: number) => { t = ((t % total) + total) % total; let e = segs[0]; for (const s of segs) { if (t < s.len) { e = s; break; } t -= s.len; } const u = t / e.len; return { e, x: e.x0 + (e.x1 - e.x0) * u, y: e.y0 + (e.y1 - e.y0) * u }; };
    // 고른 고리가 아니라 몇 군데가 크게 뭉게뭉게 솟게 — 둘레에 뭉치 자리를 잡아 두고(한 조각이면 대여섯) 구름 7할은 그 근처에, 나머지는 고르게 심는다.
    // 뭉치마다 세기(w)가 달라 어떤 데는 크고 짙게, 어떤 데는 옅게
    const nC = Math.max(3, Math.round((total / size) * 1.5)); const cs = Array.from({ length: nC }, (_, j) => ({ t: ((j + rnd(0.2, 0.8)) / nC) * total, w: rnd(0.45, 1) }));
    const at = (i: number, n: number) => { if (Math.random() < 0.7) { const c = cs[Math.floor(Math.random() * nC)]; return { ...seg(c.t + (rnd(-1, 1) + rnd(-1, 1)) * size * 0.13), w: c.w }; } return { ...seg(((i + Math.random()) / n) * total), w: rnd(0.5, 0.8) }; };
    for (let i = 0; i < clouds; i++) {
      const { e, x, y, w } = at(i, clouds); const big = i % 4 === 0; // 넷에 하나는 크고 옅은 구름 — 낮게 깔리는 안개 느낌
      // 가장자리에 반쯤 걸쳐 시작해 밖으로 밀려나는데, 속도를 밑동 쪽에 몰아 두어(거듭제곱) 대부분은 조각 곁에 남고 몇몇만 멀리 간다 —
      // 그래야 구름이 조각에서 떨어져 고리만 떠다니지 않고, 밑동은 짙고 바깥으로 갈수록 옅어진다
      const sp = size * (big ? 0.04 + 0.28 * Math.pow(Math.random(), 1.6) : 0.05 + 0.5 * Math.pow(Math.random(), 1.6)), tj = rnd(-0.5, 0.5), out = size * rnd(-0.04, 0.04), sc = 0.75 + 0.45 * w;
      ps.push({ grain: false, x: x + e.nx * out, y: y + e.ny * out, vx: (e.nx - e.ny * tj) * sp, vy: (e.ny + e.nx * tj) * sp, wx, wy, rise: size * rnd(0.04, 0.14), wob: size * rnd(0.01, 0.03), ph: rnd(0, Math.PI * 2), rot: rnd(0, Math.PI * 2), spin: rnd(-1.4, 1.4), r0: size * sc * (big ? rnd(0.14, 0.2) : rnd(0.08, 0.13)), r1: size * sc * (big ? rnd(0.34, 0.5) : rnd(0.2, 0.34)), a0: (big ? rnd(0.16, 0.26) : rnd(0.34, 0.56)) * w * Math.min(1, k + 0.35), t0: now + rnd(0, 25), life: big ? rnd(700, 1000) : rnd(520, 860), spr: Math.floor(Math.random() * TONES.length * VARIANTS) });
    }
    for (let i = 0; i < grains; i++) {
      const { e, x, y } = at(i, grains); const sp = size * rnd(0.3, 0.95), tj = rnd(-0.7, 0.7);
      // 알갱이는 rise 만큼 튀어 올랐다가 wob(여기서는 중력) 로 떨어진다
      ps.push({ grain: true, x, y, vx: (e.nx - e.ny * tj) * sp, vy: (e.ny + e.nx * tj) * sp, wx: 0, wy: 0, rise: size * rnd(0.12, 0.42), wob: size * rnd(0.5, 0.9), ph: 0, rot: 0, spin: 0, r0: size * rnd(0.008, 0.02), r1: size * rnd(0.004, 0.012), a0: rnd(0.45, 0.8) * Math.min(1, k + 0.35), t0: now + rnd(0, 30), life: rnd(240, 480), spr: 0 });
    }
    if (ps.length > MAX) ps.splice(0, ps.length - MAX);
  }
  /** 살아 있는 알갱이를 그린다. 남은 게 있으면 true (다음 프레임을 청할 것). ctx 에는 판의 view 변환이 걸려 있어야 한다 */
  function render(ctx: CanvasRenderingContext2D, now: number): boolean {
    if (!ps.length) return false;
    let w = 0;
    for (const p of ps) {
      const t = (now - p.t0) / p.life; if (t >= 1) continue; ps[w++] = p; if (t < 0) continue;
      const e = 1 - Math.pow(1 - t, 3); // 공기 저항 — 처음에 확 나가고 뒤로 갈수록 멈춘다
      if (p.grain) {
        const x = p.x + p.vx * e, y = p.y + p.vy * e - p.rise * t + p.wob * t * t, r = p.r0 + (p.r1 - p.r0) * t;
        ctx.globalAlpha = 1; ctx.fillStyle = GRAIN + (p.a0 * (1 - t * t)).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        continue;
      }
      const g = 1 - Math.pow(1 - t, 2); // 부풀기는 조금 더 오래 간다
      const x = p.x + p.vx * e + p.wx * t + Math.sin(p.ph + t * 7) * p.wob * t, y = p.y + p.vy * e + p.wy * t - p.rise * t, r = p.r0 + (p.r1 - p.r0) * g;
      ctx.globalAlpha = p.a0 * Math.pow(1 - t, 1.6) * Math.min(1, t * 25);
      ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot + p.spin * e); ctx.drawImage(sprite(p.spr), -r, -r, r * 2, r * 2); ctx.restore();
    }
    ps.length = w; ctx.globalAlpha = 1;
    return w > 0;
  }
  return { puff, render, clear: () => { ps.length = 0; } };
}

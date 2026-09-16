// 마지막 조각 — 빈자리에서 금빛 티끌이 피어오르고(aura), 조각이 들어가는 순간 금가루가 쫙 퍼진다(burst).
// dust.ts 처럼 판 좌표계로 셈해 view 변환이 걸린 판 캔버스에 그린다. Jigsaw.astro 의 checkLast 가 남은 조각이 하나(또는 한 뭉치)일 때
// aura() 로 빈자리를 넘기고, lockGroup 이 마지막 조각을 잠글 때 burst() 를 부른다. drawNow 는 back()(조각 밑 — 빈자리의 금빛 웅덩이)과
// front()(조각 위 — 티끌·금가루)를 프레임마다 부르고, 살아 있으면 true 를 받아 다음 프레임을 청한다.
// u(unit)는 조각 한 변이되 아주 작은 조각(1000조각+)에서는 판 짧은 변의 8% 로 올려 잡는다(Jigsaw.astro 의 goldUnit) — 손톱만 한 조각 크기로 퍼지면 안 보인다.
//
// 진짜 금가루처럼 보이게 한 것들:
// ① 금가루의 대부분은 납작한 박편(flake)이다 — 굴러가며 면이 정면을 향하는 순간에만 확 반짝이고(3D 회전을 |cos| 로 흉내), 옆면일 때는
//    어두운 호박색 실낱. 금빛 알갱이를 둥근 점으로 찍으면 노란 모래처럼 보인다
// ② 그 밑에 dust.ts 와 같은 노이즈 솜뭉치를 금빛으로 깔아(haze) 고운 가루가 안개처럼 번지게 — 박편만으로는 '가루' 가 안 된다
// ③ 속도는 밑동 쪽에 몰아 두고(거듭제곱) 공기 저항으로 처음 100ms 에 거의 다 나간 뒤 천천히 팔랑이며 가라앉는다
// ④ 반짝임(star)은 몇 개만, 서로 다른 때에 — 한꺼번에 켜면 도식적인 별 무늬가 된다 ⑤ 놓는 순간 조각 자체가 한 번 환해졌다 가라앉는다(flash)
// ⑥ 빈자리의 티끌은 불씨처럼 — 저마다 다른 박자로 깜빡이며 흔들흔들 올라가고, 열에 하나는 네 갈래 반짝이. 빈자리 자체는 숨 쉬듯 밝아졌다 어두워진다
import { noiseSprite, type Seg } from './dust';

/** 빈자리 칸 하나 — 제자리 좌표의 외곽선(piecePath)과 칸 */
export type Slot = { path: Path2D; x: number; y: number; w: number; h: number };

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (v: number) => { const u = clamp01(v); return u * u * (3 - 2 * u); };
const HAZE_TONES = ['244,190,70', '252,214,120', '226,160,44'];
const VARIANTS = 3;
const MAX = 720;
const RIM = [[30, 0.14], [14, 0.26], [6, 0.42]] as const; // 놓는 순간 조각 둘레로 번지는 빛 [화면 px, 알파]

type Mote = { star: boolean; x: number; y: number; vy: number; amp: number; f: number; ph: number; tw: number; td: number; r: number; a0: number; t0: number; life: number; rot: number; spin: number };
type Haze = { x: number; y: number; vx: number; vy: number; wx: number; wy: number; rise: number; ph: number; wob: number; rot: number; spin: number; r0: number; r1: number; a0: number; t0: number; life: number; spr: number };
type Flake = { x: number; y: number; vx: number; vy: number; g: number; fl: number; fq: number; ph: number; ax: number; ar: number; tp: number; ts: number; w: number; h: number; a0: number; t0: number; life: number; big: boolean };
type Star = { x: number; y: number; t0: number; dur: number; R: number; rot: number };

/** 부드러운 방사형 빛 무리 한 장 */
function radial(S: number, stops: [number, string][]) {
  const cv = document.createElement('canvas'); cv.width = cv.height = S; const c = cv.getContext('2d')!;
  const g = c.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2); for (const [o, col] of stops) g.addColorStop(o, col);
  c.fillStyle = g; c.fillRect(0, 0, S, S); return cv;
}
/**
 * 바늘처럼 가는 네 갈래 빛살 — 가운데 폭 w 에서 R 끝으로 뾰족하게. sparkle.ts 의 곡선 별은 허리가 0.36R 이라 작게 찍어도 통통한 종이별로 보여서,
 * 여기서는 렌즈 플레어처럼 가늘게 뽑는다
 */
function rays(c: CanvasRenderingContext2D, R: number, w: number) {
  c.beginPath(); c.moveTo(-w, 0); c.lineTo(0, -R); c.lineTo(w, 0); c.lineTo(0, R); c.closePath(); c.moveTo(0, -w); c.lineTo(R, 0); c.lineTo(0, w); c.lineTo(-R, 0); c.closePath(); c.fill();
}
/**
 * 반짝이 한 장 — 빛 무리 위에 가느다란 십자 빛살, 45° 로 더 짧은 빛살, 가운데 흰 점. 금빛 빛살을 밑에 깔아 밝은 판에서도 보인다.
 * 빛살은 가늘게 — 굵으면 종이별이 된다. 박편이 번쩍이는 것은 이것 말고 둥근 빛 무리(bloom)로, 별 모양이 여럿 보이면 도식적이다
 */
function glint(S: number) {
  const cv = document.createElement('canvas'); cv.width = cv.height = S; const c = cv.getContext('2d')!; const R = S / 2 * 0.96; c.translate(S / 2, S / 2);
  const g = c.createRadialGradient(0, 0, 0, 0, 0, R * 0.5); g.addColorStop(0, 'rgba(255,244,200,.95)'); g.addColorStop(0.3, 'rgba(255,196,50,.4)'); g.addColorStop(1, 'rgba(255,184,28,0)');
  c.fillStyle = g; c.beginPath(); c.arc(0, 0, R * 0.5, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(255,184,28,.55)'; rays(c, R, R * 0.075); c.fillStyle = 'rgba(255,255,250,.95)'; rays(c, R * 0.94, R * 0.035);
  c.rotate(Math.PI / 4); c.fillStyle = 'rgba(255,184,28,.4)'; rays(c, R * 0.45, R * 0.06); c.fillStyle = 'rgba(255,252,235,.85)'; rays(c, R * 0.4, R * 0.028); c.rotate(-Math.PI / 4);
  c.fillStyle = '#fff'; c.beginPath(); c.arc(0, 0, R * 0.06, 0, Math.PI * 2); c.fill(); return cv;
}

export function createGold() {
  const motes: Mote[] = [], haze: Haze[] = [], flakes: Flake[] = [], stars: Star[] = [];
  let slots: Slot[] | null = null, unit = 0, offAt = -1, shown: Slot[] = [], spawnAt = -1, acc = 0;
  let flash: { slots: Slot[]; t0: number } | null = null;
  let hazeSpr: HTMLCanvasElement[] | null = null, moteSpr: HTMLCanvasElement | null = null, glintSpr: HTMLCanvasElement | null = null;
  const hz = (i: number) => (hazeSpr ??= HAZE_TONES.flatMap((t) => Array.from({ length: VARIANTS }, () => noiseSprite(t))))[i];
  // 심이 희면 밝은 판에서 심이 사라져 금빛 고리(거품)처럼 보인다 — 심도 옅은 금빛으로, 어두운 판에서는 그 자체로 밝다
  const mote = () => (moteSpr ??= radial(48, [[0, 'rgba(255,240,170,1)'], [0.18, 'rgba(255,204,60,.95)'], [0.45, 'rgba(242,166,32,.5)'], [0.72, 'rgba(236,156,30,.14)'], [1, 'rgba(230,150,30,0)']]));
  const gl = () => (glintSpr ??= glint(96));
  const still = () => reduced();

  /** 빈자리에서 솟는 티끌 하나. gush 면 놓는 순간의 마지막 한 줌 — 더 빠르고 짧게 */
  function spawnMote(sl: Slot, now: number, gush = false) {
    const star = Math.random() < (gush ? 0.16 : 0.09), u = unit;
    // 조각 한 변의 3분의 1에서 두 배 높이까지 올라간다 — 빈자리 위로 티끌 기둥이 서야 '올라온다' 가 보인다. 크기는 대부분 잘고 몇몇만 굵게
    motes.push({ star, x: sl.x + sl.w * rnd(0.08, 0.92), y: sl.y + sl.h * rnd(0.12, 0.95), vy: -u * (gush ? rnd(0.8, 2) : rnd(0.3, 0.85)), amp: u * rnd(0.02, 0.07), f: rnd(1.8, 4.5), ph: rnd(0, Math.PI * 2), tw: rnd(6, 14), td: rnd(0.3, 0.75), r: star ? u * rnd(0.05, 0.085) : u * (0.018 + 0.045 * Math.pow(Math.random(), 1.6)), a0: rnd(0.65, 1), t0: now, life: gush ? rnd(700, 1300) : rnd(1200, 2200), rot: rnd(0, Math.PI), spin: rnd(-1.2, 1.2) });
  }

  return {
    /** 남은 조각의 빈자리(들)를 넘기면 거기서 티끌이 피어오른다. null 이면 멈춘다(떠 있는 티끌은 제 수명을 다한다) */
    aura(next: Slot[] | null, u = unit) {
      if (next && next.length) { slots = next; shown = next; unit = u; offAt = -1; }
      else if (slots) { slots = null; offAt = performance.now(); }
    },
    /**
     * 마지막 조각이 들어갔다 — 조각이 한 번 환해지고 둘레(segs)에서 금가루 안개·박편이 쫙 퍼지며, 근처에서 반짝임 몇 개가 차례로 튄다.
     * 티끌은 여기서 멈추되 마지막 한 줌을 위로 뿜는다
     */
    burst(cells: Slot[], segs: Seg[], u: number) {
      const now = performance.now(); unit = u; slots = null; offAt = now; shown = cells;
      flash = { slots: cells, t0: now };
      if (still() || !segs.length) return;
      let total = 0, x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const s of segs) total += s.len; for (const c of cells) { x0 = Math.min(x0, c.x); y0 = Math.min(y0, c.y); x1 = Math.max(x1, c.x + c.w); y1 = Math.max(y1, c.y + c.h); }
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, k = Math.min(2.5, Math.max(1, total / (u * 4))); // 뭉치가 크면 둘레만큼 조금 더
      const seg = (t: number) => { t = ((t % total) + total) % total; let e = segs[0]; for (const s of segs) { if (t < s.len) { e = s; break; } t -= s.len; } const q = t / e.len; return { e, x: e.x0 + (e.x1 - e.x0) * q, y: e.y0 + (e.y1 - e.y0) * q }; };
      const wa = rnd(0, Math.PI * 2), wf = u * rnd(0.03, 0.08), wx = Math.cos(wa) * wf, wy = Math.sin(wa) * wf;
      // 안개 — 둘레에서 밖으로 밀려나며 부풀고 살짝 떠오른다. 밑동 쪽에 속도를 몰아 조각 곁이 짙고 바깥으로 갈수록 옅다
      const nH = Math.round(84 * k);
      for (let i = 0; i < nH; i++) {
        const { e, x, y } = seg(((i + Math.random()) / nH) * total); const big = i % 3 === 0;
        const sp = u * (big ? 0.08 + 0.6 * Math.pow(Math.random(), 1.5) : 0.12 + 1.35 * Math.pow(Math.random(), 1.6)), tj = rnd(-0.6, 0.6);
        haze.push({ x, y, vx: (e.nx - e.ny * tj) * sp, vy: (e.ny + e.nx * tj) * sp, wx, wy, rise: u * rnd(0.06, 0.28), ph: rnd(0, Math.PI * 2), wob: u * rnd(0.01, 0.04), rot: rnd(0, Math.PI * 2), spin: rnd(-1.2, 1.2), r0: u * (big ? rnd(0.12, 0.2) : rnd(0.07, 0.13)), r1: u * (big ? rnd(0.5, 0.9) : rnd(0.28, 0.5)), a0: big ? rnd(0.2, 0.32) : rnd(0.32, 0.5), t0: now + rnd(0, 40), life: big ? rnd(1100, 1700) : rnd(800, 1300), spr: Math.floor(Math.random() * HAZE_TONES.length * VARIANTS) });
      }
      // 박편 — 둘레에서 사방으로 튀어 나가고(8할), 조각 안쪽에서도 몇 줌(2할, 가운데서 바깥으로). 살짝 위로 치솟았다가 팔랑이며 가라앉는다
      const nF = Math.round(210 * k);
      for (let i = 0; i < nF; i++) {
        let x: number, y: number, dx: number, dy: number;
        if (Math.random() < 0.8) { const s = seg(Math.random() * total); x = s.x; y = s.y; dx = s.e.nx; dy = s.e.ny; }
        else { x = rnd(x0, x1); y = rnd(y0, y1); const d = Math.hypot(x - cx, y - cy) || 1; dx = (x - cx) / d; dy = (y - cy) / d; }
        const a = Math.atan2(dy, dx) + rnd(-1, 1) * rnd(0, 0.9), big = Math.random() < 0.1, sp = u * (0.35 + 2.7 * Math.pow(Math.random(), 1.5));
        const w = big ? u * rnd(0.04, 0.065) : u * rnd(0.014, 0.036);
        flakes.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - u * rnd(0.05, 0.35), g: u * rnd(0.3, 0.95), fl: u * rnd(0.01, 0.05), fq: rnd(3, 8), ph: rnd(0, Math.PI * 2), ax: rnd(0, Math.PI), ar: rnd(-3, 3), tp: rnd(0, Math.PI * 2), ts: rnd(5, 17), w, h: w * rnd(0.55, 1), a0: rnd(0.7, 1), t0: now + rnd(0, 30), life: rnd(1000, 2100), big });
      }
      // 반짝임 — 조각 언저리 여섯 군데에서 서로 다른 때에
      for (let i = 0; i < 6; i++) { const a = rnd(0, Math.PI * 2), d = u * rnd(0.35, 1.5); stars.push({ x: cx + Math.cos(a) * d * ((x1 - x0) / (2 * u) + 0.5), y: cy + Math.sin(a) * d * ((y1 - y0) / (2 * u) + 0.5), t0: now + rnd(40, 950), dur: rnd(300, 520), R: u * rnd(0.1, 0.2), rot: rnd(0, Math.PI) }); }
      for (const c of cells) for (let i = 0; i < 14; i++) spawnMote(c, now, true);
      const over = haze.length + flakes.length + motes.length - MAX; if (over > 0) flakes.splice(0, Math.min(over, flakes.length));
    },
    clear() { motes.length = 0; haze.length = 0; flakes.length = 0; stars.length = 0; slots = null; shown = []; offAt = -1; flash = null; spawnAt = -1; },
    get on() { return !!slots; },
    /** 조각 밑 — 빈자리의 금빛 웅덩이와 둘레로 새는 빛. 멈춘 뒤 450ms 에 걸쳐 잦아든다 */
    back(ctx: CanvasRenderingContext2D, now: number, s: number) {
      if (!slots && offAt < 0) return;
      const k = slots ? 1 : 1 - clamp01((now - offAt) / 450); if (k <= 0) { offAt = -1; shown = []; return; }
      const a = k * (still() ? 0.75 : 0.5 + 0.5 * (0.5 - 0.5 * Math.cos((now / 2200) * Math.PI * 2)));
      ctx.save(); ctx.lineJoin = 'round';
      for (const sl of shown) {
        const cx = sl.x + sl.w / 2, cy = sl.y + sl.h * 0.55, R = Math.max(sl.w, sl.h) * 0.68;
        ctx.save(); ctx.clip(sl.path);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        g.addColorStop(0, `rgba(255,234,160,${0.84 * a})`); g.addColorStop(0.3, `rgba(252,200,72,${0.52 * a})`); g.addColorStop(0.7, `rgba(240,164,40,${0.18 * a})`); g.addColorStop(1, 'rgba(230,150,30,0)');
        ctx.fillStyle = g; ctx.fillRect(sl.x - sl.w * 0.5, sl.y - sl.h * 0.5, sl.w * 2, sl.h * 2);
        ctx.restore();
        for (const [w, al] of [[36, 0.05], [18, 0.09], [8, 0.15]] as const) { ctx.lineWidth = w / s; ctx.strokeStyle = `rgba(250,190,50,${al * a})`; ctx.stroke(sl.path); }
      }
      ctx.restore();
    },
    /** 조각 위 — 환해지는 조각·안개·박편·티끌·반짝임. 살아 있으면 true (판이 다음 프레임을 청한다) */
    front(ctx: CanvasRenderingContext2D, now: number, s: number): boolean {
      // 티끌 심기 — 빈자리마다 초당 28개 남짓, 프레임 간격에 맞춰(탭이 숨었다 돌아오면 한꺼번에 쏟지 않게 0.1초까지만)
      if (slots && !still()) {
        const dt = spawnAt < 0 ? 0.016 : Math.min(0.1, (now - spawnAt) / 1000); spawnAt = now; acc += dt * 50 * Math.min(slots.length, 4);
        while (acc >= 1) { acc -= 1; if (motes.length < 260) spawnMote(slots[Math.floor(Math.random() * slots.length)], now); }
      } else spawnAt = -1;
      let alive = !!slots && !still(); // 움직임 줄이기면 웅덩이만 가만히 — 프레임을 계속 청할 것 없다
      ctx.save();
      if (flash) {
        const t = (now - flash.t0) / 560;
        if (t >= 1) flash = null; else {
          alive = true; const e = Math.pow(1 - t, 1.4); ctx.lineJoin = 'round';
          for (const sl of flash.slots) {
            for (const [w, al] of RIM) { ctx.lineWidth = w / s; ctx.strokeStyle = `rgba(255,198,60,${al * e})`; ctx.stroke(sl.path); }
            ctx.fillStyle = `rgba(255,238,176,${0.85 * Math.pow(1 - t, 1.8)})`; ctx.fill(sl.path);
          }
        }
      }
      let w = 0;
      for (const p of haze) {
        const t = (now - p.t0) / p.life; if (t >= 1) continue; haze[w++] = p; if (t < 0) continue;
        const e = 1 - Math.pow(1 - t, 3), g = 1 - Math.pow(1 - t, 2);
        const x = p.x + p.vx * e + p.wx * t + Math.sin(p.ph + t * 6) * p.wob * t, y = p.y + p.vy * e + p.wy * t - p.rise * t, r = p.r0 + (p.r1 - p.r0) * g;
        ctx.globalAlpha = p.a0 * Math.pow(1 - t, 1.5) * Math.min(1, t * 20);
        ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot + p.spin * e); ctx.drawImage(hz(p.spr), -r, -r, r * 2, r * 2); ctx.restore();
      }
      haze.length = w; w = 0;
      const G = gl(), M = mote();
      for (const p of flakes) {
        const t = (now - p.t0) / p.life; if (t >= 1) continue; flakes[w++] = p; if (t < 0) continue;
        const age = (now - p.t0) / 1000, e = 1 - Math.pow(1 - t, 3);
        const x = p.x + p.vx * e + p.fl * Math.sin(p.ph + p.fq * age) * t, y = p.y + p.vy * e + p.g * t * t;
        // 굴러가는 박편 — 면이 정면을 향할수록(|cos|) 넓고 밝다. 옆면이면 어두운 호박색 실낱
        const c = Math.abs(Math.cos(p.tp + p.ts * age)), b = c * c * c, env = p.a0 * Math.min(1, t * 30) * (1 - smooth((t - 0.6) / 0.4));
        const cw = Math.max(0.12, c) * p.w, cr = Math.round(172 + 83 * b), cg = Math.round(116 + 112 * b), cb = Math.round(14 + 100 * b);
        ctx.globalAlpha = env; ctx.save(); ctx.translate(x, y); ctx.rotate(p.ax + p.ar * age); ctx.fillStyle = `rgb(${cr},${cg},${cb})`; ctx.fillRect(-cw / 2, -p.h / 2, cw, p.h); ctx.restore();
        // 정면을 향하는 순간의 번쩍임 — 둥근 빛 무리. 큰 박편만 가는 빛살
        if (b > 0.72) { const q = (b - 0.72) / 0.28; ctx.globalAlpha = env * q; if (p.big) { const R = Math.max(p.w * 2.2, 6 / s); ctx.save(); ctx.translate(x, y); ctx.rotate(p.ax * 0.3); ctx.drawImage(G, -R, -R, R * 2, R * 2); ctx.restore(); } else { const R = Math.max(p.w * 1.6, 3 / s); ctx.drawImage(M, x - R, y - R, R * 2, R * 2); } }
      }
      flakes.length = w; w = 0;
      for (const p of motes) {
        const t = (now - p.t0) / p.life; if (t >= 1) continue; motes[w++] = p; if (t < 0) continue;
        const age = (now - p.t0) / 1000, x = p.x + p.amp * Math.sin(p.ph + p.f * age), y = p.y + p.vy * age;
        const env = smooth(t / 0.12) * (1 - smooth((t - 0.55) / 0.45)), tw = 1 - p.td * (0.5 + 0.5 * Math.sin(p.ph * 3 + p.tw * age));
        ctx.globalAlpha = p.a0 * env * tw;
        if (p.star) { const R = Math.max(p.r * (1 - 0.3 * t), 4 / s); ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot + p.spin * age); ctx.drawImage(G, -R, -R, R * 2, R * 2); ctx.restore(); }
        else { const r = Math.max(p.r * (1 - 0.35 * t), 1.6 / s) * 1.3; ctx.drawImage(M, x - r, y - r, r * 2, r * 2); }
      }
      motes.length = w; w = 0;
      for (const p of stars) {
        const u = (now - p.t0) / p.dur; if (u >= 1) continue; stars[w++] = p; if (u < 0) continue;
        const v = Math.sin(u * Math.PI), R = Math.max(p.R * (0.35 + 0.65 * v), 8 / s);
        ctx.globalAlpha = v; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot + u * 0.4); ctx.drawImage(G, -R, -R, R * 2, R * 2); ctx.restore();
      }
      stars.length = w;
      ctx.restore();
      return alive || haze.length > 0 || flakes.length > 0 || motes.length > 0 || stars.length > 0 || offAt >= 0;
    },
  };
}

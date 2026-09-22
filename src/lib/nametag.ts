// 회원 네임태그 — 10레벨마다 판 재질이 오른다: 동판(10) · 은판(20) · 금판(30) · 크리스털판(40, '다이아') · 진주빛판(50, '무지개'). 10레벨 미만·비회원은 그냥 글자.
// 모양은 직소 조각 하나 — 왼쪽은 홈, 오른쪽은 톱니(엔진 tabSegs 와 같은 곡선·비율이라 판 위 조각·로더와 한 식구로 보인다).
// 판은 캔버스에 그리고 글자는 HTML 로 얹는다: 글자는 선명하고 말줄임이 되며, 판은 CSS 로는 안 나오는 것 — 브러시드 금속의 헤어라인 결·얇은 두께·
// 모서리 빛, 크리스털의 커팅면, 진주빛 이리데슨트 — 을 그린다. 실물 퍼즐 상자에 박힌 명판처럼 **채도·대비를 낮게, 광택은 얇게** — 채도 높은 게임 버튼 광택·
// 두꺼운 베벨·뚱뚱한 톱니로 그렸더니 촌스러웠다(2026-09-22).
// 빛은 고정이 아니다: 모든 판에 천천히 흐르는 반사 띠가 있고, 마우스 위치(데스크톱)·기울기(폰)를 따라 움직인다 — 실물 카드를 기울이면 빛이 스치는 느낌.
// 크리스털·진주빛은 판 둘레에서 **판 위 먼지와 같은 결의** 색 안개가 피어오른다(dust.ts 의 noiseSprite — 별·점 반짝이로 두었더니 먼지와 결이 달라 게임 이펙트처럼 보였다).
// 화면에 보이는 태그만 rAF 를 돈다(IntersectionObserver). 스타일은 Base.astro 의 전역 CSS(.ntag), 판 위 먼지 색은 dust.ts 의 PLATE_DUST 가 같은 구간을 쓴다
import { plateOf } from './level';
import { noiseSprite } from './dust';

export { plateOf };
type Plate = 1 | 2 | 3 | 4 | 5;

// ── 모양: 엔진 tabSegs(T=0.1, 흔들림 0) — [c1, c2, 끝점], u 는 변을 따라 0..1, v 는 변에 수직(변 길이 단위)
const T = 0.1;
const TAB: [number, number][][] = [
  [[0.2, 0], [0.5, -T], [0.5 - T, T]],
  [[0.5 - 2 * T, 3 * T], [0.5 + 2 * T, 3 * T], [0.5 + T, T]],
  [[0.5, -T], [0.8, 0], [1, 0]],
];
const TV = 1.05;        // 톱니 깊이 — 엔진 비율 그대로에 아주 조금만(판 높이가 조각 한 변이라 그 이상 키우면 뚱뚱해진다)
const KNOB = 0.25 * TV; // 톱니가 판 밖으로 나오는 깊이(판 높이 단위)
/** 판 외곽 — (0,0)~(W,H) 상자 안. 오른쪽 KNOB·H 만큼은 톱니 자리 */
function platePath(W: number, H: number): Path2D {
  const x1 = W - H * KNOB, r = H * 0.14, p = new Path2D();
  const edge = (px: (u: number, v: number) => [number, number], end: [number, number]) => {
    TAB.forEach(([c1, c2, e], i) => { const a = px(c1[0], c1[1] * TV), b = px(c2[0], c2[1] * TV), c = i === 2 ? end : px(e[0], e[1] * TV); p.bezierCurveTo(a[0], a[1], b[0], b[1], c[0], c[1]); });
  };
  p.moveTo(r, 0); p.lineTo(x1 - r, 0); p.arcTo(x1, 0, x1, r, r);
  edge((u, v) => [x1 + v * H, u * H], [x1, H - r]);        // 오른쪽: 위→아래, 톱니는 밖으로
  p.arcTo(x1, H, x1 - r, H, r); p.lineTo(r, H); p.arcTo(0, H, 0, H - r, r);
  edge((u, v) => [v * H, H - u * H], [0, r]);              // 왼쪽: 아래→위, 홈은 안으로
  p.arcTo(0, 0, r, 0, r); p.closePath();
  return p;
}

// ── 재질 — 브러시드 금속. 세로 그라디언트는 낮은 대비(가운데가 살짝 어둡고 위아래가 밝은 원통 반사), 그 위에 헤어라인·움직이는 반사 띠
type Metal = { face: [number, string][]; side: string; rim: string; hi: number; lo: number; spec: number; hair: number };
const METAL: Record<1 | 2 | 3, Metal> = {
  1: { face: [[0, '#dcb08c'], [0.5, '#b57c55'], [1, '#c9926c']], side: '#7a4a2c', rim: 'rgba(70,36,16,.5)', hi: 0.32, lo: 0.2, spec: 0.2, hair: 0.7 },   // 동 — 차분한 구리
  2: { face: [[0, '#eef0f3'], [0.5, '#c5cbd3'], [1, '#dfe3e8']], side: '#7d8592', rim: 'rgba(60,70,84,.45)', hi: 0.55, lo: 0.16, spec: 0.26, hair: 0.8 }, // 은 — 스틸
  3: { face: [[0, '#f1dea2'], [0.5, '#cfab58'], [1, '#e5c87c']], side: '#8a6a24', rim: 'rgba(110,80,20,.5)', hi: 0.42, lo: 0.18, spec: 0.24, hair: 0.6 },  // 금 — 샴페인 골드(노랑이 아니라)
};

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
function rng(seed: number) { return () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const hashStr = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

// 판 둘레의 안개 한 점 — dust.ts 의 P 와 같은 움직임(밖으로 밀리며 부풀고 살짝 떠오르다 옅어진다). grain 은 잔 알갱이(색 점, 반짝임 tw)
type Puff = { grain: boolean; x: number; y: number; vx: number; vy: number; rise: number; wob: number; ph: number; rot: number; spin: number; r0: number; r1: number; a0: number; t0: number; life: number; spr: number; col: string; tw: number };
interface Tag { el: HTMLElement; cv: HTMLCanvasElement; plate: Plate; W: number; H: number; M: number; dpr: number; base: HTMLCanvasElement | null; path: Path2D | null; facets: Facet[]; puffs: Puff[]; acc: number; last: number; lx: number; vis: boolean; seed: number }
type Facet = { pts: [number, number][]; n: number; tint: number; hue: number };
const facetPath = (c: CanvasRenderingContext2D, pts: [number, number][]) => { c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.closePath(); };

/** 판 둘레의 여백 — 두께·그림자·밖으로 피어오르는 안개가 들어갈 자리(안개는 판 높이의 한 배 남짓까지 간다) */
const margin = (p: Plate) => (p >= 4 ? 28 : 4);

// ── 빛 — 포인터(데스크톱)·기울기(폰)를 -1..1 로. 모듈에 하나, 태그마다 제 자리로 천천히 따라간다(lx)
const light = { x: 0, y: 0 };
if (typeof window !== 'undefined') {
  addEventListener('pointermove', (e) => { light.x = (e.clientX / innerWidth) * 2 - 1; light.y = (e.clientY / innerHeight) * 2 - 1; }, { passive: true });
  // 폰을 기울이면 빛이 옮겨 간다 — iOS 는 허락을 받아야 이벤트가 와서 안드로이드에서만 도는 셈이고, 안 오면 드리프트만 남는다
  addEventListener('deviceorientation', (e) => { if (e.gamma != null) light.x = clamp(e.gamma / 35, -1, 1); if (e.beta != null) light.y = clamp((e.beta - 40) / 35, -1, 1); }, { passive: true });
}
/** 이 태그에 비치는 빛의 자리(0..1, 왼쪽 위 → 오른쪽 아래) — 천천히 흐르는 드리프트에 포인터·기울기를 얹고, 갑자기 뛰지 않게 프레임마다 조금씩 따라간다 */
function lightAt(t: Tag, now: number) {
  const drift = 0.5 + 0.26 * Math.sin(now / 3800 + (t.seed % 628) / 100);
  const target = clamp(drift + light.x * 0.26 + light.y * 0.08, 0.04, 0.96);
  t.lx = t.lx < 0 ? target : t.lx + (target - t.lx) * 0.1;
  return t.lx;
}

/** 판의 몸 — 얇은 두께(아래로 1px 비낀 옆면)와 가벼운 그림자. 앞면 칠하기는 재질마다 */
function body(c: CanvasRenderingContext2D, path: Path2D, side: string, shadow: string) {
  c.save(); c.shadowColor = shadow; c.shadowBlur = 2.5; c.shadowOffsetY = 1; c.translate(0, 1); c.fillStyle = side; c.fill(path); c.restore();
}
/** 모서리 빛 — 위 가장자리 안쪽에 가는 밝은 선, 아래 안쪽에 가는 그늘, 바깥에 실선 외곽 */
function bevel(c: CanvasRenderingContext2D, path: Path2D, hi: number, lo: number, rim: string) {
  c.save(); c.clip(path); c.lineJoin = 'round'; c.lineWidth = 1.2;
  c.save(); c.translate(0, 0.8); c.strokeStyle = `rgba(255,255,255,${hi})`; c.stroke(path); c.restore();
  c.save(); c.translate(0, -0.8); c.strokeStyle = `rgba(0,0,0,${lo})`; c.stroke(path); c.restore();
  c.restore();
  c.lineWidth = 0.7; c.strokeStyle = rim; c.stroke(path);
}
function vgrad(c: CanvasRenderingContext2D, H: number, stops: [number, string][]) { const g = c.createLinearGradient(0, 0, 0, H); for (const [o, col] of stops) g.addColorStop(o, col); return g; }

/** 금속 헤어라인 — 장치 픽셀 한 줄마다 길이·세기가 다른 밝고 어두운 가는 선. 판마다 닉네임으로 시드를 잡아 다시 그려도 같은 결 */
function hairlines(c: CanvasRenderingContext2D, W: number, H: number, dpr: number, rand: () => number, k: number) {
  const step = 1 / dpr;
  for (let y = 0; y < H; y += step) {
    let x = -rand() * W * 0.5;
    while (x < W) { const len = W * (0.3 + rand() * 0.9), lightLine = rand() < 0.55; c.fillStyle = lightLine ? `rgba(255,255,255,${(0.03 + rand() * 0.09) * k})` : `rgba(0,0,0,${(0.012 + rand() * 0.04) * k})`; c.fillRect(x, y, len, step); x += len + rand() * W * 0.15; }
  }
}
/** 비스듬한 반사 띠 — 조명이 비친 자리. 가운데가 밝고 양옆으로 길게 옅어지며, at(0..1)을 따라 왼쪽 위에서 오른쪽 아래로 옮겨 간다 */
function sheen(c: CanvasRenderingContext2D, W: number, H: number, at: number, a: number, width = 0.26) {
  const g = c.createLinearGradient(0, 0, W, H * 1.4);
  g.addColorStop(Math.max(0, at - width), 'rgba(255,255,255,0)'); g.addColorStop(at, `rgba(255,255,255,${a})`); g.addColorStop(Math.min(1, at + width), 'rgba(255,255,255,0)');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
}

/**
 * 크리스털 커팅면 — 에메랄드 컷(계단식). 판 둘레를 두 단의 계단 면으로 두르고 가운데 넓은 테이블에 글자가 앉는다.
 * 계단 면은 위·오른쪽·아래·왼쪽 사다리꼴로 나뉘어 모서리에서 대각선으로 만나고, 면마다 기울기(n)가 달라 빛이 옮겨 가면 차례로 밝아진다. 몇 면은 옅은 분산광
 */
function makeFacets(W: number, H: number, rand: () => number): Facet[] {
  const x1 = W - H * KNOB, steps = [0, H * 0.13, H * 0.26];
  const R = steps.map((d) => [d, d, x1 - d, H - d]); // [x0, y0, x1, y1]
  const out: Facet[] = []; const f = (pts: [number, number][], n: number) => out.push({ pts, n: n + (rand() - 0.5) * 0.9, tint: rand() < 0.28 ? 0.5 + rand() * 0.5 : 0, hue: rand() * 360 });
  for (let i = 0; i < 2; i++) {
    const [a0, b0, a1, b1] = R[i], [c0, d0, c1, d1] = R[i + 1], k = i * 0.35;
    const mo = (a0 + a1) / 2 + (rand() - 0.5) * (a1 - a0) * 0.3, mi = (c0 + c1) / 2 + (mo - (a0 + a1) / 2) * 0.8;
    f([[a0, b0], [mo, b0], [mi, d0], [c0, d0]], -Math.PI / 2 - 0.5 + k); f([[mo, b0], [a1, b0], [c1, d0], [mi, d0]], -Math.PI / 2 + 0.5 + k);
    f([[a1, b0], [a1, b1], [c1, d1], [c1, d0]], 0 + k);
    f([[a1, b1], [mo, b1], [mi, d1], [c1, d1]], Math.PI / 2 - 0.5 + k); f([[mo, b1], [a0, b1], [c0, d1], [mi, d1]], Math.PI / 2 + 0.5 + k);
    f([[a0, b1], [a0, b0], [c0, d0], [c0, d1]], Math.PI + k);
  }
  return out;
}

// 크리스털·진주빛 태그의 안개 색 — dust.ts 의 PLATE_DUST 와 같은 결(밝은 페이지 위에서 보이게 중간 밝기). grains 는 잔 알갱이 색
const HAZE: Record<4 | 5, { tones: string[]; grains: string[]; rate: number }> = {
  4: { tones: ['80,138,208', '116,172,232', '158,206,246'], grains: ['255,255,255', '150,206,255', '60,130,225'], rate: 13 },
  5: { tones: ['236,110,130', '242,160,70', '228,206,60', '90,196,124', '80,150,230', '168,112,226'], grains: ['255,100,125', '255,180,60', '250,228,70', '80,208,120', '80,150,255', '176,100,255', '255,255,255'], rate: 18 },
};
const HV = 3; // 톤마다 모양 3가지
const hazeSpr: Partial<Record<4 | 5, HTMLCanvasElement[]>> = {};
const hz = (p: 4 | 5, i: number) => (hazeSpr[p] ??= HAZE[p].tones.flatMap((t) => Array.from({ length: HV }, () => noiseSprite(t))))[i];

function hsl(h: number, s: number, l: number) { // → 'r,g,b'
  s /= 100; l /= 100; const k = (n: number) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l), f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `${Math.round(f(0) * 255)},${Math.round(f(8) * 255)},${Math.round(f(4) * 255)}`;
}

// ── 그리기
/** 움직이지 않는 층 — 몸·(금속이면) 앞면·결·모서리. 프레임마다는 그 위에 빛만 얹는다 */
function paintBase(t: Tag) {
  const { W, H, M, dpr, plate } = t, cv = t.base ?? document.createElement('canvas'); t.base = cv;
  cv.width = Math.ceil((W + M * 2) * dpr); cv.height = Math.ceil((H + M * 2) * dpr);
  const c = cv.getContext('2d')!; c.setTransform(dpr, 0, 0, dpr, M * dpr, M * dpr);
  const path = (t.path = platePath(W, H)), rand = rng(t.seed);
  if (plate <= 3) {
    const m = METAL[plate as 1 | 2 | 3];
    body(c, path, m.side, 'rgba(40,24,6,.28)');
    c.save(); c.clip(path); c.fillStyle = vgrad(c, H, m.face); c.fillRect(0, 0, W, H); hairlines(c, W, H, dpr, rand, m.hair); c.restore();
    bevel(c, path, m.hi, m.lo, m.rim);
  } else if (plate === 4) {
    body(c, path, '#8fb0cc', 'rgba(30,60,100,.25)');
    t.facets = makeFacets(W, H, rand);
  } else {
    body(c, path, '#9a8fb4', 'rgba(70,50,110,.25)');
  }
}

/** 한 프레임. now 는 performance.now() */
function paint(t: Tag, now: number) {
  const { W, H, M, dpr, plate, cv } = t; if (!t.base || !t.path) return;
  const c = cv.getContext('2d')!; c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, cv.width, cv.height);
  c.setTransform(dpr, 0, 0, dpr, M * dpr, M * dpr);
  const path = t.path, still = reduced(), at = still ? 0.42 : lightAt(t, now);
  // 안개는 판 뒤(먼저 그려서 판이 덮는다) — 판 앞에 두면 글자·판 위를 안개가 지나 뿌옇다
  if (plate >= 4) haze(c, t, now, still);
  c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(t.base, 0, 0); c.setTransform(dpr, 0, 0, dpr, M * dpr, M * dpr);
  if (plate <= 3) {
    const m = METAL[plate as 1 | 2 | 3];
    c.save(); c.clip(path); sheen(c, W, H, at, m.spec);
    // 금은 이따금 빛이 한 번 판을 스친다(5.2초마다)
    if (plate === 3 && !still) { const u = ((now + (t.seed % 5200)) % 5200) / 900; if (u <= 1) { const x = -H + (W + H * 2) * (u * u * (3 - 2 * u)); const g = c.createLinearGradient(x - H * 0.7, 0, x + H * 0.2, H); g.addColorStop(0, 'rgba(255,246,220,0)'); g.addColorStop(0.5, 'rgba(255,248,226,.32)'); g.addColorStop(1, 'rgba(255,246,220,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); } }
    c.restore(); return;
  }
  if (plate === 4) paintCrystal(c, t, now, at, still); else paintPearl(c, t, now, at, still);
}

/** 크리스털 — 서리 낀 무색 유리. 계단 면이 빛의 자리를 따라 차례로 밝아지고, 몇 면에 옅은 분산광. 채도는 아주 낮게(파란 사탕이 아니라) */
function paintCrystal(c: CanvasRenderingContext2D, t: Tag, now: number, at: number, still: boolean) {
  const { W, H, path } = t as Tag & { path: Path2D };
  const L = -2.4 + at * 3.6 + (still ? 0 : Math.sin(now / 5200) * 0.4); // 빛의 각도 — 반사 띠 자리와 같이 움직인다
  c.save(); c.clip(path);
  c.fillStyle = vgrad(c, H, [[0, '#ffffff'], [0.5, '#dfe9f1'], [1, '#eef4f9']]); c.fillRect(0, 0, W, H);
  for (const f of t.facets) {
    const b = 0.5 + 0.5 * Math.cos(f.n - L), hi = Math.pow(b, 6), lo = Math.pow(1 - b, 1.6);
    facetPath(c, f.pts);
    c.fillStyle = `rgba(70,100,140,${0.06 + lo * 0.22})`; c.fill();
    if (hi > 0.02) { c.fillStyle = `rgba(255,255,255,${hi * 0.8})`; c.fill(); }
    if (f.tint) { c.fillStyle = `rgba(${hsl((f.hue + now / 40) % 360, 80, 72)},${0.16 * f.tint * Math.pow(b, 2.5)})`; c.fill(); }
  }
  const d = H * 0.26, x1 = W - H * KNOB;
  const tg = c.createLinearGradient(0, d, 0, H - d); tg.addColorStop(0, 'rgba(255,255,255,.85)'); tg.addColorStop(1, 'rgba(232,240,247,.85)');
  c.fillStyle = tg; c.fillRect(d, d, x1 - d * 2, H - d * 2);
  c.lineWidth = 0.5; c.strokeStyle = 'rgba(255,255,255,.7)'; for (const f of t.facets) { facetPath(c, f.pts); c.stroke(); }
  c.lineWidth = 0.45; c.strokeStyle = 'rgba(90,120,160,.3)'; for (const f of t.facets) { facetPath(c, f.pts); c.stroke(); }
  sheen(c, W, H, at, 0.4, 0.22);
  c.restore();
  bevel(c, path, 0.9, 0.12, 'rgba(90,125,165,.55)');
}

/** 진주빛 — 흰 진주 바탕에 옅은 이리데슨트(기름막처럼 보는 각도마다 색이 옮겨 간다)와 가는 회절 무늬. 채도는 낮게, 색은 빛의 자리를 따라 흐른다 */
function paintPearl(c: CanvasRenderingContext2D, t: Tag, now: number, at: number, still: boolean) {
  const { W, H, path } = t as Tag & { path: Path2D };
  const h0 = (still ? 0 : now / 55) + at * 140;
  c.save(); c.clip(path);
  c.fillStyle = vgrad(c, H, [[0, '#fbfafd'], [0.5, '#e6e2ee'], [1, '#f3f0f7']]); c.fillRect(0, 0, W, H);
  const g = c.createLinearGradient(0, 0, W, H * 2.2); for (let i = 0; i <= 6; i++) g.addColorStop(i / 6, `rgba(${hsl((h0 + i * 60) % 360, 75, 70)},.42)`);
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.globalAlpha = 0.1; c.strokeStyle = '#fff'; c.lineWidth = 0.6; c.beginPath(); const sh = still ? 0 : (now / 110) % 3.2;
  for (let x = -H + sh; x < W + H; x += 3.2) { c.moveTo(x, 0); c.lineTo(x + H * 0.6, H); } c.stroke(); c.globalAlpha = 1;
  sheen(c, W, H, at, 0.45, 0.24);
  c.restore();
  bevel(c, path, 0.85, 0.12, 'rgba(110,90,150,.5)');
}

/**
 * 판 둘레에서 피어오르는 색 안개 — 판 위 먼지(dust.ts)와 같은 움직임을 작게: 가장자리에서 밖으로 밀리며 부풀고, 살짝 떠오르며 옆으로 흔들리다 옅어진다.
 * 속도는 밑동 쪽에 몰아(거듭제곱) 대부분 판 곁에 머물고 몇몇만 멀리. 잔 알갱이는 색 점으로 튀어 나가며 반짝인다(별 모양은 안 쓴다 — 도식적이다).
 * 초당 rate 개 남짓(판이 길면 조금 더), 프레임 간격에 맞춰 심는다(탭이 숨었다 돌아오면 한꺼번에 쏟지 않게 0.1초까지만)
 */
function haze(c: CanvasRenderingContext2D, t: Tag, now: number, still: boolean) {
  const { W, H } = t, p = t.plate as 4 | 5, D = HAZE[p], x1 = W - H * KNOB;
  if (still) { // 움직임 줄이기 — 안개 두 점만 가만히
    c.globalAlpha = 0.3; for (const [x, y, r, i] of [[W * 0.1, -H * 0.1, H * 0.5, 0], [x1, H * 1.05, H * 0.45, HV + 1]] as const) c.drawImage(hz(p, i % (D.tones.length * HV)), x - r, y - r, r * 2, r * 2); c.globalAlpha = 1; return;
  }
  const dt = t.last ? Math.min(0.1, (now - t.last) / 1000) : 0.016; t.last = now; t.acc += dt * D.rate * (0.8 + Math.min(1.2, W / (H * 5)));
  while (t.acc >= 1) {
    t.acc -= 1;
    // 자리 — 위·아래 변(7할)·홈·톱니 쪽. 바깥쪽 법선을 따라 나간다
    const side = Math.random(); let x: number, y: number, nx: number, ny: number;
    if (side < 0.35) { x = Math.random() * x1; y = 0; nx = 0; ny = -1; } else if (side < 0.7) { x = Math.random() * x1; y = H; nx = 0; ny = 1; }
    else if (side < 0.85) { x = 0; y = H * (0.2 + Math.random() * 0.6); nx = -1; ny = 0; } else { x = W - H * KNOB * 0.4; y = H * (0.25 + Math.random() * 0.5); nx = 1; ny = 0; }
    const grain = Math.random() < 0.45, big = !grain && Math.random() < 0.3, tj = (Math.random() - 0.5) * 1.2;
    const sp = H * (grain ? 0.3 + 0.9 * Math.random() : big ? 0.05 + 0.35 * Math.pow(Math.random(), 1.6) : 0.08 + 0.55 * Math.pow(Math.random(), 1.6));
    const nSpr = D.tones.length * HV;
    t.puffs.push({ grain, x, y, vx: (nx - ny * tj) * sp, vy: (ny + nx * tj) * sp, rise: H * (grain ? 0.15 + 0.35 * Math.random() : 0.08 + 0.3 * Math.random()), wob: H * (0.02 + 0.05 * Math.random()), ph: Math.random() * Math.PI * 2, rot: Math.random() * Math.PI * 2, spin: (Math.random() - 0.5) * 2.4,
      r0: grain ? H * (0.035 + 0.035 * Math.random()) : H * (big ? 0.2 + 0.1 * Math.random() : 0.12 + 0.08 * Math.random()), r1: grain ? H * 0.025 : H * (big ? 0.55 + 0.3 * Math.random() : 0.34 + 0.2 * Math.random()),
      a0: grain ? 0.75 + 0.2 * Math.random() : big ? 0.3 + 0.14 * Math.random() : 0.42 + 0.2 * Math.random(), t0: now, life: grain ? 700 + 700 * Math.random() : big ? 1500 + 900 * Math.random() : 1100 + 800 * Math.random(),
      spr: Math.floor(Math.random() * nSpr), col: D.grains[Math.floor(Math.random() * D.grains.length)], tw: 14 + 14 * Math.random() });
    if (t.puffs.length > 120) t.puffs.splice(0, t.puffs.length - 120);
  }
  let w = 0;
  for (const q of t.puffs) {
    const u = (now - q.t0) / q.life; if (u >= 1) continue; t.puffs[w++] = q;
    const e = 1 - Math.pow(1 - u, 3); // 공기 저항 — 처음에 확 나가고 뒤로 갈수록 멈춘다
    if (q.grain) {
      const x = q.x + q.vx * e + Math.sin(q.ph + u * 5) * q.wob * u, y = q.y + q.vy * e - q.rise * u + q.wob * 4 * u * u, r = q.r0 + (q.r1 - q.r0) * u;
      const tw = 0.3 + 0.7 * Math.abs(Math.sin(q.ph + u * q.tw)); // 면이 빛을 받았다 놓쳤다
      c.fillStyle = `rgba(${q.col},${(q.a0 * (1 - u * u) * tw).toFixed(3)})`; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
      continue;
    }
    const g = 1 - Math.pow(1 - u, 2), x = q.x + q.vx * e + Math.sin(q.ph + u * 6) * q.wob * u, y = q.y + q.vy * e - q.rise * u, r = q.r0 + (q.r1 - q.r0) * g;
    c.globalAlpha = q.a0 * Math.pow(1 - u, 1.6) * Math.min(1, u * 20);
    c.save(); c.translate(x, y); c.rotate(q.rot + q.spin * e); c.drawImage(hz(p, q.spr), -r, -r, r * 2, r * 2); c.restore();
  }
  t.puffs.length = w; c.globalAlpha = 1;
}

// ── 붙이기·크기·돌리기
const tags = new Map<HTMLElement, Tag>();
let raf = 0;
const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver((es) => { for (const e of es) { const t = tags.get(e.target as HTMLElement); if (t) layout(t); } }) : null;
const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver((es) => { for (const e of es) { const t = tags.get(e.target as HTMLElement); if (t) { t.vis = e.isIntersecting; if (t.vis) kick(); } } }) : null;
function layout(t: Tag) {
  const W = t.el.offsetWidth, H = t.el.offsetHeight, dpr = Math.min(3, devicePixelRatio || 1);
  if (!W || !H) return; if (W === t.W && H === t.H && dpr === t.dpr && t.base) return;
  t.W = W; t.H = H; t.dpr = dpr; const M = t.M;
  t.cv.width = Math.ceil((W + M * 2) * dpr); t.cv.height = Math.ceil((H + M * 2) * dpr); t.cv.style.width = `${W + M * 2}px`; t.cv.style.height = `${H + M * 2}px`; t.cv.style.left = t.cv.style.top = `${-M}px`;
  paintBase(t); paint(t, performance.now()); kick();
}
/** 화면에 보이는 태그를 프레임마다 다시 칠한다 — 빛이 흐르므로 모든 판이 대상. 움직임 줄이기면 한 번만 */
function tick(now: number) {
  raf = 0; let any = false;
  for (const [el, t] of tags) {
    if (!el.isConnected) { tags.delete(el); ro?.unobserve(el); io?.unobserve(el); continue; }
    if (!t.vis || !t.base) continue;
    paint(t, now); any = true;
  }
  if (any && !reduced()) raf = requestAnimationFrame(tick);
}
function kick() { if (!raf && !reduced()) raf = requestAnimationFrame(tick); }

/**
 * 닉네임 태그. level 이 10 미만(또는 없음 — 비회원)이면 판 없이 글자만(.ntag 안의 .nt-t — 말줄임은 여기서).
 * dot 을 주면(방에서 그 사람 색) 점을 **판 밖** 왼쪽에 세운 묶음(.ntag-w)을 돌려준다 — 판 안에 넣으면 홈 자리와 겹쳐 보였다
 */
export function nameTag(nick: string, level?: number | null, o: { dot?: string } = {}): HTMLSpanElement {
  const el = tagOnly(nick, level);
  if (!o.dot) return el;
  const w = document.createElement('span'); w.className = 'ntag-w'; const d = document.createElement('i'); d.className = 'nt-dot'; d.style.background = o.dot; w.appendChild(d); w.appendChild(el); return w;
}
function tagOnly(nick: string, level?: number | null): HTMLSpanElement {
  const el = document.createElement('span'); el.className = 'ntag';
  const p = plateOf(level ?? 0) as 0 | Plate;
  const tx = document.createElement('span'); tx.className = 'nt-t'; tx.textContent = nick; el.appendChild(tx);
  if (!p) return el;
  el.dataset.plate = String(p);
  const cv = document.createElement('canvas'); cv.className = 'nt-cv'; cv.setAttribute('aria-hidden', 'true'); el.insertBefore(cv, el.firstChild);
  const t: Tag = { el, cv, plate: p, W: 0, H: 0, M: margin(p), dpr: 1, base: null, path: null, facets: [], puffs: [], acc: 0, last: 0, lx: -1, vis: true, seed: hashStr(`${nick}:${p}`) };
  tags.set(el, t); ro?.observe(el); io?.observe(el);
  requestAnimationFrame(() => layout(t));
  return el;
}
/** el 안을 이 닉네임 태그로 갈아 끼운다 (헤더처럼 자리가 정해진 곳) */
export function putNameTag(box: HTMLElement, nick: string, level?: number | null) { box.textContent = ''; box.appendChild(nameTag(nick, level)); }

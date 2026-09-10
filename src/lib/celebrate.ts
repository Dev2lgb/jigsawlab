// 완성 연출 — 팡파르·딸깍 소리(WebAudio)와 색종이·빛 쓸기(캔버스).
// 판(Jigsaw.astro)과 레벨업·업적 다이얼로그가 같이 쓴다. 소리는 첫 사용자 제스처 뒤에만 난다
let ac: AudioContext | null = null;
const actx = () => { ac ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); return ac; };
export const dpr = () => Math.min(2, window.devicePixelRatio || 1);
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 조각이 제자리에 들어갈 때 나는 딸깍 */
export function click(deep = false) {
  try { const a = actx(), t = a.currentTime, o = a.createOscillator(), gn = a.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(deep ? 520 : 760, t); o.frequency.exponentialRampToValueAtTime(deep ? 180 : 300, t + 0.05);
    gn.gain.setValueAtTime(0.12, t); gn.gain.exponentialRampToValueAtTime(0.0001, t + 0.07); o.connect(gn).connect(a.destination); o.start(t); o.stop(t + 0.08);
  } catch {}
}

/** 판을 다 맞췄을 때. 레벨업·업적과 헷갈리지 않게 이쪽만 느린 아르페지오 + 길게 깔리는 화음 */
export function fanfare() {
  try { const a = actx(), t = a.currentTime;
    const master = a.createGain(); master.gain.value = 0.16; master.connect(a.destination);
    const note = (f: number, at: number, dur: number, type: OscillatorType = 'triangle', vol = 1) => { const o = a.createOscillator(), g = a.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, at + dur); o.connect(g).connect(master); o.start(at); o.stop(at + dur + 0.05); };
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => note(f, t + i * 0.11, 0.5));
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f) => note(f, t + 0.5, 1.6, 'sine', 0.7));
    for (let i = 0; i < 6; i++) note(1568 + Math.random() * 1200, t + 0.7 + i * 0.13, 0.25, 'sine', 0.35);
  } catch {}
}

/**
 * 레벨업 — 완성 팡파르와 헷갈리지 않게 다르게 잡았다. 팡파르가 느린 아르페지오 + 길게 깔리는
 * 화음이라면, 이쪽은 빠르게 치고 올라가는 5음 + 밑에서 같이 미끄러져 올라가는 저음 + 종소리 꼬리
 */
export function levelUp() {
  try { const a = actx(), t = a.currentTime;
    const master = a.createGain(); master.gain.value = 0.14; master.connect(a.destination);
    const note = (f: number, at: number, dur: number, type: OscillatorType = 'triangle', vol = 1) => { const o = a.createOscillator(), g = a.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, at + dur); o.connect(g).connect(master); o.start(at); o.stop(at + dur + 0.05); };
    [392, 523.25, 659.25, 783.99, 1046.5].forEach((f, i) => note(f, t + i * 0.07, 0.22));
    // 밑에서 같이 솟아오르는 소리 — '올랐다' 는 느낌은 거의 이게 만든다
    { const o = a.createOscillator(), g = a.createGain(); o.type = 'sawtooth'; o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(880, t + 0.38); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.25, t + 0.06); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42); o.connect(g).connect(master); o.start(t); o.stop(t + 0.45); }
    [1046.5, 1567.98].forEach((f) => note(f, t + 0.36, 1.1, 'sine', 0.55)); // 종소리 꼬리
  } catch {}
}

/** 업적 하나 — 짧고 높은 반짝임 두 음. 여러 개면 부르는 쪽에서 시차를 준다 */
export function badge() {
  try { const a = actx(), t = a.currentTime;
    const master = a.createGain(); master.gain.value = 0.11; master.connect(a.destination);
    const ding = (f: number, at: number, dur: number, vol: number) => { const o = a.createOscillator(), g = a.createGain(); o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, at + dur); o.connect(g).connect(master); o.start(at); o.stop(at + dur + 0.03); };
    ding(1318.5, t, 0.16, 1); ding(1975.5, t + 0.085, 0.3, 0.8); ding(2637, t + 0.085, 0.22, 0.3);
  } catch {}
}

/** 색종이 + 빛 쓸기. 끝나면 done() */
export function confetti(fx: HTMLCanvasElement, w: number, h: number, done: () => void = () => {}, count = 160) {
  const d = dpr(); fx.width = w * d; fx.height = h * d; const c = fx.getContext('2d'); if (!c) { done(); return; }
  c.scale(d, d);
  const reduce = reduced();
  const cols = ['#14172a', '#f0a71b', '#ff5f8a', '#3ac9a5', '#8da0ff', '#ffd166', '#ffffff'];
  const N = reduce ? 0 : count;
  const ps = Array.from({ length: N }, () => ({ x: Math.random() * w, y: -20 - Math.random() * h * 0.6, vx: (Math.random() - 0.5) * 60, vy: 120 + Math.random() * 220, w: 6 + Math.random() * 8, h: 8 + Math.random() * 10, rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 8, col: cols[Math.floor(Math.random() * cols.length)] }));
  const T0 = performance.now(), DUR = reduce ? 900 : 3000; let last = T0;
  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; const el = now - T0;
    c.clearRect(0, 0, w, h);
    const k = Math.min(1, el / 1100); const sx = -w * 0.6 + w * 2.2 * k;
    const g = c.createLinearGradient(sx, 0, sx + w * 0.5, h); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, `rgba(255,255,255,${0.35 * (1 - k)})`); g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    for (const p of ps) { p.vy += 380 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt; if (p.y > h + 30) continue; c.save(); c.translate(p.x, p.y); c.rotate(p.rot); c.fillStyle = p.col; c.globalAlpha = el > DUR - 600 ? Math.max(0, (DUR - el) / 600) : 1; c.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); c.restore(); }
    if (el < DUR) requestAnimationFrame(frame); else { c.clearRect(0, 0, w, h); done(); }
  };
  requestAnimationFrame(frame);
}

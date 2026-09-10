// 직소 퍼즐 기하 — 격자 계산, 시드 난수, 톱니(탭) 곡선 엣지, 조각 경로·비트맵 렌더. 보드 좌표 단위 = 원본 이미지 픽셀
export interface EdgeParams { a: number; b: number; c: number; d: number; e: number; s: 1 | -1 }
export type Pt = [number, number];
export interface Seg { c1: Pt; c2: Pt; p: Pt }
export interface Edge { start: Pt; segs: Seg[] }
export interface Cut { W: number; H: number; cols: number; rows: number; pw: number; ph: number; padX: number; padY: number; hEdges: Edge[][]; vEdges: Edge[][] }

/** mulberry32 시드 난수 */
export function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export const hashStr = (s: string) => { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };

/** 목표 조각 수와 가로세로 비율로 격자 결정 (열×행 ≈ n) */
export function gridFor(n: number, aspect: number): { cols: number; rows: number } {
  const cols = Math.max(2, Math.round(Math.sqrt(n * aspect))), rows = Math.max(2, Math.round(n / cols));
  return { cols, rows };
}

const T = 0.1, J = 0.04; // 탭 크기(엣지 길이 대비), 흔들림
function edgeParams(rand: () => number): EdgeParams { const r = () => (rand() * 2 - 1) * J; return { a: r(), b: r(), c: r(), d: r(), e: r(), s: rand() < 0.5 ? 1 : -1 }; }
/** 단위 엣지(0→1) 위의 톱니 곡선 3세그먼트 (Draradech 방식). u: 엣지 방향, v: 수직(탭 방향, s 로 부호) */
function tabSegs(p: EdgeParams): [number, number][][] {
  const { a, b, c, d, e, s } = p, t = T;
  return [
    [[0.2, a * s], [0.5 + b + d, (-t + c) * s], [0.5 - t + b, (t + c) * s]],
    [[0.5 - 2 * t + b - d, (3 * t + c) * s], [0.5 + 2 * t + b - d, (3 * t + c) * s], [0.5 + t + b, (t + c) * s]],
    [[0.5 + b + d, (-t + c) * s], [0.8, e * s], [1, 0]],
  ];
}

/** 격자 전체의 엣지 곡선 생성. 가로 엣지 hEdges[r][c]: 행 r 과 r+1 사이(왼→오), 세로 vEdges[r][c]: 열 c 와 c+1 사이(위→아래) */
export function makeCut(W: number, H: number, cols: number, rows: number, rand: () => number): Cut {
  const pw = W / cols, ph = H / rows;
  const hEdges: Edge[][] = [], vEdges: Edge[][] = [];
  for (let r = 0; r < rows - 1; r++) { hEdges[r] = []; for (let c = 0; c < cols; c++) {
    const p = edgeParams(rand), x0 = c * pw, y0 = (r + 1) * ph;
    const map = ([u, v]: [number, number]): Pt => [x0 + u * pw, y0 + v * ph];
    hEdges[r][c] = { start: [x0, y0], segs: tabSegs(p).map(([c1, c2, pt]) => ({ c1: map(c1), c2: map(c2), p: map(pt) })) };
  } }
  for (let r = 0; r < rows; r++) { vEdges[r] = []; for (let c = 0; c < cols - 1; c++) {
    const p = edgeParams(rand), x0 = (c + 1) * pw, y0 = r * ph;
    const map = ([u, v]: [number, number]): Pt => [x0 + v * pw, y0 + u * ph];
    vEdges[r][c] = { start: [x0, y0], segs: tabSegs(p).map(([c1, c2, pt]) => ({ c1: map(c1), c2: map(c2), p: map(pt) })) };
  } }
  return { W, H, cols, rows, pw, ph, padX: pw * 0.36, padY: ph * 0.36, hEdges, vEdges };
}

function fwd(path: Path2D, e: Edge) { for (const s of e.segs) path.bezierCurveTo(s.c1[0], s.c1[1], s.c2[0], s.c2[1], s.p[0], s.p[1]); }
function rev(path: Path2D, e: Edge) { for (let i = e.segs.length - 1; i >= 0; i--) { const s = e.segs[i], prev = i ? e.segs[i - 1].p : e.start; path.bezierCurveTo(s.c2[0], s.c2[1], s.c1[0], s.c1[1], prev[0], prev[1]); } }

/** 조각 (r,c) 의 외곽 경로 — 보드 절대 좌표 */
export function piecePath(cut: Cut, r: number, c: number): Path2D {
  const { pw, ph, cols, rows, hEdges, vEdges } = cut; const x = c * pw, y = r * ph; const p = new Path2D();
  p.moveTo(x, y);
  if (r === 0) p.lineTo(x + pw, y); else fwd(p, hEdges[r - 1][c]);
  if (c === cols - 1) p.lineTo(x + pw, y + ph); else fwd(p, vEdges[r][c]);
  if (r === rows - 1) p.lineTo(x, y + ph); else rev(p, hEdges[r][c]);
  if (c === 0) p.lineTo(x, y); else rev(p, vEdges[r][c - 1]);
  p.closePath(); return p;
}

export interface PieceBitmap { canvas: HTMLCanvasElement; ox: number; oy: number; w: number; h: number }
/** 조각 비트맵(탭 여백 포함). scale = 비트맵 px / 보드 단위. 그릴 때는 (x + ox, y + oy) 에 w×h 로 */
export function renderPiece(cut: Cut, r: number, c: number, img: CanvasImageSource, scale: number): PieceBitmap {
  const { pw, ph, padX, padY } = cut; const w = pw + padX * 2, h = ph + padY * 2, x = c * pw - padX, y = r * ph - padY;
  const cv = document.createElement('canvas'); cv.width = Math.max(1, Math.ceil(w * scale)); cv.height = Math.max(1, Math.ceil(h * scale));
  const ctx = cv.getContext('2d')!; ctx.scale(scale, scale); ctx.translate(-x, -y);
  const path = piecePath(cut, r, c);
  ctx.save(); ctx.clip(path); ctx.drawImage(img, 0, 0, cut.W, cut.H); ctx.restore();
  ctx.lineJoin = 'round'; ctx.lineWidth = 2 / scale; ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.stroke(path);
  ctx.lineWidth = 1 / scale; ctx.strokeStyle = 'rgba(255,255,255,.28)'; ctx.stroke(path);
  return { canvas: cv, ox: -padX, oy: -padY, w, h };
}

/** 내장 명화 (퍼블릭 도메인). 오늘의 퍼즐은 날짜로 하나 고름 */
export interface Painting { key: string; artist: [string, string, string]; title: [string, string, string]; year: string }
export const PAINTINGS: Painting[] = [
  { key: 'starry', artist: ['빈센트 반 고흐', 'Vincent van Gogh', 'フィンセント・ファン・ゴッホ'], title: ['별이 빛나는 밤', 'The Starry Night', '星月夜'], year: '1889' },
  { key: 'wave', artist: ['가쓰시카 호쿠사이', 'Katsushika Hokusai', '葛飾北斎'], title: ['가나가와 해변의 높은 파도 아래', 'The Great Wave off Kanagawa', '神奈川沖浪裏'], year: '1831' },
  { key: 'pearl', artist: ['요하네스 페르메이르', 'Johannes Vermeer', 'ヨハネス・フェルメール'], title: ['진주 귀걸이를 한 소녀', 'Girl with a Pearl Earring', '真珠の耳飾りの少女'], year: '1665' },
  { key: 'kiss', artist: ['구스타프 클림트', 'Gustav Klimt', 'グスタフ・クリムト'], title: ['키스', 'The Kiss', '接吻'], year: '1908' },
  { key: 'lilies', artist: ['클로드 모네', 'Claude Monet', 'クロード・モネ'], title: ['수련', 'Water Lilies', '睡蓮'], year: '1906' },
  { key: 'dano', artist: ['신윤복', 'Shin Yun-bok', '申潤福'], title: ['단오풍정', 'Scenery on Dano Day', '端午風情'], year: '18C' },
  { key: 'ssireum', artist: ['김홍도', 'Kim Hong-do', '金弘道'], title: ['씨름', 'Ssireum (Wrestling)', '相撲（シルム）'], year: '18C' },
  { key: 'mudong', artist: ['김홍도', 'Kim Hong-do', '金弘道'], title: ['무동', 'Mudong (Dancing Boy)', '舞童'], year: '18C' },
  { key: 'mona', artist: ['레오나르도 다빈치', 'Leonardo da Vinci', 'レオナルド・ダ・ヴィンチ'], title: ['모나리자', 'Mona Lisa', 'モナ・リザ'], year: '1503' },
  { key: 'ermine', artist: ['레오나르도 다빈치', 'Leonardo da Vinci', 'レオナルド・ダ・ヴィンチ'], title: ['흰 족제비를 안은 여인', 'Lady with an Ermine', '白貂を抱く貴婦人'], year: '1490' },
  { key: 'venus', artist: ['산드로 보티첼리', 'Sandro Botticelli', 'サンドロ・ボッティチェリ'], title: ['비너스의 탄생', 'The Birth of Venus', 'ヴィーナスの誕生'], year: '1485' },
  { key: 'hunters', artist: ['피터르 브뤼헐', 'Pieter Bruegel the Elder', 'ピーテル・ブリューゲル'], title: ['눈 속의 사냥꾼', 'The Hunters in the Snow', '雪中の狩人'], year: '1565' },
  { key: 'milkmaid', artist: ['요하네스 페르메이르', 'Johannes Vermeer', 'ヨハネス・フェルメール'], title: ['우유를 따르는 여인', 'The Milkmaid', '牛乳を注ぐ女'], year: '1658' },
  { key: 'gleaners', artist: ['장 프랑수아 밀레', 'Jean-François Millet', 'ジャン＝フランソワ・ミレー'], title: ['이삭 줍는 여인들', 'The Gleaners', '落穂拾い'], year: '1857' },
  { key: 'sunrise', artist: ['클로드 모네', 'Claude Monet', 'クロード・モネ'], title: ['인상, 해돋이', 'Impression, Sunrise', '印象・日の出'], year: '1872' },
  { key: 'galette', artist: ['피에르 오귀스트 르누아르', 'Pierre-Auguste Renoir', 'ピエール＝オーギュスト・ルノワール'], title: ['물랭 드 라 갈레트의 무도회', 'Bal du moulin de la Galette', 'ムーラン・ド・ラ・ギャレットの舞踏会'], year: '1876' },
  { key: 'jatte', artist: ['조르주 쇠라', 'Georges Seurat', 'ジョルジュ・スーラ'], title: ['그랑드자트섬의 일요일 오후', 'A Sunday on La Grande Jatte', 'グランド・ジャット島の日曜日の午後'], year: '1884' },
  { key: 'almond', artist: ['빈센트 반 고흐', 'Vincent van Gogh', 'フィンセント・ファン・ゴッホ'], title: ['꽃 피는 아몬드 나무', 'Almond Blossom', '花咲くアーモンドの木の枝'], year: '1890' },
  { key: 'scream', artist: ['에드바르 뭉크', 'Edvard Munch', 'エドヴァルド・ムンク'], title: ['절규', 'The Scream', '叫び'], year: '1893' },
  { key: 'kandinsky', artist: ['바실리 칸딘스키', 'Wassily Kandinsky', 'ワシリー・カンディンスキー'], title: ['구성 8', 'Composition VIII', 'コンポジションVIII'], year: '1923' },
  { key: 'redfuji', artist: ['가쓰시카 호쿠사이', 'Katsushika Hokusai', '葛飾北斎'], title: ['개풍쾌청 (붉은 후지)', 'Fine Wind, Clear Morning (Red Fuji)', '凱風快晴'], year: '1831' },
  { key: 'shower', artist: ['우타가와 히로시게', 'Utagawa Hiroshige', '歌川広重'], title: ['오하시 아타케의 소나기', 'Sudden Shower over Shin-Ōhashi Bridge and Atake', '大はしあたけの夕立'], year: '1857' },
];
export const DAILY_PIECES = 48;
/** 상설 공개 판 — 사이트가 굴리는 방 하나. 방 id·조각 수는 서버(room.ts)·판(Jigsaw)·랜딩(/together/)이 같이 쓴다 */
export const LIVE_ID = 'live';
export const LIVE_PIECES = 1000;
/** KST 날짜 문자열과 그날의 퍼즐(명화·시드) */
export function todayKST(): string { return new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10); }
export function dailyPick(day: string, available: Painting[]) { const h = hashStr('jigsaw:' + day); return { painting: available[h % available.length], seed: h }; }

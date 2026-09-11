// en — 판·고르는 화면 문구 + SEO 본문. 모양은 ko.ts 의 JigsawStrings 를 따른다
import type { JigsawStrings } from './ko';
export const EN: JigsawStrings = {
  title: 'What shall we solve?', sub: "Today's puzzle, your own photo, or one from below.",
  seoTitle: 'Free online jigsaw puzzles — 423 to choose from', boardTitle: 'Puzzle board', seoDesc: 'Play free jigsaw puzzles online, no sign-up. 423 paintings, Korean art and space photos — or your own picture. 48 to 1000 pieces. Solve with a friend from one link.',
  pick: 'Choose my photo', drop: 'Drop a photo here or tap to choose', daily: "Today's puzzle", dailyCap: (title: string, n: number) => `${title} · ${n} pieces`, pieces: 'Pieces', custom: 'Custom', gridLabel: (c: number, r: number, n: number) => `${c}×${r} = ${n} pieces`, noImg: 'Choose a photo or a painting first', chosen: 'Selected picture', myPhoto: 'My photo',
  start: 'Start', privacy: 'Your photo never leaves your device', loading: 'Cutting pieces…', opening: 'Opening the puzzle…', saveGone: 'That saved puzzle is gone',
  moves: 'Placed', left: (n: number) => `${n} pieces left`, edgeOnly: 'Edge pieces only', hint: 'Ghost image', original: 'Show the picture (hold)', trayHint: 'Drag pieces up from the tray into place. Pinch to zoom, two fingers to pan',
  done: 'Complete!', resTime: 'Time', resPieces: 'Pieces', resMoves: 'Placements', best: (s: string) => `Your best: ${s}`, newBest: 'New record!', retry: 'Same photo again', another: 'Another puzzle', toTitle: 'Back to start',
  share: 'Share result', shareTitle: (n: number, t: string) => `Finished a ${n}-piece jigsaw in ${t}! 🧩`, shareText: 'Your turn 🧩', shareDaily: (n: number, t: string, title: string) => `Today's puzzle "${title}", ${n} pieces in ${t}! 🧩 Can you beat it?`,
  imgFail: "Couldn't open that image. Please use a JPG, PNG or HEIC photo", paintingBy: (t: string, a: string, y: string) => `${t} — ${a}, ${y}`,
};

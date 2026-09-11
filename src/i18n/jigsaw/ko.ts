// 한국어 — 판·고르는 화면 문구 + SEO 본문. 이 파일이 기준 모양이다.
// 다른 언어는 JigsawStrings 로 묶여 있어 키가 빠지면 astro check 가 잡는다
export const KO = {
  title: '뭘 맞춰볼까요?', sub: '오늘의 퍼즐, 내 사진, 아니면 아래에서 하나.',
  // title/sub 는 화면에 보이는 문구, seoTitle/seoDesc 는 <title>·description 전용
  seoTitle: '무료 온라인 직소퍼즐 423점 맞추기', boardTitle: '퍼즐 맞추는 중', seoDesc: '가입 없이 바로 시작하는 무료 직소 퍼즐. 명화·한국 회화·우주 사진 423점과 내 사진으로, 48조각부터 1000조각까지. 링크 하나로 친구랑 같이 맞춰요.',
  pick: '내 사진 고르기', drop: '눌러서 고르거나 여기에 끌어다 놓기', daily: '오늘의 퍼즐', dailyCap: (title: string, n: number) => `${title} · ${n}조각`, pieces: '조각 수', custom: '직접 입력', gridLabel: (c: number, r: number, n: number) => `${c}×${r} = ${n}조각`, noImg: '먼저 그림을 골라 주세요', chosen: '선택한 그림', myPhoto: '내 사진',
  start: '시작', privacy: '사진은 폰 밖으로 나가지 않아요', loading: '조각 자르는 중…', opening: '퍼즐 여는 중…', saveGone: '저장된 퍼즐이 없어요',
  moves: '놓은 횟수', left: (n: number) => `남은 조각 ${n}`, edgeOnly: '테두리 조각만', hint: '밑그림', original: '원본 그림 보기', trayHint: '조각을 위로 끌어 올려 놓기',
  done: '완성!', resTime: '걸린 시간', resPieces: '조각', resMoves: '놓은 횟수', best: (s: string) => `내 최고 기록 ${s}`, newBest: '새 기록!', retry: '한 번 더', another: '다른 퍼즐', toTitle: '처음으로',
  share: '결과 공유', shareTitle: (n: number, t: string) => `직소 퍼즐 ${n}조각을 ${t}에 완성! 🧩`, shareText: '너도 해봐 🧩', shareDaily: (n: number, t: string, title: string) => `오늘의 퍼즐 「${title}」 ${n}조각을 ${t}에 완성! 🧩 넌?`,
  imgFail: '이 사진은 못 열었어요. 다른 사진으로 해볼까요?', paintingBy: (t: string, a: string, y: string) => `${t} — ${a}, ${y}`,
};

/** 언어팩의 기준 모양 */
export type JigsawStrings = typeof KO;

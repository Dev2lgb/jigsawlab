// 업적·레벨 구간 문구 (ko / en / ja). 코드와 조건은 lib/level.ts
export type Tri = [string, string, string];

/** 레벨 구간 이름 — lib/level.ts 의 TIERS(1·5·10·20·30·45·60) 와 같은 순서 */
export const TIER_NAMES: Tri[] = [
  ['퍼즐 입문', 'Newcomer', 'はじめて'],
  ['퍼즐러', 'Puzzler', 'パズラー'],
  ['조각 사냥꾼', 'Piece Hunter', 'ピースハンター'],
  ['판의 달인', 'Board Master', '盤の達人'],
  ['직소 장인', 'Jigsaw Artisan', 'ジグソー職人'],
  ['직소 명인', 'Jigsaw Virtuoso', 'ジグソー名人'],
  ['직소랩 마스터', 'jigsawlab Master', 'ジグソーラボ・マスター'],
];

export const BADGE_TEXT: Record<string, { n: Tri; d: Tri }> = {
  first: { n: ['첫 조각', 'First Piece', 'はじめの一片'], d: ['퍼즐 한 판을 끝까지 맞췄어요', 'Finish your first puzzle', 'パズルを1枚完成させる'] },
  solve10: { n: ['열 판', 'Ten Boards', '10枚'], d: ['퍼즐 10판 완성', 'Finish 10 puzzles', 'パズルを10枚完成させる'] },
  solve50: { n: ['쉰 판', 'Fifty Boards', '50枚'], d: ['퍼즐 50판 완성', 'Finish 50 puzzles', 'パズルを50枚完成させる'] },
  solve100: { n: ['백 판', 'A Hundred Boards', '100枚'], d: ['퍼즐 100판 완성', 'Finish 100 puzzles', 'パズルを100枚完成させる'] },
  solve500: { n: ['오백 판', 'Five Hundred', '500枚'], d: ['퍼즐 500판 완성', 'Finish 500 puzzles', 'パズルを500枚完成させる'] },
  p300: { n: ['300조각', '300 Pieces', '300ピース'], d: ['한 판에서 300조각 이상', 'Finish a 300-piece board', '1枚で300ピース以上'] },
  p500: { n: ['500조각', '500 Pieces', '500ピース'], d: ['한 판에서 500조각 이상', 'Finish a 500-piece board', '1枚で500ピース以上'] },
  p1000: { n: ['1000조각', '1000 Pieces', '1000ピース'], d: ['한 판에서 1000조각 이상', 'Finish a 1000-piece board', '1枚で1000ピース以上'] },
  p2000: { n: ['2000조각', '2000 Pieces', '2000ピース'], d: ['한 판에서 2000조각', 'Finish a 2000-piece board', '1枚で2000ピース'] },
  pieces10k: { n: ['조각 1만 개', '10,000 Pieces', '1万ピース'], d: ['제자리에 놓은 조각 1만 개', 'Place 10,000 pieces in total', '合計1万ピースをはめる'] },
  pieces100k: { n: ['조각 10만 개', '100,000 Pieces', '10万ピース'], d: ['제자리에 놓은 조각 10만 개', 'Place 100,000 pieces in total', '合計10万ピースをはめる'] },
  daily7: { n: ['일주일 연속', 'Seven-Day Streak', '7日連続'], d: ['오늘의 퍼즐 7일 연속 완주', 'Finish the daily puzzle 7 days in a row', '今日のパズルを7日連続'] },
  daily30: { n: ['한 달 연속', 'Thirty-Day Streak', '30日連続'], d: ['오늘의 퍼즐 30일 연속 완주', 'Finish the daily puzzle 30 days in a row', '今日のパズルを30日連続'] },
  daily100: { n: ['오늘의 퍼즐 100번', '100 Dailies', '今日のパズル100回'], d: ['오늘의 퍼즐 100판 완성', 'Finish 100 daily puzzles', '今日のパズルを100枚完成'] },
  works50: { n: ['그림 50점', '50 Pictures', '50点'], d: ['서로 다른 그림 50점 완성', 'Finish 50 different pictures', '異なる絵を50点完成'] },
  works150: { n: ['그림 150점', '150 Pictures', '150点'], d: ['서로 다른 그림 150점 완성', 'Finish 150 different pictures', '異なる絵を150点完成'] },
  worksAll: { n: ['전작 완주', 'Every Picture', '全作品制覇'], d: ['진열대의 모든 그림 완성', 'Finish every picture in the gallery', '陳列棚のすべての絵を完成'] },
  shelf1: { n: ['진열대 하나', 'A Full Shelf', '棚ひとつ'], d: ['한 진열대의 그림을 전부 완성', 'Clear an entire shelf', '棚ひとつを丸ごと完成'] },
  shelf5: { n: ['진열대 다섯', 'Five Full Shelves', '棚5つ'], d: ['다섯 진열대를 전부 완성', 'Clear five entire shelves', '棚5つを丸ごと完成'] },
  photo1: { n: ['내 사진으로', 'Your Own Photo', '自分の写真で'], d: ['내 사진으로 만든 퍼즐 완성', 'Finish a puzzle made from your photo', '自分の写真のパズルを完成'] },
  room1: { n: ['친구랑 같이', 'With a Friend', '友だちと'], d: ['초대 방에서 한 판 완성', 'Finish a board in an invite room', '招待部屋で1枚完成'] },
  live1: { n: ['모두의 퍼즐', 'The Open Board', 'みんなのパズル'], d: ['모두의 퍼즐 한 회차에 조각을 보탬', 'Help finish a round of the open board', 'みんなのパズルにピースを足す'] },
  night5: { n: ['새벽 퍼즐', 'Night Owl', '夜ふかし'], d: ['새벽 0~5시에 5판 완성', 'Finish 5 boards between midnight and 5am', '0〜5時に5枚完成'] },
  fast1: { n: ['빠른 손', 'Quick Hands', '早業'], d: ['300조각 이상을 조각당 2초 안에', 'Average under 2s per piece on 300+ pieces', '300ピース以上を1ピース2秒以内で'] },
};

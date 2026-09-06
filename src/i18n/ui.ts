export type Lang = 'ko' | 'en' | 'ja';
export const LANGS: Lang[] = ['ko', 'en', 'ja'];
export const LI = { ko: 0, en: 1, ja: 2 } as const;
export const prefix = (l: Lang) => (l === 'ko' ? '' : `/${l}`);
export const langOf = (pathname: string): Lang => (pathname.startsWith('/en') ? 'en' : pathname.startsWith('/ja') ? 'ja' : 'ko');
export const UI = {
  ko: {
    name: 'jigsawlab', tagline: '사진 한 장이 직소 퍼즐이 되는 곳', langName: '한국어',
    nav: { daily: '오늘의 퍼즐', catalog: '퍼즐 상자', photo: '내 사진으로', play: '지금 맞추기', about: '소개' },
    hero: { today: '오늘의 그림', pieces: (n: number) => `${n}조각`, solved: (n: number) => (n ? `오늘 ${n}명이 완성했어요` : ''), fastest: (t: string) => `가장 빠른 기록 ${t}`, cta: '오늘의 퍼즐 맞추기', photo: '내 사진으로 만들기', sameForAll: '', h1: '제대로 된 직소 퍼즐,\n폰에서도.', sub: '맞는 조각끼리 붙어서 뭉치로 움직이고, 색깔별로 더미를 나누고, 하던 판은 저장돼요. 판 위에 광고는 안 띄워요.', feats: ['🧩 조각끼리 붙어요', '🎨 색깔별 더미', '💾 하던 판 저장', '🔢 1000조각까지', '📷 내 사진도'], pick: '상자 고르기', todayLink: (t: string) => `오늘의 그림 · ${t} · 같이 맞추기` },
    how: { title: '이렇게 놀아요', steps: [['상자 하나 열기', '마음에 드는 그림을 고르거나, 내 사진을 골라요.'], ['조각 수 정하기', '48조각으로 가볍게, 1000조각으로 제대로.'], ['끌어 올려 끼우기', '트레이에서 조각을 올려 놓으면 딸깍. 맞는 조각끼리는 붙어서 같이 움직여요.']] },
    catalog: { title: '퍼즐 상자', sub: '', all: (n: number) => `모두 ${n}점`, search: '제목·작가 검색', results: (n: number) => `${n}점`, none: '검색 결과가 없어요', fav: '즐겨찾기', favAdd: '즐겨찾기에 추가', favRemove: '즐겨찾기에서 빼기' },
    photo: { title: '내 사진으로 만들기', body: '가족사진도, 여행 사진도, 아이가 그린 그림도. 사진은 폰 밖으로 나가지 않아요.', cta: '사진 고르기' },
    rank: { title: '오늘의 퍼즐 랭킹', sub: '자정에 새 그림이 걸려요', empty: '아직 완성한 사람이 없어요. 첫 번째가 되어 보세요.', fail: '랭킹을 불러오지 못했어요', total: (n: number) => `오늘 ${n}명 완성`, more: '오늘의 퍼즐 맞추기' },
    detail: { open: '이 그림으로 맞추기', pieces: '몇 조각으로 할까요?', best: (t: string) => `내 최고 기록 ${t}`, noBest: '아직 기록이 없어요', museum: '소장', year: '제작', medium: '재료', source: '작품 정보 (시카고 미술관)', more: '옆에 있던 상자들', back: '상자들', startDaily: '시작', gridOf: (c: number, r: number) => `${c}×${r}` },
    play: { resume: '이어하기', resumeTitle: '하던 퍼즐', resumeHint: (pct: number, t: string) => `${pct}% 완성 · ${t}`, startOver: '처음부터', restartAsk: '지금 판을 지우고 처음부터 할까요?', saved: '저장됨', piles: '더미', pileAll: '전체', pileEdge: '테두리', pileNew: '+ 더미', pileName: (n: number) => `더미 ${n}`, sortColor: '색상순', shuffle: '섞기', outline: '조각 윤곽선', dropHere: '여기에 놓기', toPile: (n: string) => `${n}(으)로 옮김`, streak: (n: number) => `${n}일 연속 완주`, past: '지난 오늘의 퍼즐', done: '완성', notYet: '아직', today: '오늘' },
    guide: '가이드',
    about: { title: 'jigsawlab', lead: '실물 퍼즐 하던 손맛 그대로, 폰에서도. 가입 없이, 사진은 폰 밖으로 안 나가고, 판 위엔 광고가 없어요.', points: [['조각끼리 붙어요', '맞는 조각을 맞대면 딸깍 붙고, 뭉치째 움직여요. 1000조각도 그렇게 끝까지.'], ['하던 판은 저장', '나갔다 와도 그대로. 더미 나눠둔 것, 정렬해둔 순서까지.'], ['내 사진, 내 폰 안에서', '사진은 서버로 안 가요. 가족 사진도 마음 놓고.'], ['명화 226점', '고흐, 모네, 호쿠사이, 김홍도, 모리스. 상자를 열면 그림 이야기도 있어요.']], guide: '자세히' },
    foot: { privacy: '개인정보처리방침', madeBy: '캔통이 만들었어요', rights: '그림은 모두 퍼블릭 도메인입니다', copied: '링크를 복사했어요', shareFail: '공유가 안 됐어요', privacyTitle: '개인정보처리방침', toHome: '홈으로' },
  },
  en: {
    name: 'jigsawlab', tagline: 'Where one photo becomes a jigsaw', langName: 'English',
    nav: { daily: "Today's puzzle", catalog: 'Puzzle boxes', photo: 'Your photo', play: 'Play now', about: 'About' },
    hero: { today: "Today's picture", pieces: (n: number) => `${n} pieces`, solved: (n: number) => (n ? `${n} people finished it today` : ''), fastest: (t: string) => `Fastest time ${t}`, cta: "Solve today's puzzle", photo: 'Make one from my photo', sameForAll: '', h1: 'A real jigsaw,\non your phone.', sub: 'Pieces that fit snap together and move as a cluster, sort into piles by colour, and your board is saved when you leave. No ads on the board, ever.', feats: ['🧩 Pieces snap together', '🎨 Piles by colour', '💾 Progress saved', '🔢 Up to 1000 pieces', '📷 Your own photos'], pick: 'Pick a box', todayLink: (t: string) => `Today's picture · ${t} · solve it together` },
    how: { title: 'How to play', steps: [['Open a box', 'Pick a painting you like, or one of your own photos.'], ['Choose a piece count', '48 for a quick one, 1000 for the real thing.'], ['Drag up and snap', 'Pull a piece up from the tray and drop it. Matching pieces click together and move as one.']] },
    catalog: { title: 'Puzzle boxes', sub: '', all: (n: number) => `${n} puzzles`, search: 'Search title or artist', results: (n: number) => `${n} puzzles`, none: 'No matches', fav: 'Favourites', favAdd: 'Add to favourites', favRemove: 'Remove from favourites' },
    photo: { title: 'Make one from your photo', body: 'Family photos, holidays, a kid\'s drawing. Your photo never leaves your phone.', cta: 'Choose a photo' },
    rank: { title: "Today's leaderboard", sub: 'A new picture at midnight KST', empty: 'Nobody has finished yet. Be the first.', fail: "Couldn't load the leaderboard", total: (n: number) => `${n} finished today`, more: "Solve today's puzzle" },
    detail: { open: 'Solve this painting', pieces: 'How many pieces?', best: (t: string) => `Your best ${t}`, noBest: 'No record yet', museum: 'Collection', year: 'Painted', medium: 'Medium', source: 'Object record (Art Institute of Chicago)', more: 'Boxes next to it', back: 'Boxes', startDaily: 'start', gridOf: (c: number, r: number) => `${c}×${r}` },
    play: { resume: 'Continue', resumeTitle: 'Puzzle in progress', resumeHint: (pct: number, t: string) => `${pct}% done · ${t}`, startOver: 'Start over', restartAsk: 'Clear this board and start over?', saved: 'Saved', piles: 'Piles', pileAll: 'All', pileEdge: 'Edges', pileNew: '+ Pile', pileName: (n: number) => `Pile ${n}`, sortColor: 'By colour', shuffle: 'Shuffle', outline: 'Piece outlines', dropHere: 'Drop here', toPile: (n: string) => `Moved to ${n}`, streak: (n: number) => `${n}-day streak`, past: 'Past daily puzzles', done: 'Done', notYet: 'Not yet', today: 'Today' },
    guide: 'Guide',
    about: { title: 'jigsawlab', lead: 'The feel of a real jigsaw, on your phone. No sign-up, your photo stays on your device, and no ads on the board.', points: [['Pieces snap together', 'Put matching pieces side by side and they click, then move as one cluster. That is how you finish 1000 pieces.'], ['Your board is saved', 'Leave and come back: piles, sort order, everything is where you left it.'], ['Your photo, on your phone', 'Photos never go to a server. Family pictures are safe.'], ['226 masterpieces', 'Van Gogh, Monet, Hokusai, Kim Hong-do, Morris. Open a box and read the story too.']], guide: 'More' },
    foot: { privacy: 'Privacy', madeBy: 'Made by Cantong', rights: 'All paintings are in the public domain', copied: 'Link copied', shareFail: "Couldn't share", privacyTitle: 'Privacy policy', toHome: 'Home' },
  },
  ja: {
    name: 'jigsawlab', tagline: '写真一枚がジグソーパズルになる場所', langName: '日本語',
    nav: { daily: '今日のパズル', catalog: 'パズルの箱', photo: '自分の写真で', play: '今すぐ遊ぶ', about: 'サイトについて' },
    hero: { today: '今日の絵', pieces: (n: number) => `${n}ピース`, solved: (n: number) => (n ? `今日 ${n}人が完成` : ''), fastest: (t: string) => `最速タイム ${t}`, cta: '今日のパズルを解く', photo: '自分の写真で作る', sameForAll: '', h1: '本物のジグソーを、\nスマホでも。', sub: '合うピースはくっついて塊で動き、色ごとに山に分け、途中の盤面は保存されます。盤の上に広告は出しません。', feats: ['🧩 ピースがくっつく', '🎨 色ごとの山', '💾 途中保存', '🔢 1000ピースまで', '📷 自分の写真も'], pick: '箱を選ぶ', todayLink: (t: string) => `今日の絵 · ${t} · 一緒に組む` },
    how: { title: '遊び方', steps: [['箱を開く', '好きな絵を選ぶか、自分の写真を。'], ['ピース数を決める', '48で軽く、1000で本格的に。'], ['引き上げてはめる', 'トレイからピースを上げて置くとカチッ。合うピース同士はくっついて一緒に動きます。']] },
    catalog: { title: 'パズルの箱', sub: '', all: (n: number) => `全${n}点`, search: '題名・作家で検索', results: (n: number) => `${n}点`, none: '該当なし', fav: 'お気に入り', favAdd: 'お気に入りに追加', favRemove: 'お気に入りから外す' },
    photo: { title: '自分の写真で作る', body: '家族写真も、旅の写真も、子どもの絵も。写真は端末の外に出ません。', cta: '写真を選ぶ' },
    rank: { title: '今日のランキング', sub: '0時に新しい絵に変わります', empty: 'まだ完成した人がいません。最初の一人に。', fail: 'ランキングを読み込めませんでした', total: (n: number) => `今日 ${n}人完成`, more: '今日のパズルを解く' },
    detail: { open: 'この絵で遊ぶ', pieces: '何ピースにしますか？', best: (t: string) => `自己ベスト ${t}`, noBest: 'まだ記録がありません', museum: '所蔵', year: '制作', medium: '素材', source: '作品情報（シカゴ美術館）', more: '隣にあった箱', back: '箱一覧', startDaily: 'を始める', gridOf: (c: number, r: number) => `${c}×${r}` },
    play: { resume: '続きから', resumeTitle: '途中のパズル', resumeHint: (pct: number, t: string) => `${pct}% 完成 · ${t}`, startOver: '最初から', restartAsk: 'この盤面を消して最初からやり直しますか？', saved: '保存済み', piles: '山', pileAll: '全部', pileEdge: '縁', pileNew: '+ 山', pileName: (n: number) => `山 ${n}`, sortColor: '色順', shuffle: 'シャッフル', outline: 'ピースの輪郭', dropHere: 'ここに置く', toPile: (n: string) => `${n}へ移動`, streak: (n: number) => `${n}日連続完成`, past: '過去の今日のパズル', done: '完成', notYet: 'まだ', today: '今日' },
    guide: 'ガイド',
    about: { title: 'jigsawlab', lead: '本物のジグソーの手ざわりを、スマホでも。登録不要、写真は端末の外に出ず、盤の上に広告はありません。', points: [['ピースがくっつく', '合うピースを並べるとカチッとくっつき、塊ごと動きます。1000ピースもそうやって最後まで。'], ['途中の盤面は保存', '離れて戻ってもそのまま。分けた山も、並べた順番も。'], ['写真は端末の中だけ', 'サーバーには送りません。家族写真も安心。'], ['名画226点', 'ゴッホ、モネ、北斎、金弘道、モリス。箱を開くと絵の話もあります。']], guide: 'くわしく' },
    foot: { privacy: 'プライバシー', madeBy: 'Cantong が作りました', rights: '絵はすべてパブリックドメインです', copied: 'リンクをコピーしました', shareFail: '共有できませんでした', privacyTitle: 'プライバシーポリシー', toHome: 'ホームへ' },
  },
} as const;

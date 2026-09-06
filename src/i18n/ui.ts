export type Lang = 'ko' | 'en' | 'ja';
export const LANGS: Lang[] = ['ko', 'en', 'ja'];
export const LI = { ko: 0, en: 1, ja: 2 } as const;
export const prefix = (l: Lang) => (l === 'ko' ? '' : `/${l}`);
export const langOf = (pathname: string): Lang => (pathname.startsWith('/en') ? 'en' : pathname.startsWith('/ja') ? 'ja' : 'ko');
export const UI = {
  ko: {
    name: 'jigsawlab', tagline: '사진 한 장이 직소 퍼즐이 되는 곳', langName: '한국어',
    nav: { daily: '오늘의 퍼즐', catalog: '퍼즐 상자', photo: '내 사진으로', play: '지금 맞추기', about: '소개' },
    hero: { today: '오늘의 퍼즐', pieces: (n: number) => `${n}조각`, solved: (n: number) => (n ? `오늘 ${n}명이 완성했어요` : '오늘 첫 완성자가 되어 보세요'), fastest: (t: string) => `가장 빠른 기록 ${t}`, cta: '오늘의 퍼즐 맞추기', photo: '내 사진으로 만들기', sameForAll: '오늘 방문한 모든 사람이 같은 컷을 맞춥니다. 시간을 겨루어 보세요.' },
    how: { title: '이렇게 합니다', steps: [['그림 고르기', '명화 상자에서 하나를 고르거나 내 사진을 올립니다. 사진은 브라우저 안에서만 잘리고 어디에도 전송되지 않습니다.'], ['조각 수 정하기', '12조각 가벼운 판부터 300조각까지. 사진 비율에 맞춰 격자를 계산하고 톱니 모양은 매번 새로 나옵니다.'], ['끌어 올려 끼우기', '아래 트레이에서 조각을 위로 끌어 판에 놓습니다. 제자리 근처에 오면 딸깍 잠기고, 폰에서는 두 손가락으로 확대합니다.']] },
    catalog: { title: '퍼즐 상자', sub: '퍼블릭 도메인 명화를 상자처럼 진열했습니다. 상자를 열면 그림 이야기와 조각 수를 고를 수 있어요.', all: (n: number) => `모두 ${n}점` },
    photo: { title: '내 사진으로 만들기', body: '가족사진, 여행 사진, 아이 그림. 어떤 사진이든 원하는 조각 수의 직소 퍼즐이 됩니다. 사진은 기기 밖으로 나가지 않아요.', cta: '사진 고르기' },
    rank: { title: '오늘의 퍼즐 랭킹', sub: '기기당 최고 기록 1건 · 자정(KST)에 새 퍼즐', empty: '아직 완성한 사람이 없어요. 첫 번째가 되어 보세요.', fail: '랭킹을 불러오지 못했어요', total: (n: number) => `오늘 ${n}명 완성`, more: '오늘의 퍼즐 맞추기' },
    detail: { open: '이 그림으로 맞추기', pieces: '조각 수를 고르세요', best: (t: string) => `내 최고 기록 ${t}`, noBest: '아직 기록이 없어요', museum: '소장', year: '제작', medium: '재료', source: '작품 정보 (시카고 미술관)', more: '같은 진열대의 다른 상자', back: '퍼즐 목록으로', gridOf: (c: number, r: number) => `${c}×${r}` },
    guide: '가이드',
    about: { title: 'jigsawlab 소개', lead: '사진 한 장을 고르면 톱니가 맞물리는 진짜 직소 퍼즐이 됩니다. 회원가입 없이, 사진은 기기 밖으로 나가지 않고, 매일 하나의 퍼즐로 시간을 겨룹니다.', points: [['내 사진, 내 기기 안에서', '사진은 브라우저 안에서만 잘리고 그려집니다. 서버로 가지 않으니 가족 사진도 마음 놓고.'], ['매일 같은 판, 다른 기록', '오늘 방문한 모든 사람이 같은 컷을 맞춥니다. 자정에 새 그림이 걸리고 기록은 기기당 하나.'], ['폰에서 제대로', '두 손가락 확대와 트레이 끌어올리기까지, 손가락 하나로 끝까지 맞출 수 있게 만들었습니다.'], ['퍼블릭 도메인 명화 22점', '고흐·모네·페르메이르·호쿠사이·김홍도. 상자를 열면 그림 이야기와 소장처가 있습니다.']], guide: '가이드' },
    foot: { privacy: '개인정보처리방침', madeBy: '캔통이 만들었어요', rights: '그림은 모두 퍼블릭 도메인입니다', copied: '링크를 복사했어요', shareFail: '공유가 안 됐어요', privacyTitle: '개인정보처리방침', toHome: '홈으로' },
  },
  en: {
    name: 'jigsawlab', tagline: 'Where one photo becomes a jigsaw', langName: 'English',
    nav: { daily: "Today's puzzle", catalog: 'Puzzle boxes', photo: 'Your photo', play: 'Play now', about: 'About' },
    hero: { today: "Today's puzzle", pieces: (n: number) => `${n} pieces`, solved: (n: number) => (n ? `${n} people finished it today` : 'Be the first to finish today'), fastest: (t: string) => `Fastest time ${t}`, cta: "Solve today's puzzle", photo: 'Make one from my photo', sameForAll: 'Everyone who visits today gets the same cut. Race the clock.' },
    how: { title: 'How it works', steps: [['Pick a picture', 'Choose a painting from the shelf or use your own photo. Photos are cut inside your browser and never uploaded.'], ['Choose the piece count', 'From a light 12-piece round up to 300. The grid follows your photo\'s proportions and the tabs are cut fresh every time.'], ['Drag up and snap', 'Pull pieces up from the tray onto the board. Near the right spot they click into place; pinch to zoom on a phone.']] },
    catalog: { title: 'Puzzle boxes', sub: 'Public-domain masterpieces, shelved like real boxes. Open one for the story behind the picture and pick your piece count.', all: (n: number) => `${n} puzzles` },
    photo: { title: 'Make one from your photo', body: 'Family photos, holidays, a child\'s drawing. Any picture becomes a jigsaw with the piece count you want, and it never leaves your device.', cta: 'Choose a photo' },
    rank: { title: "Today's leaderboard", sub: 'One best time per device · new puzzle at midnight KST', empty: 'Nobody has finished yet. Be the first.', fail: "Couldn't load the leaderboard", total: (n: number) => `${n} finished today`, more: "Solve today's puzzle" },
    detail: { open: 'Solve this painting', pieces: 'Choose a piece count', best: (t: string) => `Your best ${t}`, noBest: 'No record yet', museum: 'Collection', year: 'Painted', medium: 'Medium', source: 'Object record (Art Institute of Chicago)', more: 'More from this shelf', back: 'All puzzles', gridOf: (c: number, r: number) => `${c}×${r}` },
    guide: 'Guide',
    about: { title: 'About jigsawlab', lead: 'Pick a photo and it becomes a real interlocking jigsaw. No sign-up, your photo never leaves your device, and one daily puzzle to race against everyone else.', points: [['Your photo stays on your device', 'Photos are cut and drawn inside the browser. Nothing is uploaded, so family pictures are safe.'], ['Same cut every day, your own time', 'Everyone who visits today gets the same cut. A new painting at midnight KST, one record per device.'], ['Made for phones', 'Pinch to zoom and drag pieces up from the tray. You can finish a whole puzzle with one finger.'], ['22 public-domain masterpieces', 'Van Gogh, Monet, Vermeer, Hokusai, Kim Hong-do. Open a box for the story and where it hangs.']], guide: 'Guide' },
    foot: { privacy: 'Privacy', madeBy: 'Made by Cantong', rights: 'All paintings are in the public domain', copied: 'Link copied', shareFail: "Couldn't share", privacyTitle: 'Privacy policy', toHome: 'Home' },
  },
  ja: {
    name: 'jigsawlab', tagline: '写真一枚がジグソーパズルになる場所', langName: '日本語',
    nav: { daily: '今日のパズル', catalog: 'パズルの箱', photo: '自分の写真で', play: '今すぐ遊ぶ', about: 'サイトについて' },
    hero: { today: '今日のパズル', pieces: (n: number) => `${n}ピース`, solved: (n: number) => (n ? `今日 ${n}人が完成` : '今日最初の完成者になりましょう'), fastest: (t: string) => `最速タイム ${t}`, cta: '今日のパズルを解く', photo: '自分の写真で作る', sameForAll: '今日訪れた全員が同じカットを組みます。タイムを競いましょう。' },
    how: { title: '遊び方', steps: [['絵を選ぶ', '名画の箱から選ぶか、自分の写真を使います。写真はブラウザの中だけで切り分けられ、どこにも送られません。'], ['ピース数を決める', '軽い12ピースから300ピースまで。写真の比率に合わせて格子を計算し、突起の形は毎回新しく切られます。'], ['引き上げてはめる', '下のトレイからピースを上へドラッグして盤に置きます。正しい位置の近くでカチッとはまり、スマホでは二本指で拡大できます。']] },
    catalog: { title: 'パズルの箱', sub: 'パブリックドメインの名画を本物の箱のように並べました。箱を開くと絵の話とピース数を選べます。', all: (n: number) => `全${n}点` },
    photo: { title: '自分の写真で作る', body: '家族写真、旅行の写真、子どもの絵。どんな写真も好きなピース数のジグソーになり、端末の外には出ません。', cta: '写真を選ぶ' },
    rank: { title: '今日のランキング', sub: '端末ごとに最高記録1件 · 日本時間0時に新しいパズル', empty: 'まだ完成した人がいません。最初の一人に。', fail: 'ランキングを読み込めませんでした', total: (n: number) => `今日 ${n}人完成`, more: '今日のパズルを解く' },
    detail: { open: 'この絵で遊ぶ', pieces: 'ピース数を選ぶ', best: (t: string) => `自己ベスト ${t}`, noBest: 'まだ記録がありません', museum: '所蔵', year: '制作', medium: '素材', source: '作品情報（シカゴ美術館）', more: '同じ棚の他の箱', back: 'パズル一覧へ', gridOf: (c: number, r: number) => `${c}×${r}` },
    guide: 'ガイド',
    about: { title: 'jigsawlab について', lead: '写真を一枚選ぶと、本物の凹凸がかみ合うジグソーパズルになります。登録不要、写真は端末の外に出ず、毎日ひとつのパズルでタイムを競います。', points: [['写真は端末の中だけ', '写真はブラウザの中で切り分けて描かれます。アップロードしないので家族写真も安心。'], ['毎日同じカット、自分の記録', '今日訪れた全員が同じカットを組みます。日本時間0時に新しい絵、記録は端末ごとに一つ。'], ['スマホで本気', '二本指ズームとトレイからのドラッグ。指一本で最後まで組めるように作りました。'], ['パブリックドメインの名画22点', 'ゴッホ・モネ・フェルメール・北斎・金弘道。箱を開くと絵の話と所蔵先があります。']], guide: 'ガイド' },
    foot: { privacy: 'プライバシー', madeBy: 'Cantong が作りました', rights: '絵はすべてパブリックドメインです', copied: 'リンクをコピーしました', shareFail: '共有できませんでした', privacyTitle: 'プライバシーポリシー', toHome: 'ホームへ' },
  },
} as const;

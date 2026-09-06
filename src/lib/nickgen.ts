// 랜덤 닉네임 — 형용사+동물 ("친절한고양이"). 닉네임을 안 정했거나 손님으로 들어올 때 씀. 12자 이내 조합만
const ADJ = {
  ko: ['친절한', '용감한', '느긋한', '재빠른', '수줍은', '명랑한', '엉뚱한', '다정한', '씩씩한', '조용한', '배고픈', '졸린', '신나는', '똑똑한', '꼼꼼한', '시크한', '포근한', '상냥한', '활발한', '호기심많은', '반짝이는', '부지런한', '느린', '든든한', '야무진', '귀여운', '멋진', '산뜻한', '고요한', '유쾌한'],
  en: ['Kind', 'Brave', 'Sleepy', 'Quick', 'Shy', 'Merry', 'Quirky', 'Gentle', 'Bold', 'Quiet', 'Hungry', 'Jolly', 'Clever', 'Tidy', 'Cozy', 'Sunny', 'Curious', 'Shiny', 'Busy', 'Slow', 'Mellow', 'Sturdy', 'Cute', 'Cool', 'Fresh', 'Calm', 'Witty', 'Lucky', 'Zesty', 'Plucky'],
  ja: ['やさしい', 'ゆうかんな', 'のんびり', 'すばやい', 'ほがらか', 'ふしぎな', 'げんきな', 'しずかな', 'ねむい', 'かしこい', 'ふわふわ', 'おだやか', 'まぶしい', 'ゆっくり', 'たのもしい', 'かわいい', 'すてきな', 'さわやか', 'こつこつ', 'ごきげん'],
};
const ANIMAL = {
  ko: ['고양이', '강아지', '여우', '수달', '판다', '펭귄', '코알라', '토끼', '햄스터', '고슴도치', '다람쥐', '부엉이', '돌고래', '거북이', '알파카', '너구리', '물개', '사슴', '오리', '참새', '두더지', '카피바라', '미어캣', '라쿤', '나무늘보', '문어', '해파리', '앵무새', '고래', '치타'],
  en: ['Cat', 'Dog', 'Fox', 'Otter', 'Panda', 'Penguin', 'Koala', 'Bunny', 'Hamster', 'Hedgehog', 'Squirrel', 'Owl', 'Dolphin', 'Turtle', 'Alpaca', 'Raccoon', 'Seal', 'Deer', 'Duck', 'Sparrow', 'Mole', 'Capybara', 'Meerkat', 'Sloth', 'Octopus', 'Parrot', 'Whale', 'Cheetah', 'Lynx', 'Puffin'],
  ja: ['ねこ', 'いぬ', 'きつね', 'かわうそ', 'パンダ', 'ペンギン', 'コアラ', 'うさぎ', 'ハムスター', 'はりねずみ', 'りす', 'ふくろう', 'いるか', 'かめ', 'アルパカ', 'たぬき', 'あざらし', 'しか', 'あひる', 'すずめ', 'もぐら', 'カピバラ', 'なまけもの', 'たこ', 'くらげ', 'おうむ', 'くじら', 'チーター', 'ラッコ', 'ひつじ'],
};
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
export function randomNick(lang: string): string {
  const L = (lang === 'en' || lang === 'ja' ? lang : 'ko') as 'ko' | 'en' | 'ja';
  for (let i = 0; i < 20; i++) { const n = L === 'en' ? `${pick(ADJ.en)} ${pick(ANIMAL.en)}` : `${pick(ADJ[L])}${pick(ANIMAL[L])}`; if (n.length <= 12) return n; }
  return L === 'en' ? 'Kind Cat' : L === 'ja' ? 'やさしいねこ' : '친절한고양이';
}

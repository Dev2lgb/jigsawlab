// 퍼즐 카테고리(진열대). 각 작품의 cat 이 여기 id 와 맞아야 한다. 순서 = 홈 진열 순서
export interface Category { id: string; name: [string, string, string]; daily?: boolean }
export const CATEGORIES: Category[] = [
  { id: 'masters', name: ['명작 컬렉션', 'Masterpieces', '名作コレクション'], daily: true },
  { id: 'landscape', name: ['풍경', 'Landscapes', '風景'], daily: true },
  { id: 'sea', name: ['바다와 해변', 'Sea & Shore', '海と浜辺'], daily: true },
  { id: 'city', name: ['도시와 거리', 'Cities & Streets', '都市と街路'], daily: true },
  { id: 'people', name: ['사람들의 하루', 'Everyday Scenes', '人々の日常'], daily: true },
  { id: 'portrait', name: ['초상', 'Portraits', '肖像'], daily: true },
  { id: 'still', name: ['꽃과 정물', 'Flowers & Still Life', '花と静物'], daily: true },
  { id: 'animal', name: ['동물', 'Animals', '動物'], daily: true },
  { id: 'ukiyoe', name: ['우키요에', 'Ukiyo-e', '浮世絵'], daily: true },
  { id: 'korean', name: ['한국 풍속화', 'Korean Genre Painting', '韓国風俗画'], daily: true },
  { id: 'poster', name: ['빈티지 포스터', 'Vintage Posters', 'ヴィンテージ・ポスター'] },
  { id: 'pattern', name: ['패턴과 직물', 'Patterns & Textiles', '模様と織物'] },
  { id: 'modern', name: ['근대와 추상', 'Modern & Abstract', '近代と抽象'] },
];

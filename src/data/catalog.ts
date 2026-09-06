// 퍼즐 카탈로그 — 카테고리별로 묶어 퍼즐 상자처럼 보여준다. 새 그림은 PAINTINGS(lib/jigsaw.ts)에 추가하고 여기서 카테고리에 넣는다
export interface Category { id: string; name: [string, string, string]; keys: string[] }
export const CATEGORIES: Category[] = [
  { id: 'impression', name: ['인상파', 'Impressionism', '印象派'], keys: ['starry', 'almond', 'lilies', 'sunrise', 'galette', 'jatte'] },
  { id: 'classic', name: ['고전 명화', 'Old masters', '古典名画'], keys: ['mona', 'ermine', 'venus', 'pearl', 'milkmaid', 'hunters', 'gleaners'] },
  { id: 'modern', name: ['근대 회화', 'Modern art', '近代絵画'], keys: ['kiss', 'scream', 'kandinsky'] },
  { id: 'ukiyoe', name: ['우키요에', 'Ukiyo-e', '浮世絵'], keys: ['wave', 'redfuji', 'shower'] },
  { id: 'korean', name: ['한국 풍속화', 'Korean genre painting', '韓国風俗画'], keys: ['dano', 'ssireum', 'mudong'] },
];

// 퍼즐 카테고리(진열대). 각 작품의 cat 이 여기 id 와 맞아야 한다. 순서 = 홈 진열 순서
import type { Penta } from '../i18n/langs';
export interface Category { id: string; name: Penta; daily?: boolean }
export const CATEGORIES: Category[] = [
  { id: 'masters', name: ['명작 컬렉션', 'Masterpieces', '名作コレクション', 'Meisterwerke', 'Obras maestras'], daily: true },
  { id: 'landscape', name: ['풍경', 'Landscapes', '風景', 'Landschaften', 'Paisajes'], daily: true },
  { id: 'sea', name: ['바다와 해변', 'Sea & Shore', '海と浜辺', 'Meer & Küste', 'Mar y costa'], daily: true },
  { id: 'city', name: ['도시와 거리', 'Cities & Streets', '都市と街路', 'Städte & Straßen', 'Ciudades y calles'], daily: true },
  { id: 'people', name: ['사람들의 하루', 'Everyday Scenes', '人々の日常', 'Alltagsszenen', 'Escenas cotidianas'], daily: true },
  { id: 'portrait', name: ['초상', 'Portraits', '肖像', 'Porträts', 'Retratos'], daily: true },
  { id: 'still', name: ['꽃과 정물', 'Flowers & Still Life', '花と静物', 'Blumen & Stillleben', 'Flores y bodegones'], daily: true },
  { id: 'animal', name: ['동물', 'Animals', '動物', 'Tiere', 'Animales'], daily: true },
  { id: 'pets', name: ['고양이와 강아지', 'Cats & Dogs', '猫と犬', 'Katzen & Hunde', 'Gatos y perros'], daily: true },
  { id: 'tale', name: ['동화와 판타지', 'Fairy Tales & Fantasy', '童話とファンタジー', 'Märchen & Fantasie', 'Cuentos y fantasía'], daily: true },
  { id: 'ukiyoe', name: ['우키요에·일본 회화', 'Ukiyo-e & Japanese Painting', '浮世絵・日本絵画', 'Ukiyo-e & japanische Malerei', 'Ukiyo-e y pintura japonesa'], daily: true },
  { id: 'korean', name: ['한국 회화', 'Korean Painting', '韓国絵画', 'Koreanische Malerei', 'Pintura coreana'], daily: true },
  { id: 'photo', name: ['빈티지 사진', 'Vintage Photographs', 'ヴィンテージ写真', 'Historische Fotografien', 'Fotografía antigua'], daily: true },
  { id: 'space', name: ['우주', 'Space', '宇宙', 'Weltall', 'Espacio'] },
  { id: 'poster', name: ['빈티지 포스터', 'Vintage Posters', 'ヴィンテージ・ポスター', 'Historische Plakate', 'Carteles antiguos'] },
  { id: 'pattern', name: ['패턴과 직물', 'Patterns & Textiles', '模様と織物', 'Muster & Textilien', 'Estampados y tejidos'] },
  { id: 'modern', name: ['근대와 추상', 'Modern & Abstract', '近代と抽象', 'Moderne & Abstraktion', 'Moderno y abstracto'] },
];

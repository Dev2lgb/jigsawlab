// 그림 소개 텍스트 (1~5 기존, 6 고양이와 강아지, 7 동화와 판타지) — t: [한국어 제목, 일본어 제목], about: [ko, en, ja]
import { TEXT1 } from './worksText1';
import { TEXT2 } from './worksText2';
import { TEXT3 } from './worksText3';
import { TEXT4 } from './worksText4';
import { TEXT5 } from './worksText5';
import { TEXT6 } from './worksText6';
import { TEXT7 } from './worksText7';
export interface WorkText { t: [string, string]; about: [string, string, string] }
export const TEXT: Record<string, WorkText> = { ...TEXT1, ...TEXT2, ...TEXT3, ...TEXT4, ...TEXT5, ...TEXT6, ...TEXT7 };

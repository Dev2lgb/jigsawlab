// 그림 소개 텍스트 — t: [한국어 제목, 일본어 제목], about: [ko, en, ja]
import { TEXT1 } from './worksText1';
import { TEXT2 } from './worksText2';
import { TEXT3 } from './worksText3';
export interface WorkText { t: [string, string]; about: [string, string, string] }
export const TEXT: Record<string, WorkText> = { ...TEXT1, ...TEXT2, ...TEXT3 };

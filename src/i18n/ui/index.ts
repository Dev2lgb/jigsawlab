// 사이트 공통 문구 — 언어팩은 언어마다 파일 하나(ko.ts 가 기준 모양, 나머지는 UIStrings 로 묶임).
// 언어 목록·도우미는 i18n/langs.ts 에 있다(가벼워야 해서 갈라 뒀다). 여기서 그대로 다시 내보낸다
import type { Lang } from '../langs';
import { KO } from './ko';
import { EN } from './en';
import { JA } from './ja';
import { DE } from './de';
import { ES } from './es';
export * from '../langs';
export type { UIStrings } from './ko';
export const UI = { ko: KO, en: EN, ja: JA, de: DE, es: ES } satisfies Record<Lang, unknown>;

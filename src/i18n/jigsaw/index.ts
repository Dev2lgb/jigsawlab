// 판·고르는 화면 문구 + SEO 본문 — 언어팩은 언어마다 파일 하나(ko.ts 가 기준 모양).
// 언어를 늘릴 때: 파일 하나 추가 + 아래 두 줄
import type { Lang } from '../ui';
import { KO } from './ko';
import { EN } from './en';
import { JA } from './ja';
import { DE } from './de';
import { ES } from './es';
export type { JigsawStrings } from './ko';
export const JIGSAW = { ko: KO, en: EN, ja: JA, de: DE, es: ES } satisfies Record<Lang, unknown>;

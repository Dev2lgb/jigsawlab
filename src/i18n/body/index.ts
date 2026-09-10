// SEO 본문 — 언어별 파일 하나. /photo/ · /together/ · /about/ 이 서버에서만 읽는다
import type { Lang } from '../langs';
import { KO_BODY } from './ko';
import { EN_BODY } from './en';
import { JA_BODY } from './ja';
import { DE_BODY } from './de';
import { ES_BODY } from './es';
export type { BodyText } from './ko';
export const BODY = { ko: KO_BODY, en: EN_BODY, ja: JA_BODY, de: DE_BODY, es: ES_BODY } satisfies Record<Lang, unknown>;

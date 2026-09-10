// 그림 이야기 — 언어별 파일을 모아 준다. 상세 페이지(prerender)에서만 부르므로 클라이언트 번들에 안 들어간다.
// 아직 번역이 없는 언어는 영어로 내려간다 — 빈 화면보다는 읽히는 편이 낫다
import { KO } from './ko';
import { EN } from './en';
import { JA } from './ja';
export const ABOUT_TEXT: Record<string, Record<string, string>> = { ko: KO, en: EN, ja: JA, de: EN, es: EN };

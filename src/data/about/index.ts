// 그림 이야기 — 언어별 파일 하나. 상세 페이지(prerender)에서만 부르므로 클라이언트 번들에 안 들어간다.
// de·es 는 EN 위에 덮어쓴다. 지금은 518점 전부 번역돼 있지만, 새 작품을 넣고 번역 전이면
// 빈 화면 대신 영어가 나가도록 폴백을 남겨 둔다
import { KO } from './ko';
import { EN } from './en';
import { JA } from './ja';
import { DE } from './de';
import { ES } from './es';
export const ABOUT_TEXT: Record<string, Record<string, string>> = {
  ko: KO, en: EN, ja: JA,
  de: { ...EN, ...DE },
  es: { ...EN, ...ES },
};

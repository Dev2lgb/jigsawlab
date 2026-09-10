// 언어 목록과 아주 작은 도우미만. 문구(UI·JIGSAW)는 여기 없다 —
// works.ts 같은 데이터 파일이 언어팩을 물면 5개 국어 문구가 통째로 클라이언트 번들에 딸려 들어간다.
// 언어를 늘릴 때 손댈 곳은 아래 세 줄 + 언어팩 파일들뿐이다
export type Lang = 'ko' | 'en' | 'ja' | 'de' | 'es';
export const LANGS: Lang[] = ['ko', 'en', 'ja', 'de', 'es'];
export const LI = { ko: 0, en: 1, ja: 2, de: 3, es: 4 } as const;

/** 기본 언어(ko)는 접두어가 없다 */
export const prefix = (l: Lang) => (l === 'ko' ? '' : `/${l}`);
export const langOf = (pathname: string): Lang => LANGS.find((l) => l !== 'ko' && (pathname === prefix(l) || pathname.startsWith(prefix(l) + '/'))) ?? 'ko';
/** hreflang 용 언어별 주소. rel 은 ko 기준 경로('/play/') */
export const altsFor = (rel: string): Record<Lang, string> => Object.fromEntries(LANGS.map((l) => [l, prefix(l) + rel])) as Record<Lang, string>;
/** OG 용 로케일 */
export const OG_LOCALE: Record<Lang, string> = { ko: 'ko_KR', en: 'en_US', ja: 'ja_JP', de: 'de_DE', es: 'es_ES' };

/** 언어 수만큼의 문자열. LI 로 찍는다. 손으로 쓰는 작은 묶음(업적·진열대 이름)은 빠진 번역이
 *  빌드에서 걸리도록 정확한 길이를 쓰고, 작품 데이터처럼 양이 많은 쪽은 multi() 로 영어를 채운다 */
export type Penta = [string, string, string, string, string];
/** 작품 제목·소장처처럼 번역이 없으면 영어를 그대로 쓰는 자리. [ko, en, ja] 를 받아 de·es 를 영어로 채운다 */
export const multi = (t: readonly [string, string, string]): Penta => [t[0], t[1], t[2], t[1], t[1]];

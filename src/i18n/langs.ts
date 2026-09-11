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
/** 주소에서 언어 접두어를 뗀 ko 기준 경로. 언어 전환 링크가 /ja/de/ 처럼 겹치는 것을 막는다 */
export const stripLang = (pathname: string): string => pathname.slice(prefix(langOf(pathname)).length) || '/';
/** 브라우저에서 <html lang> 으로 현재 언어를 읽는다. 목록에 없으면 ko.
 *  클라이언트 스크립트는 반드시 이걸 써야 한다 — 손으로 'en' | 'ja' 를 나열하면 언어가 늘 때 조용히 ko 로 떨어진다 */
export const docLang = (): Lang => { const l = document.documentElement.lang as Lang; return LANGS.includes(l) ? l : 'ko'; };

/** OG 용 로케일 */
export const OG_LOCALE: Record<Lang, string> = { ko: 'ko_KR', en: 'en_US', ja: 'ja_JP', de: 'de_DE', es: 'es_ES' };

/** 언어 수만큼의 문자열. LI 로 찍는다. 손으로 쓰는 작은 묶음(업적·진열대 이름)은 빠진 번역이
 *  빌드에서 걸리도록 정확한 길이를 쓰고, 작품 데이터처럼 양이 많은 쪽은 multi() 로 영어를 채운다 */
export type Penta = [string, string, string, string, string];
/** 작품 제목·소장처처럼 번역이 없으면 영어를 그대로 쓰는 자리. [ko, en, ja] 를 받아 de·es 를 영어로 채운다 */
export const multi = (t: readonly [string, string, string]): Penta => [t[0], t[1], t[2], t[1], t[1]];

// ── 언어별 라우트 (src/pages/[...lang]/*.astro). ko 는 접두어 없이(params.lang = undefined), 나머지는 /en/·/ja/·… 한 벌씩
/** getStaticPaths — 언어마다 한 경로. props.lang 으로 언어가 넘어온다 */
export const langPaths = () => LANGS.map((l) => ({ params: { lang: l === 'ko' ? undefined : l }, props: { lang: l } }));
/** 언어 × 다른 파라미터(작품 key·카테고리) 조합 */
export const langPathsWith = <K extends string>(name: K, values: string[]) => LANGS.flatMap((l) => values.map((v) => ({ params: { lang: l === 'ko' ? undefined : l, [name]: v } as Record<K | 'lang', string | undefined>, props: { lang: l } })));
/** 서버 라우트(prerender=false)에서 [...lang] 이 진짜 언어 접두어인지 — 아니면 null (404 로). /ko/ 는 접두어가 없으므로 null */
export const langFromParam = (p: string | undefined): Lang | null => (p === undefined ? 'ko' : p !== 'ko' && (LANGS as string[]).includes(p) ? (p as Lang) : null);

// 언어별 사이트맵 — /sitemap-ko.xml · /sitemap-en.xml · /sitemap-ja.xml
//
// 통합 sitemap-0.xml 은 URL 이 알파벳순이라 언어가 고르게 안 섞인다. 한국어는 prefixDefaultLocale
// 이 false 라 접두어가 없어 /puzzle/* 로 정렬되고, 결과적으로 1287개 중 en 이 4~432, ja 가
// 433~861, ko 가 866~1285 를 차지한다. 신규 도메인의 좁은 크롤 예산에서는 뒤쪽 언어에 늦게 닿아
// en 만 색인되는 상황이 됐다. 언어마다 사이트맵을 따로 두고 Search Console 에 각각 제출하면
// 언어별로 독립된 크롤 대기열을 갖는다.
import type { APIRoute } from 'astro';
import { WORKS } from '../data/works';
import { shelfIds } from '../lib/catalogView';
import { LANGS, prefix, type Lang } from '../i18n/ui';

// my/ 는 개인 화면이라 통합 사이트맵에서도 제외돼 있다 (astro.config 의 filter)
const STATIC = ['/', '/about/', '/contact/', '/photo/', '/play/', '/privacy/', '/terms/', '/together/'];
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = ({ params, site }) => {
  const lang = params.lang as Lang;
  const base = (site ?? new URL('https://jigsawlab.app')).origin;
  const lastmod = new Date().toISOString();
  // 카테고리 판(/play/<cat>/)은 '풍경 퍼즐' 같은 검색어가 착지하는 자리라 작품 상세와 같이 넣는다
  const paths = [...STATIC, ...shelfIds().map((c) => `/play/${c}/`), ...WORKS.map((w) => `/puzzle/${w.key}/`)];
  const urls = paths.map((p) => {
    const alts = LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${esc(base + prefix(l) + p)}"/>`).join('')
      + `<xhtml:link rel="alternate" hreflang="x-default" href="${esc(base + p)}"/>`;
    return `<url><loc>${esc(base + prefix(lang) + p)}</loc><lastmod>${lastmod}</lastmod>${alts}</url>`;
  });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
    { headers: { 'content-type': 'application/xml; charset=utf-8' } },
  );
};

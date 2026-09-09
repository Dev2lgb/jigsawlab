// 한국어 전용 사이트맵. 통합 sitemap-0.xml 은 URL 이 알파벳순이라 /en/* 423개·/ja/* 423개가 앞을 채우고
// 한국어 상세(/puzzle/*)가 맨 뒤 400여 자리에 몰린다. 신규 도메인의 좁은 크롤 예산에서는 거기까지 늦게 닿아
// Search Console 에 이 파일을 따로 제출해 한국어 페이지를 먼저 집어가게 한다.
import type { APIRoute } from 'astro';
import { WORKS } from '../data/works';

const STATIC = ['/', '/about/', '/contact/', '/play/', '/privacy/', '/terms/'];
const xml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('https://jigsawlab.app')).origin;
  const lastmod = new Date().toISOString();
  const paths = [...STATIC, ...WORKS.map((w) => `/puzzle/${w.key}/`)];
  const urls = paths.map((p) => {
    const alt = (['ko', 'en', 'ja'] as const).map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${xml(base + (l === 'ko' ? '' : `/${l}`) + p)}"/>`).join('');
    return `<url><loc>${xml(base + p)}</loc><lastmod>${lastmod}</lastmod>${alt}<xhtml:link rel="alternate" hreflang="x-default" href="${xml(base + p)}"/></url>`;
  });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
    { headers: { 'content-type': 'application/xml; charset=utf-8' } },
  );
};

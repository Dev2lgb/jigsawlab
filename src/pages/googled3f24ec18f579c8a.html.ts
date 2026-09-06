// Google Search Console 인증 파일 — 정적 자산으로 두면 .html 이 리다이렉트되므로 서버 라우트로 200 응답
import type { APIRoute } from 'astro';
export const prerender = false;
export const GET: APIRoute = () => new Response('google-site-verification: googled3f24ec18f579c8a.html', { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=3600' } });

// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// 정적 페이지 + 필요한 곳만 서버(API·공유 카드). Cloudflare Workers 로 배포 (실시간 멀티용 Durable Objects 대비)
export default defineConfig({
  site: 'https://jigsawlab.app',
  output: 'static',
  build: { format: 'directory' },
  adapter: cloudflare({ imageService: 'passthrough', prerenderEnvironment: 'node' }), // workerd 프리렌더는 DO 바인딩 때문에 실패
  session: false, // 세션 안 씀 (KV 바인딩 불필요)
  i18n: { defaultLocale: 'ko', locales: ['ko', 'en', 'ja'], routing: { prefixDefaultLocale: false } },
  integrations: [sitemap({ filter: (page) => !page.includes('/s/') && !page.includes('/api/') && !/\/my\/$/.test(page), i18n: { defaultLocale: 'ko', locales: { ko: 'ko', en: 'en', ja: 'ja' } } })],
});

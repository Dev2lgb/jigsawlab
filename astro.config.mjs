// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';


// 정적 페이지 + 필요한 곳만 서버(API·공유 카드). Cloudflare Workers 로 배포 (실시간 멀티용 Durable Objects 대비)
export default defineConfig({
  site: 'https://jigsawlab.app',
  output: 'static',
  build: { format: 'directory' },
  adapter: cloudflare({ imageService: 'passthrough', prerenderEnvironment: 'node' }), // workerd 프리렌더는 DO 바인딩 때문에 실패
  session: false, // 세션 안 씀 (KV 바인딩 불필요)
  i18n: { defaultLocale: 'ko', locales: ['ko', 'en', 'ja', 'de', 'es'], routing: { prefixDefaultLocale: false } },
  // 사이트맵은 src/pages/sitemap-[lang].xml.ts 가 언어마다 하나씩 낸다. @astrojs/sitemap 통합본(sitemap-0.xml)은
  // 같은 URL 3,225개를 한 파일에 또 담아 이중 제출이 됐고, 알파벳순이라 언어별 대기열을 두려던 뜻을 되돌렸다(2026-09-17 에 뗐다).
  // 대신 새 라우트는 그 파일의 STATIC 배열에 손으로 넣어야 한다
  integrations: [],
});

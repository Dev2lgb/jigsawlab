# 🧩 jigsawlab — 사진 한 장이 직소 퍼즐이 되는 곳

직소 퍼즐 전문 사이트. 내 사진(기기 안에서만 처리)·명화 22점을 원하는 조각 수로 톱니 직소화. 오늘의 퍼즐 시간 랭킹. 회원가입 없음. ko/en/ja.
캔통(cantong.app)의 직소 앱을 떼어 별도 사이트로 키우는 프로젝트. 라이트 테마.

## 스택
- **Astro** + **@astrojs/cloudflare** → **Cloudflare Workers** (정적 자산 + 서버 라우트). Pages 가 아닌 Workers 인 이유: 실시간 멀티용 Durable Objects 를 붙일 예정
- **Cloudflare D1** `jigsawlab-db` — 오늘의 퍼즐 랭킹만. 나머지는 localStorage
- 서버 라우트(`export const prerender = false`): `/api/daily`, `/s/`(공유 카드, 쿼리로 OG 결정). 나머지는 정적

## 명령어
| 명령 | 설명 |
|---|---|
| `pnpm dev` | 개발 서버 (wrangler 프록시로 로컬 D1 바인딩까지 동작) |
| `pnpm db:migrate:local` | 로컬 D1 마이그레이션 |
| `pnpm db:migrate` | 실제 D1 마이그레이션 |
| `pnpm preview` | 빌드 후 wrangler dev (실제 Worker 런타임) |
| `pnpm deploy` | 빌드 후 `wrangler deploy` |

## 처음 한 번
1. `npx wrangler login`
2. `npx wrangler d1 create jigsawlab-db` → 나온 `database_id` 를 `wrangler.jsonc` 에 넣기
3. `pnpm db:migrate:local && pnpm db:migrate`
4. `pnpm deploy` → Workers 대시보드에서 커스텀 도메인 `jigsawlab.app` 연결

## 구조
- `src/lib/jigsaw.ts` 엔진(격자·시드·톱니 곡선·조각 비트맵), `src/lib/store.ts` 저장/API 클라이언트, `src/lib/share.ts`, `src/lib/scene.ts`
- `src/components/Jigsaw.astro` 앱 본체 (홈·조각 수 다이얼로그·플레이·결과), `ShareCard.astro`, `Privacy.astro`
- `src/i18n/jigsaw.ts` 3개 국어 문구 + SEO 본문, `src/i18n/ui.ts` 사이트 공통
- `src/pages/{,en/,ja/}index.astro` 홈 = 퍼즐 앱, `s/index.astro` 공유 카드, `api/daily.ts`
- `public/jigsaw/` 명화 `<key>.jpg`(1200px) · `t-<key>.jpg`(썸네일) · `o-<key>.jpg`(OG 400²)
- 테스트 훅: `window.__jigsaw.demo(n)`(앞 n조각 제자리), `window.__jigsaw.state()`

## 로드맵
1. ✅ 뼈대·직소 이식·라이트 테마
2. 조각끼리 붙기·뭉치 이동·스냅 애니메이션·햅틱
3. 데일리 아카이브·스트릭·진행 저장
4. 도메인 연결·쿠팡 파트너스(명화→실물 퍼즐, 내 사진→사진퍼즐 제작)
5. 카탈로그 확장·실시간 멀티(방 링크)

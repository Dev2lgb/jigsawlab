# 🧩 jigsawlab — 사진 한 장이 직소 퍼즐이 되는 곳

직소 퍼즐 전문 사이트. 내 사진(기기 안에서만 처리)·퍼블릭 도메인 명화·한국 회화·빈티지 사진·우주 사진 423점(15개 진열대)을 원하는 조각 수로 톱니 직소화. 작품마다 3개 국어 그림 이야기. 오늘의 퍼즐(지난 7일). 회원가입 없음. ko/en/ja.
캔통(cantong.app)의 직소 앱을 떼어 별도 사이트로 키우는 프로젝트. 라이트 테마.

## 스택
- **Astro** + **@astrojs/cloudflare** → **Cloudflare Workers** (정적 자산 + 서버 라우트). Pages 가 아닌 Workers 인 이유: 실시간 멀티용 Durable Objects 를 붙일 예정
- **Cloudflare D1** `jigsawlab-db` — 사이트 전체 완성 판 수(`stats`) + (선택) 구글 로그인 회원의 업적·하던 퍼즐 동기화. 나머지는 localStorage/IndexedDB. `daily_solves` 는 랭킹을 걷어내며 쓰지 않게 됐고 테이블만 남아 있음
- **구글 로그인(선택)**: scope `openid` 만, 저장은 HMAC(sub) 가명 ID + 닉네임뿐. 세션은 서명 쿠키 `jl_s`. 서버 `src/lib/auth.ts`, 라우트 `api/auth/[action].ts`(login·callback·logout·delete)·`api/me.ts`·`api/sync.ts`, 클라이언트 `src/lib/account.ts`
- **실시간 방** Durable Object `Room`(`src/lib/room.ts`, worker.ts 가 `/api/room/<id>` 직결). 내 사진 방은 사진이 서버에 안 가고 WebRTC(`src/lib/rtc.ts`)로 방장→친구 직접 전송, DO 는 sdp/ice 신호만 중계
- 서버 라우트(`export const prerender = false`): `/api/daily`(GET 만 — 오늘 그림), `/api/stats`, `/s/`(공유 카드, 쿼리로 OG 결정). 나머지는 정적

## 명령어
| 명령 | 설명 |
|---|---|
| `pnpm dev` | 개발 서버 (wrangler 프록시로 로컬 D1 바인딩까지 동작) |
| `pnpm check` | 타입 검사 (astro check). main push 시 CI 가 배포 전에 돌린다 |
| `pnpm db:migrate:local` | 로컬 D1 마이그레이션 |
| `pnpm db:migrate` | 실제 D1 마이그레이션 |
| `pnpm preview` | 빌드 후 wrangler dev (실제 Worker 런타임) |
| `pnpm run deploy` | 빌드 후 `wrangler deploy` (`pnpm deploy` 는 pnpm 내장 명령과 겹쳐 실패) |

## 처음 한 번
1. `npx wrangler login`
2. `npx wrangler d1 create jigsawlab-db` → 나온 `database_id` 를 `wrangler.jsonc` 에 넣기
3. `pnpm db:migrate:local && pnpm db:migrate`
4. `pnpm run deploy` (커스텀 도메인은 wrangler.jsonc routes 로 자동 연결)
5. 구글 로그인 비밀값: Google Cloud 콘솔에서 OAuth 클라이언트(웹) 생성, 승인된 리디렉션 URI `https://jigsawlab.app/api/auth/callback`. 그 다음 `npx wrangler secret put GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `SESSION_SECRET`(긴 랜덤 문자열). 로컬은 `.dev.vars` 에 같은 키. 비밀값이 없으면 로그인 UI 가 자동으로 숨겨짐
※ `typescript` 는 6.x 로 묶여 있다 — 7.x 네이티브 컴파일러는 `astro check` 가 쓰는 프로그래매틱 API 를 아직 안 내보낸다.
※ 전역 `@cloudflare/workers-types` 가 DOM 타입 일부를 가린다: 브라우저 쪽 코드에서 `res.json()` 은 `unknown` 이라 `json<any>()` 로, `el.append(...)` 는 HTMLRewriter 쪽이 가려서 `appendChild` 로 쓴다.

6. GitHub 자동 배포: 저장소 Secrets 에 `CLOUDFLARE_API_TOKEN`(Workers Scripts·D1 편집 권한), `CLOUDFLARE_ACCOUNT_ID` 등록 → main push 시 `.github/workflows/deploy.yml`

## 구조
- `src/lib/jigsaw.ts` 엔진(격자·시드·톱니 곡선·조각 비트맵), `src/lib/store.ts` 저장/API 클라이언트, `src/lib/share.ts`, `src/lib/scene.ts`
- `src/components/Home.astro` 랜딩(히어로·하는 법·상자 진열대·내 사진·랭킹·가이드), `Picker.astro` 고르는 화면(/play/), `Jigsaw.astro` 판(/board/: 플레이·완성·결과), `Photo.astro` 내 사진 랜딩(/photo/), `PuzzleDetail.astro` 그림 상세, `Box.astro` 퍼즐 상자, `ShareCard.astro`, `Privacy.astro`
- `src/i18n/jigsaw.ts` 3개 국어 문구 + SEO 본문, `src/i18n/ui.ts` 사이트 공통
- `src/pages/{,en/,ja/}` — `index.astro` 홈, `play.astro` 고르는 화면, `board.astro` 판(noindex·사이트맵 제외), `photo.astro` 내 사진 랜딩, `puzzle/[key].astro` 상세(22점 정적), `s/index.astro` 공유 카드(서버), `privacy.astro`; `api/daily.ts`(서버)
- 작품 데이터: `src/data/works.ts` 가 전체 목록(WORKS·DAILY_POOL). 기존 22점 = `lib/jigsaw.ts` PAINTINGS + `paintings.ts`; AIC 204점 = `aic.json`(메타) + `worksText1~3.ts`(ko/ja 제목·3언어 소개); 추가 소스 197점(위키미디어 공용 명화·한국 회화·포토크롬, NASA 우주) = `extra.json`(메타·소장처·출처·라이선스) + `worksText4~5.ts`. 작가명 표기는 `artists.ts`, 카테고리(진열대) `catalog.ts` — 작품 cat 이 catalog 에 없으면 빌드가 실패함. 진열대 앞줄 순서는 `popular.ts`
- 이미지: `public/jigsaw/<key>.webp`(1600) · `t-<key>.webp`(480) · `o-<key>.jpg`(OG 400²)
- 카탈로그 확장 파이프라인 ① `scripts/met/`(AIC): `scan-aic.mjs`(시카고 미술관 API CC0 후보 수집 + 컨택트 시트) → 시트 보고 `select.mjs` 의 PICK 편집 → `build.mjs`(IIIF 1686px 다운로드·WebP 변환·aic.json). ② `scripts/extra/`(위키미디어 공용·NASA): `scan.mjs`(카테고리·검색·NASA API 로 후보 수집 → candidates.json + sheet-*.html) → `select.mjs`(고른 항목에 영문 제목·작가·연도·소장처 코드 지정 → selected.json) → `build.mjs`(1600px 썸네일 다운로드, 포토크롬은 스캔 테두리·색상띠 자동 크롭, WebP·썸네일·OG 생성 → extra.json) → 새 key 의 소개를 worksText4~5 에, 새 작가를 artists 에 추가. Met API 는 403 스로틀이 심해 보류, 미국 의회도서관 사이트는 Cloudflare 차단이라 Commons 경유
- 화면 셋으로 나뉜다. `/play/` 고르기 · `/photo/` 내 사진으로 만들기 · `/board/` 판. 판만 쿼리를 받고 나머지는 링크를 건다
- 딥링크(판 `/board/`): `?k=<key>&n=<조각>` 그림, `?daily=1|YYYY-MM-DD` 오늘의 퍼즐, `?resume=<id>` 하던 퍼즐, `?room=<id>` 방, `?photo=<id>&n=<조각>[&together=1]` `/photo/` 에서 고른 사진(파일은 URL 로 못 넘기니 IndexedDB 에 임시 저장 후 id 만 전달), 없음 → `/play/` 로. 부팅은 2단계: `PlayBoot.astro`(head 인라인, 첫 페인트 전에 `html[data-boot]` 로 로딩 화면·원본 preload) → `Jigsaw.astro` 의 `boot()`(실제 분기). 판을 떠날 때는 `goPick()` 이 `/play/` 로 보내고, 알릴 말은 `sessionStorage` 의 `jl:toast` 로 넘긴다
- 진열대: 홈·`/play/` 는 세로 그리드 `.shelf-grid.capped` 로 카테고리마다 앞 10점만 보이고 `.shelf-more` 버튼으로 펼침(`shelf.ts` 의 `initShelfMore`, 검색 중엔 `.shelf.searching` 으로 전부 표시). 앞줄에 세울 대표작 순서는 `src/data/popular.ts`(키가 틀리면 빌드 실패). 상세 페이지의 가로 진열대 `.shelf-row` 는 `shelf.ts` 가 PC 용 좌우 화살표·마우스 드래그를 붙임(Base.astro 에서 초기화)
- `public/jigsaw/` 명화 `<key>.jpg`(1200px) · `t-<key>.jpg`(썸네일) · `o-<key>.jpg`(OG 400²)
- 테스트 훅: `window.__jigsaw.demo(n)`(앞 n조각 제자리), `window.__jigsaw.state()`

## 로드맵
1. ✅ 뼈대·직소 이식·라이트 테마 → ✅ 리디자인(랜딩 홈·/play/·/puzzle/<key>/ 상세·상자 카탈로그·OG)
2. ✅ 조각끼리 붙기·뭉치 이동·스냅 애니메이션·햅틱·딸깍 소리, 1000조각+(조각 단위 확대, 트레이 지연 렌더, 프리셋 48~1000, 직접 입력 2000)
3. ✅ 진행 저장·이어하기(IndexedDB, 사진 포함), 트레이 다중 더미·색상 정렬, 판 위 조각 윤곽선, 연속 완주·지난 7일 데일리(과거 판 플레이 가능). 상자→상세 페이지→조각 수 선택 즉시 시작
4. 카탈로그 확장·실시간 멀티(방 링크)
5. 유입 — 검색 의도별 페이지 분리(`/play/` 고르기·`/photo/` 만들기·`/board/` 판 완료), Cloudflare Web Analytics·GSC·네이버

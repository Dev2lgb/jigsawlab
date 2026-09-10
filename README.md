# 🧩 jigsawlab — 사진 한 장이 직소 퍼즐이 되는 곳

직소 퍼즐 전문 사이트. 내 사진(기기 안에서만 처리)·퍼블릭 도메인 명화·한국 회화·빈티지 사진·우주 사진 423점(15개 진열대)을 원하는 조각 수로 톱니 직소화. 작품마다 3개 국어 그림 이야기. 오늘의 퍼즐(지난 7일). 다 같이 맞추는 상설 공개 판(1000조각, 다 맞추면 다음 그림). 회원가입 없음. ko/en/ja/de/es.
캔통(cantong.app)의 직소 앱을 떼어 별도 사이트로 키우는 프로젝트. 라이트 테마.

## 스택
- **Astro** + **@astrojs/cloudflare** → **Cloudflare Workers** (정적 자산 + 서버 라우트). Pages 가 아닌 Workers 인 이유: 실시간 멀티용 Durable Objects 를 붙일 예정
- **Cloudflare D1** `jigsawlab-db` — 사이트 전체 완성 판 수(`stats`) + (선택) 구글 로그인 회원의 완성 기록·하던 퍼즐 동기화 + 레벨/XP/업적/랭킹(`user_stats`·`user_cleared`·`user_week`·`user_badges`). 나머지는 localStorage/IndexedDB. `daily_solves` 는 옛 기록 랭킹을 걷어내며 쓰지 않게 됐고 테이블만 남아 있음
- **구글 로그인(선택)**: scope `openid` 만, 저장은 HMAC(sub) 가명 ID + 닉네임뿐. 세션은 서명 쿠키 `jl_s`. 서버 `src/lib/auth.ts`, 라우트 `api/auth/[action].ts`(login·callback·logout·delete)·`api/me.ts`·`api/sync.ts`, 클라이언트 `src/lib/account.ts`
- **실시간 방** Durable Object `Room`(`src/lib/room.ts`, worker.ts 가 `/api/room/<id>` 직결). 내 사진 방은 사진이 서버에 안 가고 WebRTC(`src/lib/rtc.ts`)로 방장→친구 직접 전송, DO 는 sdp/ice 신호만 중계
- **상설 공개 판** — 사이트에 보이는 이름은 **모두의 퍼즐**(`/together/`). 방 id 가 늘 `live` 인 특별한 방. 유저가 만들지 않고 처음 두드리는 사람에게 DO 가 첫 회차를 깔아 준다(`startLive`). 늘 1000조각이고, 다 맞추면 25초 뒤 alarm 이 다음 그림으로 판을 갈아 끼운다(`rotate` → `{t:'next'}` 브로드캐스트). 그림은 `DAILY_POOL` 을 한 바퀴 단위로 섞어 돌려 안 겹치고, 정원은 16명(초대 방은 8명), 7일간 한 조각도 안 놓이면 미완인 채 접고 다음 그림으로. 아무도 없어도 판은 남아 다음 사람이 이어 맞춘다 — 방 목록이 아니라 진행 중인 판 하나만 보여 주므로 접속자 0명이어도 살아 있어 보인다
- **레벨·업적·랭킹** (회원 전용) — 규칙은 `src/lib/level.ts`(순수, 서버·클라 공용), 반영은 `src/lib/award.ts`(서버 전용, D1). 문구는 `src/i18n/badges.ts`
  - XP = 제자리에 놓은 조각 수. 오늘의 퍼즐 ×1.5, 이미 그만큼 깬 그림 재도전 ×0.25, 방에서는 내가 놓은 조각(`mine`)만큼, 하루 상한 5,000
  - **오늘의 퍼즐도 재도전 감산을 받는다.** 판은 몇 번이고 다시 열 수 있어서, 빼 주면 48조각짜리를 계속 돌려 XP 를 캘 수 있다. 날마다 그림이 달라 `user_cleared` 의 '이 그림 처음인가' 가 곧 '그 날 것을 처음 깼는가' 라서 따로 기록할 게 없다. `daily_n`(오늘의 퍼즐 100번 업적)도 같은 이유로 처음 깼을 때만 센다
  - 시간·수순은 점수에 안 쓴다. 클라이언트가 보내는 값이라 조작이 쉽고, 빠른 사람이 아니라 많이 맞춘 사람이 위로 가는 편이 랭킹으로 건강하다. 대신 조각당 0.25초 미만이면(`plausible`) XP 도 누적 지표도 안 준다 — 기준은 판 전체가 아니라 `mine` 이라 방에 늦게 들어와 몇 조각만 놓은 판도 정상 처리된다
  - 같은 기록을 기기 여러 대에서 올려도 한 번만 친다: `user_done` 에 `INSERT OR IGNORE` 한 뒤 `meta.changes` 가 0 이 아닌 행만 `award()` 로 넘긴다
  - 레벨 곡선 `xpAtLevel(L) = 50·L·(L−1)`, 최고 99. 구간 이름 7개(`TIERS`/`TIER_NAMES`), 업적 24가지(`BADGES`)
  - `user_stats` 는 `user_done` 이 500건에서 잘려도 남는 누적 카운터. `user_cleared` 는 그림별 최고 조각 수(재도전 감산·'그림 N점'·'진열대 완주' 판정), `user_week` 는 주간 랭킹(월요일 시작, KST)
- 서버 라우트(`export const prerender = false`): `/api/daily`(GET 만 — 오늘 그림), `/api/stats`, `/api/live`(공개 판 진행률 — DO 정보에 그림 제목 3개 국어를 얹어 준다. 홈·`/together/` 가 쓴다), `/api/rank`(랭킹 — 읽기는 누구나), `/api/level`(내 레벨·업적), `/s/`(공유 카드, 쿼리로 OG 결정). 나머지는 정적

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
- `src/components/Home.astro` 랜딩(히어로·지난 오늘의 퍼즐·모두의 퍼즐 띠·레벨/업적/이번 주 랭킹·상자 진열대). 레벨 블록은 진열대(17개)보다 **앞**에 둔다 — 뒤에 두면 아무도 안 보고 지나간다, `Picker.astro` 고르는 화면(/play/), `Jigsaw.astro` 판(/board/: 플레이·완성·결과), `Photo.astro` 내 사진 랜딩(/photo/), `Together.astro` 공개 판 랜딩(/together/), `Rank.astro` 랭킹(/rank/: 주간·누적 두 탭 + XP 규칙·레벨 구간·업적 목록은 정적으로 찍어 색인), `My.astro` 내 퍼즐(/my/: 레벨 카드·업적 그리드도 여기. 24가지를 다 펴면 하던 퍼즐이 밀려서 처음엔 첫 줄만 보이고 `.bdg-blk.open` 으로 펼친다), `PuzzleDetail.astro` 그림 상세, `Box.astro` 퍼즐 상자, `ShareCard.astro`, `Privacy.astro`
- **언어는 5개(ko·en·ja·de·es).** 언어팩은 언어마다 파일 하나로 갈라 뒀다 — `src/i18n/ui/<lang>.ts` 사이트 공통(`UI[lang].lv` 가 레벨·랭킹), `src/i18n/jigsaw/<lang>.ts` 판·고르는 화면, `src/i18n/body/<lang>.ts` SEO 본문(HTML), `src/i18n/badges.ts` 업적·레벨 구간. 각 묶음의 `ko.ts` 가 기준 모양이고 나머지는 그 타입(`UIStrings`·`JigsawStrings`·`BodyText`)을 달고 있어 **키가 하나라도 빠지면 `astro check` 가 잡는다**
- `src/i18n/langs.ts` — 언어 목록(`LANGS`·`LI`)과 작은 도우미(`prefix`·`langOf`·`stripLang`·`docLang`·`altsFor`·`OG_LOCALE`·`multi`)만. **문구는 여기 없다**: `works.ts` 같은 데이터 파일이 언어팩을 물면 5개 국어 문구가 통째로 클라이언트 번들에 딸려 들어간다
- **언어 코드를 손으로 나열하지 말 것.** `lang === 'en' || lang === 'ja' ? … : 'ko'` 나 `{ ko: 0, en: 1, ja: 2 }` 같은 코드가 9군데 흩어져 있었고, de·es 를 추가하자 **전부 조용히 한국어로 떨어졌다**(에러도 안 났다). 대신 쓸 것: 브라우저에서 현재 언어는 `docLang()`, 언어 인덱스는 `LI`, 주소에서 접두어 떼기는 `stripLang()`, hreflang 은 `altsFor()`. 특히 `Base.astro` 의 언어 전환 링크가 `pathname.replace(/^\/(en|ja)/…)` 로 돼 있어 `/de/` 에서 언어를 바꾸면 `/ja/de/` 로 가 버렸다
- **SEO 본문(`i18n/body/`)은 서버 프런트매터에서만 읽는다.** `/photo/`·`/together/`·`/about/` 이 쓰고, 언어팩에 두면 판 화면의 클라이언트 번들까지 따라간다(실제로 그랬다: i18n/jigsaw 청크가 3개 국어 23KB → 떼고 나니 5개 국어인데도 8.8KB)
- **언어를 하나 더 늘릴 때 손댈 곳** — ① `i18n/langs.ts` 의 `Lang`·`LANGS`·`LI`·`OG_LOCALE` ② `i18n/{ui,jigsaw,body}/<lang>.ts` 세 파일과 각 `index.ts` 한 줄씩 ③ `badges.ts`·`catalog.ts`·`lib/jigsaw.ts` PAINTINGS 의 튜플(빠지면 빌드가 선다) ④ `src/pages/<lang>/` 을 `en/` 에서 복사해 `lang=` 치환 ⑤ `astro.config.mjs` 의 locales 두 곳 ⑥ **`public/robots.txt` 의 사이트맵 목록**(여기만 자동이 아니다) ⑦ 컴포넌트 자체 문구표: `Invite`·`ShareCard`·`Contact`·`Terms`·`Privacy`·`PuzzleDetail`. 사이트맵·hreflang·언어 전환은 `LANGS` 에서 생성되므로 손댈 필요가 없다
- 그림 이야기(`about/`)는 518점 × 5개 국어가 전부 채워져 있다. `about/index.ts` 의 de·es 는 `{...EN, ...DE}` 로 합쳐 두었으니, **새 작품을 넣고 번역을 못 채웠으면 빈칸 대신 영어가 나간다**. 작품 제목·소장처처럼 번역이 없는 자리는 `multi()` 가 영어로 채운다
- 헤더 언어 선택은 `.langsel`(`<details>` 드롭다운) — 5개를 알약으로 늘어놓으면 헤더가 두 줄로 접혀서 현재 언어만 보이고 펼쳐서 고른다
- `src/pages/{,en/,ja/}` — `index.astro` 홈, `play.astro` 고르는 화면, `board.astro` 판(noindex·사이트맵 제외), `photo.astro` 내 사진 랜딩, `together.astro` 공개 판 랜딩, `rank.astro` 랭킹, `puzzle/[key].astro` 상세(22점 정적), `s/index.astro` 공유 카드(서버), `privacy.astro`; `api/daily.ts`(서버)
- 작품 데이터 518점: `src/data/works.ts` 가 전체 목록(WORKS·DAILY_POOL). 기존 22점 = `lib/jigsaw.ts` PAINTINGS + `paintings.ts`(소장처); AIC 204점 = `aic.json`; 추가 소스 292점(위키미디어 공용 명화·한국 회화·포토크롬, NASA 우주) = `extra.json`(메타·소장처·출처·라이선스). 제목(ko/ja)은 `titles.ts`, 작가명 `artists.ts`, 카테고리(진열대) `catalog.ts` — 작품 cat 이 catalog 에 없으면 빌드가 실패함. 진열대 앞줄 순서는 `popular.ts`. 총 작품 수는 `counts.ts` 에 상수로 박아 두고 works.ts 가 대조해 어긋나면 빌드를 세운다
- **그림 이야기는 `src/data/about/{ko,en,ja}.ts` 에 언어별로 따로 둔다.** 상세 페이지에서만 쓰는 글이라 `works.ts` 는 이걸 물지 않는다 — 물면 홈·`/play/`·`/board/` 의 클라이언트 번들까지 500KB 넘게 따라 들어간다(실제로 그랬다: works 청크 742KB → 234KB, gzip 278KB → 64KB). 같은 이유로 `level.ts` 는 `WORKS.length` 를 쓰지 않고 `counts.ts` 의 상수를 쓴다. 언어를 하나 늘리려면 `about/<lang>.ts` 를 두고 `about/index.ts` 에 한 줄 더하면 되고, 클라이언트 번들은 안 커진다
- 이미지: `public/jigsaw/<key>.webp`(1600) · `t-<key>.webp`(480) · `o-<key>.jpg`(OG 400²)
- 카탈로그 확장 파이프라인 ① `scripts/met/`(AIC): `scan-aic.mjs`(시카고 미술관 API CC0 후보 수집 + 컨택트 시트) → 시트 보고 `select.mjs` 의 PICK 편집 → `build.mjs`(IIIF 1686px 다운로드·WebP 변환·aic.json). ② `scripts/extra/`(위키미디어 공용·NASA): `scan.mjs`(카테고리·검색·NASA API 로 후보 수집 → candidates.json + sheet-*.html) → `select.mjs`(고른 항목에 영문 제목·작가·연도·소장처 코드 지정 → selected.json) → `build.mjs`(1600px 썸네일 다운로드, 포토크롬은 스캔 테두리·색상띠 자동 크롭, WebP·썸네일·OG 생성 → extra.json) → 새 key 의 제목을 `titles.ts` 에, 소개를 `about/{ko,en,ja}.ts` 에, 새 작가를 `artists.ts` 에 추가하고 `counts.ts` 의 수를 올린다. Met API 는 403 스로틀이 심해 보류, 미국 의회도서관 사이트는 Cloudflare 차단이라 Commons 경유
- 레벨업·새 업적은 다이얼로그로 알린다(`src/lib/levelup.ts` + 마크업은 `Base.astro` 의 `#aw-dlg`). 색종이는 판을 다 맞췄을 때와 같은 것을 쓰고(연출은 `src/lib/celebrate.ts` 로 빼 뒀다), 판에서는 색종이가 다 내린 뒤(`celebrateWait`)에 띄운다
- 소리는 넷을 갈라 뒀다(`celebrate.ts`) — `click()` 조각 딸깍 / `fanfare()` 완성(느린 아르페지오 + 길게 깔리는 화음, 1.4초) / `levelUp()` 레벨업(빠른 5음 + 밑에서 솟는 톱니 스윕 + 종소리 꼬리) / `badge()` 업적(짧고 높은 딩, 여러 개면 230ms 간격). 완성 → 레벨업 → 업적이 이어서 울려도 서로 안 겹치게 음역·속도·길이를 떼 놓았다
- `levelup.ts` 는 `level.ts`(→ `works.ts`)를 물고 있어 무겁다. 모든 페이지에 깔리는 `Base.astro` 에서는 **동적 import** 로만 부른다 (이미 works 를 싣는 `/board/` 에서는 정적 import 여도 무방)
- 조각 수를 고르는 자리마다 받을 XP 를 `.xp-tip` 알약으로 보여 준다(홈 히어로·`/puzzle/`·`/photo/`·판 설정·`/together/`). XP 는 회원만 쌓이므로 알약도 회원에게만 — 화면마다 로그인 검사를 하지 않고 `Base.astro` 가 `html.member` 클래스를 붙이면 전역 CSS 가 켜 준다
- Astro 의 `<style>` 은 스코프라 **스크립트가 만든 요소에는 스타일이 안 붙는다**(스코프 속성이 없어서). 랭킹 표·업적 카드·레벨 통계·완성 화면 XP 칩처럼 JS 로 그리는 것은 `.부모 :global(.자식)` 으로 쓴다
- 헤더 나비는 다섯 항목이 한계다. 낱말 길이가 언어마다 달라(재 본 값: 나비·언어칸·로그인 버튼까지 한 줄에 세우는 데 ko 983 · en 1149 · ja 1194px) 여섯이면 글자가 두 줄로 접힌다. 그래서 `랭킹`·`소개` 는 `sheetOnly` 로 메뉴·바닥글에만 두고, 영어·일본어는 1024px 아래에서 햄버거로 넘긴다(`Base.astro` 미디어쿼리)
- 화면 셋으로 나뉜다. `/play/` 고르기 · `/photo/` 내 사진으로 만들기 · `/board/` 판. 판만 쿼리를 받고 나머지는 링크를 건다
- 딥링크(판 `/board/`): `?k=<key>&n=<조각>` 그림, `?daily=1|YYYY-MM-DD` 오늘의 퍼즐, `?resume=<id>` 하던 퍼즐, `?room=<id>` 방(`room=live` 면 상설 공개 판), `?photo=<id>&n=<조각>[&together=1]` `/photo/` 에서 고른 사진(파일은 URL 로 못 넘기니 IndexedDB 에 임시 저장 후 id 만 전달), 없음 → `/play/` 로. 부팅은 2단계: `PlayBoot.astro`(head 인라인, 첫 페인트 전에 `html[data-boot]` 로 로딩 화면·원본 preload) → `Jigsaw.astro` 의 `boot()`(실제 분기). 판을 떠날 때는 `goPick()` 이 `/play/` 로 보내고, 알릴 말은 `sessionStorage` 의 `jl:toast` 로 넘긴다
- 진열대: 홈·`/play/` 는 세로 그리드 `.shelf-grid.capped` 로 카테고리마다 앞 10점만 보이고 `.shelf-more` 버튼으로 펼침(`shelf.ts` 의 `initShelfMore`, 검색 중엔 `.shelf.searching` 으로 전부 표시). 앞줄에 세울 대표작 순서는 `src/data/popular.ts`(키가 틀리면 빌드 실패). 상세 페이지의 가로 진열대 `.shelf-row` 는 `shelf.ts` 가 PC 용 좌우 화살표·마우스 드래그를 붙임(Base.astro 에서 초기화)
- `public/jigsaw/` 명화 `<key>.jpg`(1200px) · `t-<key>.jpg`(썸네일) · `o-<key>.jpg`(OG 400²)
- 테스트 훅: `window.__jigsaw.demo(n)`(앞 n조각 제자리), `window.__jigsaw.state()`

## 로드맵
1. ✅ 뼈대·직소 이식·라이트 테마 → ✅ 리디자인(랜딩 홈·/play/·/puzzle/<key>/ 상세·상자 카탈로그·OG)
2. ✅ 조각끼리 붙기·뭉치 이동·스냅 애니메이션·햅틱·딸깍 소리, 1000조각+(조각 단위 확대, 트레이 지연 렌더, 프리셋 48~1000, 직접 입력 2000)
3. ✅ 진행 저장·이어하기(IndexedDB, 사진 포함), 트레이 다중 더미·색상 정렬, 판 위 조각 윤곽선, 연속 완주·지난 7일 데일리(과거 판 플레이 가능). 상자→상세 페이지→조각 수 선택 즉시 시작
4. 카탈로그 확장·실시간 멀티 — ✅ 방 링크 초대, ✅ 상설 공개 판 = 모두의 퍼즐(`/together/`)
4.5 ✅ 회원 레벨·업적·랭킹(`/rank/`, XP·업적 24가지·주간/누적 두 탭) — 구글 로그인의 값어치를 만드는 자리
5. 유입 — 검색 의도별 페이지 분리(`/play/` 고르기·`/photo/` 만들기·`/board/` 판 완료), Cloudflare Web Analytics·GSC·네이버

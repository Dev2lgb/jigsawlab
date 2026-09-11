# 🧩 jigsawlab — 사진 한 장이 직소 퍼즐이 되는 곳

직소 퍼즐 전문 사이트. 내 사진(기기 안에서만 처리)·퍼블릭 도메인 명화·한국 회화·빈티지 사진·우주 사진 423점(15개 진열대)을 원하는 조각 수로 톱니 직소화. 작품마다 3개 국어 그림 이야기. 오늘의 퍼즐(지난 7일). 다 같이 맞추는 상설 공개 판(1000조각, 다 맞추면 다음 그림). 회원가입 없음. ko/en/ja/de/es.
캔통(cantong.app)의 직소 앱을 떼어 별도 사이트로 키우는 프로젝트. 라이트 테마.

## 스택
- **Astro** + **@astrojs/cloudflare** → **Cloudflare Workers** (정적 자산 + 서버 라우트). Pages 가 아닌 Workers 인 이유: 실시간 멀티용 Durable Objects 를 붙일 예정
- **Cloudflare D1** `jigsawlab-db` — 사이트 전체 완성 판 수(`stats`) + (선택) 구글 로그인 회원의 완성 기록·하던 퍼즐 동기화 + 레벨/XP/업적/랭킹(`user_stats`·`user_cleared`·`user_week`·`user_badges`). 나머지는 localStorage/IndexedDB. `daily_solves` 는 옛 기록 랭킹을 걷어내며 쓰지 않게 됐고 테이블만 남아 있음
- **구글 로그인(선택)**: scope `openid` 만, 저장은 HMAC(sub) 가명 ID + 닉네임뿐. 세션은 서명 쿠키 `jl_s`. 서버 `src/lib/auth.ts`, 라우트 `api/auth/[action].ts`(login·callback·logout·delete)·`api/me.ts`·`api/sync.ts`, 클라이언트 `src/lib/account.ts`
- **실시간 방** Durable Object `Room`(`src/lib/room.ts`, worker.ts 가 `/api/room/<id>` 직결). 내 사진 방은 사진이 서버에 안 가고 WebRTC(`src/lib/rtc.ts`)로 방장→친구 직접 전송, DO 는 sdp/ice 신호만 중계. 방 id 는 경로(`rid`)에서만 받는다 — 몸통의 id 를 믿으면 다른 id 로 상태가 만들어지고 공개 판 자리(`live`)를 일반 방이 선점할 수 있어서, DO 는 `live` 를 거절하고 `worker.ts` 는 `/create` 를 밖에 열지 않는다(`api/room.ts` 가 stub 으로 직접 시킨다)
- 방에서 '남이 잡고 있음'(`room.holders`)은 내 판의 기억일 뿐이라 묵을 수 있다 — 그 사람이 소리 없이 끊겼거나, 재접속으로 id 가 바뀌었거나, 놓았다는 소식이 안 왔거나. 판단은 서버(`holder()`, 끊긴 사람·90초 넘게 가만히 둔 점유를 풂)가 하되 그 뭉치에 관한 메시지가 와야 하므로, 클라이언트는 붙어 있는 사람이 90초 안에 잡은 것만 막고(`heldByOther`) 나머지는 `grab` 을 보내 `deny` 를 따른다. 전에는 클라이언트가 스스로 거절해 묵은 표시가 붙은 조각은 아무도 못 잡고 영영 떠 있었다. 끌던 중 재접속·재동기화(`applyRoomState`)가 와도 시야와 드래그를 잃지 않고(전에는 `start()` 가 지워 조각이 마우스를 안 따라오고 확대가 풀렸다), 서버가 아직 내가 잡았다고 아는 뭉치(거절된 붙이기·잠그기의 잔재)는 `drop` 으로 풀어 준다. 남이 끄는 동안 그 사람 화살표는 지운다 — 끄는 중엔 `cur` 를 안 보내서 잡은 자리에 얼어붙어 보였다. `deny` 는 트레이에서 꺼낸 것(`takeReq`)만 트레이로 되돌리고 판 위 뭉치는 그대로 둔다
- **상설 공개 판** — 사이트에 보이는 이름은 **모두의 퍼즐**(`/together/`). 방 id 가 늘 `live` 인 특별한 방. 유저가 만들지 않고 처음 두드리는 사람에게 DO 가 첫 회차를 깔아 준다(`startLive`). 늘 1000조각이고, 다 맞추면 25초 뒤 alarm 이 다음 그림으로 판을 갈아 끼운다(`rotate` → `{t:'next'}` 브로드캐스트). 그림은 `DAILY_POOL` 을 한 바퀴 단위로 섞어 돌려 안 겹치고, 정원은 16명(초대 방은 8명), 7일간 한 조각도 안 놓이면 미완인 채 접고 다음 그림으로. 아무도 없어도 판은 남아 다음 사람이 이어 맞춘다 — 방 목록이 아니라 진행 중인 판 하나만 보여 주므로 접속자 0명이어도 살아 있어 보인다
- **레벨·업적·랭킹** (회원 전용) — 규칙은 `src/lib/level.ts`(순수, 서버·클라 공용), 반영은 `src/lib/award.ts`(서버 전용, D1). 문구는 `src/i18n/badges.ts`
  - XP = 제자리에 놓은 조각 수. 오늘의 퍼즐 ×1.5, 이미 그만큼 깬 그림 재도전 ×0.25, 방에서는 내가 놓은 조각(`mine`)만큼, 하루 상한 5,000
  - **XP 는 완성이 아니라 조각을 놓을 때 붙는다.** 판을 다 못 맞춰도, 모두의 퍼즐에서 완성 순간에 접속해 있지 않아도 놓은 만큼은 받는다. 다만 조각마다 서버를 두드리면 무료 티어(Workers 요청 10만/일, **D1 쓰기 10만 행/일** — 정산 한 번에 `user_stats`+`user_week` 2행)가 못 버티므로 **클라이언트가 모아서 보낸다**: 60조각 또는 5분마다, 그리고 화면 이탈·판 나가기·처음부터 누를 때 즉시(`Jigsaw.astro` 의 `flushXp`). 1000조각 한 판에 17번쯤. 타이머를 90초로 뒀더니 천천히 푸는 사람은 그 타이머가 쓰기의 대부분이었다(두 시간짜리 판이 80번). 이탈 때 즉시 보내므로 타이머는 크래시 대비일 뿐이다. 화면의 XP 숫자는 조각을 놓는 즉시 오르고(HUD `#jg-xp-hud`, 회원만) 정산 응답으로 보정된다
  - **두 번 주지 않기** — 조각 단위로 이미 준 조각 수를 `paid` 로 세어 두고, 완성 정산(`award`)에서 `xpFor` 가 `mine - paid` 만 친다. 이어하기로 판이 다음 세션에 넘어가도 맞아야 하므로 `paid` 는 진행 저장(`SaveData.paid`)에 실려 다닌다. 보내는 순간 준 것으로 치기 때문에(응답을 못 기다리는 `pagehide` 에서도 저장값이 맞다) 요청이 실패하면 되돌린다
  - 조각 단위 정산은 `awardPieces()` — XP 와 주간 XP 만 건드린다. 업적은 전부 완성 지표(`solved`·`pieces`·`works`…)에 걸려 있어 여기서 새로 딸 것이 없고, 누적 지표도 완성 때 한 번에 세는 편이 어긋날 여지가 없다. 판 위에서 레벨이 오르면 다이얼로그 대신 토스트만 띄우고(맞추는 흐름을 안 끊는다) 업적·레벨업 다이얼로그는 결과 화면에서 그대로
  - 판을 끝까지 안 가고 되풀이하면(47조각 놓고 처음부터) 재도전 감산이 안 걸리지만 막지 않기로 했다 — 하루 상한 5,000 이 빗장이다
  - **오늘의 퍼즐도 재도전 감산을 받는다.** 판은 몇 번이고 다시 열 수 있어서, 빼 주면 48조각짜리를 계속 돌려 XP 를 캘 수 있다. 감산은 그림 키로 보고, `daily_n`(오늘의 퍼즐 100번 업적)은 날짜마다 한 번 — `user_cleared` 에 `d:YYYY-MM-DD` 행(cat `_daily`)을 따로 둔다. 그림 키로 세면 그 그림을 진열대에서 먼저 깬 사람은 오늘의 퍼즐을 완성해도 안 세어졌다. 이 행은 그림 수·진열대 셈에서 뺀다
  - **연속(스트릭)은 푼 날짜로 센다**, 판의 날짜가 아니라. 지난 7일 판을 열 수 있어서 판 날짜로 세면 한자리에서 7일 연속을 딴다(그리고 푸는 순서에 따라 결과가 달라진다). 클라이언트 `bumpStreak` 도 같다
  - 시간·수순은 점수에 안 쓴다. 클라이언트가 보내는 값이라 조작이 쉽고, 빠른 사람이 아니라 많이 맞춘 사람이 위로 가는 편이 랭킹으로 건강하다. 대신 조각당 0.25초 미만이면(`plausible`) XP 도 누적 지표도 안 준다 — 기준은 판 전체가 아니라 `mine` 이라 방에 늦게 들어와 몇 조각만 놓은 판도 정상 처리된다
  - 같은 기록을 기기 여러 대에서 올려도 한 번만 친다: `user_done` 에 `INSERT OR IGNORE` 한 뒤 `meta.changes` 가 0 이 아닌 행만 `award()` 로 넘긴다
  - **하루 상한과 XP 증가는 한 문장 안에서 끝낸다.** D1 은 문장 하나만 원자적이고 트랜잭션이 없어서, `SELECT day_xp` 로 읽어 계산한 뒤 `day_xp = <값>` 으로 덮어쓰면 동시에 날아온 요청들이 저마다 옛 값을 보고 상한을 몇 배로 넘긴다(`/rank/` 가 공개라 랭킹이 통째로 무의미해진다). 그래서 `awardPieces`·`award` 는 상한 검사를 `WHERE … (CASE WHEN day_key = ? THEN day_xp ELSE 0 END) + ? <= ?` 로 걸고 `xp = xp + ?` 로 더한다 — 통과하면 그만큼, 못 하면 행이 안 돌아와 0. 상한에 닿는 그 한 묶음만 손해고 넘길 수는 없다. `award()` 가 `xp = excluded.xp` 로 덮어쓰던 것도 같은 이유로 걷어냈다(맞추는 동안 조각 단위로 올라간 XP 가 통째로 사라졌다)
  - 완성 정산은 **보내는 중인 조각 묶음이 끝난 뒤에** 올린다(`Jigsaw.astro` 의 `settleXp`). 먼저 닿으면 서버가 그 묶음을 못 본 채 정산해 XP 가 샌다
  - 방에서는 **서버가 받아들인 잠그기만** 내 조각으로 친다(`lockReq`). 놓는 순간 세면 같은 뭉치를 둘이 동시에 놓았을 때 양쪽 다 받는다 — 서버는 뒤에 온 쪽을 `resync` 로 거절한다(`room.ts` 의 `case 'lock'`)
  - **하루 상한은 서버의 오늘 날짜 하나로 센다.** 기록의 `at` 별로 날짜를 나눠 세면(전에 그랬다) 클라이언트가 `at` 만 바꿔 보내 상한을 날짜 수만큼 곱해 간다 — `merge` 에 지난 날짜 500건이면 250만 XP. 그래서 한 요청에서 생긴 XP 는 날짜를 안 가리고 전부 오늘 몫이다
  - **`user_stats` 백필은 행을 만든 요청만 돈다.** `/api/level`·`merge`·`pieces` 가 같은 순간에 오면 저마다 빈 행을 보고 `user_done` 을 겹으로 접어 넣었다. 지금은 `INSERT OR IGNORE` 를 먼저 치고 `meta.changes` 가 1인 쪽만 접어 넣는다
  - **모두의 퍼즐 기여(`live_n`·`pieces`)는 나갈 때·화면을 떠날 때도 올린다**(`Jigsaw.astro` 의 `reportLive`, 이미 알린 몫은 빼고). 완성 순간에만 올리면 조각을 놓고 나간 대부분이 업적을 못 받는다
  - 방(초대·모두의 퍼즐)의 사이트 전체 완성 판 수는 DO 가 완성 순간에 한 번 센다(`room.ts` 의 `countSolved`). 접속자마다 `/api/stats` 를 올리면 인원수만큼 부풀었다
  - **비회원으로 맞춘 판은 로그인해도 XP 를 주지 않는다.** 완성 기록에 로그인한 채 맞췄는지(`DoneEntry.member`, `html.member` 로 판단)를 남기고, 서버로는 그 기록만 간다. 로그인 전 기록은 서버가 검증할 길이 없어 상한 우회의 재료가 되고, 결과 화면의 안내도 '로그인하면 다음 판부터' 로 단순해진다
  - 로컬 기록 합치기(`mergeLocalDone`)는 완성 때 전송이 실패한 회원 기록의 재시도다. 회원별 `localStorage` 워터마크(`auth:merged:<uid>`) 뒤의 `member` 기록만 보내고, 보낼 게 없으면 요청 자체를 안 한다. 탭마다 200건을 통째로 보내면 전부 무시돼도 요청과 정리 쿼리가 매번 돌았다
  - 레벨 곡선 `xpAtLevel(L) = 50·L·(L−1)`, 최고 99. 구간 이름 7개(`TIERS`/`TIER_NAMES`), 업적 24가지(`BADGES`)
  - `user_stats` 는 `user_done` 이 500건에서 잘려도 남는 누적 카운터. `user_cleared` 는 그림별 최고 조각 수(재도전 감산·'그림 N점'·'진열대 완주' 판정), `user_week` 는 주간 랭킹(월요일 시작, KST)
- 서버 라우트(`export const prerender = false`): `/api/daily`(GET 만 — 오늘 그림), `/api/stats`, `/api/live`(공개 판 진행률 — DO 정보에 그림 제목 3개 국어를 얹어 준다. 홈·`/together/` 가 쓴다), `/api/rank`(랭킹 — 읽기는 누구나), `/api/level`(내 레벨·업적), `/s/`(공유 카드, 쿼리로 OG 결정). 나머지는 정적
- 서버 라우트 공통은 `src/lib/api.ts`(`json` — 늘 no-store · `readJson` · `thisWeek`). 레벨·XP 의 D1 쪽은 `src/lib/award.ts` 에 모여 있다: `addXp`(하루 상한 검사와 증가가 한 문장인 그 UPDATE — **여기 한 벌뿐**, 완성 정산 `award` 와 조각 정산 `awardPieces` 가 같이 쓴다), `ensureStats`(행이 없으면 `award(DB, uid, [])` 로 백필을 돌린다 — 직접 INSERT 하지 말 것), `pickStats`, `rankOf`(내 순위). `env` 는 `cloudflare:workers` 의 것이 `env.d.ts` 의 `Cloudflare.Env` 로 타입이 잡혀 있어 `as any` 캐스트가 필요 없다(`DurableObject<Cloudflare.Env>` 도 마찬가지). 예외는 `caches.default` — DOM 의 `CacheStorage` 가 가려 좁은 캐스트로 쓴다
- **API 응답에 캐시 가능한 `cache-control` 을 달지 말 것.** 달면 Cloudflare 가 브라우저용으로 존의 Browser Cache TTL(기본 4시간)로 바꿔 버려서, 강제 새로고침 전까지 옛 값이 보인다. 실제로 `/api/live` 가 `max-age=15` 를 달았다가 진행률이 4시간 묵었다. 엣지 캐시가 필요하면 `caches.default` 에 **넣는 사본에만** max-age 를 달고, 브라우저로 나가는 응답은 캐시 적중 경로까지 포함해 늘 `no-store` 로 다시 싼다(`api/live.ts` 의 `fresh()`)

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
- 판(`Jigsaw.astro`)에서 떼어낸 것: `src/lib/xp.ts` 조각 단위 XP 정산(`createXp` — 모아 보내기·paid·settle·배율 보정이 전부 여기. 판은 `xp.got/flush/settle/paid` 만 부른다), `src/lib/board.ts` 순수 셈(재동기화 때 트레이 순서). 판 안의 공용 도우미: `endDrag`(끌던 것 놓기 — 남이 가져갔거나 거절되었을 때), `forgetSave`(이 판의 저장 지우기, 기기+서버), `leaveRoom`, `reqLock`(제자리 → 서버에 잠그기 청하고 스냅), `ungroup`/`netUntake`(한 조각짜리 뭉치를 판에서 떼기), `gallerySrc`/`workName`/`artUrl`/`thumbUrl`, `boardSnapshot`(저장·방 만들기 공용). `loadSource(src, { auto, quiet })` 는 옵션 객체다
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
- **랜딩(홈·`/play/`·`/puzzle/`)의 클라이언트 번들은 `works.ts` 를 싣지 않는다.** 정적 페이지라 자정을 넘긴 탭·묵은 배포에서도 오늘의 퍼즐을 맞추려면 브라우저가 다시 뽑아야 하는데, 그러자고 `dailyPick(todayKST(), DAILY_POOL)` 을 클라이언트에서 부르면 작품 목록 통째(gzip 62KB)가 딸려 들어와 랜딩 번들의 3분의 2였다(홈 97KB). 대신 `src/lib/daily.ts`: 서버(프런트매터)가 오늘 앞뒤(−7…+60일)의 뽑기 결과를 `dailyWindow()` 로 `#daily-win` JSON 에 찍어 두고(상세 페이지 2,600장에는 그 작품이 뽑히는 날만), 브라우저는 `dailyLite()`·`isDailyToday()` 로 읽는다. 창 밖(두 달 넘게 배포가 없을 때)에만 works 를 **동적 import** 로 내려받는다. 홈 97→35KB, `/play/` 102→40KB, `/puzzle/` 97→34KB gz. `daily.ts` 가 works 를 정적으로 물면 도로 커진다. 판(`/board/`)은 works 를 어차피 실으므로 `dailyPick` 을 그대로 쓴다
- 이미지: `public/jigsaw/<key>.webp`(1600) · `t-<key>.webp`(480) · `o-<key>.jpg`(OG 400²)
- 카탈로그 확장 파이프라인 ① `scripts/met/`(AIC): `scan-aic.mjs`(시카고 미술관 API CC0 후보 수집 + 컨택트 시트) → 시트 보고 `select.mjs` 의 PICK 편집 → `build.mjs`(IIIF 1686px 다운로드·WebP 변환·aic.json). ② `scripts/extra/`(위키미디어 공용·NASA): `scan.mjs`(카테고리·검색·NASA API 로 후보 수집 → candidates.json + sheet-*.html) → `select.mjs`(고른 항목에 영문 제목·작가·연도·소장처 코드 지정 → selected.json) → `build.mjs`(1600px 썸네일 다운로드, 포토크롬은 스캔 테두리·색상띠 자동 크롭, WebP·썸네일·OG 생성 → extra.json) → 새 key 의 제목을 `titles.ts` 에, 소개를 `about/{ko,en,ja}.ts` 에, 새 작가를 `artists.ts` 에 추가하고 `counts.ts` 의 수를 올린다. Met API 는 403 스로틀이 심해 보류, 미국 의회도서관 사이트는 Cloudflare 차단이라 Commons 경유
- 레벨업·새 업적은 다이얼로그로 알린다(`src/lib/levelup.ts` + 마크업은 `Base.astro` 의 `#aw-dlg`). 색종이는 판을 다 맞췄을 때와 같은 것을 쓰고(연출은 `src/lib/celebrate.ts` 로 빼 뒀다), 판에서는 색종이가 다 내린 뒤(`celebrateWait`)에 띄운다
- 소리는 넷을 갈라 뒀다(`celebrate.ts`) — `click()` 조각 딸깍 / `fanfare()` 완성(느린 아르페지오 + 길게 깔리는 화음, 1.4초) / `levelUp()` 레벨업(빠른 5음 + 밑에서 솟는 톱니 스윕 + 종소리 꼬리) / `badge()` 업적(짧고 높은 딩, 여러 개면 230ms 간격). 완성 → 레벨업 → 업적이 이어서 울려도 서로 안 겹치게 음역·속도·길이를 떼 놓았다
- `levelup.ts` 는 모든 페이지에 깔리는 `Base.astro` 에서 **동적 import** 로만 부른다 — 레벨업 다이얼로그가 뜨는 순간에만 싣는다(`level.ts` 가 works 를 물던 때 세운 규칙인데, 지금은 `counts.ts` 만 물어 가볍지만 안 쓸 코드를 첫 화면에 안 싣는 편이 여전히 낫다) (이미 works 를 싣는 `/board/` 에서는 정적 import 여도 무방)
- 조각 수를 고르는 자리마다 받을 XP 를 `.xp-tip` 알약으로 보여 준다(홈 히어로·`/puzzle/`·`/photo/`·판 설정·`/together/`). 재도전 감산(×¼)은 서버가 정하지만 이 기기의 완성 목록(`store.ts` 의 `bestDoneN`)으로 미리 짐작해 `/puzzle/`·판 설정 알약과 판 HUD 배율에 반영한다 — 안 하면 "+1000" 을 보고 시작했다가 첫 묶음 응답에 숫자가 ¼ 로 내려앉는다. XP 는 회원만 쌓이므로 알약도 회원에게만 — 화면마다 로그인 검사를 하지 않고 `Base.astro` 가 `html.member` 클래스를 붙이면 전역 CSS 가 켜 준다
- Astro 의 `<style>` 은 스코프라 **스크립트가 만든 요소에는 스타일이 안 붙는다**(스코프 속성이 없어서). 랭킹 표·업적 카드·레벨 통계·완성 화면 XP 칩처럼 JS 로 그리는 것은 `.부모 :global(.자식)` 으로 쓴다
- 헤더 나비는 다섯 항목이 한계다. 낱말 길이가 언어마다 달라(재 본 값: 나비·언어칸·로그인 버튼까지 한 줄에 세우는 데 ko 983 · en 1149 · ja 1194px) 여섯이면 글자가 두 줄로 접힌다. 그래서 `랭킹`·`소개` 는 `sheetOnly` 로 메뉴·바닥글에만 두고, 영어·일본어는 1024px 아래에서 햄버거로 넘긴다(`Base.astro` 미디어쿼리)
- 화면 셋으로 나뉜다. `/play/` 고르기 · `/photo/` 내 사진으로 만들기 · `/board/` 판. 판만 쿼리를 받고 나머지는 링크를 건다
- 딥링크(판 `/board/`): `?k=<key>&n=<조각>` 그림, `?daily=1|YYYY-MM-DD` 오늘의 퍼즐, `?resume=<id>` 하던 퍼즐, `?room=<id>` 방(`room=live` 면 상설 공개 판), `?photo=<id>&n=<조각>[&together=1]` `/photo/` 에서 고른 사진(파일은 URL 로 못 넘기니 IndexedDB 에 임시 저장 후 id 만 전달), 없음 → `/play/` 로. 부팅은 2단계: `PlayBoot.astro`(head 인라인, 첫 페인트 전에 `html[data-boot]` 로 로딩 화면·원본 preload) → `Jigsaw.astro` 의 `boot()`(실제 분기). 판을 떠날 때는 `goPick()` 이 `/play/` 로 보내고, 알릴 말은 `sessionStorage` 의 `jl:toast` 로 넘긴다
- 진열대: 홈·`/play/` 는 세로 그리드 `.shelf-grid.capped` 로 카테고리마다 앞 10점만 보이고 `.shelf-more` 버튼으로 펼침(`shelf.ts` 의 `initShelfMore`, 검색 중엔 `.shelf.searching` 으로 전부 표시). 앞줄에 세울 대표작 순서는 `src/data/popular.ts`(키가 틀리면 빌드 실패). 상세 페이지의 가로 진열대 `.shelf-row` 는 `shelf.ts` 가 PC 용 좌우 화살표·마우스 드래그를 붙임(Base.astro 에서 초기화)
- `public/jigsaw/` 명화 `<key>.jpg`(1200px) · `t-<key>.jpg`(썸네일) · `o-<key>.jpg`(OG 400²)
- 조각 되돌리기: 판 위 조각을 트레이(또는 더미 탭) 위에서 놓으면 트레이로 돌아간다(`returnToTray`). **한 조각짜리만** — 붙여 둔 뭉치가 손이 미끄러져 통째로 흩어지면 곤란하고, 방에서도 서버 `untake` 가 한 조각짜리만 받는다. 트레이에 세울 때는 `toTray()` 를 쓴다: `order`(저장되는 트레이 순서)에 다시 넣지 않으면 색상 정렬 뒤 되돌린 조각이 저장에서 빠져 이어하기 때 판에도 트레이에도 없이 사라진다
- 원본 그림 보기(`#jg-full`, 밑그림 버튼 왼쪽): 조각을 뜬 그 `img` 를 화면 크기에 맞춰 캔버스에 그린다(사진·명화 공통). 창이 HUD 를 덮으므로 아무 데나 눌러도 닫힌다. **HUD 는 390px 폰에서 이미 꽉 차 있어**(`남은 조각`·그림 이름 칸이 0px 로 눌린 채다) 버튼을 더 늘릴 자리가 없다 — 조각 XP 표시를 트레이 바에 둔 것도 그래서다
- 테스트 훅(개발 서버에서만, `import.meta.env.DEV`): `window.__jigsaw.demo(n)`(앞 n조각 제자리), `window.__jigsaw.state()`. 배포본에 두면 콘솔 한 줄로 조각 XP 를 캔다 빌드본으로 확인하려면 `NODE_ENV=development npx astro build --mode development` 로 만든 dist 를 `npx wrangler dev` 로 띄운다(훅이 살아 있다. 이 빌드는 배포하지 말 것). 회원 흐름(XP 전송)은 `authAvailable()` 이 `/api/me` 의 `auth` 를 보므로 로컬에 `.dev.vars`(더미 `GOOGLE_CLIENT_ID`·`GOOGLE_CLIENT_SECRET`·`SESSION_SECRET`)가 있어야 하고, 세션 쿠키 `jl_s` 는 `SESSION_SECRET` 으로 HMAC 해 만들 수 있다. 훅이 놓는 속도는 사람보다 빨라 완성 정산이 `plausible`(조각당 0.25초)에 걸려 XP 0 이 나온다 — 완성 정산까지 볼 때는 조각 수×0.25초를 기다린 뒤 마지막 조각을 놓을 것. 100조각을 청하면 격자에 맞춰 99조각이 되는 것도 기대값에 반영

## 로드맵
1. ✅ 뼈대·직소 이식·라이트 테마 → ✅ 리디자인(랜딩 홈·/play/·/puzzle/<key>/ 상세·상자 카탈로그·OG)
2. ✅ 조각끼리 붙기·뭉치 이동·스냅 애니메이션·햅틱·딸깍 소리, 1000조각+(조각 단위 확대, 트레이 지연 렌더, 프리셋 48~1000, 직접 입력 2000)
3. ✅ 진행 저장·이어하기(IndexedDB, 사진 포함), 트레이 다중 더미·색상 정렬, 판 위 조각 윤곽선, 연속 완주·지난 7일 데일리(과거 판 플레이 가능). 상자→상세 페이지→조각 수 선택 즉시 시작
4. 카탈로그 확장·실시간 멀티 — ✅ 방 링크 초대, ✅ 상설 공개 판 = 모두의 퍼즐(`/together/`)
4.5 ✅ 회원 레벨·업적·랭킹(`/rank/`, XP·업적 24가지·주간/누적 두 탭) — 구글 로그인의 값어치를 만드는 자리
5. 유입 — 검색 의도별 페이지 분리(`/play/` 고르기·`/photo/` 만들기·`/board/` 판 완료), Cloudflare Web Analytics·GSC·네이버

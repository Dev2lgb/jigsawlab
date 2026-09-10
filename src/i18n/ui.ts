export type Lang = 'ko' | 'en' | 'ja';
export const LANGS: Lang[] = ['ko', 'en', 'ja'];
export const LI = { ko: 0, en: 1, ja: 2 } as const;
export const prefix = (l: Lang) => (l === 'ko' ? '' : `/${l}`);
export const langOf = (pathname: string): Lang => (pathname.startsWith('/en') ? 'en' : pathname.startsWith('/ja') ? 'ja' : 'ko');
export const UI = {
  ko: {
    name: 'jigsawlab', altName: '직소랩', tagline: '직소랩 — 온라인 직소 퍼즐. 명화와 내 사진으로, 폰에서도.', langName: '한국어', seoTitle: '직소랩(jigsawlab) — 온라인 직소 퍼즐, 명화와 내 사진으로', seoDesc: (n: number) => `직소랩은 명화·사진 ${n}점과 내 사진으로 맞추는 무료 온라인 직소 퍼즐이에요. 링크 하나로 친구를 불러 같이 맞추고, 맞는 조각끼리 붙고, 하던 판은 저장돼요. 48조각부터 1000조각까지, 가입 없이 폰에서도.`,
    nav: { daily: '오늘의 퍼즐', catalog: '퍼즐', together: '모두의 퍼즐', photo: '내 사진으로', play: '지금 맞추기', about: '소개', my: '내 퍼즐', rank: '랭킹' },
    hero: { today: '오늘의 그림', pieces: (n: number) => `${n}조각`, cta: '오늘의 퍼즐 맞추기', photo: '내 사진으로 만들기', sameForAll: '', h1: '제대로 된 직소 퍼즐,\n폰에서도.', sub: '맞는 조각끼리 붙어서 뭉치로 움직이고, 색깔별로 더미를 나누고, 하던 판은 저장돼요. 링크 하나면 친구랑 같이 맞출 수 있어요.', feats: ['맞는 조각끼리 붙어서 뭉치로', '색깔별로 더미 나누기', '하던 판은 그대로 저장', '48조각부터 1000조각까지', '링크 하나로 친구랑 같이', '내 사진으로도'], pick: '퍼즐 고르기', statPuzzles: '퍼즐', statSolved: '완성된 판', todayLink: (t: string) => `오늘의 그림 · ${t} · 같이 맞추기` },
    how: { title: '이렇게 놀아요', steps: [['퍼즐 고르기', '마음에 드는 그림을 고르거나, 내 사진을 골라요.'], ['조각 수 정하기', '48조각으로 가볍게, 1000조각으로 제대로.'], ['끌어 올려 끼우기', '트레이에서 조각을 올려 놓으면 딸깍. 맞는 조각끼리는 붙어서 같이 움직여요.']] },
    catalog: { title: '퍼즐', sub: '', cats: '카테고리', every: '전체', catH1: (name: string) => `${name} 퍼즐`, catTitle: (name: string, n: number) => `${name} 퍼즐 ${n}점 — 무료 온라인 직소 퍼즐`, catDesc: (name: string, n: number) => `${name} 그림 ${n}점을 온라인 직소 퍼즐로. 48조각부터 1000조각까지 원하는 만큼 잘라 맞춰요. 가입도 설치도 없이 무료.`, showAll: (n: number) => `${n}점 전부 보기`, prev: '이전', next: '다음', all: (n: number) => `모두 ${n}점`, search: '제목·작가 검색', results: (n: number) => `${n}점`, none: '검색 결과가 없어요', noneAll: '전체에서 찾아보기 →', fav: '즐겨찾기', favAdd: '즐겨찾기에 추가', favRemove: '즐겨찾기에서 빼기', more: (n: number) => `${n}점 더 보기`, less: '접기' },
    // /photo/ 랜딩 — 히어로에서 바로 업로드, 아래는 SEO 본문(body 는 About 의 seo 와 같은 HTML 문자열 방식)
    photo: {
      seoTitle: '내 사진으로 퍼즐 만들기 — 무료 직소 퍼즐 제작',
      seoDesc: '가족사진·여행 사진·아이가 그린 그림을 직소 퍼즐로 만들어 바로 맞춰요. 사진은 기기 밖으로 나가지 않고, 48조각부터 1000조각까지 원하는 만큼. 가입도 설치도 없이 무료.',
      h1: '내 사진으로\n퍼즐 만들기',
      lead: '가족사진도, 여행 사진도, 아이가 그린 그림도. 고르는 순간 조각으로 잘려요.',
      cta: '사진 고르기', hint: '눌러서 고르거나 여기에 끌어다 놓기', another: '다른 사진', gridTpl: '{c}×{r} = {n}조각', fail: '사진을 읽지 못했어요. 다른 사진으로 해 보세요.',
      safe: '사진은 이 기기 안에서만 처리돼요. 서버로 올라가지 않습니다.',
      steps: [
        ['사진 고르기', '폰 앨범에서든 컴퓨터에서든. 가로세로 비율은 그대로 살려요.'],
        ['조각 수 정하기', '48조각이면 몇 분, 1000조각이면 며칠. 사진 비율에 맞춰 격자를 잡아 줍니다.'],
        ['맞추기', '맞는 조각끼리 붙어 뭉치로 움직여요. 하다 말면 그대로 저장됩니다.'],
      ] as [string, string][],
      body: `<h2>사진은 어디로 가나요</h2>
<p>어디로도 가지 않습니다. 고른 사진은 브라우저 안에서 잘려 조각이 되고, 진행 상황은 이 기기의 저장소에만 남습니다. 저희 서버에 사진이 올라가는 일은 없고, 따라서 저희가 그 사진을 볼 방법도 없습니다.</p>
<p>친구를 불러 같이 맞출 때도 마찬가지입니다. 사진은 방을 만든 사람의 브라우저에서 친구의 브라우저로 직접 건너갑니다. 서버는 두 브라우저가 서로를 찾도록 신호만 중계하고, 사진 자체는 지나가지 않습니다.</p>
<p>퍼즐을 다 맞추거나 목록에서 지우면 사진도 함께 지워집니다. 브라우저 데이터를 비우면 그때도 사라집니다.</p>
<h2>어떤 사진이 퍼즐로 잘 나오나요</h2>
<p>조각마다 단서가 있어야 재미있습니다. 색과 무늬가 고르게 퍼진 사진이 좋고, 하늘이나 흰 벽처럼 넓고 밋밋한 면이 크게 차지하는 사진은 그 부분에서 손이 멈춥니다. 물론 그걸 일부러 노리는 분도 있습니다.</p>
<p>인물 사진은 얼굴이 큼직하게 나온 쪽이 잘 맞춰집니다. 여러 명이 작게 찍힌 단체 사진은 조각 수를 낮추는 편이 낫습니다. 해상도는 긴 쪽이 1000픽셀만 넘으면 충분하고, 요즘 폰 사진은 전부 여유롭게 넘습니다.</p>
<h2>몇 조각이 좋을까요</h2>
<p>처음이라면 48조각이나 100조각으로 한 판 해 보고 정하시는 걸 권합니다. 대략 48조각은 몇 분, 200조각은 삼사십 분, 500조각은 두어 시간, 1000조각은 여러 날에 걸쳐 나눠 맞추게 됩니다. 직접 입력하면 2000조각까지 갑니다.</p>
<p>가로세로 비율에 맞춰 격자를 잡기 때문에 실제 조각 수는 고른 숫자 근처에서 조금 달라집니다. 세로로 긴 사진에 1000조각을 고르면 990조각이나 1008조각이 되는 식입니다.</p>
<h2>친구랑 같이 맞추기</h2>
<p>판을 열고 초대 버튼을 누르면 링크가 나옵니다. 그 링크를 받은 사람은 가입도 설치도 없이 바로 들어와 같은 판을 함께 맞춥니다. 최대 여덟 명까지 되고, 누가 어떤 조각을 잡고 있는지 서로 보입니다.</p>
<h2>선물로 만들 때</h2>
<p>생일이나 기념일에 사진 한 장을 퍼즐로 만들어 링크를 보내는 식으로 쓰는 분들이 있습니다. 받는 사람은 링크만 누르면 되고, 다 맞추면 원래 사진이 완성됩니다. 조각 수를 너무 높이면 부담스러우니 100~300조각 정도가 무난합니다.</p>`,
    },
    detail: { open: '이 그림으로 맞추기', start: '시작', pieces: '몇 조각으로 할까요?', best: (t: string) => `내 최고 기록 ${t}`, noBest: '아직 기록이 없어요', museum: '소장', year: '제작', medium: '재료', source: '작품 정보', sources: { aic: '시카고 미술관', commons: '위키미디어 공용', nasa: 'NASA' }, more: '이런 퍼즐도', back: '퍼즐', startDaily: '시작', gridOf: (c: number, r: number) => `${c}×${r}` },
    play: { resume: '이어하기', resumeTitle: '하던 퍼즐', resumeHint: (pct: number, t: string) => `${pct}% 완성 · ${t}`, startOver: '처음부터', restartAsk: '지금 판을 지우고 처음부터 할까요?', saved: '저장됨', piles: '더미', pileAll: '전체', pileEdge: '테두리', pileNew: '+ 새 더미', moveTo: '이 조각을 어디로?', pileName: (n: number) => `더미 ${n}`, sortColor: '색상순', shuffle: '섞기', outline: '조각 윤곽선', dropHere: '여기에 놓기', toPile: (n: string) => `${n}(으)로 옮김`, streak: (n: number) => `${n}일 연속 완주`, past: '지난 오늘의 퍼즐', done: '완성', notYet: '아직', invite: '초대', inviteLead: '아직 혼자예요. 링크를 보내면 친구가 바로 들어와요', players: '접속자', photoSolo: '친구를 초대해도 사진은 서버를 거치지 않고 내 브라우저에서 친구 브라우저로 직접 전달돼요', inviteTitle: '같이 맞추자 🧩', inviteText: 'jigsawlab에서 같이 퍼즐 맞추기', me: '나', nickAsk: '닉네임을 정해 주세요', roomGone: '방이 없거나 끝났어요', disconnected: '연결이 끊겼어요. 다시 연결 중…', reconnected: '다시 연결됐어요', gate: { kicker: '퍼즐 방 초대', login: 'Google 로 로그인하고 들어가기', loginSub: '선택 사항이에요. 업적과 하던 퍼즐이 기기 사이에 이어져요. 이메일·이름은 저장하지 않아요', or: '또는', guest: '손님으로', nickPh: '닉네임', guestSub: '닉네임만 적고 바로 들어가요. 기록은 이 브라우저에만 남아요', online: (n: number) => `${n}명 접속 중` }, cloud: '동기화됨', cloudSave: '서버에 저장', cloudSaved: '서버에 저장했어요. 다른 기기에서 이어할 수 있어요', cloudFail: '저장이 안 됐어요. 잠시 뒤 다시 눌러 주세요', photoRecv: '방장에게서 사진 받는 중…', photoWait: '사진을 가진 사람이 아직 없어요. 방장이 들어오면 자동으로 받아요', photoFail: '사진을 받지 못했어요. 방장이 접속해 있어야 하고, 일부 네트워크에서는 연결이 안 될 수 있어요', joined: (n: string) => `${n} 들어옴`, heldBy: (n: string) => (n ? `${n}이 잡고 있어요` : '다른 사람이 잡고 있어요'), photoHostNote: '내 사진으로 만든 방이에요. 사진을 올린 사람이 나가면 방이 끝나요 — 그 사람은 창을 열어 두세요', hostAway: '사진을 올린 분의 연결이 끊겼어요. 돌아오지 않으면 이 방은 곧 끝나요', hostGone: '사진을 올린 분이 나갔어요. 새로 들어올 수 없고, 새로 고치면 사진을 다시 받을 수 없어요', hostBack: '사진을 올린 분이 돌아왔어요', photoGone: '사진을 올린 분이 나가서 이 방은 열 수 없어요. 방장이 다시 들어오면 열려요', quitHostAsk: '나가면 사진을 보낼 사람이 없어 이 방이 끝나요. 나갈까요?', together: '친구랑 같이', togetherSub: '링크 하나로 같이 맞춰요. 가입 없음, 최대 8명', creating: '방 만드는 중…', joining: '방에 들어가는 중…', guest: '손님', rename: '이름 바꾸기', today: '오늘' },
    // 상설 공개 판 — 사이트가 굴리는 방 하나(/together/ → /board/?room=live). 유저가 만들지 않고, 한 판이 끝나면 다음 그림으로 이어진다
    live: {
      seoTitle: '다 같이 맞추는 1000조각 온라인 퍼즐 — 모두의 퍼즐',
      seoDesc: '누구나 들어와서 몇 조각 놓고 갈 수 있는 공개 퍼즐 판. 1000조각을 여럿이 나눠 맞추고, 다 맞추면 다음 그림이 시작돼요. 가입도 설치도 없이 무료.',
      h1: '다 같이 맞추는\n1000조각 퍼즐',
      lead: '판은 하나뿐이고 늘 열려 있어요. 몇 조각만 놓고 나가도 됩니다 — 다음 사람이 이어서 맞춰요.',
      badge: '모두의 퍼즐', cta: '이어서 맞추기', ctaFirst: '들어가서 맞추기', now: '지금 맞추는 그림',
      round: (n: number) => `${n}번째 판`, pct: (n: number) => `${n}% 완성`, left: (n: number) => `${n}조각 남음`,
      online: (n: number) => `${n}명이 맞추는 중`, alone: '지금은 아무도 없어요', loading: '판을 보는 중…',
      offline: '판을 불러오지 못했어요. 들어가면 바로 이어집니다',
      gateKicker: '지금 다 같이 맞추는 중',
      doneNote: (n: number) => `다 맞췄어요! 이번 판에서 내가 놓은 조각 ${n}개 · 곧 다음 그림이 시작돼요`,
      opening: '다음 그림을 펴는 중…', nextToast: (t: string) => `다음 그림 · ${t}`,
      shareTitle: '다 같이 퍼즐 맞추자 🧩', shareText: 'jigsawlab 공개 판에서 1000조각 같이 맞추기',
      full: '지금 자리가 다 찼어요. 잠시 뒤에 다시 들어와 주세요',
      steps: [
        ['들어가기', '가입도 설치도 없어요. 닉네임만 정하면 바로 판 위에 섭니다.'],
        ['몇 조각 놓기', '한 조각만 놓고 나가도 됩니다. 놓인 조각은 그대로 남아요.'],
        ['다음 그림', '1000조각을 다 맞추면 새 그림이 깔리고 처음부터 다시 시작해요.'],
      ] as [string, string][],
      body: `<h2>모두의 퍼즐이 뭔가요</h2>
<p>사이트가 굴리는 퍼즐 판 하나입니다. 방을 만들 필요도, 누구를 기다릴 필요도 없습니다. 링크를 열면 지금 진행 중인 1000조각 판 위에 바로 서게 되고, 다른 사람이 놓아 둔 조각이 이미 자리를 잡고 있습니다.</p>
<p>조각을 몇 개 놓고 나가도 괜찮습니다. 맞춰 놓은 자리는 그대로 남고, 다음에 들어온 사람이 이어서 맞춥니다. 며칠에 걸쳐 조금씩 채워지는 판이라 어제와 오늘의 진행률이 다릅니다.</p>
<h2>언제 다음 그림으로 넘어가나요</h2>
<p>정해진 기간은 없습니다. 1000조각이 전부 제자리에 들어가면 완성된 그림을 잠깐 함께 보고, 곧바로 새 그림이 깔립니다. 오래 아무도 손대지 않는 판은 자동으로 접고 다음 그림으로 넘어갑니다.</p>
<p>그림은 명화·한국 회화·빈티지 사진·우주 사진 가운데 회차마다 하나씩 돌아가며 나옵니다. 한 바퀴를 다 돌기 전에는 같은 그림이 다시 나오지 않습니다.</p>
<h2>친구랑 둘이서만 맞추고 싶다면</h2>
<p>퍼즐 상세 페이지에서 <b>친구랑 같이</b>를 누르면 우리끼리만 들어가는 방이 따로 만들어집니다. 그림도 조각 수도 직접 고르고, 링크를 받은 사람만 들어옵니다.</p>`,
    },
    acct: { login: '로그인', close: '닫기', dlgTitle: '로그인', dlgLead: '완성 기록과 하던 퍼즐을 기기 사이에 이어 가려면 로그인하세요. 로그인 없이도 모든 퍼즐을 즐길 수 있어요', google: 'Google 로 시작하기', dlgPoints: ['이메일·이름·프로필 사진은 받지 않아요', '완성한 퍼즐과 하던 판이 어느 기기에서든 이어져요', '언제든 계정과 기록을 한 번에 지울 수 있어요'], nickTitle: '닉네임을 정해 주세요', nickLead: '퍼즐 방에서 이 이름으로 보여요', nickPh: '닉네임', nickHint: '최대 12자 · 취소하면 이 이름으로 시작해요 · 나중에 내 퍼즐에서 바꿀 수 있어요', nickStart: '시작하기', nickSave: '저장', later: '취소', shuffle: '다른 이름', logout: '로그아웃', title: '계정', signedIn: (n: string) => `${n} 으로 로그인됨`, notSignedIn: '로그인하지 않았어요', why: 'Google 로그인은 선택 사항이에요. 완성 기록과 하던 퍼즐(명화·오늘의 퍼즐)이 기기 사이에 이어져요. 서버에 저장되는 건 Google 계정에서 만든 가명 ID와 닉네임뿐이고, 이메일·이름·프로필 사진은 받지 않아요', loginBtn: 'Google 로 로그인', rename: '닉네임 바꾸기', del: '계정과 기록 삭제', delAsk: '서버에 저장된 완성 기록과 하던 퍼즐을 모두 지우고 계정을 삭제할까요? 이 브라우저의 기록은 남아요', deleted: '삭제했어요', fail: '로그인이 안 됐어요. 다시 시도해 주세요', synced: '동기화됨' },
    my: { title: '내 퍼즐', inProgress: '하던 퍼즐', done: '완성한 퍼즐', favs: '즐겨찾기', emptyProgress: '하던 퍼즐이 없어요', emptyDone: '아직 완성한 퍼즐이 없어요', emptyFavs: '퍼즐의 하트를 누르면 여기 모여요', resume: '이어하기', del: '지우기', pieces: (n: number) => `${n}조각`, photo: '내 사진', doneCount: (n: number) => `${n}판`, onDevice: '이 기기에만 저장돼요' },
    lv: {
      h1: '랭킹', lead: '조각을 많이 맞춘 사람이 위로 갑니다. 이번 주와 전체 누적, 두 가지로 세어요',
      seoTitle: '직소 퍼즐 랭킹 — 이번 주 XP와 전체 누적 · 직소랩',
      seoDesc: '직소랩 랭킹. 조각을 맞출수록 XP 가 쌓이고 레벨이 오르고 업적이 열려요. 이번 주 랭킹은 월요일마다 새로 시작해요. Google 로그인만 하면 바로 올라갑니다.',
      tabWeek: '이번 주', tabAll: '전체 누적', weekOf: (d: string) => `${d} 주간`,
      loading: '불러오는 중…', fail: '랭킹을 불러오지 못했어요', empty: '이번 주엔 아직 아무도 없어요. 한 판 맞추면 첫 줄이 내 이름이에요', emptyAll: '아직 기록이 없어요',
      xp: (n: number) => `${n.toLocaleString()} XP`, lvl: (n: number) => `Lv ${n}`, nth: (n: number) => `${n}위`, outOfTop: '50위 밖',
      meTitle: '내 기록', meNone: '아직 XP 가 없어요. 한 판 맞추면 시작돼요',
      loginLead: '로그인하면 레벨과 업적이 쌓이고 랭킹에 이름이 올라가요. 이메일·이름은 받지 않아요', loginBtn: 'Google 로 로그인',
      rulesTitle: 'XP 는 이렇게 쌓여요',
      rules: ['조각 하나를 제자리에 놓으면 1 XP. 1000조각 판을 끝내면 1000 XP', '오늘의 퍼즐은 1.5배', '이미 그만큼 깨 본 그림을 다시 맞추면 4분의 1', '방에서는 내가 놓은 조각만큼', '하루에 받는 XP 는 5,000 까지', '시간과 수순은 안 봐요 — 빨리 푼 사람이 아니라 많이 맞춘 사람이 위로 갑니다'],
      tiersTitle: '레벨', tiersLead: 'XP 가 쌓이면 레벨이 오릅니다. 최고 99레벨', fromLv: (n: number) => `Lv ${n}부터`,
      badgesTitle: '업적', badgesLead: (n: number) => `업적 ${n}가지. 딴 업적은 내 퍼즐 화면에 모여요`,
      myLevel: '내 레벨', nextIn: (n: number) => `다음 레벨까지 ${n.toLocaleString()} XP`, maxed: '최고 레벨에 닿았어요',
      totalXp: '누적 XP', weekXp: '이번 주 XP', rankAll: '전체 순위', rankWeek: '주간 순위', none: '—',
      badgeCount: (a: number, b: number) => `${a} / ${b}`, lockedHint: (n: string) => `아직: ${n}`,
      statSolved: '완성한 판', statPieces: '맞춘 조각', statWorks: '완성한 그림', statStreak: '최고 연속',
      gained: (n: number) => `+${n.toLocaleString()} XP`, levelUp: (n: number) => `Lv ${n} 달성!`, newBadge: '새 업적', capped: '오늘 XP 한도까지 채웠어요',
      seeRank: '랭킹', seeMy: '내 업적', signInGain: '로그인하면 이 판이 XP 로 쌓여요',
      merged: (xp: string, lv: number) => `그동안 맞춘 기록이 ${xp} XP · Lv ${lv} 로 쌓였어요`,
      earn: (n: string) => `다 맞추면 +${n} XP`, earnDaily: (n: string) => `다 맞추면 +${n} XP · 오늘의 퍼즐은 1.5배`, earnLive: '내가 놓은 조각 하나에 1 XP',
    },
    guide: '가이드',
    about: { seoTitle: '직소 퍼즐 하는 법 — 조각 수 고르기부터 내 사진 퍼즐까지 · 직소랩', title: 'jigsawlab', lead: '직소랩(jigsawlab)은 실물 퍼즐 하던 손맛을 그대로 옮긴 온라인 직소 퍼즐이에요. 가입 없이, 사진은 폰 밖으로 안 나가요.', points: (n: number) => [['조각끼리 붙어요', '맞는 조각을 맞대면 딸깍 붙고, 뭉치째 움직여요. 1000조각도 그렇게 끝까지.'], ['하던 판은 저장', '나갔다 와도 그대로. 더미 나눠둔 것, 정렬해둔 순서까지.'], ['내 사진, 내 폰 안에서', '사진은 서버로 안 가요. 가족 사진도 마음 놓고.'], [`그림과 사진 ${n}점`, '고흐, 모네, 호쿠사이, 김홍도, 모리스. 그림 이야기도 같이 읽어요.']], guide: '자세히' },
    foot: { privacy: '개인정보처리방침', terms: '이용약관', termsTitle: '이용약관', contact: '문의', madeBy: '', rights: '그림은 모두 퍼블릭 도메인입니다', copied: '링크를 복사했어요', shareFail: '공유가 안 됐어요', privacyTitle: '개인정보처리방침', toHome: '홈으로' },
  },
  en: {
    name: 'jigsawlab', altName: '', tagline: 'Online jigsaw puzzles. Masterpieces and your photos, on your phone.', langName: 'English', seoTitle: 'jigsawlab — Free online jigsaw puzzles from masterpieces and your photos', seoDesc: (n: number) => `Free online jigsaw puzzles from ${n} public-domain pictures or your own photos. Send one link and solve together with friends, pieces snap into clusters, and your board is saved. 48 to 1000 pieces, no sign-up.`,
    nav: { daily: "Today's puzzle", catalog: 'Puzzles', together: 'Open board', photo: 'Your photo', play: 'Play now', about: 'About', my: 'My puzzles', rank: 'Leaderboard' },
    hero: { today: "Today's picture", pieces: (n: number) => `${n} pieces`, cta: "Solve today's puzzle", photo: 'Make one from my photo', sameForAll: '', h1: 'A real jigsaw,\non your phone.', sub: 'Pieces that fit snap together and move as a cluster, sort into piles by colour, and your board is saved when you leave. Send a link and solve it with friends.', feats: ['Matching pieces snap into clusters', 'Sort into piles by colour', 'Your board is saved as you go', 'From 48 to 1000 pieces', 'Play with friends from one link', 'Your own photos too'], pick: 'Pick a puzzle', statPuzzles: 'puzzles', statSolved: 'boards finished', todayLink: (t: string) => `Today's picture · ${t} · solve it together` },
    how: { title: 'How to play', steps: [['Pick a puzzle', 'A painting you like, or one of your own photos.'], ['Choose a piece count', '48 for a quick one, 1000 for the real thing.'], ['Drag up and snap', 'Pull a piece up from the tray and drop it. Matching pieces click together and move as one.']] },
    catalog: { title: 'Puzzles', sub: '', cats: 'Categories', every: 'All', catH1: (name: string) => `${name} jigsaw puzzles`, catTitle: (name: string, n: number) => `${name} jigsaw puzzles — ${n} free online puzzles`, catDesc: (name: string, n: number) => `${n} pictures from ${name}, ready to solve as online jigsaw puzzles. Anything from 48 to 1000 pieces. Free, no sign-up, no install.`, showAll: (n: number) => `Show all ${n}`, prev: 'Previous', next: 'Next', all: (n: number) => `${n} puzzles`, search: 'Search title or artist', results: (n: number) => `${n} puzzles`, none: 'No matches',  noneAll: 'Search all puzzles →', fav: 'Favourites', favAdd: 'Add to favourites', favRemove: 'Remove from favourites', more: (n: number) => `Show ${n} more`, less: 'Show less' },
    photo: {
      seoTitle: 'Make a jigsaw puzzle from your own photo — free',
      seoDesc: 'Turn a family photo, a holiday shot or a child\'s drawing into a jigsaw puzzle and solve it right away. Your photo never leaves your device. 48 to 1000 pieces, free, no sign-up.',
      h1: 'Make a puzzle\nfrom your photo',
      lead: 'Family photos, holidays, a drawing your kid brought home. Pick one and it is cut into pieces on the spot.',
      cta: 'Choose a photo', hint: 'Tap to choose, or drop a photo here', another: 'Another photo', gridTpl: '{c}×{r} = {n} pieces', fail: "Couldn't read that photo. Try another one.",
      safe: 'Your photo is handled entirely on this device. It is never uploaded to a server.',
      steps: [
        ['Choose a photo', 'From your phone\'s album or your computer. The aspect ratio is kept as it is.'],
        ['Pick the piece count', '48 pieces takes minutes, 1000 takes days. The grid is fitted to your photo\'s shape.'],
        ['Solve it', 'Matching pieces snap together and move as a cluster. Stop anytime and the board is saved.'],
      ] as [string, string][],
      body: `<h2>Where does the photo go</h2>
<p>Nowhere. The photo you pick is cut into pieces inside your browser, and your progress is kept in this device's own storage. Nothing is uploaded to our servers, which also means we have no way of seeing it.</p>
<p>The same holds when you invite a friend. The photo travels straight from the host's browser to your friend's. Our server only relays the signals the two browsers need to find each other — the picture itself never passes through it.</p>
<p>When you finish a puzzle or delete it from your list, the photo goes with it. Clearing your browser data removes it too.</p>
<h2>Which photos make good puzzles</h2>
<p>Every piece needs a clue on it. Photos with colour and detail spread evenly across the frame work best, while a big expanse of sky or a plain white wall will stall you right there — though some people pick those on purpose.</p>
<p>Portraits work well when the face is large in the frame. Group shots where everyone is small are better at a lower piece count. As for resolution, anything over about 1000 pixels on the long edge is plenty, and every modern phone photo clears that comfortably.</p>
<h2>How many pieces</h2>
<p>If this is your first one, try 48 or 100 pieces and go from there. Roughly: 48 pieces takes a few minutes, 200 takes half an hour or so, 500 runs to a couple of hours, and 1000 is something you come back to over several days. Type your own number and it goes up to 2000.</p>
<p>Because the grid is fitted to your photo's aspect ratio, the real count lands near the number you picked rather than exactly on it. Choose 1000 for a tall photo and you may get 990 or 1008.</p>
<h2>Solving it with friends</h2>
<p>Open a board, press invite, and you get a link. Whoever opens it joins the same board straight away — no sign-up, no install. Up to eight people at once, and you can see which piece each person is holding.</p>
<h2>Making one as a gift</h2>
<p>Some people turn a single photo into a puzzle for a birthday or an anniversary and send the link. The other person just taps it, and the original photo appears as they finish. Keep it around 100 to 300 pieces — much higher starts to feel like a chore rather than a present.</p>`,
    },
    detail: { open: 'Solve this painting', start: 'Start', pieces: 'How many pieces?', best: (t: string) => `Your best ${t}`, noBest: 'No record yet', museum: 'Collection', year: 'Painted', medium: 'Medium', source: 'Object record', sources: { aic: 'Art Institute of Chicago', commons: 'Wikimedia Commons', nasa: 'NASA' }, more: 'More like this', back: 'Puzzles', startDaily: 'start', gridOf: (c: number, r: number) => `${c}×${r}` },
    play: { resume: 'Continue', resumeTitle: 'Puzzle in progress', resumeHint: (pct: number, t: string) => `${pct}% done · ${t}`, startOver: 'Start over', restartAsk: 'Clear this board and start over?', saved: 'Saved', piles: 'Piles', pileAll: 'All', pileEdge: 'Edges', pileNew: '+ New pile', moveTo: 'Move this piece to', pileName: (n: number) => `Pile ${n}`, sortColor: 'By colour', shuffle: 'Shuffle', outline: 'Piece outlines', dropHere: 'Drop here', toPile: (n: string) => `Moved to ${n}`, streak: (n: number) => `${n}-day streak`, past: 'Past daily puzzles', done: 'Done', notYet: 'Not yet', invite: 'Invite', inviteLead: 'Just you so far. Send the link and a friend can join right away', players: 'In the room', photoSolo: 'If you invite friends, the photo goes straight from your browser to theirs. It never touches our server', inviteTitle: 'Solve this with me 🧩', inviteText: 'Jigsaw together on jigsawlab', me: 'me', nickAsk: 'Pick a nickname', roomGone: 'That room is gone', disconnected: 'Connection lost. Reconnecting…', reconnected: 'Reconnected', gate: { kicker: 'Puzzle room invite', login: 'Sign in with Google and join', loginSub: 'Optional. Keeps your finished puzzles and boards in progress across devices. No email or name is stored', or: 'or', guest: 'Join as guest', nickPh: 'Nickname', guestSub: 'Just a nickname. Records stay in this browser only', online: (n: number) => `${n} online` }, cloud: 'Synced', cloudSave: 'Save to server', cloudSaved: 'Saved to the server. Continue on any device', cloudFail: "Couldn't save. Try again in a moment", photoRecv: 'Receiving the photo from the host…', photoWait: 'Nobody with the photo is here yet. It arrives automatically when the host is back', photoFail: "Couldn't receive the photo. The host must be online, and some networks block the direct connection", joined: (n: string) => `${n} joined`, heldBy: (n: string) => (n ? `${n} is holding that` : 'Someone else is holding that'), photoHostNote: 'This room runs on a photo. When the person who shared it leaves, the room ends — they should keep this tab open', hostAway: 'The person with the photo just dropped out. If they do not come back, this room ends shortly', hostGone: 'The person with the photo has left. Nobody new can join, and reloading loses the photo', hostBack: 'The person with the photo is back', photoGone: "The person who shared the photo has left, so this room can't be opened. It opens again if they come back", quitHostAsk: 'If you leave, nobody can send the photo and this room ends. Leave anyway?', together: 'Play with friends', togetherSub: 'One link, up to 8 people, no sign-up', creating: 'Creating a room…', joining: 'Joining the room…', guest: 'Guest', rename: 'Change name', today: 'Today' },
    live: {
      seoTitle: 'The 1000-piece online jigsaw everyone is solving — the open board',
      seoDesc: 'One public jigsaw board, always open. Drop in, place a few pieces, leave whenever. When the 1000 pieces are done, the next picture begins. Free, no sign-up.',
      h1: 'The board\neveryone is solving',
      lead: 'One board, always open. Place a few pieces and go — whoever comes next picks up where you left off.',
      badge: 'Open board', cta: 'Join the board', ctaFirst: 'Join the board', now: 'Now solving',
      round: (n: number) => `Board #${n}`, pct: (n: number) => `${n}% done`, left: (n: number) => `${n} pieces left`,
      online: (n: number) => `${n} solving now`, alone: 'Nobody here right now', loading: 'Checking the board…',
      offline: "Couldn't load the board. Join and it picks up anyway",
      gateKicker: 'Everyone is solving this now',
      doneNote: (n: number) => `Finished! You placed ${n} pieces on this one · the next picture starts shortly`,
      opening: 'Laying out the next picture…', nextToast: (t: string) => `Next picture · ${t}`,
      shareTitle: "Let's solve this together 🧩", shareText: 'A 1000-piece jigsaw everyone is solving on jigsawlab',
      full: 'The board is full right now. Try again in a little while',
      steps: [
        ['Walk in', 'No sign-up, no install. Pick a nickname and you are on the board.'],
        ['Place a few pieces', 'One piece is fine. Whatever you place stays where you put it.'],
        ['Next picture', 'When all 1000 pieces are in, a new picture is laid out and it starts again.'],
      ] as [string, string][],
      body: `<h2>What is the open board</h2>
<p>It is a single jigsaw board that the site keeps running. There is no room to create and nobody to wait for. Open the link and you are standing on the 1000-piece board that is going right now, with other people's pieces already in place.</p>
<p>Placing a handful of pieces and leaving is perfectly fine. What you placed stays put, and whoever arrives next carries on. The board fills up over days, so the progress you see today is not the progress you saw yesterday.</p>
<h2>When does the next picture start</h2>
<p>There is no fixed schedule. Once all 1000 pieces are home, everyone looks at the finished picture for a moment and a new one is laid out. A board nobody has touched for a long time is retired automatically and the next picture begins.</p>
<p>Pictures rotate through masterpieces, Korean paintings, vintage photographs and space imagery, one per round. No picture comes back until the whole rotation has been through.</p>
<h2>If you would rather play just with friends</h2>
<p>On any puzzle page, <b>Play with friends</b> creates a private room of your own — your picture, your piece count, and only the people you send the link to.</p>`,
    },
    acct: { login: 'Sign in', close: 'Close', dlgTitle: 'Sign in', dlgLead: 'Sign in to keep your finished puzzles and boards in progress across devices. Everything works without it too', google: 'Continue with Google', dlgPoints: ['No email, name or profile photo is collected', 'Finished puzzles and boards follow you to any device', 'Delete your account and every record at any time'], nickTitle: 'Pick a nickname', nickLead: 'This is how you appear in puzzle rooms', nickPh: 'Nickname', nickHint: 'Up to 12 characters · cancel keeps the suggested name · change it later in My puzzles', nickStart: 'Start', nickSave: 'Save', later: 'Cancel', shuffle: 'Another name', logout: 'Sign out', title: 'Account', signedIn: (n: string) => `Signed in as ${n}`, notSignedIn: 'Not signed in', why: 'Google sign-in is optional. It keeps your finished puzzles and boards in progress (paintings and daily puzzles) across devices. The server stores only a pseudonymous ID derived from your Google account and your nickname. No email, name or photo is requested', loginBtn: 'Sign in with Google', rename: 'Change nickname', del: 'Delete account and records', delAsk: 'Delete all finished records and saved boards on the server and remove the account? Records in this browser stay', deleted: 'Deleted', fail: "Sign-in didn't work. Please try again", synced: 'Synced' },
    my: { title: 'My puzzles', inProgress: 'In progress', done: 'Finished', favs: 'Favourites', emptyProgress: 'Nothing in progress', emptyDone: 'No finished puzzles yet', emptyFavs: 'Tap the heart on a puzzle to collect it here', resume: 'Continue', del: 'Delete', pieces: (n: number) => `${n} pieces`, photo: 'My photo', doneCount: (n: number) => `${n} puzzles`, onDevice: 'Stored on this device only' },
    lv: {
      h1: 'Leaderboard', lead: 'The board goes to whoever places the most pieces. Counted two ways: this week, and all time',
      seoTitle: 'Jigsaw puzzle leaderboard — weekly and all-time XP · jigsawlab',
      seoDesc: 'The jigsawlab leaderboard. Every piece you place earns XP, raises your level and unlocks badges. The weekly board resets every Monday. Sign in with Google and you are on it.',
      tabWeek: 'This week', tabAll: 'All time', weekOf: (d: string) => `Week of ${d}`,
      loading: 'Loading…', fail: "Couldn't load the leaderboard", empty: 'Nobody yet this week. Finish one board and the first line is yours', emptyAll: 'No records yet',
      xp: (n: number) => `${n.toLocaleString()} XP`, lvl: (n: number) => `Lv ${n}`, nth: (n: number) => `#${n}`, outOfTop: 'Outside the top 50',
      meTitle: 'You', meNone: 'No XP yet. Finish a board to start',
      loginLead: 'Sign in to build a level, collect badges and appear on the board. No email or name is collected', loginBtn: 'Sign in with Google',
      rulesTitle: 'How XP works',
      rules: ['Every piece you place is 1 XP, so a finished 1000-piece board is 1000 XP', 'Daily puzzles count 1.5×', 'Re-solving a picture you already cleared at that size counts a quarter', 'In a room you earn XP for the pieces you placed yourself', 'Up to 5,000 XP a day', 'Time and moves are not counted — the board rewards solving a lot, not solving fast'],
      tiersTitle: 'Levels', tiersLead: 'XP raises your level. Level 99 is the ceiling', fromLv: (n: number) => `From Lv ${n}`,
      badgesTitle: 'Badges', badgesLead: (n: number) => `${n} badges to collect. The ones you have show up on My puzzles`,
      myLevel: 'Your level', nextIn: (n: number) => `${n.toLocaleString()} XP to the next level`, maxed: 'Top level reached',
      totalXp: 'Total XP', weekXp: 'XP this week', rankAll: 'All-time rank', rankWeek: 'Weekly rank', none: '—',
      badgeCount: (a: number, b: number) => `${a} / ${b}`, lockedHint: (n: string) => `Locked: ${n}`,
      statSolved: 'Boards finished', statPieces: 'Pieces placed', statWorks: 'Pictures finished', statStreak: 'Best streak',
      gained: (n: number) => `+${n.toLocaleString()} XP`, levelUp: (n: number) => `Level ${n}!`, newBadge: 'New badge', capped: "You've hit today's XP cap",
      seeRank: 'Leaderboard', seeMy: 'My badges', signInGain: 'Sign in and boards like this earn XP',
      merged: (xp: string, lv: number) => `Your past boards came to ${xp} XP · Lv ${lv}`,
      earn: (n: string) => `+${n} XP when you finish`, earnDaily: (n: string) => `+${n} XP when you finish · daily counts 1.5×`, earnLive: '1 XP for every piece you place',
    },
    guide: 'Guide',
    about: { seoTitle: 'How to play jigsaw puzzles online — piece counts, photo puzzles · jigsawlab', title: 'jigsawlab', lead: 'The feel of a real jigsaw, on your phone. No sign-up, and your photo stays on your device.', points: (n: number) => [['Pieces snap together', 'Put matching pieces side by side and they click, then move as one cluster. That is how you finish 1000 pieces.'], ['Your board is saved', 'Leave and come back: piles, sort order, everything is where you left it.'], ['Your photo, on your phone', 'Photos never go to a server. Family pictures are safe.'], [`${n} pictures`, 'Van Gogh, Monet, Hokusai, Kim Hong-do, Morris. Read the story behind each one.']], guide: 'More' },
    foot: { privacy: 'Privacy', terms: 'Terms', termsTitle: 'Terms of Service', contact: 'Contact', madeBy: '', rights: 'All paintings are in the public domain', copied: 'Link copied', shareFail: "Couldn't share", privacyTitle: 'Privacy policy', toHome: 'Home' },
  },
  ja: {
    name: 'jigsawlab', altName: '', tagline: 'オンラインジグソーパズル。名画と自分の写真で、スマホでも。', langName: '日本語', seoTitle: 'jigsawlab — 名画と自分の写真で遊ぶ無料オンラインジグソーパズル', seoDesc: (n: number) => `名画・写真${n}点や自分の写真で作る無料のオンラインジグソーパズル。リンク一つで友だちを呼んで一緒に組め、合うピースはくっつき、途中の盤面は保存。48〜1000ピース、登録不要。`,
    nav: { daily: '今日のパズル', catalog: 'パズル', together: 'みんなのパズル', photo: '自分の写真で', play: '今すぐ遊ぶ', about: 'サイトについて', my: 'マイパズル', rank: 'ランキング' },
    hero: { today: '今日の絵', pieces: (n: number) => `${n}ピース`, cta: '今日のパズルを解く', photo: '自分の写真で作る', sameForAll: '', h1: '本物のジグソーを、\nスマホでも。', sub: '合うピースはくっついて塊で動き、色ごとに山に分け、途中の盤面は保存されます。リンク一つで友だちと一緒に組めます。', feats: ['合うピースはくっついて塊に', '色ごとに山を分ける', '途中の盤面はそのまま保存', '48ピースから1000ピースまで', 'リンク一つで友だちと一緒に', '自分の写真でも'], pick: 'パズルを選ぶ', statPuzzles: 'パズル', statSolved: '完成した盤面', todayLink: (t: string) => `今日の絵 · ${t} · 一緒に組む` },
    how: { title: '遊び方', steps: [['パズルを選ぶ', '好きな絵を選ぶか、自分の写真を。'], ['ピース数を決める', '48で軽く、1000で本格的に。'], ['引き上げてはめる', 'トレイからピースを上げて置くとカチッ。合うピース同士はくっついて一緒に動きます。']] },
    catalog: { title: 'パズル', sub: '', cats: 'カテゴリー', every: 'すべて', catH1: (name: string) => `${name}のパズル`, catTitle: (name: string, n: number) => `${name}のジグソーパズル${n}点 — 無料オンライン`, catDesc: (name: string, n: number) => `${name}の絵${n}点をオンラインのジグソーパズルで。48ピースから1000ピースまで好きな数に切り分けて遊べます。登録不要・無料。`, showAll: (n: number) => `全${n}点を見る`, prev: '前へ', next: '次へ', all: (n: number) => `全${n}点`, search: '題名・作家で検索', results: (n: number) => `${n}点`, none: '該当なし', noneAll: 'すべてから探す →', fav: 'お気に入り', favAdd: 'お気に入りに追加', favRemove: 'お気に入りから外す', more: (n: number) => `さらに${n}点`, less: '閉じる' },
    photo: {
      seoTitle: '自分の写真でジグソーパズルを作る — 無料',
      seoDesc: '家族写真・旅の写真・子どもの絵をジグソーパズルにしてそのまま遊べます。写真は端末の外に出ません。48ピースから1000ピースまで、登録不要・無料。',
      h1: '自分の写真で\nパズルを作る',
      lead: '家族写真も、旅の写真も、子どもが描いた絵も。選んだそのときにピースへ切り分けます。',
      cta: '写真を選ぶ', hint: 'タップして選ぶか、ここにドロップ', another: '別の写真', gridTpl: '{c}×{r} = {n}ピース', fail: '写真を読み込めませんでした。別の写真でお試しください。',
      safe: '写真はこの端末の中だけで処理されます。サーバーにアップロードされることはありません。',
      steps: [
        ['写真を選ぶ', 'スマホのアルバムからでもパソコンからでも。縦横比はそのまま活かします。'],
        ['ピース数を決める', '48ピースなら数分、1000ピースなら数日。写真の比率に合わせて格子を組みます。'],
        ['組む', '合うピース同士がくっついて塊で動きます。途中でやめてもそのまま保存されます。'],
      ] as [string, string][],
      body: `<h2>写真はどこへ行くのか</h2>
<p>どこへも行きません。選んだ写真はブラウザの中で切り分けられ、進行状況はこの端末の保存領域にだけ残ります。私たちのサーバーに上がることはなく、したがって私たちがその写真を見る手段もありません。</p>
<p>友だちを招いて一緒に組むときも同じです。写真は部屋を作った人のブラウザから友だちのブラウザへ直接渡ります。サーバーは二つのブラウザが互いを見つけるための信号を中継するだけで、写真そのものは通りません。</p>
<p>パズルを完成させるか一覧から削除すると、写真も一緒に消えます。ブラウザのデータを消去したときも同様です。</p>
<h2>どんな写真がパズルに向くか</h2>
<p>ピースごとに手がかりが要ります。色や模様が画面全体に散らばっている写真が向いていて、空や白い壁のような広く平坦な面が大きく占める写真は、その部分で手が止まります。もっとも、それを承知で選ぶ人もいます。</p>
<p>人物写真は顔が大きく写っているほうが組みやすくなります。全員が小さく写った集合写真は、ピース数を抑えたほうが快適です。解像度は長辺が1000ピクセルを超えていれば十分で、最近のスマホの写真はどれも余裕で超えています。</p>
<h2>何ピースがいいか</h2>
<p>初めてなら48ピースか100ピースで一度組んでから決めることをおすすめします。目安として48ピースは数分、200ピースは三、四十分、500ピースは二時間ほど、1000ピースは何日かに分けて組むことになります。自分で入力すれば2000ピースまで指定できます。</p>
<p>縦横比に合わせて格子を組むため、実際のピース数は選んだ数の近くで少しずれます。縦長の写真で1000を選ぶと990や1008になる、といった具合です。</p>
<h2>友だちと一緒に組む</h2>
<p>盤面を開いて招待ボタンを押すとリンクが出ます。受け取った人は登録もインストールもなしにそのまま入って、同じ盤面を一緒に組めます。最大八人まで、誰がどのピースを持っているかも見えます。</p>
<h2>贈り物として作る</h2>
<p>誕生日や記念日に写真一枚をパズルにしてリンクを送る、という使い方をする人がいます。受け取る側はリンクを開くだけで、組み上がると元の写真が現れます。ピース数を上げすぎると負担になるので、100〜300ピースあたりが無難です。</p>`,
    },
    detail: { open: 'この絵で遊ぶ', start: 'スタート', pieces: '何ピースにしますか？', best: (t: string) => `自己ベスト ${t}`, noBest: 'まだ記録がありません', museum: '所蔵', year: '制作', medium: '素材', source: '作品情報', sources: { aic: 'シカゴ美術館', commons: 'ウィキメディア・コモンズ', nasa: 'NASA' }, more: 'こんなパズルも', back: 'パズル', startDaily: 'を始める', gridOf: (c: number, r: number) => `${c}×${r}` },
    play: { resume: '続きから', resumeTitle: '途中のパズル', resumeHint: (pct: number, t: string) => `${pct}% 完成 · ${t}`, startOver: '最初から', restartAsk: 'この盤面を消して最初からやり直しますか？', saved: '保存済み', piles: '山', pileAll: '全部', pileEdge: '縁', pileNew: '+ 新しい山', moveTo: 'このピースをどこへ？', pileName: (n: number) => `山 ${n}`, sortColor: '色順', shuffle: 'シャッフル', outline: 'ピースの輪郭', dropHere: 'ここに置く', toPile: (n: string) => `${n}へ移動`, streak: (n: number) => `${n}日連続完成`, past: '過去の今日のパズル', done: '完成', notYet: 'まだ', invite: '招待', inviteLead: 'まだ一人です。リンクを送ればすぐに友だちが入れます', players: '参加者', photoSolo: '友だちを招待しても、写真はサーバーを経由せず自分のブラウザから友だちのブラウザへ直接送られます', inviteTitle: '一緒に組もう 🧩', inviteText: 'jigsawlabで一緒にジグソー', me: '自分', nickAsk: 'ニックネームを決めてください', roomGone: '部屋がないか終了しました', disconnected: '接続が切れました。再接続中…', reconnected: '再接続しました', gate: { kicker: 'パズル部屋への招待', login: 'Google でログインして入る', loginSub: '任意です。完成記録と途中のパズルが端末間で引き継がれます。メール・名前は保存しません', or: 'または', guest: 'ゲストで入る', nickPh: 'ニックネーム', guestSub: 'ニックネームだけで入れます。記録はこのブラウザにだけ残ります', online: (n: number) => `${n}人接続中` }, cloud: '同期済み', cloudSave: 'サーバーに保存', cloudSaved: 'サーバーに保存しました。他の端末でも続けられます', cloudFail: '保存できませんでした。しばらくしてもう一度押してください', photoRecv: 'ホストから写真を受信中…', photoWait: '写真を持っている人がまだいません。ホストが戻れば自動で受信します', photoFail: '写真を受信できませんでした。ホストが接続中である必要があり、一部のネットワークでは直接接続できないことがあります', joined: (n: string) => `${n} が参加`, heldBy: (n: string) => (n ? `${n} が持っています` : '他の人が持っています'), photoHostNote: '自分の写真で作った部屋です。写真を出した人が抜けると部屋は終わります — その人はタブを開いたままにしてください', hostAway: '写真を持っている人の接続が切れました。戻らなければこの部屋はまもなく終わります', hostGone: '写真を出した人が退出しました。新しく参加できず、再読み込みすると写真を受け取れません', hostBack: '写真を出した人が戻りました', photoGone: '写真を出した人が退出したため、この部屋は開けません。戻ってくれば開きます', quitHostAsk: '退出すると写真を送る人がいなくなり、この部屋は終わります。退出しますか？', together: '友だちと一緒に', togetherSub: 'リンク一つで一緒に。登録不要、最大8人', creating: '部屋を作成中…', joining: '部屋に入っています…', guest: 'ゲスト', rename: '名前を変更', today: '今日' },
    live: {
      seoTitle: 'みんなで組む1000ピースのオンラインパズル — みんなのパズル',
      seoDesc: '誰でも入って数ピース置いて帰れる公開ジグソー盤。1000ピースをみんなで分けて組み、完成すると次の絵が始まります。登録もインストールも不要、無料。',
      h1: 'みんなで組む\n1000ピース',
      lead: '盤は一つだけ、いつでも開いています。数ピース置いて帰っても大丈夫 — 次の人が続きを組みます。',
      badge: 'みんなのパズル', cta: '続きを組む', ctaFirst: '入って組む', now: 'いま組んでいる絵',
      round: (n: number) => `${n}枚目`, pct: (n: number) => `${n}% 完成`, left: (n: number) => `残り${n}ピース`,
      online: (n: number) => `${n}人が組んでいます`, alone: 'いまは誰もいません', loading: '盤を確認中…',
      offline: '盤を読み込めませんでした。入ればそのまま続きます',
      gateKicker: 'いまみんなで組んでいます',
      doneNote: (n: number) => `完成しました！この盤で置いたピースは${n}個 · まもなく次の絵が始まります`,
      opening: '次の絵を並べています…', nextToast: (t: string) => `次の絵 · ${t}`,
      shareTitle: '一緒にパズルを組もう 🧩', shareText: 'jigsawlabの公開盤で1000ピースをみんなで',
      full: 'いまは満席です。しばらくしてからもう一度どうぞ',
      steps: [
        ['入る', '登録もインストールも不要。ニックネームを決めればすぐ盤の上です。'],
        ['数ピース置く', '一つだけでも大丈夫。置いたピースはそのまま残ります。'],
        ['次の絵へ', '1000ピースが全部そろうと新しい絵が並び、また最初から始まります。'],
      ] as [string, string][],
      body: `<h2>みんなのパズルとは</h2>
<p>サイトが動かしているジグソー盤が一つあります。部屋を作る必要も、誰かを待つ必要もありません。リンクを開けば、いま進行中の1000ピースの盤にそのまま立ち、ほかの人が置いたピースがすでに並んでいます。</p>
<p>数ピース置いて帰っても構いません。置いた場所はそのまま残り、次に来た人が続きを組みます。何日もかけて少しずつ埋まる盤なので、昨日と今日で進み具合が違います。</p>
<h2>次の絵にはいつ変わりますか</h2>
<p>決まった期間はありません。1000ピースがすべて収まると、完成した絵をしばらく一緒に眺めてから新しい絵が並びます。長く誰も触らない盤は自動的に切り上げて次の絵に移ります。</p>
<p>絵は名画・韓国絵画・ヴィンテージ写真・宇宙写真の中から一枚ずつ順に出ます。ひと巡りするまで同じ絵は出てきません。</p>
<h2>友だちとだけ組みたいときは</h2>
<p>パズルの詳細ページで<b>友だちと一緒に</b>を押すと、自分たちだけの部屋ができます。絵もピース数も選べて、リンクを渡した人だけが入れます。</p>`,
    },
    acct: { login: 'ログイン', close: '閉じる', dlgTitle: 'ログイン', dlgLead: '完成記録と途中のパズルを端末間で引き継ぐにはログインしてください。ログインなしでもすべてのパズルを楽しめます', google: 'Google で続ける', dlgPoints: ['メール・名前・プロフィール写真は受け取りません', '完成したパズルと途中の盤面がどの端末でも続けられます', 'いつでもアカウントと記録をまとめて削除できます'], nickTitle: 'ニックネームを決めてください', nickLead: 'パズル部屋でこの名前で表示されます', nickPh: 'ニックネーム', nickHint: '最大12文字 · キャンセルするとこの名前で始まります · あとでマイパズルから変更できます', nickStart: 'はじめる', nickSave: '保存', later: 'キャンセル', shuffle: '別の名前', logout: 'ログアウト', title: 'アカウント', signedIn: (n: string) => `${n} でログイン中`, notSignedIn: 'ログインしていません', why: 'Google ログインは任意です。完成記録と途中のパズル(名画・今日のパズル)が端末間で引き継がれます。サーバーに保存するのは Google アカウントから作った仮名 ID とニックネームだけで、メール・名前・写真は受け取りません', loginBtn: 'Google でログイン', rename: 'ニックネーム変更', del: 'アカウントと記録を削除', delAsk: 'サーバーの完成記録と途中のパズルをすべて消してアカウントを削除しますか？このブラウザの記録は残ります', deleted: '削除しました', fail: 'ログインできませんでした。もう一度お試しください', synced: '同期済み' },
    my: { title: 'マイパズル', inProgress: '途中のパズル', done: '完成したパズル', favs: 'お気に入り', emptyProgress: '途中のパズルはありません', emptyDone: 'まだ完成したパズルはありません', emptyFavs: 'パズルのハートを押すとここに集まります', resume: '続きから', del: '削除', pieces: (n: number) => `${n}ピース`, photo: '自分の写真', doneCount: (n: number) => `${n}枚`, onDevice: 'この端末にのみ保存されます' },
    lv: {
      h1: 'ランキング', lead: 'ピースをたくさんはめた人が上に行きます。今週と累計、ふたつで数えます',
      seoTitle: 'ジグソーパズル ランキング — 今週のXPと累計 · ジグソーラボ',
      seoDesc: 'ジグソーラボのランキング。ピースをはめるほどXPが貯まり、レベルが上がり、実績が開きます。今週のランキングは毎週月曜にリセット。Googleログインだけで参加できます。',
      tabWeek: '今週', tabAll: '累計', weekOf: (d: string) => `${d} の週`,
      loading: '読み込み中…', fail: 'ランキングを読み込めませんでした', empty: '今週はまだ誰もいません。1枚仕上げれば最初の行はあなたです', emptyAll: 'まだ記録がありません',
      xp: (n: number) => `${n.toLocaleString()} XP`, lvl: (n: number) => `Lv ${n}`, nth: (n: number) => `${n}位`, outOfTop: '50位圏外',
      meTitle: 'あなた', meNone: 'まだXPがありません。1枚仕上げると始まります',
      loginLead: 'ログインするとレベルと実績が貯まり、ランキングに名前が載ります。メール・名前は受け取りません', loginBtn: 'Google でログイン',
      rulesTitle: 'XPの貯まりかた',
      rules: ['ピースを1つはめると1 XP。1000ピースを1枚仕上げれば1000 XP', '今日のパズルは1.5倍', '同じ絵を同じ規模で解き直すと4分の1', '部屋では自分がはめたピースの分だけ', '1日にもらえるXPは5,000まで', '時間と手数は見ません — 速い人ではなく、たくさん解いた人が上に行きます'],
      tiersTitle: 'レベル', tiersLead: 'XPが貯まるとレベルが上がります。最高99レベル', fromLv: (n: number) => `Lv ${n} から`,
      badgesTitle: '実績', badgesLead: (n: number) => `実績は${n}種類。取った実績はマイパズルに並びます`,
      myLevel: 'あなたのレベル', nextIn: (n: number) => `次のレベルまで ${n.toLocaleString()} XP`, maxed: '最高レベルに到達しました',
      totalXp: '累計XP', weekXp: '今週のXP', rankAll: '累計順位', rankWeek: '週間順位', none: '—',
      badgeCount: (a: number, b: number) => `${a} / ${b}`, lockedHint: (n: string) => `未取得: ${n}`,
      statSolved: '完成した枚数', statPieces: 'はめたピース', statWorks: '完成した絵', statStreak: '最高連続',
      gained: (n: number) => `+${n.toLocaleString()} XP`, levelUp: (n: number) => `Lv ${n} 達成！`, newBadge: '新しい実績', capped: '今日のXP上限に達しました',
      seeRank: 'ランキング', seeMy: 'マイ実績', signInGain: 'ログインするとこの1枚がXPになります',
      merged: (xp: string, lv: number) => `これまでの記録が ${xp} XP · Lv ${lv} になりました`,
      earn: (n: string) => `仕上げると +${n} XP`, earnDaily: (n: string) => `仕上げると +${n} XP · 今日のパズルは1.5倍`, earnLive: '自分がはめたピース1つにつき 1 XP',
    },
    guide: 'ガイド',
    about: { seoTitle: 'ジグソーパズルの遊び方 — ピース数の選び方から写真パズルまで · jigsawlab', title: 'jigsawlab', lead: '本物のジグソーの手ざわりを、スマホでも。登録不要、写真は端末の外に出ません。', points: (n: number) => [['ピースがくっつく', '合うピースを並べるとカチッとくっつき、塊ごと動きます。1000ピースもそうやって最後まで。'], ['途中の盤面は保存', '離れて戻ってもそのまま。分けた山も、並べた順番も。'], ['写真は端末の中だけ', 'サーバーには送りません。家族写真も安心。'], [`絵と写真${n}点`, 'ゴッホ、モネ、北斎、金弘道、モリス。絵の話も一緒に読めます。']], guide: 'くわしく' },
    foot: { privacy: 'プライバシー', terms: '利用規約', termsTitle: '利用規約', contact: 'お問い合わせ', madeBy: '', rights: '絵はすべてパブリックドメインです', copied: 'リンクをコピーしました', shareFail: '共有できませんでした', privacyTitle: 'プライバシーポリシー', toHome: 'ホームへ' },
  },
} as const;

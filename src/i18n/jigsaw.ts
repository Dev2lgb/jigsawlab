import type { Lang } from './ui';
export const JIGSAW = {
  ko: {
    title: '뭘 맞춰볼까요?', sub: '오늘의 퍼즐, 내 사진, 아니면 아래에서 하나.',
    pick: '내 사진 고르기', drop: '눌러서 고르거나 여기에 끌어다 놓기', daily: '오늘의 퍼즐', dailyCap: (title: string, n: number) => `${title} · ${n}조각`, gallery: '퍼즐 고르기', pieces: '조각 수', custom: '직접 입력', gridLabel: (c: number, r: number, n: number) => `${c}×${r} = ${n}조각`, noImg: '먼저 그림을 골라 주세요', chosen: '선택한 그림', myPhoto: '내 사진',
    start: '시작', privacy: '사진은 폰 밖으로 나가지 않아요', loading: '조각 자르는 중…', opening: '퍼즐 여는 중…', saveGone: '저장된 퍼즐이 없어요',
    time: '시간', moves: '놓은 횟수', left: (n: number) => `남은 조각 ${n}`, edgeOnly: '테두리 조각만', hint: '밑그림', zoomIn: '확대', zoomOut: '축소', fit: '맞춤', trayHint: '조각을 위로 끌어 올려 놓기',
    viewResult: '결과 보기', done: '완성!', resTime: '걸린 시간', resPieces: '조각', resMoves: '놓은 횟수', best: (s: string) => `내 최고 기록 ${s}`, newBest: '새 기록!', retry: '한 번 더', another: '다른 퍼즐', toTitle: '처음으로',
    share: '결과 공유', shareTitle: (n: number, t: string) => `직소 퍼즐 ${n}조각을 ${t}에 완성! 🧩`, shareText: '너도 해봐 🧩', shareDaily: (n: number, t: string, title: string) => `오늘의 퍼즐 「${title}」 ${n}조각을 ${t}에 완성! 🧩 넌?`,
    nickLabel: '닉네임', nickPh: '랭킹에 올릴 이름', submit: '랭킹 등록', registered: (r: number) => `랭킹 ${r}위에 올랐어요!`, rankTotal: (n: number) => `오늘 ${n}명 완성`, rankEmpty: '1등 자리 비었어요', rankFail: '랭킹을 못 불러왔어요', lbTitle: '오늘의 퍼즐 랭킹', unit: '초', noRecord: '아직 기록이 없어요',
    imgFail: '이 사진은 못 열었어요. 다른 사진으로 해볼까요?', paintingBy: (t: string, a: string, y: string) => `${t} — ${a}, ${y}`,
    seo: `<p class="lead">사진 한 장을 고르고 조각 수를 정하면 톱니가 맞물리는 진짜 직소 퍼즐이 됩니다. 아래 트레이에서 조각을 끌어 올려 제자리에 끼우고, 모바일에서는 두 손가락으로 확대·이동하며 맞춰요. 사진은 기기 밖으로 나가지 않고, 내장된 명화로는 매일 같은 판을 풀어 시간을 겨루는 오늘의 퍼즐도 있습니다.</p>
<h2>어떻게 하나요</h2>
<ol>
  <li><b>내 사진 고르기</b>를 눌러 갤러리에서 사진을 고르거나, PC에서는 파일을 끌어다 놓습니다. 아이폰 HEIC 사진은 브라우저가 열 수 있으면 그대로 쓰이고, 열 수 없으면 안내가 뜹니다. 사진을 고르는 대신 <b>명화로 하기</b>에서 고흐·호쿠사이·페르메이르·클림트·모네·신윤복 작품 중 하나를 골라도 됩니다.</li>
  <li><b>조각 수</b>를 고릅니다. 48·100·200·300·500·1000 중 하나를 누르거나 직접 숫자(최대 2000)를 넣으면, 사진의 가로세로 비율에 맞춰 격자를 계산해 그 근처 개수로 잘립니다. 조각마다 톱니 모양이 무작위로 정해져 같은 사진도 매번 다른 판이 됩니다.</li>
  <li>START를 누르면 위에 빈 판, 아래에 조각 트레이가 나옵니다. 트레이는 가로로 넘겨 볼 수 있고, 조각을 <b>위로 끌어 올리면</b> 판으로 옮겨집니다. 제자리 근처에 놓으면 딸깍 소리 없이 끼워지며 잠기고, 아니면 판 위에 놓인 채로 남아 다시 옮길 수 있습니다.</li>
  <li>모바일에서는 <b>두 손가락으로 확대·축소하고 빈 곳을 끌어 이동</b>합니다. PC에서는 마우스 휠로 확대하고 빈 곳을 드래그해 이동하며, 오른쪽 위 버튼으로도 확대·축소·맞춤이 됩니다. <b>밑그림</b>을 켜면 완성 그림이 판에 흐리게 깔려 어디에 놓을지 힌트가 됩니다.</li>
  <li>모든 조각이 잠기면 완성입니다. 걸린 시간과 놓은 횟수가 나오고, 같은 사진·같은 조각 수의 최고 기록이 이 브라우저에 저장됩니다. 결과는 링크로 공유할 수 있고, 오늘의 퍼즐이면 닉네임만 넣어 시간 랭킹에 올릴 수 있습니다.</li>
</ol>
<h2>사진은 어디에도 올라가지 않습니다</h2>
<p>고른 사진은 브라우저가 읽어 화면 안에서 자르고 그립니다. jigsawlab 서버로 전송되지 않고 저장도 되지 않아서, 가족 사진이나 아이 사진, 아직 공개하지 않은 사진으로도 마음 놓고 만들 수 있습니다. 공유 링크에는 결과(조각 수·시간)만 담기고 사진은 들어가지 않습니다. 친구와 같은 사진을 같이 맞추고 싶다면 아래 퍼즐 방을 쓰세요.</p>
<h2>친구랑 같이 맞추기</h2>
<p>퍼즐 방을 만들면 초대 링크가 하나 생깁니다. 그 링크를 보내면 친구는 가입도 설치도 없이 바로 같은 판에 들어옵니다. 한 방에 여덟 명까지 들어와 조각을 나눠 맞출 수 있고, 누가 조각을 끼우면 다른 사람 화면에도 바로 나타납니다. 잠깐 나갔다 들어와도 판은 그대로 있습니다.</p>
<p>내 사진으로 만든 방도 초대할 수 있습니다. 이때도 사진은 서버에 올라가지 않고, 방을 연 사람 기기에서 친구 기기로 곧장 갑니다. 그래서 가족 사진으로 방을 열어도 사진이 어디에도 남지 않습니다. 대신 방을 연 사람이 나가 있으면 친구가 사진을 못 받고, 회사나 학교 인터넷에서는 연결이 막히기도 합니다.</p>
<h2>오늘의 퍼즐</h2>
<p>내장된 퍼블릭 도메인 명화 200여 점 중 하나를 날짜로 골라 48조각으로 자릅니다. 톱니 모양도 날짜로 정해지기 때문에 그날 방문한 모든 사람이 완전히 같은 판을 풉니다. 완성 시간이 짧은 순으로 랭킹이 매겨지고, 닉네임만 넣으면 등록됩니다. 자정(한국 시간)에 새 그림으로 바뀌며, 지난 기록은 그대로 남습니다. 명화는 저작권이 끝난 작품과 그 사진만 골라 썼습니다.</p>
<h2>조각 수 고르는 요령</h2>
<p>48조각은 10분 안쪽으로 끝나는 가벼운 판이고, 100~200조각은 확대·축소를 쓰면서 30분쯤 붙잡는 표준입니다. 300~500조각은 실물 퍼즐 입문 규격과 같아 태블릿·PC에서 한두 시간, 1000조각은 실물 성인 표준 규격으로 며칠에 걸쳐 조각을 뭉치로 모아가며 맞추는 본격 퍼즐입니다. 조각끼리 맞대면 서로 붙어 뭉치째 옮길 수 있으니 큰 판일수록 색·구역별로 뭉치를 먼저 만드세요. 하늘이나 바다처럼 색이 비슷한 면이 넓은 사진은 같은 조각 수라도 훨씬 어렵고, 얼굴·글자·경계선이 많은 사진은 쉬워집니다. 세로 사진이면 격자도 세로로 길게 잡히니 조각 수를 조금 늘려도 됩니다.</p>
<h2>자주 묻는 질문</h2>
<h3>조각이 제자리에 안 들어가요.</h3>
<p>조각의 중심이 제자리에서 조각 한 변의 4분의 1 안쪽에 오면 잠깁니다. 확대한 상태에서는 더 정확히 놓을 수 있으니, 잘 안 들어가면 그 부분을 확대해 보세요. 밑그림을 켜면 위치를 찾기 쉽습니다.</p>
<h3>트레이를 넘기려는데 조각이 끌려 올라와요.</h3>
<p>트레이는 가로로 미는 동작이 넘기기, 위로 올리는 동작이 꺼내기입니다. 옆으로 밀 때 손가락을 조금 더 수평으로 움직이면 넘겨집니다.</p>
<h3>1000조각도 되나요?</h3>
<p>직접 입력으로 최대 2000까지 됩니다. 확대는 조각 하나가 손가락만큼 보일 때까지 되고, 트레이는 보이는 조각만 그려서 1000조각도 가볍습니다. 다만 폰 화면에서는 300 안쪽을 권하고, 500 이상은 태블릿이나 PC가 편합니다. 큰 사진은 긴 변 2400픽셀로 줄여 처리합니다.</p>
<h3>중간에 나가면 진행이 사라지나요?</h3>
<p>아니요. 조각을 놓을 때마다 판·뭉치·트레이 순서·더미·시간이 이 기기 안(브라우저 저장소)에 저장되고, 나갔다 오면 선택 화면의 "하던 퍼즐"에서 이어할 수 있습니다. 내 사진도 기기 안에만 저장되며 서버로는 가지 않습니다. 완성하면 저장은 지워지고 기록만 남습니다.</p>
`,
  },
  en: {
    title: 'What shall we solve?', sub: "Today's puzzle, your own photo, or one from below.",
    pick: 'Choose my photo', drop: 'Drop a photo here or tap to choose', daily: "Today's puzzle", dailyCap: (title: string, n: number) => `${title} · ${n} pieces`, gallery: 'Pick a puzzle', pieces: 'Pieces', custom: 'Custom', gridLabel: (c: number, r: number, n: number) => `${c}×${r} = ${n} pieces`, noImg: 'Choose a photo or a painting first', chosen: 'Selected picture', myPhoto: 'My photo',
    start: 'Start', privacy: 'Your photo never leaves your device', loading: 'Cutting pieces…', opening: 'Opening the puzzle…', saveGone: 'That saved puzzle is gone',
    time: 'Time', moves: 'Placed', left: (n: number) => `${n} pieces left`, edgeOnly: 'Edge pieces only', hint: 'Ghost image', zoomIn: 'Zoom in', zoomOut: 'Zoom out', fit: 'Fit', trayHint: 'Drag pieces up from the tray into place. Pinch to zoom, two fingers to pan',
    viewResult: 'See result', done: 'Complete!', resTime: 'Time', resPieces: 'Pieces', resMoves: 'Placements', best: (s: string) => `Your best: ${s}`, newBest: 'New record!', retry: 'Same photo again', another: 'Another puzzle', toTitle: 'Back to start',
    share: 'Share result', shareTitle: (n: number, t: string) => `Finished a ${n}-piece jigsaw in ${t}! 🧩`, shareText: 'Your turn 🧩', shareDaily: (n: number, t: string, title: string) => `Today's puzzle "${title}", ${n} pieces in ${t}! 🧩 Can you beat it?`,
    nickLabel: 'Nickname', nickPh: 'Name for the leaderboard', submit: 'Submit', registered: (r: number) => `You're #${r} on the board!`, lbTitle: "Today's puzzle leaderboard", unit: 's', noRecord: 'No record yet',
    imgFail: "Couldn't open that image. Please use a JPG, PNG or HEIC photo", paintingBy: (t: string, a: string, y: string) => `${t} — ${a}, ${y}`,
    seo: `<p class="lead">Pick a photo, choose a piece count, and it becomes a real jigsaw with interlocking tabs. Drag pieces up from the tray into place, pinch to zoom on a phone, and finish against the clock. The photo never leaves your device, and a built-in gallery of public-domain paintings powers a daily puzzle where everyone races on the same cut.</p>
<h2>How it works</h2>
<ol>
  <li>Tap <b>Choose my photo</b> to pick from your gallery, or drop a file on desktop. iPhone HEIC photos work when the browser can open them; otherwise a notice appears. You can also pick a painting instead: van Gogh, Hokusai, Vermeer, Klimt, Monet or Shin Yun-bok.</li>
  <li>Choose the number of <b>pieces</b>: 48, 100, 200, 300, 500 or 1000, or type your own (up to 2000). The grid is fitted to the photo's aspect ratio, so the final count lands near your number. Tab shapes are random, so the same photo cuts differently every time.</li>
  <li>Press START. The empty board is above and the piece tray below. Swipe the tray sideways to browse, and <b>drag a piece upward</b> to lift it onto the board. Dropped near its place it snaps in and locks; dropped elsewhere it stays loose and can be moved again.</li>
  <li>On a phone, <b>pinch to zoom and drag empty space with two fingers to pan</b>. On desktop, scroll to zoom and drag empty space to pan; the buttons at the top right also zoom and fit. Turn on <b>Ghost image</b> to see the finished picture faintly on the board as a guide.</li>
  <li>When every piece is locked, the puzzle is complete. You get your time and placement count, and your best for that photo and piece count is saved in this browser. Share the result as a link, and on the daily puzzle enter a nickname to post your time to the leaderboard.</li>
</ol>
<h2>Your photo is never uploaded</h2>
<p>The browser reads the photo and cuts and draws it on screen. Nothing is sent to a jigsawlab server or stored, which makes it safe for family photos, kids and pictures you have not published. A share link carries only the result (pieces and time), never the photo. To solve the same photo together with a friend, use a puzzle room.</p>
<h2>Solving together with friends</h2>
<p>Open a puzzle room and you get one invite link. Send it and your friend joins the same board right away, with no sign-up and nothing to install. Up to eight people can share a room and split the pieces between them, and when someone drops a piece into place it shows up on everyone else's screen. Leave for a bit and the board is still there when you come back.</p>
<p>You can invite people to a puzzle made from your own photo too. The photo still does not go to a server: it goes straight from the device of whoever opened the room to their friend's. That is why you can open a room with a family photo and it is left nowhere. The catch is that the person who opened the room has to stay in it for the others to get the photo, and some office and school networks block the connection.</p>
<h2>The daily puzzle</h2>
<p>Each day one of more than 200 built-in public-domain paintings is chosen by the date and cut into 48 pieces. The tab shapes are seeded by the date too, so everyone who visits that day solves exactly the same puzzle. Times are ranked fastest first and a nickname is all it takes to post one. The picture changes at midnight Korean time, and past records stay on the board. Only works whose copyright has expired, and public-domain reproductions of them, are used.</p>
<h2>Choosing a piece count</h2>
<p>Forty-eight pieces is a light round that finishes in under ten minutes; 100 to 200 is the standard half-hour puzzle with some zooming. 300 to 500 matches a real starter box and takes an hour or two on a tablet or desktop, and 1000 is the real adult standard: a multi-day puzzle where you gather pieces into clusters. Pieces that fit snap together and move as one cluster, so on big puzzles build clusters by colour or area first. Photos with large areas of similar colour, such as sky or sea, are much harder at the same count, while faces, text and edges make it easier. Portrait photos get a tall grid, so you can afford a few more pieces.</p>
<h2>Frequently asked questions</h2>
<h3>A piece will not snap into place.</h3>
<p>A piece locks when its centre is within a quarter of a piece width of its correct spot. Zooming in lets you place more precisely, so zoom into that area if it keeps refusing, and turn on the ghost image to find the right position.</p>
<h3>I try to scroll the tray and a piece lifts instead.</h3>
<p>Sideways movement scrolls the tray; upward movement lifts a piece. Keep your finger a little more horizontal when browsing.</p>
<h3>Does 1000 pieces work?</h3>
<p>The custom field accepts up to 2000. You can zoom until a single piece is fingertip-sized, and the tray only draws visible pieces, so 1000 stays smooth. On a phone we recommend staying under 300; 500 and up is more comfortable on a tablet or desktop. Large photos are reduced to 2400 pixels on the long side.</p>
<h3>Is my progress saved if I leave?</h3>
<p>Yes. Every placement saves the board, clusters, tray order, piles and elapsed time to this device's browser storage, and you can pick it up from "Puzzle in progress" on the start screen. Your photo is stored on the device only, never on a server. Finishing a puzzle clears the save and keeps just the record.</p>
`,
  },
  ja: {
    title: '何を組みましょう？', sub: '今日のパズル、自分の写真、それとも下から一つ。',
    pick: '写真を選ぶ', drop: 'ここに写真をドロップ、またはタップして選択', daily: '今日のパズル', dailyCap: (title: string, n: number) => `${title} · ${n}ピース`, gallery: 'パズルを選ぶ', pieces: 'ピース数', custom: '自分で入力', gridLabel: (c: number, r: number, n: number) => `${c}×${r} = ${n}ピース`, noImg: 'まず写真か名画を選んでください', chosen: '選んだ絵', myPhoto: '自分の写真',
    start: 'スタート', privacy: '写真は端末の外に出ません', loading: 'ピースを作っています…', opening: 'パズルを開いています…', saveGone: '保存したパズルがありません',
    time: 'タイム', moves: '置いた回数', left: (n: number) => `残り${n}ピース`, edgeOnly: '外周ピースのみ', hint: '下絵', zoomIn: '拡大', zoomOut: '縮小', fit: 'フィット', trayHint: '下のピースを上に引き上げてはめてください。2本指で拡大・移動',
    viewResult: '結果を見る', done: '完成！', resTime: 'タイム', resPieces: 'ピース', resMoves: '置いた回数', best: (s: string) => `自己ベスト ${s}`, newBest: '新記録！', retry: '同じ写真でもう一度', another: '別のパズル', toTitle: 'はじめに戻る',
    share: '結果を共有', shareTitle: (n: number, t: string) => `ジグソー${n}ピースを${t}で完成！🧩`, shareText: '次はあなたの番 🧩', shareDaily: (n: number, t: string, title: string) => `今日のパズル「${title}」${n}ピースを${t}で完成！🧩 あなたは？`,
    nickLabel: 'ニックネーム', nickPh: 'ランキングに載せる名前', submit: 'ランキングに登録', registered: (r: number) => `ランキング${r}位に載りました！`, rankTotal: (n: number) => `${n} finished today`, rankEmpty: 'Nobody yet. First place is open!', rankFail: 'Could not load the board', rankTotal: (n: number) => `今日${n}人が完成`, rankEmpty: 'まだ誰もいません。1位が空いています！', rankFail: 'ランキングを読み込めませんでした', lbTitle: '今日のパズル ランキング', unit: '秒', noRecord: 'まだ記録がありません',
    imgFail: '画像を開けませんでした。JPG・PNG・HEICの写真か確認してください', paintingBy: (t: string, a: string, y: string) => `${t} — ${a}、${y}`,
    seo: `<p class="lead">写真を1枚選んでピース数を決めると、凹凸がかみ合う本物のジグソーパズルになります。下のトレイからピースを引き上げてはめ、スマホでは2本指で拡大・移動しながら完成させましょう。写真は端末の外に出ず、内蔵のパブリックドメイン名画では毎日同じ盤面でタイムを競う「今日のパズル」も遊べます。</p>
<h2>遊び方</h2>
<ol>
  <li><b>写真を選ぶ</b>を押してギャラリーから選ぶか、PCではファイルをドロップします。iPhoneのHEIC写真はブラウザが開ければそのまま使え、開けない場合は案内が出ます。写真の代わりに<b>名画で遊ぶ</b>からゴッホ・北斎・フェルメール・クリムト・モネ・申潤福の作品を選ぶこともできます。</li>
  <li><b>ピース数</b>を選びます。48・100・200・300・500・1000のどれかを押すか、自分で数字（最大2000）を入力すると、写真の縦横比に合わせて格子を計算し、その近くの数に切り分けます。ピースの凹凸はランダムなので、同じ写真でも毎回違う盤面になります。</li>
  <li>STARTを押すと、上に空の盤、下にピースのトレイが出ます。トレイは横にスワイプして眺め、ピースを<b>上に引き上げる</b>と盤に移ります。正しい場所の近くに置けばはまってロックされ、違う場所なら盤の上に置かれたまま、あとで動かせます。</li>
  <li>スマホでは<b>2本指で拡大・縮小し、空いた場所をドラッグして移動</b>します。PCではホイールで拡大、空いた場所をドラッグで移動、右上のボタンでも拡大・縮小・フィットができます。<b>下絵</b>をオンにすると完成図が盤にうすく表示され、置く場所のヒントになります。</li>
  <li>すべてのピースがロックされたら完成です。タイムと置いた回数が表示され、同じ写真・同じピース数の自己ベストがこのブラウザに保存されます。結果はリンクで共有でき、今日のパズルならニックネームだけでタイムランキングに登録できます。</li>
</ol>
<h2>写真はどこにもアップロードされません</h2>
<p>選んだ写真はブラウザが読み込み、画面の中で切り分けて描きます。jigsawlabのサーバーには送信されず保存もされないので、家族や子どもの写真、まだ公開していない写真でも安心して使えます。共有リンクに入るのは結果（ピース数とタイム）だけで、写真は入りません。友達と同じ写真を一緒に組みたいときはパズル部屋を使ってください。</p>
<h2>友だちと一緒に組む</h2>
<p>パズル部屋を作ると招待リンクが一つできます。それを送れば、友だちは登録もインストールもなしにそのまま同じ盤面に入れます。ひと部屋に八人まで入ってピースを分け合え、誰かがピースをはめると他の人の画面にもすぐ出てきます。少し抜けて戻っても盤面はそのままです。</p>
<p>自分の写真で作った部屋にも招待できます。このときも写真はサーバーに上がらず、部屋を開いた人の端末から友だちの端末へまっすぐ届きます。だから家族の写真で部屋を開いても、写真はどこにも残りません。ただし部屋を開いた人が抜けていると友だちは写真を受け取れず、会社や学校のネットワークではつながらないこともあります。</p>
<h2>今日のパズル</h2>
<p>内蔵したパブリックドメインの名画200点余りから日付で1点を選び、48ピースに切ります。凹凸の形も日付で決まるので、その日に訪れた全員がまったく同じ盤面を解きます。完成タイムの速い順にランキングがつき、ニックネームを入れるだけで登録できます。日本時間の午前0時に新しい絵に切り替わり、過去の記録はそのまま残ります。名画は著作権が切れた作品とそのパブリックドメインの複製だけを使っています。</p>
<h2>ピース数の選び方</h2>
<p>48ピースは10分以内で終わる軽い盤面、100〜200ピースはズームを使いながら30分ほど楽しむ標準サイズです。300〜500ピースは実物パズルの入門規格と同じでタブレットやPCで1〜2時間、1000ピースは大人向けの実物標準規格で、数日かけてピースを塊にまとめながら組む本格パズルです。合うピース同士はくっついて塊ごと動かせるので、大きな盤面ほど色や場所ごとに塊を先に作りましょう。</p>
<h2>よくある質問</h2>
<h3>ピースが正しい場所にはまりません。</h3>
<p>ピースの中心が正しい位置からピース1辺の4分の1以内に来るとロックされます。拡大した状態のほうが正確に置けるので、はまらないときはその部分を拡大してみてください。下絵をオンにすると位置を探しやすくなります。</p>
<h3>トレイをスクロールしたいのにピースが持ち上がります。</h3>
<p>トレイは横に動かすとスクロール、上に動かすと取り出しです。眺めるときは指をもう少し水平に動かしてください。</p>
<h3>1000ピースもできますか？</h3>
<p>自分で入力すれば最大2000まで可能です。ピース一つが指先ほどに見えるまで拡大でき、トレイは見えているピースだけ描くので1000ピースでも軽快です。ただしスマホでは300以内をおすすめし、500以上はタブレットやPCが快適です。大きな写真は長辺2400ピクセルに縮小して処理します。</p>
<h3>途中でページを離れると進み具合は消えますか？</h3>
<p>いいえ。ピースを置くたびに盤面・塊・トレイの順序・山・経過時間がこの端末のブラウザに保存され、戻ってきたら選択画面の「途中のパズル」から続けられます。写真も端末内にのみ保存され、サーバーには送られません。完成すると保存は消え、記録だけが残ります。</p>
`,
  },
} satisfies Record<Lang, unknown>;

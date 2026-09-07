// 그림 소개 5/5 — 추가 소스(빈티지 사진·우주). key → { t: [한국어 제목, 일본어 제목], about: [ko, en, ja] }
// 포토크롬: 1890~1910년 흑백 사진에 석판 인쇄로 색을 입힌 사진. 미국 의회도서관 소장 스캔(PD)
import type { WorkText } from './worksText';
export const TEXT5: Record<string, WorkText> = {
  // ── 빈티지 사진 (포토크롬)
  'pc-venice': { t: ['베네치아 대운하', 'ヴェネツィア、大運河'], about: [
    '1890년대 베네치아 대운하를 곤돌라가 미끄러져 갑니다. 포토크롬은 흑백 사진 원판에 석판으로 색을 한 겹씩 입힌 인쇄물로, 컬러 사진이 없던 시절 사람들에게 세계의 명소를 색으로 보여 준 최초의 매체였습니다. 궁전의 파스텔빛 외벽과 초록빛 물이 당시 그대로 담겨 있습니다.',
    'A gondola glides along the Grand Canal in the 1890s. A photochrom is a black-and-white photograph coloured layer by layer through lithographic stones, and before colour photography it was the first medium to show people the famous places of the world in colour. The pastel palace fronts and green water are as they were then.',
    '1890年代のヴェネツィア大運河をゴンドラが滑っていきます。フォトクロムは白黒写真の原版に石版で色を一層ずつ重ねた印刷物で、カラー写真のない時代に人々へ世界の名所を色で見せた最初の媒体でした。宮殿のパステル色の外壁と緑の水が当時のまま収められています。'] },
  'pc-neuschwanstein': { t: ['노이슈반슈타인성', 'ノイシュヴァンシュタイン城'], about: [
    '바이에른의 루트비히 2세가 중세 기사 이야기를 꿈꾸며 지은 노이슈반슈타인성을 1890년대에 찍은 포토크롬입니다. 완공된 지 10년도 안 된 새 성이 알프스 자락의 숲 위에 서 있고, 훗날 디즈니 성의 모델이 된 첨탑들이 이미 동화 같습니다.',
    'Neuschwanstein, built by Ludwig II of Bavaria as a dream of medieval chivalry, photographed in the 1890s when the castle was less than ten years old. It stands above the forests at the foot of the Alps, and the turrets that later inspired the Disney castle already look like a fairy tale.',
    'バイエルンのルートヴィヒ2世が中世騎士物語を夢見て建てたノイシュヴァンシュタイン城を1890年代に撮ったフォトクロムです。完成から10年も経たない新しい城がアルプスの麓の森の上に立ち、のちにディズニーの城のモデルとなった尖塔がすでに童話のようです。'] },
  'pc-matterhorn': { t: ['해 질 녘의 마터호른', '日没後のマッターホルン'], about: [
    '체르마트 위쪽 슈타펠알프에서 바라본 마터호른이 저녁놀에 물들어 있습니다. 1865년 첫 등정 이후 알프스 관광의 상징이 된 이 봉우리를, 포토크롬은 분홍빛 하늘과 초록 목초지의 대비로 그림엽서처럼 담았습니다.',
    'The Matterhorn seen from the Staffelalp above Zermatt, flushed with evening light. Since its first ascent in 1865 the peak has been the emblem of Alpine tourism, and the photochrom presents it like a picture postcard, pink sky against green pasture.',
    'ツェルマット上方のシュタッフェルアルプから望むマッターホルンが夕焼けに染まっています。1865年の初登頂以来アルプス観光の象徴となったこの峰を、フォトクロムは桃色の空と緑の牧草地の対比で絵葉書のように収めました。'] },
  'pc-hardanger': { t: ['하르당에르 피오르의 폭포', 'ハルダンゲル・フィヨルドの滝'], about: [
    '노르웨이 하르당에르 피오르의 절벽에서 두 줄기 폭포가 쏟아져 내립니다. 19세기 말 유럽 여행객들에게 노르웨이 피오르는 새로 떠오른 관광지였고, 이런 사진이 그 열풍을 부추겼습니다. 세로로 긴 화면이 절벽의 높이를 그대로 전합니다.',
    'Twin waterfalls plunge down a cliff on Norway\'s Hardanger Fjord. At the end of the nineteenth century the fjords were a newly fashionable destination for European travellers, and pictures like this fed the craze. The tall format conveys the full height of the cliff.',
    'ノルウェー、ハルダンゲル・フィヨルドの絶壁から二筋の滝が流れ落ちます。19世紀末のヨーロッパの旅行者にとってノルウェーのフィヨルドは新たな観光地で、こうした写真がその熱を煽りました。縦長の画面が絶壁の高さをそのまま伝えます。'] },
  'pc-sphinx': { t: ['카이로의 스핑크스와 피라미드', 'カイロのスフィンクスとピラミッド'], about: [
    '기자의 대스핑크스와 그 뒤 쿠푸왕의 피라미드를 1890년대에 찍은 포토크롬입니다. 스핑크스는 아직 모래에 어깨까지 묻혀 있고, 앞쪽에는 발굴된 신전의 돌들이 보입니다. 낙타를 탄 관광객들이 이미 사막을 찾아온 시대였습니다.',
    'The Great Sphinx of Giza with the pyramid of Khufu behind it, in a photochrom of the 1890s. The Sphinx is still buried in sand to the shoulders, with the excavated stones of a temple in the foreground, and tourists on camels have already found their way to the desert.',
    'ギザの大スフィンクスとその背後のクフ王のピラミッドを1890年代に撮ったフォトクロムです。スフィンクスはまだ肩まで砂に埋もれ、手前には発掘された神殿の石が見えます。ラクダに乗った観光客がすでに砂漠を訪れていた時代でした。'] },
  'pc-bosphorus': { t: ['쿨렐리에서 본 보스포루스 해협', 'クレリから望むボスポラス海峡'], about: [
    '콘스탄티노플(오늘의 이스탄불) 아시아 쪽 언덕 쿨렐리에서 보스포루스 해협을 내려다본 풍경입니다. 사이프러스 나무 너머로 물가의 저택들과 건너편 유럽 쪽 기슭이 분홍빛 저녁 하늘 아래 펼쳐집니다. 오스만 제국 말기의 해협 풍경입니다.',
    'The Bosphorus seen from Kuleli on the Asian shore of Constantinople, today\'s Istanbul. Beyond the cypresses, waterside mansions and the European shore opposite spread out under a pink evening sky, a view of the strait in the last years of the Ottoman Empire.',
    'コンスタンティノープル（今日のイスタンブール）のアジア側の丘クレリからボスポラス海峡を見下ろした風景です。糸杉の向こうに水辺の邸宅と対岸のヨーロッパ側の岸が桃色の夕空の下に広がります。オスマン帝国末期の海峡の眺めです。'] },
  'pc-niagara': { t: ['철교에서 본 나이아가라 폭포', '鉄橋から見たナイアガラの滝'], about: [
    '1900년 무렵 나이아가라강의 철제 아치교에서 바라본 아메리칸 폭포와 말굽 폭포입니다. 디트로이트 퍼블리싱 회사는 미국의 명소를 포토크롬으로 만들어 팔았고, 물보라 속의 폭포는 가장 잘 팔리는 주제 중 하나였습니다.',
    'The American and Horseshoe Falls seen from the steel arch bridge over the Niagara River around 1900. The Detroit Publishing Company produced photochroms of America\'s sights, and the falls in their spray were among the best sellers.',
    '1900年頃、ナイアガラ川の鉄製アーチ橋から望んだアメリカ滝とカナダ滝です。デトロイト・パブリッシング社はアメリカの名所をフォトクロムにして販売し、水しぶきの中の滝は最も売れる主題の一つでした。'] },
  'pc-yosemite': { t: ['요세미티 계곡의 하프돔', 'ヨセミテ渓谷のハーフドーム'], about: [
    '요세미티 계곡의 상징인 하프돔이 소나무 사이로 솟아 있습니다. 1898년의 포토크롬으로, 요세미티가 국립공원이 된 지 8년 뒤의 모습입니다. 짙은 초록 나무와 회색 화강암, 옅은 하늘의 대비가 손으로 입힌 색의 매력을 보여줍니다.',
    'Half Dome, the emblem of Yosemite Valley, rises between pines in a photochrom of 1898, eight years after Yosemite became a national park. The contrast of deep green trees, grey granite and pale sky shows the charm of hand-applied colour.',
    'ヨセミテ渓谷の象徴ハーフドームが松の間にそびえています。1898年のフォトクロムで、ヨセミテが国立公園になって8年後の姿です。濃い緑の木々と灰色の花崗岩、淡い空の対比が手で施した色の魅力を示しています。'] },
  'pc-eiffel': { t: ['1900년 파리 만국박람회의 에펠탑', '1900年パリ万博のエッフェル塔'], about: [
    '1900년 파리 만국박람회 때 에펠탑 아래에서 트로카데로 궁전을 바라본 사진입니다. 박람회를 위해 탑은 노란빛으로 새로 칠해졌고, 그 색이 포토크롬에 그대로 남았습니다. 세운 지 11년 된 탑이 아직 임시 건축물로 여겨지던 시절의 모습입니다.',
    'The Trocadéro palace seen through the base of the Eiffel Tower during the Paris Exposition of 1900. The tower had been repainted yellow for the fair, and the photochrom preserves that colour. It shows the tower at eleven years old, when it was still regarded as a temporary structure.',
    '1900年のパリ万国博覧会の際、エッフェル塔の下からトロカデロ宮を望んだ写真です。博覧会のために塔は黄色に塗り直され、その色がフォトクロムにそのまま残りました。建設から11年、塔がまだ仮設建築とみなされていた頃の姿です。'] },
  'pc-tower-bridge': { t: ['열린 타워 브리지, 런던', '開いたタワーブリッジ、ロンドン'], about: [
    '1894년에 완공된 런던 타워 브리지가 배를 지나보내려고 다리를 들어 올린 순간입니다. 템스강의 증기선과 돛단배, 강 건너 런던 탑이 함께 보이는 1890년대 후반의 풍경으로, 새 명물이 된 다리를 기념하는 사진이었습니다.',
    'Tower Bridge, completed in 1894, with its bascules raised to let a ship through. Steamers and sailing craft on the Thames and the Tower of London across the river make up a view of the late 1890s, a souvenir of the city\'s newest landmark.',
    '1894年に完成したロンドンのタワーブリッジが船を通すために橋を跳ね上げた瞬間です。テムズ川の蒸気船や帆船、対岸のロンドン塔が共に見える1890年代後半の風景で、新名所となった橋を記念する写真でした。'] },
  'pc-rheinstein': { t: ['라인강의 라인슈타인성', 'ライン川のラインシュタイン城'], about: [
    '라인강 협곡의 절벽 위에 선 라인슈타인성입니다. 19세기 초 프로이센 왕자가 중세 폐허를 낭만주의풍으로 다시 지은 성으로, 라인강 유람선 여행의 하이라이트였습니다. 성 아래로 굽이치는 강과 포도밭이 내려다보입니다.',
    'Rheinstein Castle on a crag above the Rhine gorge. A Prussian prince rebuilt the medieval ruin in Romantic style in the early nineteenth century, and it became a highlight of the Rhine steamer tour. The winding river and vineyards lie below.',
    'ライン渓谷の断崖の上に立つラインシュタイン城です。19世紀初めにプロイセンの王子が中世の廃墟をロマン主義風に再建した城で、ライン川の遊覧船旅行の見どころでした。城の下には蛇行する川と葡萄畑が見下ろせます。'] },
  'pc-yellowstone': { t: ['옐로스톤의 페인트 포트', 'イエローストーンのペイントポット'], about: [
    '옐로스톤 국립공원의 진흙 온천 "페인트 포트"입니다. 부글거리는 진흙과 광물이 만든 흰색·주황색 땅이 마치 물감을 쏟은 듯하고, 뒤로 소나무 숲이 이어집니다. 1902년 디트로이트 퍼블리싱이 세계 최초의 국립공원을 홍보하려 찍은 사진입니다.',
    'The "Paint Pot" mud springs of Yellowstone National Park. Bubbling mud and mineral deposits colour the ground white and orange as if paint had been spilled, with pine forest behind. Detroit Publishing photographed it in 1902 to promote the world\'s first national park.',
    'イエローストーン国立公園の泥の温泉「ペイントポット」です。泡立つ泥と鉱物が作る白と橙の地面はまるで絵具をこぼしたようで、背後に松林が続きます。1902年にデトロイト・パブリッシング社が世界初の国立公園を宣伝するために撮った写真です。'] },
  'pc-colosseum': { t: ['로마의 콜로세움', 'ローマのコロッセオ'], about: [
    '1890년대의 콜로세움 바깥벽입니다. 지금은 관광객으로 붐비는 광장이 그때는 마차 한 대와 몇 사람만 지나는 한적한 길이었습니다. 무너진 쪽 벽과 온전한 쪽 벽의 대비, 아치를 따라 흐르는 저녁 빛이 2천 년 된 건물의 크기를 실감 나게 합니다.',
    'The outer wall of the Colosseum in the 1890s. The square now packed with tourists was then a quiet road with a single carriage and a few passers-by. The contrast between the collapsed and intact sides and the evening light running along the arches bring home the size of the two-thousand-year-old building.',
    '1890年代のコロッセオの外壁です。今は観光客で賑わう広場も当時は馬車一台と数人が通るだけの静かな道でした。崩れた側と無事な側の壁の対比、アーチに沿って流れる夕方の光が、二千年前の建物の大きさを実感させます。'] },
  'pc-vesuvius': { t: ['나폴리와 베수비오 화산', 'ナポリとヴェスヴィオ山'], about: [
    '나폴리 언덕에서 만 건너 연기를 내뿜는 베수비오 화산을 바라본 풍경입니다. 1890년대에 화산은 늘 연기를 올리고 있었고, 그 모습은 나폴리 여행의 필수 장면이었습니다. 앞쪽의 소나무와 시가지, 잔잔한 만이 지중해의 오후를 담고 있습니다.',
    'Vesuvius smoking across the bay, seen from the hills of Naples. In the 1890s the volcano was constantly steaming, and the sight was an obligatory part of any visit to Naples. Pines, the city and the calm bay in front hold a Mediterranean afternoon.',
    'ナポリの丘から湾越しに煙を上げるヴェスヴィオ山を望んだ風景です。1890年代、火山は常に煙を上げており、その姿はナポリ旅行に欠かせない場面でした。手前の松と市街、穏やかな湾が地中海の午後を収めています。'] },
  'pc-blue-grotto': { t: ['카프리의 푸른 동굴', 'カプリの青の洞窟'], about: [
    '카프리섬의 푸른 동굴 안에서 작은 배 한 척이 빛나는 물 위에 떠 있습니다. 동굴 아래 바위틈으로 들어온 햇빛이 물을 푸르게 밝히는 이 명소는 19세기 낭만주의 여행자들이 재발견했고, 포토크롬은 사진으로는 찍기 힘든 그 푸른빛을 손으로 입혀 재현했습니다.',
    'A small boat floats on glowing water inside the Blue Grotto of Capri. Sunlight entering through an opening below the waterline lights the water from beneath; nineteenth-century Romantic travellers rediscovered the cave, and the photochrom recreates by hand a blue that photography alone could not capture.',
    'カプリ島の青の洞窟の中で小舟が光る水の上に浮かんでいます。洞窟の水面下の岩の隙間から入る陽光が水を青く照らすこの名所は19世紀のロマン主義の旅人たちが再発見し、フォトクロムは写真では撮りにくいその青を手で彩色して再現しました。'] },
  'pc-lucerne': { t: ['뷔르겐슈토크에서 본 루체른 호수', 'ビュルゲンシュトックから見たルツェルン湖'], about: [
    '루체른 호수 남쪽의 뷔르겐슈토크 절벽 위에서 호수와 루체른 시내, 멀리 알프스를 내려다본 풍경입니다. 1890년대 스위스는 유럽 관광의 중심이었고, 호숫가의 호텔들이 포토크롬 엽서를 팔아 손님을 불렀습니다.',
    'From the cliffs of the Bürgenstock south of the lake, a view over Lake Lucerne, the town and the distant Alps. In the 1890s Switzerland was the hub of European tourism, and lakeside hotels sold photochrom postcards to draw visitors.',
    'ルツェルン湖南岸ビュルゲンシュトックの断崖から湖とルツェルンの町、遠くアルプスを見下ろした風景です。1890年代のスイスはヨーロッパ観光の中心で、湖畔のホテルはフォトクロムの絵葉書を売って客を呼びました。'] },
  'pc-edinburgh': { t: ['에든버러 프린세스 스트리트', 'エディンバラ、プリンセス・ストリート'], about: [
    '에든버러의 중심 거리 프린세스 스트리트를 따라 정원과 스콧 기념탑이 늘어서고, 왼쪽 언덕 위에 에든버러성이 보입니다. 마차와 전차가 다니던 1890년대의 거리 풍경으로, 오늘의 모습과 거의 같아 비교해 보는 재미가 있습니다.',
    'Princes Street, the main thoroughfare of Edinburgh, with its gardens and the Scott Monument, and the castle on its hill to the left. A street scene of the 1890s with horse-drawn cabs and trams, so little changed today that comparing the two is half the pleasure.',
    'エディンバラの中心街プリンセス・ストリートに沿って庭園とスコット記念塔が並び、左の丘の上にエディンバラ城が見えます。馬車と路面電車が行き交った1890年代の街並みで、今日の姿とほとんど同じで比べる楽しみがあります。'] },
  'pc-moscow': { t: ['모스크바 구세주 그리스도 대성당', 'モスクワ、救世主ハリストス大聖堂'], about: [
    '모스크바강 건너로 황금 돔의 구세주 그리스도 대성당이 보입니다. 나폴레옹 전쟁 승리를 기념해 1883년 완공된 이 성당은 1931년 소련 정부가 폭파했다가 1990년대에 다시 지었습니다. 사진은 처음 세워진 성당의 모습을 전하는 귀한 기록입니다.',
    'The gold-domed Cathedral of Christ the Saviour across the Moskva River. Completed in 1883 to commemorate the victory over Napoleon, it was dynamited by the Soviet government in 1931 and rebuilt in the 1990s. The photochrom is a rare record of the original church.',
    'モスクワ川の向こうに黄金のドームの救世主ハリストス大聖堂が見えます。ナポレオン戦争の勝利を記念して1883年に完成したこの聖堂は1931年にソ連政府が爆破し、1990年代に再建されました。写真は最初に建てられた聖堂の姿を伝える貴重な記録です。'] },
  'pc-mont-saint-michel': { t: ['제방에서 본 몽생미셸', '堤防から見たモン・サン＝ミシェル'], about: [
    '노르망디 앞바다의 바위섬 몽생미셸과 그 꼭대기의 수도원입니다. 1879년에 놓인 제방 길이 앞쪽으로 뻗어 있고, 썰물 때의 갯벌이 섬을 둘러쌉니다. 포토크롬 특유의 극적인 구름 하늘이 "서양의 경이"라 불린 섬의 분위기를 더합니다.',
    'The rocky island of Mont Saint-Michel off the Normandy coast with the abbey on its summit. The causeway built in 1879 runs toward it in the foreground and the sands of low tide surround the island. The dramatic sky typical of photochroms adds to the mood of the "Wonder of the West".',
    'ノルマンディー沖の岩の島モン・サン＝ミシェルとその頂の修道院です。1879年に築かれた堤防道が手前に伸び、干潮の干潟が島を囲みます。フォトクロム特有の劇的な雲の空が「西洋の驚異」と呼ばれた島の雰囲気を高めています。'] },
  'pc-amalfi': { t: ['카푸친 수도원에서 본 아말피', 'カプチン修道院から見たアマルフィ'], about: [
    '절벽 위 옛 카푸친 수도원의 포도 덩굴 아래에서 아말피 해안을 내려다봅니다. 1890년대 이 수도원은 호텔로 바뀌어 유럽 여행자들이 묵었고, 테라스 기둥 사이로 보이는 푸른 바다와 마을이 그들이 사랑한 풍경이었습니다.',
    'From beneath the vines of the old Capuchin monastery on its cliff, a view down over the Amalfi coast. By the 1890s the monastery had become a hotel where European travellers stayed, and the blue sea and village seen between the terrace columns were the view they loved.',
    '断崖の上の旧カプチン修道院の葡萄棚の下からアマルフィ海岸を見下ろします。1890年代、この修道院はホテルに変わりヨーロッパの旅行者が滞在し、テラスの柱の間に見える青い海と町が彼らの愛した風景でした。'] },
  'pc-chillon': { t: ['시옹성과 당뒤미디', 'シヨン城とダン・デュ・ミディ'], about: [
    '제네바 호숫가의 바위 위에 선 시옹성과 그 뒤로 눈 덮인 당뒤미디 봉우리가 보입니다. 바이런의 시 「시옹의 죄수」로 유명해진 이 성은 19세기 내내 여행자들의 순례지였고, 호수의 푸른 물과 산의 흰 눈이 포토크롬에서 선명하게 살아납니다.',
    'The Château de Chillon on its rock at the edge of Lake Geneva with the snowy peaks of the Dents du Midi behind. Made famous by Byron\'s "Prisoner of Chillon", the castle was a place of pilgrimage for travellers throughout the nineteenth century, and the blue lake and white mountains come vividly alive in the photochrom.',
    'レマン湖畔の岩の上に立つシヨン城と、その背後の雪をいただくダン・デュ・ミディの峰々です。バイロンの詩「シヨンの囚人」で有名になったこの城は19世紀を通じて旅人の巡礼地で、湖の青い水と山の白い雪がフォトクロムで鮮やかに蘇ります。'] },
  'pc-interlaken': { t: ['인터라켄과 융프라우', 'インターラーケンとユングフラウ'], about: [
    '두 호수 사이의 마을 인터라켄과 그 너머 만년설의 융프라우입니다. 1890년대 인터라켄은 이미 알프스 관광의 거점이었고, 호텔의 잔디밭에서 바라보는 이 풍경이 마을의 자랑이었습니다. 앞쪽의 아레강과 초록 들판이 산과 대비를 이룹니다.',
    'The town of Interlaken between its two lakes with the eternal snows of the Jungfrau beyond. By the 1890s Interlaken was already a base for Alpine tourism, and this view from the hotel lawns was the town\'s pride. The River Aare and green meadows in front set off the mountain.',
    '二つの湖の間の町インターラーケンと、その向こうの万年雪のユングフラウです。1890年代のインターラーケンはすでにアルプス観光の拠点で、ホテルの芝生から眺めるこの風景が町の誇りでした。手前のアーレ川と緑の野が山と対比をなします。'] },
  'pc-mostar': { t: ['모스타르의 옛 다리', 'モスタルの古い橋'], about: [
    '보스니아 모스타르의 네레트바강에 걸린 16세기 오스만 시대의 돌다리입니다. 오스트리아-헝가리 제국이 다스리던 1890년대의 모습으로, 다리는 1993년 내전 때 무너졌다가 2004년에 똑같이 다시 지어졌습니다. 돌집과 강, 다리의 곡선이 그림처럼 어우러집니다.',
    'The sixteenth-century Ottoman stone bridge over the Neretva at Mostar in Bosnia, seen in the 1890s under Austro-Hungarian rule. The bridge was destroyed in the war of 1993 and rebuilt exactly in 2004. Stone houses, river and the arch of the bridge compose like a painting.',
    'ボスニアのモスタルでネレトヴァ川に架かる16世紀オスマン時代の石橋です。オーストリア＝ハンガリー帝国が統治した1890年代の姿で、橋は1993年の内戦で崩れ、2004年に同じ姿で再建されました。石の家々と川、橋の曲線が絵のように調和しています。'] },
  'pc-ceylon': { t: ['실론 갈 가는 길의 불교 사원', 'セイロン、ゴール街道の仏教寺院'], about: [
    '실론(오늘의 스리랑카) 콜롬보에서 갈로 가는 길가의 불교 사원입니다. 흰 탑과 야자수, 소달구지가 1890년대 인도양 섬의 일상을 전합니다. 포토크롬 회사 포토글로브는 유럽 밖의 이국적인 풍경도 열심히 찍어 팔았습니다.',
    'A Buddhist temple on the road from Colombo to Galle in Ceylon, today\'s Sri Lanka. The white stupa, palms and bullock cart convey daily life on the Indian Ocean island in the 1890s. The Photoglob company eagerly sold exotic scenes from beyond Europe as well.',
    'セイロン（今日のスリランカ）のコロンボからゴールへ向かう街道沿いの仏教寺院です。白い仏塔と椰子、牛車が1890年代のインド洋の島の日常を伝えます。フォトクロム会社フォトグロブはヨーロッパ外の異国の風景も熱心に撮って販売しました。'] },
  'pc-madurai': { t: ['마두라이 미낙시 사원의 고푸람', 'マドゥライ、ミーナークシ寺院のゴープラム'], about: [
    '남인도 마두라이의 미낙시 사원 탑문(고푸람)이 수천 개의 채색 조각상으로 뒤덮여 하늘로 솟아 있습니다. 탑 아래 문에는 상인과 순례자가 모여 있습니다. 포토크롬의 손 채색이 조각상 하나하나의 색을 살려 퍼즐로 맞추기에 더없이 화려한 사진입니다.',
    'The gateway tower of the Meenakshi Temple at Madurai in South India, covered from base to summit with thousands of painted sculptures, while merchants and pilgrims gather at the gate below. The hand colouring of the photochrom brings out each figure, making it a dazzling subject for a puzzle.',
    '南インド、マドゥライのミーナークシ寺院の塔門（ゴープラム）が数千体の彩色彫像に覆われて空へそびえています。塔の下の門には商人や巡礼者が集まっています。フォトクロムの手彩色が彫像一体一体の色を生かし、パズルにするにはこの上なく華やかな写真です。'] },
  'pc-golden-gate': { t: ['골든게이트 근처의 파도, 샌프란시스코', 'ゴールデンゲート近くの波、サンフランシスコ'], about: [
    '샌프란시스코 골든게이트 해협 근처의 바위에 파도가 부서집니다. 1901년의 포토크롬으로, 다리가 놓이기 36년 전 태평양으로 열린 해협의 거친 모습입니다. 멀리 돛단배가 지나가고, 물보라의 흰색이 손 채색으로 살아 있습니다.',
    'Surf breaks on the rocks near the Golden Gate, San Francisco, in a photochrom of 1901, thirty-six years before the bridge was built, when the strait opened wild onto the Pacific. A sailing ship passes in the distance, and the white of the spray lives through the hand colouring.',
    'サンフランシスコのゴールデンゲート海峡近くの岩に波が砕けます。1901年のフォトクロムで、橋が架かる36年前、太平洋へ開けた海峡の荒々しい姿です。遠くを帆船が過ぎ、しぶきの白が手彩色で生きています。'] },
  'pc-banff': { t: ['밴프 보강의 폭포', 'バンフ、ボウ川の滝'], about: [
    '캐나다 로키산맥 밴프의 보강 폭포와 그 뒤 산봉우리입니다. 캐나다 태평양 철도가 1880년대에 개통하며 밴프는 첫 국립공원이자 산악 휴양지가 되었고, 1902년 이 사진은 철도 여행객에게 로키의 풍경을 보여 주었습니다.',
    'The falls of the Bow River at Banff in the Canadian Rockies with a peak behind. When the Canadian Pacific Railway opened in the 1880s Banff became the country\'s first national park and a mountain resort, and this photochrom of 1902 showed rail travellers what the Rockies looked like.',
    'カナディアン・ロッキー、バンフのボウ川の滝とその背後の峰です。1880年代にカナダ太平洋鉄道が開通するとバンフは最初の国立公園であり山岳保養地となり、1902年のこの写真は鉄道旅行者にロッキーの風景を見せました。'] },
  'pc-havana': { t: ['아바나 산프란시스코 부두', 'ハバナ、サン・フランシスコ埠頭'], about: [
    '1904년 쿠바 아바나 항구의 산프란시스코 부두에 범선의 돛대가 숲처럼 늘어서고, 부두에는 통과 상자가 쌓여 있습니다. 스페인에서 독립한 직후 쿠바를 찾은 미국 사진가들이 남긴 기록으로, 카리브해 항구의 활기가 그대로 담겼습니다.',
    'The masts of sailing ships stand like a forest at the San Francisco wharf in Havana harbour in 1904, with barrels and crates piled on the quay. A record left by American photographers who came to Cuba just after its independence from Spain, it holds all the bustle of a Caribbean port.',
    '1904年、キューバのハバナ港サン・フランシスコ埠頭に帆船のマストが林のように並び、埠頭には樽や箱が積まれています。スペインから独立した直後のキューバを訪れたアメリカの写真家が残した記録で、カリブ海の港の活気がそのまま収められています。'] },
  'pc-brussels': { t: ['브뤼셀 그랑플라스의 길드 하우스', 'ブリュッセル、グラン＝プラスのギルドハウス'], about: [
    '브뤼셀 그랑플라스 광장을 둘러싼 17세기 길드 하우스들의 화려한 정면입니다. 금박 장식과 조각이 층층이 쌓인 건물마다 옛 상인 조합의 이름이 남아 있고, 광장에는 꽃 시장이 열려 있습니다. 유럽에서 가장 아름다운 광장으로 꼽히는 곳의 1890년대 모습입니다.',
    'The ornate fronts of the seventeenth-century guild houses around the Grand-Place in Brussels, each storey heaped with gilding and sculpture and each building still bearing the name of an old merchants\' guild, with a flower market in the square. One of Europe\'s most beautiful squares as it looked in the 1890s.',
    'ブリュッセルのグラン＝プラスを囲む17世紀のギルドハウスの華やかな正面です。金箔装飾と彫刻が層をなす建物ごとに昔の商人組合の名が残り、広場には花市場が開かれています。ヨーロッパで最も美しい広場に数えられる場所の1890年代の姿です。'] },
  'pc-prague': { t: ['프라하성 입구', 'プラハ城の入口'], about: [
    '프라하성의 정문 앞 광장입니다. 오스트리아-헝가리 제국 시절의 병사가 문 앞을 지키고, 마차 한 대가 광장을 지납니다. 지금은 관광객이 가득한 자리가 텅 빈 채 성의 크림색 벽만 햇빛을 받고 있어 세월의 차이를 실감하게 합니다.',
    'The square before the main gate of Prague Castle. A soldier of the Austro-Hungarian era stands guard at the gate and a single carriage crosses the square. The spot now thronged with tourists is empty, only the cream walls of the castle catching the sun, which makes the passage of time vivid.',
    'プラハ城の正門前の広場です。オーストリア＝ハンガリー帝国時代の兵士が門の前を守り、馬車が一台広場を横切ります。今は観光客でいっぱいの場所が空っぽで城のクリーム色の壁だけが陽を受けており、歳月の違いを実感させます。'] },
  'pc-innsbruck': { t: ['인스브루크의 황금 지붕', 'インスブルックの黄金の小屋根'], about: [
    '인스브루크 구시가지의 "황금 지붕"입니다. 1500년 막시밀리안 황제가 광장의 행사를 내려다보려고 지은 발코니로, 2,657장의 금박 구리 기와가 지붕을 덮고 있습니다. 벽의 프레스코와 조각 난간까지 포토크롬의 색으로 살아나 있습니다.',
    'The "Golden Roof" in the old town of Innsbruck, a balcony built in 1500 for Emperor Maximilian to watch events in the square below, its roof covered with 2,657 gilded copper tiles. The frescoes on the wall and the carved parapet come alive in the colours of the photochrom.',
    'インスブルック旧市街の「黄金の小屋根」です。1500年に皇帝マクシミリアンが広場の催しを見下ろすために建てたバルコニーで、2,657枚の金箔銅瓦が屋根を覆っています。壁のフレスコや彫刻の欄干までフォトクロムの色で生き生きとしています。'] },
  'pc-milan': { t: ['밀라노 두오모 광장', 'ミラノ、ドゥオーモ広場'], about: [
    '밀라노 대성당(두오모)과 그 앞 광장, 왼쪽의 갈레리아 입구입니다. 1890년대 마차와 행인이 오가는 광장 한가운데 비토리오 에마누엘레 2세의 기마상이 서 있습니다. 대리석 첨탑이 빽빽한 성당 정면은 퍼즐로 맞추면 가장 어려우면서도 보람 있는 부분입니다.',
    'Milan Cathedral and the piazza before it, with the entrance to the Galleria on the left. Carriages and pedestrians cross the square of the 1890s around the equestrian statue of Victor Emmanuel II. The cathedral front, bristling with marble pinnacles, is the hardest and most rewarding part of the puzzle.',
    'ミラノ大聖堂（ドゥオーモ）とその前の広場、左のガッレリアの入口です。1890年代の馬車と通行人が行き交う広場の中央にヴィットーリオ・エマヌエーレ2世の騎馬像が立っています。大理石の尖塔がひしめく聖堂正面は、パズルにすると最も難しくやりがいのある部分です。'] },
  'pc-pisa': { t: ['피사의 사탑', 'ピサの斜塔'], about: [
    '1890년대의 피사의 사탑입니다. 탑은 이미 기울어져 있고, 주변은 지금과 달리 낮은 집과 빈터뿐입니다. 20세기 말 보강 공사로 기울기를 조금 되돌리기 전의 모습으로, 흰 대리석 탑이 옅은 하늘 아래 홀로 서 있습니다.',
    'The Leaning Tower of Pisa in the 1890s, already tilting, with only low houses and open ground around it unlike today. It is the tower as it stood before the engineering works of the late twentieth century pulled it slightly back upright, white marble alone under a pale sky.',
    '1890年代のピサの斜塔です。塔はすでに傾き、周囲は今と違って低い家と空き地だけです。20世紀末の補強工事で傾きをわずかに戻す前の姿で、白い大理石の塔が淡い空の下にひとり立っています。'] },
  'pc-giralda': { t: ['세비야의 히랄다 탑', 'セビリアのヒラルダの塔'], about: [
    '세비야 대성당의 종탑 히랄다입니다. 12세기 무어인이 세운 모스크의 첨탑 위에 16세기 르네상스 종루를 얹어, 이슬람과 기독교 건축이 한 탑 안에 겹쳐 있습니다. 1890년대의 좁은 골목에서 올려다본 탑이 분홍빛 벽돌로 빛납니다.',
    'La Giralda, the bell tower of Seville Cathedral: a sixteenth-century Renaissance belfry set on top of the minaret of a twelfth-century Moorish mosque, so that Islamic and Christian architecture are stacked in one tower. Seen from a narrow street in the 1890s, it glows in pink brick.',
    'セビリア大聖堂の鐘楼ヒラルダです。12世紀にムーア人が建てたモスクの尖塔の上に16世紀ルネサンスの鐘楼を載せ、イスラムとキリスト教の建築が一つの塔の中に重なっています。1890年代の狭い路地から見上げた塔が桃色の煉瓦で輝いています。'] },
  'pc-alhambra': { t: ['그라나다 알람브라 궁전', 'グラナダ、アルハンブラ宮殿'], about: [
    '그라나다 알람브라 궁전 안의 아치 회랑입니다. 무어인 왕조가 남긴 궁전의 섬세한 석고 장식과 아치 너머로 정원과 언덕이 내다보입니다. 19세기 워싱턴 어빙의 책 이후 유럽 여행자들이 몰려든 이곳을 포토크롬은 붉은빛 벽과 초록 정원으로 담았습니다.',
    'An arcade inside the Alhambra at Granada, with the delicate plasterwork of the Moorish palace and a view through the arches to gardens and hills. Travellers flocked here after Washington Irving\'s book in the nineteenth century, and the photochrom renders it in reddish walls and green garden.',
    'グラナダのアルハンブラ宮殿内のアーチ回廊です。ムーア人の王朝が残した宮殿の繊細な漆喰装飾とアーチの向こうに庭園と丘が望めます。19世紀にワシントン・アーヴィングの本が出て以来ヨーロッパの旅人が押し寄せたこの場所を、フォトクロムは赤みを帯びた壁と緑の庭で収めました。'] },
  'pc-loch-katrine': { t: ['로크 카트린의 부두', 'ロッホ・カトリンの桟橋'], about: [
    '스코틀랜드 트로삭스 지방 로크 카트린 호수의 부두에 증기 유람선이 닿아 있습니다. 월터 스콧의 시 「호수의 여인」의 무대로 유명해져 19세기 내내 관광객이 찾았고, 1900년에 취항한 증기선 "서 월터 스콧호"는 지금도 이 호수를 다닙니다.',
    'A steam launch at the pier on Loch Katrine in the Trossachs, Scotland. Made famous as the setting of Walter Scott\'s "The Lady of the Lake", the loch drew visitors throughout the nineteenth century, and the steamer "Sir Walter Scott", launched in 1900, still sails it today.',
    'スコットランド、トロサックス地方のロッホ・カトリンの桟橋に蒸気遊覧船が着いています。ウォルター・スコットの詩「湖の麗人」の舞台として有名になり19世紀を通じて観光客が訪れ、1900年に就航した蒸気船「サー・ウォルター・スコット号」は今もこの湖を走っています。'] },
  'pc-summer-palace': { t: ['베이징 이화원의 석방', '北京、頤和園の石舫'], about: [
    '베이징 이화원 쿤밍호에 떠 있는 대리석 배 "석방"입니다. 청나라 서태후가 해군 예산을 돌려 궁을 고치며 다시 꾸민 배 모양 정자로, 1890년대 포토크롬은 청 왕조가 아직 남아 있던 시절의 모습을 전합니다. 호수에 비친 흰 대리석과 채색 난간이 선명합니다.',
    'The Marble Boat on Kunming Lake at the Summer Palace in Peking, a boat-shaped pavilion refurbished when the Empress Dowager Cixi diverted naval funds to restore the palace. The photochrom of the 1890s shows it while the Qing dynasty still reigned, white marble and painted railings mirrored in the lake.',
    '北京、頤和園の昆明湖に浮かぶ大理石の船「石舫」です。清の西太后が海軍予算を流用して宮殿を修復した際に飾り直した船形の東屋で、1890年代のフォトクロムは清王朝がまだ続いていた頃の姿を伝えます。湖に映る白い大理石と彩色の欄干が鮮やかです。'] },
  // ── 우주 (NASA·ESA)
  'sp-pillars': { t: ['창조의 기둥 (웹 망원경)', '創造の柱（ウェッブ望遠鏡）'], about: [
    '독수리 성운 한가운데 솟은 가스와 먼지의 기둥으로, 그 안에서 새 별들이 태어나고 있습니다. 1995년 허블이 찍어 유명해진 장면을 2022년 제임스 웹 우주망원경이 근적외선으로 다시 찍어, 먼지 너머의 갓 태어난 붉은 별들까지 드러냈습니다. 기둥의 높이는 약 4~5광년입니다.',
    'Towers of gas and dust in the heart of the Eagle Nebula, where new stars are being born. Hubble made the scene famous in 1995; in 2022 the James Webb Space Telescope photographed it again in near-infrared light, revealing newborn red stars behind the dust. The pillars are some four to five light-years tall.',
    'わし星雲の中心にそびえるガスと塵の柱で、その中で新しい星が生まれています。1995年にハッブルが撮影して有名になった場面を2022年にジェイムズ・ウェッブ宇宙望遠鏡が近赤外線で撮り直し、塵の向こうの生まれたての赤い星まで明らかにしました。柱の高さは約4〜5光年です。'] },
  'sp-cosmic-cliffs': { t: ['용골자리 성운의 우주 절벽', 'カリーナ星雲の宇宙の崖'], about: [
    '2022년 7월 제임스 웹 우주망원경의 첫 공개 사진 중 하나로, 용골자리 성운 가장자리의 별 탄생 지역입니다. 달빛 비친 산맥처럼 보이는 "절벽"은 실제로는 갓 태어난 별들의 자외선과 항성풍에 깎여 나가는 거대한 가스 구름의 가장자리이며, 가장 높은 봉우리는 약 7광년 높이입니다.',
    'One of the first images released by the James Webb Space Telescope in July 2022: a star-forming region at the edge of the Carina Nebula. What looks like a moonlit mountain range is the rim of a vast cloud of gas being eroded by the ultraviolet light and winds of newborn stars, and the tallest peaks are about seven light-years high.',
    '2022年7月にジェイムズ・ウェッブ宇宙望遠鏡が最初に公開した画像の一つで、カリーナ星雲の縁にある星形成領域です。月明かりの山脈のように見える「崖」は、実際には生まれたての星々の紫外線と恒星風に削られていく巨大なガス雲の縁で、最も高い峰は約7光年の高さです。'] },
  'sp-crab': { t: ['게 성운', 'かに星雲'], about: [
    '1054년 중국과 아랍의 천문학자들이 낮에도 보일 만큼 밝게 폭발하는 별을 기록했는데, 그 초신성의 잔해가 게 성운입니다. 허블 우주망원경이 24장을 이어 붙인 이 사진에서 주황색 실은 폭발로 흩어진 별의 조각이고, 가운데 푸른빛은 1초에 30번 도는 중성자별이 내는 빛입니다.',
    'In 1054 Chinese and Arab astronomers recorded a star exploding brightly enough to be seen by day; the Crab Nebula is the wreckage of that supernova. In this Hubble mosaic of twenty-four exposures the orange filaments are the shredded remains of the star, and the blue glow at the centre comes from a neutron star spinning thirty times a second.',
    '1054年、中国とアラブの天文学者が昼間でも見えるほど明るく爆発する星を記録しましたが、その超新星の残骸がかに星雲です。ハッブル宇宙望遠鏡が24枚をつなぎ合わせたこの写真で、橙色の筋は爆発で散った星のかけら、中央の青い光は毎秒30回転する中性子星が放つ光です。'] },
  'sp-helix': { t: ['나선 성운', 'らせん星雲'], about: [
    '지구에서 약 650광년 떨어진 물병자리의 행성상 성운으로, 태양 같은 별이 생을 마치며 바깥층을 우주로 날려 보낸 모습입니다. 거대한 눈동자처럼 보여 "신의 눈"이라는 별명이 붙었습니다. 허블과 지상 망원경의 자료를 합쳐 만든 이 사진의 안쪽 고리 지름은 약 2광년입니다.',
    'A planetary nebula about 650 light-years away in Aquarius: a star like the Sun at the end of its life, blowing its outer layers into space. Its resemblance to a giant eye earned it the nickname "the Eye of God". The image combines Hubble and ground-based data, and the inner ring is about two light-years across.',
    '地球から約650光年、みずがめ座にある惑星状星雲で、太陽のような星が生涯を終えて外層を宇宙へ吹き飛ばした姿です。巨大な瞳のように見えることから「神の目」の異名があります。ハッブルと地上望遠鏡のデータを合わせたこの写真の内側の環の直径は約2光年です。'] },
  'sp-whirlpool': { t: ['소용돌이 은하 (M51)', '子持ち銀河（M51）'], about: [
    '사냥개자리 방향으로 약 3천만 광년 떨어진 나선 은하로, 나선팔이 교과서처럼 또렷해 "소용돌이 은하"라 불립니다. 오른쪽의 작은 노란 은하가 지나가며 중력으로 나선팔을 휘저어 새 별들이 팔을 따라 줄지어 태어나고 있습니다. 붉은 점들은 별이 태어나는 수소 구름입니다.',
    'A spiral galaxy some thirty million light-years away in Canes Venatici, its arms so clean that it is the textbook "Whirlpool Galaxy". The small yellow galaxy at the right is passing by and stirring the arms with its gravity, so that new stars are forming in chains along them; the red spots are hydrogen clouds where stars are born.',
    'りょうけん座の方向、約3千万光年の距離にある渦巻銀河で、渦状腕が教科書のようにくっきりしているため「子持ち銀河」と呼ばれます。右の小さな黄色い銀河が通り過ぎながら重力で腕をかき回し、新しい星が腕に沿って列をなして生まれています。赤い点は星が生まれる水素の雲です。'] },
  'sp-sombrero': { t: ['솜브레로 은하 (M104)', 'ソンブレロ銀河（M104）'], about: [
    '처녀자리 방향으로 약 2,800만 광년 떨어진 은하를 거의 옆에서 본 모습입니다. 밝은 중심부와 그 둘레를 두른 짙은 먼지 띠가 멕시코 모자 솜브레로를 닮았습니다. 허블이 여섯 장을 이어 붙인 사진으로, 은하의 지름은 약 5만 광년이고 가운데에는 태양 10억 개 질량의 블랙홀이 있습니다.',
    'A galaxy about twenty-eight million light-years away in Virgo, seen almost edge-on. Its bright bulge and the dark band of dust encircling it resemble a Mexican sombrero. Hubble stitched six exposures together for this view; the galaxy is some fifty thousand light-years across and holds a black hole of a billion solar masses at its centre.',
    'おとめ座の方向、約2,800万光年の距離にある銀河をほぼ真横から見た姿です。明るい中心部とその周りを取り巻く濃い塵の帯がメキシコの帽子ソンブレロに似ています。ハッブルが6枚をつなぎ合わせた写真で、銀河の直径は約5万光年、中心には太陽10億個分の質量のブラックホールがあります。'] },
  'sp-orion': { t: ['오리온 대성운', 'オリオン大星雲'], about: [
    '오리온자리 허리띠 아래 맨눈으로도 희미하게 보이는 별 탄생 구름으로, 지구에서 가장 가까운 대규모 별 형성 지역입니다. 허블이 520장을 이어 붙인 이 사진에는 갓 태어난 별 3천여 개와 행성이 만들어지는 원반들이 담겨 있습니다. 가운데의 밝은 별 넷이 트라페지움입니다.',
    'The star-forming cloud just visible to the naked eye below Orion\'s belt, the nearest large stellar nursery to Earth. Hubble\'s mosaic of 520 exposures contains more than three thousand newborn stars and discs where planets are forming. The four bright stars at the centre are the Trapezium.',
    'オリオン座の三つ星の下に肉眼でもかすかに見える星の誕生の雲で、地球に最も近い大規模な星形成領域です。ハッブルが520枚をつなぎ合わせたこの写真には、生まれたての星3千余りと惑星が作られつつある円盤が収められています。中央の明るい四つの星がトラペジウムです。'] },
  'sp-earthrise': { t: ['지구돋이', '地球の出'], about: [
    '1968년 크리스마스이브, 달 궤도를 돌던 아폴로 8호의 우주비행사 윌리엄 앤더스가 달 지평선 위로 떠오르는 지구를 찍었습니다. 인류가 처음으로 자기 행성을 바깥에서 통째로 본 사진으로, "환경 운동을 시작한 한 장의 사진"으로 불립니다. 원래는 세로로 찍었지만 보통 이렇게 가로로 보여줍니다.',
    'On Christmas Eve 1968 astronaut William Anders, orbiting the Moon aboard Apollo 8, photographed the Earth rising over the lunar horizon. It was the first time humans had seen their whole planet from outside, and it has been called the photograph that launched the environmental movement. Taken in portrait format, it is usually shown rotated like this.',
    '1968年のクリスマスイブ、月を周回していたアポロ8号の宇宙飛行士ウィリアム・アンダースが月の地平線から昇る地球を撮影しました。人類が初めて自分の惑星を外から丸ごと見た写真で、「環境運動を始めた一枚」と呼ばれます。もとは縦位置で撮られましたが、通常はこのように横向きで示されます。'] },
  'sp-blue-marble': { t: ['푸른 구슬', 'ザ・ブルー・マーブル'], about: [
    '1972년 12월 7일 달로 향하던 아폴로 17호 승무원이 약 2만 9천 km 거리에서 찍은 지구입니다. 태양을 등지고 있어 지구가 완전히 밝게 보이는 드문 순간이었고, 아프리카와 남극 대륙, 아라비아반도가 구름 사이로 또렷합니다. 역사상 가장 많이 복제된 사진 중 하나입니다.',
    'The Earth photographed on 7 December 1972 by the crew of Apollo 17 on their way to the Moon, from about 29,000 km away. The Sun was behind them, a rare moment when the whole planet appeared fully lit, with Africa, Antarctica and the Arabian Peninsula clear among the clouds. It is one of the most reproduced photographs in history.',
    '1972年12月7日、月へ向かうアポロ17号の乗組員が約2万9千kmの距離から撮影した地球です。太陽を背にしていたため地球全体が明るく見える稀な瞬間で、アフリカと南極大陸、アラビア半島が雲の間にくっきりと見えます。史上最も多く複製された写真の一つです。'] },
  'sp-saturn': { t: ['춘분의 토성', '分点の土星'], about: [
    '2009년 토성의 춘분 무렵 카시니 탐사선이 찍은 사진입니다. 태양이 고리 면을 정확히 옆에서 비추어 고리가 어둡고 얇게 보이고, 그 그림자가 토성 표면에 가느다란 선으로만 떨어집니다. 129장을 이어 붙였으며, 이런 각도의 토성은 15년에 한 번만 볼 수 있습니다.',
    'Saturn photographed by the Cassini spacecraft around its equinox in 2009. With the Sun shining exactly edge-on to the rings they appear dark and thin, and their shadow falls on the planet as no more than a fine line. The image is a mosaic of 129 frames, and this view of Saturn occurs only once every fifteen years.',
    '2009年、土星の分点の頃にカッシーニ探査機が撮影した写真です。太陽が環の面を正確に真横から照らすため環は暗く薄く見え、その影は土星表面に細い線としてしか落ちません。129枚をつなぎ合わせたもので、この角度の土星は15年に一度しか見られません。'] },
  'sp-butterfly': { t: ['나비 성운 (NGC 6302)', '蝶々星雲（NGC 6302）'], about: [
    '전갈자리 방향 약 3,800광년 거리의 행성상 성운으로, 죽어 가는 별이 시속 100만 km 가까운 속도로 뿜어낸 가스가 나비 날개처럼 펼쳐졌습니다. 가운데 별은 표면 온도 25만 도로 알려진 별 중 가장 뜨거운 축에 들며, 먼지 띠에 가려 보이지 않습니다. 2009년 허블 수리 후 첫 사진 중 하나입니다.',
    'A planetary nebula about 3,800 light-years away in Scorpius, where gas thrown off by a dying star at nearly a million kilometres an hour spreads like butterfly wings. The central star, hidden by a band of dust, has a surface temperature of some 250,000 degrees, among the hottest known. It was one of the first images after Hubble\'s 2009 servicing mission.',
    'さそり座の方向、約3,800光年の距離にある惑星状星雲で、死にゆく星が時速100万km近い速さで吹き出したガスが蝶の羽のように広がっています。中央の星は表面温度25万度と知られる中で最も熱い部類で、塵の帯に隠れて見えません。2009年のハッブル修理後最初の写真の一つです。'] },
  'sp-lagoon': { t: ['라군 성운', '干潟星雲'], about: [
    '궁수자리에 있는 거대한 별 탄생 구름으로, 허블 우주망원경 발사 28주년을 기념해 2018년에 공개된 사진입니다. 가운데의 젊고 거대한 별 헤르셸 36이 강한 자외선과 항성풍으로 주변 가스를 조각하며 소용돌이와 산맥 같은 형태를 만들고 있습니다. 화면의 폭은 약 4광년입니다.',
    'A vast star-forming cloud in Sagittarius, released in 2018 to mark the twenty-eighth anniversary of Hubble\'s launch. The young giant star Herschel 36 at the centre sculpts the surrounding gas with fierce ultraviolet light and stellar winds into whorls and ridges. The field of view is about four light-years across.',
    'いて座にある巨大な星形成の雲で、ハッブル宇宙望遠鏡打ち上げ28周年を記念して2018年に公開された写真です。中央の若く巨大な星ハーシェル36が強い紫外線と恒星風で周囲のガスを削り、渦や山脈のような形を作っています。画面の幅は約4光年です。'] },
  'sp-stephans-quintet': { t: ['스테판의 오중주', 'ステファンの五つ子銀河'], about: [
    '페가수스자리에서 다섯 은하가 모여 있는 듯 보이는 은하군을 제임스 웹 우주망원경이 2022년 첫 공개 사진으로 찍었습니다. 그중 넷은 서로 중력으로 얽혀 충돌하는 중이고, 왼쪽 위의 하나는 훨씬 가까이 있어 우연히 겹쳐 보일 뿐입니다. 1억 5천만 화소가 넘는 웹 최대의 이미지입니다.',
    'A group of five galaxies in Pegasus that appear clustered together, photographed by the James Webb Space Telescope among its first released images in 2022. Four of them are locked in a gravitational dance and colliding, while the one at upper left is much closer and merely overlaps by chance. With over 150 million pixels it is Webb\'s largest image.',
    'ペガスス座で五つの銀河が集まっているように見える銀河群を、ジェイムズ・ウェッブ宇宙望遠鏡が2022年の最初の公開画像として撮影しました。そのうち四つは互いの重力で絡み合い衝突中で、左上の一つはずっと近くにあって偶然重なって見えるだけです。1億5千万画素を超えるウェッブ最大の画像です。'] },
  'sp-cartwheel': { t: ['수레바퀴 은하', '車輪銀河'], about: [
    '약 5억 년 전 작은 은하가 큰 나선 은하의 한가운데를 뚫고 지나가며 만든 고리 모양 은하입니다. 충격파가 연못의 물결처럼 바깥으로 퍼지며 바깥 고리에서 새 별들이 태어나고, 두 고리를 잇는 바큇살은 다시 만들어지고 있는 나선팔입니다. 웹 망원경이 적외선으로 먼지 너머의 구조를 드러냈습니다.',
    'A ring galaxy created about five hundred million years ago when a small galaxy plunged through the centre of a large spiral. The shock spread outward like ripples in a pond, new stars are forming in the outer ring, and the spokes joining the two rings are spiral arms re-forming. Webb\'s infrared view reveals the structure behind the dust.',
    '約5億年前、小さな銀河が大きな渦巻銀河の中心を突き抜けて作られたリング状の銀河です。衝撃波が池の波紋のように外へ広がって外側の環で新しい星が生まれ、二つの環をつなぐ車輪のスポークは再び形成されつつある渦状腕です。ウェッブ望遠鏡が赤外線で塵の向こうの構造を明らかにしました。'] },
  'sp-mystic-mountain': { t: ['신비의 산 (용골자리 성운)', '神秘の山（カリーナ星雲）'], about: [
    '허블 우주망원경 발사 20주년을 기념해 2010년에 공개된 용골자리 성운의 한 부분입니다. 높이 3광년의 가스·먼지 기둥 꼭대기에서 갓 태어난 별들이 양쪽으로 제트를 뿜어내고, 주변 별들의 빛이 기둥을 조금씩 깎아 냅니다. 산봉우리와 구름을 닮아 "신비의 산"이라 불립니다.',
    'A portion of the Carina Nebula released in 2010 for the twentieth anniversary of Hubble\'s launch. Newborn stars at the tip of a three-light-year pillar of gas and dust shoot jets out to either side, while the light of nearby stars slowly erodes the pillar. Its likeness to peaks and clouds gave it the name "Mystic Mountain".',
    'ハッブル宇宙望遠鏡打ち上げ20周年を記念して2010年に公開されたカリーナ星雲の一部です。高さ3光年のガスと塵の柱の頂で生まれたての星が両側にジェットを噴き出し、周囲の星の光が柱を少しずつ削っています。山の峰と雲に似ていることから「神秘の山」と呼ばれます。'] },
  'sp-bubble': { t: ['거품 성운 (NGC 7635)', 'バブル星雲（NGC 7635）'], about: [
    '카시오페이아자리 방향 약 7,100광년 거리에 떠 있는 지름 7광년의 거품입니다. 가운데 왼쪽 위의 태양보다 45배 무거운 별이 초속 수천 km의 항성풍을 뿜어 주변 가스를 밀어내며 비눗방울 같은 껍질을 만들었습니다. 허블 26주년 기념 사진으로 2016년에 공개되었습니다.',
    'A bubble seven light-years across, floating about 7,100 light-years away in Cassiopeia. The star at upper left of centre, forty-five times the mass of the Sun, blows a stellar wind of thousands of kilometres a second that pushes the surrounding gas into a soap-bubble shell. It was released in 2016 for Hubble\'s twenty-sixth anniversary.',
    'カシオペヤ座の方向、約7,100光年の距離に浮かぶ直径7光年の泡です。中央左上の太陽の45倍の質量を持つ星が秒速数千kmの恒星風を吹き出し、周囲のガスを押しやってシャボン玉のような殻を作りました。ハッブル26周年記念写真として2016年に公開されました。'] },
  'sp-aldrin': { t: ['달 위의 버즈 올드린', '月面のバズ・オルドリン'], about: [
    '1969년 7월 20일 아폴로 11호의 버즈 올드린이 고요의 바다에 서 있고, 헬멧 바이저에 사진을 찍는 닐 암스트롱과 착륙선이 비칩니다. 인류의 첫 달 착륙에서 가장 유명한 사진으로, 우주복의 흰색과 달 표면의 회색, 검은 하늘이 강렬한 대비를 이룹니다.',
    'Buzz Aldrin of Apollo 11 stands on the Sea of Tranquillity on 20 July 1969, with Neil Armstrong taking the picture and the lunar module reflected in his visor. The most famous photograph of the first Moon landing, it sets the white of the suit against the grey surface and the black sky.',
    '1969年7月20日、アポロ11号のバズ・オルドリンが静かの海に立ち、ヘルメットのバイザーに写真を撮るニール・アームストロングと着陸船が映っています。人類初の月面着陸で最も有名な写真で、宇宙服の白と月面の灰色、黒い空が強い対比をなしています。'] },
  'sp-tarantula': { t: ['타란툴라 성운', 'タランチュラ星雲'], about: [
    '우리 은하의 이웃 대마젤란은하에 있는 별 탄생 지역으로, 우리 은하 근처에서 가장 크고 밝습니다. 웹 망원경의 적외선 사진에서 가운데 푸른 별들의 무리가 강한 빛으로 주변 가스를 파내어 거미집 같은 실 구조를 만들었고, 그래서 "타란툴라"라는 이름이 붙었습니다. 화면의 폭은 약 340광년입니다.',
    'A star-forming region in the Large Magellanic Cloud, a neighbour of our galaxy, and the largest and brightest such region near the Milky Way. In Webb\'s infrared image a cluster of blue stars at the centre has carved out the surrounding gas with its fierce light, leaving spidery filaments that gave the nebula its name. The view spans about 340 light-years.',
    '我々の銀河の隣の大マゼラン雲にある星形成領域で、天の川銀河近傍で最も大きく明るいものです。ウェッブ望遠鏡の赤外線画像では中央の青い星の集団が強い光で周囲のガスを掘り、蜘蛛の巣のような糸状の構造を作っており、そこから「タランチュラ」の名が付きました。画面の幅は約340光年です。'] },
  'sp-pluto': { t: ['명왕성', '冥王星'], about: [
    '2015년 7월 뉴호라이즌스 탐사선이 명왕성 옆을 지나며 찍은 사진으로, 실제 색에 가깝게 처리한 것입니다. 오른쪽 아래 밝은 하트 모양 평원은 질소 얼음으로 덮인 "톰보 지역"이고, 어두운 부분은 붉은 유기물이 쌓인 곳입니다. 9년 반을 날아가 얻은 명왕성의 첫 선명한 얼굴입니다.',
    'Pluto photographed by the New Horizons spacecraft as it flew past in July 2015, processed to approximate true colour. The bright heart-shaped plain at lower right is Tombaugh Regio, covered in nitrogen ice, and the dark areas are deposits of reddish organic material. After nine and a half years of flight it was the first clear face of Pluto.',
    '2015年7月にニュー・ホライズンズ探査機が冥王星のそばを通過しながら撮影した写真で、実際の色に近く処理したものです。右下の明るいハート形の平原は窒素の氷に覆われた「トンボー領域」で、暗い部分は赤みを帯びた有機物が堆積した場所です。9年半飛んで得た冥王星の初めての鮮明な顔です。'] },
  'sp-great-red-spot': { t: ['목성의 대적점', '木星の大赤斑'], about: [
    '2017년 7월 주노 탐사선이 목성 구름 위 9천 km까지 접근해 찍은 대적점입니다. 지구보다 큰 이 폭풍은 최소 350년 동안 소용돌이치고 있으며, 시민 과학자들이 원본 자료를 처리해 구름의 결과 붉은 소용돌이를 이렇게 선명하게 살려 냈습니다.',
    'The Great Red Spot photographed by the Juno spacecraft in July 2017 from only 9,000 km above Jupiter\'s clouds. This storm, larger than Earth, has been swirling for at least 350 years; citizen scientists processed the raw data to bring out the texture of the clouds and the red vortex so vividly.',
    '2017年7月、ジュノー探査機が木星の雲の上9千kmまで接近して撮影した大赤斑です。地球より大きいこの嵐は少なくとも350年間渦巻いており、市民科学者が生データを処理して雲の質感と赤い渦をこれほど鮮明に引き出しました。'] },
  'sp-aurora': { t: ['우주정거장에서 본 남극광', '宇宙ステーションから見た南極光'], about: [
    '2010년 국제우주정거장의 승무원이 지구 남반구 위를 지나며 찍은 남극광입니다. 태양에서 온 입자가 대기의 산소와 부딪혀 내는 초록빛 커튼이 지구의 둥근 가장자리 위로 띠처럼 흐르고, 위쪽으로 붉은 빛이 번집니다. 오로라를 위에서 내려다본 드문 시점입니다.',
    'The southern lights photographed in 2010 by the crew of the International Space Station passing over the southern hemisphere. A green curtain, made by particles from the Sun striking oxygen in the atmosphere, streams like a ribbon above the curve of the Earth, with red glowing higher up. It is the rare view of an aurora from above.',
    '2010年、国際宇宙ステーションの乗組員が地球の南半球上空を通過しながら撮影した南極光です。太陽から来た粒子が大気の酸素とぶつかって出す緑の光のカーテンが地球の丸い縁の上をリボンのように流れ、上方に赤い光が広がります。オーロラを上から見下ろした珍しい視点です。'] },
  'sp-antennae': { t: ['안테나 은하', 'アンテナ銀河'], about: [
    '까마귀자리 방향 약 4,500만 광년 거리에서 두 나선 은하가 수억 년째 충돌하고 있습니다. 부딪힌 가스 구름이 압축되며 수십억 개의 별이 한꺼번에 태어나고 있고, 분홍색은 별이 태어나는 수소 구름, 푸른색은 갓 태어난 별 무리입니다. 우리 은하도 40억 년 뒤 안드로메다와 이렇게 만나게 됩니다.',
    'Two spiral galaxies about forty-five million light-years away in Corvus have been colliding for hundreds of millions of years. Their gas clouds are being compressed and billions of stars are forming at once: pink marks hydrogen clouds giving birth to stars, blue the young clusters. Our own galaxy will meet Andromeda like this in four billion years.',
    'からす座の方向、約4,500万光年の距離で二つの渦巻銀河が数億年にわたり衝突しています。ぶつかったガス雲が圧縮されて数十億の星が一斉に生まれており、桃色は星が生まれる水素の雲、青色は生まれたばかりの星団です。天の川銀河も40億年後にアンドロメダとこのように出会います。'] },
  'sp-neptune': { t: ['해왕성', '海王星'], about: [
    '1989년 8월 보이저 2호가 해왕성을 지나며 찍은 사진으로, 인류가 이 행성을 가까이서 본 유일한 순간입니다. 대기의 메탄이 붉은빛을 흡수해 깊고 푸른 색을 띠고, 가운데 지구만 한 크기의 "대암점"과 흰 구름이 보입니다. 이 사진을 찍고 보이저는 태양계 바깥으로 계속 날아가고 있습니다.',
    'Neptune photographed by Voyager 2 in August 1989, the only time humanity has seen the planet close up. Methane in the atmosphere absorbs red light and gives it a deep blue colour, and the Earth-sized "Great Dark Spot" and white clouds are visible near the centre. After taking this picture Voyager flew on, and is still travelling out of the solar system.',
    '1989年8月にボイジャー2号が海王星を通過しながら撮影した写真で、人類がこの惑星を間近に見た唯一の機会です。大気のメタンが赤い光を吸収して深い青色を帯び、中央付近に地球ほどの大きさの「大暗斑」と白い雲が見えます。この写真を撮った後、ボイジャーは太陽系の外へ今も飛び続けています。'] },
};

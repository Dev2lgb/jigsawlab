// 그림 소개 1/3 — key → { t: [한국어 제목, 일본어 제목], about: [ko, en, ja] }. 영문 제목·작가는 aic.json 원표기
import type { WorkText } from './worksText';
export const TEXT1: Record<string, WorkText> = {
  'monet-stacks-wheat': { t: ['건초 더미 (여름의 끝)', '積みわら（夏の終わり）'], about: [
    '모네가 지베르니 집 근처 들판의 곡식 더미를 1890년 여름부터 이듬해까지 스물다섯 점 넘게 그린 연작 중 하나입니다. 같은 더미를 계절과 시각에 따라 되풀이해 그린 첫 본격 연작으로, 1891년 파리 뒤랑뤼엘 화랑에 열다섯 점을 걸자 며칠 만에 모두 팔렸습니다. 빛이 바뀔 때마다 색이 어떻게 달라지는지를 보여주는 그림이라, 더미 하나에도 분홍·주황·보라가 섞여 있습니다.',
    'One of more than twenty-five canvases Monet painted of the grainstacks in the fields beside his house at Giverny between summer 1890 and 1891. It was his first true series, the same subject repeated across seasons and hours, and when fifteen were shown at Durand-Ruel in Paris in 1891 they sold within days. The picture is about how light changes colour: a single stack holds pink, orange and violet.',
    'モネがジヴェルニーの自宅近くの畑にある穀物の山を、1890年夏から翌年にかけて25点以上描いた連作のひとつ。同じ対象を季節と時刻を変えて繰り返し描いた最初の本格的な連作で、1891年にパリのデュラン＝リュエル画廊で15点を展示すると数日で完売しました。光が変わるたびに色がどう変わるかを示す絵で、ひとつの山に桃色・橙・紫が混ざっています。'] },
  'monet-water-lilies': { t: ['수련 (1906)', '睡蓮（1906）'], about: [
    '모네가 지베르니 정원의 연못을 그린 수련 연작 초기작입니다. 1906년 무렵부터 그는 물가와 하늘을 화면에서 지우고 수면만을 남겨, 연잎과 꽃, 그리고 물에 비친 구름이 한 평면에 겹치게 했습니다. 어디가 위이고 아래인지 단서가 적어 퍼즐로는 상급이지만, 분홍 꽃송이가 좋은 이정표가 됩니다.',
    'An early canvas from the Water Lilies series painted at the pond Monet built in his garden at Giverny. Around 1906 he cut the bank and sky out of the frame and kept only the surface of the water, so lily pads, blossoms and reflected clouds share one plane. With few clues to up and down it is a demanding puzzle, but the pink blossoms are good landmarks.',
    'モネがジヴェルニーの庭に作った池を描いた睡蓮連作の初期作。1906年頃から彼は岸と空を画面から消し、水面だけを残して、睡蓮の葉と花、水に映る雲を同じ平面に重ねました。上下の手がかりが少ないのでパズルとしては上級ですが、桃色の花が良い目印になります。'] },
  'monet-arrival-normandy-train': { t: ['생라자르 역, 노르망디 열차의 도착', 'サン＝ラザール駅、ノルマンディー列車の到着'], about: [
    '1877년 모네는 파리 생라자르 역 구내에 이젤을 세우고 열차와 증기를 열두 점 그렸습니다. 이 그림은 그중 하나로, 기관차 연기가 유리 지붕 아래 푸른 안개처럼 퍼지는 순간을 잡았습니다. 인상파 화가들이 자연이 아닌 근대 도시의 기계와 속도를 그림의 주제로 삼았다는 걸 보여주는 대표작입니다.',
    'In 1877 Monet set up his easel inside the Gare Saint-Lazare in Paris and painted twelve views of trains and steam. This is one of them, catching the moment engine smoke spreads like blue fog beneath the glass roof. It is a key example of the Impressionists taking the machines and speed of the modern city, not just nature, as a subject.',
    '1877年、モネはパリのサン＝ラザール駅の構内にイーゼルを立て、列車と蒸気を12点描きました。これはそのひとつで、機関車の煙がガラス屋根の下に青い霧のように広がる瞬間をとらえています。印象派が自然だけでなく近代都市の機械と速度を主題にしたことを示す代表作です。'] },
  'monet-beach-sainte-adresse': { t: ['생타드레스의 해변', 'サント＝アドレスの浜辺'], about: [
    '스물여섯 살의 모네가 고향 르아브르 근처 해변 마을 생타드레스에서 그린 그림입니다. 모래밭에 끌어올린 고기잡이배와 잿빛 하늘, 흰 파도가 두터운 붓질로 담겨 있습니다. 이 무렵 그는 돈이 없어 아버지 집에 얹혀살며 그렸고, 몇 년 뒤 이 해안의 빛이 "인상, 해돋이"로 이어집니다.',
    'Painted when Monet was twenty-six at Sainte-Adresse, the seaside village near his hometown of Le Havre. Fishing boats hauled onto the sand, a grey sky and white surf are set down in thick strokes. He was broke and living with his father at the time; a few years later the light of this coast would become Impression, Sunrise.',
    '26歳のモネが故郷ル・アーヴル近くの海辺の村サント＝アドレスで描いた作品。砂浜に引き上げた漁船、灰色の空、白い波が厚い筆致で描かれています。当時の彼は金がなく父の家に身を寄せており、数年後この海岸の光が「印象、日の出」につながります。'] },
  'monet-cliff-walk-pourville': { t: ['푸르빌의 절벽 산책', 'プールヴィルの断崖の散歩'], about: [
    '1882년 노르망디 푸르빌의 절벽 위에서 양산을 든 두 여인이 바다를 내려다보는 장면입니다. 모네는 절벽의 풀을 바람에 흔들리는 짧은 붓질로, 바다는 여러 색의 점으로 나눠 그렸습니다. 여인들은 아마 이듬해 그와 결혼하는 알리스 오슈데의 딸들일 것입니다.',
    'Two women with parasols look out to sea from the cliffs at Pourville in Normandy in 1882. Monet painted the grass in short strokes bent by the wind and broke the sea into dabs of many colours. The women are probably daughters of Alice Hoschedé, whom he would marry the following year.',
    '1882年、ノルマンディーのプールヴィルの断崖の上で、日傘を持った二人の女性が海を見下ろす場面。モネは断崖の草を風に揺れる短い筆致で、海をさまざまな色の点に分けて描きました。女性たちはおそらく翌年彼と結婚するアリス・オシュデの娘たちです。'] },
  'monet-water-lily-pond': { t: ['수련 연못', '睡蓮の池'], about: [
    '지베르니 정원의 일본식 아치 다리를 그린 1900년 작품입니다. 모네는 1893년 땅을 사서 연못을 파고 다리를 놓았고, 이 다리 연작으로 정원 그림을 시작했습니다. 버드나무 가지와 다리의 곡선, 수면의 연잎이 세 층으로 겹쳐 있어 위에서 아래로 차례로 맞추면 수월합니다.',
    'The Japanese-style arched bridge in Monet\'s garden at Giverny, painted in 1900. He bought the land in 1893, dug the pond and built the bridge, and this bridge series is where his garden pictures begin. Willow branches, the curve of the bridge and the lily pads stack in three layers, so working top to bottom is the easy route.',
    'ジヴェルニーの庭にある日本風の太鼓橋を描いた1900年の作品。モネは1893年に土地を買って池を掘り、橋を架け、この橋の連作から庭の絵を始めました。柳の枝、橋の曲線、水面の睡蓮の葉が三層に重なっているので、上から順に組むと楽です。'] },
  'monet-bordighera': { t: ['보르디게라', 'ボルディゲーラ'], about: [
    '1884년 모네는 이탈리아 리비에라의 보르디게라에 석 달 머물며 지중해의 빛에 놀랐습니다. 이 그림은 뒤틀린 소나무와 야자수 사이로 마을과 바다가 보이는 풍경으로, 그는 편지에 "이 빛을 그리려면 다이아몬드와 보석의 팔레트가 필요하다"고 썼습니다. 파랑과 분홍이 그림자에까지 들어가 있습니다.',
    'In 1884 Monet spent three months at Bordighera on the Italian Riviera, astonished by the Mediterranean light. Here the town and sea appear between twisted pines and palms; he wrote that painting this light would take "a palette of diamonds and jewels". Blues and pinks reach even into the shadows.',
    '1884年、モネはイタリア・リヴィエラのボルディゲーラに3か月滞在し、地中海の光に驚きました。この絵はねじれた松と椰子の間に町と海が見える風景で、彼は手紙に「この光を描くにはダイヤモンドと宝石のパレットが要る」と書いています。青と桃色が影の中にまで入っています。'] },
  'monet-stacks-wheat-2': { t: ['건초 더미 (해 질 녘, 가을)', '積みわら（日没、秋）'], about: [
    '같은 건초 더미 연작에서 해가 지는 가을 저녁을 그린 판입니다. 더미의 그늘진 면은 파랑과 보라로, 햇빛이 닿는 가장자리는 주황과 빨강으로 타오릅니다. 모네는 빛이 바뀌면 캔버스를 바꿔 가며 여러 점을 동시에 그렸고, 의붓딸 블랑슈가 손수레로 캔버스를 날랐다고 합니다.',
    'From the same grainstack series, this canvas shows an autumn evening at sunset. The shaded side of the stack is blue and violet while the sunlit edge burns orange and red. Monet worked on several canvases at once, switching as the light changed, and his stepdaughter Blanche wheeled them out in a barrow.',
    '同じ積みわら連作から、秋の日没を描いた一枚。山の陰の面は青と紫、日の当たる縁は橙と赤に燃えています。モネは光が変わるとカンヴァスを替えて何点も同時に描き、義理の娘ブランシュが手押し車でカンヴァスを運んだと伝えられます。'] },
  'monet-bank-seine': { t: ['센 강변, 베느쿠르', 'セーヌ河岸、ベヌクール'], about: [
    '1868년 여름, 스물일곱의 모네가 연인 카미유를 센 강변 나무 그늘에 앉히고 그린 그림입니다. 강 건너 마을이 물에 거꾸로 비치고, 카미유의 하얀 드레스에 나뭇잎 그림자가 얼룩집니다. 야외에서 빛과 반사를 직접 관찰해 그린 초기 인상주의의 출발점으로 꼽힙니다.',
    'In summer 1868 the twenty-seven-year-old Monet seated his companion Camille in the shade of a tree on the bank of the Seine. The village across the river hangs upside down in the water, and leaf shadows dapple her white dress. It is often cited as a starting point of Impressionism: light and reflection observed directly outdoors.',
    '1868年夏、27歳のモネが恋人カミーユをセーヌ河岸の木陰に座らせて描いた絵。対岸の村が水に逆さに映り、カミーユの白いドレスに葉の影がまだらに落ちます。屋外で光と反射を直接観察して描いた初期印象派の出発点とされます。'] },
  'cezanne-basket-apples': { t: ['사과 바구니', 'リンゴの籠'], about: [
    '세잔의 정물화 중 가장 유명한 작품입니다. 기울어진 바구니, 서로 맞지 않는 탁자 모서리, 쌓아 올린 비스킷은 실수가 아니라 여러 시점에서 본 것을 한 화면에 합친 결과로, 뒷날 피카소의 입체주의로 이어집니다. 세잔은 사과가 썩을 때까지 몇 주씩 같은 배치를 그렸습니다.',
    'The most famous of Cézanne\'s still lifes. The tilted basket, table edges that do not line up and the stacked biscuits are not mistakes but several viewpoints combined on one surface, an idea Picasso would carry into Cubism. Cézanne worked on an arrangement for weeks, until the apples rotted.',
    'セザンヌの静物画の中で最も有名な作品。傾いた籠、噛み合わないテーブルの縁、積み上げたビスケットは失敗ではなく、複数の視点を一つの画面に合成した結果で、後にピカソのキュビスムへつながります。セザンヌはリンゴが腐るまで何週間も同じ配置を描き続けました。'] },
  'cezanne-bay-marseille': { t: ['레스타크에서 본 마르세유 만', 'レスタックから見たマルセイユ湾'], about: [
    '세잔이 어머니의 집이 있던 어촌 레스타크에서 마르세유 만을 내려다보며 그린 풍경입니다. 주황 지붕, 짙푸른 바다, 연보라 산이 수평 띠로 겹쳐 있고 붓질은 벽돌을 쌓듯 규칙적입니다. 그는 친구 피사로에게 "여기 바다는 검은 실루엣 위에 놓인 카드처럼 보인다"고 편지를 썼습니다.',
    'Cézanne painted this view over the Bay of Marseille from L\'Estaque, the fishing village where his mother had a house. Orange roofs, deep blue sea and lilac hills stack in horizontal bands, laid down in brick-like strokes. He wrote to Pissarro that the sea here looked "like a playing card set against black silhouettes".',
    'セザンヌが母の家があった漁村レスタックからマルセイユ湾を見下ろして描いた風景。橙の屋根、濃い青の海、薄紫の山が水平の帯に重なり、筆致は煉瓦を積むように規則的です。彼は友人ピサロに「ここの海は黒いシルエットの上に置いたトランプのように見える」と書き送りました。'] },
  'cezanne-madame-cezanne': { t: ['노란 의자에 앉은 세잔 부인', '黄色い椅子のセザンヌ夫人'], about: [
    '세잔은 아내 오르탕스 피케를 스물아홉 점 넘게 그렸는데, 이 그림은 붉은 드레스에 노란 안락의자 연작 중 하나입니다. 표정은 굳어 있지만 이는 세잔이 몇 시간씩 움직이지 말라고 요구했기 때문으로, 그는 "사과처럼 가만히 있으라"고 했다고 전해집니다. 드레스의 붉은색과 의자의 노랑이 서로를 밀어냅니다.',
    'Cézanne painted his wife Hortense Fiquet more than twenty-nine times; this is one of a group in a red dress on a yellow armchair. Her stiff expression comes from sittings that lasted hours, during which he reportedly told her to keep still "like an apple". The red of the dress and the yellow of the chair push against each other.',
    'セザンヌは妻オルタンス・フィケを29回以上描きましたが、これは赤いドレスに黄色い肘掛け椅子の連作のひとつ。硬い表情は何時間も動くなと求められたためで、「リンゴのようにじっとしていろ」と言ったと伝えられます。ドレスの赤と椅子の黄が互いに押し合っています。'] },
  'cezanne-auvers': { t: ['오베르 전경', 'オーヴェールの全景'], about: [
    '1873년 무렵 세잔이 오베르쉬르우아즈에 살며 이웃 피사로에게 배운 시기의 풍경입니다. 마을 지붕과 밭이 조각보처럼 이어지고 붓질은 아직 인상파에 가깝게 부드럽습니다. 같은 마을을 17년 뒤 반 고흐가 그렸고, 그가 잠든 곳도 이곳입니다.',
    'Painted around 1873 while Cézanne lived at Auvers-sur-Oise and learned from his neighbour Pissarro. Rooftops and fields join like patchwork and the brushwork is still soft, close to Impressionism. Van Gogh would paint the same village seventeen years later, and is buried there.',
    '1873年頃、セザンヌがオーヴェル＝シュル＝オワーズに住み、隣人ピサロに学んだ時期の風景。村の屋根と畑がパッチワークのようにつながり、筆致はまだ印象派に近く柔らかです。同じ村を17年後にゴッホが描き、彼が眠る場所でもあります。'] },
  'cezanne-vase-tulips': { t: ['튤립 꽃병', 'チューリップの花瓶'], about: [
    '초록 도기 병에 꽂힌 빨간 튤립과 흰 꽃, 그리고 앞에 놓인 사과 몇 알. 세잔은 시들기 쉬운 생화 대신 종이꽃을 쓰기도 했는데, 이 그림의 꽃잎이 유난히 또렷한 것도 그 때문일 수 있습니다. 배경의 회청색 벽이 붉은 꽃을 앞으로 밀어냅니다.',
    'Red tulips and white blossoms in a green earthenware jug, with a few apples in front. Cézanne sometimes used paper flowers because real ones wilted before he finished, which may be why these petals are so crisp. The grey-blue wall behind pushes the red blooms forward.',
    '緑の陶器の瓶に挿した赤いチューリップと白い花、手前に置かれた数個のリンゴ。セザンヌは萎れやすい生花の代わりに造花を使うこともあり、この絵の花弁が妙にくっきりしているのはそのためかもしれません。背景の灰青の壁が赤い花を前に押し出します。'] },
  'cezanne-plate-apples': { t: ['사과 접시', 'リンゴの皿'], about: [
    '1877년 무렵의 정물로, 파란 꽃무늬 벽지 앞에 사과 접시가 놓여 있습니다. 세잔은 사과를 "파리를 정복할" 소재라 불렀고 평생 수백 개를 그렸습니다. 사과 하나하나가 붉은색에서 초록으로 넘어가는 색띠로 둥글게 빚어져 있어, 조각마다 색의 방향을 보고 맞추게 됩니다.',
    'A still life from around 1877: a plate of apples before blue floral wallpaper. Cézanne said he would "conquer Paris with an apple" and painted hundreds of them in his life. Each apple is modelled with bands of colour turning from red to green, so you match pieces by the direction of the colour.',
    '1877年頃の静物で、青い花柄の壁紙の前にリンゴの皿が置かれています。セザンヌはリンゴを「パリを征服する」素材と呼び、生涯に何百個も描きました。ひとつひとつのリンゴが赤から緑へ移る色の帯で丸く造形されており、ピースごとに色の向きを見て合わせることになります。'] },
  'pissarro-place-du-havre': { t: ['파리, 아브르 광장', 'パリ、アーヴル広場'], about: [
    '1893년 예순셋의 피사로는 눈병 때문에 야외 작업이 어려워지자 파리 호텔 창가에서 거리를 내려다보며 그렸습니다. 생라자르 역 앞 광장의 마차와 행인, 오스만식 건물 정면이 높은 시점에서 잡혀 있습니다. 그가 도시 연작을 시작한 첫 해의 작품입니다.',
    'In 1893, at sixty-three, Pissarro\'s eye trouble made outdoor work difficult, so he painted the street from a Paris hotel window. Carriages and pedestrians on the square in front of the Gare Saint-Lazare and the Haussmann façades are seen from high up. It dates from the first year of his city series.',
    '1893年、63歳のピサロは眼病で屋外制作が難しくなり、パリのホテルの窓から通りを見下ろして描きました。サン＝ラザール駅前の広場の馬車と通行人、オスマン様式の建物正面が高い視点でとらえられています。彼が都市連作を始めた最初の年の作品です。'] },
  'pissarro-crystal-palace': { t: ['수정궁', '水晶宮'], about: [
    '1870년 프로이센 전쟁을 피해 런던으로 간 피사로가 이듬해 남부 교외 시드넘에서 그린 그림입니다. 오른쪽 유리 건물이 1851년 만국박람회장이었던 수정궁으로, 1936년 화재로 사라져 이 그림이 귀한 기록이 됐습니다. 길을 따라 산책하는 사람들과 마차, 겨울 하늘이 담담합니다.',
    'Pissarro fled the Franco-Prussian War to London in 1870 and painted this at Sydenham in the southern suburbs the following year. The glass building on the right is the Crystal Palace of the 1851 Great Exhibition, destroyed by fire in 1936, which makes this a rare record. Strollers, a carriage and a winter sky are set down quietly.',
    '1870年、普仏戦争を避けてロンドンへ渡ったピサロが翌年、南郊シドナムで描いた絵。右のガラスの建物が1851年万国博覧会場だった水晶宮で、1936年の火災で失われたためこの絵は貴重な記録になりました。道を散歩する人々と馬車、冬の空が淡々と描かれています。'] },
  'pissarro-woman-child-well': { t: ['우물가의 여인과 아이', '井戸端の女と子ども'], about: [
    '피사로가 퐁투아즈 농가 마당의 우물가에서 여인과 아이가 이야기하는 모습을 그린 1882년 작품입니다. 이 시기 그는 농민의 일상을 크게 그리며 인물화에 집중했고, 붓질을 잘게 나눠 화면 전체를 고르게 채우는 방식을 썼습니다. 파란 앞치마와 초록 담장이 조각의 길잡이입니다.',
    'A woman and a child talk beside the well in a farmyard at Pontoise, painted in 1882. In these years Pissarro concentrated on figures, painting peasant life at a large scale with small, even strokes that fill the whole surface. The blue apron and the green wall guide the pieces.',
    'ピサロがポントワーズの農家の庭の井戸端で、女性と子どもが話す様子を描いた1882年の作品。この時期の彼は農民の日常を大きく描く人物画に集中し、筆致を細かく分けて画面全体を均一に埋める方法を取りました。青いエプロンと緑の塀がピースの道しるべです。'] },
  'pissarro-rabbit-warren-pontoise': { t: ['퐁투아즈의 토끼 사육장, 눈', 'ポントワーズの兎小屋、雪'], about: [
    '1879년 겨울 퐁투아즈 언덕의 눈 덮인 마을을 그린 그림입니다. 눈은 흰색이 아니라 파랑·분홍·회색으로 칠해져 있고, 앙상한 나무가 그 위에 검은 선을 긋습니다. 피사로는 이 무렵 세잔·고갱과 함께 그렸으며, 촘촘한 붓질에서 그 교류가 보입니다.',
    'A snow-covered village on the hillside at Pontoise in the winter of 1879. The snow is painted not white but blue, pink and grey, with bare trees drawing dark lines across it. Pissarro was working alongside Cézanne and Gauguin at the time, and the dense brushwork shows that exchange.',
    '1879年冬、ポントワーズの丘の雪に覆われた村を描いた絵。雪は白ではなく青・桃色・灰色で塗られ、裸の木がその上に黒い線を引きます。ピサロはこの頃セザンヌやゴーギャンと一緒に描いており、密な筆致にその交流が見えます。'] },
  'pissarro-haymaking-eragny': { t: ['에라니의 건초 만들기', 'エラニーの干し草作り'], about: [
    '피사로가 만년을 보낸 에라니의 초원에서 농부들이 건초를 뒤집는 여름 풍경입니다. 1892년 작으로, 점묘법을 시도하다 돌아온 직후라 붓점이 작고 색이 밝습니다. 여인들의 파란 옷과 흰 두건이 초록 들판에 점점이 박혀 있어 인물부터 찾으면 판이 잡힙니다.',
    'Farm workers turn hay in the meadows at Éragny, where Pissarro spent his last years. Painted in 1892, just after his experiment with pointillism, it keeps small dabs and bright colour. The women\'s blue clothes and white kerchiefs dot the green field, so finding the figures first anchors the board.',
    'ピサロが晩年を過ごしたエラニーの草原で、農夫たちが干し草を返す夏の風景。1892年作で、点描を試みて戻った直後のため筆点が小さく色が明るい。女性たちの青い服と白い頭巾が緑の野に点々と置かれ、人物から探すと盤面が定まります。'] },
  'pissarro-snow-louveciennes': { t: ['루브시엔의 눈', 'ルーヴシエンヌの雪'], about: [
    '1870년 무렵 피사로가 살던 파리 서쪽 마을 루브시엔의 눈 내린 길입니다. 이 집은 곧 프로이센군에 점령돼 그가 두고 간 그림 천 점 이상이 사라졌고, 남은 몇 점 중 하나가 이 작품입니다. 회색 하늘 아래 눈길을 걷는 사람 둘이 유일한 색점입니다.',
    'A snowy road at Louveciennes, the village west of Paris where Pissarro lived around 1870. Prussian troops soon occupied the house and more than a thousand paintings he left behind were lost; this is one of the few survivors. Two figures walking in the snow are the only spots of colour under the grey sky.',
    '1870年頃、ピサロが住んでいたパリ西方の村ルーヴシエンヌの雪道。この家はまもなくプロイセン軍に占領され、彼が残した千点以上の絵が失われましたが、残った数点のひとつがこの作品です。灰色の空の下、雪道を歩く二人が唯一の色点です。'] },
  'sisley-turn-road': { t: ['길모퉁이', '道の曲がり角'], about: [
    '시슬레가 1873년 파리 근교 마을의 굽은 길을 그린 풍경입니다. 그는 인상파 중 가장 일관되게 풍경만 그린 화가로, 하늘을 그림의 주인공으로 여겨 화면의 절반 이상을 하늘에 내주곤 했습니다. 이 그림도 구름이 흐르는 하늘이 넓고, 길가 담장의 노란 벽이 방향을 잡아 줍니다.',
    'A bend in a village road near Paris, painted by Sisley in 1873. Of all the Impressionists he was the one who painted landscape most consistently, and he treated the sky as the main character, often giving it more than half the canvas. Here too the cloudy sky is wide, and the yellow wall along the road keeps you oriented.',
    'シスレーが1873年にパリ近郊の村の曲がった道を描いた風景。彼は印象派の中で最も一貫して風景だけを描いた画家で、空を絵の主役と考え、画面の半分以上を空に与えることがよくありました。この絵も雲の流れる空が広く、道端の黄色い塀が方向を定めてくれます。'] },
  'sisley-seine-port': { t: ['포르마를리의 센 강, 모래 더미', 'ポール＝マルリーのセーヌ川、砂の山'], about: [
    '1875년 시슬레가 살던 마를리 근처 센 강가에 하역된 모래 더미와 배를 그린 작품입니다. 강물에 비친 하늘, 흰 모래, 회색 배가 낮은 지평선 위에 가로로 이어집니다. 이듬해 이 강이 크게 범람했고, 시슬레는 그 홍수도 연작으로 남겼습니다.',
    'Sand unloaded on the bank of the Seine near Marly, where Sisley lived in 1875, with barges beside it. Sky reflected in the river, white sand and grey boats run horizontally above a low horizon. The river flooded badly the next year, and Sisley painted that too, as a series.',
    '1875年、シスレーが住んでいたマルリー近くのセーヌ河岸に荷揚げされた砂の山と船を描いた作品。川に映る空、白い砂、灰色の船が低い地平線の上に横につながります。翌年この川は大氾濫し、シスレーはその洪水も連作に残しました。'] },
  'sisley-street-moret': { t: ['모레의 거리', 'モレの通り'], about: [
    '시슬레가 마지막 20년을 보낸 퐁텐블로 숲 근처 마을 모레쉬르루앙의 거리입니다. 1890년 무렵 작품으로, 햇빛이 비스듬히 든 골목의 벽들이 분홍과 크림색으로 빛나고 성당 탑이 끝에 서 있습니다. 그는 가난 속에 이 마을에서 생을 마쳤고, 죽은 뒤에야 그림값이 올랐습니다.',
    'A street in Moret-sur-Loing, the town near the forest of Fontainebleau where Sisley spent his last twenty years. Painted around 1890, the lane\'s walls glow pink and cream in slanting sun with the church tower at the end. He died there in poverty; his prices rose only after his death.',
    'シスレーが最後の20年を過ごしたフォンテーヌブローの森近くの町モレ＝シュル＝ロワンの通り。1890年頃の作品で、斜めに日の差す路地の壁が桃色とクリーム色に輝き、教会の塔が突き当たりに立っています。彼は貧困の中でこの町で生涯を終え、死後にようやく絵の値が上がりました。'] },
  'sisley-watering-place-marly': { t: ['마를리의 물 마시는 곳', 'マルリーの水飲み場'], about: [
    '루이 14세 시절 왕실 말들이 물을 마시던 마를리의 연못을 1875년에 그린 그림입니다. 옛 궁전은 사라졌지만 연못과 가로수는 남아 마을 사람들이 산책하는 곳이 됐습니다. 물에 비친 나무와 흰 구름이 화면 아래위로 대칭을 이룹니다.',
    'The pond at Marly where the royal horses drank in the days of Louis XIV, painted in 1875. The palace was long gone but the pond and its trees remained as a place for villagers to stroll. Trees and white clouds mirrored in the water make the top and bottom of the picture nearly symmetrical.',
    'ルイ14世時代に王室の馬が水を飲んだマルリーの池を1875年に描いた絵。昔の宮殿は消えましたが、池と並木は残り、村人の散歩道になりました。水に映った木と白い雲が画面の上下で対称をなしています。'] },
  'sisley-landscape-along-seine': { t: ['센 강변 풍경, 프랑스 학사원과 퐁데자르', 'セーヌ河岸の風景、学士院とポン・デ・ザール'], about: [
    '시슬레가 파리 한복판 센 강에서 퐁데자르 다리와 학사원 돔을 바라본 1875년 무렵의 풍경입니다. 시슬레의 파리 도심 그림은 드물어 특히 귀합니다. 강물, 다리 난간, 돔 지붕이 수평선으로 겹치고 하늘이 크게 열려 있습니다.',
    'A view along the Seine in the heart of Paris toward the Pont des Arts and the dome of the Institut de France, painted around 1875. Sisley rarely painted central Paris, which makes this one unusual. River, bridge railing and dome layer as horizontals beneath a wide open sky.',
    'シスレーがパリ中心部のセーヌ川からポン・デ・ザールと学士院のドームを望んだ1875年頃の風景。シスレーがパリ都心を描いた例は少なく、特に貴重です。川、橋の欄干、ドームの屋根が水平線として重なり、空が大きく開いています。'] },
  'corot-view-genoa': { t: ['제노바 풍경', 'ジェノヴァの眺め'], about: [
    '1834년 두 번째 이탈리아 여행 중 코로가 제노바 항구를 언덕에서 내려다보며 종이에 그린 유화 스케치입니다. 젊은 코로는 이런 야외 습작을 수백 점 그렸고, 훗날 인상파가 그를 아버지처럼 여긴 이유가 이 맑은 빛과 단순한 면 처리에 있습니다. 지붕과 바다, 하늘이 세 개의 색면으로 정리돼 있습니다.',
    'An oil sketch on paper made during Corot\'s second trip to Italy in 1834, looking down on the harbour of Genoa from a hill. Young Corot made hundreds of these outdoor studies, and their clear light and simple planes are why the Impressionists later called him a father figure. Roofs, sea and sky settle into three fields of colour.',
    '1834年、2度目のイタリア旅行中にコローがジェノヴァ港を丘から見下ろして紙に描いた油彩スケッチ。若いコローはこうした屋外習作を数百点描き、後に印象派が彼を父と仰いだ理由はこの澄んだ光と単純な面の処理にあります。屋根と海と空が三つの色面に整理されています。'] },
  'corot-monte-pincio': { t: ['로마, 핀초 언덕', 'ローマ、ピンチョの丘'], about: [
    '로마 시내가 내려다보이는 핀초 언덕의 산책로를 코로가 1840년대에 그린 그림입니다. 은회색 하늘과 옅은 초록, 흙빛 건물이 낮게 깔린 코로 특유의 부드러운 색조입니다. 그는 이탈리아에서 그린 스케치를 평생 파리 작업실에서 꺼내 보며 다시 그렸습니다.',
    'The promenade on the Pincian Hill overlooking Rome, painted by Corot in the 1840s. Silvery sky, pale green and earth-coloured buildings give the soft tonality that is his signature. He kept the sketches he had made in Italy in his Paris studio and returned to them for the rest of his life.',
    'ローマ市内を見下ろすピンチョの丘の散歩道を、コローが1840年代に描いた絵。銀灰色の空、淡い緑、土色の建物が低く広がるコロー特有の柔らかな色調です。彼はイタリアで描いたスケッチを生涯パリのアトリエで取り出しては描き直しました。'] },
  'constable-stoke': { t: ['스토크바이네일랜드', 'ストーク・バイ・ネイランド'], about: [
    '컨스터블이 고향 서퍽의 마을 스토크바이네일랜드 교회를 언덕 위에 그린 1836년 작품입니다. 그는 평생 이 몇 마일의 시골만 그렸고, "이 풍경이 나를 화가로 만들었다"고 말했습니다. 흰 물감을 칼로 찍어 넣은 반짝임과 무거운 구름이 영국 하늘 그대로입니다.',
    'The church at Stoke-by-Nayland, in Constable\'s native Suffolk, set on its hill in 1836. He painted these few miles of countryside all his life and said this landscape "made me a painter". Flecks of white laid on with a knife and heavy clouds are an English sky as it is.',
    'コンスタブルが故郷サフォークの村ストーク・バイ・ネイランドの教会を丘の上に描いた1836年の作品。彼は生涯この数マイルの田舎だけを描き、「この風景が私を画家にした」と語りました。ナイフで置いた白の輝きと重い雲はイギリスの空そのものです。'] },
  'turner-fishing-boats-hucksters': { t: ['생선 값을 흥정하는 장사꾼들과 고기잡이배', '魚を値切る行商人と漁船'], about: [
    '터너가 1837년경 그린 바다 그림으로, 파도 위에서 장사꾼들이 어부와 생선 값을 흥정하는 장면입니다. 배와 사람은 거의 형체만 남고 물보라와 빛이 화면을 삼킵니다. 터너의 이 시기 작품은 당시 평론가에게 "비눗물과 회반죽"이라는 조롱을 들었지만, 지금은 추상화의 예고로 읽힙니다.',
    'A sea piece by Turner from around 1837: hucksters bargaining with fishermen over the catch, afloat among the waves. Boats and people are barely more than shapes as spray and light swallow the scene. Critics of the day mocked such works as "soapsuds and whitewash"; today they read as a forecast of abstraction.',
    'ターナーが1837年頃に描いた海の絵で、波の上で行商人が漁師と魚の値を交渉する場面。船と人はほとんど形だけになり、しぶきと光が画面を呑み込みます。この時期のターナー作品は当時の批評家に「石けん水と漆喰」と嘲られましたが、今では抽象絵画の予告と読まれています。'] },
  'gogh-bedroom': { t: ['침실', '寝室'], about: [
    '아를 노란 집의 자기 침실을 그린 세 점 중 두 번째로, 1889년 생레미 요양원에서 첫 번째 그림을 보며 다시 그렸습니다. 고흐는 동생 테오에게 "색만으로 휴식과 잠을 표현하고 싶었다"고 썼습니다. 벽은 연보라, 바닥은 붉은 벽돌색, 침대는 버터 노랑으로 단순하게 나뉘어 있어 조각의 경계가 뚜렷합니다.',
    'The second of three versions of van Gogh\'s bedroom in the Yellow House at Arles, repainted from the first in 1889 at the asylum in Saint-Rémy. He told his brother Theo he wanted colour alone to express "rest, or sleep in general". Lilac walls, red-brick floor and butter-yellow bed fall into simple zones, so the piece boundaries are clear.',
    'アルルの黄色い家の自室を描いた3点のうち2番目で、1889年サン＝レミの療養院で最初の絵を見ながら描き直しました。ゴッホは弟テオに「色だけで休息と眠りを表現したかった」と書いています。壁は薄紫、床は赤煉瓦色、ベッドはバター色に単純に分かれ、ピースの境界がはっきりしています。'] },
  'gogh-self-portrait': { t: ['자화상 (1887)', '自画像（1887）'], about: [
    '파리 시절 고흐가 거울을 보며 그린 서른 점 넘는 자화상 중 하나입니다. 모델을 살 돈이 없어 자신을 그렸고, 이 시기에 쇠라의 점묘법을 익혀 짧은 점과 선으로 얼굴과 배경을 채웠습니다. 초록과 빨강, 파랑과 주황 같은 보색이 점 단위로 맞부딪혀 멀리서 보면 진동하는 듯합니다.',
    'One of more than thirty self-portraits van Gogh painted in Paris, working from a mirror because he could not afford models. He had just absorbed Seurat\'s pointillism and built face and background from short dots and dashes. Complementary pairs, green with red and blue with orange, collide dot by dot and seem to vibrate from a distance.',
    'パリ時代のゴッホが鏡を見て描いた30点以上の自画像のひとつ。モデルを雇う金がなく自分を描き、この時期にスーラの点描を学んで短い点と線で顔と背景を埋めました。緑と赤、青と橙といった補色が点単位でぶつかり、離れて見ると震えているように見えます。'] },
  'gogh-poets-garden': { t: ['시인의 정원', '詩人の庭'], about: [
    '1888년 아를의 노란 집 맞은편 공원을 그린 그림입니다. 고흐는 이곳을 중세 시인 페트라르카가 거닐었을 법한 "시인의 정원"이라 부르며, 곧 올 고갱의 방에 걸려고 연작을 그렸습니다. 둥근 관목과 잔디의 노란빛, 파란 하늘이 넓은 면으로 나뉘어 있습니다.',
    'The public garden opposite the Yellow House in Arles, painted in 1888. Van Gogh imagined the medieval poet Petrarch strolling here and called it "the poet\'s garden", painting a series to hang in the room he was preparing for Gauguin. Round shrubs, yellow lawn and blue sky divide into broad areas.',
    '1888年、アルルの黄色い家の向かいの公園を描いた絵。ゴッホはここを中世の詩人ペトラルカが歩いたような「詩人の庭」と呼び、まもなく来るゴーギャンの部屋に飾るため連作を描きました。丸い灌木と芝の黄、青い空が広い面に分かれています。'] },
  'gogh-fishing-spring': { t: ['봄의 낚시, 클리시 다리', '春の釣り、クリシー橋'], about: [
    '파리 시절인 1887년 봄, 고흐가 센 강 상류 아니에르의 다리 옆에서 낚시하는 사람들을 그린 그림입니다. 이 무렵 그는 시냐크와 함께 교외로 나가 밝은 색과 짧은 붓질을 실험했습니다. 물빛과 신록이 파스텔처럼 밝아, 어두운 네덜란드 시절과 완전히 다른 고흐입니다.',
    'People fishing beside the bridge at Asnières on the Seine, painted in spring 1887 during van Gogh\'s Paris years. He was going out to the suburbs with Signac to try bright colour and short strokes. Water and young leaves are pastel-bright, a van Gogh entirely unlike the dark Dutch years.',
    'パリ時代の1887年春、ゴッホがセーヌ川上流アニエールの橋のそばで釣りをする人々を描いた絵。この頃彼はシニャックと郊外に出て明るい色と短い筆致を試していました。水の色と新緑がパステルのように明るく、暗いオランダ時代とはまったく違うゴッホです。'] },
  'gogh-madame-roulin-rocking': { t: ['요람을 흔드는 룰랭 부인 (자장가)', '揺りかごを揺らすルーラン夫人（子守唄）'], about: [
    '아를의 우체부 룰랭의 아내 오귀스틴이 요람 끈을 쥔 모습으로, 고흐는 이 그림을 다섯 점 그렸습니다. 뱃사람이 선실에 걸어 두고 어릴 적 자장가를 떠올릴 그림을 상상했다고 합니다. 초록 드레스, 빨간 바닥, 꽃무늬 벽지가 강한 색면으로 부딪쳐 조각의 소속이 분명합니다.',
    'Augustine Roulin, wife of the Arles postman, holds the cord of a cradle; van Gogh painted the subject five times. He imagined it hanging in a ship\'s cabin so sailors would think of the lullabies of their childhood. Green dress, red floor and flowered wallpaper meet as strong fields of colour, so each piece clearly belongs somewhere.',
    'アルルの郵便配達夫ルーランの妻オーギュスティーヌが揺りかごの紐を握る姿で、ゴッホはこの絵を5点描きました。船乗りが船室に掛けて子どもの頃の子守唄を思い出す絵を想像したといいます。緑のドレス、赤い床、花柄の壁紙が強い色面としてぶつかり、ピースの所属が明確です。'] },
  'gogh-terrace-observation-deck': { t: ['몽마르트르 블뤼트팽 풍차의 테라스와 전망대', 'モンマルトル、ブリュット＝ファン風車のテラスと展望台'], about: [
    '1887년 초 고흐가 살던 몽마르트르 언덕 위 풍차 옆 전망대를 그린 그림입니다. 가로등과 난간, 파리 시내를 내려다보는 사람들이 잿빛 겨울 하늘 아래 서 있습니다. 밝은 색으로 넘어가기 직전의 차분한 파리 풍경이라 고흐 같지 않다는 말을 듣는 그림입니다.',
    'The observation deck beside the windmill on the hill of Montmartre where van Gogh lived, painted in early 1887. Lampposts, railings and people looking out over Paris stand under a grey winter sky. Its quiet tones, just before his turn to bright colour, make people say it does not look like a van Gogh.',
    '1887年初め、ゴッホが住んでいたモンマルトルの丘の風車のそばの展望台を描いた絵。街灯と手すり、パリ市街を見下ろす人々が灰色の冬空の下に立っています。明るい色へ移る直前の落ち着いたパリ風景で、ゴッホらしくないと言われる絵です。'] },
  'gogh-grapes': { t: ['포도, 레몬, 배, 사과', 'ブドウ、レモン、洋梨、リンゴ'], about: [
    '1887년 가을 파리에서 그린 과일 정물로, 노란 바탕에 노란 과일을 놓아 색 하나로 얼마나 다양한 톤을 낼 수 있는지 실험했습니다. 붓질은 과일 주위로 물결치듯 돌아가고, 보라색 포도가 유일한 보색으로 중심을 잡습니다. 같은 해 그린 노란 정물 몇 점이 이듬해 아를의 해바라기로 이어집니다.',
    'A fruit still life from autumn 1887 in Paris: yellow fruit on a yellow ground, an experiment in how many tones one colour can hold. Strokes swirl around the fruit like water, and the violet grapes are the single complementary note that anchors it. The yellow still lifes of that year lead to the sunflowers of Arles.',
    '1887年秋にパリで描いた果物の静物で、黄色の地に黄色い果物を置き、ひとつの色でどれだけ多様な調子が出せるかを試しました。筆致は果物の周りを波のように回り、紫のブドウが唯一の補色として中心を定めます。同年の黄色い静物数点が翌年アルルのひまわりにつながります。'] },
  'gauguin-arlesiennes': { t: ['아를의 여인들 (미스트랄)', 'アルルの女たち（ミストラル）'], about: [
    '1888년 고갱이 아를에서 고흐와 함께 지내던 두 달 사이에 그린 그림입니다. 찬 바람 미스트랄을 피해 숄로 얼굴을 가린 여인들이 공원을 지나고, 고흐의 시인의 정원과 같은 장소입니다. 형태를 단순한 색면으로 자르고 윤곽선을 두른 방식이 고흐의 소용돌이와 대조를 이룹니다.',
    'Painted during the two months Gauguin spent with van Gogh in Arles in 1888. Women hide their faces in shawls against the cold Mistral wind as they cross the same park van Gogh called the Poet\'s Garden. Gauguin cuts forms into flat colour bounded by outlines, the opposite of van Gogh\'s swirls.',
    '1888年、ゴーギャンがアルルでゴッホと過ごした2か月の間に描いた絵。冷たい風ミストラルを避けてショールで顔を隠した女性たちが公園を通り、ゴッホの「詩人の庭」と同じ場所です。形を単純な色面に切り分け輪郭線で囲む方法が、ゴッホの渦巻きと対照をなします。'] },
  'gauguin-merahi-metua-tehamana': { t: ['테하마나의 조상들', 'テハアマナの祖先たち'], about: [
    '고갱의 첫 타히티 체류 때 함께 살던 열세 살 소녀 테하마나를 선교사식 드레스 차림으로 그린 1893년 초상입니다. 뒤 벽의 이스터섬 문자와 신상은 고갱이 상상한 "조상"으로, 제목이 여기서 나왔습니다. 노란 벽과 흰 꽃, 보라 드레스가 단순한 면으로 나뉩니다.',
    'Tehamana, the thirteen-year-old girl who lived with Gauguin during his first stay in Tahiti, in a missionary dress, painted in 1893. The Easter Island glyphs and idol on the wall behind are the "ancestors" of the title, invented by Gauguin. Yellow wall, white flowers and violet dress divide into simple planes.',
    'ゴーギャンの最初のタヒチ滞在中に共に暮らした13歳の少女テハアマナを、宣教師風のドレス姿で描いた1893年の肖像。背後の壁のイースター島文字と神像はゴーギャンが想像した「祖先」で、題名の由来です。黄色い壁、白い花、紫のドレスが単純な面に分かれます。'] },
  'gauguin-mahana-atua': { t: ['신의 날', '神の日'], about: [
    '1894년 고갱이 타히티에서 잠시 파리로 돌아와 기억과 상상으로 그린 그림입니다. 가운데 신상은 실제 타히티 신이 아니라 고갱이 여러 문화를 섞어 만든 것이고, 아래쪽 연못은 분홍·노랑·파랑의 추상적인 색 웅덩이로 녹아 있습니다. 상징주의 회화의 대표작으로 꼽히며, 아래 부분은 추상화 그 자체입니다.',
    'Painted in 1894 in Paris, between Gauguin\'s two stays in Tahiti, from memory and imagination. The idol in the centre is not a real Tahitian god but Gauguin\'s own blend of several cultures, and the pool at the bottom dissolves into abstract pools of pink, yellow and blue. A landmark of Symbolist painting; the lower band is pure abstraction.',
    '1894年、タヒチ滞在の合間にパリへ戻ったゴーギャンが記憶と想像で描いた絵。中央の神像は実在のタヒチの神ではなくゴーギャンが複数の文化を混ぜて作ったもので、下の池は桃色・黄・青の抽象的な色だまりに溶けています。象徴主義絵画の代表作とされ、下部は抽象画そのものです。'] },
  'gauguin-te-aha-oe': { t: ['왜 화가 났니?', 'なぜ怒っているの？'], about: [
    '1896년 두 번째 타히티 체류 때 마을 오두막 앞 여인들을 그린 그림으로, 제목은 타히티어입니다. 고갱은 실제 장면이 아니라 몇 년 전 그린 그림의 인물들을 재배치해 이 구도를 만들었습니다. 붉은 흙과 초록 풀, 흰 닭이 넓은 색면으로 놓여 있습니다.',
    'Women in front of village huts during Gauguin\'s second stay in Tahiti in 1896; the title is Tahitian. Rather than a real scene, he rearranged figures from paintings made years earlier into this composition. Red earth, green grass and white chickens lie in broad zones of colour.',
    '1896年、2度目のタヒチ滞在中に村の小屋の前の女性たちを描いた絵で、題名はタヒチ語。ゴーギャンは実際の場面ではなく、数年前に描いた絵の人物を再配置してこの構図を作りました。赤い土と緑の草、白い鶏が広い色面として置かれています。'] },
  'gauguin-polynesian-woman-children': { t: ['폴리네시아 여인과 아이들', 'ポリネシアの女と子どもたち'], about: [
    '1901년 고갱이 마르키즈 제도로 떠나기 직전 타히티에서 그린 마지막 시기의 그림입니다. 파란 옷의 여인이 아기를 안고, 옆에 아이가 서 있는 성모자 같은 구도에 흰 개가 앉아 있습니다. 병들고 빚에 시달리던 시기인데도 색은 차분하고 따뜻합니다.',
    'From Gauguin\'s last period in Tahiti in 1901, just before he left for the Marquesas. A woman in blue holds a baby with a child beside her, a composition like a Madonna, and a white dog sits nearby. Though he was ill and in debt, the colour is calm and warm.',
    '1901年、ゴーギャンがマルキーズ諸島へ発つ直前にタヒチで描いた最後期の絵。青い服の女性が赤ん坊を抱き、傍らに子どもが立つ聖母子のような構図に白い犬が座っています。病と借金に苦しんだ時期にもかかわらず、色は落ち着いて温かい。'] },
  'gauguin-te-raau-rahi': { t: ['큰 나무', '大きな木'], about: [
    '고갱이 타히티에 도착한 첫해인 1891년, 마을의 큰 나무 아래 오두막과 사람들을 그린 풍경입니다. 아직 유럽식 원근이 남아 있지만 붉은 길과 초록 잎이 이미 평평한 색면으로 정리되기 시작합니다. 그는 이 낙원을 찾아왔지만 마을은 이미 프랑스 식민지였습니다.',
    'A hut and villagers beneath a great tree, painted in 1891, Gauguin\'s first year in Tahiti. European perspective still lingers, but the red path and green leaves are already flattening into fields of colour. He had come looking for paradise; the village was already a French colony.',
    'ゴーギャンがタヒチに着いた最初の年1891年に、村の大きな木の下の小屋と人々を描いた風景。まだヨーロッパ的な遠近法が残っていますが、赤い道と緑の葉はすでに平らな色面に整理され始めています。彼は楽園を求めて来ましたが、村はすでにフランスの植民地でした。'] },
  'caillebotte-paris-street-rainy': { t: ['파리의 거리, 비 오는 날', 'パリの通り、雨の日'], about: [
    '1877년 인상파 전시회에 걸린 카유보트의 대표작으로, 오스만 남작이 새로 뚫은 파리 대로의 교차로를 비 오는 날 그렸습니다. 우산을 든 부부가 화면 밖으로 걸어 나오는 듯한 구도와 사진 같은 원근법이 당시로선 파격이었습니다. 젖은 돌바닥의 반사와 회색 건물이 넓어 큰 조각 수로 하기 좋은 그림입니다.',
    'Caillebotte\'s masterpiece, shown at the Impressionist exhibition of 1877: a crossroads on one of Baron Haussmann\'s new boulevards on a rainy day. The couple with an umbrella seem about to walk out of the frame, and the photographic perspective was radical for its time. Wide wet paving and grey façades make it a good choice for a high piece count.',
    '1877年の印象派展に出品されたカイユボットの代表作で、オスマン男爵が新たに開いたパリの大通りの交差点を雨の日に描きました。傘をさした夫婦が画面の外へ歩き出すような構図と写真のような遠近法は当時として破格でした。濡れた石畳の反射と灰色の建物が広く、多ピースに向く絵です。'] },
  'church-view-cotopaxi': { t: ['코토팍시 풍경', 'コトパクシの眺め'], about: [
    '미국 허드슨강파 화가 처치가 1853년 에콰도르를 여행하고 돌아와 그린 안데스의 화산 코토팍시입니다. 그는 과학자 훔볼트의 책을 읽고 그 발자취를 따라 남미로 갔습니다. 앞쪽의 야자수와 폭포, 멀리 눈 덮인 화산이 극적인 원근으로 이어집니다.',
    'Cotopaxi, the Andean volcano, painted by the American Hudson River School artist Church after his 1853 journey to Ecuador. He had read the scientist Humboldt and travelled to South America in his footsteps. Palms and a waterfall in the foreground lead in dramatic perspective to the snow-capped cone.',
    'アメリカのハドソン・リヴァー派の画家チャーチが1853年にエクアドルを旅して帰国後に描いたアンデスの火山コトパクシ。彼は科学者フンボルトの本を読み、その足跡をたどって南米へ行きました。手前の椰子と滝、遠くの雪を頂く火山が劇的な遠近でつながります。'] },
  'inness-home-heron': { t: ['왜가리의 집', '鷺の棲む所'], about: [
    '만년의 이니스가 1893년 그린 저녁 습지 풍경으로, 안개 속 나무와 붉게 물든 하늘 아래 왜가리 한 마리가 서 있습니다. 그는 스베덴보리의 신비주의에 심취해 풍경을 정확히 그리기보다 분위기와 영혼을 그리려 했습니다. 경계가 흐려 어렵지만 색의 온도로 구역을 나눌 수 있습니다.',
    'An evening marsh painted by Inness in 1893, late in life: trees in mist, a reddened sky and a single heron. Absorbed in the mysticism of Swedenborg, he sought mood and spirit rather than exact description. Soft edges make it hard, but the warmth or coolness of the colour separates the areas.',
    '晩年のイネスが1893年に描いた夕暮れの湿地の風景で、霧の中の木と赤く染まった空の下に鷺が一羽立っています。彼はスウェーデンボリの神秘思想に傾倒し、風景を正確に描くより雰囲気と魂を描こうとしました。輪郭が曖昧で難しいですが、色の温度で領域を分けられます。'] },
  'inness-early-morning': { t: ['이른 아침, 타폰스프링스', '早朝、ターポン・スプリングス'], about: [
    '이니스가 겨울마다 머물던 플로리다 타폰스프링스의 아침을 1892년에 그린 그림입니다. 안개 낀 들판에 붉은 지붕과 사람 하나가 작게 보이고, 하늘은 분홍에서 파랑으로 번집니다. 그는 밑그림 위에 얇은 색을 여러 겹 덧칠해 이 흐린 광채를 만들었습니다.',
    'Morning at Tarpon Springs, Florida, where Inness spent his winters, painted in 1892. A red roof and a small figure sit in a misty field while the sky bleeds from pink to blue. He built this hazy glow by glazing thin layers of colour over the underpainting.',
    'イネスが毎冬滞在したフロリダのターポン・スプリングスの朝を1892年に描いた絵。霧のかかった野に赤い屋根と小さな人影が見え、空は桃色から青へにじみます。彼は下描きの上に薄い色を何層も重ねてこの霞んだ輝きを作りました。'] },
  'inness-after-summer-shower': { t: ['여름 소나기가 지나간 뒤', '夏の夕立のあと'], about: [
    '1894년, 세상을 떠나기 몇 달 전 이니스가 그린 그림입니다. 소나기가 지나간 뒤 젖은 초원 위로 무지개가 걸리고 구름 사이로 빛이 터집니다. 형태는 거의 녹아 있지만 하늘의 밝은 띠와 어두운 나무 덩어리가 조각의 기준이 됩니다.',
    'Painted in 1894, a few months before Inness died. After a shower, a rainbow arches over the wet meadow and light breaks through the clouds. Forms have nearly dissolved, but the bright band of sky and the dark masses of trees give the pieces their bearings.',
    '1894年、亡くなる数か月前にイネスが描いた絵。夕立の後、濡れた草原に虹がかかり雲の間から光が溢れます。形はほとんど溶けていますが、空の明るい帯と暗い木の塊がピースの基準になります。'] },
  'inness-catskill-mountains': { t: ['캐츠킬 산맥', 'キャッツキル山地'], about: [
    '뉴욕 북쪽 캐츠킬 산맥의 넓은 계곡을 1870년에 그린 풍경입니다. 이 시기의 이니스는 아직 허드슨강파의 세밀한 묘사를 따르고 있어 나무 한 그루, 구름 한 덩이가 또렷합니다. 붉은 옷의 작은 인물과 흰 집이 넓은 초록 속의 길잡이입니다.',
    'The broad valley of the Catskill Mountains north of New York, painted in 1870. Inness was still following the detailed manner of the Hudson River School, so each tree and cloud is distinct. A small figure in red and a white house guide you through the expanse of green.',
    'ニューヨーク北方のキャッツキル山地の広い谷を1870年に描いた風景。この時期のイネスはまだハドソン・リヴァー派の細密な描写に従っており、木の一本、雲のひとかたまりがはっきりしています。赤い服の小さな人物と白い家が広い緑の中の道しるべです。'] },
  'inness-old-mill': { t: ['오래된 물방앗간', '古い水車小屋'], about: [
    '스물네 살의 이니스가 1849년에 그린 초기작으로, 시냇가의 낡은 물방앗간과 그 앞의 소들을 담았습니다. 갈색과 초록의 전통적인 풍경화 색조이지만 하늘의 밝은 구름에서 이미 빛에 대한 관심이 보입니다. 물에 비친 방앗간이 아래쪽 조각의 힌트입니다.',
    'An early work painted in 1849 when Inness was twenty-four: an old mill by a stream with cattle in front. The browns and greens belong to traditional landscape painting, but the bright clouds already show his interest in light. The mill\'s reflection in the water is the clue for the lower pieces.',
    '24歳のイネスが1849年に描いた初期作で、小川のほとりの古い水車小屋とその前の牛たちを描いています。茶と緑の伝統的な風景画の色調ですが、空の明るい雲にすでに光への関心が見えます。水に映った水車小屋が下部のピースのヒントです。'] },
  'daubigny-marsh': { t: ['습지', '沼地'], about: [
    '바르비종파 화가 도비니가 1871년 그린 저녁 습지로, 낮은 지평선 위로 구름 낀 하늘이 화면 대부분을 차지합니다. 그는 배를 개조한 작업실을 타고 강을 떠다니며 그렸고, 젊은 모네에게 야외 작업을 권한 사람입니다. 물웅덩이에 비친 하늘빛이 어두운 땅 사이의 통로가 됩니다.',
    'An evening marsh painted in 1871 by Daubigny of the Barbizon school, with a cloudy sky filling most of the canvas above a low horizon. He painted from a boat converted into a floating studio and encouraged the young Monet to work outdoors. Sky reflected in the pools cuts paths through the dark ground.',
    'バルビゾン派の画家ドービニーが1871年に描いた夕暮れの沼地で、低い地平線の上に曇り空が画面の大部分を占めます。彼は船を改造したアトリエで川を漂いながら描き、若いモネに屋外制作を勧めた人物です。水たまりに映る空の色が暗い地面の間の通路になります。'] },
  'fantin-latour-still-life': { t: ['정물: 탁자 모서리', '静物：テーブルの隅'], about: [
    '팡탱라투르가 1873년 그린 정물로, 흰 식탁보 위에 꽃병과 과일, 술잔이 놓여 있습니다. 이 그림은 그가 시인 랭보와 베를렌을 그린 단체 초상화 "탁자 모서리"의 짝으로, 사람들이 앉았던 자리에 사물만 남긴 셈입니다. 검은 배경과 흰 천의 대비가 뚜렷합니다.',
    'A still life from 1873: a vase, fruit and a glass on a white cloth. It is the companion to Fantin-Latour\'s group portrait By the Table, which included the poets Rimbaud and Verlaine, as if the people had left and only the objects remained. Black ground and white cloth set a sharp contrast.',
    'ファンタン＝ラトゥールが1873年に描いた静物で、白いテーブルクロスの上に花瓶と果物、グラスが置かれています。詩人ランボーとヴェルレーヌを描いた群像「テーブルの隅」の対作で、人々が去った席に物だけが残ったかのようです。黒い背景と白い布の対比が鮮明です。'] },
  'fantin-latour-still-life-flowers': { t: ['꽃 정물', '花の静物'], about: [
    '팡탱라투르는 파리 화단에서 꽃 그림으로 생계를 꾸렸고, 특히 영국 수집가들이 그의 꽃을 좋아했습니다. 1881년 작인 이 그림은 여름 꽃을 한 아름 꽂은 병을 어두운 배경 앞에 두어 꽃잎 하나하나의 색이 살아납니다. 흰 꽃과 붉은 꽃의 위치가 조각의 지도가 됩니다.',
    'Fantin-Latour made his living from flower paintings, prized above all by English collectors. In this canvas of 1881 an armful of summer flowers stands against a dark ground so every petal keeps its colour. The positions of the white and red blooms serve as the map for the pieces.',
    'ファンタン＝ラトゥールはパリ画壇で花の絵で生計を立て、特にイギリスの収集家に愛されました。1881年作のこの絵は夏の花をひと抱え挿した瓶を暗い背景の前に置き、花弁一枚一枚の色が生きています。白い花と赤い花の位置がピースの地図になります。'] },
  'fantin-latour-roses-bowl': { t: ['그릇에 담긴 장미', '鉢の薔薇'], about: [
    '분홍과 흰 장미 몇 송이를 낮은 그릇에 담은 1881년 작품입니다. 팡탱라투르는 아내 빅토리아가 기른 정원의 장미를 즐겨 그렸고, 그의 장미는 향기가 난다는 평을 들었습니다. 꽃잎의 미묘한 분홍 변화가 관건이라 확대해서 보며 맞추는 그림입니다.',
    'A few pink and white roses in a low bowl, painted in 1881. Fantin-Latour liked to paint roses grown by his wife Victoria, and people said his roses had a scent. The subtle shifts of pink in the petals are the key, so this is a puzzle to zoom into.',
    '桃色と白の薔薇数輪を低い鉢に入れた1881年の作品。ファンタン＝ラトゥールは妻ヴィクトリアが育てた庭の薔薇を好んで描き、彼の薔薇は香りがすると評されました。花弁の微妙な桃色の変化が鍵で、拡大しながら組む絵です。'] },
  'chardin-white-tablecloth': { t: ['흰 식탁보', '白いテーブルクロス'], about: [
    '18세기 프랑스의 샤르댕이 1731년 무렵 그린 정물로, 흰 식탁보 위에 빵과 술병, 소시지, 칼이 놓여 있습니다. 화려한 궁정 회화의 시대에 그는 부엌의 소박한 사물을 정직하게 그려 존경받았습니다. 붓자국이 거의 보이지 않는 매끈한 표면이라 톱니 모양으로 맞추는 조각이 많습니다.',
    'A still life from around 1731 by the eighteenth-century French painter Chardin: bread, a bottle, sausage and a knife on a white cloth. In an age of grand court painting he was admired for painting humble kitchen objects honestly. The smooth surface shows almost no brushmarks, so many pieces are matched by shape alone.',
    '18世紀フランスのシャルダンが1731年頃に描いた静物で、白いテーブルクロスの上にパンと酒瓶、ソーセージ、ナイフが置かれています。華やかな宮廷絵画の時代に、彼は台所の素朴な物を誠実に描いて尊敬されました。筆跡がほとんど見えない滑らかな表面で、形だけで合わせるピースが多くなります。'] },
  'manet-fish': { t: ['생선 (정물)', '魚（静物）'], about: [
    '마네가 1864년에 그린 정물로, 흰 천 위에 잉어와 뱀장어, 붉은 숭어, 굴과 레몬이 놓여 있습니다. 그는 스캔들이 된 "올랭피아" 직후 잠시 정물로 눈을 돌렸고, 17세기 네덜란드 정물의 구도를 빌리되 붓질은 빠르고 대담합니다. 은빛 비늘과 구리 냄비가 반짝이는 조각들입니다.',
    'A still life of 1864: carp, eel, a red mullet, oysters and a lemon on a white cloth. Manet turned briefly to still life after the scandal of Olympia, borrowing the layout of seventeenth-century Dutch painting but with fast, bold brushwork. Silver scales and a copper pan are the pieces that glint.',
    'マネが1864年に描いた静物で、白い布の上に鯉と鰻、赤いボラ、牡蠣とレモンが置かれています。彼はスキャンダルとなった「オランピア」の直後、しばらく静物に目を向け、17世紀オランダ静物の構図を借りながらも筆致は速く大胆です。銀色の鱗と銅の鍋が輝くピースです。'] },
  'manet-woman-reading': { t: ['책 읽는 여인', '本を読む女'], about: [
    '파리 카페에서 잡지를 읽는 여인을 1880년 무렵 그린 마네 만년의 그림입니다. 병으로 큰 작품이 힘들어진 그는 이런 작은 카페 장면을 빠른 붓질로 그렸고, 배경의 초록은 카페 정원의 잎사귀입니다. 검은 모자와 흰 종이가 초록 속에서 또렷한 기준점입니다.',
    'A woman reading a magazine in a Paris café, painted around 1880 in Manet\'s last years. Illness made large works difficult, so he painted small café scenes like this with quick strokes; the green behind her is the foliage of the café garden. The black hat and white page are clear anchors in the green.',
    'パリのカフェで雑誌を読む女性を1880年頃に描いたマネ晩年の絵。病で大作が難しくなった彼はこうした小さなカフェの場面を速い筆致で描き、背景の緑はカフェの庭の葉です。黒い帽子と白い紙が緑の中のはっきりした基準点です。'] },
  'manet-bullfight': { t: ['투우', '闘牛'], about: [
    '1865년 스페인 여행에서 투우를 본 마네가 돌아와 그린 그림입니다. 그는 편지에 투우의 "찬란한 빛과 소리, 그리고 피"를 적었고, 벨라스케스와 고야를 직접 본 감동을 담아 스페인 주제를 여러 점 그렸습니다. 원형 경기장의 노란 모래와 관중석의 점 같은 얼굴들이 넓은 면을 이룹니다.',
    'Painted after Manet saw a bullfight on his trip to Spain in 1865. He wrote of its "brilliant light, noise and blood" and, moved by seeing Velázquez and Goya in person, painted several Spanish subjects. The yellow sand of the ring and the dotted faces of the crowd form the broad areas.',
    '1865年のスペイン旅行で闘牛を見たマネが帰国後に描いた絵。彼は手紙に闘牛の「輝く光と音、そして血」を記し、ベラスケスとゴヤを直に見た感動を込めてスペイン主題を数点描きました。円形闘技場の黄色い砂と観客席の点のような顔が広い面を作ります。'] },
  'manet-sea-view': { t: ['바다 풍경, 잔잔한 날씨', '海景、穏やかな天気'], about: [
    '1864년 불로뉴 해안에서 마네가 그린 바다로, 청록빛 물 위에 돛단배와 증기선이 떠 있습니다. 그는 같은 해 미국 남북전쟁 군함의 해전을 그리며 바다에 관심을 가졌고, 이 그림은 그 잔잔한 짝입니다. 물의 초록과 하늘의 회색이 화면을 둘로 나눕니다.',
    'The sea off Boulogne in 1864, sailboats and a steamer on turquoise water. Manet had become interested in the sea that year while painting a naval battle of the American Civil War, and this is its calm counterpart. Green water and grey sky split the canvas in two.',
    '1864年、ブローニュの海岸でマネが描いた海で、青緑の水の上に帆船と蒸気船が浮かんでいます。彼は同年アメリカ南北戦争の軍艦の海戦を描いて海に関心を持ち、この絵はその穏やかな対作です。水の緑と空の灰色が画面を二つに分けます。'] },
  'manet-portrait-woman-black': { t: ['검은 숄을 두른 여인의 초상', '黒いショールの女の肖像'], about: [
    '1878년 무렵 마네가 파스텔처럼 부드러운 붓질로 그린 여인의 얼굴입니다. 검은 숄과 모자, 옅은 배경 사이에서 두 눈과 붉은 입술만 또렷합니다. 이 시기 마네는 파리 여인들의 짧은 초상을 많이 그렸고, 완성보다 인상을 남기는 데 관심이 있었습니다.',
    'A woman\'s face painted around 1878 with strokes as soft as pastel. Between the black shawl and hat and the pale ground, only the eyes and red lips are sharp. Manet was making many quick portraits of Parisian women at the time, more interested in impression than finish.',
    '1878年頃、マネがパステルのように柔らかな筆致で描いた女性の顔。黒いショールと帽子、淡い背景の間で、二つの目と赤い唇だけがくっきりしています。この時期のマネはパリの女性たちの短い肖像を多く描き、完成より印象を残すことに関心がありました。'] },
  'redon-still-life-flowers': { t: ['꽃 정물 (1905)', '花の静物（1905）'], about: [
    '검은 목탄 그림으로 유명하던 르동이 쉰을 넘겨 색을 발견한 뒤 그린 꽃 그림입니다. 1905년 작으로, 파스텔 톤의 배경 위에 꽃다발이 떠 있듯 놓여 있습니다. 그는 실제 꽃을 보고 그렸지만 배경과 꽃병을 흐리게 지워 꿈속 정물처럼 만들었습니다.',
    'Redon, long famous for black charcoal drawings, discovered colour after fifty and painted flowers like these. In this canvas of 1905 the bouquet seems to float on a pastel ground. He worked from real flowers but blurred vase and background until the still life looked dreamed.',
    '黒い木炭画で知られたルドンが50歳を過ぎて色彩を見出した後に描いた花の絵。1905年作で、パステル調の背景の上に花束が浮かぶように置かれています。彼は実際の花を見て描きましたが、背景と花瓶をぼかして夢の中の静物のようにしました。'] },
  'redon-flowers': { t: ['꽃: 양귀비와 데이지', '花：ケシとヒナギク'], about: [
    '1867년 무렵 젊은 르동이 판지에 그린 작은 꽃 그림으로, 어두운 배경에 붉은 양귀비와 흰 데이지가 떠 있습니다. 그가 색채 화가로 이름을 얻기 40년 전 작품이라 검은 바탕이 이후의 목탄 시대를 예고합니다. 조각 대부분이 어두워 밝은 꽃부터 잡으면 됩니다.',
    'A small flower piece on cardboard from around 1867, when Redon was young: red poppies and white daisies against a dark ground. It predates his fame as a colourist by forty years, and the black ground foreshadows his charcoal period. Most pieces are dark, so start with the bright flowers.',
    '1867年頃、若いルドンが厚紙に描いた小さな花の絵で、暗い背景に赤いケシと白いヒナギクが浮かんでいます。色彩画家として名を得る40年前の作品で、黒い地が後の木炭時代を予告しています。ピースの大半が暗いので明るい花から取りかかりましょう。'] },
  'renoir-two-sisters': { t: ['두 자매 (테라스에서)', '二人の姉妹（テラスにて）'], about: [
    '1881년 파리 근교 샤투의 센 강변 테라스에서 그린 르누아르의 대표작입니다. 붉은 모자의 소녀와 꽃 모자의 어린아이는 실제 자매가 아니라 모델들이었고, 무릎의 실타래 바구니는 색을 위해 놓였습니다. 이 그림은 인상파 전시 후 곧 팔렸고, 화면 어디를 잘라도 색이 다릅니다.',
    'One of Renoir\'s most loved paintings, made in 1881 on a terrace above the Seine at Chatou near Paris. The girl in the red hat and the child in the flowered hat were models, not real sisters, and the basket of wool on her lap is there for its colour. It sold soon after the Impressionist show; every corner has a different colour.',
    '1881年、パリ近郊シャトゥーのセーヌ河畔のテラスで描いたルノワールの代表作。赤い帽子の少女と花の帽子の幼い子は実の姉妹ではなくモデルで、膝の毛糸玉の籠は色のために置かれました。印象派展の後すぐに売れ、画面のどこを切っても色が違います。'] },
  'renoir-acrobats-cirque-fernando': { t: ['페르낭도 서커스의 곡예사들', 'フェルナンド・サーカスの曲芸師たち'], about: [
    '1879년 몽마르트르의 페르낭도 서커스에서 공연하던 바르텐베르크 자매를 그린 그림입니다. 실제 두 소녀는 열네 살, 열일곱 살이었고, 관객이 던진 오렌지를 주워 든 채 인사하는 순간입니다. 노란 의상과 주황색 원형 무대 바닥이 따뜻한 색면을 이룹니다.',
    'The Wartenberg sisters, who performed at the Cirque Fernando in Montmartre, painted in 1879. The girls were fourteen and seventeen, caught taking a bow with oranges thrown by the audience in their arms. Yellow costumes and the orange floor of the ring form warm fields of colour.',
    '1879年、モンマルトルのフェルナンド・サーカスで演じていたヴァルテンベルク姉妹を描いた絵。実際の二人は14歳と17歳で、観客が投げたオレンジを拾って持ったままお辞儀する瞬間です。黄色い衣装と橙色の円形舞台の床が温かい色面を作ります。'] },
  'renoir-fruits-midi': { t: ['남프랑스의 과일', '南仏の果物'], about: [
    '1881년 르누아르가 지중해 여행에서 가져온 남프랑스의 과일과 고추를 그린 정물입니다. 이 해 그는 이탈리아에서 라파엘로를 보고 형태를 더 단단하게 그리기 시작했는데, 과일의 윤곽이 또렷한 것이 그 변화입니다. 빨강·노랑·초록이 흰 천 위에 흩어져 있습니다.',
    'Fruit and peppers from the south of France, painted in 1881 after Renoir\'s trip to the Mediterranean. That year he saw Raphael in Italy and began to draw forms more firmly; the crisp outlines of the fruit show the change. Red, yellow and green scatter across the white cloth.',
    '1881年、ルノワールが地中海旅行から持ち帰った南仏の果物と唐辛子を描いた静物。この年彼はイタリアでラファエロを見て形をより堅固に描き始め、果物の輪郭がはっきりしているのがその変化です。赤・黄・緑が白い布の上に散らばっています。'] },
  'renoir-chrysanthemums': { t: ['국화', '菊'], about: [
    '르누아르가 1881년 무렵 그린 국화 다발입니다. 그는 "꽃을 그릴 때는 머리를 쉬게 할 수 있다"며 인물화 사이사이에 꽃을 그렸고, 여기서는 물감을 두껍게 올려 꽃잎을 빚었습니다. 노랑·흰색·붉은 국화가 뭉쳐 있어 색으로 조각을 나누면 됩니다.',
    'A bunch of chrysanthemums painted around 1881. Renoir said painting flowers "rests the brain" and did them between portraits, here modelling the petals in thick paint. Yellow, white and red blooms cluster together, so sorting pieces by colour does the work.',
    'ルノワールが1881年頃に描いた菊の束。彼は「花を描くときは頭を休められる」と言い、人物画の合間に花を描き、ここでは絵の具を厚く盛って花弁を造形しました。黄・白・赤の菊が固まっているので、色でピースを分ければよい。'] },
  'renoir-young-woman-sewing': { t: ['바느질하는 젊은 여인', '縫い物をする若い女'], about: [
    '1879년 르누아르가 꽃다발 앞에서 바느질하는 여인을 그린 그림입니다. 여인의 얼굴은 부드럽게 흐려지고 뒤의 꽃이 오히려 강한 색을 냅니다. 르누아르는 이 시기 "그림은 즐겁고 예쁘고 아름다워야 한다"고 말했고, 이 작은 그림이 그 말 그대로입니다.',
    'A woman sewing in front of a bouquet, painted in 1879. Her face is softly blurred while the flowers behind carry the strongest colour. Renoir said at the time that a painting should be "joyous, pretty and beautiful", and this small canvas is exactly that.',
    '1879年、ルノワールが花束の前で縫い物をする女性を描いた絵。女性の顔は柔らかくぼやけ、背後の花がかえって強い色を放ちます。ルノワールはこの時期「絵は楽しく、可愛らしく、美しくあるべきだ」と語り、この小さな絵はまさにその言葉通りです。'] },
  'renoir-woman-piano': { t: ['피아노 치는 여인', 'ピアノを弾く女'], about: [
    '1875년 무렵 흰 드레스의 여인이 피아노를 치는 실내 장면입니다. 촛불과 창가 빛이 드레스의 흰색을 파랑·분홍·노랑으로 물들이고, 악보의 흰 종이가 화면의 밝은 점입니다. 르누아르는 이 그림을 1876년 인상파 전시에 냈습니다.',
    'A woman in a white dress at the piano, around 1875. Candle and window light tint the white of her dress blue, pink and yellow, and the white sheet music is the brightest spot. Renoir showed the painting at the Impressionist exhibition of 1876.',
    '1875年頃、白いドレスの女性がピアノを弾く室内の場面。蝋燭と窓の光がドレスの白を青・桃色・黄に染め、楽譜の白い紙が画面の明るい点です。ルノワールはこの絵を1876年の印象派展に出品しました。'] },
  'renoir-lunch-restaurant-fournaise': { t: ['푸르네즈 식당의 점심 (노 젓는 사람들의 점심)', 'フルネーズ食堂の昼食（漕ぎ手たちの昼食）'], about: [
    '센 강 샤투 섬의 푸르네즈 식당 테라스에서 뱃놀이를 마친 이들이 점심을 먹는 1875년 그림입니다. 르누아르는 이곳 단골이었고 6년 뒤 같은 곳에서 대작 "뱃놀이 일행의 점심"을 그립니다. 격자무늬 난간 너머 강물과 흰 식탁이 밝은 조각들입니다.',
    'Boaters having lunch on the terrace of the Restaurant Fournaise on the island at Chatou on the Seine, 1875. Renoir was a regular there and six years later painted his large Luncheon of the Boating Party at the same spot. The river beyond the trellis and the white table are the bright pieces.',
    'セーヌ川シャトゥー島のフルネーズ食堂のテラスで、舟遊びを終えた人々が昼食をとる1875年の絵。ルノワールはここの常連で、6年後に同じ場所で大作「舟遊びをする人々の昼食」を描きます。格子の手すりの向こうの川と白いテーブルが明るいピースです。'] },
  'renoir-seascape': { t: ['바다 풍경 (1879)', '海景（1879）'], about: [
    '1879년 노르망디 해안에서 르누아르가 그린 보기 드문 순수 바다 그림입니다. 사람도 배도 없이 파도와 하늘만 짧은 붓질로 뒤섞여 있어 거의 추상에 가깝습니다. 파랑·초록·보라·흰색이 뒤섞인 물결이라 조각의 톱니 모양이 중요한 어려운 판입니다.',
    'A rare pure seascape by Renoir, painted on the Normandy coast in 1879. No people, no boats: waves and sky churned together in short strokes, close to abstraction. Blue, green, violet and white tangle in the water, so the shape of the tabs matters on this hard board.',
    '1879年、ノルマンディー海岸でルノワールが描いた珍しい純粋な海の絵。人も船もなく、波と空だけが短い筆致で混ざり合い、ほとんど抽象に近い。青・緑・紫・白が入り混じる波なので、ピースの突起の形が重要になる難しい盤面です。'] },
  'renoir-near-lake': { t: ['호숫가에서', '湖のほとりで'], about: [
    '1879년 무렵 호숫가 정자의 난간에 기댄 남녀를 그린 그림입니다. 격자 난간과 나뭇잎 사이로 반짝이는 물이 보이고, 인물은 빛의 얼룩 속에 반쯤 녹아 있습니다. 르누아르가 인상주의 방식에 가장 깊이 빠져 있던 시기의 작품입니다.',
    'A couple leaning on the railing of a lakeside pavilion, around 1879. Water glitters through the trellis and leaves, and the figures half dissolve in patches of light. It dates from the years when Renoir was most deeply immersed in the Impressionist manner.',
    '1879年頃、湖畔の東屋の手すりにもたれる男女を描いた絵。格子の手すりと葉の間に輝く水が見え、人物は光のまだらの中に半ば溶けています。ルノワールが印象派の手法に最も深く浸っていた時期の作品です。'] },
  'renoir-alfred-sisley': { t: ['알프레드 시슬레의 초상', 'アルフレッド・シスレーの肖像'], about: [
    '르누아르가 1876년 친구이자 동료 화가 시슬레를 그린 초상입니다. 두 사람은 1860년대 글레르의 화실에서 만나 함께 퐁텐블로 숲으로 그림을 나갔습니다. 의자를 거꾸로 타고 앉아 팔을 얹은 편안한 자세와 검은 옷, 붉은 배경이 인물을 앞으로 밀어냅니다.',
    'Renoir\'s 1876 portrait of his friend and fellow painter Sisley. The two had met in Gleyre\'s studio in the 1860s and gone out to paint together in the forest of Fontainebleau. The relaxed pose astride a chair, black coat and red background push the sitter forward.',
    'ルノワールが1876年、友人であり同僚画家のシスレーを描いた肖像。二人は1860年代にグレールの画室で出会い、共にフォンテーヌブローの森へ絵を描きに出かけました。椅子に逆向きにまたがり腕を載せたくつろいだ姿勢と黒い服、赤い背景が人物を前に押し出します。'] },
  'courbet-mere-gregoire': { t: ['그레구아르 아주머니', 'グレゴワールおばさん'], about: [
    '쿠르베가 파리의 카페 주인을 그린 1855년 초상입니다. 계산대 뒤에서 꽃 한 송이를 들고 손님을 맞는 모습으로, 그는 이런 서민을 귀족 초상만큼 크게 그려 사실주의를 선언했습니다. 여인은 사실 유명한 샹송 속 인물의 이름을 딴 것으로, 실제 모델은 카페 주인이었습니다.',
    'Courbet\'s 1855 portrait of a Paris café keeper, behind her counter with a flower, greeting a customer. Painting an ordinary woman at the scale of an aristocratic portrait was his declaration of Realism. The name comes from a popular song; the model was a real café owner.',
    'クールベがパリのカフェの女主人を描いた1855年の肖像。カウンターの後ろで花を一輪持って客を迎える姿で、彼はこうした庶民を貴族の肖像と同じ大きさで描き、写実主義を宣言しました。名前は有名なシャンソンの登場人物から取られ、実際のモデルはカフェの主人でした。'] },
  'courbet-rock-hautepierre': { t: ['오트피에르 바위', 'オートピエールの岩'], about: [
    '쿠르베의 고향 오르낭 근처 루 계곡의 절벽 오트피에르를 1869년 무렵 그린 풍경입니다. 그는 팔레트 나이프로 물감을 두껍게 발라 바위의 질감을 만들었고, 초록 숲과 회백색 절벽이 화면을 위아래로 나눕니다. 이 계곡을 그는 평생 수십 번 그렸습니다.',
    'The cliff of Hautepierre in the Loue valley near Courbet\'s hometown of Ornans, painted around 1869. He laid the paint on thick with a palette knife to build the texture of rock, and green forest and pale grey cliff divide the canvas top from bottom. He painted this valley dozens of times in his life.',
    'クールベの故郷オルナン近くのルー渓谷の断崖オートピエールを1869年頃に描いた風景。彼はパレットナイフで絵の具を厚く塗って岩の質感を作り、緑の森と灰白色の断崖が画面を上下に分けます。この渓谷を彼は生涯に何十回も描きました。'] },
  'courbet-cliffs-sea-coast': { t: ['해안 절벽: 작은 해변, 해돋이', '海岸の断崖：小さな浜、日の出'], about: [
    '1865년 노르망디 트루빌 해안에서 쿠르베가 그린 새벽 바다입니다. 그는 그해 여름 바닷가에서 하늘과 물만 있는 그림을 수십 점 그려 "바다 풍경"이라는 장르를 열었고, 이 그림은 절벽을 곁들인 것입니다. 하늘의 옅은 분홍과 회색 파도가 넓어 상급 난이도입니다.',
    'Dawn on the coast at Trouville in Normandy, 1865. That summer Courbet painted dozens of pictures of nothing but sky and water, opening the genre of the pure seascape; this one adds a cliff. Pale pink sky and grey waves cover wide areas, so it counts as difficult.',
    '1865年、ノルマンディーのトルーヴィル海岸でクールベが描いた夜明けの海。彼はその夏、海辺で空と水だけの絵を数十点描いて「海景」というジャンルを開き、この絵は断崖を添えたものです。空の淡い桃色と灰色の波が広く、上級の難易度です。'] },
  'delacroix-combat-giaour-hassan': { t: ['자우르와 하산의 결투', 'ジャウールとハッサンの戦い'], about: [
    '바이런의 시 "자우르"에서 기독교도 자우르가 연인을 죽인 투르크인 하산과 말 위에서 맞붙는 장면을 들라크루아가 1826년에 그렸습니다. 뒤엉킨 말과 휘날리는 옷자락, 붉은 터번이 소용돌이를 이룹니다. 낭만주의 회화의 격정이 그대로 담긴 그림입니다.',
    'From Byron\'s poem The Giaour: the Christian Giaour fights the Turk Hassan, who killed his lover, on horseback, painted by Delacroix in 1826. Tangled horses, flying robes and a red turban form a whirlpool. The passion of Romantic painting is all here.',
    'バイロンの詩「ジャウール」から、キリスト教徒ジャウールが恋人を殺したトルコ人ハッサンと馬上で戦う場面を、ドラクロワが1826年に描きました。もつれ合う馬、翻る衣、赤いターバンが渦を作ります。ロマン主義絵画の激情がそのまま込められた絵です。'] },
  'delacroix-lion-hunt': { t: ['사자 사냥', 'ライオン狩り'], about: [
    '들라크루아가 1832년 모로코 여행의 기억과 루벤스의 사냥 그림을 합쳐 만년까지 되풀이해 그린 사자 사냥 중 1860년 판입니다. 말과 사자, 사람이 한 덩어리로 뒤엉켜 어디가 누구인지 구별하려면 확대해야 합니다. 붉은 천과 흰 말이 어두운 덩어리 속의 표지입니다.',
    'One of the lion hunts Delacroix painted repeatedly until his last years, fusing memories of his 1832 trip to Morocco with Rubens\'s hunting scenes; this version dates from 1860. Horses, lions and men knot into one mass, and you must zoom in to tell who is who. Red cloth and a white horse are the markers in the dark tangle.',
    'ドラクロワが1832年のモロッコ旅行の記憶とルーベンスの狩猟画を合わせ、晩年まで繰り返し描いたライオン狩りの1860年版。馬とライオンと人がひとつの塊にもつれ、誰がどれか見分けるには拡大が必要です。赤い布と白い馬が暗い塊の中の目印です。'] },
  'delacroix-arab-horseman-attacked': { t: ['사자에게 습격당한 아랍 기병', 'ライオンに襲われるアラブの騎兵'], about: [
    '1849년 무렵의 작은 그림으로, 바위산에서 사자가 말에 뛰어올라 기병을 덮치는 순간입니다. 들라크루아는 파리 식물원의 동물원에서 사자를 스케치하며 근육의 움직임을 익혔습니다. 붉은 옷과 사자의 황갈색이 바위의 회색을 뚫고 나옵니다.',
    'A small painting from around 1849: on a rocky hillside a lion leaps onto a horse and its rider. Delacroix studied the movement of lions\' muscles by sketching them at the menagerie of the Jardin des Plantes in Paris. The red robe and tawny lion break through the grey of the rocks.',
    '1849年頃の小さな絵で、岩山でライオンが馬に飛びかかり騎兵を襲う瞬間。ドラクロワはパリ植物園の動物園でライオンをスケッチし、筋肉の動きを学びました。赤い衣とライオンの黄褐色が岩の灰色を突き抜けて現れます。'] },
  'homer-herring-net': { t: ['청어 그물', 'ニシンの網'], about: [
    '1885년 호머가 매사추세츠 글로스터 앞바다에서 청어를 끌어 올리는 어부 둘을 그린 그림입니다. 작은 배가 파도에 기울고 은빛 물고기가 그물에서 쏟아지며, 뒤편 안개 속에 큰 배들이 희미합니다. 호머는 이 해 메인 주 해안으로 이사해 평생 바다와 어부를 그렸습니다.',
    'Two fishermen haul in herring off Gloucester, Massachusetts, in 1885. The small boat tilts on the swell, silver fish pour from the net, and larger vessels loom in the fog behind. That year Homer moved to the coast of Maine and painted the sea and its fishermen for the rest of his life.',
    '1885年、ホーマーがマサチューセッツ州グロスター沖でニシンを引き上げる二人の漁師を描いた絵。小舟が波に傾き、銀色の魚が網からこぼれ、後方の霧の中に大きな船がぼんやり見えます。ホーマーはこの年メイン州の海岸に移り、生涯海と漁師を描きました。'] },
  'homer-croquet-scene': { t: ['크로케 장면', 'クロッケーの場面'], about: [
    '1866년 남북전쟁 직후, 잔디밭에서 크로케를 하는 여인들과 신사를 그린 호머의 초기작입니다. 당시 크로케는 남녀가 함께 즐길 수 있던 드문 야외 놀이라 유행이었고, 호머는 이 주제로 다섯 점을 그렸습니다. 파란·빨간·흰 드레스가 초록 잔디 위에 또렷이 서 있습니다.',
    'Women and a gentleman playing croquet on a lawn in 1866, just after the Civil War, an early Homer. Croquet was the rage as one of the few outdoor games men and women could play together, and Homer painted five pictures of it. Blue, red and white dresses stand out sharply on the green.',
    '1866年、南北戦争直後に芝生でクロッケーをする女性たちと紳士を描いたホーマーの初期作。当時クロッケーは男女が一緒に楽しめる数少ない屋外の遊びとして流行し、ホーマーはこの主題で5点描きました。青・赤・白のドレスが緑の芝の上にくっきり立っています。'] },
};

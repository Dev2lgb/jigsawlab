// 그림 소개 6/7 — 고양이와 강아지. key → { t: [한국어 제목, 일본어 제목], about: [ko, en, ja] }
// 19세기 유럽에는 고양이만, 개만 그려 먹고산 화가들이 있었다. 그 사람들의 그림이 이 진열대의 뼈대다
import type { WorkText } from './worksText';
export const TEXT6: Record<string, WorkText> = {
  // ── 샤를 반 덴 에이컨 (1859~1923, 벨기에)
  'eycken-kitten-crate': { t: ['상자 위의 새끼 고양이', '木箱の子猫'], about: [
    '벨기에 화가 샤를 반 덴 에이컨은 평생 고양이가 있는 실내를 그렸습니다. 나무 상자 위에 올라선 노란 새끼 고양이가 무언가를 노려보고, 아래쪽 형제는 아직 관심이 없습니다. 털 한 올까지 살려 놓은 붓질과 청화 도자기의 파랑이 조각으로 나뉘면 그 대비가 더 또렷해집니다.',
    'The Belgian painter Charles van den Eycken spent his career on interiors with cats in them. A ginger kitten has climbed onto a wooden crate and fixed on something out of frame, while its sibling below has not yet taken an interest. The fur is painted hair by hair, and the blue of the porcelain sharpens against it once the picture is cut into pieces.',
    'ベルギーの画家シャルル・ヴァン・デン・エイケンは生涯、猫のいる室内を描き続けました。木箱によじ登った黄色い子猫が画面の外を見据え、下の兄弟はまだ関心がありません。毛の一本まで描き込んだ筆致と染付の青の対比が、ピースに分かれるといっそう際立ちます。'] },
  'eycken-playtime': { t: ['노는 시간', '遊びの時間'], about: [
    '바구니를 뒤집어 놓고 새끼 고양이 여럿이 붉은 천 위에서 뒤엉켜 놉니다. 에이컨은 이런 장면을 수백 점 그렸는데, 고양이를 예쁘게만 그리지 않고 관절이 꺾이는 방향과 몸무게가 실린 자리를 정확히 잡았습니다. 붉은 천·바구니·털 세 가지 질감이 나뉘어 있어 조각을 색으로 갈라 놓기 좋습니다.',
    'A basket has been tipped over and a tangle of kittens is playing across a red cloth. Van den Eycken painted hundreds of scenes like this, and he never merely prettified them — the joints bend the right way and the weight sits where it should. Three textures, cloth and wicker and fur, make the pieces easy to sort by colour.',
    'ひっくり返した籠のそばで、赤い布の上に子猫たちが折り重なって遊んでいます。ヴァン・デン・エイケンはこうした場面を何百点も描きましたが、可愛らしく整えるだけでなく、関節の曲がる向きも体重のかかる場所も正確です。赤い布・籠・毛皮という三つの質感が、色でピースを分けるのに向いています。'] },
  'eycken-dog-portrait': { t: ['개의 초상', '犬の肖像'], about: [
    '고양이 화가로 알려진 에이컨이 1910년에 그린 잉글리시 세터입니다. 사냥개 특유의 흰 바탕에 검은 반점이 뿌려진 털을 한 점 한 점 찍어 냈고, 뒤쪽 벽은 일부러 어둡고 단순하게 두어 개만 떠오르게 했습니다. 반점의 위치가 곧 조각을 맞추는 단서가 됩니다.',
    'An English setter, painted in 1910 by an artist better known for cats. The flecked coat is built up spot by spot, and the wall behind is kept deliberately dark and plain so that the dog alone comes forward. Where each fleck falls turns out to be the clue that places each piece.',
    '猫の画家として知られるエイケンが1910年に描いたイングリッシュ・セターです。白地に黒い斑が散る猟犬の毛並みを一点ずつ置いていき、背後の壁はあえて暗く単純にして犬だけを浮かび上がらせました。斑の位置がそのままピースを合わせる手がかりになります。'] },
  // ── 카를 라이헤르트 (1836~1918, 오스트리아)
  'reichert-four-graces': { t: ['네 미녀', '四人の美女'], about: [
    '그라츠 출신의 동물 화가 카를 라이헤르트가 새끼 고양이 넷에게 빨간 모자를 씌우고 「네 미녀」라는 제목을 붙였습니다. 고전 회화의 삼미신을 흉내 낸 농담이지만, 정작 고양이들의 표정은 하나같이 시큰둥합니다. 빨강·검정·흰색이 규칙적으로 반복돼 조각 수를 올려도 길을 잃지 않습니다.',
    'Carl Reichert, an animal painter from Graz, put red caps on four kittens and called the result The Four Graces. It is a joke at the expense of classical painting, though the cats themselves look thoroughly unimpressed. Red, black and white repeat at regular intervals, so the picture stays readable even at a high piece count.',
    'グラーツ出身の動物画家カール・ライヒェルトが、四匹の子猫に赤い帽子をかぶせて「四人の美女」と題しました。古典絵画の三美神をもじった冗談ですが、当の猫たちの表情はどこまでも冷めています。赤・黒・白が規則的に繰り返されるため、ピース数を上げても迷いません。'] },
  'reichert-kittens-frog': { t: ['새끼 고양이 셋과 개구리', '三匹の子猫とカエル'], about: [
    '접시 앞에 모인 새끼 고양이 세 마리와, 그 앞에 나타난 개구리 한 마리. 1885년 작으로, 라이헤르트가 즐겨 그린 "짧은 이야기가 있는 동물 그림"의 전형입니다. 셋의 시선이 모두 한 점으로 모여 있어서, 조각을 맞추다 보면 개구리 자리가 자연스럽게 마지막에 남습니다.',
    'Three kittens gathered at a dish, and a frog that has turned up in front of them. Painted in 1885, it is a good example of the small-story animal picture Reichert liked to make. All three gazes converge on one spot, so the frog tends to be the last piece you place.',
    '皿の前に集まった三匹の子猫と、その前に現れた一匹のカエル。1885年の作で、ライヒェルトが好んだ「短い物語のある動物画」の典型です。三匹の視線が一点に集まっているため、組んでいくとカエルの場所が自然に最後に残ります。'] },
  // ── 그 밖의 고양이 화가들
  'graebhein-cat-portrait': { t: ['고양이의 초상', '猫の肖像'], about: [
    '1900년에 그려진 줄무늬 고양이의 정면 초상입니다. 사람 초상화의 구도를 그대로 가져와 배경을 비우고 고양이만 앉혀 놓았고, 눈동자의 세로 동공과 수염 뿌리까지 또렷합니다. 배경이 단순해 어려운 축에 들지만, 그만큼 털 방향만으로 맞춰 가는 재미가 있습니다.',
    'A tabby seen head-on, painted in 1900. The format is borrowed straight from human portraiture — an empty ground with the sitter placed in the middle — down to the vertical pupils and the roots of the whiskers. The plain background makes it one of the harder pictures here, and also one where the direction of the fur is the whole game.',
    '1900年に描かれた縞猫の正面肖像です。人物肖像画の構図をそのまま借りて背景を空け、猫だけを座らせており、縦に細まる瞳孔もひげの根元まで鮮明です。背景が単純なので難しい部類に入りますが、その分、毛の流れだけで組んでいく面白さがあります。'] },
  'merlin-kittens-daffodils': { t: ['수선화 앞의 새끼 고양이 둘', '水仙の前の二匹の子猫'], about: [
    '프랑스 동물 화가 다니엘 메를랭이 초록 화병에 꽂은 노란 수선화 아래 새끼 고양이 두 마리를 앉혔습니다. 위쪽은 수선화의 노랑, 아래쪽은 얼룩 고양이의 갈색으로 화면이 반듯하게 나뉩니다. 색이 위아래로 갈려 있어 트레이에서 더미를 나누기 가장 쉬운 그림 중 하나입니다.',
    'The French animal painter Daniel Merlin set two kittens beneath a green vase of yellow daffodils. The picture splits cleanly in two: daffodil yellow above, tabby brown below. Because the colour divides top from bottom, it is one of the easiest pictures here to sort into piles in the tray.',
    'フランスの動物画家ダニエル・メルランが、緑の花瓶に生けた黄色い水仙の下に二匹の子猫を座らせました。画面は上が水仙の黄、下が縞猫の茶と、きれいに二つに分かれます。色が上下で割れているため、トレイで山に分けるのが最もやさしい絵の一つです。'] },
  'maes-two-cats': { t: ['사냥감을 앞에 둔 두 고양이', '獲物を前にした二匹の猫'], about: [
    '벨기에 화가 외젠 레미 마스가 그린, 잡아 온 것을 사이에 둔 고양이 두 마리입니다. 한쪽은 몸을 낮춰 지키고 다른 한쪽은 다가서는 순간이 잡혀 있어, 귀여운 고양이 그림이 아니라 짐승 그림에 가깝습니다. 어두운 바닥과 흰 털의 대비가 강해 윤곽이 잘 잡힙니다.',
    'Two cats by the Belgian painter Eugène Rémy Maes, with something they have caught between them. One crouches to guard it while the other moves in — this is an animal picture rather than a cute one. The strong contrast between the dark floor and the white fur keeps the outlines clear.',
    'ベルギーの画家ウジェーヌ・レミ・マースが描いた、獲物を挟んだ二匹の猫です。一方は身を低くして守り、もう一方が近づく瞬間が捉えられており、愛らしい猫の絵というより獣の絵に近いものです。暗い床と白い毛の対比が強く、輪郭がつかみやすい絵です。'] },
  'mind-cat-kittens': { t: ['어미 고양이와 새끼들', '母猫と子猫たち'], about: [
    '고트프리트 민트는 스위스 베른에서 살며 고양이만 그려 「고양이의 라파엘로」라고 불린 화가입니다. 말수가 적고 평생 고양이를 무릎에 올린 채 작업했다고 전해지며, 그래서인지 고양이가 몸을 뻗는 방식이 유난히 정확합니다. 종이 바탕을 그대로 살린 담담한 수채라 조각이 붙는 자리가 부드럽게 이어집니다.',
    'Gottfried Mind lived in Bern and painted almost nothing but cats, which earned him the nickname "the Raphael of Cats". He spoke little and is said to have worked all his life with a cat on his lap, which may be why the way his cats stretch is so exactly right. The watercolour leaves the paper showing through, so the joins between pieces stay soft.',
    'ゴットフリート・ミントはスイスのベルンに暮らし、猫ばかりを描いて「猫のラファエロ」と呼ばれた画家です。口数が少なく、生涯、膝に猫を乗せたまま仕事をしたと伝えられ、そのためか猫が体を伸ばす形が際立って正確です。紙の地を生かした淡い水彩なので、ピースのつながりも柔らかです。'] },
  'brunel-whats-that': { t: ['저건 뭐지?', 'あれは何だろう'], about: [
    '파란 접시에 담긴 우유를 앞에 두고 새끼 고양이들이 동시에 고개를 든 순간입니다. 알프레드 아르튀르 브뤼넬 드 뇌빌은 고양이와 정물을 함께 놓는 구성으로 살롱에서 인기를 얻었습니다. 파란 접시 하나가 화면에서 유일하게 차가운 색이라, 그 조각들만 먼저 골라내기 좋습니다.',
    'A saucer of milk, and the moment every kitten looks up at once. Alfred-Arthur Brunel de Neuville built a Salon career on compositions that put cats and still life in the same frame. The blue saucer is the only cool colour in the picture, which makes those pieces the natural ones to pull out first.',
    '青い皿に注がれたミルクを前に、子猫たちが一斉に顔を上げた瞬間です。アルフレッド・アルチュール・ブリュネル・ド・ヌーヴィルは、猫と静物を同じ画面に置く構成でサロンの人気を得ました。青い皿が画面で唯一の寒色なので、そのピースだけ先に拾い出すのに向いています。'] },
  // ── 앙리에트 로너크니프 (1821~1909)
  'ronner-mothers-pride': { t: ['어미의 자랑', '母の誇り'], about: [
    '앙리에트 로너크니프는 19세기 유럽에서 고양이 그림으로 가장 유명했던 화가입니다. 네덜란드에서 태어나 벨기에에서 활동했고, 화실에 유리를 끼운 고양이 방을 따로 두고 하루 종일 관찰하며 그렸습니다. 벨벳·나무·털의 광택이 저마다 달라서, 같은 갈색이어도 조각의 결이 다릅니다.',
    'Henriëtte Ronner-Knip was the best-known painter of cats in nineteenth-century Europe. Born in the Netherlands and working in Belgium, she kept a glass-fronted cat room in her studio and drew from it all day. Velvet, wood and fur each catch the light differently, so two pieces of the same brown still do not feel alike.',
    'アンリエット・ロナー＝クニップは、19世紀ヨーロッパで猫の絵といえばこの人という画家でした。オランダに生まれベルギーで活動し、アトリエにガラス張りの猫部屋を設けて一日中観察しながら描きました。ビロード・木・毛皮の艶がそれぞれ違うので、同じ茶色でもピースの質感が異なります。'] },
  'ronner-cat-three-kittens': { t: ['새끼 셋을 둔 고양이', '三匹の子を連れた猫'], about: [
    '붉은 천을 깐 바구니 위에 어미 고양이가 자리를 잡고, 새끼 셋이 그 주위에 흩어져 있습니다. 로너크니프는 고양이의 자세를 스케치로 수백 장 모아 두었다가 화면에 배치했는데, 그래서 이런 그림도 실제로는 정교하게 짜인 구성입니다. 붉은 천이 화면을 가로질러 조각을 나누는 기준선이 되어 줍니다.',
    'The mother has settled on a basket spread with red cloth while three kittens are scattered around her. Ronner-Knip collected hundreds of sketches of feline postures and then arranged them, so a picture as casual as this is in fact carefully composed. The red cloth runs across the picture and gives you a line to sort pieces against.',
    '赤い布を敷いた籠の上に母猫が陣取り、三匹の子猫がその周りに散らばっています。ロナー＝クニップは猫の姿勢のスケッチを何百枚も溜めてから画面に配置したので、この何気ない絵も実は綿密な構成です。赤い布が画面を横切り、ピースを分ける基準線になってくれます。'] },
  // ── 율리우스 아담 (1852~1913, 뮌헨) — 「고양이 아담」
  'adam-cat-kittens': { t: ['새끼들과 어미 고양이', '子猫たちと母猫'], about: [
    '뮌헨의 율리우스 아담은 고양이를 하도 많이 그려 「고양이 아담(Katzen-Adam)」이라 불렸습니다. 원래 집안이 도자기 그림과 사진을 하던 내력이 있어서, 관찰한 것을 그대로 옮기는 데 익숙했습니다. 풀밭의 초록과 노란 털이 부드럽게 섞여 있어 어렵지 않게 맞춰집니다.',
    'Julius Adam of Munich painted so many cats that he was known simply as "Cat Adam". His family had worked in porcelain painting and photography, and he was used to transcribing exactly what he saw. Green grass and ginger fur blend gently into each other, which keeps this one on the easier side.',
    'ミュンヘンのユリウス・アダムは猫を描きすぎて「猫のアダム」と呼ばれました。生家が磁器絵付けや写真を手がけていた家系で、見たものをそのまま写すことに慣れていました。草地の緑と黄色い毛が柔らかく混ざり合い、無理なく組めます。'] },
  'adam-cat-two-kittens': { t: ['새끼 둘을 둔 어미 고양이', '二匹の子を連れた母猫'], about: [
    '짚이 깔린 헛간 한쪽에서 어미가 새끼 둘과 함께 몸을 웅크리고 있습니다. 아담은 이런 헛간 구석을 즐겨 그렸는데, 짚 한 올 한 올이 방향을 달리하며 빛을 받는 모습이 그림의 절반을 차지합니다. 짚의 결을 따라가면 조각이 의외로 쉽게 이어집니다.',
    'In a corner of a straw-strewn barn, a mother has curled up with two kittens. Adam liked these barn corners, and half the picture is really about straw — every stalk turned a different way and catching the light differently. Follow the grain of the straw and the pieces join more easily than you would expect.',
    '藁の敷かれた納屋の片隅で、母猫が二匹の子と身を寄せています。アダムはこうした納屋の隅を好んで描き、藁の一本一本が向きを変えて光を受ける様子が絵の半分を占めます。藁の流れをたどると、意外なほど楽にピースがつながります。'] },
  'adam-kittens-music': { t: ['악보 위의 새끼 고양이 셋', '楽譜の上の三匹の子猫'], about: [
    '펼쳐 놓은 악보 위에 새끼 고양이 세 마리가 올라앉았습니다. 흰 종이에 찍힌 검은 음표가 화면 아래쪽을 규칙적인 무늬로 채우고, 그 위에 불규칙한 털 뭉치가 얹힌 대비가 이 그림의 전부입니다. 음표 부분은 무늬가 반복돼 난도가 높으니 고양이부터 맞추는 편이 낫습니다.',
    'Three kittens have settled on an open sheet of music. The whole picture is a contrast: black notes making a regular pattern across the lower half, and an irregular heap of fur laid on top of it. The music is repetitive and therefore hard, so it pays to build the kittens first.',
    '開かれた楽譜の上に三匹の子猫が乗っています。白い紙に並ぶ黒い音符が画面下半分を規則的な模様で埋め、その上に不規則な毛の塊が載る——この対比がこの絵のすべてです。音符の部分は模様が反復して難しいので、先に子猫から組むのが得策です。'] },
  'adam-three-kittens': { t: ['새끼 고양이 셋', '三匹の子猫'], about: [
    '카펫 위에 나란히 앉은 새끼 고양이 세 마리가 정면을 바라봅니다. 한 마리는 목에 붉은 리본을 맸고, 세 마리의 털색이 모두 달라 자연스럽게 시선이 좌우로 오갑니다. 카펫 무늬가 배경 전체에 깔려 있어 가장자리 조각을 먼저 찾는 편이 빠릅니다.',
    'Three kittens sit in a row on a carpet, facing out. One wears a red ribbon, and since no two of them are the same colour the eye keeps travelling left and right. The carpet pattern covers the whole background, so it is quicker to find the edge pieces first.',
    '絨毯の上に並んで座った三匹の子猫が正面を見ています。一匹は首に赤いリボンを結び、三匹とも毛色が違うので視線が自然に左右へ動きます。絨毯の模様が背景全体に広がっているため、先に縁のピースを探すのが早道です。'] },
  'adam-four-kittens': { t: ['새끼 고양이 넷', '四匹の子猫'], about: [
    '노란 그릇을 가운데 두고 새끼 고양이 넷이 저마다 다른 곳을 봅니다. 넷의 자세가 하나도 겹치지 않아, 아담이 실제로 곁에 두고 관찰하며 그렸다는 것이 그대로 보입니다. 그릇의 노랑이 화면에서 가장 밝은 점이라 거기서부터 퍼져 나가듯 맞추면 편합니다.',
    'Four kittens around a yellow bowl, each looking somewhere else. No two poses repeat, which is the clearest sign that Adam worked from life with the animals in front of him. The bowl is the brightest note in the picture, and building outward from it is the comfortable way in.',
    '黄色い器を囲んで四匹の子猫がそれぞれ別の方を見ています。四匹の姿勢が一つも重ならず、アダムが実際にそばに置いて観察しながら描いたことがそのまま見て取れます。器の黄色が画面で最も明るい点なので、そこから外へ広げるように組むと楽です。'] },
  'adam-kittens-basket': { t: ['바구니 속 새끼 고양이 둘', '籠の中の二匹の子猫'], about: [
    '파란 천을 깐 바구니 안에 새끼 고양이 두 마리가 담겨 있고, 한 마리는 목에 파란 리본을 맸습니다. 파랑과 흰 털, 갈색 바구니 세 색이 또렷하게 나뉘어 색으로 더미를 갈라 놓기 좋습니다. 아담의 그림 중에서도 색 대비가 가장 선명한 편입니다.',
    'Two kittens in a basket lined with blue cloth, one of them wearing a blue ribbon. Blue, white fur and brown wicker separate cleanly, which makes this an easy one to sort by colour. Even among Adam’s pictures the contrast here is unusually crisp.',
    '青い布を敷いた籠に二匹の子猫が収まり、一匹は首に青いリボンを結んでいます。青と白い毛、茶色の籠という三色がはっきり分かれ、色で山を分けるのに向いています。アダムの作品の中でも対比がとりわけ鮮明な一枚です。'] },
  'adam-kittens-crayfish': { t: ['새끼 고양이와 가재', '子猫とザリガニ'], about: [
    '바구니에서 쏟아진 가재를 앞에 두고 새끼 고양이들이 어쩔 줄 몰라 합니다. 앞발을 들었다가 물러서는 자세가 실제 고양이가 낯선 것을 만났을 때 그대로라, 웃음이 나는 장면입니다. 붉은 가재가 화면 아래에 흩어져 있어 그 조각들이 좋은 기준점이 됩니다.',
    'Crayfish have spilled out of a basket and the kittens have no idea what to do about them. A paw goes up, then back — exactly what a real cat does when it meets something unfamiliar, and it is funny for that reason. The red crayfish scattered along the bottom make useful landmarks.',
    '籠からこぼれたザリガニを前に、子猫たちが困り果てています。前足を上げては引っ込める姿勢が、実際の猫が見慣れないものに出会ったときそのままで、思わず笑ってしまう場面です。赤いザリガニが画面下部に散らばり、よい目印になります。'] },
  'adam-playing-kittens': { t: ['노는 새끼 고양이들', '遊ぶ子猫たち'], about: [
    '흰 천 위에서 새끼 고양이들이 서로 뒤엉켜 구르는 장면입니다. 아담은 뮌헨의 자기 화실에 늘 고양이를 여러 마리 두고 길렀고, 이런 순간을 잡아내려고 빠른 스케치를 수없이 남겼습니다. 흰 천이 넓게 깔려 있어 흰 조각을 어디에 놓을지가 이 그림의 관건입니다.',
    'Kittens tumbling over one another on a white cloth. Adam always kept several cats in his Munich studio and made countless quick sketches to catch moments like this one. The white cloth spreads wide across the picture, so deciding where the white pieces go is the whole challenge.',
    '白い布の上で子猫たちがもつれ合って転がる場面です。アダムはミュンヘンの自分のアトリエに常に何匹も猫を飼い、こうした瞬間を捉えるために速写を数えきれないほど残しました。白い布が広く敷かれているので、白いピースをどこに置くかがこの絵の勝負どころです。'] },
  // ── 그 밖
  'valter-two-cats': { t: ['두 고양이', '二匹の猫'], about: [
    '연보라색 바탕 앞에 긴 털 고양이 두 마리가 얼굴을 맞대고 있습니다. 20세기 초 영국에서 크리스마스 카드와 엽서 그림으로 널리 쓰인 종류의 그림으로, 그래서 색이 유난히 곱고 부드럽습니다. 부드러운 색조라 조각 경계가 잘 안 보이는 편이니 조각 수를 낮춰 시작하는 편이 좋습니다.',
    'Two long-haired cats face each other against a pale violet ground. This is the kind of picture that filled British Christmas cards and postcards in the early twentieth century, which is why the colour is so soft and sweet. Those gentle tones hide the joins, so it is worth starting at a lower piece count.',
    '淡い藤色の地を背に、長毛の猫が二匹、顔を寄せ合っています。20世紀初頭のイギリスでクリスマスカードや絵葉書に広く使われた類の絵で、そのため色がとりわけ優しく柔らかです。淡い色調は継ぎ目が見えにくいので、ピース数を落として始めるのがおすすめです。'] },
  'vastagh-cat-mother': { t: ['어미 고양이', '母猫'], about: [
    '헝가리 동물 화가 게자 버스터그가 1894년에 그린 그림입니다. 부다페스트 동물원을 드나들며 맹수를 그리던 사람이라, 집고양이를 그려도 근육이 붙은 자리와 무게 중심이 분명합니다. 어두운 배경 속에서 흰 가슴털만 밝게 떠올라 그 부분이 좋은 출발점이 됩니다.',
    'Painted in 1894 by the Hungarian animal painter Géza Vastagh. He spent his time at the Budapest zoo painting big cats, and it shows even in a house cat: you can see where the muscle sits and where the weight falls. Only the white chest fur lifts out of the dark ground, and that makes a good place to start.',
    'ハンガリーの動物画家ゲーザ・ヴァシュタグが1894年に描いた作品です。ブダペスト動物園に通って猛獣を描いていた人だけに、家猫を描いても筋肉のつき方と重心がはっきりしています。暗い背景の中で白い胸毛だけが明るく浮かび、そこがよい出発点になります。'] },
  'zuber-children-kittens': { t: ['새끼 고양이를 든 아이들', '子猫を抱く子どもたち'], about: [
    '스위스 화가 프리츠 추버뷜러가 그린, 새끼 고양이를 손에 든 아이 둘입니다. 19세기 살롱 회화가 좋아하던 소재이지만, 아이의 손가락이 고양이를 감싸 쥔 각도가 어색하지 않은 것이 이 그림의 힘입니다. 살결·옷감·털이 모두 다른 밝기라 조각을 층으로 나눠 맞추면 수월합니다.',
    'Two children holding a kitten, by the Swiss painter Fritz Zuber-Bühler. The subject was a Salon favourite in the nineteenth century, but the strength of this one is that the angle of the child’s fingers around the animal is not the least bit false. Skin, cloth and fur all sit at different brightnesses, so sorting the pieces into layers works well.',
    'スイスの画家フリッツ・ツーバー＝ビューラーが描いた、子猫を手にした二人の子どもです。19世紀のサロン絵画が好んだ画題ですが、この絵の強みは子どもの指が猫を包む角度に少しも嘘がないところです。肌・布・毛皮がすべて異なる明るさなので、層に分けて組むと楽です。'] },
  // ── 루이 웨인 (1860~1939)
  'wain-gothic-cat': { t: ['고딕풍 고양이', 'ゴシック風の猫'], about: [
    '루이 웨인은 평생 고양이만 그린 영국 화가입니다. 아내가 병으로 세상을 떠난 뒤 기르던 고양이를 그리기 시작해, 19세기 말 영국에서 고양이를 애완동물로 자리 잡게 한 사람으로 꼽힙니다. 만년에 그린 이 그림은 고양이 형태를 스테인드글라스처럼 잘게 쪼개 놓아, 직소 조각과 그림 속 무늬가 겹쳐 보이는 묘한 재미가 있습니다.',
    'Louis Wain was an English artist who drew nothing but cats. He began after his wife’s death, drawing the cat they had kept, and he is often credited with making the cat a household pet in late-Victorian Britain. This late work breaks the animal down into shapes like stained glass, so the jigsaw cuts and the pattern in the picture keep overlapping in a way that is oddly satisfying.',
    'ルイス・ウェインは生涯、猫だけを描いたイギリスの画家です。妻を病で亡くしたあと、飼っていた猫を描き始め、19世紀末のイギリスで猫を愛玩動物として定着させた人物とされます。晩年のこの絵は猫の形をステンドグラスのように細かく割っており、ジグソーの切れ目と絵の中の模様が重なって見える不思議な面白さがあります。'] },
  'wain-pattern-cat': { t: ['뒷발로 선 고양이', '後ろ足で立つ猫'], about: [
    '고양이의 윤곽이 거의 사라지고 대칭 무늬만 남은 그림입니다. 웨인의 이런 후기 작품을 두고 오래도록 정신질환의 진행 과정으로 설명해 왔지만, 지금은 제작 순서조차 분명치 않아 그 해석에 회의적인 연구가 많습니다. 확실한 것은 무늬가 좌우로 대칭이라는 점이고, 그래서 조각 맞추기로는 상당히 까다롭습니다.',
    'The outline of the cat has all but dissolved, leaving a symmetrical pattern. Pictures like this were long presented as a record of Wain’s mental illness progressing, but the order in which they were made is not actually established and many researchers now doubt that reading. What is certain is that the pattern is symmetrical left to right, which makes it a genuinely difficult puzzle.',
    '猫の輪郭がほとんど消え、左右対称の模様だけが残った絵です。ウェインのこうした後期作品は長く精神疾患の進行の記録として語られてきましたが、制作順序すら定かでなく、今ではその解釈に懐疑的な研究が多くあります。確かなのは模様が左右対称だということで、そのぶんパズルとしてはかなり手強い一枚です。'] },
  'wain-three-singing': { t: ['노래하는 고양이 셋', '歌う三匹の猫'], about: [
    '주황과 파랑의 고양이 세 마리가 입을 벌리고 노래합니다. 웨인은 고양이를 사람처럼 세워 놓고 옷을 입히고 표정을 붙이는 그림으로 영국 전역에서 사랑받았고, 그의 고양이 그림이 실린 연감은 매년 팔려 나갔습니다. 보색인 주황과 파랑이 나란히 놓여 있어 색으로 조각을 가르기 아주 좋습니다.',
    'Three cats, orange and blue, singing with their mouths open. Wain made his name across Britain by standing cats upright, dressing them and giving them faces, and the annuals full of his drawings sold every year. Orange and blue are complementary colours placed side by side, which makes sorting the pieces by colour unusually easy.',
    'オレンジと青の猫が三匹、口を開けて歌っています。ウェインは猫を人のように立たせ、服を着せ、表情を与える絵でイギリス中に愛され、彼の猫の絵を収めた年鑑は毎年売れ続けました。補色であるオレンジと青が隣り合っているので、色でピースを分けるのがとても楽です。'] },
  'wain-song-and-dance': { t: ['노래하고 춤추는 고양이 셋', '歌い踊る三匹の猫'], about: [
    '실크해트를 쓰고 연미복을 갖춰 입은 고양이 셋이 무대에서 춤을 춥니다. 웨인이 그린 고양이는 늘 이렇게 사람의 세계를 흉내 내는데, 정작 얼굴만은 고양이 그대로여서 우스꽝스러움이 살아납니다. 빨강·흰색·초록 의상이 뚜렷이 갈려 세 인물을 따로따로 맞춰 갈 수 있습니다.',
    'Three cats in top hats and tails, dancing on a stage. Wain’s cats are forever imitating the human world, and the joke works because the faces stay resolutely feline. The red, white and green costumes separate cleanly, so you can build the three figures one at a time.',
    'シルクハットに燕尾服をまとった三匹の猫が舞台で踊っています。ウェインの猫はいつもこうして人間の世界を真似ますが、顔だけは猫のままなので可笑しさが生きます。赤・白・緑の衣装がはっきり分かれ、三人の人物を別々に組んでいけます。'] },
  'wain-cats-at-play': { t: ['연극을 보는 고양이들', '芝居を見る猫たち'], about: [
    '1906년 작으로, 극장 객석에 앉은 고양이 무리가 무대를 바라봅니다. 저마다 표정이 다르고 몇몇은 아예 딴 데를 보고 있어서, 사람 관객을 그대로 옮겨 놓은 풍자화이기도 합니다. 얼굴이 여러 개 반복되니 표정 차이를 단서로 삼아 맞추면 됩니다.',
    'From 1906: a row of cats in a theatre audience, watching the stage. Every face is different and a few are frankly looking elsewhere, which makes it a satire on human audiences as much as anything. Since so many faces repeat, the differences between their expressions are what you sort by.',
    '1906年の作で、劇場の客席に並んだ猫たちが舞台を見ています。表情はそれぞれ違い、何匹かは明らかに別の方を見ていて、人間の観客をそのまま写した風刺画でもあります。顔がいくつも繰り返されるので、表情の違いを手がかりに組んでいきます。'] },
  'wain-psychedelic-cat': { t: ['빛나는 고양이', '光る猫'], about: [
    '고양이 얼굴에서 붉고 노란 빛이 사방으로 뻗어 나갑니다. 웨인은 말년에 정신병원에서 지냈고 그곳에서도 계속 고양이를 그렸는데, 이 그림처럼 강렬한 색이 그때 나왔습니다. 방사형 무늬가 화면 전체를 채우고 있어 조각마다 색이 조금씩 달라, 색만 따라가도 자리를 찾을 수 있습니다.',
    'Red and yellow light radiates outward from a cat’s face. Wain spent his last years in psychiatric hospitals and went on drawing cats there, and the fiercely coloured pictures come from that period. The radiating pattern fills the whole picture and shifts colour slightly at every point, so following the colour alone will place a piece.',
    '猫の顔から赤と黄の光が四方へ伸びていきます。ウェインは晩年を精神科病院で過ごし、そこでも猫を描き続けました。この絵のような強烈な色はその時期のものです。放射状の模様が画面全体を埋め、場所ごとに少しずつ色が変わるので、色を追うだけで居場所が見つかります。'] },
  'wain-kaleidoscope-cat': { t: ['만화경 고양이 II', '万華鏡の猫 II'], about: [
    '초록 잎사귀 배경 위로 주황색 고양이 얼굴이 크게 떠오릅니다. 눈이 유난히 크고 동공이 검게 뚫려 있어, 웨인의 고양이 특유의 정면 응시가 가장 강하게 드러난 그림입니다. 배경 잎사귀는 무늬가 반복되니 얼굴부터 맞추고 바깥으로 넓혀 가는 편이 좋습니다.',
    'A large orange cat’s face rises against a ground of green leaves. The eyes are enormous and the pupils are punched out black, so this is Wain’s head-on feline stare at its most intense. The leaves behind repeat, so build the face first and work outward.',
    '緑の葉を背景に、オレンジ色の猫の顔が大きく浮かび上がります。目がとりわけ大きく瞳孔が黒く抜かれており、ウェインの猫に特徴的な正面からの凝視が最も強く出た一枚です。背景の葉は模様が繰り返すので、顔から組んで外へ広げるのがよいでしょう。'] },
  // ── 일본·류큐
  'soki-divine-cat': { t: ['신묘한 고양이', '神猫図'], about: [
    '18세기 초 류큐 왕국의 화가 야마구치 소키가 그린 흰 고양이입니다. 류큐는 중국과 일본 사이에서 독자적인 회화를 키웠고, 소키는 청에 유학해 배운 화법을 오키나와로 가져온 인물입니다. 여백이 넓은 동양화라 흰 조각이 많아 보이지만, 꼬리와 먹선의 방향이 확실한 단서가 됩니다.',
    'A white cat painted in the early eighteenth century by Yamaguchi Soki of the Ryukyu Kingdom. Ryukyu developed its own painting between China and Japan, and Soki studied in Qing China and brought what he learned back to Okinawa. The wide empty ground means a lot of pale pieces, but the tail and the direction of the ink strokes are reliable clues.',
    '18世紀初頭、琉球王国の画家・山口宗季が描いた白猫です。琉球は中国と日本のあいだで独自の絵画を育て、宗季は清に学び、その画法を沖縄に持ち帰った人物でした。余白の広い東洋画なので白いピースが多く見えますが、尾と墨線の向きが確かな手がかりになります。'] },
  'kuniyoshi-cats-catfish': { t: ['고양이로 쓴 「메기」', '猫で書いた「なまづ」'], about: [
    '우타가와 구니요시는 고양이를 몹시 좋아해 품에 안고 그림을 그렸다고 전해집니다. 이 판화는 고양이들의 몸을 구부려 「나마즈(메기)」라는 글자를 만든 것으로, 문자와 그림이 하나가 되는 에도 시대 유희의 대표작입니다. 흰 바탕에 검은 얼룩 고양이가 놓여 대비가 커서 조각을 찾기 쉽습니다.',
    'Utagawa Kuniyoshi loved cats and is said to have drawn with one in his arms. Here the cats are bent into the shape of the characters for namazu, catfish — a fine example of the Edo game of making writing and picture the same thing. Black-patched cats on a pale ground give strong contrast, which makes the pieces easy to find.',
    '歌川国芳は大の猫好きで、猫を懐に抱えて絵を描いたと伝えられます。この版画は猫の体を曲げて「なまづ」の字を作ったもので、文字と絵が一つになる江戸の遊びの代表作です。白地に黒斑の猫が置かれて対比が強く、ピースを見つけやすい一枚です。'] },
  'kuniyoshi-cat-octopus': { t: ['문어의 머리를 두드리는 고양이', '蛸の頭を叩く猫'], about: [
    '기모노를 차려입은 고양이가 문어의 머리를 톡톡 두드리고 있습니다. 구니요시가 그린 고양이 의인화 판화 가운데서도 특히 화려한 것으로, 기모노의 무늬 하나하나를 다른 목판으로 찍어 냈습니다. 무늬가 촘촘해 난도가 있지만, 문어의 붉은색이 좋은 기준점이 됩니다.',
    'A cat in a kimono taps an octopus on the head. Among Kuniyoshi’s anthropomorphic cat prints this is one of the most lavish, with each pattern in the robe printed from its own block. The dense patterning makes it demanding, though the red of the octopus gives you a fixed point to work from.',
    '着物をまとった猫が蛸の頭をとんとんと叩いています。国芳の擬人化された猫の版画のなかでもとりわけ華やかな一枚で、着物の文様は一つずつ別の版木で摺られています。文様が密で難度はありますが、蛸の赤がよい基準点になります。'] },
  // ── 찰스 버턴 바버 (1845~1894) — 빅토리아 여왕의 개를 그린 화가
  'barber-nanny-spot': { t: ['내니와 스팟', 'ナニーとスポット'], about: [
    '찰스 버턴 바버는 빅토리아 여왕의 개들을 그리는 화가로 왕실에 고용됐던 사람입니다. 이 그림의 두 마리도 실제 왕실에서 기르던 개이고, 제목의 「내니」와 「스팟」이 그 이름입니다. 흰 털이 화면의 절반을 차지해 명암 차이가 미묘하니, 배경 바위부터 잡아 두면 수월합니다.',
    'Charles Burton Barber was employed by the royal household to paint Queen Victoria’s dogs. These two were real royal animals, and Nanny and Spot in the title are their names. White fur fills half the picture and its shading is subtle, so it helps to fix the rock behind them first.',
    'チャールズ・バートン・バーバーは、ヴィクトリア女王の犬を描く画家として王室に雇われていた人物です。この絵の二匹も実際に王室で飼われていた犬で、題の「ナニー」と「スポット」がその名前です。白い毛が画面の半分を占めて陰影が微妙なので、背後の岩から固めると楽になります。'] },
  'barber-snowball-marco': { t: ['스노볼, 마르코, 제이니', 'スノーボール、マルコ、ジェイニー'], about: [
    '흰 개 한 마리와 작은 스피츠 두 마리가 풀밭에 서 있습니다. 1879년 작으로, 바버는 개를 그릴 때 사람 초상화처럼 이름을 제목에 붙이는 관례를 지켰습니다. 흰색·주황색·초록 배경으로 색이 셋으로 갈려 트레이에서 나누기 편합니다.',
    'A white dog and two small spitzes standing on grass. Painted in 1879; Barber kept to the convention of titling a dog picture with the animals’ names, exactly as one would a portrait of people. White, orange and the green ground divide the picture into three colours, which is convenient in the tray.',
    '白い犬一匹と小さなスピッツ二匹が草地に立っています。1879年の作で、バーバーは犬を描くときも人物肖像と同じく題に名前を添える習慣を守りました。白・オレンジ・緑の背景と色が三つに分かれ、トレイで分けやすい絵です。'] },
  'barber-family-of-pugs': { t: ['퍼그 가족', 'パグの一家'], about: [
    '퍼그 여러 마리가 한 덩어리로 모여 있는 1877년 그림입니다. 빅토리아 시대 영국에서 퍼그는 상류층의 개였고, 바버는 그 유행의 한복판에서 이런 그림을 주문받았습니다. 비슷한 색의 몸이 여러 개 겹쳐 있어 얼굴 방향을 하나씩 확인해 가며 맞추는 그림입니다.',
    'A heap of pugs, painted in 1877. In Victorian Britain the pug was an upper-class dog, and Barber took commissions like this one at the height of the fashion. Several bodies of nearly the same colour overlap, so this is a picture you assemble by checking which way each face is turned.',
    'パグが幾匹も一かたまりになった1877年の絵です。ヴィクトリア朝のイギリスでパグは上流階級の犬であり、バーバーはその流行の只中でこうした注文を受けました。似た色の体がいくつも重なるため、顔の向きを一つずつ確かめながら組んでいく絵です。'] },
  'barber-darnley': { t: ['단리', 'ダーンリー'], about: [
    '스코틀랜드 풍경을 배경으로 콜리 한 마리가 서 있습니다. 1891년 작이며 「단리」는 이 개의 이름입니다. 개의 긴 털과 뒤편 산의 결이 모두 세로로 흐르고 있어, 결의 방향을 따라가면 조각이 이어집니다.',
    'A collie standing against a Scottish landscape, painted in 1891; Darnley is the dog’s name. The long coat and the hillside behind both run vertically, so following the direction of the grain will carry you from piece to piece.',
    'スコットランドの風景を背に、コリーが一匹立っています。1891年の作で、「ダーンリー」はこの犬の名前です。長い毛と背後の山の質感がともに縦に流れており、その流れをたどればピースがつながります。'] },
  'barber-girl-sheltie': { t: ['소녀와 셸티', '少女とシェルティー'], about: [
    '의자에 올라선 소녀가 셸티에게 무언가를 들어 보이고, 개는 앞발을 들고 매달립니다. 바버는 아이와 개를 한 화면에 놓는 그림으로 가장 유명했고, 그 인기 덕에 판화로 수없이 복제됐습니다. 소녀의 파란 원피스가 화면 가운데를 가르며 강한 색 기준이 되어 줍니다.',
    'A girl has climbed onto a chair to hold something up, and the sheltie is on its hind legs reaching for it. Barber was best known for putting a child and a dog in the same frame, and pictures like this were reproduced endlessly as prints. The girl’s blue dress cuts through the middle and gives you a strong colour anchor.',
    '椅子に立った少女が何かを掲げ、シェルティーが前足を上げて飛びつこうとしています。バーバーは子どもと犬を同じ画面に置く絵で最も知られ、その人気ゆえに版画として数えきれないほど複製されました。少女の青いワンピースが画面中央を貫き、強い色の基準になります。'] },
  'barber-friend-or-foe': { t: ['친구일까 적일까', '味方か敵か'], about: [
    '흰 옷을 입은 어린아이가 바닥에 엎드려 개와 고슴도치를 번갈아 봅니다. 제목의 물음은 아이가 아니라 개가 던지는 것으로, 낯선 짐승을 앞에 둔 순간의 망설임이 그림의 주제입니다. 밝은 바닥이 넓어 흰 조각이 많으니 아이와 개의 윤곽부터 잡는 편이 좋습니다.',
    'A small child in white lies on the floor, looking from the dog to a hedgehog and back. The question in the title is the dog’s rather than the child’s: the subject is that moment of hesitation before an unfamiliar animal. The pale floor covers a lot of ground, so start with the outlines of the child and the dog.',
    '白い服の幼子が床に伏せ、犬とハリネズミを交互に見ています。題の問いは子どもではなく犬のもので、見慣れぬ生き物を前にした逡巡の一瞬が主題です。明るい床が広く白いピースが多いので、子どもと犬の輪郭から固めるのがよいでしょう。'] },
  // ── 세실 올딘 · 존 엠스 — 영국의 사냥개 그림
  'aldin-hounds-chorus': { t: ['사냥개들이 일제히 울부짖기 시작했다', '猟犬たちが一斉に吠えはじめた'], about: [
    '세실 올딘은 20세기 초 영국에서 개와 사냥 장면을 그린 삽화가입니다. 무리 지은 사냥개 수십 마리가 한꺼번에 고개를 들고 우는 순간을 그렸는데, 개마다 얼룩 무늬가 달라서 한 마리도 같은 것이 없습니다. 얼룩의 배치가 그대로 조각의 단서가 되는, 이 진열대에서 손꼽히게 재미있는 그림입니다.',
    'Cecil Aldin was an English illustrator of dogs and the hunting field in the early twentieth century. Here dozens of hounds lift their heads and give tongue at once, and no two are marked alike. The arrangement of the patches is exactly what tells you where a piece goes — one of the most enjoyable pictures on this shelf.',
    'セシル・オールディンは20世紀初頭のイギリスで犬と狩猟の場面を描いた挿絵画家です。群れをなす猟犬が数十匹、一斉に顔を上げて吠える瞬間を描いており、斑の模様は一匹として同じものがありません。斑の配置がそのままピースの手がかりになる、この棚でも指折りに楽しい絵です。'] },
  'aldin-full-cry': { t: ['한창 쫓는 중', '追い込みの最中'], about: [
    '사냥개 무리와 말 탄 사람들이 들판을 가로질러 달립니다. 「풀 크라이」는 사냥개들이 냄새를 잡고 일제히 짖으며 달리는 상태를 가리키는 영국 사냥 용어입니다. 넓은 들판이 화면의 대부분이라 여백이 많지만, 붉은 사냥복이 점점이 박혀 좋은 표지가 됩니다.',
    'A pack of hounds and riders streaming across open country. "Full cry" is an English hunting term for the moment the hounds have the scent and are all giving tongue at once. Open field takes up most of the picture, but the red hunting coats are dotted through it and serve as markers.',
    '猟犬の群れと騎手たちが野を横切って駆けていきます。「フル・クライ」とは、犬が匂いを捉えて一斉に吠えながら走る状態を指すイギリスの狩猟用語です。広い野が画面の大半を占めますが、赤い狩猟服が点々と配され、よい目印になります。'] },
  'emms-shepherd-dogs': { t: ['양치기와 개들', '羊飼いと犬たち'], about: [
    '피리를 부는 양치기 옆에 콜리 두 마리가 앉아 있습니다. 존 엠스는 영국 뉴포레스트에 살며 사냥개와 테리어를 평생 그린 화가로, 개의 털을 두껍고 거칠게 쌓아 올리는 붓질이 특징입니다. 흰 옷과 흰 털이 이어져 있어 그 경계를 찾는 것이 이 그림의 고비입니다.',
    'A shepherd playing a pipe with two collies beside him. John Emms lived in the New Forest and painted hounds and terriers all his life, laying on the coats in thick, rough strokes. The white smock runs straight into the white fur, and finding that boundary is the hard part here.',
    '笛を吹く羊飼いのそばに、コリーが二匹座っています。ジョン・エムズはイギリスのニューフォレストに暮らし、生涯、猟犬とテリアを描いた画家で、犬の毛を厚く粗い筆致で積み上げるのが特徴です。白い衣と白い毛が続いており、その境目を見つけるのがこの絵の山場です。'] },
  'emms-hounds-kennel': { t: ['개집의 사냥개 둘과 테리어', '犬舎の猟犬二匹とテリア'], about: [
    '개집 안에 폭스하운드 두 마리와 작은 테리어 한 마리가 함께 있습니다. 몸집 차이가 큰 세 마리를 한 화면에 겹쳐 놓아 크기의 대비가 그대로 구성이 됐습니다. 짚과 나무 벽이 배경을 이루고 개들의 갈색·흰색 얼룩이 앞에 놓여, 앞뒤가 분명해 맞추기 좋습니다.',
    'Two foxhounds and a small terrier together in a kennel. Three animals of very different sizes are overlapped in one frame, and that difference in scale is itself the composition. Straw and plank walls make the background while the dogs’ brown and white patches sit in front, so the layers are clear and the pieces fall into place.',
    '犬舎の中にフォックスハウンド二匹と小さなテリアが一匹います。体格の大きく異なる三匹を一つの画面に重ね、その大きさの差がそのまま構成になっています。藁と板壁が背景をつくり、犬の茶と白の斑が手前に置かれて、前後がはっきりして組みやすい絵です。'] },
  'emms-foxhounds-door': { t: ['개집 문 앞의 폭스하운드', '犬舎の戸口のフォックスハウンド'], about: [
    '문 앞에 모인 폭스하운드 무리가 밖을 내다봅니다. 엠스는 사냥개를 무리로 그릴 때 앞줄과 뒷줄의 초점을 달리해서, 앞쪽 개만 또렷하고 뒤로 갈수록 흐려집니다. 그 흐림의 정도가 조각의 앞뒤를 가르는 단서가 됩니다.',
    'A pack of foxhounds gathered at a doorway, looking out. When Emms painted hounds in numbers he changed the focus between the front rank and the back, so only the nearest dogs are sharp and the rest soften with distance. That softening is what tells you how far back a piece belongs.',
    '戸口に集まったフォックスハウンドの群れが外をうかがっています。エムズは猟犬を群れで描くとき前列と後列で焦点を変えており、手前の犬だけが鮮明で、奥へいくほどぼやけます。そのぼけ具合が、ピースの前後を見分ける手がかりになります。'] },
  'emms-on-the-scent': { t: ['냄새를 좇아', '匂いを追って'], about: [
    '말 탄 사냥꾼과 개들이 냄새를 좇아 들판을 나아갑니다. 가로로 긴 화면에 개들이 줄지어 배치돼, 왼쪽에서 오른쪽으로 시선이 흐르도록 짜여 있습니다. 가로가 길어 조각이 옆으로 넓게 퍼지니 판을 넓게 쓰는 편이 좋습니다.',
    'A mounted huntsman and his hounds working a scent across open ground. The hounds are strung out along a wide horizontal format so that the eye travels from left to right. The picture is broad, so the pieces spread sideways and it helps to give yourself plenty of board.',
    '馬上の狩人と犬たちが匂いを追って野を進みます。横長の画面に犬が列をなして配され、視線が左から右へ流れるように組み立てられています。横に長いためピースが左右に広がるので、盤を広く使うとよいでしょう。'] },
};

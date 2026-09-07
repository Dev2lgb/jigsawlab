// 그림 소개 4/5 — 추가 소스(한국 회화·명화). key → { t: [한국어 제목, 일본어 제목], about: [ko, en, ja] }. 영문 제목·작가는 extra.json 표기
import type { WorkText } from './worksText';
export const TEXT4: Record<string, WorkText> = {
  // ── 한국 회화: 단원풍속도첩 (보물, 국립중앙박물관)
  'danwon-seodang': { t: ['서당', '書堂（村の学び舎）'], about: [
    '『단원풍속도첩』 스물다섯 장 가운데 가장 널리 알려진 장면입니다. 훈장 앞에서 회초리를 맞고 눈물을 훔치는 아이를 둘러싸고 동무들이 입을 가리며 웃고, 훈장은 짐짓 엄한 얼굴을 짓습니다. 배경을 모두 생략하고 인물을 둥글게 배치해, 웃음소리가 들릴 듯한 한순간을 붙잡았습니다.',
    'The best-known leaf of Kim Hong-do\'s album of everyday life. A boy who has just been switched by the teacher wipes his tears while his classmates hide their giggles, and the teacher puts on a stern face. With no background at all, the figures are arranged in a loose circle so that one moment of laughter seems to hang in the air.',
    '『檀園風俗図帖』二十五枚の中で最もよく知られた場面です。訓長に叱られて涙をぬぐう子どもを囲み、仲間たちは口を押さえて笑い、訓長はわざと厳しい顔をしています。背景をすべて省き人物を輪のように配して、笑い声が聞こえそうな一瞬をとらえました。'] },
  'danwon-bballaeteo': { t: ['빨래터', '洗濯場'], about: [
    '개울가에서 방망이질하며 빨래하는 아낙들과 머리를 손질하는 여인, 그리고 바위 뒤에서 부채로 얼굴을 반쯤 가린 채 몰래 훔쳐보는 선비를 한 장면에 담았습니다. 김홍도는 점잖은 양반의 딴청을 살짝 비틀어 웃음을 만들고, 물가의 일상을 담백한 선으로 기록했습니다.',
    'Women beat laundry on the rocks of a stream while another combs her hair, and behind a boulder a gentleman half hides his face with a fan as he peeks. Kim Hong-do turns the scholar\'s feigned indifference into a gentle joke, recording a riverside chore with a few plain, confident lines.',
    '小川で洗濯棒を振るう女たち、髪を整える女、そして岩陰から扇で顔を半分隠してこっそり覗く両班を一つの場面に収めました。金弘道は上品な両班のとぼけた素振りをひねって笑いを作り、水辺の日常を淡々とした線で記録しています。'] },
  'danwon-byeotajak': { t: ['벼타작', '稲の脱穀'], about: [
    '농부들이 볏단을 통나무에 내리쳐 낟알을 터는 동안, 지주로 보이는 사내는 볏가리 위에 자리를 깔고 비스듬히 누워 담뱃대를 물고 있습니다. 힘써 일하는 몸짓과 느긋한 감독의 자세를 나란히 놓아 조선 후기 농촌의 풍경을 유머와 함께 보여줍니다.',
    'Farmers thresh rice by slamming sheaves against a log, while a man who is clearly the landlord reclines on a straw mat atop the pile with a long pipe in his mouth. By setting the straining bodies beside the idle overseer, Kim Hong-do shows the late-Joseon countryside with a knowing smile.',
    '農夫たちが稲束を丸太に打ちつけて籾を落とすあいだ、地主らしき男は稲山の上に敷物を広げ、寝そべって煙管をくわえています。力仕事の身振りとのんびりした監督の姿を並べ、朝鮮後期の農村をユーモアと共に描きました。'] },
  'danwon-giwaigi': { t: ['기와이기', '瓦葺き'], about: [
    '집 짓는 현장입니다. 지붕 위의 기와장이가 아래에서 던져 올린 기와를 받고, 목수는 기둥이 바로 섰는지 다림줄을 늘어뜨려 확인하며, 다른 이는 톱질을 합니다. 각자의 일에 몰두한 동작이 한눈에 읽히도록 인물을 지붕 위아래로 나누어 배치한 구성이 돋보입니다.',
    'A house going up: the tiler on the roof catches tiles tossed from below, a carpenter checks a post with a plumb line, and another man saws timber. Kim Hong-do splits the figures above and below the roofline so that each task can be read at a glance.',
    '家を建てる現場です。屋根の上の瓦職人が下から投げ上げられた瓦を受け取り、大工は下げ振りを垂らして柱の垂直を確かめ、別の男は鋸を引いています。それぞれの作業が一目で読めるよう、人物を屋根の上下に分けた構図が見事です。'] },
  'danwon-daejanggan': { t: ['대장간', '鍛冶場'], about: [
    '벌겋게 달군 쇠를 모루 위에 놓고 두 사내가 번갈아 망치를 내리치고, 소년은 풀무를 밟아 불을 키우며, 한쪽에서는 낫을 숫돌에 갑니다. 망치질의 리듬이 느껴지도록 팔의 각도를 달리 그린 데서 김홍도의 관찰력이 드러납니다.',
    'Two smiths take turns hammering red-hot iron on the anvil, a boy works the bellows with his foot, and a man sharpens a sickle on a whetstone. The arms are drawn at different angles so that you can almost hear the rhythm of the hammers, a small proof of Kim Hong-do\'s eye.',
    '赤く熱した鉄を金床にのせ、二人の男が交互に槌を振り下ろし、少年は足でふいごを踏んで火を強め、脇では鎌を砥石で研いでいます。槌音のリズムが感じられるよう腕の角度を変えて描いたところに、金弘道の観察力が表れています。'] },
  'danwon-hwalssogi': { t: ['활쏘기', '弓の稽古'], about: [
    '활 쏘는 법을 배우는 장면입니다. 사범이 제자의 팔을 잡아 자세를 바로잡고, 옆에서는 화살이 곧은지 한쪽 눈을 감고 살피며, 다른 이는 활시위를 걸고 있습니다. 조선의 양반 교육에서 활쏘기가 얼마나 중요했는지 보여주는 그림입니다.',
    'An archery lesson: the instructor grips the pupil\'s arm to correct his stance, a man squints down an arrow to check that it is straight, and another strings a bow. Archery was part of a gentleman\'s education in Joseon, and this leaf shows it as everyday practice rather than ceremony.',
    '弓の射法を学ぶ場面です。師範が弟子の腕をつかんで姿勢を直し、隣では片目を閉じて矢のまっすぐさを確かめ、もう一人は弓に弦を張っています。朝鮮の両班教育で弓術がいかに重んじられたかを伝える絵です。'] },
  'danwon-jumak': { t: ['주막', '居酒屋（酒幕）'], about: [
    '길가 주막에서 나그네가 밥그릇을 든 채 한술 뜨고, 주모는 솥에서 국을 퍼 담습니다. 등에 아이를 업은 주모의 모습과 주머니를 뒤지는 다른 손님의 손짓까지 세세히 담아, 조선 후기 서민의 길 위의 한 끼를 정겹게 보여줍니다.',
    'At a roadside tavern a traveller eats from a bowl in his hand while the landlady ladles soup from her pot, a baby on her back; another guest rummages in his purse. Small gestures like these make this a warm record of an ordinary meal on the road in late Joseon.',
    '街道沿いの酒幕で旅人が椀を手に飯をかき込み、女将は鍋から汁をよそいます。子を背負った女将の姿や、財布を探る別の客の手つきまで細かく描き、朝鮮後期の庶民の旅の一食を情感豊かに伝えます。'] },
  'danwon-jeomsim': { t: ['점심', '昼餉'], about: [
    '들일을 하다 둘러앉아 새참을 먹는 농부들입니다. 저마다 밥그릇을 안고 먹는 데 열중하고, 한 여인은 아이에게 젖을 물리며, 개 한 마리가 먹다 남은 밥을 기다립니다. 배경을 비운 대신 사람과 그릇의 크기로 공간감을 만든 김홍도 특유의 구성입니다.',
    'Farmers sit in a ring in the field for their midday meal. Each is absorbed in his bowl, a woman nurses her baby, and a dog waits for leftovers. Instead of a background, Kim Hong-do builds the space with the scale of the figures and their bowls, a hallmark of his album.',
    '野良仕事の合間に車座になって昼餉をとる農夫たちです。めいめい椀を抱えて食べることに夢中で、一人の女は子に乳を含ませ、犬が食べ残しを待っています。背景を空けた代わりに人物と器の大きさで空間を作る、金弘道ならではの構図です。'] },
  'danwon-umulga': { t: ['우물가', '井戸端'], about: [
    '길 가던 사내가 우물가에서 여인이 건네는 두레박의 물을 들이켭니다. 갓을 뒤로 젖히고 가슴을 풀어헤친 사내의 모습에 다른 여인들은 고개를 돌려 외면합니다. 짧은 시선의 교차만으로 유교 사회의 남녀 사이 긴장을 슬며시 드러낸 장면입니다.',
    'A traveller gulps water from a bucket handed to him by a woman at the well; his hat is pushed back and his shirt hangs open, so the other women turn their faces away. With nothing more than a crossing of glances, the picture hints at the tension between men and women in Confucian society.',
    '道行く男が井戸端で女の差し出す釣瓶の水を飲み干します。笠を後ろにずらし胸をはだけた男の姿に、ほかの女たちは顔をそむけます。わずかな視線の交錯だけで、儒教社会の男女の間の緊張をそっと示した場面です。'] },
  'danwon-gilssam': { t: ['길쌈', '機織り'], about: [
    '베틀에 앉아 옷감을 짜는 여인 뒤에서 시어머니가 손주를 업은 채 지켜보고, 아래쪽에서는 다른 여인이 실을 날아 도투마리에 감습니다. 길쌈은 조선 여성의 중요한 노동이었고, 김홍도는 그 과정을 위아래 두 장면으로 나누어 차분히 기록했습니다.',
    'A woman weaves at her loom while her mother-in-law watches from behind with a grandchild on her back; below, another woman warps thread onto a beam. Weaving was central to women\'s work in Joseon, and Kim Hong-do records the process in two calm scenes stacked one above the other.',
    '機に向かって布を織る女の後ろで、姑が孫を背負って見守り、下では別の女が糸を整えて巻き取っています。機織りは朝鮮の女性の大切な労働で、金弘道はその工程を上下二つの場面に分けて静かに記録しました。'] },
  'danwon-naruteo': { t: ['나루터', '渡し場'], about: [
    '사람과 짐, 소까지 실은 나룻배 두 척이 강을 건넙니다. 갓 쓴 양반과 봇짐 진 장사꾼, 노 젓는 사공이 한 배에 타고 있어 조선 후기 강나루의 북적임이 그대로 전해집니다. 물결은 몇 가닥 선으로만 그려 배 안의 사람들에게 시선이 모이게 했습니다.',
    'Two ferries loaded with passengers, bundles and even an ox cross a river. Gentlemen in horsehair hats, pedlars with packs and the boatmen at their oars share the same deck, so the bustle of a Joseon ferry landing comes through intact. The water is only a few strokes, keeping the eye on the people.',
    '人と荷物、牛まで乗せた渡し舟二艘が川を渡ります。笠をかぶった両班、荷を背負った商人、櫓を漕ぐ船頭が同じ舟に乗り合わせ、朝鮮後期の渡し場の賑わいがそのまま伝わります。波は数本の線だけで描き、舟の中の人々に視線が集まるようにしました。'] },
  // ── 정선
  'jeongseon-inwang': { t: ['인왕제색도', '仁王霽色図'], about: [
    '1751년 여름, 비가 갠 뒤 인왕산을 그린 겸재 정선의 대표작이자 국보입니다. 짙은 먹을 여러 번 쌓아 올린 바위 봉우리와 골짜기에 걸린 안개가 대비를 이루고, 산 아래 집들이 작게 자리합니다. 일흔여섯의 정선이 평생의 벗 이병연이 병들었을 때 그렸다고 전해지며, 2021년 국립중앙박물관에 기증되었습니다.',
    'Jeong Seon\'s masterpiece and a National Treasure, painted in the summer of 1751 as rain cleared over Mount Inwang in Seoul. Layers of dense ink build the granite peaks, mist hangs in the valleys, and a few houses sit small at the foot of the mountain. Jeong was seventy-six and, tradition says, painted it while his lifelong friend Yi Byeong-yeon lay ill. It entered the National Museum of Korea in 2021.',
    '1751年夏、雨上がりの仁王山を描いた謙斎・鄭敾の代表作で、国宝です。濃い墨を幾重にも重ねた岩峰と谷にかかる霧が対比をなし、山裾に家々が小さく置かれています。七十六歳の鄭敾が生涯の友・李秉淵の病床の折に描いたと伝えられ、2021年に国立中央博物館へ寄贈されました。'] },
  'jeongseon-geumgang': { t: ['금강전도', '金剛全図'], about: [
    '1734년 정선이 금강산 일만 이천 봉을 하늘에서 내려다보듯 한 화면에 담은 국보입니다. 오른쪽의 뾰족한 바위 봉우리들은 날카로운 수직선으로, 왼쪽의 흙산은 부드러운 점으로 그려 음양이 어우러지듯 둥근 구도를 이룹니다. 실제 경치를 화가의 눈으로 재구성한 진경산수의 정점으로 꼽힙니다.',
    'A National Treasure of 1734 in which Jeong Seon gathers the twelve thousand peaks of Mount Geumgang into one bird\'s-eye view. The jagged granite peaks on the right are drawn with sharp vertical strokes, the earthen hills on the left with soft dots, and the two halves curve together like yin and yang. It is considered the summit of "true-view" landscape, real scenery recomposed by the painter\'s eye.',
    '1734年、鄭敾が金剛山一万二千峰を空から見下ろすように一画面に収めた国宝です。右の尖った岩峰は鋭い垂直線で、左の土山は柔らかな点で描き、陰陽が溶け合うような円い構図をなしています。実景を画家の目で再構成した真景山水の頂点とされます。'] },
  // ── 신윤복 혜원전신첩 (국보, 간송미술관)
  'hyewon-ssanggeom': { t: ['쌍검대무', '双剣対舞'], about: [
    '두 무희가 양손에 칼을 들고 마주 보며 춤추는 장면입니다. 붉은 치마와 푸른 치마가 회전하듯 펼쳐지고, 위쪽의 양반들과 아래쪽의 악사들이 둥글게 둘러앉아 무대를 이룹니다. 『혜원전신첩』 서른 장 중 가장 화려한 색과 움직임을 보여주는 그림입니다.',
    'Two dancers face each other with a sword in each hand, their red and blue skirts flaring as they turn. Noblemen above and musicians below form a ring that becomes the stage. Of the thirty leaves in Shin Yun-bok\'s album, this is the one with the boldest colour and movement.',
    '二人の舞妓が両手に剣を持って向かい合い舞う場面です。赤い裳と青い裳が回転するように広がり、上の両班たちと下の楽士たちが輪になって舞台を作ります。『蕙園伝神帖』三十枚の中で最も華やかな色と動きを見せる絵です。'] },
  'hyewon-wolha': { t: ['월하정인', '月下情人'], about: [
    '초승달이 뜬 한밤, 담 모퉁이에서 쓰개치마를 쓴 여인과 초롱을 든 남자가 마주 서 있습니다. 담벼락에 적힌 "달은 기울어 밤 깊은 삼경, 두 사람 마음은 두 사람만 안다"는 글귀가 그림의 제목이 되었습니다. 신윤복이 그린 조선의 밤과 연애를 대표하는 장면입니다.',
    'Under a thin crescent moon a woman with a cloak over her head and a man holding a lantern meet at the corner of a wall. The inscription on the wall gives the picture its meaning: "The moon sinks, the night is deep, and what these two feel only the two of them know." It is Shin Yun-bok\'s most famous image of love in Joseon by night.',
    '三日月の夜更け、塀の角で被り裳をかぶった女と提灯を持つ男が向かい合っています。塀に書かれた「月は傾き夜は三更、二人の心は二人だけが知る」という句がこの絵の題になりました。申潤福が描いた朝鮮の夜と恋を代表する場面です。'] },
  'hyewon-yeonso': { t: ['연소답청', '年少踏青'], about: [
    '봄날 젊은 양반들이 기생을 말에 태우고 들놀이를 나서는 장면입니다. 말고삐를 잡은 종과 갓을 대신 들고 따르는 이, 진달래꽃 핀 언덕이 어우러져 화창한 봄 기운이 전해집니다. 점잖은 체면보다 놀이를 앞세운 젊은이들을 신윤복 특유의 가는 선과 고운 색으로 그렸습니다.',
    'Young noblemen ride out for a spring picnic with gisaeng seated on their horses, servants leading the reins and carrying their masters\' hats, azaleas blooming on the slope. Shin Yun-bok paints youths who put pleasure before propriety with his characteristic fine line and delicate colour.',
    '春の日、若い両班たちが妓生を馬に乗せて野遊びに出かける場面です。手綱を引く従者、笠を代わりに持って従う者、つつじの咲く丘が重なり、うららかな春の気配が伝わります。体面より遊びを優先する若者たちを、申潤福らしい細い線と美しい色で描きました。'] },
  'hyewon-juyu': { t: ['주유청강', '舟遊清江'], about: [
    '맑은 강에 배를 띄우고 양반들이 기생과 함께 뱃놀이를 즐깁니다. 뱃머리에서 피리를 부는 소년, 물에 손을 담근 여인, 노를 젓는 사공까지 한 배에 담겨 있고, 강 건너 절벽이 배경을 이룹니다. "저녁 바람 피리 소리 물결 위로 흩어진다"는 화제가 분위기를 더합니다.',
    'Noblemen and gisaeng enjoy a boating party on a clear river: a boy plays a flute in the bow, a woman trails her hand in the water, and the boatman works his oar, with a cliff across the river for a backdrop. The inscription, "the sound of the evening flute scatters over the waves," sets the mood.',
    '澄んだ川に舟を浮かべ、両班たちが妓生と舟遊びを楽しみます。舳先で笛を吹く少年、水に手をひたす女、櫓を漕ぐ船頭までが一艘に収まり、対岸の崖が背景をなします。「夕風に笛の音が波の上に散る」という画題が雰囲気を添えています。'] },
  'hyewon-jusa': { t: ['주사거배', '酒肆挙盃'], about: [
    '주막 부엌에서 주모가 술을 데워 잔에 따르고, 갓과 붉은 옷차림의 관원들이 선 채로 술을 받아 마십니다. 부엌 살림과 마당의 나무, 인물들의 각기 다른 표정을 세밀하게 그려 조선 후기 술집의 하루를 생생하게 보여줍니다.',
    'In a tavern kitchen the landlady warms wine and pours it into cups while officials in hats and red coats drink standing. The pots and utensils, the tree in the yard and the different expressions of each figure are all drawn with care, giving a vivid account of a day in a late-Joseon drinking house.',
    '酒幕の台所で女将が酒を温めて杯に注ぎ、笠と赤い衣の役人たちが立ったまま酒を受けて飲みます。台所の道具や庭の木、人物それぞれの表情を細かく描き、朝鮮後期の酒場の一日を生き生きと伝えています。'] },
  'hyewon-sangchun': { t: ['상춘야흥', '賞春野興'], about: [
    '진달래 핀 봄날, 후원에 자리를 펴고 양반들이 기생·악사와 함께 풍류를 즐기는 장면입니다. 거문고와 해금을 연주하는 악사, 담뱃대를 문 양반, 술상을 나르는 이가 한데 어우러져 있고, 뒤편의 바위와 꽃나무가 봄 정원의 깊이를 만듭니다.',
    'On a spring day with azaleas in bloom, gentlemen spread mats in a rear garden and enjoy music with gisaeng and musicians. A geomungo and a haegeum are being played, one nobleman holds a long pipe, a servant carries in a tray of wine, and the rocks and flowering trees behind give the garden its depth.',
    'つつじの咲く春の日、裏庭に敷物を広げ、両班たちが妓生や楽士と風流を楽しむ場面です。玄琴と奚琴を奏でる楽士、煙管をくわえる両班、酒膳を運ぶ者が一つに溶け合い、後ろの岩と花木が春の庭に奥行きを与えています。'] },
  'hyewon-cheonggeum': { t: ['청금상련', '聴琴賞蓮'], about: [
    '연꽃이 핀 연못가 별당에서 양반 셋이 기생과 함께 거문고 소리를 듣습니다. 한 사람은 기생의 거문고 연주에 귀를 기울이고, 다른 이는 여인을 안고 있으며, 나머지는 담뱃대를 문 채 바라봅니다. 격식 뒤에 숨은 양반들의 사생활을 신윤복은 거리낌 없이 그렸습니다.',
    'Beside a lotus pond three noblemen listen to the geomungo in the company of gisaeng: one leans toward the music, another embraces a woman, the third looks on with his pipe. Shin Yun-bok painted the private pleasures hidden behind the gentry\'s formality without any hesitation.',
    '蓮の咲く池のほとりの離れで、両班三人が妓生と共に玄琴の音に耳を傾けます。一人は演奏に聞き入り、一人は女を抱き、もう一人は煙管をくわえて眺めています。格式の裏に隠れた両班の私生活を、申潤福は臆せず描きました。'] },
  // ── 그 밖의 한국 회화
  'geungjae-pajeok': { t: ['파적도 (야묘도추)', '破寂図（野猫盗雛）'], about: [
    '고양이가 병아리를 물고 달아나자 어미 닭이 날개를 펴고 쫓고, 마루에서 자리 짜던 사내는 담뱃대를 휘두르며 몸을 던지다 탕건이 벗겨져 날아갑니다. 뒤에서 아내가 놀라 소리칩니다. 김득신은 평온한 농가의 한낮이 깨지는 순간을 만화처럼 경쾌하게 포착했습니다.',
    'A cat bolts with a chick in its mouth, the hen gives chase with wings spread, and the man who was weaving a mat on the porch lunges after it with his pipe, losing his hat in mid-air while his wife shrieks behind him. Kim Deuk-sin catches the instant a quiet farmhouse afternoon is shattered, with the timing of a cartoon.',
    '猫が雛をくわえて逃げると母鶏が翼を広げて追い、縁側で筵を編んでいた男は煙管を振り回して飛び出し、宕巾が脱げて宙に舞います。後ろでは妻が驚いて叫びます。金得臣は静かな農家の昼下がりが破られる瞬間を、漫画のように軽快にとらえました。'] },
  'chaekgeori-yitaekgyun': { t: ['책가도 병풍', '冊架図屏風'], about: [
    '책과 문방구, 도자기와 꽃, 과일을 서가에 늘어놓은 열 폭 병풍입니다. 책가도는 정조가 학문을 장려하며 유행시킨 그림으로, 서양식 원근과 명암을 받아들여 선반이 실제로 튀어나온 듯 보이게 그렸습니다. 이택균은 화면 속 도장에 자기 이름을 숨겨 서명했는데, 이 그림에서도 찾아볼 수 있습니다.',
    'A ten-panel screen of books, writing implements, ceramics, flowers and fruit arranged on shelves. The chaekgeori genre flourished under King Jeongjo, who promoted learning, and it borrowed Western perspective and shading so that the shelves seem to project from the silk. Yi Taek-gyun signed his work by hiding his name on a painted seal, a trick you can hunt for here.',
    '書物や文房具、陶磁器や花、果物を書架に並べた十曲の屏風です。冊架図は学問を奨励した正祖のもとで流行した絵で、西洋の遠近法と陰影を取り入れ、棚が実際に飛び出して見えるように描かれました。李宅均は画中の印章に自分の名を隠して署名しており、この絵でも探すことができます。'] },
  'anjungsik-seongjae': { t: ['성재수간', '声在樹間'], about: [
    '"소리는 나무 사이에 있다"는 제목은 중국 구양수의 「추성부」에서 왔습니다. 밤바람에 나무가 흔들리는 소리를 듣고 선비가 동자에게 무슨 소리냐 묻는 장면으로, 바람에 휘는 나무를 거친 붓질로 그려 소리를 눈에 보이게 했습니다. 안중식은 조선 전통 화풍을 지킨 마지막 세대의 대가로, 근대 한국화가들을 길러냈습니다.',
    'The title, "the sound is among the trees," comes from Ouyang Xiu\'s Chinese ode on the sounds of autumn: a scholar hears the night wind and asks his servant boy what it is. An Jung-sik makes the sound visible with rough, bending brushstrokes for the wind-tossed trees. He was among the last masters of the traditional Joseon manner and trained the first generation of modern Korean painters.',
    '「声は木々の間にある」という題は欧陽脩の「秋声賦」から来ています。夜風に木がざわめく音を聞いた文人が童子に何の音かと問う場面で、風にしなる木を荒い筆致で描いて音を目に見えるものにしました。安中植は朝鮮伝統の画風を守った最後の世代の巨匠で、近代韓国画家たちを育てました。'] },
  'minhwa-tiger-magpie': { t: ['까치호랑이', '鵲虎図'], about: [
    '소나무 가지에 앉은 까치와 그 아래 눈을 부릅뜬 호랑이를 그린 민화입니다. 호랑이는 나쁜 기운을 막고 까치는 기쁜 소식을 전한다고 여겨, 설날에 대문에 붙이는 그림으로 널리 그려졌습니다. 무섭기보다 어딘가 어수룩한 호랑이의 표정이 민화 특유의 해학입니다.',
    'A folk painting of a magpie on a pine branch and a wide-eyed tiger below. The tiger was believed to ward off evil and the magpie to bring good news, so pictures like this were pasted on gates at the New Year. The tiger\'s expression, more bumbling than fearsome, is the humour typical of Korean minhwa.',
    '松の枝にとまる鵲と、その下で目を見開く虎を描いた民画です。虎は悪い気を防ぎ、鵲は吉報を運ぶとされ、正月に門に貼る絵として広く描かれました。怖いというよりどこか間の抜けた虎の表情が、民画ならではの諧謔です。'] },
  'jojiun-crane-pine': { t: ['송학도', '松鶴図'], about: [
    '소나무 가지 위에 학 한 마리가 고요히 서 있습니다. 17세기 화가 조지운은 새 그림에 능했던 아버지 조속의 화풍을 이어받아 담백한 먹으로 새와 나무를 그렸습니다. 소나무와 학은 모두 장수를 뜻하는 상징이라, 오래도록 건강하기를 비는 그림으로 사랑받았습니다.',
    'A single crane stands quietly on the branch of a pine. Jo Ji-un, a seventeenth-century painter, inherited his father Jo Sok\'s gift for birds and rendered them in restrained ink. Pine and crane are both emblems of long life, so pictures like this were cherished as wishes for health and old age.',
    '松の枝の上に一羽の鶴が静かに立っています。17世紀の画家・趙之耘は花鳥画に長けた父・趙涑の画風を継ぎ、淡白な墨で鳥と木を描きました。松と鶴はともに長寿の象徴で、末永い健康を願う絵として愛されました。'] },
  'hwajodo-screen': { t: ['화조도 십폭 병풍', '花鳥図十曲屏風'], about: [
    '열 폭마다 다른 꽃과 새를 짝지어 그린 병풍입니다. 모란과 공작, 매화와 까치, 연꽃과 오리처럼 계절과 상징이 어울리는 짝을 골라 부귀와 화목, 다산을 기원했습니다. 조선 말기 민화풍 화조도의 밝은 색채가 병풍 전체를 화사하게 채웁니다.',
    'A ten-panel screen pairing different flowers and birds on each panel: peony with peacock, plum with magpie, lotus with duck, each match chosen for season and meaning, to wish for wealth, harmony and many children. The bright palette of late-Joseon folk-style bird-and-flower painting fills the whole screen.',
    '十曲それぞれに異なる花と鳥を組み合わせて描いた屏風です。牡丹と孔雀、梅と鵲、蓮と鴨のように季節と象徴の合う組を選び、富貴と和合、子孫繁栄を祈りました。朝鮮末期の民画風花鳥図の明るい色彩が屏風全体を華やかに満たしています。'] },
  'irworobongdo': { t: ['일월오봉도', '日月五峰図'], about: [
    '해와 달, 다섯 봉우리, 두 줄기 폭포와 소나무, 파도를 좌우 대칭으로 그린 병풍입니다. 조선 시대 임금의 어좌 뒤에는 어디든 이 그림이 놓였고, 임금이 앉아야 비로소 그림이 완성된다고 여겼습니다. 강한 청록과 붉은색, 흰 물결이 만드는 장식적 질서가 왕권의 상징이었습니다.',
    'Sun and moon, five peaks, twin waterfalls, pines and waves painted in strict symmetry. Wherever the Joseon king sat, this screen stood behind the throne, and it was said the picture was complete only when the king took his place before it. Its ordered pattern of deep blue-green, red and white foam was an emblem of royal authority.',
    '日と月、五つの峰、二筋の滝と松、波を左右対称に描いた屏風です。朝鮮時代の王の玉座の後ろには必ずこの絵が置かれ、王が座ってはじめて絵が完成すると考えられました。強い青緑と赤、白い波が作る装飾的な秩序が王権の象徴でした。'] },
  // ── 서양 명화 (위키미디어 공용)
  'night-watch': { t: ['야경', '夜警'], about: [
    '암스테르담 민병대 프란스 반닝 코크 대장의 부대를 그린 집단 초상화로, 정식 제목은 「반닝 코크 대장의 민병대」입니다. 가만히 늘어선 단체 초상 대신 출동 직전 움직이는 순간을 담아 빛과 그림자로 드라마를 만들었고, 어두운 바니시 때문에 한때 밤 장면으로 오해받아 「야경」이라는 별명이 붙었습니다. 가로 4.5m의 거대한 화폭은 암스테르담 국립미술관의 중심에 걸려 있습니다.',
    'A group portrait of the Amsterdam civic guard under Captain Frans Banninck Cocq, officially "The Militia Company of Captain Banninck Cocq". Instead of a row of standing men, Rembrandt shows the company on the move, using light and shadow for drama; darkened varnish later made people take it for a night scene, hence the nickname. The canvas is over four metres wide and hangs at the heart of the Rijksmuseum.',
    'アムステルダム市民自警団のフランス・バニング・コック隊長の隊を描いた集団肖像画で、正式な題は「バニング・コック隊長の市民隊」。並んで立つ集団肖像の代わりに出動直前の動きの瞬間を描き、光と影でドラマを作りました。ワニスの黒ずみでかつて夜の場面と誤解され「夜警」の通称が付きました。幅4.5mの大画面はアムステルダム国立美術館の中心に掛かっています。'] },
  'las-meninas': { t: ['시녀들', 'ラス・メニーナス（女官たち）'], about: [
    '스페인 궁정의 마르가리타 공주와 시녀들, 난쟁이, 개, 그리고 이젤 앞에 선 화가 자신을 한 화면에 담았습니다. 뒤쪽 거울에는 국왕 부부가 비쳐, 그림을 보는 우리가 왕과 왕비의 자리에 서 있다는 이야기가 됩니다. 누가 누구를 보고 있는지 끝없이 되묻게 하는 구성 때문에 "회화의 신학"이라 불려 온 서양 미술사의 수수께끼 같은 걸작입니다.',
    'The Infanta Margarita with her maids of honour, dwarfs, a dog and the painter himself at his easel, all in one room of the Spanish court. The king and queen appear in a mirror on the back wall, so the viewer seems to stand in the royal couple\'s place. Its endlessly puzzling play of who is looking at whom has earned it the name "the theology of painting".',
    'スペイン宮廷のマルガリータ王女と女官たち、小人、犬、そしてイーゼルの前に立つ画家自身を一つの画面に収めました。奥の鏡には国王夫妻が映り、絵を見る私たちが王と王妃の位置に立っていることになります。誰が誰を見ているのかを問い続けさせる構図から「絵画の神学」と呼ばれてきた、西洋美術史の謎めいた傑作です。'] },
  'arnolfini': { t: ['아르놀피니 부부의 초상', 'アルノルフィーニ夫妻の肖像'], about: [
    '브뤼헤의 상인 아르놀피니 부부를 그린 초기 유화의 걸작입니다. 뒤쪽 벽의 볼록 거울에 방 전체와 두 사람의 방문객이 비치고, 그 위에 "얀 반 에이크가 여기 있었다 1434"라는 서명이 적혀 있습니다. 샹들리에의 촛불 하나, 창가의 오렌지, 발치의 강아지까지 유화 물감으로 어디까지 세밀해질 수 있는지 보여줍니다.',
    'A double portrait of a Bruges merchant and his wife and one of the earliest masterpieces of oil painting. A convex mirror on the back wall reflects the whole room and two visitors, and above it van Eyck wrote "Jan van Eyck was here, 1434". A single candle in the chandelier, the oranges by the window and the little dog at their feet show how far oil paint could go in describing the world.',
    'ブルッヘの商人アルノルフィーニ夫妻を描いた、初期油彩画の傑作です。奥の壁の凸面鏡に部屋全体と二人の来客が映り、その上に「ヤン・ファン・エイクここにありき 1434」の署名があります。シャンデリアの一本の蝋燭、窓辺のオレンジ、足元の子犬まで、油絵具がどこまで細密になれるかを示しています。'] },
  'tower-babel': { t: ['바벨탑', 'バベルの塔'], about: [
    '하늘에 닿으려다 신의 노여움을 산 바벨탑 이야기를 브뤼헐은 로마의 콜로세움을 닮은 거대한 나선형 건물로 그렸습니다. 왼쪽 아래에는 니므롯 왕이 석공들의 절을 받고, 탑 곳곳에서 수백 명의 일꾼이 기중기와 비계로 일하고 있습니다. 확대할수록 새로운 사람이 나타나는, 퍼즐로 맞추기에 더없이 좋은 그림입니다.',
    'Bruegel imagined the biblical tower that provoked God\'s anger as a colossal spiral building modelled on the Colosseum. King Nimrod receives the bows of stonemasons at lower left while hundreds of tiny workers labour with cranes and scaffolds all over the structure. The closer you look, the more people you find, which makes it a perfect subject for a jigsaw.',
    '天に届こうとして神の怒りを買ったバベルの塔を、ブリューゲルはローマのコロッセオに似た巨大な螺旋状の建物として描きました。左下ではニムロデ王が石工たちの礼を受け、塔のあちこちで数百人の職人がクレーンや足場で働いています。拡大するほど新しい人物が見つかる、パズルにうってつけの絵です。'] },
  'garden-delights': { t: ['쾌락의 정원', '快楽の園'], about: [
    '세 폭 제단화 형식의 이 그림은 왼쪽에 에덴동산, 가운데에 벌거벗은 사람들이 거대한 과일과 새 사이에서 노는 쾌락의 정원, 오른쪽에 기괴한 지옥을 펼쳐 놓습니다. 보스가 무엇을 경고하려 했는지는 500년 넘게 논쟁거리이며, 화면을 가득 채운 상상의 생물과 장면은 지금 봐도 초현실적입니다.',
    'A triptych with the Garden of Eden on the left, a garden of pleasure in the centre where naked figures play among giant fruit and birds, and a grotesque hell on the right. What Bosch meant to warn against has been argued over for five centuries, and the invented creatures and episodes that fill every inch still look surreal today.',
    '三連祭壇画の形式で、左にエデンの園、中央に巨大な果実や鳥の間で裸の人々が戯れる快楽の園、右に奇怪な地獄を広げています。ボスが何を警告しようとしたのかは500年以上論争の的で、画面を埋め尽くす空想の生き物と場面は今見てもシュルレアリスムのようです。'] },
  'liberty': { t: ['민중을 이끄는 자유의 여신', '民衆を導く自由の女神'], about: [
    '1830년 파리 7월 혁명을 기념한 그림으로, 삼색기를 든 자유의 여신이 바리케이드를 넘어 시민들을 이끕니다. 실크해트를 쓴 부르주아와 권총을 든 소년, 노동자가 한 대열에 섞여 있고, 연기 너머로 노트르담 대성당의 탑이 보입니다. 들라크루아는 "조국을 위해 싸우진 못했어도 조국을 위해 그리겠다"고 썼습니다.',
    'Painted to commemorate the July Revolution of 1830, it shows Liberty striding over a barricade with the tricolour, leading citizens of every class: a bourgeois in a top hat, a boy with pistols, a worker. The towers of Notre-Dame rise through the smoke. Delacroix wrote that if he had not fought for his country, he would at least paint for it.',
    '1830年のパリ七月革命を記念した絵で、三色旗を掲げた自由の女神がバリケードを越えて市民を導きます。シルクハットの市民、拳銃を持つ少年、労働者が同じ列に混じり、煙の向こうにノートルダム大聖堂の塔が見えます。ドラクロワは「祖国のために戦えなかったが、祖国のために描く」と書きました。'] },
  'wanderer': { t: ['안개 바다 위의 방랑자', '雲海の上の旅人'], about: [
    '바위 꼭대기에 선 남자가 등을 돌린 채 안개에 잠긴 산맥을 내려다봅니다. 얼굴을 보여주지 않아 보는 사람이 그의 자리에 서게 되고, 광활한 자연 앞의 고독과 경외가 그대로 전해집니다. 독일 낭만주의를 대표하는 이 그림은 오늘날 수많은 책 표지와 광고에 인용됩니다.',
    'A man on a rocky summit, seen from behind, looks out over a mountain range drowned in fog. Because his face is hidden we take his place, and the solitude and awe before vast nature become our own. The defining image of German Romanticism, it has been quoted on countless book covers and posters.',
    '岩の頂に立つ男が背を向けたまま、霧に沈む山脈を見下ろします。顔を見せないため見る者が彼の位置に立つことになり、広大な自然の前の孤独と畏怖がそのまま伝わります。ドイツ・ロマン主義を代表するこの絵は、今日数多くの本の表紙や広告に引用されています。'] },
  'whistler-mother': { t: ['회색과 검정의 배열 1번 (화가의 어머니)', '灰色と黒のアレンジメント第1番（画家の母）'], about: [
    '휘슬러는 어머니의 초상을 「회색과 검정의 배열」이라 이름 붙여, 누구를 그렸는지보다 색과 형태의 조화가 먼저라고 선언했습니다. 검은 옷의 옆모습, 회색 벽, 액자와 커튼의 직사각형이 절제된 구성을 이루고, 얼굴과 손의 레이스만이 부드럽게 빛납니다. 미국 밖에 있는 가장 유명한 미국 그림으로 꼽힙니다.',
    'Whistler called this portrait of his mother an "arrangement in grey and black", declaring that harmony of colour and shape mattered more than who was shown. The black profile, grey wall and the rectangles of frame and curtain make a spare composition in which only the face and lace catch a soft light. It is often called the most famous American painting outside America.',
    'ホイッスラーは母の肖像を「灰色と黒のアレンジメント」と名付け、誰を描いたかより色と形の調和が先だと宣言しました。黒衣の横顔、灰色の壁、額縁とカーテンの長方形が抑制された構成をなし、顔と手のレースだけが柔らかく光ります。アメリカ国外にある最も有名なアメリカ絵画とされます。'] },
  'swing': { t: ['그네', 'ぶらんこ'], about: [
    '분홍 드레스의 여인이 그네를 타고 슬리퍼를 공중에 차 날리고, 덤불 속의 젊은 남자가 치마 아래를 올려다보며, 뒤에서 나이 든 남편이 그네 줄을 당깁니다. 로코코의 장난스러움과 풍성한 잎사귀, 비단의 광택이 한 화면에 담긴 프라고나르의 대표작입니다.',
    'A young woman in a pink dress swings high and kicks off her slipper while a young man hidden in the bushes gazes up her skirt and an older husband pulls the ropes from behind. Rococo mischief, frothy foliage and the shine of silk are all here in Fragonard\'s most famous picture.',
    '桃色のドレスの女がぶらんこを漕いでスリッパを宙に蹴り上げ、茂みの中の若い男がスカートの下を見上げ、後ろでは年上の夫が綱を引いています。ロココの遊び心、豊かな葉叢、絹の光沢がひとつの画面に収まったフラゴナールの代表作です。'] },
  'ophelia': { t: ['오필리아', 'オフィーリア'], about: [
    '『햄릿』에서 실성한 오필리아가 꽃을 뿌리며 냇물에 떠내려가는 장면입니다. 밀레이는 서리 강가에서 다섯 달 동안 풀과 꽃을 하나하나 그린 뒤, 런던의 욕조에 누운 모델 엘리자베스 시달을 그려 넣었습니다. 라파엘전파 특유의 세밀한 자연 묘사가 슬픈 이야기와 어우러집니다.',
    'The mad Ophelia from Hamlet floats down a stream scattering flowers. Millais spent five months on the bank of the Hogsmill river painting every plant and blossom, then painted his model Elizabeth Siddal lying in a bath in London. The Pre-Raphaelite passion for exact natural detail meets one of Shakespeare\'s saddest scenes.',
    '『ハムレット』で正気を失ったオフィーリアが花を撒きながら小川を流れていく場面です。ミレイはサリーの川岸で五か月かけて草花を一つずつ描いたのち、ロンドンの浴槽に横たわったモデルのエリザベス・シダルを描き入れました。ラファエル前派特有の細密な自然描写が、悲しい物語と溶け合っています。'] },
  'shalott': { t: ['샬럿의 여인', 'シャロットの女'], about: [
    '테니슨의 시에서 저주를 받은 여인이 성을 떠나 배를 타고 카멜롯으로 흘러가는 장면입니다. 배 앞에 놓인 촛불 세 개 중 두 개는 이미 꺼졌고, 그녀가 짠 태피스트리가 뱃전에 늘어져 있습니다. 워터하우스는 이 시를 세 번 그렸는데, 이 첫 번째 그림이 가장 사랑받습니다.',
    'From Tennyson\'s poem: the cursed Lady leaves her tower and drifts by boat toward Camelot. Two of the three candles in the bow have already gone out and the tapestry she wove trails over the side. Waterhouse painted the subject three times, and this first version is the best loved.',
    'テニスンの詩で呪いを受けた女が塔を離れ、舟でキャメロットへ流れていく場面です。舳先の三本の蝋燭のうち二本はすでに消え、彼女が織ったタペストリーが舟べりに垂れています。ウォーターハウスはこの詩を三度描き、この最初の一枚が最も愛されています。'] },
  'sunflowers': { t: ['해바라기', 'ひまわり'], about: [
    '고흐가 아를에서 고갱을 맞이하려고 방을 꾸미며 그린 해바라기 연작 중 하나로, 노란 배경에 노란 꽃, 노란 꽃병이라는 대담한 색 실험입니다. 활짝 핀 꽃과 시들어 가는 꽃을 함께 그려 생명의 한 주기를 담았습니다. 런던 내셔널 갤러리에서 가장 많이 복제되는 그림입니다.',
    'One of the sunflower canvases van Gogh painted in Arles to decorate the room he was preparing for Gauguin, a bold experiment in yellow on yellow on yellow. Blooms in full flower and heads going to seed share the same vase, so a whole life cycle sits in one jar. It is the most reproduced picture in the National Gallery, London.',
    'ゴッホがアルルでゴーギャンを迎えるために部屋を飾ろうと描いたひまわり連作の一つで、黄色の背景に黄色の花、黄色の花瓶という大胆な色の実験です。満開の花と枯れかけた花を共に描き、命のひとめぐりを収めました。ロンドン・ナショナル・ギャラリーで最も複製される絵です。'] },
  'cafe-terrace': { t: ['밤의 카페 테라스', '夜のカフェテラス'], about: [
    '아를의 포룸 광장에 있던 카페의 테라스를 밤에 그렸습니다. 검정을 전혀 쓰지 않고 가스등의 노랑과 밤하늘의 짙은 파랑만으로 밤을 표현한 것이 고흐의 자랑이었고, 하늘의 별은 그가 처음으로 그린 별이 빛나는 밤입니다. 카페는 지금도 같은 자리에 있습니다.',
    'The terrace of a café on the Place du Forum in Arles, painted at night. Van Gogh was proud of rendering darkness without a single stroke of black, using only the yellow of the gaslight against the deep blue sky, and the stars overhead are the first he ever painted. The café still stands on the same spot.',
    'アルルのフォロム広場にあったカフェのテラスを夜に描きました。黒を一切使わず、ガス灯の黄色と夜空の濃い青だけで夜を表したことがゴッホの自慢で、空の星は彼が初めて描いた星月夜です。カフェは今も同じ場所にあります。'] },
  'irises': { t: ['붓꽃', 'アイリス'], about: [
    '생레미 요양원에 들어간 첫 주에 정원의 붓꽃을 그렸습니다. 보라색 꽃잎 하나하나에 검푸른 윤곽을 두르고, 왼쪽에 흰 붓꽃 한 송이를 놓아 화면에 숨을 틔웠습니다. 일본 판화의 영향이 뚜렷한 구성으로, 1987년 경매에서 당시 최고가를 기록하며 유명해졌습니다.',
    'Painted in the first week of van Gogh\'s stay at the asylum in Saint-Rémy, from the irises in its garden. Each violet petal is outlined in dark blue and a single white iris at the left lets the composition breathe. The design owes much to Japanese prints; the picture became famous when it set an auction record in 1987.',
    'サン＝レミの療養院に入った最初の週に、庭のアイリスを描きました。紫の花弁一枚一枚に濃い青の輪郭を巡らせ、左に白い花を一輪置いて画面に息をつかせています。日本の版画の影響が鮮明な構図で、1987年の競売で当時の最高額を記録して有名になりました。'] },
  'rhone': { t: ['론강의 별이 빛나는 밤', 'ローヌ川の星月夜'], about: [
    '아를의 론강 둑에서 밤에 그린 그림으로, 큰곰자리가 하늘에 뜨고 가스등 불빛이 강물에 길게 비칩니다. 고흐는 동생 테오에게 "밤은 낮보다 훨씬 색이 풍부하다"고 썼습니다. 앞쪽의 연인 한 쌍이 광활한 밤 풍경에 인간의 온기를 더합니다.',
    'Painted at night on the bank of the Rhône at Arles: the Great Bear hangs in the sky and the gaslights of the town stretch in long reflections across the water. Van Gogh told his brother Theo that the night was far more richly coloured than the day. A pair of lovers in the foreground adds human warmth to the vast dark landscape.',
    'アルルのローヌ川の堤で夜に描いた絵で、空には北斗七星が浮かび、ガス灯の光が川面に長く映ります。ゴッホは弟テオに「夜は昼よりずっと色が豊かだ」と書きました。手前の恋人たちが、広大な夜景に人の温もりを添えています。'] },
  'wheatfield-crows': { t: ['까마귀가 나는 밀밭', 'カラスのいる麦畑'], about: [
    '고흐가 세상을 떠나기 몇 주 전 오베르에서 그린 그림입니다. 폭풍우 치는 하늘 아래 노란 밀밭이 세 갈래 길로 갈라지고 까마귀 떼가 날아오릅니다. 그는 이 밀밭에서 "슬픔과 극도의 고독"을 표현하려 했다고 썼지만, 동시에 시골의 건강함도 담고 싶어 했습니다.',
    'Painted at Auvers a few weeks before van Gogh\'s death. Under a stormy sky a yellow wheatfield splits into three paths and a flock of crows rises. He wrote that in these fields he tried to express sadness and extreme loneliness, yet also the health and strength of the countryside.',
    'ゴッホが世を去る数週間前にオーヴェールで描いた絵です。嵐の空の下、黄色い麦畑が三本の道に分かれ、カラスの群れが飛び立ちます。彼はこの麦畑で「悲しみと極度の孤独」を表そうとしたと書きましたが、同時に田舎の健やかさも込めたいと願っていました。'] },
  'rousseau-dream': { t: ['꿈', '夢'], about: [
    '루소의 마지막 대작으로, 밀림 한가운데 붉은 소파에 누운 여인이 사자와 코끼리, 뱀 부리는 사람을 바라봅니다. 파리를 벗어난 적 없는 루소는 식물원과 그림책을 보며 이 밀림을 지어냈고, 소파는 "여인이 꿈속에서 밀림으로 옮겨 간 것"이라 설명했습니다.',
    'Rousseau\'s last great painting: a woman on a red sofa in the middle of a jungle gazes at lions, an elephant and a snake charmer. Rousseau never left Paris and built his jungles from the botanical garden and picture books; the sofa, he explained, had simply been carried into the jungle in the woman\'s dream.',
    'ルソー最後の大作で、密林の真ん中の赤いソファに横たわる女が、ライオンや象、蛇使いを眺めています。パリを出たことのないルソーは植物園と絵本を見てこの密林を作り上げ、ソファは「女が夢の中で密林へ運ばれたのだ」と説明しました。'] },
  'adele': { t: ['아델레 블로흐바우어의 초상 I', 'アデーレ・ブロッホ＝バウアーの肖像 I'], about: [
    '빈의 은행가 부인 아델레를 금박과 은박으로 감싼 클림트 황금 시대의 정점입니다. 얼굴과 손만 사실적으로 그리고 드레스와 배경은 눈, 소용돌이, 삼각형 무늬로 가득 채워 비잔틴 모자이크를 떠올리게 합니다. 나치에 빼앗겼다가 2006년 후손에게 반환된 이야기는 영화 「우먼 인 골드」로 만들어졌습니다.',
    'The wife of a Viennese banker wrapped in gold and silver leaf, the summit of Klimt\'s golden period. Only the face and hands are painted naturalistically; dress and background dissolve into eyes, spirals and triangles that recall Byzantine mosaics. Seized by the Nazis and returned to the family in 2006, its story became the film "Woman in Gold".',
    'ウィーンの銀行家夫人アデーレを金箔と銀箔で包んだ、クリムト黄金時代の頂点です。顔と手だけを写実的に描き、ドレスと背景は目や渦巻き、三角の文様で埋め尽くしてビザンティンのモザイクを思わせます。ナチスに奪われ2006年に遺族へ返還された物語は映画『黄金のアデーレ』になりました。'] },
  'boating-party': { t: ['뱃놀이 일행의 점심', '舟遊びをする人々の昼食'], about: [
    '센강변 샤투의 레스토랑 테라스에서 르누아르의 친구들이 점심을 마치고 느긋하게 어울립니다. 강아지를 안은 여인은 훗날 아내가 된 알린 샤리고이고, 화가 카유보트가 오른쪽 아래에 앉아 있습니다. 병과 과일, 밀짚모자, 줄무늬 차양이 빛을 받아 인상주의의 가장 행복한 그림으로 불립니다.',
    'Renoir\'s friends linger after lunch on the terrace of a restaurant at Chatou on the Seine. The woman holding a little dog is Aline Charigot, later his wife, and the painter Caillebotte sits at lower right. Bottles, fruit, straw hats and the striped awning all catch the light in what is often called the happiest picture of Impressionism.',
    'セーヌ河畔シャトゥーのレストランのテラスで、ルノワールの友人たちが昼食の後にくつろいでいます。子犬を抱く女は後に妻となるアリーヌ・シャリゴで、画家カイユボットが右下に座っています。瓶や果物、麦わら帽、縞の日除けが光を受け、印象派で最も幸福な絵と呼ばれます。'] },
  'folies': { t: ['폴리베르제르의 바', 'フォリー・ベルジェールのバー'], about: [
    '파리의 카바레 폴리베르제르에서 바 뒤에 선 여종업원 쉬종을 그린 마네의 마지막 대작입니다. 뒤쪽 거울에 비친 그녀의 뒷모습과 손님이 실제 위치와 어긋나 있어, 이 어긋남이 의도인지 실수인지를 두고 지금도 논쟁이 이어집니다. 대리석 위의 술병과 오렌지, 샹들리에의 반짝임이 화려한 밤을 전합니다.',
    'Manet\'s last major painting shows Suzon, a barmaid at the Folies-Bergère cabaret in Paris. Her reflection and the customer in the mirror behind her do not line up with where they should be, and whether the mismatch is deliberate is still debated. Bottles and oranges on the marble and the glitter of the chandeliers convey the glamour of the night.',
    'パリのキャバレー、フォリー・ベルジェールのバーに立つ女給シュゾンを描いた、マネ最後の大作です。後ろの鏡に映る彼女の後ろ姿と客の位置が実際とずれており、それが意図か誤りかを巡り今も論争が続きます。大理石の上の酒瓶とオレンジ、シャンデリアのきらめきが華やかな夜を伝えます。'] },
  'dance-class': { t: ['무용 수업', 'ダンス教室'], about: [
    '파리 오페라의 연습실에서 발레 교사 쥘 페로가 지팡이를 짚고 서서 소녀들의 동작을 지켜봅니다. 드가는 무대 위의 완벽한 순간이 아니라 기다리고 지루해하며 등을 긁는 연습실의 뒷모습을 즐겨 그렸습니다. 비스듬히 잡은 시점과 거울, 벽의 포스터가 방의 깊이를 만듭니다.',
    'In a rehearsal room of the Paris Opera the ballet master Jules Perrot leans on his stick and watches the girls. Degas preferred the backstage truth of waiting, boredom and a scratched back to the perfect moment on stage. The oblique viewpoint, the mirror and the poster on the wall give the room its depth.',
    'パリ・オペラ座の稽古場で、バレエ教師ジュール・ペローが杖をついて少女たちの動きを見守ります。ドガは舞台上の完璧な瞬間ではなく、待ちくたびれて背中を掻く稽古場の裏側を好んで描きました。斜めにとらえた視点と鏡、壁のポスターが部屋の奥行きを作っています。'] },
  'sipjangsaengdo': { t: ['십장생도 병풍', '十長生図屏風'], about: [
    '해·산·물·돌·구름·소나무·불로초·거북·학·사슴 등 오래 사는 것 열 가지를 한 화면에 모은 병풍입니다. 궁중에서 임금의 장수를 빌거나 새해를 맞이할 때 세웠고, 청록 산수에 붉은 해와 흰 학이 어우러진 색채가 화려합니다. 조선 궁중 장식화의 대표적인 주제입니다.',
    'A screen gathering ten symbols of long life in one landscape: sun, mountains, water, rocks, clouds, pines, the herb of immortality, tortoises, cranes and deer. Such screens stood in the palace to wish the king longevity or to greet the new year, and the blue-green hills with a red sun and white cranes make one of the most colourful subjects of Joseon court painting.',
    '日・山・水・石・雲・松・不老草・亀・鶴・鹿など長寿を象徴する十のものを一画面に集めた屏風です。宮中で王の長寿を祈り、あるいは新年を迎える際に立てられ、青緑の山水に赤い日と白い鶴が映える華やかな色彩を持ちます。朝鮮宮中装飾画を代表する画題です。'] },
  'parasol': { t: ['양산을 쓴 여인 – 모네 부인과 아들', '日傘をさす女 – モネ夫人と息子'], about: [
    '아르장퇴유의 언덕에서 아내 카미유와 아들 장을 아래에서 올려다보며 그렸습니다. 바람에 날리는 베일과 풀, 양산 그늘에 비친 초록빛 얼굴을 몇 시간 만에 빠른 붓질로 잡아냈고, 모네는 이 그림을 인물화가 아니라 야외 습작이라 불렀습니다. 인상주의의 밝음과 속도가 그대로 담긴 그림입니다.',
    'Painted on a hill at Argenteuil looking up at Monet\'s wife Camille and their son Jean. The veil and grass blown by the wind and the green light reflected on her face under the parasol were caught in a few hours of quick brushwork; Monet thought of it as an outdoor study rather than a portrait. The brightness and speed of Impressionism are all here.',
    'アルジャントゥイユの丘で、妻カミーユと息子ジャンを下から見上げて描きました。風になびくヴェールと草、日傘の陰で緑色に映る顔を数時間の速い筆致でとらえ、モネはこれを肖像画ではなく戸外の習作と呼びました。印象派の明るさと速さがそのまま詰まった絵です。'] },
  'hay-wain': { t: ['건초 마차', '干し草車'], about: [
    '서퍽의 스투어강을 건너는 건초 마차를 그린 영국 풍경화의 대명사입니다. 컨스터블은 어린 시절 뛰놀던 이 강가를 평생 그렸고, 왼쪽의 오두막은 지금도 그 자리에 남아 있습니다. 구름 낀 하늘과 물에 비친 나무의 사실적 묘사는 프랑스 화가들에게 큰 충격을 주어 인상주의의 씨앗이 되었습니다.',
    'A cart fording the River Stour in Suffolk, the most famous of all English landscapes. Constable painted the river of his childhood all his life, and the cottage on the left still stands. The truthful clouds and reflections astonished French painters when it was shown in Paris and helped sow the seeds of Impressionism.',
    'サフォークのストゥア川を渡る干し草車を描いた、イギリス風景画の代名詞です。コンスタブルは幼い頃に遊んだこの川辺を生涯描き続け、左の小屋は今もその場所に残っています。雲のかかる空と水に映る木の写実的な描写はフランスの画家たちに衝撃を与え、印象派の種となりました。'] },
  'temeraire': { t: ['전함 테메레르', '戦艦テメレール号'], about: [
    '트라팔가르 해전의 영웅 전함 테메레르가 해체를 위해 작은 증기 예인선에 끌려 마지막 정박지로 향합니다. 창백한 유령 같은 범선과 검은 연기를 뿜는 증기선, 그리고 타오르는 석양이 범선 시대의 끝을 애도합니다. 영국인이 가장 사랑하는 그림으로 뽑혀 20파운드 지폐에 실렸습니다.',
    'The Temeraire, a hero of Trafalgar, is towed by a small steam tug to be broken up. The pale, ghostly sailing ship, the tug belching black smoke and the blazing sunset together mourn the end of the age of sail. Voted Britain\'s favourite painting, it now appears on the twenty-pound note.',
    'トラファルガー海戦の英雄、戦艦テメレール号が解体のため小さな蒸気曳船に引かれて最後の停泊地へ向かいます。青白い幽霊のような帆船と黒煙を吐く蒸気船、燃える夕日が帆船時代の終わりを悼みます。英国で最も愛される絵に選ばれ、20ポンド紙幣に載りました。'] },
  'primavera': { t: ['봄', '春（プリマヴェーラ）'], about: [
    '오렌지 숲을 배경으로 비너스가 가운데 서고, 오른쪽에서 서풍의 신이 님프를 붙잡자 그녀가 꽃의 여신 플로라로 변하며, 왼쪽에서 삼미신이 춤추고 메르쿠리우스가 구름을 걷습니다. 풀밭에는 실제 식물 500여 종이 그려져 있습니다. 메디치 가문을 위해 그린 르네상스 신화화의 정수입니다.',
    'Venus stands at the centre of an orange grove; on the right the west wind seizes a nymph who turns into Flora, goddess of flowers, while on the left the Three Graces dance and Mercury clears the clouds. Some five hundred identifiable plants grow in the meadow. Painted for the Medici, it is the essence of Renaissance mythology in paint.',
    'オレンジの林を背にヴィーナスが中央に立ち、右では西風の神がニンフをつかむと彼女は花の女神フローラに変わり、左では三美神が踊りメルクリウスが雲を払います。草地には実在の植物約500種が描かれています。メディチ家のために描かれた、ルネサンス神話画の精髄です。'] },
  'school-athens': { t: ['아테네 학당', 'アテナイの学堂'], about: [
    '바티칸 교황의 서재 벽에 그린 프레스코로, 고대 그리스의 철학자들이 한 건물 안에 모여 있습니다. 가운데 하늘을 가리키는 플라톤과 땅을 가리키는 아리스토텔레스를 중심으로 피타고라스, 유클리드, 디오게네스가 자리하고, 라파엘로는 오른쪽 구석에 자신의 얼굴을 그려 넣었습니다. 르네상스가 꿈꾼 이성의 세계를 한 화면에 담았습니다.',
    'A fresco on the wall of the Pope\'s library in the Vatican, gathering the philosophers of ancient Greece under one great vault. Plato points to the sky and Aristotle to the earth at the centre, with Pythagoras, Euclid and Diogenes around them, and Raphael slipped his own face into the right-hand corner. It is the Renaissance dream of reason in a single picture.',
    'ヴァチカン教皇の書斎の壁に描かれたフレスコで、古代ギリシャの哲学者たちが一つの建物に集まっています。中央で天を指すプラトンと地を指すアリストテレスを軸に、ピタゴラス、ユークリッド、ディオゲネスが座し、ラファエロは右隅に自分の顔を描き込みました。ルネサンスが夢見た理性の世界を一画面に収めています。'] },
  'last-supper': { t: ['최후의 만찬', '最後の晩餐'], about: [
    '밀라노 수도원 식당 벽에 그린 그림으로, "너희 중 하나가 나를 배반하리라"는 말에 열두 제자가 세 명씩 무리 지어 놀라고 묻고 부인하는 순간을 담았습니다. 레오나르도는 프레스코 대신 실험적인 기법을 써서 완성 직후부터 벗겨지기 시작했고, 수백 년의 복원 끝에 지금의 모습이 되었습니다.',
    'Painted on the wall of a monastery refectory in Milan, it catches the instant after "one of you will betray me": the twelve apostles react in groups of three, shocked, questioning, protesting. Leonardo used an experimental technique instead of true fresco, so the painting began to flake almost at once, and centuries of restoration have given it its present state.',
    'ミラノの修道院食堂の壁に描かれた絵で、「あなたがたの一人が私を裏切る」という言葉に十二使徒が三人ずつ群れをなして驚き、問い、否定する瞬間をとらえています。レオナルドはフレスコの代わりに実験的な技法を用いたため完成直後から剥落が始まり、数百年の修復を経て今の姿になりました。'] },
  'bathers-asnieres': { t: ['아니에르에서 물놀이하는 사람들', 'アニエールの水浴'], about: [
    '파리 교외 센강가에서 노동자 계층의 젊은이들이 더위를 식히는 장면입니다. 강 건너에는 공장 굴뚝이 서 있고, 인물들은 고대 조각처럼 고요합니다. 스물네 살의 쇠라가 그린 첫 대작으로, 점묘법이 완성되기 직전 색을 나란히 놓는 실험이 시작된 그림입니다.',
    'Working-class youths cool off on the bank of the Seine at Asnières, factory chimneys across the river, the figures as still as ancient sculpture. Seurat\'s first large canvas, painted at twenty-four, shows his experiments in laying colours side by side just before pointillism proper was born.',
    'パリ郊外セーヌ河畔で労働者階級の若者たちが涼をとる場面です。対岸には工場の煙突が立ち、人物は古代彫刻のように静かです。二十四歳のスーラが描いた最初の大作で、点描が完成する直前、色を並べ置く実験が始まった絵です。'] },
  'seurat-circus': { t: ['서커스', 'サーカス'], about: [
    '파리 페르난도 서커스의 무대에서 곡마사가 흰 말 위에 서고 광대가 공중을 날며, 객석의 관객들은 좌석 등급에 따라 층층이 앉아 있습니다. 노랑·주황·파랑의 점만으로 화면을 짜고 곡선으로 즐거움을 표현하려 한 쇠라의 마지막 작품으로, 미완성인 채 전시 중에 그가 세상을 떠났습니다.',
    'At the Cirque Fernando in Paris a bareback rider stands on a white horse while a clown flies through the air, and the audience sits in tiers by ticket price. Seurat built the picture from dots of yellow, orange and blue and used curving lines to express gaiety; it was his last work, still unfinished when he died during the exhibition.',
    'パリのフェルナンド・サーカスの舞台で曲馬師が白馬の上に立ち、道化が宙を舞い、観客は席の等級ごとに段々に座っています。黄・橙・青の点だけで画面を組み、曲線で楽しさを表そうとしたスーラ最後の作品で、未完のまま展示中に彼は世を去りました。'] },
  'napoleon-alps': { t: ['알프스를 넘는 나폴레옹', 'アルプス越えのナポレオン'], about: [
    '1800년 나폴레옹이 생베르나르 고개를 넘어 이탈리아로 진군한 일을 기념한 그림입니다. 실제로는 노새를 타고 넘었지만 나폴레옹은 "사나운 말 위에 침착한 모습"으로 그려 달라 했고, 다비드는 바위에 한니발과 카롤루스의 이름 옆에 보나파르트를 새겨 넣었습니다. 다섯 점이 그려졌고 이 판본은 빈 벨베데레에 있습니다.',
    'It commemorates Napoleon\'s crossing of the Great St Bernard Pass into Italy in 1800. He actually rode a mule, but asked to be shown "calm on a fiery horse", and David carved BONAPARTE into the rocks beside the names of Hannibal and Charlemagne. Five versions were painted; this one belongs to the Belvedere in Vienna.',
    '1800年、ナポレオンがサン・ベルナール峠を越えてイタリアへ進軍したことを記念した絵です。実際にはラバに乗って越えましたが、ナポレオンは「荒馬の上で冷静な姿」に描くよう求め、ダヴィッドは岩にハンニバルとカール大帝の名と並べてボナパルトを刻みました。五点が描かれ、この版はウィーンのベルヴェデーレにあります。'] },
  'view-delft': { t: ['델프트 풍경', 'デルフトの眺望'], about: [
    '페르메이르가 고향 델프트를 운하 건너에서 바라본 풍경으로, 그가 남긴 도시 풍경화 두 점 중 하나입니다. 구름 그림자가 지붕 위를 지나가고, 햇빛이 오른쪽 신교회 탑에만 내려앉으며, 물결에 배와 성벽이 흔들리며 비칩니다. 프루스트가 "세상에서 가장 아름다운 그림"이라 부른 작품입니다.',
    'Vermeer\'s home town seen from across the harbour, one of only two cityscapes he painted. The shadow of a cloud crosses the roofs, sunlight falls only on the tower of the New Church on the right, and boats and walls tremble in their reflections. Proust called it the most beautiful painting in the world.',
    'フェルメールが故郷デルフトを運河の向こうから眺めた風景で、彼が残した都市風景画二点のうちの一つです。雲の影が屋根の上を渡り、陽光は右の新教会の塔にだけ降り、波に舟と城壁が揺れて映ります。プルーストが「世界で最も美しい絵」と呼んだ作品です。'] },
  'art-of-painting': { t: ['회화 예술', '絵画芸術'], about: [
    '커튼을 걷은 화실에서 등을 돌린 화가가 월계관을 쓴 모델을 그립니다. 모델은 역사의 여신 클리오이고, 벽의 지도는 옛 네덜란드 17개 주를 보여줍니다. 페르메이르는 빚에 시달리면서도 이 그림만은 죽을 때까지 팔지 않았고, 회화가 역사에 남기는 영광을 그린 그의 선언으로 읽힙니다.',
    'Behind a drawn-back curtain a painter with his back to us paints a model crowned with laurel: she is Clio, muse of history, and the map on the wall shows the seventeen provinces of the old Netherlands. Vermeer kept this picture until his death despite his debts, and it is read as his statement of the glory painting can win in history.',
    '引き上げられたカーテンの奥で、背を向けた画家が月桂冠をかぶったモデルを描いています。モデルは歴史の女神クレイオで、壁の地図は旧ネーデルラント十七州を示します。フェルメールは借金に苦しみながらもこの絵だけは死ぬまで手放さず、絵画が歴史に残す栄光を描いた彼の宣言と読まれています。'] },
  'little-street': { t: ['골목길', '小路'], about: [
    '델프트의 벽돌집 두 채와 그 사이 골목을 그린 작은 그림입니다. 문간에서 바느질하는 여인, 골목에서 청소하는 여인, 길가에서 노는 아이들이 조용한 오후를 채우고, 벽돌의 갈라진 틈과 회반죽 자국까지 정성스럽게 그려져 있습니다. 최근 연구로 이 집이 페르메이르의 고모가 살던 집으로 밝혀졌습니다.',
    'Two brick houses in Delft and the alley between them. A woman sews in a doorway, another cleans in the passage, children play on the pavement, and every crack in the brick and patch of whitewash is lovingly recorded. Recent research identified the house as the home of Vermeer\'s aunt.',
    'デルフトの煉瓦造りの家二軒とその間の小路を描いた小さな絵です。戸口で縫い物をする女、路地で掃除をする女、道端で遊ぶ子どもたちが静かな午後を満たし、煉瓦のひびや漆喰の跡まで丹念に描かれています。近年の研究でこの家はフェルメールの叔母の家と判明しました。'] },
  'harvesters': { t: ['추수하는 사람들', '穀物の収穫'], about: [
    '한여름, 농부들이 밀을 베고 다발을 묶는 한편에서 일행이 배나무 그늘 아래 빵과 죽을 먹고 한 사람은 대자로 뻗어 잠들었습니다. 브뤼헐이 계절을 주제로 그린 여섯 점 연작 중 하나로, 종교나 신화가 아닌 노동과 풍경 자체를 주인공으로 삼은 서양 최초의 그림들로 꼽힙니다.',
    'High summer: some peasants cut and bind the wheat while others eat bread and porridge in the shade of a pear tree, and one lies flat out asleep. One of Bruegel\'s six paintings of the seasons, it is among the first pictures in Western art to make labour and landscape themselves the subject rather than religion or myth.',
    '真夏、農民たちが麦を刈り束ねる傍らで、一行は梨の木陰でパンと粥を食べ、一人は大の字に寝ています。ブリューゲルが季節を主題に描いた六点の連作の一つで、宗教や神話ではなく労働と風景そのものを主役にした西洋最初期の絵とされます。'] },
  'peasant-wedding': { t: ['농부의 결혼식', '農民の婚宴'], about: [
    '헛간에서 열린 시골 결혼 잔치입니다. 신부는 초록 천 아래 수줍게 앉아 있고, 문짝을 떼어 만든 쟁반에 죽 그릇이 실려 나오며, 백파이프 연주자는 음식에 눈을 떼지 못합니다. 앞쪽의 아이는 손가락을 핥고, 브뤼헐 자신으로 여겨지는 남자가 오른쪽 끝에서 수사와 이야기합니다.',
    'A country wedding feast in a barn. The bride sits demurely beneath a green cloth, bowls of porridge are carried in on a door lifted off its hinges, and a bagpiper cannot take his eyes off the food. A child in front licks its fingers, and the man at the far right talking with a friar is thought to be Bruegel himself.',
    '納屋で開かれた田舎の婚礼の宴です。花嫁は緑の布の下に恥ずかしげに座り、扉を外して作った盆に粥の椀が運ばれ、バグパイプ奏者は料理から目を離せません。手前の子は指をなめ、右端で修道士と話す男はブリューゲル自身とされます。'] },
  'goya-parasol': { t: ['양산', '日傘'], about: [
    '초록 양산을 든 청년이 젊은 여인에게 그늘을 만들어 주고, 여인은 무릎 위 강아지와 함께 우리를 바라봅니다. 왕실 태피스트리의 밑그림으로 그린 그림이라 색이 밝고 구도가 단순하며, 고야의 젊은 시절 로코코풍 밝음을 가장 잘 보여줍니다.',
    'A young man shades a young woman with a green parasol while she looks out at us with a lapdog on her knee. Painted as a cartoon for a royal tapestry, it has bright colours and a simple design, and shows the Rococo cheerfulness of Goya\'s youth at its best.',
    '緑の日傘を持つ青年が若い女に陰を作り、女は膝の上の子犬とともにこちらを見ています。王室のタペストリーの下絵として描かれたため色が明るく構図が単純で、ゴヤの若き日のロココ風の明るさを最もよく示しています。'] },
  'flaming-june': { t: ['타오르는 6월', '燃え上がる六月'], about: [
    '주황색 얇은 드레스를 입은 여인이 반짝이는 지중해를 배경으로 몸을 웅크린 채 잠들어 있습니다. 위쪽의 협죽도는 독이 있어 잠과 죽음의 연관을 암시합니다. 빅토리아 시대 말의 이 그림은 한때 잊혀 1960년대 액자값 정도에 팔렸다가 지금은 푸에르토리코 폰세 미술관의 자랑이 되었습니다.',
    'A woman in a sheer orange dress sleeps curled up against a glittering Mediterranean; the oleander above her is poisonous, hinting at the kinship of sleep and death. Forgotten after the Victorian age and once sold for little more than the price of its frame in the 1960s, it is now the pride of the Museo de Arte de Ponce in Puerto Rico.',
    '橙色の薄いドレスをまとった女が、きらめく地中海を背に身を丸めて眠っています。上の夾竹桃は有毒で、眠りと死のつながりを暗示します。ヴィクトリア朝末期のこの絵は一時忘れられ、1960年代には額縁程度の値で売られましたが、今ではプエルトリコのポンセ美術館の誇りです。'] },
  'heliogabalus': { t: ['헬리오가발루스의 장미', 'ヘリオガバルスの薔薇'], about: [
    '로마 황제 헬리오가발루스가 연회에서 천장의 장막을 풀어 손님들을 장미 꽃잎으로 질식시켰다는 이야기를 그렸습니다. 알마타데마는 한겨울에 리비에라에서 장미를 매주 배달받아 꽃잎 하나하나를 그렸고, 대리석의 광택과 비단의 질감은 그의 특기였습니다. 화려함 속에 잔혹함을 숨긴 빅토리아 시대의 대표작입니다.',
    'The Roman emperor Heliogabalus is said to have released a canopy of rose petals on his guests until they suffocated. Alma-Tadema had roses sent from the Riviera every week through the winter to paint each petal, and polished marble and silk were his speciality. Cruelty hidden in splendour: a signature work of the Victorian age.',
    'ローマ皇帝ヘリオガバルスが宴で天蓋を解き、客を薔薇の花びらで窒息させたという逸話を描きました。アルマ＝タデマは真冬にリヴィエラから毎週薔薇を取り寄せて花びら一枚一枚を描き、大理石の光沢と絹の質感は彼の得意技でした。華やかさの中に残酷さを潜ませた、ヴィクトリア朝の代表作です。'] },
  'vertumnus': { t: ['베르툼누스 (루돌프 2세)', 'ウェルトゥムヌス（ルドルフ2世）'], about: [
    '신성로마제국 황제 루돌프 2세를 사계절의 신 베르툼누스로 꾸며, 얼굴 전체를 과일과 채소, 꽃으로 조립한 초상입니다. 배는 코, 사과는 뺨, 밀 이삭은 눈썹이 되었습니다. 황제는 모욕이 아니라 풍요와 조화의 상징으로 받아들여 크게 기뻐했다고 합니다. 400년 뒤 초현실주의자들이 다시 발견한 그림입니다.',
    'The Holy Roman Emperor Rudolf II dressed as Vertumnus, god of the seasons, his whole face assembled from fruit, vegetables and flowers: a pear for a nose, apples for cheeks, ears of wheat for eyebrows. The emperor was delighted, taking it as an emblem of abundance and harmony rather than an insult. The Surrealists rediscovered it four centuries later.',
    '神聖ローマ皇帝ルドルフ2世を四季の神ウェルトゥムヌスに見立て、顔全体を果物や野菜、花で組み立てた肖像です。梨が鼻、林檎が頬、麦の穂が眉になっています。皇帝は侮辱ではなく豊穣と調和の象徴として受け止め、大いに喜んだと伝わります。400年後にシュルレアリストたちが再発見した絵です。'] },
  'storm-galilee': { t: ['갈릴리 바다의 폭풍', 'ガリラヤの海の嵐'], about: [
    '렘브란트가 그린 유일한 바다 풍경으로, 폭풍 속 배에서 제자들이 돛과 씨름하고 토하고 기도하는 동안 예수는 고물에서 깨어납니다. 노를 잡은 채 우리를 바라보는 사람은 렘브란트 자신입니다. 1990년 보스턴의 가드너 미술관에서 도난당해 아직 찾지 못했고, 빈 액자만 벽에 걸려 있습니다.',
    'Rembrandt\'s only seascape: in a storm the disciples wrestle with the sail, vomit and pray while Christ wakes in the stern. The man gripping a rope and looking out at us is Rembrandt himself. Stolen from the Gardner Museum in Boston in 1990 and never recovered, its empty frame still hangs on the wall.',
    'レンブラント唯一の海景画で、嵐の舟の中で弟子たちが帆と格闘し、吐き、祈るあいだ、キリストは船尾で目を覚まします。綱を握ってこちらを見る人物はレンブラント自身です。1990年にボストンのガードナー美術館から盗まれ今も見つからず、空の額縁だけが壁に掛かっています。'] },
  'basket-fruit': { t: ['과일 바구니', '果物籠'], about: [
    '벌레 먹은 사과와 시든 잎, 마른 포도 줄기까지 그대로 그린 바구니가 탁자 모서리 위로 아슬아슬하게 튀어나와 있습니다. 배경을 비운 채 과일만 눈높이에서 그린 이 그림은 서양 최초의 독립된 정물화로 꼽히며, 카라바조는 "꽃 그림에도 인물화만큼의 공을 들여야 한다"고 말했습니다.',
    'A basket with a worm-eaten apple, wilting leaves and a dried vine stem, painted exactly as they were, teeters over the edge of a table. With an empty background and the fruit at eye level, it is counted as the first independent still life in Western art; Caravaggio said a picture of flowers deserved as much care as one of figures.',
    '虫食いの林檎、萎れた葉、乾いた葡萄の蔓までそのまま描いた籠が、卓の縁から危うく突き出ています。背景を空け果物だけを目の高さで描いたこの絵は西洋最初の独立した静物画とされ、カラヴァッジョは「花の絵にも人物画と同じだけ力を注ぐべきだ」と語りました。'] },
  'bosschaert-bouquet': { t: ['유리 꽃병의 꽃다발', 'ガラスの花瓶の花束'], about: [
    '튤립과 장미, 붓꽃, 카네이션이 한 꽃병에 꽂혀 있지만 실제로는 피는 철이 다른 꽃들입니다. 보스하르트는 꽃마다 따로 그린 습작을 모아 이상적인 꽃다발을 조립했고, 꽃잎에 앉은 나비와 이슬방울까지 보석처럼 그렸습니다. 튤립 광풍 직전 네덜란드 꽃 정물화의 출발점입니다.',
    'Tulips, roses, irises and carnations share one vase, though they never bloom in the same season. Bosschaert assembled an ideal bouquet from studies of each flower and painted the butterflies and dewdrops on the petals like jewels. It stands at the start of Dutch flower painting, just before the tulip mania.',
    'チューリップと薔薇、アイリス、カーネーションが一つの花瓶に挿されていますが、実際には咲く季節の違う花々です。ボスハールトは花ごとに描いた習作を集めて理想の花束を組み立て、花弁にとまる蝶や露の粒まで宝石のように描きました。チューリップ狂騒の直前、オランダ花卉静物画の出発点です。'] },
  'ninth-wave': { t: ['아홉 번째 파도', '第九の波'], about: [
    '밤새 폭풍에 난파한 사람들이 돛대 조각에 매달린 채 새벽을 맞고, 뱃사람들이 가장 크다고 믿는 "아홉 번째 파도"가 다가옵니다. 그러나 해가 떠오르며 하늘과 물결이 금빛과 보랏빛으로 물들어 절망 대신 희망을 이야기합니다. 러시아 최고의 해양 화가 아이바좁스키의 대표작입니다.',
    'Survivors of a night-long storm cling to a piece of mast at dawn as the "ninth wave", which sailors believed to be the largest, bears down on them. Yet the rising sun turns sky and water gold and violet, and the picture speaks of hope rather than despair. It is the masterpiece of Aivazovsky, Russia\'s greatest painter of the sea.',
    '一晩中の嵐で難破した人々が帆柱の破片にしがみついたまま夜明けを迎え、船乗りが最も大きいと信じる「第九の波」が迫ります。しかし昇る朝日が空と波を金色と紫に染め、絶望ではなく希望を語ります。ロシア最高の海洋画家アイヴァゾフスキーの代表作です。'] },
  'sorolla-seashore': { t: ['해변 산책', '海辺の散歩'], about: [
    '발렌시아 해변에서 소로야의 아내 클로틸데와 딸 마리아가 흰 드레스 차림으로 바람을 맞으며 걷습니다. 햇빛에 반짝이는 흰 천의 주름과 파라솔, 모자 리본이 큼직한 붓질로 그려져 지중해의 빛이 그대로 전해집니다. "빛의 화가" 소로야의 가장 사랑받는 그림입니다.',
    'Sorolla\'s wife Clotilde and daughter María walk into the breeze on the beach at Valencia in white dresses. The folds of sunlit cloth, the parasol and the hat ribbon are laid in with broad strokes so that the Mediterranean light itself seems to arrive. It is the best-loved picture by the "painter of light".',
    'バレンシアの海辺で、ソローリャの妻クロティルデと娘マリアが白いドレス姿で風を受けて歩きます。陽光にきらめく白い布の襞、パラソル、帽子のリボンが大きな筆致で描かれ、地中海の光がそのまま伝わります。「光の画家」ソローリャの最も愛される絵です。'] },
  'cassatt-boating': { t: ['뱃놀이', '舟遊び'], about: [
    '남프랑스 앙티브에서 뱃사공이 노를 젓고, 어머니 품의 아이가 그를 바라봅니다. 노란 배와 파란 바다의 강한 대비, 화면을 가로지르는 돛과 노의 사선은 일본 판화에서 배운 구성입니다. 커샛은 어머니와 아이라는 주제를 평생 그렸고, 이 그림은 그중 가장 대담한 구도를 보여줍니다.',
    'At Antibes a boatman pulls at the oar while a child in its mother\'s lap watches him. The strong contrast of yellow boat and blue sea and the diagonals of sail and oar come from Japanese prints. Cassatt painted mothers and children all her life, and this is the boldest composition among them.',
    '南仏アンティーブで船頭が櫓を漕ぎ、母の腕の中の子がそれを見つめます。黄色い舟と青い海の強い対比、画面を横切る帆と櫓の斜線は日本の版画に学んだ構成です。カサットは母と子という主題を生涯描き、この絵はその中で最も大胆な構図を示しています。'] },
  'breezing-up': { t: ['순풍', '順風'], about: [
    '글로스터 항 앞바다에서 어부와 소년 셋이 작은 돛배를 타고 바람을 받아 달립니다. 키를 잡은 소년은 수평선을 바라보고, 배는 물살을 가르며 기울어져 있습니다. 1876년 미국 독립 100주년 전시에서 젊은 나라의 낙관을 상징하는 그림으로 사랑받았습니다.',
    'Off Gloucester harbour a fisherman and three boys race a small catboat before the wind. The boy at the tiller gazes toward the horizon and the boat heels as it cuts through the water. Shown at the 1876 Centennial exhibition, it was embraced as an image of a young nation\'s optimism.',
    'グロスター港沖で漁師と三人の少年が小さな帆船で風を受けて走ります。舵を握る少年は水平線を見つめ、舟は水を切って傾いています。1876年のアメリカ建国百年博で、若い国の楽観を象徴する絵として愛されました。'] },
  'sierra-nevada': { t: ['시에라네바다 산맥에서', 'シエラネバダ山中にて'], about: [
    '구름 사이로 쏟아지는 빛, 폭포, 거울 같은 호수와 물가의 사슴 떼가 캘리포니아 산맥을 낙원처럼 보여줍니다. 비어슈타트는 실제 풍경을 여러 곳에서 조합해 이상적인 장면을 만들었고, 유럽에서 이 그림을 본 사람들에게 미국 서부는 웅장한 신대륙이 되었습니다. 허드슨강 화파의 대표작입니다.',
    'Light pouring through clouds, a waterfall, a mirror-like lake and deer at the water\'s edge turn the California mountains into paradise. Bierstadt combined views from several places into an ideal scene, and to Europeans who saw it the American West became a majestic new world. A key work of the Hudson River School.',
    '雲間から注ぐ光、滝、鏡のような湖と水辺の鹿の群れが、カリフォルニアの山脈を楽園のように見せます。ビアスタットは実景をいくつも組み合わせて理想の場面を作り、ヨーロッパでこの絵を見た人々にとってアメリカ西部は壮大な新世界となりました。ハドソン・リヴァー派の代表作です。'] },
  'oxbow': { t: ['옥스보 (뇌우 뒤의 홀리요크산 풍경)', 'オックスボウ（雷雨の後のホリヨーク山からの眺め）'], about: [
    '매사추세츠 홀리요크산에서 내려다본 코네티컷강의 굽이입니다. 왼쪽은 폭풍이 지나는 거친 원시림, 오른쪽은 햇살 아래 정돈된 농경지로, 미국의 자연과 문명을 한 화면에 대비시켰습니다. 콜은 아래쪽 바위에 작은 자화상을 그려 넣어 우리를 바라보게 했습니다.',
    'The bend of the Connecticut River seen from Mount Holyoke, Massachusetts. Storm-swept wilderness on the left, sunlit farmland on the right: American nature and civilisation set side by side. Cole painted a tiny self-portrait on the rocks below, looking back at us.',
    'マサチューセッツのホリヨーク山から見下ろしたコネチカット川の蛇行です。左は嵐の過ぎる荒々しい原生林、右は陽光の下に整えられた農地で、アメリカの自然と文明を一画面に対比させました。コールは下の岩に小さな自画像を描き込み、こちらを見つめさせています。'] },
  'canaletto-grand-canal': { t: ['베네치아 대운하 입구', 'ヴェネツィア、大運河の入口'], about: [
    '베네치아 대운하 어귀에서 살루테 성당의 둥근 지붕이 물 위에 솟아 있고, 곤돌라와 화물선이 오갑니다. 카날레토는 그랜드 투어로 베네치아를 찾은 영국 귀족들에게 이런 풍경을 그려 팔았고, 카메라 옵스쿠라를 써서 건물의 비례를 정확히 잡았습니다. 300년 전 베네치아가 지금과 거의 같은 모습으로 담겨 있습니다.',
    'At the mouth of the Grand Canal the dome of the Salute rises over the water while gondolas and barges pass. Canaletto sold views like this to English aristocrats on the Grand Tour and used a camera obscura to get the proportions of the buildings right. Venice of three hundred years ago looks almost exactly as it does today.',
    'ヴェネツィア大運河の河口にサルーテ聖堂の丸屋根が水上にそびえ、ゴンドラや荷船が行き交います。カナレットはグランドツアーでヴェネツィアを訪れた英国貴族にこうした景観画を描いて売り、カメラ・オブスクラで建物の比例を正確にとらえました。300年前のヴェネツィアが今とほぼ同じ姿で収められています。'] },
  'montmartre-night': { t: ['밤의 몽마르트르 대로', '夜のモンマルトル大通り'], about: [
    '피사로가 파리 호텔 창가에서 몽마르트르 대로를 계절과 시간에 따라 열네 점 그린 연작 중 유일한 밤 장면입니다. 젖은 도로에 가로등과 상점 불빛이 번지고, 마차와 행인은 몇 번의 붓 터치로만 남았습니다. 인상주의가 밤의 도시를 그린 드문 예로, 피사로 생전에는 전시되지 않았습니다.',
    'The only night scene among fourteen views of the Boulevard Montmartre that Pissarro painted from a Paris hotel window across seasons and hours. Gaslamps and shop windows smear across the wet road, and carriages and passers-by are reduced to a few touches. A rare Impressionist night in the city, it was never exhibited in his lifetime.',
    'ピサロがパリのホテルの窓からモンマルトル大通りを季節と時刻を変えて十四点描いた連作の中で、唯一の夜景です。濡れた路面に街灯と店の灯りがにじみ、馬車や通行人は数回の筆触だけで残されています。印象派が夜の都市を描いた稀な例で、ピサロの生前には展示されませんでした。'] },
  'plum-garden': { t: ['가메이도 매화 정원', '亀戸梅屋舗'], about: [
    '『명소 에도 백경』 중 한 장으로, 에도 가메이도의 이름난 매화 고목을 화면 앞을 가로지르는 굵은 가지로 대담하게 잘라 놓고 그 너머로 꽃놀이 손님들을 작게 그렸습니다. 붉게 물든 하늘과 초록 땅의 색 대비가 강렬합니다. 고흐가 이 판화를 유화로 모사한 것으로도 유명합니다.',
    'From "One Hundred Famous Views of Edo": the celebrated old plum tree at Kameido is cut boldly by its thick trunk crossing the foreground, with the blossom-viewers small beyond it. Red sky against green ground makes a striking contrast. Van Gogh copied this print in oil.',
    '『名所江戸百景』の一枚で、江戸亀戸の名高い梅の古木を、画面手前を横切る太い幹で大胆に切り取り、その向こうに花見客を小さく描いています。赤く染まった空と緑の地面の色の対比が強烈です。ゴッホがこの版画を油彩で模写したことでも知られます。'] },
  'kajikazawa': { t: ['가이 지방 가지카자와', '甲州石班沢'], about: [
    '『후가쿠 36경』 중 한 장으로, 바위 끝에 선 어부가 급류에 그물을 던지고 소년이 곁에 앉아 있습니다. 어부와 밧줄이 이루는 삼각형이 멀리 안개 속 후지산의 삼각형과 겹치도록 짜인 구성이 절묘합니다. 초기 인쇄본은 이 그림처럼 파랑 한 색으로만 찍은 "아이즈리" 판입니다.',
    'From the "Thirty-six Views of Mount Fuji": a fisherman on a rocky spit casts his net into the rapids while a boy sits beside him. The triangle of fisherman and ropes is made to echo the triangle of Fuji in the mist beyond, a masterly piece of design. Early impressions like this one were printed entirely in shades of blue.',
    '『冨嶽三十六景』の一枚で、岩の先端に立つ漁師が急流に網を投げ、少年が傍らに座っています。漁師と縄がなす三角形が、遠く霞む富士の三角形と重なるように組まれた構成が絶妙です。初期の摺りはこの絵のように藍一色で刷った「藍摺」です。'] },
  'audubon-flamingo': { t: ['아메리카 홍학', 'アメリカフラミンゴ'], about: [
    '오듀본의 『아메리카의 새』 435점 가운데 가장 유명한 도판입니다. 실물 크기로 그리기 위해 키 큰 홍학의 목을 굽혀 종이 안에 넣었고, 뒤쪽 작은 홍학들과 부리·발의 세부 그림을 곁들였습니다. 플로리다 키스에서 관찰한 새를 바탕으로 런던에서 동판으로 인쇄하고 손으로 색을 입혔습니다.',
    'The most famous of the 435 plates in Audubon\'s "The Birds of America". To keep the bird life-size the tall flamingo bends its neck to fit the page, with smaller flamingos behind and details of bill and foot. Based on birds observed in the Florida Keys, it was engraved in London and coloured by hand.',
    'オーデュボンの『アメリカの鳥類』435図の中で最も有名な図版です。実物大で描くために背の高いフラミンゴの首を曲げて紙に収め、後ろに小さなフラミンゴと嘴・脚の細部図を添えました。フロリダ・キーズで観察した鳥をもとにロンドンで銅版に刻み、手彩色されました。'] },
  'larsson-breakfast': { t: ['큰 자작나무 아래의 아침 식사', '大きな白樺の下の朝食'], about: [
    '스웨덴 순드보른의 라르손 집 마당에서 가족이 자작나무 아래 아침 식탁에 둘러앉았습니다. 라르손이 자기 집과 아이들을 그린 수채화 연작 『우리 집』의 한 장으로, 밝은 색과 소박한 가구, 햇살 가득한 정원이 스칸디나비아 인테리어의 원형이 되었습니다.',
    'The Larsson family gathered for breakfast under a birch in the garden of their house at Sundborn in Sweden. One of the watercolours of "A Home", Larsson\'s series about his own house and children, whose bright colours, simple furniture and sunlit garden became the template for Scandinavian interiors.',
    'スウェーデン、スンドボーンのラーション家の庭で、家族が白樺の下の朝食の食卓を囲んでいます。ラーションが自宅と子どもたちを描いた水彩連作『わたしの家』の一枚で、明るい色と素朴な家具、陽光あふれる庭は北欧インテリアの原型となりました。'] },
  'poppy-field': { t: ['양귀비 들판', 'ひなげし'], about: [
    '아르장퇴유 근처 들판에 양귀비가 붉게 흩뿌려지고, 언덕 위와 아래에 양산을 든 여인과 아이가 두 번 등장합니다. 모네의 아내 카미유와 아들 장으로, 두 쌍의 인물이 언덕을 따라 내려오는 듯한 리듬을 만듭니다. 1874년 첫 인상주의 전시에 출품된 그림입니다.',
    'Poppies scattered red across a field near Argenteuil, with a woman holding a parasol and a child appearing twice, at the top and bottom of the slope. They are Monet\'s wife Camille and son Jean, and the two pairs give a rhythm of walking down the hill. It was shown at the first Impressionist exhibition in 1874.',
    'アルジャントゥイユ近くの野にひなげしが赤く散らばり、丘の上と下に日傘を持つ女と子どもが二度現れます。モネの妻カミーユと息子ジャンで、二組の人物が丘を下ってくるようなリズムを作ります。1874年の第一回印象派展に出品された絵です。'] },
  'bougival': { t: ['부지발의 춤', 'ブージヴァルのダンス'], about: [
    '파리 근교 부지발의 야외 무도회장에서 한 쌍이 춤을 춥니다. 붉은 보닛의 여인은 화가 쉬잔 발라동이고, 남자의 밀짚모자와 여인의 치맛자락이 움직임 속에 번집니다. 바닥에 떨어진 꽃다발과 담배꽁초 같은 소소한 것들이 그날의 흥겨움을 말해 줍니다.',
    'A couple dance at an open-air dance hall at Bougival outside Paris. The woman in the red bonnet is the painter Suzanne Valadon, and the man\'s straw hat and her skirts blur with the movement. A dropped bouquet and cigarette ends on the ground tell of the gaiety of the day.',
    'パリ近郊ブージヴァルの野外ダンスホールで一組が踊ります。赤いボンネットの女は画家シュザンヌ・ヴァラドンで、男の麦わら帽と女の裾が動きの中でにじみます。床に落ちた花束や煙草の吸殻といった小さなものが、その日の楽しさを物語ります。'] },
  'vision-sermon': { t: ['설교 후의 환영', '説教のあとの幻影'], about: [
    '브르타뉴의 여인들이 설교를 듣고 나서 야곱이 천사와 씨름하는 환영을 봅니다. 현실의 여인들과 환영을 나무 줄기로 나누고, 땅을 새빨간 색으로 칠해 원근법과 사실적인 색을 버렸습니다. 고갱이 인상주의를 떠나 상징주의로 들어선 전환점으로, 마을 교회에 기증하려 했으나 거절당했습니다.',
    'Breton women, having heard a sermon, see a vision of Jacob wrestling the angel. A tree trunk divides the real women from the vision, and the ground is painted flat vermilion, abandoning perspective and natural colour. It marks Gauguin\'s turn from Impressionism to Symbolism; he offered it to the village church, which refused it.',
    'ブルターニュの女たちが説教を聞いた後、ヤコブが天使と格闘する幻を見ます。現実の女たちと幻を木の幹で分け、地面を真っ赤に塗って遠近法と写実的な色を捨てました。ゴーギャンが印象派を離れ象徴主義へ踏み出した転換点で、村の教会に寄贈しようとして断られました。'] },
  'sainte-victoire': { t: ['비베뮈스 채석장에서 본 생트빅투아르산', 'ビベミュスの石切場から見たサント＝ヴィクトワール山'], about: [
    '세잔이 고향 엑상프로방스의 산을 평생 수십 번 그린 연작 중 하나로, 이번에는 버려진 채석장의 주황빛 바위 너머로 산을 바라봅니다. 바위와 나무, 산이 색면으로 쌓여 화면이 앞으로 밀려 나오는 듯하고, 이 견고한 구조가 훗날 입체주의의 출발점이 되었습니다.',
    'One of the dozens of views Cézanne painted of the mountain near his native Aix-en-Provence, this time seen over the orange rocks of an abandoned quarry. Rocks, trees and mountain are built up in planes of colour that seem to press forward from the canvas, and this solid structure became a starting point for Cubism.',
    'セザンヌが故郷エクス＝アン＝プロヴァンスの山を生涯数十度描いた連作の一つで、今回は打ち捨てられた石切場の橙色の岩越しに山を望みます。岩と木、山が色面として積み上げられ画面が前へ押し出されるようで、この堅固な構造がのちのキュビスムの出発点となりました。'] },
  'dejeuner': { t: ['풀밭 위의 점심 식사', '草上の昼食'], about: [
    '옷을 입은 두 남자 곁에 벌거벗은 여인이 앉아 우리를 태연히 바라봅니다. 1863년 살롱에서 낙선해 「낙선전」에 걸리자 신화가 아닌 현대 여성의 나체라는 이유로 큰 소동이 일었습니다. 라파엘로와 조르조네의 구도를 빌리면서 당대의 삶으로 바꿔 놓은, 근대 회화의 출발을 알린 그림입니다.',
    'A naked woman sits beside two fully dressed men and looks calmly out at us. Rejected by the 1863 Salon and hung in the "Salon des Refusés", it caused a scandal because the nude was a modern woman rather than a goddess. Borrowing its arrangement from Raphael and Giorgione and translating it into contemporary life, it announced the beginning of modern painting.',
    '服を着た二人の男の傍らに裸の女が座り、平然とこちらを見ています。1863年のサロンに落選し「落選展」に掛けられると、神話ではなく現代女性の裸体だという理由で大騒ぎになりました。ラファエロやジョルジョーネの構図を借りつつ同時代の生活に置き換えた、近代絵画の始まりを告げる絵です。'] },
  'girl-reading': { t: ['열린 창가에서 편지를 읽는 소녀', '窓辺で手紙を読む女'], about: [
    '창가에 선 소녀가 편지를 읽고, 창유리에 그 얼굴이 희미하게 비칩니다. 오랫동안 빈 벽이었던 뒤쪽에서 2021년 복원으로 큐피드 그림이 다시 드러나, 편지가 연애편지임을 페르메이르가 처음부터 말하고 있었음이 밝혀졌습니다. 앞쪽의 과일 접시와 커튼이 무대의 막처럼 장면을 감쌉니다.',
    'A girl at a window reads a letter while her face is faintly mirrored in the glass. The wall behind her, long blank, gave up a painting of Cupid in a 2021 restoration, proving that Vermeer had been telling us from the start that this is a love letter. A dish of fruit and a curtain in front frame the scene like a stage.',
    '窓辺に立つ娘が手紙を読み、窓ガラスにその顔がかすかに映ります。長く空白だった奥の壁から2021年の修復でキューピッドの絵が再び現れ、この手紙が恋文であることをフェルメールが最初から示していたと判明しました。手前の果物の皿とカーテンが舞台の幕のように場面を包みます。'] },
  'isle-dead': { t: ['죽음의 섬', '死の島'], about: [
    '고요한 물 위에 사이프러스가 솟은 바위섬이 떠 있고, 흰옷의 인물이 관을 실은 배를 타고 다가갑니다. 뵈클린은 "꿈꾸게 하는 그림"을 주문받아 이 섬을 다섯 번 그렸고, 20세기 초 독일에서는 집집마다 복제화가 걸려 있었다고 합니다. 라흐마니노프는 이 그림을 보고 교향시를 작곡했습니다.',
    'A rocky island crowned with cypresses rises from still water as a boat with a white-robed figure and a coffin approaches. Böcklin painted the island five times after a commission for "a picture to dream over", and in early twentieth-century Germany a print of it hung in almost every home. Rachmaninoff wrote a symphonic poem after seeing it.',
    '静かな水の上に糸杉のそびえる岩の島が浮かび、白衣の人物が棺を載せた舟で近づきます。ベックリンは「夢を見させる絵」の注文を受けてこの島を五度描き、20世紀初頭のドイツでは家々に複製が掛かっていたといいます。ラフマニノフはこの絵を見て交響詩を作曲しました。'] },
  'hylas': { t: ['힐라스와 님프들', 'ヒュラスとニンフたち'], about: [
    '그리스 신화에서 물을 길으러 온 청년 힐라스를 연못의 님프들이 붙잡아 끌어들이는 장면입니다. 수련이 뜬 어두운 물, 일곱 님프의 똑같이 창백한 얼굴과 붉은 머리, 망설이는 힐라스의 몸짓이 마법에 걸린 듯한 분위기를 만듭니다. 워터하우스의 그림 중 가장 널리 알려진 작품입니다.',
    'From Greek myth: the youth Hylas, come to fetch water, is seized and drawn in by the nymphs of the pool. Dark water strewn with lilies, seven nymphs with the same pale faces and auburn hair, and Hylas\'s hesitating gesture create a spell-bound mood. It is Waterhouse\'s most widely known painting.',
    'ギリシャ神話で水を汲みに来た青年ヒュラスを、池のニンフたちが捕らえて引き込む場面です。睡蓮の浮かぶ暗い水、七人のニンフの同じように青白い顔と赤い髪、ためらうヒュラスの身振りが魔法にかかったような雰囲気を作ります。ウォーターハウスの絵で最も広く知られる作品です。'] },
  'munch-sun': { t: ['태양', '太陽'], about: [
    '오슬로 대학교 강당을 위해 그린 벽화 연작의 중심 그림으로, 바다 위로 떠오르는 태양이 화면 가득 빛줄기를 뿜습니다. 「절규」의 불안에서 벗어난 뭉크가 노르웨이 해안의 아침을 생명력과 희망의 상징으로 그린 것으로, 세로 4.5m, 가로 7.8m에 이르는 대작입니다.',
    'The central canvas of the murals Munch painted for the assembly hall of the University of Oslo: the sun rises over the sea and floods the picture with rays. Free of the anxiety of "The Scream", Munch made the Norwegian coast at morning an emblem of vitality and hope on a canvas almost eight metres wide.',
    'オスロ大学の講堂のために描いた壁画連作の中心の絵で、海の上に昇る太陽が画面いっぱいに光線を放ちます。『叫び』の不安から離れたムンクが、ノルウェーの海岸の朝を生命力と希望の象徴として描いたもので、縦4.5m、横7.8mに及ぶ大作です。'] },
  'ejiri': { t: ['스루가 지방 에지리', '駿州江尻'], about: [
    '『후가쿠 36경』 중 한 장으로, 갑작스러운 돌풍에 나그네들의 삿갓과 종이가 하늘로 흩날리고 나무가 휘어집니다. 사람들은 몸을 웅크리고 옷자락을 붙잡는데, 멀리 후지산만은 미동도 없이 고요합니다. 눈에 보이지 않는 바람을 흩날리는 종이로 그려낸 호쿠사이의 재치가 빛납니다.',
    'From the "Thirty-six Views of Mount Fuji": a sudden gust sends travellers\' hats and sheets of paper whirling into the sky and bends the trees. People crouch and clutch their clothes while Fuji alone stands unmoved in the distance. Hokusai\'s wit shines in painting the invisible wind through scattered paper.',
    '『冨嶽三十六景』の一枚で、突然の突風に旅人たちの笠や紙が空へ舞い上がり、木がしなります。人々は身をかがめ裾を押さえますが、遠くの富士だけは微動だにせず静かです。目に見えない風を舞う紙で描き出した北斎の機知が光ります。'] },
  'carnation-lily': { t: ['카네이션, 백합, 백합, 장미', 'カーネーション、リリー、リリー、ローズ'], about: [
    '해 질 녘 정원에서 흰옷의 두 소녀가 종이 등불에 불을 밝힙니다. 사전트는 여름 저녁 빛이 딱 맞는 몇 분 동안만 그릴 수 있어 두 해에 걸쳐 매일 저녁 몇 분씩 이 그림을 그렸습니다. 제목은 당시 유행가 가사에서 따왔고, 영국에서 화가로 자리 잡게 해 준 작품입니다.',
    'At dusk in a garden two girls in white light paper lanterns. Because the evening light was right for only a few minutes, Sargent painted for a few minutes each evening over two summers. The title comes from a popular song of the day, and the picture established his reputation in England.',
    '夕暮れの庭で白い服の少女二人が紙の提灯に火を灯します。夏の夕方の光がちょうどよいのはほんの数分だけだったため、サージェントは二年にわたり毎夕数分ずつこの絵を描きました。題は当時の流行歌の歌詞から取られ、彼が英国で画家として認められるきっかけとなった作品です。'] },
  'blue-armchair': { t: ['파란 안락의자의 소녀', '青い肘掛け椅子の少女'], about: [
    '커다란 파란 안락의자에 어린 소녀가 심드렁하게 몸을 늘어뜨리고, 옆 의자에는 강아지가 잠들어 있습니다. 소녀는 드가 친구의 딸이고 드가가 배경 일부를 직접 고쳐 주었습니다. 얌전한 초상 대신 아이의 지루함을 그대로 그린 대담함으로 커샛의 대표작이 되었습니다.',
    'A small girl sprawls bored across a huge blue armchair while a puppy sleeps on the chair beside her. She was the daughter of a friend of Degas, who retouched part of the background himself. Its daring in showing a child\'s boredom instead of a demure portrait made it one of Cassatt\'s signature works.',
    '大きな青い肘掛け椅子に幼い少女が気だるく身を投げ出し、隣の椅子では子犬が眠っています。少女はドガの友人の娘で、ドガが背景の一部を自ら手直ししました。行儀のよい肖像ではなく子どもの退屈をそのまま描いた大胆さで、カサットの代表作となりました。'] },
  'water-lily-pond': { t: ['수련 연못 위의 다리', '睡蓮の池に架かる橋'], about: [
    '지베르니 정원에 모네가 직접 만든 일본식 다리와 그 아래 수련 연못을 그렸습니다. 1899년 여름 같은 다리를 열두 점 넘게 그렸는데, 이 그림은 초록빛 버드나무와 수련이 화면을 빈틈없이 채워 하늘이 보이지 않습니다. 이후 30년 동안 이어질 수련 연작의 출발점입니다.',
    'The Japanese bridge Monet built in his garden at Giverny and the lily pond beneath it. He painted the bridge more than a dozen times in the summer of 1899; here willows and lilies fill the canvas so completely that no sky is visible. It is the starting point of the water-lily series that would occupy the next thirty years.',
    'ジヴェルニーの庭にモネが自ら作った日本風の太鼓橋と、その下の睡蓮の池を描きました。1899年夏に同じ橋を十二点以上描きましたが、この絵は緑の柳と睡蓮が画面を隙間なく埋め、空が見えません。以後30年続く睡蓮連作の出発点です。'] },
  'sainte-adresse': { t: ['생타드레스의 정원', 'サン＝タドレスのテラス'], about: [
    '노르망디 해변의 테라스에서 모네의 아버지가 의자에 앉아 바다를 바라보고, 깃발이 바람에 펄럭이며, 멀리 증기선이 지나갑니다. 테라스·바다·하늘을 세 개의 띠로 나누고 깃대로 세로선을 넣은 구성은 일본 판화에서 배운 것으로, 모네 자신도 "일본풍 그림"이라 불렀습니다.',
    'On a terrace above the Normandy shore Monet\'s father sits gazing at the sea, flags snap in the wind and a steamer passes in the distance. The division into three bands of terrace, sea and sky, crossed by the verticals of the flagpoles, was learned from Japanese prints, and Monet himself called it his Japanese picture.',
    'ノルマンディーの海辺のテラスでモネの父が椅子に座って海を眺め、旗が風にはためき、遠くを蒸気船が過ぎます。テラス・海・空を三つの帯に分け、旗竿で縦の線を入れた構成は日本の版画に学んだもので、モネ自身も「日本風の絵」と呼びました。'] },
  'umbrellas': { t: ['우산', '雨傘'], about: [
    '비 오는 파리 거리에서 우산이 파도처럼 겹치고, 굴렁쇠를 든 소녀와 바구니를 든 젊은 여인이 앞에 서 있습니다. 오른쪽은 1881년의 부드러운 인상주의 붓질로, 왼쪽은 몇 년 뒤 이탈리아 여행 후의 단단한 윤곽으로 그려져 한 그림 안에 르누아르의 두 시기가 공존합니다.',
    'Umbrellas overlap like waves on a rainy Paris street, with a girl holding a hoop and a young woman with a basket in front. The right side was painted in the soft Impressionist manner of 1881 and the left, a few years later after a journey to Italy, with firmer outlines, so two periods of Renoir coexist in one picture.',
    '雨のパリの街路に雨傘が波のように重なり、輪回しの少女と籠を持つ若い女が手前に立っています。右側は1881年の柔らかな印象派の筆致で、左側は数年後のイタリア旅行を経た堅い輪郭で描かれ、一枚の絵の中にルノワールの二つの時期が共存しています。'] },
  'night-cafe': { t: ['밤의 카페', '夜のカフェ'], about: [
    '아를 역 근처 카페의 밤늦은 실내로, 붉은 벽과 초록 당구대, 노란 등불이 서로 부딪칩니다. 고흐는 "빨강과 초록으로 인간의 끔찍한 정념을 표현하려 했다"며, 사람이 미쳐 버리거나 죄를 저지를 수도 있는 곳을 그렸다고 썼습니다. 밤새 사흘을 새우며 그린 그림입니다.',
    'The late-night interior of a café near the station in Arles, where red walls, a green billiard table and yellow lamps clash. Van Gogh wrote that he had tried to express "the terrible passions of humanity" with red and green, painting a place where one might go mad or commit a crime. He stayed up three nights to paint it.',
    'アルル駅近くのカフェの深夜の室内で、赤い壁と緑の玉突き台、黄色いランプがぶつかり合います。ゴッホは「赤と緑で人間の恐ろしい情念を表そうとした」と述べ、人が狂ったり罪を犯したりしかねない場所を描いたと書きました。三晩徹夜して描いた絵です。'] },
  'beech-grove': { t: ['너도밤나무 숲 I', 'ブナの森 I'], about: [
    '아터제 호숫가의 너도밤나무 숲을 클림트가 정사각형 화면에 담았습니다. 곧게 선 줄기들이 화면을 세로로 나누고, 바닥의 낙엽은 점묘처럼 무수한 점으로 찍혀 있어 숲 전체가 하나의 무늬처럼 보입니다. 황금빛 인물화로 유명한 클림트가 여름마다 그린 풍경화의 대표작입니다.',
    'A beech wood by the Attersee, painted by Klimt in his favourite square format. Straight trunks divide the picture vertically while the fallen leaves are dotted in like pointillism, so the whole forest reads as a pattern. Famous for his golden figures, Klimt painted landscapes like this every summer.',
    'アッター湖畔のブナの森を、クリムトが正方形の画面に収めました。まっすぐ立つ幹が画面を縦に分け、地面の落ち葉は点描のように無数の点で打たれ、森全体がひとつの文様のように見えます。黄金の人物画で知られるクリムトが毎夏描いた風景画の代表作です。'] },
  'farm-garden': { t: ['해바라기가 있는 농가 정원', 'ひまわりの咲く農家の庭'], about: [
    '아터제 근처 농가 정원의 해바라기와 온갖 꽃을 화면 가득 채운 그림입니다. 클림트는 꽃밭을 마치 보석을 흩뿌린 양탄자처럼 그려, 인물화의 황금 장식과 같은 눈으로 자연을 보았음을 보여줍니다. 배경도 하늘도 없이 꽃만 있어 퍼즐로 맞추면 색의 향연을 만나게 됩니다.',
    'Sunflowers and every kind of blossom crowd the canvas in a farm garden near the Attersee. Klimt paints the flower bed like a carpet strewn with jewels, looking at nature with the same eye he brought to the gold of his portraits. With no sky or background, only flowers, it becomes a feast of colour as a puzzle.',
    'アッター湖近くの農家の庭のひまわりとあらゆる花を画面いっぱいに詰め込んだ絵です。クリムトは花壇を宝石を撒いた絨毯のように描き、人物画の黄金装飾と同じ目で自然を見ていたことを示します。背景も空もなく花だけがあり、パズルにすると色の饗宴に出会います。'] },
  'angelus': { t: ['만종', '晩鐘'], about: [
    '해 질 녘 감자밭에서 농부 부부가 일손을 멈추고 멀리 교회의 저녁 종소리에 맞춰 기도합니다. 밀레는 어린 시절 할머니가 종소리를 들으면 일을 멈추고 기도하던 기억을 그렸다고 했습니다. 소박한 경건함으로 프랑스에서 가장 사랑받는 그림이 되었고, 달리는 이 그림에 집착해 여러 번 다시 그렸습니다.',
    'At dusk in a potato field a peasant couple stop work to pray as the evening bell rings from the distant church. Millet said he was remembering how his grandmother would stop and pray whenever she heard the bell. Its humble piety made it one of the most beloved pictures in France, and Dalí was so obsessed with it that he repainted it many times.',
    '日暮れのジャガイモ畑で農夫夫婦が手を止め、遠くの教会の晩鐘に合わせて祈ります。ミレーは幼い頃、祖母が鐘の音を聞くと仕事を止めて祈った記憶を描いたと語りました。素朴な敬虔さでフランスで最も愛される絵となり、ダリはこの絵に執着して何度も描き直しました。'] },
  'laughing-cavalier': { t: ['웃는 기사', '笑う騎士'], about: [
    '스물여섯 살 청년이 팔을 허리에 얹고 우리를 내려다보며 콧수염 끝을 올린 채 미소 짓습니다. 소매의 화살과 벌, 매듭 자수는 사랑의 상징이라 약혼 초상으로 추정됩니다. 웃음이 아닌 미소인데도 「웃는 기사」라는 별명이 굳어졌고, 할스의 활달한 붓질이 자신감 넘치는 표정과 잘 어울립니다.',
    'A twenty-six-year-old with his arm on his hip looks down at us with the tips of his moustache turned up in a smile. The arrows, bees and lovers\' knots embroidered on his sleeve are symbols of love, so it is thought to be a betrothal portrait. The nickname stuck though he smiles rather than laughs, and Hals\'s lively brushwork suits the confident expression.',
    '二十六歳の青年が腕を腰に当て、口髭の先を上げて微笑みながらこちらを見下ろしています。袖の矢や蜂、恋人結びの刺繍は愛の象徴で、婚約肖像と推定されます。笑いではなく微笑なのに「笑う騎士」の通称が定着し、ハルスの闊達な筆致が自信に満ちた表情とよく合っています。'] },
  'bacchus-ariadne': { t: ['바쿠스와 아리아드네', 'バッカスとアリアドネ'], about: [
    '테세우스에게 버림받아 해변에 선 아리아드네에게 술의 신 바쿠스가 표범 전차에서 뛰어내려 사랑에 빠지는 순간입니다. 하늘의 별자리는 그가 아리아드네에게 준 왕관이 별이 된 것입니다. 페라라 공작의 서재를 위해 그린 그림으로, 값비싼 청금석 파랑이 하늘을 물들이고 있습니다.',
    'Ariadne, abandoned on the shore by Theseus, is surprised by Bacchus leaping from his leopard-drawn chariot and falling in love at first sight; the constellation in the sky is the crown he gave her, turned to stars. Painted for the Duke of Ferrara\'s study, its sky glows with costly lapis lazuli blue.',
    'テセウスに捨てられ浜辺に立つアリアドネに、酒神バッカスが豹の車から飛び降りて一目で恋に落ちる瞬間です。空の星座は彼がアリアドネに贈った冠が星になったものです。フェラーラ公の書斎のために描かれた絵で、高価なラピスラズリの青が空を染めています。'] },
  'creation-adam': { t: ['아담의 창조', 'アダムの創造'], about: [
    '시스티나 예배당 천장 한가운데서 신이 손가락을 뻗어 아담에게 생명을 불어넣으려는 찰나입니다. 두 손가락 사이의 작은 틈이 그림 전체의 긴장을 만들고, 신을 감싼 붉은 망토의 형태는 인간의 뇌 단면을 닮았다는 해석도 있습니다. 미켈란젤로가 4년 동안 발판 위에서 그린 천장화의 중심입니다.',
    'At the centre of the Sistine ceiling God stretches out his finger to give Adam life. The small gap between the two fingers creates all the tension of the picture, and the red mantle around God has been read as the outline of a human brain. It is the heart of the ceiling Michelangelo painted from a scaffold over four years.',
    'システィーナ礼拝堂の天井中央で、神が指を伸ばしアダムに命を吹き込もうとする刹那です。二本の指の間の小さな隙間が絵全体の緊張を生み、神を包む赤いマントの形は人間の脳の断面に似ているという解釈もあります。ミケランジェロが四年間足場の上で描いた天井画の中心です。'] },
  'rain-steam-speed': { t: ['비, 증기, 속도 – 그레이트 웨스턴 철도', '雨、蒸気、速度 – グレート・ウェスタン鉄道'], about: [
    '템스강의 메이든헤드 다리를 건너 달려오는 증기 기관차를 비와 안개 속에 그렸습니다. 다리와 기차만 겨우 형체를 갖추고 나머지는 빛과 물기의 소용돌이이며, 선로 앞에는 작은 토끼가 기차와 달리기를 합니다. 산업 시대의 속도를 처음으로 그림에 담은 작품으로 평가됩니다.',
    'A steam locomotive rushes toward us across Maidenhead Bridge on the Thames through rain and mist. Only the bridge and the train keep their shape; the rest dissolves into a whirl of light and wet, and a tiny hare races the engine on the track ahead. It is considered the first painting to capture the speed of the industrial age.',
    'テムズ川のメイデンヘッド橋を渡って走ってくる蒸気機関車を、雨と霧の中に描きました。橋と列車だけがかろうじて形をとどめ、残りは光と湿り気の渦で、線路の先では小さな野兎が列車と競走しています。産業時代の速度を初めて絵に収めた作品と評価されます。'] },
  'san-giorgio': { t: ['해 질 녘의 산조르조 마조레', '黄昏のサン・ジョルジョ・マッジョーレ'], about: [
    '1908년 가을 베네치아에 머문 모네가 석호 건너 산조르조 마조레 섬의 성당과 종탑을 저녁 빛 속에 그렸습니다. 주황과 보라로 물든 하늘과 물이 위아래로 이어져 건물은 실루엣으로만 남습니다. 모네가 그린 베네치아 연작 중 가장 강렬한 색을 보여줍니다.',
    'Staying in Venice in the autumn of 1908, Monet painted the church and campanile of San Giorgio Maggiore across the lagoon in evening light. Sky and water, both stained orange and violet, run into each other so that the buildings remain only as silhouettes. It is the most intensely coloured of his Venetian series.',
    '1908年秋にヴェネツィアに滞在したモネが、潟の向こうのサン・ジョルジョ・マッジョーレ島の聖堂と鐘楼を夕暮れの光の中に描きました。橙と紫に染まった空と水が上下につながり、建物はシルエットだけが残ります。モネのヴェネツィア連作の中で最も強烈な色を見せる一枚です。'] },
  'mucha-zodiac': { t: ['황도 12궁', '黄道十二宮'], about: [
    '옆얼굴의 여인 뒤로 열두 별자리를 두른 원반이 후광처럼 빛나는 무하의 대표 장식화입니다. 원래 인쇄소 샹프누아의 달력으로 만들어졌다가 잡지 『라 플륌』이 표지로 쓰면서 널리 퍼졌습니다. 보석과 머리카락의 곡선, 비잔틴풍 장식이 아르누보 양식을 그대로 보여줍니다.',
    'A woman in profile with a disc of the twelve signs of the zodiac glowing behind her like a halo, Mucha\'s most celebrated decorative panel. Designed as a calendar for the printer Champenois, it became famous when the magazine "La Plume" used it as a cover. The curling hair and jewels and the Byzantine ornament are Art Nouveau in its purest form.',
    '横顔の女の背後で黄道十二宮の円盤が光輪のように輝く、ミュシャの代表的な装飾画です。もとは印刷所シャンプノワのカレンダーとして作られ、雑誌『ラ・プリュム』が表紙に用いて広まりました。髪と宝石の曲線、ビザンティン風の装飾がアール・ヌーヴォー様式をそのまま示しています。'] },
  'mucha-job': { t: ['욥 담배 종이', 'JOB（巻き紙）'], about: [
    '담배 마는 종이 「욥」의 광고 포스터로, 눈을 지그시 감은 여인의 머리카락이 담배 연기와 뒤엉켜 화면을 채웁니다. 배경에 회사 이름 JOB의 글자를 무늬처럼 반복해 넣었습니다. 파리 거리에 붙자 사람들이 떼어 가 소장했다는 아르누보 포스터의 대표작입니다.',
    'An advertising poster for Job cigarette papers: a woman with half-closed eyes, her hair tangling with the smoke that fills the sheet, while the letters JOB repeat as a pattern behind her. When it went up on the streets of Paris people peeled it off the walls to keep, a legend of the Art Nouveau poster.',
    '巻き紙「JOB」の広告ポスターで、目を細めた女の髪が煙草の煙と絡み合って画面を満たします。背景には社名JOBの文字が文様のように繰り返されています。パリの街に貼られると人々が剥がして持ち帰ったという、アール・ヌーヴォーのポスターの代表作です。'] },
  'rouen-cathedral': { t: ['루앙 대성당, 서쪽 정면, 햇빛', 'ルーアン大聖堂、西正面、陽光'], about: [
    '모네가 루앙 대성당 맞은편 방에 앉아 시간과 날씨에 따라 변하는 정면을 서른 점 넘게 그린 연작 중 하나입니다. 돌의 형태보다 돌 위에서 부서지는 빛이 주인공이라, 두텁게 쌓인 물감이 벽면의 질감이 됩니다. 1895년 스무 점을 함께 전시해 연작이라는 개념을 완성했습니다.',
    'One of more than thirty canvases Monet painted of the cathedral façade from a room opposite, following the changes of hour and weather. The subject is not the stone but the light breaking over it, and the thickly built-up paint becomes the texture of the wall. Showing twenty of them together in 1895 completed his idea of the series.',
    'モネがルーアン大聖堂の向かいの部屋に座り、時刻と天候で変わる正面を三十点以上描いた連作の一つです。石の形より石の上で砕ける光が主役で、厚く積まれた絵具が壁面の質感になります。1895年に二十点を一緒に展示し、連作という考えを完成させました。'] },
  'watering-can': { t: ['물뿌리개를 든 소녀', 'じょうろを持つ少女'], about: [
    '파란 드레스에 레이스 장식을 단 소녀가 물뿌리개를 들고 정원 오솔길에 서서 우리를 바라봅니다. 뒤쪽의 꽃과 잎은 색점으로 흩어져 소녀와 하나로 녹아들고, 리본과 단추의 붉은색이 화면에 악센트를 줍니다. 르누아르가 어린이를 그린 그림 중 가장 밝고 사랑스러운 작품입니다.',
    'A little girl in a blue dress trimmed with lace stands on a garden path with a watering can and looks out at us. The flowers and leaves behind dissolve into dabs of colour that melt into her figure, and the red of her ribbon and buttons gives the picture its accent. It is the brightest and most endearing of Renoir\'s paintings of children.',
    'レースをあしらった青いドレスの少女がじょうろを手に庭の小道に立ち、こちらを見ています。背後の花や葉は色の点として散らばり少女と溶け合い、リボンとボタンの赤が画面にアクセントを与えます。ルノワールが子どもを描いた絵の中で最も明るく愛らしい作品です。'] },
  'proverbs': { t: ['네덜란드 속담', 'ネーデルラントの諺'], about: [
    '한 마을 안에 백 개가 넘는 속담을 장면으로 숨겨 놓은 그림입니다. 지붕에 파이를 얹은 집, 벽에 머리를 박는 남자, 돼지에게 장미를 던지는 사람, 푸른 망토를 남편에게 씌우는 아내가 모두 당시의 관용구입니다. 어리석음을 한데 모은 브뤼헐의 인간 희극으로, 찾을수록 새 이야기가 나옵니다.',
    'More than a hundred proverbs hidden as scenes in a single village: pies on the roof, a man banging his head against a wall, someone throwing roses before swine, a wife hanging a blue cloak on her husband. Every one was a saying of the time. Bruegel\'s comedy of human folly yields a new story every time you look.',
    '一つの村の中に百を超える諺を場面として隠した絵です。屋根にパイを載せた家、壁に頭を打ちつける男、豚に薔薇を投げる人、夫に青いマントを着せる妻はすべて当時の慣用句です。愚かさを一堂に集めたブリューゲルの人間喜劇で、探すほど新しい物語が見つかります。'] },
  'magpie': { t: ['까치', 'かささぎ'], about: [
    '눈 덮인 시골 울타리 문 위에 까치 한 마리가 앉아 있습니다. 모네는 흰 눈 위의 그림자를 검정이 아닌 푸른색으로 그려, 살롱 심사위원들에게 낙선당했지만 훗날 인상주의의 빛 표현을 예고한 그림으로 평가받았습니다. 모네가 그린 140여 점의 눈 풍경 중 가장 유명합니다.',
    'A single magpie sits on a gate in a snow-covered countryside. Monet painted the shadows on the snow in blue rather than black; the Salon jury rejected the picture, but it later came to be seen as an early statement of the Impressionist treatment of light. It is the most famous of his 140 or so snow scenes.',
    '雪に覆われた田舎の柵の門の上にかささぎが一羽とまっています。モネは雪の上の影を黒ではなく青で描き、サロンの審査員に落選させられましたが、のちに印象派の光の表現を予告した絵と評価されました。モネが描いた140点余りの雪景色の中で最も有名です。'] },
  'sisley-snow': { t: ['루브시엔의 눈', 'ルーヴシエンヌの雪'], about: [
    '파리 서쪽 루브시엔 마을의 눈 내리는 골목을 담벼락 사이로 내려다본 그림입니다. 우산을 든 여인이 홀로 걸어가고, 회색 하늘과 눈 덮인 지붕, 젖은 담장이 조용한 겨울의 침묵을 전합니다. 시슬레는 평생 풍경만 그렸고 눈 풍경에서 특히 섬세한 색을 보여주었습니다.',
    'A snowy lane in the village of Louveciennes west of Paris, seen between garden walls. A woman with an umbrella walks alone, and the grey sky, snow-laden roofs and wet walls convey the hush of winter. Sisley painted nothing but landscapes all his life, and his snow scenes show his subtlest colour.',
    'パリ西方の村ルーヴシエンヌの雪の降る路地を、塀の間から見下ろした絵です。傘を持つ女がひとり歩き、灰色の空と雪を載せた屋根、濡れた塀が静かな冬の沈黙を伝えます。シスレーは生涯風景だけを描き、雪景色でとりわけ繊細な色を見せました。'] },
  'attersee': { t: ['아터제 호수', 'アッター湖'], about: [
    '오스트리아 아터제 호수의 물결이 정사각형 화면을 거의 다 채우고, 위쪽 가장자리에 섬과 먼 기슭만 가늘게 남았습니다. 클림트는 배 위에서 망원경으로 풍경을 잘라 보듯 구도를 잡았고, 짧은 붓질로 잔물결 하나하나를 찍어 물이 반짝이는 모자이크처럼 보이게 했습니다.',
    'The rippling water of the Attersee in Austria fills almost the whole square canvas, leaving only a thin strip of island and far shore along the top edge. Klimt framed the view as if cutting it out with a telescope from a boat, and dabbed in each ripple with short strokes until the water shimmers like a mosaic.',
    'オーストリアのアッター湖の波が正方形の画面をほぼ埋め、上端に島と遠い岸だけが細く残ります。クリムトは舟の上から望遠鏡で風景を切り取るように構図をとり、短い筆触でさざ波を一つずつ打って、水がきらめくモザイクのように見せました。'] },
  'composition-vii': { t: ['구성 VII', 'コンポジション VII'], about: [
    '칸딘스키가 전쟁 직전 뮌헨에서 그린 가장 크고 복잡한 추상화입니다. 서른 점 넘는 습작을 거쳐 사흘 반 만에 완성했고, 노아의 홍수와 최후의 심판, 부활의 이미지가 색과 선의 소용돌이 속에 녹아 있습니다. 화가는 이 그림을 "교향곡"에 비유했습니다.',
    'The largest and most complex of Kandinsky\'s abstractions, painted in Munich on the eve of the First World War. After more than thirty studies he finished it in three and a half days, and images of the Flood, the Last Judgement and the Resurrection are dissolved in its whirl of colour and line. He compared the picture to a symphony.',
    'カンディンスキーが第一次大戦直前のミュンヘンで描いた、最も大きく複雑な抽象画です。三十点を超える習作を経て三日半で完成させ、ノアの洪水や最後の審判、復活のイメージが色と線の渦の中に溶け込んでいます。画家はこの絵を「交響曲」にたとえました。'] },
  'surprised': { t: ['놀람! (열대 폭풍우 속의 호랑이)', '驚き！（熱帯の嵐の中の虎）'], about: [
    '번개가 치는 밀림에서 호랑이가 몸을 낮추고 먹잇감에 달려들 참입니다. 루소가 처음 그린 밀림 그림으로, 비스듬한 은빛 줄기로 폭우를, 겹겹이 다른 초록으로 잎을 그렸습니다. 비평가들은 어린애 같다고 비웃었지만, 이 순진한 정글은 20세기 화가들에게 새로운 문을 열어 주었습니다.',
    'In a jungle lit by lightning a tiger crouches, about to spring on its prey. Rousseau\'s first jungle painting, with slanting silver streaks for the downpour and layer upon layer of different greens for the leaves. Critics mocked it as childish, but this innocent jungle opened a new door for the painters of the twentieth century.',
    '稲妻の走る密林で虎が身を低くし、獲物に飛びかかろうとしています。ルソーが初めて描いた密林画で、斜めの銀色の筋で豪雨を、幾重にも異なる緑で葉を描きました。批評家は子どもじみていると嘲りましたが、この無垢なジャングルは20世紀の画家たちに新しい扉を開きました。'] },
  'hida-bridge': { t: ['히다와 엣추 경계의 구름다리', '飛越の堺つりはし'], about: [
    '『여러 지방의 진기한 다리 순례』 연작 중 한 장으로, 깊은 계곡 위에 걸린 구름다리를 두 사람이 짐을 지고 건너갑니다. 다리가 축 늘어진 곡선과 아래 구름, 멀리 겹친 산들이 아찔한 높이를 실감 나게 하고, 발아래를 나는 새들이 그 높이를 강조합니다.',
    'From the series "Remarkable Views of Bridges in Various Provinces": two travellers with loads cross a suspension bridge slung over a deep gorge. The sagging curve of the bridge, the clouds beneath and the layered mountains beyond make the dizzy height real, and the birds flying below their feet drive it home.',
    '『諸国名橋奇覧』の一枚で、深い谷に架かる吊り橋を荷を負った二人が渡っていきます。橋のたわんだ曲線と眼下の雲、遠くに重なる山々が目もくらむ高さを実感させ、足元を飛ぶ鳥がその高さを強調しています。'] },
  'fishing-boats': { t: ['생트마리 해변의 고깃배', 'サント＝マリーの海辺の漁船'], about: [
    '고흐가 아를에서 지중해 어촌 생트마리드라메르로 짧은 여행을 갔을 때 그린 그림입니다. 알록달록한 작은 배들이 모래 위에 끌어올려져 있고, 그는 "배들이 꽃처럼 예쁘다"고 동생에게 썼습니다. 붉은 돛대와 파란 배, 노란 모래의 밝은 색 대비가 남프랑스의 빛을 전합니다.',
    'Painted during a short trip from Arles to the Mediterranean fishing village of Saintes-Maries-de-la-Mer. Small boats in bright colours are drawn up on the sand, and van Gogh wrote to his brother that the boats were "as pretty as flowers". Red masts, blue hulls and yellow sand carry the light of the south of France.',
    'ゴッホがアルルから地中海の漁村サント＝マリー＝ド＝ラ＝メールへ短い旅に出たときに描いた絵です。色とりどりの小舟が砂の上に引き上げられ、彼は「舟が花のようにきれいだ」と弟に書きました。赤い帆柱と青い舟、黄色い砂の明るい色の対比が南仏の光を伝えます。'] },
  'regatta': { t: ['아르장퇴유의 요트 경주', 'アルジャントゥイユのレガッタ'], about: [
    '센강의 아르장퇴유에서 흰 돛단배들이 물 위에 흔들리는 그림자를 드리우며 요트 경주를 준비합니다. 물에 비친 돛과 집이 넓고 대담한 붓질로 그려져 화면의 아래 절반이 위 절반과 거울처럼 마주 봅니다. 모네가 아르장퇴유 시절에 그린 가장 경쾌한 그림 중 하나입니다.',
    'White sailing boats on the Seine at Argenteuil cast trembling reflections as they prepare to race. The mirrored sails and houses are laid in with broad, bold strokes so that the lower half of the picture answers the upper half. It is one of the most buoyant paintings of Monet\'s years at Argenteuil.',
    'セーヌ川のアルジャントゥイユで白い帆船が水面に揺れる影を落とし、レガッタの準備をしています。水に映る帆や家が広く大胆な筆致で描かれ、画面の下半分が上半分と鏡のように向き合います。モネがアルジャントゥイユ時代に描いた最も軽快な絵の一つです。'] },
  'cradle': { t: ['요람', 'ゆりかご'], about: [
    '모리조의 언니 에드마가 잠든 아기를 얇은 커튼 너머로 바라봅니다. 어머니의 시선과 아기의 자세가 대각선으로 이어지고, 투명한 흰 천을 그린 붓질이 놀랍도록 가볍습니다. 1874년 첫 인상주의 전시에 나온 유일한 여성 화가의 작품으로, 팔리지 않아 가족이 간직했습니다.',
    'Morisot\'s sister Edma gazes at her sleeping baby through a sheer curtain. The mother\'s glance and the child\'s posture link along a diagonal, and the brushwork of the transparent white cloth is astonishingly light. The only work by a woman in the first Impressionist exhibition of 1874, it found no buyer and stayed with the family.',
    'モリゾの姉エドマが薄いカーテン越しに眠る赤ん坊を見つめます。母の視線と子の姿勢が対角線でつながり、透ける白い布を描いた筆致は驚くほど軽やかです。1874年の第一回印象派展に出た唯一の女性画家の作品で、売れずに家族の手元に残りました。'] },
  'barge-haulers': { t: ['볼가강의 배 끄는 사람들', 'ヴォルガの舟曳き'], about: [
    '열한 명의 남자가 밧줄로 배를 끌며 볼가강의 모래톱을 걸어옵니다. 레핀은 실제로 볼가강에서 여름을 보내며 사람들을 만났고, 지친 노인부터 밧줄을 고쳐 매는 젊은이까지 저마다 다른 얼굴을 그렸습니다. 러시아 사실주의의 출발을 알린 그림입니다.',
    'Eleven men trudge along a sandbank of the Volga hauling a barge by rope. Repin spent a summer on the river getting to know them and gave each a different face, from the exhausted old man to the youth adjusting his strap. It announced the beginning of Russian Realism.',
    '十一人の男が綱で舟を曳きながらヴォルガ川の砂州を歩いてきます。レーピンは実際にヴォルガで夏を過ごして人々と出会い、疲れ切った老人から綱を掛け直す若者まで、それぞれ異なる顔を描きました。ロシア写実主義の出発を告げた絵です。'] },
  'pine-forest': { t: ['소나무 숲의 아침', '松林の朝'], about: [
    '안개 낀 소나무 숲에서 새끼 곰 세 마리가 쓰러진 나무 위에서 놀고 어미 곰이 지켜봅니다. 숲은 시시킨이, 곰은 친구 사비츠키가 그렸는데 사비츠키의 서명은 지워졌습니다. 러시아에서 초콜릿 포장지에 실려 모르는 사람이 없는 국민 그림이 되었습니다.',
    'Three bear cubs play on a fallen tree in a misty pine forest while their mother watches. Shishkin painted the forest and his friend Savitsky the bears, though Savitsky\'s signature was later removed. Printed on chocolate wrappers, it became a picture every Russian knows.',
    '霧の立つ松林で三頭の子熊が倒木の上で遊び、母熊が見守っています。森はシーシキンが、熊は友人サヴィツキーが描きましたが、サヴィツキーの署名は消されました。ロシアではチョコレートの包み紙に載り、知らぬ者のない国民的な絵になりました。'] },
  'golden-autumn': { t: ['황금빛 가을', '黄金の秋'], about: [
    '가을 햇살 속에 노랗게 물든 자작나무 숲 사이로 강이 굽이쳐 흐릅니다. 레비탄은 러시아 자연의 "분위기 풍경"을 그린 화가로, 이 그림의 밝은 노랑과 파랑은 그가 보기 드물게 낙관적이던 시절의 색입니다. 러시아 미술에서 가을을 대표하는 그림입니다.',
    'A river winds between birches turned gold in the autumn sun. Levitan was the painter of Russia\'s "landscapes of mood", and the bright yellows and blues here belong to a rare optimistic moment in his life. It is the picture of autumn in Russian art.',
    '秋の陽光の中、黄色に染まった白樺の林の間を川が蛇行して流れます。レヴィタンはロシアの自然の「気分の風景」を描いた画家で、この絵の明るい黄と青は彼が珍しく楽観的だった時期の色です。ロシア美術で秋を代表する絵です。'] },
  'korin-irises': { t: ['야쓰하시 붓꽃 병풍', '八橋図屏風'], about: [
    '『이세 이야기』의 주인공이 여덟 개의 다리가 놓인 붓꽃 늪에서 시를 읊는 장면을, 인물 없이 붓꽃과 다리만으로 그린 여섯 폭 병풍 한 쌍입니다. 금박 바탕에 군청과 초록만을 써서 붓꽃을 리듬처럼 반복했고, 지그재그로 뻗은 다리가 화면을 가로지릅니다. 린파 양식을 대표하는 걸작입니다.',
    'A pair of six-panel screens showing a scene from the Tales of Ise, where a poet composes verses at a marsh of irises crossed by eight bridges, painted with no figure at all, only irises and bridges. On a gold ground Kōrin used just ultramarine and green, repeating the flowers like a rhythm while the zigzag bridge cuts across. A masterpiece of the Rinpa style.',
    '『伊勢物語』の主人公が八つの橋の架かる杜若の沢で歌を詠む場面を、人物を描かず杜若と橋だけで表した六曲一双の屏風です。金地に群青と緑だけを用いて杜若をリズムのように繰り返し、ジグザグに伸びる橋が画面を横切ります。琳派を代表する傑作です。'] },
  'wind-thunder': { t: ['풍신뇌신도', '風神雷神図'], about: [
    '금박 바탕의 병풍 한 쌍 양 끝에 바람 자루를 든 풍신과 북을 두른 뇌신이 구름을 타고 마주 서 있습니다. 가운데를 텅 비워 두 신이 서로를 향해 달려드는 듯한 긴장을 만들었고, 먹을 번지게 하는 기법으로 구름을 그렸습니다. 교토 겐닌지에 전하는 국보로, 이후 화가들이 거듭 모사했습니다.',
    'At the two ends of a pair of gold screens the Wind God with his sack of wind and the Thunder God with his ring of drums face each other on clouds. Leaving the centre empty creates the tension of the two gods rushing toward each other, and the clouds are made with pooled ink. A National Treasure kept at Kennin-ji in Kyoto, copied again and again by later painters.',
    '金地の一双屏風の両端に、風袋を持つ風神と太鼓を巡らせた雷神が雲に乗って向かい合います。中央を空けることで二神が互いに飛びかかるような緊張を生み、たらし込みの技法で雲を描きました。京都・建仁寺に伝わる国宝で、後の画家たちが繰り返し模写しました。'] },
  'three-beauties': { t: ['당대의 세 미인', '当時三美人'], about: [
    '에도의 이름난 세 미인, 찻집 딸 오키타와 오히사, 게이샤 도요히나를 삼각형으로 배치한 우타마로의 대표작입니다. 얼핏 같아 보이는 얼굴이지만 눈매와 코, 눈썹이 조금씩 달라 당시 사람들은 누가 누군지 알아보았습니다. 운모 가루를 뿌린 배경이 반짝이며 인물을 돋보이게 합니다.',
    'Three celebrated beauties of Edo, the teahouse daughters Okita and Ohisa and the geisha Toyohina, arranged in a triangle in Utamaro\'s most famous print. The faces look alike at first, but eyes, noses and brows differ just enough for contemporaries to tell them apart. A background dusted with mica glitters to set off the figures.',
    '江戸の評判の三美人、茶屋の娘おきたとおひさ、芸者豊雛を三角形に配した歌麿の代表作です。一見同じに見える顔ですが目元や鼻、眉が少しずつ違い、当時の人々は誰が誰か見分けました。雲母を摺った背景がきらめいて人物を引き立てます。'] },
  'koson-crow': { t: ['우는 까마귀', '鳴く鴉'], about: [
    '눈 쌓인 가지 위에서 까마귀 한 마리가 입을 벌려 웁니다. 오하라 고손은 20세기 초 서양 수출용으로 새와 꽃 판화를 그려 유럽과 미국에서 큰 인기를 얻었고, 검은 깃털의 광택과 눈의 흰색만으로 겨울 아침의 정적을 표현했습니다.',
    'A crow on a snow-laden branch opens its beak to caw. Ohara Koson made bird-and-flower prints in the early twentieth century largely for export, winning great popularity in Europe and America, and here the sheen of black feathers and the white of snow alone convey the stillness of a winter morning.',
    '雪の積もった枝の上で一羽の鴉が口を開けて鳴いています。小原古邨は20世紀初頭に主に輸出向けの花鳥版画を制作して欧米で大きな人気を得、黒い羽の光沢と雪の白だけで冬の朝の静寂を表現しました。'] },
  'redoute-rose': { t: ['중국 장미 (『장미』 도판)', '中国薔薇（『バラ図譜』）'], about: [
    '나폴레옹의 황후 조제핀의 정원에서 장미를 그린 르두테의 『장미』 도판 중 하나입니다. 점각 동판화에 손으로 색을 입혀 꽃잎의 투명함과 잎맥까지 살렸고, 168점의 도판은 지금까지도 식물화의 정점으로 꼽힙니다. 이 중국 장미는 유럽 사계절 장미의 조상이 된 품종입니다.',
    'One of the plates from Redouté\'s "Les Roses", drawn from the rose garden of the Empress Joséphine. Stipple engraving finished by hand brought out the transparency of the petals and every vein of the leaves, and the 168 plates are still regarded as the summit of botanical art. This China rose was an ancestor of Europe\'s repeat-flowering roses.',
    'ナポレオンの皇后ジョゼフィーヌの庭園の薔薇を描いた、ルドゥーテの『バラ図譜』の図版の一つです。点刻銅版に手彩色を施して花弁の透明感や葉脈まで生かし、168点の図版は今も植物画の頂点とされます。この中国薔薇はヨーロッパの四季咲き薔薇の祖となった品種です。'] },
  'haeckel-actiniae': { t: ['말미잘 (『자연의 예술 형태』)', 'イソギンチャク（『自然の芸術的形態』）'], about: [
    '생물학자 헤켈이 1904년 펴낸 『자연의 예술 형태』 100점 도판 중 하나로, 형형색색의 말미잘을 대칭으로 배열했습니다. 과학 도감이면서 아르누보 장식 무늬처럼 보여 당시 건축가와 디자이너들에게 영감을 주었습니다. 색과 형태가 반복되어 퍼즐로 맞추기에 흥미로운 그림입니다.',
    'One of the hundred plates of "Art Forms in Nature", published by the biologist Ernst Haeckel in 1904: sea anemones in every colour arranged in symmetry. A scientific atlas that reads like Art Nouveau ornament, it inspired architects and designers of the day. The repeating colours and shapes make it an intriguing puzzle.',
    '生物学者ヘッケルが1904年に刊行した『自然の芸術的形態』百図の一枚で、色とりどりのイソギンチャクを対称に配しました。科学図鑑でありながらアール・ヌーヴォーの装飾文様のように見え、当時の建築家やデザイナーに霊感を与えました。色と形が繰り返され、パズルにすると興味深い絵です。'] },
  'blind-girl': { t: ['눈먼 소녀', '盲目の少女'], about: [
    '소나기가 지나간 들판에 쌍무지개가 떴지만, 아코디언을 안은 눈먼 거리의 소녀는 볼 수 없고 어린 동생만이 고개를 돌려 바라봅니다. 소녀는 얼굴에 닿는 햇볕과 손에 잡힌 풀잎으로 세상을 느낍니다. 밀레이는 세밀한 풍경 묘사 속에 연민을 담아 라파엘전파의 정점을 보여줍니다.',
    'A double rainbow stands over the fields after a shower, but the blind street musician clutching her concertina cannot see it; only her little sister turns to look. The girl feels the world through the sun on her face and the blade of grass in her hand. Millais joins minute landscape detail to compassion at the height of Pre-Raphaelite painting.',
    '夕立の後の野に二重の虹がかかりますが、手風琴を抱えた盲目の街の少女には見えず、幼い妹だけが振り向いて眺めます。少女は顔に当たる陽光と手に握った草の葉で世界を感じています。ミレイは細密な風景描写の中に憐れみを込め、ラファエル前派の頂点を示しました。'] },
  'proserpine': { t: ['프로세르피나', 'プロセルピナ'], about: [
    '저승의 왕에게 붙잡힌 프로세르피나가 한 입 베어 문 석류를 든 채 서 있습니다. 석류를 먹었기에 그녀는 한 해의 반을 지하 세계에서 지내야 합니다. 모델은 로세티가 사랑한 친구의 아내 제인 모리스로, 화가는 이 그림을 여덟 번이나 다시 그렸습니다. 담쟁이와 빛줄기가 되찾을 수 없는 지상을 암시합니다.',
    'Proserpine, captured by the king of the underworld, stands holding the pomegranate she has bitten: because she ate it she must spend half of every year below. The model was Jane Morris, the wife of a friend, whom Rossetti loved, and he painted the subject eight times. The ivy and the shaft of light hint at the upper world she cannot regain.',
    '冥界の王に捕らえられたプロセルピナが、一口かじった柘榴を手に立っています。柘榴を食べたために彼女は一年の半分を地下で過ごさねばなりません。モデルはロセッティが愛した友人の妻ジェーン・モリスで、画家はこの主題を八度も描きました。蔦と光の筋が、取り戻せない地上を暗示しています。'] },
  'straw-hat': { t: ['밀짚모자를 쓴 자화상', '麦わら帽子の自画像'], about: [
    '마리 앙투아네트의 초상화가였던 비제 르브룅이 팔레트를 들고 야외의 밝은 빛 속에 선 자화상입니다. 루벤스의 초상에서 영감을 받아 밀짚모자와 자연광을 택했고, 여성 화가로서 자신의 재능을 당당히 내세웠습니다. 프랑스 혁명 전 파리 사교계의 우아함이 그대로 담겨 있습니다.',
    'Vigée Le Brun, portraitist to Marie Antoinette, stands with her palette in bright outdoor light. Inspired by a portrait by Rubens she chose a straw hat and natural light, and she presents her talent as a woman painter with open confidence. The elegance of Parisian society before the Revolution is preserved intact.',
    'マリー・アントワネットの肖像画家だったヴィジェ＝ルブランが、パレットを手に戸外の明るい光の中に立つ自画像です。ルーベンスの肖像に触発されて麦わら帽と自然光を選び、女性画家としての才能を堂々と示しました。革命前のパリ社交界の優雅さがそのまま収められています。'] },
  'blue-boy': { t: ['파란 옷의 소년', '青衣の少年'], about: [
    '17세기풍 파란 새틴 옷을 입은 소년이 모자를 들고 당당히 서 있습니다. 차가운 파랑을 화면 중심에 두면 안 된다는 당시의 통념을 게인즈버러가 보란 듯이 깨뜨린 그림으로, 반다이크에게 바치는 경의이기도 합니다. 1921년 미국으로 팔려 갈 때 런던에서 9만 명이 작별 인사를 하러 줄을 섰습니다.',
    'A boy in seventeenth-century blue satin stands proudly holding his hat. Gainsborough deliberately broke the rule of the day that cold blue should never dominate a picture, and paid homage to Van Dyck at the same time. When it was sold to America in 1921, ninety thousand people queued in London to say goodbye.',
    '17世紀風の青いサテンの衣装をまとった少年が帽子を手に堂々と立っています。冷たい青を画面の中心に置いてはならないという当時の通念をゲインズバラが見せつけるように破った絵で、ヴァン・ダイクへの敬意でもあります。1921年にアメリカへ売られる際、ロンドンで九万人が別れを告げに列を作りました。'] },
  'midsummer-dance': { t: ['하지 축제의 춤', '夏至祭の踊り'], about: [
    '스웨덴 달라르나 지방의 하지 축제 밤, 마을 사람들이 붉은 집 앞에서 밤새 춤을 춥니다. 북유럽의 백야라 자정에도 하늘이 밝고, 소른은 춤추는 이들의 움직임을 흐르는 붓질로 잡아냈습니다. 소른 자신이 가장 아끼던 그림으로, 스웨덴 국민 화가의 대표작입니다.',
    'On Midsummer night in Dalarna, Sweden, villagers dance until dawn in front of a red cottage. In the Nordic white night the sky stays bright at midnight, and Zorn caught the dancers\' movement in flowing strokes. His own favourite among his works, it is the signature painting of Sweden\'s national painter.',
    'スウェーデン、ダーラナ地方の夏至祭の夜、村人たちが赤い家の前で夜通し踊ります。北欧の白夜で真夜中でも空は明るく、ソーンは踊る人々の動きを流れるような筆致でとらえました。ソーン自身が最も愛した絵で、スウェーデン国民画家の代表作です。'] },
  'skagen-evening': { t: ['스카겐 남쪽 해변의 여름 저녁', 'スケーエン南浜の夏の夕べ'], about: [
    '덴마크 최북단 스카겐의 해변을 두 여인이 팔짱을 끼고 걷습니다. 화가 안나 안케르와 크뢰위에르의 아내 마리로, 하얀 드레스가 푸른 저녁 빛에 물듭니다. 스카겐에 모인 북유럽 화가들이 사랑한 "푸른 시간"을 그린 대표작으로, 하늘과 바다가 한 색으로 이어집니다.',
    'Two women walk arm in arm along the beach at Skagen, the northern tip of Denmark: the painter Anna Ancher and Krøyer\'s wife Marie, their white dresses tinted by the blue evening light. It is the classic image of the "blue hour" beloved by the Scandinavian painters who gathered at Skagen, with sky and sea merging into one colour.',
    'デンマーク最北端スケーエンの浜辺を二人の女が腕を組んで歩きます。画家アンナ・アンカーとクロイヤーの妻マリーで、白いドレスが青い夕暮れの光に染まります。スケーエンに集った北欧の画家たちが愛した「青の時間」を描いた代表作で、空と海が一つの色につながっています。'] },
  'hip-hip-hurrah': { t: ['힙, 힙, 후라!', 'ヒップ・ヒップ・フラー！'], about: [
    '스카겐에 모인 화가들과 가족이 정원 식탁에서 잔을 높이 들고 환호합니다. 잎사귀 사이로 쏟아지는 햇빛이 흰 식탁보와 샴페인 잔에 부서지고, 아이를 안은 안나 안케르가 오른쪽에 앉아 있습니다. 크뢰위에르가 4년에 걸쳐 완성한 스카겐 화가 공동체의 초상입니다.',
    'The painters gathered at Skagen and their families raise their glasses at a garden table. Sunlight pouring through the leaves breaks over the white cloth and the champagne glasses, and Anna Ancher sits at the right with her child. Krøyer took four years to finish this portrait of the Skagen artists\' colony.',
    'スケーエンに集った画家たちとその家族が、庭の食卓で杯を高く掲げて歓声を上げます。葉の間から注ぐ陽光が白いテーブルクロスとシャンパングラスに砕け、子を抱いたアンナ・アンカーが右に座っています。クロイヤーが四年をかけて完成させた、スケーエン画家村の肖像です。'] },
  'hammershoi-interior': { t: ['등을 돌린 여인이 있는 실내', '後ろ姿の女のいる室内'], about: [
    '코펜하겐 아파트의 텅 빈 방에서 검은 옷의 여인이 등을 돌린 채 서 있습니다. 여인은 화가의 아내 이다로, 함메르쇠이는 회색과 흰색의 미묘한 단계만으로 방의 정적을 그렸습니다. 문과 벽, 탁자의 직선이 만드는 고요한 구성은 100년 뒤 영화감독과 디자이너들에게 재발견되었습니다.',
    'In an empty room of a Copenhagen flat a woman in black stands with her back to us. She is the painter\'s wife Ida, and Hammershøi paints the silence of the room with nothing but subtle gradations of grey and white. The quiet geometry of door, wall and table was rediscovered a century later by film-makers and designers.',
    'コペンハーゲンのアパートの空っぽの部屋で、黒衣の女が背を向けて立っています。女は画家の妻イーダで、ハンマースホイは灰色と白の微妙な階調だけで部屋の静寂を描きました。扉と壁、卓の直線が作る静かな構成は、百年後に映画監督やデザイナーたちに再発見されました。'] },
};

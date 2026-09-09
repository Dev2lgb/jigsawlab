// 진열대 앞줄에 세울 대표작(인기 순). 홈·플레이 선택 화면은 카테고리마다 여기 순서대로 10점을 먼저 보여주고, 나머지는 '더보기'로 펼친다.
// 여기 없는 작품은 원래 순서 그대로 뒤에 이어진다. 키·카테고리가 틀리면 빌드가 실패한다(works.ts 에서 검증)
export const POPULAR: Record<string, string[]> = {
  masters: ['starry', 'mona', 'wave', 'pearl', 'kiss', 'scream', 'sunflowers', 'venus', 'night-watch', 'galette'],
  landscape: ['wheatfield-crows', 'water-lily-pond', 'poppy-field', 'hay-wain', 'sainte-victoire', 'rain-steam-speed', 'magpie', 'harvesters', 'oxbow', 'golden-autumn'],
  sea: ['temeraire', 'ninth-wave', 'sainte-adresse', 'breezing-up', 'storm-galilee', 'fishing-boats', 'regatta', 'sorolla-seashore', 'skagen-evening', 'monet-cliff-walk-pourville'],
  city: ['montmartre-night', 'rouen-cathedral', 'little-street', 'canaletto-grand-canal', 'san-giorgio', 'monet-arrival-normandy-train', 'monet-waterloo-bridge', 'guardi-grand-canal', 'hassam-new-york-street', 'monet-charing-cross-bridge'],
  people: ['bougival', 'umbrellas', 'angelus', 'cradle', 'blue-armchair', 'proverbs', 'peasant-wedding', 'hip-hip-hurrah', 'barge-haulers', 'seurat-circus'],
  portrait: ['laughing-cavalier', 'blue-boy', 'straw-hat', 'watering-can', 'proserpine', 'vertumnus', 'rembrandt-old-man-gold', 'gogh-madame-roulin-rocking', 'modigliani-madam-pompadour', 'cezanne-madame-cezanne'],
  still: ['farm-garden', 'basket-fruit', 'cezanne-basket-apples', 'bosschaert-bouquet', 'gogh-grapes', 'redoute-rose', 'fantin-latour-roses-bowl', 'renoir-chrysanthemums', 'chardin-white-tablecloth', 'redon-still-life-flowers'],
  animal: ['surprised', 'pine-forest', 'audubon-flamingo', 'delacroix-lion-hunt', 'koson-crow', 'jakuchu-red-parrot-branch', 'geungjae-pajeok', 'bonheur-cattle-rest-hillside', 'kunisada-crouching-tiger', 'hokusai-chrysanthemum-horsefly'],
  pets: ['wain-psychedelic-cat', 'reichert-four-graces', 'ronner-cat-three-kittens', 'barber-girl-sheltie', 'adam-four-kittens', 'wain-gothic-cat', 'barber-family-of-pugs', 'reichert-kittens-frog', 'aldin-hounds-chorus', 'kuniyoshi-cats-catfish'],
  tale: ['bauer-tuvstarr', 'hughes-midsummer-eve', 'hughes-night-train-stars', 'sterrett-white-palace', 'fitzgerald-fairies-favourite', 'bauer-knight-rode', 'robinson-russian-princess', 'sterrett-good-doe', 'goble-swans', 'clarke-butterfly-design'],
  ukiyoe: ['redfuji', 'shower', 'plum-garden', 'three-beauties', 'wind-thunder', 'korin-irises', 'kajikazawa', 'ejiri', 'hida-bridge', 'hokusai-shower-below-summit'],
  korean: ['ssireum', 'dano', 'jeongseon-inwang', 'hyewon-wolha', 'danwon-seodang', 'minhwa-tiger-magpie', 'mudong', 'irworobongdo', 'jeongseon-geumgang', 'hyewon-ssanggeom'],
  photo: ['pc-eiffel', 'pc-venice', 'pc-neuschwanstein', 'pc-matterhorn', 'pc-colosseum', 'pc-mont-saint-michel', 'pc-niagara', 'pc-alhambra', 'pc-pisa', 'pc-tower-bridge'],
  space: ['sp-pillars', 'sp-earthrise', 'sp-blue-marble', 'sp-cosmic-cliffs', 'sp-saturn', 'sp-orion', 'sp-whirlpool', 'sp-aldrin', 'sp-crab', 'sp-sombrero'],
  poster: ['mucha-job', 'mucha-zodiac', 'toulouse-lautrec-englishman-moulin-rouge', 'cheret-palais-de-glace', 'bonnard-france-champagne', 'toulouse-lautrec-jockey', 'toulouse-lautrec-concert', 'toulouse-lautrec-elsa', 'penfield-will-you-help', 'toulouse-lautrec-photographer-sescau'],
  pattern: ['morris-snakeshead', 'morris-peacock-dragon', 'morris-acanthus', 'morris-windrush', 'morris-tulip-rose', 'haeckel-actiniae', 'morris-corncockle', 'morris-oak', 'morris-tulip', 'morris-swan-house-carpet'],
  modern: ['munch-madonna', 'composition-vii', 'munch-sun', 'mondrian-lozenge-composition-yellow', 'matisse-woman-before-aquarium', 'marc-bewitched-mill', 'munch-girl-by-window', 'matisse-still-life-geranium', 'matisse-woman-rose-divan', 'mondrian-farm-near-duivendrecht'],
};
/** 진열대에서 처음에 보여줄 개수 */
export const SHELF_TOP = 10;

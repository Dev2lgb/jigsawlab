// 1단계(AIC): Art Institute of Chicago API(CC0)에서 카테고리별 후보 수집 → scripts/met/aic-candidates.json + 컨택트 시트
import { writeFileSync } from 'node:fs';
const H = { 'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/128 Safari/537.36', 'AIC-User-Agent': 'jigsawlab catalog builder (seabow2@nate.com)', 'content-type': 'application/json' };
const FIELDS = 'id,title,artist_title,date_display,date_start,medium_display,image_id,classification_title,artwork_type_title,place_of_origin,department_title,is_public_domain,is_boosted,thumbnail,short_description,description,credit_line,style_title,subject_titles,color';
const CATS = {
  landscape: { artists: ['Claude Monet', 'Paul Cézanne', 'Camille Pissarro', 'Alfred Sisley', 'Jean-Baptiste-Camille Corot', 'John Constable', 'Joseph Mallord William Turner', 'Vincent van Gogh', 'Paul Gauguin', 'Georges Seurat', 'Gustave Caillebotte', 'Jacob van Ruisdael', 'Frederic Edwin Church', 'George Inness', 'Théodore Rousseau', 'Charles-François Daubigny'], types: ['Painting'] },
  still: { artists: ['Henri Fantin-Latour', 'Jean-Siméon Chardin', 'Paul Cézanne', 'Édouard Manet', 'Odilon Redon', 'Pierre-Auguste Renoir', 'Vincent van Gogh', 'Paul Gauguin', 'Gustave Courbet', 'Eugène Delacroix'], q: 'still life flowers fruit', types: ['Painting'] },
  sea: { artists: ['Winslow Homer', 'Eugène Boudin', 'James McNeill Whistler', 'Claude Monet', 'Gustave Courbet', 'Johan Barthold Jongkind', 'Édouard Manet', 'John Singer Sargent', 'Joseph Mallord William Turner'], q: 'sea beach boat harbor coast', types: ['Painting'] },
  city: { artists: ['Canaletto', 'Francesco Guardi', 'Camille Pissarro', 'Gustave Caillebotte', 'Childe Hassam', 'Claude Monet', 'Pierre-Auguste Renoir', 'Édouard Manet', 'Edgar Degas', 'Henri de Toulouse-Lautrec'], q: 'street Paris city bridge', types: ['Painting'] },
  portrait: { artists: ['Pierre-Auguste Renoir', 'John Singer Sargent', 'Edgar Degas', 'Mary Cassatt', 'Rembrandt van Rijn', 'Frans Hals', 'Jean-Auguste-Dominique Ingres', 'Amedeo Modigliani', 'Berthe Morisot', 'Vincent van Gogh', 'Paul Gauguin', 'El Greco', 'Diego Velázquez'], types: ['Painting'] },
  animal: { artists: ['Henri Rousseau', 'Eugène Delacroix', 'Rosa Bonheur', 'Franz Marc', 'Utagawa Hiroshige', 'Katsushika Hokusai', 'Ohara Koson', 'Jean-Baptiste Oudry', 'Frans Snyders'], q: 'animal bird horse tiger cat dog fish', types: ['Painting', 'Print'] },
  ukiyoe: { artists: ['Utagawa Hiroshige', 'Katsushika Hokusai', 'Kitagawa Utamaro', 'Utagawa Kuniyoshi', 'Utagawa Kunisada', 'Keisai Eisen', 'Suzuki Harunobu', 'Torii Kiyonaga', 'Kawase Hasui', 'Yoshida Hiroshi'], types: ['Print'] },
  poster: { artists: ['Henri de Toulouse-Lautrec', 'Jules Chéret', 'Alphonse Mucha', 'Théophile-Alexandre Steinlen', 'Pierre Bonnard', 'Eugène Grasset', 'Edward Penfield', 'William H. Bradley', 'Leonetto Cappiello', 'Ludwig Hohlwein'], q: 'poster lithograph', types: ['Print'] },
  pattern: { artists: ['William Morris', 'Owen Jones', 'Christopher Dresser', 'Walter Crane', 'Koloman Moser', 'Josef Hoffmann', 'Candace Wheeler'], q: 'textile wallpaper pattern design ornament', types: ['Textile', 'Print', 'Drawing and Watercolor', 'Furniture'] },
  photo: { artists: ['Eugène Atget', 'Carleton Watkins', 'Timothy O\'Sullivan', 'Alfred Stieglitz', 'Edward Steichen', 'William Henry Jackson', 'Gertrude Käsebier', 'Julia Margaret Cameron'], types: ['Photograph'] },
  asia: { artists: ['Ito Jakuchu', 'Ogata Korin', 'Sakai Hoitsu', 'Maruyama Okyo', 'Kano', 'Qian Xuan', 'Shen Zhou', 'Wen Zhengming', 'Tawaraya Sotatsu'], q: 'screen scroll flowers birds japanese chinese painting', types: ['Painting', 'Print', 'Drawing and Watercolor'] },
  modern: { artists: ['Wassily Kandinsky', 'Paul Klee', 'Piet Mondrian', 'Robert Delaunay', 'Sonia Delaunay', 'Kazimir Malevich', 'Juan Gris', 'Georges Braque', 'Fernand Léger', 'Egon Schiele', 'Gustav Klimt', 'Edvard Munch', 'Henri Matisse'], types: ['Painting', 'Print', 'Drawing and Watercolor'] },
  american: { artists: ['Winslow Homer', 'Grant Wood', 'Edward Hopper', 'Georgia O\'Keeffe', 'Thomas Cole', 'Albert Bierstadt', 'Mary Cassatt', 'James McNeill Whistler', 'John Singer Sargent', 'Childe Hassam', 'Ivan Albright', 'Archibald Motley'], types: ['Painting'] },
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function search(artist, q) {
  const body = { fields: FIELDS.split(','), limit: 40, query: { bool: { must: [{ term: { is_public_domain: true } }, { match_phrase: { artist_title: artist } }], should: q ? [{ match: { title: q } }, { match: { subject_titles: q } }] : [], boost: 1 } }, sort: [{ is_boosted: 'desc' }, { _score: 'desc' }] };
  for (let i = 0; i < 3; i++) { try { const r = await fetch('https://api.artic.edu/api/v1/artworks/search', { method: 'POST', headers: H, body: JSON.stringify(body) }); if (r.ok) return (await r.json()).data; } catch {} await sleep(1000); }
  return [];
}
const out = {};
for (const [cat, cfg] of Object.entries(CATS)) {
  out[cat] = []; const seen = new Set();
  for (const artist of cfg.artists) {
    const list = await search(artist, cfg.q); let got = 0;
    for (const a of list) {
      if (got >= 10) break;
      if (!a.image_id || !a.is_public_domain || seen.has(a.id)) continue;
      const w = a.thumbnail?.width ?? 0, h = a.thumbnail?.height ?? 0; if (w < 1400 || h < 900) continue; const asp = w / h; if (asp < 0.55 || asp > 1.9) continue;
      if (cfg.types && !cfg.types.includes(a.artwork_type_title)) continue;
      if (/fragment|study for|sketch|verso|detail|plate \d|copy after/i.test(a.title)) continue;
      seen.add(a.id); got++;
      out[cat].push({ id: a.id, cat, title: a.title, artist: a.artist_title, date: a.date_display, year: a.date_start, medium: a.medium_display, type: a.artwork_type_title, cls: a.classification_title, origin: a.place_of_origin, dept: a.department_title, credit: a.credit_line, boosted: !!a.is_boosted, w, h, img: a.image_id, desc: (a.description || a.short_description || '').replace(/<[^>]+>/g, '').slice(0, 900), style: a.style_title, subjects: (a.subject_titles || []).slice(0, 6) });
    }
    process.stdout.write(`${cat}/${artist}: ${got}\n`); await sleep(250);
  }
}
writeFileSync('scripts/met/aic-candidates.json', JSON.stringify(out, null, 1));
const T = (id) => `https://www.artic.edu/iiif/2/${id}/full/400,/0/default.jpg`;
for (const [cat, list] of Object.entries(out)) {
  const html = `<!doctype html><meta charset=utf-8><style>body{margin:0;background:#111;color:#eee;font:11px sans-serif}.g{display:grid;grid-template-columns:repeat(8,1fr);gap:4px;padding:4px}.c{background:#222;padding:3px}.c img{width:100%;aspect-ratio:1;object-fit:cover;display:block}.c div{height:2.6em;overflow:hidden;line-height:1.3}b{color:#ffd54a}i{color:#7fd}</style><h2 style="margin:6px">${cat} (${list.length})</h2><div class=g>${list.map((o, i) => `<div class=c><img src="${T(o.img)}" loading="lazy"><div><b>${i}</b>${o.boosted ? '<i>★</i>' : ''} ${(o.artist || '').split(' ').pop()} · ${o.title.slice(0, 40)}</div></div>`).join('')}</div>`;
  writeFileSync(`scripts/met/sheet-aic-${cat}.html`, html);
}
console.log('total', Object.values(out).reduce((a, b) => a + b.length, 0));

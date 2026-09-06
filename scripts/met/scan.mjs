// 1단계: Met Open Access(CC0)에서 카테고리별 작가·주제로 후보를 모아 met-candidates.json + 컨택트 시트(HTML) 생성
//   node scripts/met/scan.mjs  → scripts/met/candidates.json, scripts/met/sheet-<cat>.html
import { writeFileSync, mkdirSync } from 'node:fs';
const API = 'https://collectionapi.metmuseum.org/public/collection/v1';
const CATS = {
  landscape: { artists: ['Claude Monet', 'Paul Cézanne', 'Camille Pissarro', 'Alfred Sisley', 'Camille Corot', 'John Constable', 'Joseph Mallord William Turner', 'Albert Bierstadt', 'Frederic Edwin Church', 'Thomas Cole', 'Meindert Hobbema', 'Jacob van Ruisdael', 'Vincent van Gogh', 'Paul Gauguin', 'Sanford Robinson Gifford', 'George Inness'], cls: ['Paintings'] },
  still: { artists: ['Henri Fantin-Latour', 'Jean Siméon Chardin', 'Paul Cézanne', 'Édouard Manet', 'Odilon Redon', 'Jan van Huysum', 'Rachel Ruysch', 'Ambrosius Bosschaert', 'Pierre-Auguste Renoir', 'Vincent van Gogh', 'Severin Roesen', 'Raphaelle Peale'], q: 'still life flowers', cls: ['Paintings'] },
  sea: { artists: ['Winslow Homer', 'Eugène Boudin', 'James McNeill Whistler', 'Fitz Henry Lane', 'William Bradford', 'Claude Monet', 'Willem van de Velde', 'Ivan Aivazovsky', 'Martin Johnson Heade', 'Gustave Courbet'], q: 'sea ship boat', cls: ['Paintings'] },
  city: { artists: ['Canaletto', 'Francesco Guardi', 'Camille Pissarro', 'Gustave Caillebotte', 'Bernardo Bellotto', 'Childe Hassam', 'Claude Monet', 'Jean Béraud', 'John Sloan', 'George Bellows'], q: 'street city view', cls: ['Paintings'] },
  portrait: { artists: ['Pierre-Auguste Renoir', 'John Singer Sargent', 'Edgar Degas', 'Mary Cassatt', 'Johannes Vermeer', 'Rembrandt', 'Frans Hals', 'Jean Auguste Dominique Ingres', 'Bronzino', 'Amedeo Modigliani', 'Gustav Klimt', 'Élisabeth Louise Vigée Le Brun', 'Jacques Louis David', 'Berthe Morisot'], cls: ['Paintings'] },
  animal: { artists: ['George Stubbs', 'Rosa Bonheur', 'Edwin Landseer', 'Henri Rousseau', 'Eugène Delacroix', 'Melchior d\'Hondecoeter', 'Jean-Baptiste Oudry', 'Franz Marc', 'John James Audubon', 'Utagawa Hiroshige'], q: 'animal bird horse dog cat', cls: ['Paintings', 'Prints'] },
  ukiyoe: { artists: ['Utagawa Hiroshige', 'Katsushika Hokusai', 'Kitagawa Utamaro', 'Utagawa Kuniyoshi', 'Utagawa Kunisada', 'Keisai Eisen', 'Suzuki Harunobu', 'Torii Kiyonaga'], cls: ['Prints', 'Woodblock prints', 'Prints|Woodblock'] },
  poster: { artists: ['Henri de Toulouse-Lautrec', 'Jules Chéret', 'Alphonse Mucha', 'Théophile-Alexandre Steinlen', 'Pierre Bonnard', 'Eugène Grasset', 'Edward Penfield', 'Will Bradley', 'Leonetto Cappiello'], q: 'poster', cls: ['Prints', 'Posters'] },
  pattern: { artists: ['William Morris', 'Owen Jones', 'Christopher Dresser', 'Walter Crane', 'Koloman Moser', 'Anonymous'], q: 'wallpaper textile pattern design', cls: ['Textiles', 'Wallpapers', 'Prints', 'Drawings', 'Textiles-Printed', 'Textiles-Woven', 'Books'] },
  photo: { artists: ['Eugène Atget', 'Carleton E. Watkins', 'Timothy H. O\'Sullivan', 'Alfred Stieglitz', 'Frances Benjamin Johnston', 'Edward Steichen', 'William Henry Jackson', 'Gertrude Käsebier'], cls: ['Photographs'] },
  asia: { artists: ['Qian Xuan', 'Shen Zhou', 'Ito Jakuchu', 'Ogata Korin', 'Sakai Hoitsu', 'Maruyama Okyo', 'Kano', 'Rimpa'], q: 'screen scroll painting flowers birds', cls: ['Paintings', 'Screens', 'Hanging scrolls', 'Handscrolls'] },
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = { headers: { 'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) jigsawlab-catalog-builder' } };
async function j(u) { for (let i = 0; i < 4; i++) { try { await sleep(180); const r = await fetch(u, UA); if (r.ok) return await r.json(); if (r.status === 404) return null; if (r.status === 403) { process.stdout.write('[403 대기]'); await sleep(30000); continue; } } catch {} await sleep(800); } return null; }
const out = {};
for (const [cat, cfg] of Object.entries(CATS)) {
  out[cat] = []; const seen = new Set();
  for (const artist of cfg.artists) {
    const s = await j(`${API}/search?isPublicDomain=true&hasImages=true&artistOrCulture=true&q=${encodeURIComponent(artist)}`);
    const ids = (s?.objectIDs ?? []).slice(0, 30);
    let got = 0;
    for (const id of ids) {
      if (got >= 8) break; if (seen.has(id)) continue; seen.add(id);
      const o = await j(`${API}/objects/${id}`); if (!o || !o.isPublicDomain || !o.primaryImage) continue;
      if (cfg.cls && !cfg.cls.some((c) => (o.classification || '').startsWith(c))) continue;
      if (/fragment|study|sketch|verso|detail/i.test(o.title)) continue;
      out[cat].push({ id, cat, title: o.title, artist: o.artistDisplayName, date: o.objectDate, medium: o.medium, cls: o.classification, dept: o.department, credit: o.creditLine, url: o.objectURL, img: o.primaryImage, small: o.primaryImageSmall });
      got++;
    }
    process.stdout.write(`${cat}/${artist}: ${got}\n`);
  }
}
mkdirSync('scripts/met', { recursive: true });
writeFileSync('scripts/met/candidates.json', JSON.stringify(out, null, 1));
for (const [cat, list] of Object.entries(out)) {
  const html = `<!doctype html><meta charset=utf-8><style>body{margin:0;background:#111;color:#eee;font:11px sans-serif}.g{display:grid;grid-template-columns:repeat(8,1fr);gap:4px;padding:4px}.c{background:#222;padding:3px}.c img{width:100%;aspect-ratio:1;object-fit:cover;display:block}.c div{height:2.6em;overflow:hidden;line-height:1.3}b{color:#ffd54a}</style><h2 style="margin:6px">${cat} (${list.length})</h2><div class=g>${list.map((o, i) => `<div class=c><img src="${o.small}" loading="lazy"><div><b>${i}</b> ${o.artist.split(' ').pop()} · ${o.title.slice(0, 40)}</div></div>`).join('')}</div>`;
  writeFileSync(`scripts/met/sheet-${cat}.html`, html);
}
console.log('total', Object.values(out).reduce((a, b) => a + b.length, 0));

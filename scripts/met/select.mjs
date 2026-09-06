// 2단계: 컨택트 시트에서 고른 [시트, 번호, 최종 카테고리] → 실제 후보 객체로 해석 → selected.json
import { readFileSync, writeFileSync } from 'node:fs';
const C = JSON.parse(readFileSync('scripts/met/aic-candidates.json', 'utf8'));
const PICK = {
  landscape: [[0,'landscape'],[1,'landscape'],[2,'city'],[3,'sea'],[4,'sea'],[5,'landscape'],[6,'landscape'],[7,'landscape'],[9,'landscape'],[10,'still'],[11,'sea'],[12,'portrait'],[13,'landscape'],[14,'still'],[16,'still'],[20,'city'],[21,'city'],[22,'people'],[24,'landscape'],[26,'landscape'],[27,'landscape'],[29,'landscape'],[30,'landscape'],[31,'city'],[33,'landscape'],[34,'landscape'],[41,'landscape'],[42,'city'],[45,'landscape'],[48,'sea'],[50,'masters'],[51,'masters'],[52,'landscape'],[55,'landscape'],[56,'portrait'],[57,'city'],[58,'still'],[60,'people'],[61,'portrait'],[62,'masters'],[63,'people'],[64,'people'],[65,'landscape'],[70,'masters'],[73,'landscape'],[74,'landscape'],[75,'landscape'],[77,'landscape'],[78,'landscape'],[79,'landscape'],[89,'landscape']],
  still: [[0,'still'],[1,'still'],[3,'still'],[4,'still'],[14,'still'],[15,'portrait'],[18,'people'],[19,'sea'],[21,'portrait'],[22,'still'],[23,'still'],[24,'masters'],[25,'people'],[26,'still'],[27,'still'],[28,'portrait'],[29,'portrait'],[30,'people'],[31,'sea'],[32,'people'],[33,'portrait'],[53,'portrait'],[54,'landscape'],[58,'sea'],[61,'animal'],[62,'animal'],[63,'animal']],
  sea: [[0,'sea'],[1,'people'],[4,'people'],[6,'sea'],[9,'sea'],[17,'sea'],[18,'sea'],[19,'sea'],[31,'sea'],[33,'city'],[42,'masters'],[43,'portrait'],[46,'portrait'],[48,'portrait'],[51,'landscape'],[52,'sea']],
  city: [[0,'city'],[1,'city'],[2,'city'],[3,'city'],[4,'city'],[18,'city'],[19,'landscape'],[20,'sea'],[21,'landscape'],[22,'city'],[28,'city'],[29,'city'],[42,'portrait'],[51,'people'],[55,'portrait'],[58,'masters'],[59,'people'],[60,'people'],[61,'people'],[63,'people']],
  portrait: [[27,'masters'],[28,'portrait'],[29,'portrait'],[30,'portrait'],[31,'portrait'],[32,'portrait'],[33,'portrait'],[34,'people'],[35,'portrait'],[37,'portrait'],[38,'portrait'],[39,'portrait'],[40,'portrait'],[41,'people'],[42,'portrait'],[43,'landscape'],[64,'masters']],
  animal: [[0,'landscape'],[3,'animal'],[5,'animal'],[12,'animal'],[13,'modern'],[35,'animal']],
  ukiyoe: [[0,'ukiyoe'],[1,'ukiyoe'],[2,'ukiyoe'],[3,'ukiyoe'],[4,'ukiyoe'],[5,'ukiyoe'],[6,'ukiyoe'],[7,'ukiyoe'],[8,'ukiyoe'],[9,'ukiyoe'],[12,'ukiyoe'],[14,'ukiyoe'],[15,'ukiyoe'],[19,'animal'],[21,'ukiyoe'],[26,'ukiyoe'],[29,'ukiyoe'],[30,'ukiyoe'],[31,'ukiyoe'],[36,'ukiyoe'],[39,'ukiyoe'],[40,'ukiyoe'],[44,'animal'],[47,'ukiyoe'],[48,'ukiyoe'],[49,'ukiyoe'],[51,'ukiyoe'],[53,'ukiyoe'],[54,'ukiyoe'],[55,'ukiyoe'],[57,'ukiyoe'],[59,'ukiyoe'],[60,'ukiyoe'],[62,'ukiyoe'],[63,'ukiyoe'],[72,'ukiyoe'],[75,'ukiyoe'],[76,'ukiyoe'],[78,'ukiyoe']],
  poster: [[1,'poster'],[5,'poster'],[6,'poster'],[7,'poster'],[9,'poster'],[10,'poster'],[11,'poster'],[12,'poster'],[14,'poster']],
  pattern: [[0,'pattern'],[1,'pattern'],[2,'pattern'],[3,'pattern'],[5,'pattern'],[6,'pattern'],[7,'pattern'],[8,'pattern'],[9,'pattern'],[10,'pattern']],
  modern: [[0,'modern'],[1,'modern'],[9,'modern'],[14,'modern'],[19,'modern'],[20,'modern'],[21,'modern'],[22,'modern']],
  american: [[5,'landscape'],[6,'landscape'],[7,'landscape']],
  asia: [[0,'animal']],
};
const byId = new Map(); const order = [];
for (const [sheet, list] of Object.entries(PICK)) for (const [i, cat] of list) { const o = C[sheet][i]; if (!o) { console.log('missing', sheet, i); continue; } if (byId.has(o.id)) continue; byId.set(o.id, { ...o, cat }); order.push(o.id); }
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const used = new Set(readFileSync('src/lib/jigsaw.ts', 'utf8').match(/key: '([a-z]+)'/g).map((m) => m.slice(6, -1)));
const sel = order.map((id) => { const o = byId.get(id); const last = slug((o.artist || 'anon').split(' ').pop()); let words = slug(o.title.replace(/\(.*?\)/g, '').split(/[:,—-]/)[0]).split('-').filter((w) => w && !['the', 'of', 'a', 'an', 'and', 'at', 'in', 'on', 'from', 'with', 'no'].includes(w)).slice(0, 3).join('-'); let key = `${last}-${words}`.slice(0, 40).replace(/-$/, ''); let k = key, n = 2; while (used.has(k)) k = `${key}-${n++}`; used.add(k); return { key: k, ...o }; });
writeFileSync('scripts/met/selected.json', JSON.stringify(sel, null, 1));
const cnt = {}; for (const s of sel) cnt[s.cat] = (cnt[s.cat] || 0) + 1; console.log(sel.length, cnt);

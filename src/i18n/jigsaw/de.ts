// de — 판·고르는 화면 문구 + SEO 본문. 모양은 ko.ts 의 JigsawStrings 를 따른다
import type { JigsawStrings } from './ko';
export const DE: JigsawStrings = {
  title: 'Was puzzeln wir?', sub: 'Das Tagespuzzle, ein eigenes Foto oder eines von unten.',
  seoTitle: 'Kostenlose Online-Puzzles — 518 Bilder zur Auswahl', boardTitle: 'Puzzlebrett', seoDesc: 'Kostenlos online puzzeln, ohne Anmeldung. 518 Gemälde, koreanische Kunst und Aufnahmen aus dem All — oder dein eigenes Bild. Von 48 bis 1000 Teile. Mit einem Link gemeinsam lösen.',
  pick: 'Mein Foto auswählen', drop: 'Foto hierher ziehen oder tippen zum Auswählen', daily: 'Tagespuzzle', dailyCap: (title: string, n: number) => `${title} · ${n} Teile`, gallery: 'Puzzle aussuchen', pieces: 'Teile', custom: 'Eigene Zahl', gridLabel: (c: number, r: number, n: number) => `${c}×${r} = ${n} Teile`, noImg: 'Wähl zuerst ein Foto oder ein Gemälde', chosen: 'Ausgewähltes Bild', myPhoto: 'Mein Foto',
  start: 'Los', privacy: 'Dein Foto verlässt dein Gerät nie', loading: 'Teile werden geschnitten…', opening: 'Puzzle wird geöffnet…', saveGone: 'Dieses gespeicherte Puzzle gibt es nicht mehr',
  time: 'Zeit', moves: 'Gelegt', left: (n: number) => `noch ${n} Teile`, edgeOnly: 'Nur Randteile', hint: 'Bild schwach einblenden', original: 'Ganzes Bild ansehen', zoomIn: 'Heranzoomen', zoomOut: 'Herauszoomen', fit: 'Einpassen', trayHint: 'Zieh Teile aus der Ablage nach oben an ihren Platz. Zum Zoomen aufziehen, mit zwei Fingern verschieben',
  viewResult: 'Ergebnis ansehen', done: 'Fertig!', resTime: 'Zeit', resPieces: 'Teile', resMoves: 'Züge', best: (s: string) => `Deine Bestzeit: ${s}`, newBest: 'Neuer Rekord!', retry: 'Dasselbe Foto noch einmal', another: 'Anderes Puzzle', toTitle: 'Zurück zum Anfang',
  share: 'Ergebnis teilen', shareTitle: (n: number, t: string) => `${n}-Teile-Puzzle in ${t} gelöst! 🧩`, shareText: 'Du bist dran 🧩', shareDaily: (n: number, t: string, title: string) => `Tagespuzzle „${title}“, ${n} Teile in ${t}! 🧩 Schaffst du das schneller?`,
  imgFail: 'Dieses Bild ließ sich nicht öffnen. Bitte nimm ein JPG-, PNG- oder HEIC-Foto', paintingBy: (t: string, a: string, y: string) => `${t} — ${a}, ${y}`,
};

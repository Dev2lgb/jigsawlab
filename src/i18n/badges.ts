// 업적·레벨 구간 문구 — 언어 순서는 i18n/ui 의 LI(ko·en·ja·de·es). 코드와 조건은 lib/level.ts.
// Penta 로 묶여 있어 언어를 늘리면 여기 빠진 줄을 astro check 가 전부 짚어 준다
import type { Penta } from './langs';
export type Tri = Penta;

/** 레벨 구간 이름 — lib/level.ts 의 TIERS(1·5·10·20·30·45·60) 와 같은 순서 */
export const TIER_NAMES: Tri[] = [
  ['퍼즐 입문', 'Newcomer', 'はじめて', 'Neuling', 'Principiante'],
  ['퍼즐러', 'Puzzler', 'パズラー', 'Puzzler', 'Aficionado'],
  ['조각 사냥꾼', 'Piece Hunter', 'ピースハンター', 'Teilejäger', 'Cazapiezas'],
  ['판의 달인', 'Board Master', '盤の達人', 'Brettmeister', 'Maestro del tablero'],
  ['직소 장인', 'Jigsaw Artisan', 'ジグソー職人', 'Puzzle-Handwerker', 'Artesano del puzle'],
  ['직소 명인', 'Jigsaw Virtuoso', 'ジグソー名人', 'Puzzle-Virtuose', 'Virtuoso del puzle'],
  ['직소랩 마스터', 'jigsawlab Master', 'ジグソーラボ・マスター', 'jigsawlab-Meister', 'Maestro de jigsawlab'],
];

export const BADGE_TEXT: Record<string, { n: Tri; d: Tri }> = {
  first: { n: ['첫 조각', 'First Piece', 'はじめの一片', 'Erstes Teil', 'Primera pieza'], d: ['퍼즐 한 판을 끝까지 맞췄어요', 'Finish your first puzzle', 'パズルを1枚完成させる', 'Schließ dein erstes Puzzle ab', 'Termina tu primer rompecabezas'] },
  solve10: { n: ['열 판', 'Ten Boards', '10枚', 'Zehn Bretter', 'Diez tableros'], d: ['퍼즐 10판 완성', 'Finish 10 puzzles', 'パズルを10枚完成させる', '10 Puzzles lösen', 'Termina 10 rompecabezas'] },
  solve50: { n: ['쉰 판', 'Fifty Boards', '50枚', 'Fünfzig Bretter', 'Cincuenta tableros'], d: ['퍼즐 50판 완성', 'Finish 50 puzzles', 'パズルを50枚完成させる', '50 Puzzles lösen', 'Termina 50 rompecabezas'] },
  solve100: { n: ['백 판', 'A Hundred Boards', '100枚', 'Hundert Bretter', 'Cien tableros'], d: ['퍼즐 100판 완성', 'Finish 100 puzzles', 'パズルを100枚完成させる', '100 Puzzles lösen', 'Termina 100 rompecabezas'] },
  solve500: { n: ['오백 판', 'Five Hundred', '500枚', 'Fünfhundert', 'Quinientos'], d: ['퍼즐 500판 완성', 'Finish 500 puzzles', 'パズルを500枚完成させる', '500 Puzzles lösen', 'Termina 500 rompecabezas'] },
  p300: { n: ['300조각', '300 Pieces', '300ピース', '300 Teile', '300 piezas'], d: ['한 판에서 300조각 이상', 'Finish a 300-piece board', '1枚で300ピース以上', 'Ein Brett mit 300 Teilen lösen', 'Termina un tablero de 300 piezas'] },
  p500: { n: ['500조각', '500 Pieces', '500ピース', '500 Teile', '500 piezas'], d: ['한 판에서 500조각 이상', 'Finish a 500-piece board', '1枚で500ピース以上', 'Ein Brett mit 500 Teilen lösen', 'Termina un tablero de 500 piezas'] },
  p1000: { n: ['1000조각', '1000 Pieces', '1000ピース', '1000 Teile', '1000 piezas'], d: ['한 판에서 1000조각 이상', 'Finish a 1000-piece board', '1枚で1000ピース以上', 'Ein Brett mit 1000 Teilen lösen', 'Termina un tablero de 1000 piezas'] },
  p2000: { n: ['2000조각', '2000 Pieces', '2000ピース', '2000 Teile', '2000 piezas'], d: ['한 판에서 2000조각', 'Finish a 2000-piece board', '1枚で2000ピース', 'Ein Brett mit 2000 Teilen lösen', 'Termina un tablero de 2000 piezas'] },
  pieces10k: { n: ['조각 1만 개', '10,000 Pieces', '1万ピース', '10.000 Teile', '10 000 piezas'], d: ['제자리에 놓은 조각 1만 개', 'Place 10,000 pieces in total', '合計1万ピースをはめる', 'Insgesamt 10.000 Teile legen', 'Coloca 10 000 piezas en total'] },
  pieces100k: { n: ['조각 10만 개', '100,000 Pieces', '10万ピース', '100.000 Teile', '100 000 piezas'], d: ['제자리에 놓은 조각 10만 개', 'Place 100,000 pieces in total', '合計10万ピースをはめる', 'Insgesamt 100.000 Teile legen', 'Coloca 100 000 piezas en total'] },
  daily7: { n: ['일주일 연속', 'Seven-Day Streak', '7日連続', 'Sieben Tage in Folge', 'Siete días seguidos'], d: ['오늘의 퍼즐 7일 연속 완주', 'Finish the daily puzzle 7 days in a row', '今日のパズルを7日連続', 'Das Tagespuzzle 7 Tage hintereinander lösen', 'Termina el reto de hoy 7 días seguidos'] },
  daily30: { n: ['한 달 연속', 'Thirty-Day Streak', '30日連続', 'Dreißig Tage in Folge', 'Treinta días seguidos'], d: ['오늘의 퍼즐 30일 연속 완주', 'Finish the daily puzzle 30 days in a row', '今日のパズルを30日連続', 'Das Tagespuzzle 30 Tage hintereinander lösen', 'Termina el reto de hoy 30 días seguidos'] },
  daily100: { n: ['오늘의 퍼즐 100번', '100 Dailies', '今日のパズル100回', '100 Tagespuzzles', '100 retos diarios'], d: ['오늘의 퍼즐 100판 완성', 'Finish 100 daily puzzles', '今日のパズルを100枚完成', '100 Tagespuzzles lösen', 'Termina 100 retos diarios'] },
  works50: { n: ['그림 50점', '50 Pictures', '50点', '50 Bilder', '50 imágenes'], d: ['서로 다른 그림 50점 완성', 'Finish 50 different pictures', '異なる絵を50点完成', '50 verschiedene Bilder lösen', 'Termina 50 imágenes distintas'] },
  works150: { n: ['그림 150점', '150 Pictures', '150点', '150 Bilder', '150 imágenes'], d: ['서로 다른 그림 150점 완성', 'Finish 150 different pictures', '異なる絵を150点完成', '150 verschiedene Bilder lösen', 'Termina 150 imágenes distintas'] },
  worksAll: { n: ['전작 완주', 'Every Picture', '全作品制覇', 'Alle Bilder', 'Todas las imágenes'], d: ['진열대의 모든 그림 완성', 'Finish every picture in the gallery', '陳列棚のすべての絵を完成', 'Jedes Bild der Galerie lösen', 'Termina todas las imágenes de la galería'] },
  shelf1: { n: ['진열대 하나', 'A Full Shelf', '棚ひとつ', 'Ein volles Regal', 'Una estantería'], d: ['한 진열대의 그림을 전부 완성', 'Clear an entire shelf', '棚ひとつを丸ごと完成', 'Ein ganzes Regal leerräumen', 'Completa una estantería entera'] },
  shelf5: { n: ['진열대 다섯', 'Five Full Shelves', '棚5つ', 'Fünf volle Regale', 'Cinco estanterías'], d: ['다섯 진열대를 전부 완성', 'Clear five entire shelves', '棚5つを丸ごと完成', 'Fünf ganze Regale leerräumen', 'Completa cinco estanterías enteras'] },
  photo1: { n: ['내 사진으로', 'Your Own Photo', '自分の写真で', 'Dein eigenes Foto', 'Tu propia foto'], d: ['내 사진으로 만든 퍼즐 완성', 'Finish a puzzle made from your photo', '自分の写真のパズルを完成', 'Ein Puzzle aus deinem Foto lösen', 'Termina un rompecabezas hecho con tu foto'] },
  room1: { n: ['친구랑 같이', 'With a Friend', '友だちと', 'Mit einem Freund', 'Con un amigo'], d: ['초대 방에서 한 판 완성', 'Finish a board in an invite room', '招待部屋で1枚完成', 'Ein Brett in einem Einladungsraum lösen', 'Termina un tablero en una sala de invitación'] },
  live1: { n: ['모두의 퍼즐', 'The Open Board', 'みんなのパズル', 'Das offene Brett', 'El tablero abierto'], d: ['모두의 퍼즐 한 회차에 조각을 보탬', 'Help finish a round of the open board', 'みんなのパズルにピースを足す', 'Bei einer Runde des offenen Bretts mithelfen', 'Ayuda a terminar una ronda del tablero abierto'] },
  night5: { n: ['새벽 퍼즐', 'Night Owl', '夜ふかし', 'Nachteule', 'Ave nocturna'], d: ['새벽 0~5시에 5판 완성', 'Finish 5 boards between midnight and 5am', '0〜5時に5枚完成', '5 Bretter zwischen Mitternacht und 5 Uhr lösen', 'Termina 5 tableros entre medianoche y las 5'] },
  fast1: { n: ['빠른 손', 'Quick Hands', '早業', 'Schnelle Hände', 'Manos rápidas'], d: ['300조각 이상을 조각당 2초 안에', 'Average under 2s per piece on 300+ pieces', '300ピース以上を1ピース2秒以内で', 'Bei 300+ Teilen unter 2 Sekunden pro Teil', 'Menos de 2 s por pieza con 300+ piezas'] },
};

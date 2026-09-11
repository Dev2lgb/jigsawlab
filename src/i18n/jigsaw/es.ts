// es — 판·고르는 화면 문구 + SEO 본문. 모양은 ko.ts 의 JigsawStrings 를 따른다
import type { JigsawStrings } from './ko';
export const ES: JigsawStrings = {
  title: '¿Qué armamos?', sub: 'El reto de hoy, una foto tuya o uno de los de abajo.',
  seoTitle: 'Rompecabezas en línea gratis — 518 imágenes para elegir', boardTitle: 'Tablero', seoDesc: 'Arma rompecabezas en línea gratis, sin registro. 518 cuadros, arte coreano y fotos del espacio, o tu propia imagen. De 48 a 1000 piezas. Con un enlace lo armáis entre varios.',
  pick: 'Elegir mi foto', drop: 'Arrastra una foto aquí o toca para elegir', daily: 'Reto de hoy', dailyCap: (title: string, n: number) => `${title} · ${n} piezas`, pieces: 'Piezas', custom: 'A medida', gridLabel: (c: number, r: number, n: number) => `${c}×${r} = ${n} piezas`, noImg: 'Elige antes una foto o un cuadro', chosen: 'Imagen elegida', myPhoto: 'Mi foto',
  start: 'Empezar', privacy: 'Tu foto nunca sale de tu dispositivo', loading: 'Cortando las piezas…', opening: 'Abriendo el rompecabezas…', saveGone: 'Ese rompecabezas guardado ya no existe',
  moves: 'Colocadas', left: (n: number) => `quedan ${n} piezas`, edgeOnly: 'Solo los bordes', hint: 'Imagen de fondo', original: 'Ver la imagen completa', trayHint: 'Arrastra las piezas de la bandeja hacia arriba hasta su sitio. Pellizca para acercar, dos dedos para desplazar',
  done: '¡Completo!', resTime: 'Tiempo', resPieces: 'Piezas', resMoves: 'Colocaciones', best: (s: string) => `Tu mejor marca: ${s}`, newBest: '¡Récord nuevo!', retry: 'La misma foto otra vez', another: 'Otro rompecabezas', toTitle: 'Volver al inicio',
  share: 'Compartir resultado', shareTitle: (n: number, t: string) => `¡He armado un rompecabezas de ${n} piezas en ${t}! 🧩`, shareText: 'Te toca 🧩', shareDaily: (n: number, t: string, title: string) => `El reto de hoy, «${title}»: ${n} piezas en ${t}. 🧩 ¿Lo mejoras?`,
  imgFail: 'No se pudo abrir esa imagen. Usa una foto JPG, PNG o HEIC', paintingBy: (t: string, a: string, y: string) => `${t} — ${a}, ${y}`,
};

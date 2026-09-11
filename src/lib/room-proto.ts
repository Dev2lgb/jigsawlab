// 방 프로토콜 — 클라이언트(Jigsaw.astro)와 Durable Object(room.ts)가 주고받는 메시지의 모양. 의존 없이 타입만(양쪽 번들에 다 실린다).
// 서버는 ClientMsg 의 값을 믿지 않는다 — 모양은 여기, 검증은 room.ts 의 case 마다
/** 방에서 보낼 수 있는 이모지. 자유 문자열이 아니라 이 목록의 번호만 오간다 — 공개 판이 낙서판이 되지 않게. 서버(room.ts)·판(Jigsaw.astro) 공용 */
export const EMOJIS = ['👍', '❤️', '🔥', '😂', '👏', '😮', '🙏', '👋'] as const;
export interface RoomGroup { dx: number; dy: number; idx: number[]; by?: string; t?: number } // by = 지금 잡고 있는 사람, t = 잡은 시각
export interface RoomState { id: string; key: string; n: number; cols: number; rows: number; total: number; W: number; H: number; seed: number; groups: Record<string, RoomGroup>; locked: number[]; createdAt: number; doneAt?: number; hostLeftAt?: number; dead?: boolean; live?: boolean; round?: number; lastAt?: number }
export interface Player { id: string; nick: string; color: string }
/** GET /api/room/<id> */
export interface RoomInfo { id: string; key: string; photo: boolean; hasPhoto: boolean; dead: boolean; w: number; h: number; n: number; cols: number; rows: number; total: number; seed: number; locked: number; players: number; done: boolean; createdAt: number; live: boolean; round: number }

/** 클라이언트 → 서버. g 는 뭉치 id(첫 조각 번호의 문자열) */
export type ClientMsg =
  | { t: 'hello'; nick?: string; photo?: boolean }
  | { t: 'nick'; nick: string }
  | { t: 'take'; g: string | number; dx: number; dy: number }   // 트레이에서 꺼냄
  | { t: 'untake'; g: string }                                   // 한 조각짜리를 트레이로 되돌림
  | { t: 'cur'; x: number; y: number }                           // 커서 (판 좌표)
  | { t: 'emo'; e: number }                                      // 이모지 (EMOJIS 의 번호). 서버가 범위·연타를 거른다
  | { t: 'grab'; g: string }                                     // 판 위 뭉치를 잡음
  | { t: 'mv'; g: string; dx: number; dy: number }
  | { t: 'drop'; g: string; dx: number; dy: number }
  | { t: 'merge'; g: string; into: string; dx: number; dy: number } // 놓은 순간의 좌표를 같이 (서버 좌표는 mv 스로틀로 뒤처진다)
  | { t: 'lock'; g: string; dx: number; dy: number }
  | { t: 'ping' } | { t: 'sync' }
  | { t: 'havephoto' } | { t: 'needphoto' } | { t: 'sig'; to: string; d: unknown }; // 내 사진 방의 WebRTC 신호

/** 서버 → 클라이언트 */
export type ServerMsg =
  | { t: 'init'; state: RoomState; you: Player; players: Player[]; holders: Record<string, string>; hasPhoto: boolean; dead: boolean }
  | { t: 'join'; p: Player } | { t: 'leave'; id: string } | { t: 'nick'; id: string; nick: string }
  | { t: 'cur'; id: string; x: number; y: number }
  | { t: 'emo'; id: string; e: number }
  | { t: 'take'; id: string; g: string; dx: number; dy: number } | { t: 'untake'; g: string }
  | { t: 'grab'; id: string; g: string } | { t: 'deny'; g: string } | { t: 'release'; g: string }
  | { t: 'mv'; g: string; dx: number; dy: number } | { t: 'drop'; g: string; dx: number; dy: number }
  | { t: 'merge'; g: string; into: string; dx: number; dy: number } | { t: 'lock'; g: string; idx: number[] }
  | { t: 'done'; at: number } | { t: 'next'; state: RoomState; done: boolean; prevKey: string }
  | { t: 'resync' } | { t: 'pong' }
  | { t: 'needphoto'; id: string } | { t: 'nophoto' } | { t: 'sig'; from: string; d: unknown }
  | { t: 'hostaway' } | { t: 'hostgone' } | { t: 'hostback' };

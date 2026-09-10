// IndexedDB 래퍼 — 진행 저장(saves)과 내 사진(images). 전부 기기 안에만 있음
const NAME = 'jigsawlab', VER = 1;
let dbp: Promise<IDBDatabase> | null = null;
function open(): Promise<IDBDatabase> {
  return dbp ??= new Promise((res, rej) => { const r = indexedDB.open(NAME, VER); r.onupgradeneeded = () => { const d = r.result; if (!d.objectStoreNames.contains('saves')) d.createObjectStore('saves', { keyPath: 'id' }); if (!d.objectStoreNames.contains('images')) d.createObjectStore('images'); }; r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
}
const tx = async (store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest) => { const d = await open(); return new Promise<any>((res, rej) => { const t = d.transaction(store, mode); const q = fn(t.objectStore(store)); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); };
export interface SaveGroup { dx: number; dy: number; idx: number[] }
export interface SaveData {
  id: string; v: 1; kind: 'photo' | 'daily' | 'gallery'; key: string; name: string; day?: string; seed: number; cols: number; rows: number; total: number; imgW: number; imgH: number;
  locked: number[]; groups: SaveGroup[]; tray: number[]; pile: number[]; piles: string[]; elapsed: number; moves: number; savedAt: number; thumb: string; done: number;
  /** 이 판에서 조각 단위로 이미 XP 를 받은 조각 수. 이어하기로 판이 넘어가도 완성 때 두 번 주지 않으려면 같이 따라와야 한다 */
  paid?: number;
}
export const saves = {
  get: (id: string): Promise<SaveData | undefined> => tx('saves', 'readonly', (s) => s.get(id)),
  put: (v: SaveData) => tx('saves', 'readwrite', (s) => s.put(v)),
  del: (id: string) => tx('saves', 'readwrite', (s) => s.delete(id)),
  all: (): Promise<SaveData[]> => tx('saves', 'readonly', (s) => s.getAll()).then((l: SaveData[]) => l.sort((a, b) => b.savedAt - a.savedAt)),
};
export const images = {
  get: (id: string): Promise<Blob | undefined> => tx('images', 'readonly', (s) => s.get(id)),
  put: (id: string, b: Blob) => tx('images', 'readwrite', (s) => s.put(b, id)),
  del: (id: string) => tx('images', 'readwrite', (s) => s.delete(id)),
};
export const hasIDB = () => typeof indexedDB !== 'undefined';

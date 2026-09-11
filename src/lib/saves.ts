// 하던 퍼즐 목록 — 이 기기(IndexedDB)의 것과 서버(회원)의 것을 id 로 합친다. /play/(Picker) 와 /my/(My) 가 같이 쓴다.
// 서버에만 있는 저장은 판(/board/?resume=)이 열 때 받아 온다
import { saves, images, hasIDB, type SaveData } from './db';
import { syncDelSave, type SaveMeta } from './account';

/** local = 이 기기에 있다, remote = 서버에 있다 (둘 다일 수 있다) */
export type SaveItem = (SaveData | SaveMeta) & { local: boolean; remote: boolean };

/** 로컬 + 서버 목록. 같은 id 는 로컬이 이긴다. 최근 저장 순 */
export async function allSaves(remote: SaveMeta[]): Promise<SaveItem[]> {
  let local: (SaveData | SaveMeta)[] = []; if (hasIDB()) try { local = await saves.all(); } catch {}
  const onServer = new Set(remote.map((m) => m.id)), have = new Set(local.map((x) => x.id));
  const list: SaveItem[] = local.map((x) => ({ ...x, local: true, remote: onServer.has(x.id) }));
  for (const m of remote) if (!have.has(m.id)) list.push({ ...m, local: false, remote: true });
  return list.sort((a, b) => b.savedAt - a.savedAt);
}
/** 저장 지우기 — 이 기기(사진이면 이미지도)와 서버 둘 다. 서버 쪽은 회원일 때만 가고 기다리지 않는다 */
export async function deleteSave(sv: Pick<SaveItem, 'id' | 'kind' | 'key'>): Promise<void> {
  try { await saves.del(sv.id); if (sv.kind === 'photo') await images.del(sv.key); } catch {}
  syncDelSave(sv.id).catch(() => {});
}

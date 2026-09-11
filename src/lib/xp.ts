// 조각 단위 XP (판 화면 전용, 회원만). 조각을 놓는 즉시 화면 숫자가 오르고, 서버로는 모아서 보낸다 — 조각마다 부르면 무료 티어(D1 쓰기 10만 행/일)가 못 버틴다.
// 규칙과 이유는 CLAUDE.md '레벨·업적·랭킹'. 여기 사는 불변식:
//  · 보내는 순간 준 것으로 친다(paid) — 화면을 떠나며 부르면 응답을 못 기다리는데, 그때 진행 저장에 들어갈 값이 맞아야 한다. 못 보냈으면 되돌린다
//  · 완성 정산은 settle() 뒤에 — 보내는 중인 묶음보다 먼저 닿으면 서버가 그 묶음을 못 본 채 정산해 XP 가 샌다
//  · 재도전 감산(×¼)은 서버가 정하지만, 첫 묶음 응답에 숫자가 갑자기 내려앉지 않게 이 기기의 기록으로 짐작한 배율(localRate)로 먼저 그리고 서버 배율이 오면 물려받은 몫까지 다시 잡는다
import { authAvailable, me, syncPieces } from './account';
import type { Kind } from './level';

export const XP_BATCH = 60;     // 이만큼 모이면 보낸다
export const XP_MS = 300_000;   // 타이머는 크래시 대비일 뿐(화면 이탈·나가기는 즉시 보낸다) — 90초로 두면 천천히 푸는 사람은 이 타이머가 D1 쓰기의 대부분이었다

export interface XpHooks {
  /** 보낼 때 필요한 판 정보. 판이 없으면 null */
  ctx: () => { kind: Kind; key: string; total: number } | null;
  /** 완성된 뒤인지 — 완성 뒤 남은 조각은 완성 정산이 한 번에 친다 (force 로 부르면 보낸다) */
  done: () => boolean;
  show: (xp: number) => void;        // 화면 숫자 (0 이면 숨김)
  saved: () => void;                 // paid 가 바뀌었다 — 진행 저장 예약
  levelUp: (level: number) => void;  // 판 위에서는 토스트만 (다이얼로그는 결과 화면에서)
  capped: () => void;                // 하루 상한에 닿았다 (한 판에 한 번)
}

export function createXp(h: XpHooks) {
  // wait 아직 안 보낸 조각 · paid 이 판에서 이미 보낸 조각(완성 정산에서 그만큼 뺀다, 이어하기에도 실려 간다)
  // prev 이어하기로 물려받은 조각 · carry 그 몫의 XP(배율을 알게 되면 다시 잡는다) · firm 이번 판에서 서버가 준 XP
  let wait = 0, paid = 0, prev = 0, carry = 0, firm = 0, at = 0, capped = false;
  let rateSrv: number | null = null, rateLocal = 1;
  let busy: Promise<void> | null = null; // 보내는 중인 묶음
  const rate = () => rateSrv ?? rateLocal;
  const show = () => h.show(carry + firm + Math.round(wait * rate()));
  function flush(force = false): Promise<void> {
    const c = h.ctx();
    if (busy || !c || wait <= 0 || (!force && h.done())) return busy ?? Promise.resolve();
    if (!authAvailable()) { wait = 0; return Promise.resolve(); }
    const k = wait; wait = 0; paid += k; at = performance.now();
    const run = async () => {
      if (!(await me())) { paid -= k; return; } // 비회원 — 쌓을 데가 없다
      const a = await syncPieces(c.kind, c.key, c.total, k).catch(() => null);
      if (!a) { wait += k; paid -= k; return; } // 못 보냈으면 다음 기회에
      if (typeof a.rate === 'number') rateSrv = a.rate;
      carry = Math.round(prev * rate()); firm += a.gained; show(); h.saved();
      if (a.levelUp) h.levelUp(a.level); else if (a.capped && !capped) { capped = true; h.capped(); }
    };
    const pr = run().finally(() => { if (busy === pr) busy = null; });
    busy = pr; return pr;
  }
  return {
    /** 이 판에서 이미 보낸 조각 수 — 진행 저장·완성 기록에 실린다 */
    get paid() { return paid; },
    /** 새 판. paidPrev = 이어하기로 물려받은 paid, localRate = 이 기기 기록으로 짐작한 배율 */
    reset(paidPrev: number, localRate: number) { wait = 0; paid = paidPrev; prev = paidPrev; firm = 0; capped = false; rateSrv = null; rateLocal = localRate; carry = Math.round(prev * localRate); at = performance.now(); show(); },
    /** 조각 k 개를 제자리에 놓았다 */
    got(k: number) { if (k <= 0) return; wait += k; show(); if (wait >= XP_BATCH || performance.now() - at > XP_MS) flush(); },
    /** 주기적으로 — 타이머가 지났으면 보낸다 */
    tick() { if (wait > 0 && performance.now() - at > XP_MS) flush(); },
    /** 모아 둔 조각을 보낸다. force = 완성 뒤·화면 이탈처럼 지금 보내야 할 때 */
    flush,
    /** 보내는 중인 묶음이 끝날 때까지 */
    settle: () => busy ?? Promise.resolve(),
    /** 남은 조각을 버린다 — 완성 정산이 한 번에 친다 */
    discard() { wait = 0; },
  };
}

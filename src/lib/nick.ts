// 닉네임 길이 — 글자 수가 아니라 폭으로 센다: 한글·한자·가나·이모지처럼 넓은 글자는 2칸, 나머지는 1칸, 16칸까지(한글 8자·영문 16자).
// 글자 수(12자)로 세던 때는 한글 12자 이름이 영문 12자의 두 배 폭이라 네임태그(nametag.ts)·목록에서 자리가 제각각이었다.
// 의존 없음 — 서버(auth.ts·room.ts)와 브라우저(authui·store·nickgen·판의 손님 입력)가 같이 쓴다.
// 이미 저장된 긴 이름은 자르지 않는다 — 화면에서 말줄임으로 두고, 바꿀 때부터 새 제한이 걸린다
export const NICK_CELLS = 16;
// 한글 자모·음절, CJK(한자·가나·기호), 전각, 이모지(보조 평면). 결합 문자(ZWJ·변형 선택자·살색 톤)는 0칸
const WIDE = /[ᄀ-ᇿ⺀-鿿ꥠ-꥿가-퟿豈-﫿︰-﹏＀-｠￠-￦\u{1F000}-\u{1FAFF}\u{20000}-\u{3FFFF}]|[☀-➿]/u;
const ZERO = /[‍️\u{1F3FB}-\u{1F3FF}]/u;
export const cellOf = (ch: string) => (ZERO.test(ch) ? 0 : WIDE.test(ch) ? 2 : 1);
export const nickCells = (s: string) => { let n = 0; for (const ch of s) n += cellOf(ch); return n; };
/** 앞뒤 공백·연속 공백을 정리하고 NICK_CELLS 칸에서 자른다 */
export function clipNick(s: string, cells = NICK_CELLS): string {
  let out = '', n = 0;
  for (const ch of s.trim().replace(/\s+/g, ' ')) { const c = cellOf(ch); if (n + c > cells) break; out += ch; n += c; }
  return out.trimEnd();
}

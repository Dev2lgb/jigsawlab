// 업적 판정에 쓰는 총량. level.ts 가 WORKS.length 하나 때문에 works.ts 를 통째로 물면
// 그 뒤의 작품 데이터까지 클라이언트 번들에 따라 들어와서, 상수로 떼어 뒀다.
// 값이 어긋나면 works.ts 가 빌드를 세운다
export const TOTAL_WORKS = 618;
// 오늘의 퍼즐 후보 목록의 서명(개수-해시). 후보가 바뀌면 works.ts 가 빌드를 세운다 — 지난 날짜 그림이 통째로 바뀌지 않게
// 바뀌기 전 목록을 얼리는 법은 works.ts 의 dailyPool 주석, 명령은 node scripts/daily-freeze.mjs
export const DAILY_SIG = '564-bwi0vl';

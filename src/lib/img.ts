// 퍼즐 그림 주소. 파일은 git 이 아니라 R2 버킷 jigsawlab-img 에 있고 img.jigsawlab.app 으로 나간다(올리기: scripts/img-upload.mjs).
// 원본(art)은 판이 캔버스로 픽셀을 읽으므로(조각 색·저장 썸네일) `crossOrigin = 'anonymous'` 로 받아야 한다.
// 다른 곳이 crossorigin 없이 먼저 받아 둔 사본을 브라우저가 CORS 요청에 그대로 쓰면 로드가 실패하는데,
// 이건 그 도메인의 응답 헤더 변환 규칙이 모든 응답에 Access-Control-Allow-Origin: * 을 붙여 막는다(CLAUDE.md).
export const IMG = 'https://img.jigsawlab.app';
export const artUrl = (key: string) => `${IMG}/${key}.webp`;
export const thumbUrl = (key: string) => `${IMG}/t-${key}.webp`;
export const ogUrl = (key: string) => `${IMG}/o-${key}.jpg`;

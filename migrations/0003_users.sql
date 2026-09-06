-- 구글 로그인 회원 (선택). id = 구글 sub 를 서버 비밀키로 HMAC 한 값. 이메일·이름·프로필 사진은 받지도 저장하지도 않음
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  nick TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  seen_at INTEGER NOT NULL DEFAULT (unixepoch())
);
-- 완성 기록(업적) 동기화
CREATE TABLE IF NOT EXISTS user_done (
  user_id TEXT NOT NULL,
  at INTEGER NOT NULL,
  key TEXT NOT NULL,
  kind TEXT NOT NULL,
  name TEXT NOT NULL,
  n INTEGER NOT NULL,
  sec INTEGER NOT NULL,
  moves INTEGER NOT NULL,
  day TEXT,
  PRIMARY KEY (user_id, at)
);
-- 하던 퍼즐(이어하기) 동기화. 명화·오늘의 퍼즐만 (내 사진은 기기 안에만)
CREATE TABLE IF NOT EXISTS user_saves (
  user_id TEXT NOT NULL,
  id TEXT NOT NULL,
  meta TEXT NOT NULL,
  data TEXT NOT NULL,
  saved_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, id)
);

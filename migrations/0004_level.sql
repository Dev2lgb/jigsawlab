-- 레벨·업적·랭킹 (구글 로그인 회원만). 기록의 원천은 user_done 이지만 그건 500건에서 잘리므로
-- 누적 수치는 여기 카운터로 따로 쌓는다. 개인정보는 여전히 가명 ID + 닉네임뿐

-- 회원별 누적 지표. xp 로 전체 랭킹을 세우고, 나머지 칸은 업적 판정에 쓴다
CREATE TABLE IF NOT EXISTS user_stats (
  user_id TEXT PRIMARY KEY,
  xp INTEGER NOT NULL DEFAULT 0,
  solved INTEGER NOT NULL DEFAULT 0,      -- 완성한 판 수
  pieces INTEGER NOT NULL DEFAULT 0,      -- 제자리에 놓은 조각 수 합계
  best_n INTEGER NOT NULL DEFAULT 0,      -- 한 판에서 깬 최대 조각 수
  works INTEGER NOT NULL DEFAULT 0,       -- 서로 다른 그림 수 (= user_cleared 행 수)
  shelves INTEGER NOT NULL DEFAULT 0,     -- 통째로 완주한 진열대 수
  daily_n INTEGER NOT NULL DEFAULT 0,     -- 오늘의 퍼즐 완성 수
  streak INTEGER NOT NULL DEFAULT 0,      -- 오늘의 퍼즐 현재 연속 일수
  streak_best INTEGER NOT NULL DEFAULT 0,
  last_day TEXT,                          -- 마지막으로 완성한 오늘의 퍼즐 날짜 (KST)
  photo_n INTEGER NOT NULL DEFAULT 0,     -- 내 사진 퍼즐
  room_n INTEGER NOT NULL DEFAULT 0,      -- 친구 방에서 완성
  live_n INTEGER NOT NULL DEFAULT 0,      -- 모두의 퍼즐 회차 기여
  night_n INTEGER NOT NULL DEFAULT 0,     -- 새벽(KST 0~5시) 완성
  fast_n INTEGER NOT NULL DEFAULT 0,      -- 300조각 이상을 조각당 2초 안에
  day_xp INTEGER NOT NULL DEFAULT 0,      -- 하루 XP 상한용
  day_key TEXT,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_stats_xp ON user_stats(xp DESC);

-- 그림별 최초 완성 (같은 그림 재도전 XP 감산 + '몇 점 완성'·'진열대 완주' 업적). n = 지금까지 깬 최대 조각 수
CREATE TABLE IF NOT EXISTS user_cleared (
  user_id TEXT NOT NULL,
  key TEXT NOT NULL,
  cat TEXT NOT NULL,
  n INTEGER NOT NULL,
  at INTEGER NOT NULL,
  PRIMARY KEY (user_id, key)
);
CREATE INDEX IF NOT EXISTS idx_cleared_cat ON user_cleared(user_id, cat);

-- 주간 랭킹. week = 그 주 월요일 날짜(KST, YYYY-MM-DD)
CREATE TABLE IF NOT EXISTS user_week (
  user_id TEXT NOT NULL,
  week TEXT NOT NULL,
  xp INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, week)
);
CREATE INDEX IF NOT EXISTS idx_week_xp ON user_week(week, xp DESC);

-- 딴 업적 (코드 + 딴 시각)
CREATE TABLE IF NOT EXISTS user_badges (
  user_id TEXT NOT NULL,
  code TEXT NOT NULL,
  at INTEGER NOT NULL,
  PRIMARY KEY (user_id, code)
);

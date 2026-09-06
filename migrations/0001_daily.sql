-- 오늘의 퍼즐 기록 (기기당 하루 최고 1건). ms = 완성 시간, tries = 조각 놓은 횟수
CREATE TABLE IF NOT EXISTS daily_solves (
  day TEXT NOT NULL,
  device TEXT NOT NULL,
  nick TEXT NOT NULL,
  tries INTEGER NOT NULL,
  ms INTEGER NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  ip TEXT,
  PRIMARY KEY (day, device)
);
CREATE INDEX IF NOT EXISTS idx_daily_rank ON daily_solves(day, ms, tries);

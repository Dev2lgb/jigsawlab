-- 사이트 전체 카운터 (완성 판 수 등)
CREATE TABLE IF NOT EXISTS stats (key TEXT PRIMARY KEY, n INTEGER NOT NULL DEFAULT 0);
INSERT OR IGNORE INTO stats (key, n) VALUES ('solved', 0);

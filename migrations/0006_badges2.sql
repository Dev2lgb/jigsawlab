-- 업적을 24가지에서 50가지로 늘리며 생긴 두 지표. 둘 다 user_cleared 에서 다시 셀 수 있어
-- 옛 회원의 값도 다음 완성 정산 때 소급해 맞는다 (award.ts 의 newWorks || fresh 블록)
ALTER TABLE user_stats ADD COLUMN big_n INTEGER NOT NULL DEFAULT 0;    -- 1000조각 이상으로 깬 그림 수
ALTER TABLE user_stats ADD COLUMN cat_best INTEGER NOT NULL DEFAULT 0; -- 한 진열대에서 깬 최대 그림 수

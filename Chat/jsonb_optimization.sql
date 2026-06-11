-- 1. GIN 인덱스 생성 (성능 최적화)
-- @> 연산자 검색 속도를 높이기 위해 jsonb_path_ops 사용 추천
CREATE INDEX IF NOT EXISTS idx_profiles_settings_path_gin 
ON profiles USING GIN (settings jsonb_path_ops);

-- 2. 복잡한 구조의 JSONB 배열 검색 예시
-- 시나리오: 사용자의 'logs' 배열 안에서 특정 조건(action='login', status='success')을 만족하는 객체 찾기
/*
  데이터 구조 예시:
  logs: [
    {"action": "login", "ip": "1.2.3.4", "status": "success"},
    {"action": "upload", "filename": "mango.jpg", "status": "pending"}
  ]
*/

-- action이 'login'이면서 status가 'success'인 로그가 하나라도 포함된 행 검색
SELECT id, username 
FROM profiles
WHERE logs @> '[{"action": "login", "status": "success"}]';

-- 3. 중첩된 객체와 배열이 섞인 경우의 포함 관계 확인
-- 시나리오: metadata 내의 필터 설정 중 'category'가 'premium'인 항목 검색
SELECT *
FROM profiles
WHERE metadata @> '{
  "filters": {
    "category": "premium"
  }
}';

-- 1. 특정 JSON 키에 대한 B-Tree 인덱스 생성
-- 'settings' JSONB 컬럼 내의 'notification_email' 키에 B-Tree 인덱스 생성
-- 이메일 주소로 정확히 일치하는 레코드를 빠르게 찾을 때 유용합니다.
CREATE INDEX IF NOT EXISTS idx_profiles_notification_email
ON profiles ((settings->>'notification_email'));

-- 만약 JSONB 내의 값이 숫자이고, 범위 검색을 자주 한다면:
-- CREATE INDEX IF NOT EXISTS idx_profiles_user_level
-- ON profiles (((settings->>'level')::int)); -- 'level' 키의 값을 정수로 캐스팅하여 인덱스 생성

-- 사용 예시:
-- SELECT * FROM profiles WHERE (settings->>'notification_email') = 'user@example.com';
-- SELECT * FROM profiles WHERE (settings->>'level')::int > 5;

-- [최적화] 2. jsonb_path_ops GIN 인덱스 생성
-- jsonb_path_exists 및 @> 연산자의 성능을 극대화하기 위해 path_ops를 사용합니다.
CREATE INDEX IF NOT EXISTS idx_profiles_logs_path_ops 
ON profiles USING GIN (logs jsonb_path_ops);

-- 3. jsonb_path_exists를 이용한 인덱스 스캔 쿼리
-- 'logs' JSONB 배열 내에 'action'이 'login'이고 'status'가 'failed'인 객체가 있는지 확인
-- 위에서 생성한 jsonb_path_ops 인덱스가 이 쿼리의 실행 계획에 반영됩니다.
SELECT id, username, logs
FROM profiles
WHERE jsonb_path_exists(logs, '$[*] ? (@.action == "login" && @.status == "failed")');

-- 4. 복잡한 수치 비교와 결합한 JSONPath 검색
-- 시나리오: 'logs' 중 'amount'가 100 이상인 'payment' 액션이 있는지 확인
SELECT count(*) 
FROM profiles
WHERE jsonb_path_exists(logs, '$[*] ? (@.action == "payment" && @.amount >= 100)');

-- [참고] JSONB_EXISTS 대신 '?' 연산자를 사용하여 특정 키의 존재 여부만 확인할 수도 있습니다.
-- SELECT id, username FROM profiles WHERE settings ? 'notification_email';

-- 5. JSONB_PATH_QUERY를 이용한 특정 경로의 값 추출
-- 'logs' JSONB 배열에서 'action'이 'login'인 모든 객체의 'ip' 주소를 추출
SELECT id, username, jsonb_path_query(logs, '$[*] ? (@.action == "login").ip') AS login_ips
FROM profiles
WHERE jsonb_path_exists(logs, '$[*] ? (@.action == "login")');

-- 추출된 결과는 JSONB 배열 형태로 반환됩니다.
-- 예시 결과: ["192.168.1.1", "10.0.0.5"]

-- 4. JSONB_PATH_QUERY_ARRAY를 이용한 단일 JSONB 배열 반환
-- 위와 동일하지만, 결과가 단일 JSONB 배열로 반환되어 더 깔끔합니다.
SELECT id, username, jsonb_path_query_array(logs, '$[*] ? (@.action == "login").ip') AS login_ips_array
FROM profiles
WHERE jsonb_path_exists(logs, '$[*] ? (@.action == "login")');

-- 예시 결과: ["192.168.1.1", "10.0.0.5"] (jsonb_path_query와 동일하지만, 함수 이름이 명확)

-- 5. JSONB_PATH_QUERY_FIRST를 이용한 첫 번째 일치 값 추출
-- 'logs' JSONB 배열에서 'action'이 'login'인 첫 번째 객체의 'ip' 주소만 추출
SELECT id, username, jsonb_path_query_first(logs, '$[*] ? (@.action == "login").ip') AS first_login_ip
FROM profiles
WHERE jsonb_path_exists(logs, '$[*] ? (@.action == "login")');

-- 예시 결과: "192.168.1.1" (단일 JSONB 값 반환)

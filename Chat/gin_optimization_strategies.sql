-- 1. fastupdate 옵션 활용 (기본값은 ON)
-- 변경사항을 임시 'Pending List'에 모았다가 한꺼번에 인덱스에 반영하여 쓰기 속도를 높입니다.
ALTER INDEX idx_profiles_settings_path_gin SET (fastupdate = ON);

-- 2. Pending List 크기 조절
-- 기본값은 4MB입니다. 대량의 데이터가 한꺼번에 들어오는 환경이라면 이를 늘려 
-- 인덱스 실제 반영(Cleanup) 횟수를 줄일 수 있습니다.
-- 예: 16MB로 설정
SET gin_pending_list_limit = '16MB';

-- 3. jsonb_path_ops 사용 (저장 공간 및 성능 최적화)
-- 이전에 만든 인덱스보다 검색 범위는 좁지만(단순 키 존재 확인 '?' 연산 불가),
-- 포함 관계(@>) 검색 시 인덱스 크기가 훨씬 작고 쓰기 작업도 더 빠릅니다.
-- [고급] 특정 JSONB 키(예: 'tags' 배열)에만 GIN 인덱스 생성
-- 전체 객체가 아닌 필요한 경로만 인덱싱하여 저장 공간을 절약하고 쓰기 성능을 보존합니다.
CREATE INDEX IF NOT EXISTS idx_profiles_settings_tags 
ON profiles USING GIN ((settings->'tags') jsonb_path_ops);

-- 사용 예시 (인덱스가 작동함)
-- SELECT * FROM profiles WHERE settings->'tags' @> '["premium"]';

-- 4. 대량 데이터 적재 시 팁
/*
  서비스 초기 구축이나 대규모 마이그레이션 시에는:
  1) 인덱스를 DROP 하거나, ALTER INDEX ... SET (fastupdate = ON) 상태인지 확인합니다.
  2) 데이터를 COPY 또는 INSERT 합니다.
  3) 인덱스를 다시 생성(CREATE INDEX) 합니다.
  이 방식이 하나씩 인덱스를 업데이트하는 것보다 훨씬 빠릅니다.
*/

-- 5. 유지보수: 통계 정보 갱신
-- 인덱스 설정 변경 후에는 ANALYZE를 실행하여 쿼리 플래너가 인덱스를 잘 쓰게 유도합니다.
ANALYZE profiles;

-- 6. 인덱스 상태 모니터링
-- Pending List에 얼마나 쌓여 있는지 확인 (cleanup이 필요한지 판단 근거)
SELECT * FROM pgstatindex('idx_profiles_settings_path_gin');
-- 주의: pgstatindex는 pgstattuple 확장 모듈이 필요할 수 있습니다 (CREATE EXTENSION pgstattuple;)

-- 7. Supabase 대량 INSERT 타임아웃 방지 팁
/*
  방법 A: 트랜잭션 내에서 타임아웃 일시적 연장 (Supabase SQL Editor 사용 시)
  BEGIN;
  SET LOCAL statement_timeout = '300s'; -- 5분으로 연장
  INSERT INTO profiles ... ;
  COMMIT;

  방법 B: 배치 처리 (Batching)
  JS 클라이언트나 Edge Function에서 500~1000개 단위로 끊어서 삽입하세요.
  const { data, error } = await supabase.from('profiles').insert(chunk);

  방법 C: Unlogged Staging Table 활용
  1) 인덱스가 없는 UNLOGGED 테이블을 만듭니다 (쓰기가 매우 빠름).
  2) 데이터를 적재합니다.
  3) INSERT INTO profiles SELECT * FROM staging_table; 로 한꺼번에 옮깁니다.
  4) 이 과정은 WAL 로그 생성을 최소화하여 성능을 높입니다.
*/

-- 8. 자동 Cleanup으로 인한 성능 저하 방지 (수동 Cleanup 전략)
/*
  방법 D: 대량 삽입 전후로 수동 Cleanup 실행
  자동 Cleanup은 트래픽이 몰리는 Peak 타임에 발생하면 치명적입니다.
  배치 작업 직후에 아래 명령어를 실행하여 강제로 인덱스에 반영시키세요.
*/
-- 특정 인덱스에 대해 Pending List 강제 정리 (PostgreSQL 12+)
-- SELECT gin_clean_pending_list('idx_profiles_settings_path_gin');

-- 9. 쓰기 위주의 테이블에서 GIN 인덱스 비활성화 검토
/*
  만약 초당 수백 건의 UPDATE/INSERT가 일어나는 테이블이라면 
  fastupdate를 OFF로 설정하여 매번 인덱스를 갱신하는 것이 
  가끔 발생하는 거대한 Cleanup 지연보다 전체적인 처리량(Throughput) 면에서 나을 수 있습니다.
*/
-- ALTER INDEX idx_profiles_settings_path_gin SET (fastupdate = OFF);

-- 10. 현재 Pending List 크기 실시간 모니터링
-- 아래 쿼리로 얼마나 쌓였는지 수시로 체크하여 임계치를 튜닝하세요.
-- SELECT pg_size_pretty(pg_relation_size('idx_profiles_settings_path_gin')) as index_size;

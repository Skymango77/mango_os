-- Supabase SQL Editor에서 실행하여 함수 생성
CREATE OR REPLACE FUNCTION process_user_batch_data(
  p_orders JSONB,    -- 첫 번째 JSONB 파라미터
  p_settings JSONB   -- 두 번째 JSONB 파라미터
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  v_order_count INT;
  v_theme TEXT;
  v_is_priority BOOLEAN;
BEGIN
  -- JSONB 배열의 길이를 계산
  v_order_count := jsonb_array_length(p_orders);
  
  -- @> 연산자를 사용하여 특정 설정이 포함되어 있는지 확인
  -- 예: settings에 {"priority": true}가 포함되어 있는지 체크
  v_is_priority := p_settings @> '{"priority": true}';

  -- JSONB 객체에서 특정 키의 값을 텍스트로 추출
  v_theme := p_settings->>'theme';

  -- 결과 반환
  RETURN jsonb_build_object(
    'processed_at', NOW(),
    'total_orders', v_order_count,
    'applied_theme', v_theme,
    'is_priority_mode', v_is_priority
  );
END;
$$;
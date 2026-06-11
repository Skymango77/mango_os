-- JSONB 배열을 필터링하여 특정 가격 이상의 항목만 반환하는 함수
CREATE OR REPLACE FUNCTION filter_mango_orders_by_price(p_orders JSONB, p_min_price NUMERIC)
RETURNS TABLE (
  order_id INT,
  item_name TEXT,
  price NUMERIC
)
LANGUAGE sql
AS $$
  SELECT
    (elem->>'order_id')::INT,
    (elem->>'item_name')::TEXT,
    (elem->>'price')::NUMERIC
  FROM jsonb_array_elements(p_orders) AS elem
  WHERE (elem->>'price')::NUMERIC >= p_min_price;
$$;

-- 사용 예시: SELECT * FROM filter_mango_orders_by_price('[{"order_id": 1, "item_name": "Mango", "price": 10}, {"order_id": 2, "item_name": "Juice", "price": 5}]', 7);
-- JSON 배열을 받아 개별 행으로 분리하여 반환하는 함수
CREATE OR REPLACE FUNCTION unpack_mango_orders(p_orders JSONB)
RETURNS TABLE (
  order_id INT,
  item_name TEXT,
  price NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM jsonb_to_recordset(p_orders) 
  AS x(order_id INT, item_name TEXT, price NUMERIC);
END;
$$;

-- 사용 예시: SELECT * FROM unpack_mango_orders('[{"order_id": 1, "item_name": "Mango", "price": 5.0}, {"order_id": 2, "item_name": "Juice", "price": 3.5}]');
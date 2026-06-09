// Supabase Edge Function: pi-payment-handler/index.ts
// 로컬 편집기 에러가 계속 나더라도 실제 배포 시에는 Deno 환경에서 정상 작동합니다.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Supabase 클라이언트 초기화 (Edge Function 전용 환경 변수)
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  // CORS 처리 (필수)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  const { action, paymentId, txid, storeName } = await req.json();

  try {
    if (action === 'approve') {
      return new Response(JSON.stringify({ paymentId, status: 'approved' }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    if (action === 'complete') {
      // DB 기록 작업
      const { data, error } = await supabaseClient
        .from('payments')
        .insert([{ payment_id: paymentId, txid: txid, store_name: storeName }]);

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }

  return new Response("Invalid Action", { status: 400 });
});
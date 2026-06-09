// supabase/functions/pi-payment-handler/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req: Request) => { // Explicitly type 'req' as Request
  // CORS 대응을 위한 preflight 요청 처리
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { "Access-Control-Allow-Origin": "*" } })
  }

  const { action, paymentId, txid, storeName, amount, portalName } = await req.json();

  // Supabase 클라이언트 초기화 (환경 변수 사용 권장)
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  if (action === 'approve') {
    // TODO: 실제 환경에서는 여기서 Pi Network 서버 API를 호출하여 paymentId를 검증합니다.
    console.log(`[Edge Function] Approving payment: ${paymentId}`);
    return new Response(JSON.stringify({ paymentId, status: 'approved' }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  if (action === 'complete') {
    try {
      const fee = amount * 0.02; // 2% DAO 수수료 계산

      // dao_treasury 테이블에 수수료 적립 기록
      const { error } = await supabase
        .from('dao_treasury')
        .insert([{ portal_name: portalName, amount: fee, txid: txid }]);

      if (error) throw error;

      return new Response(JSON.stringify({ success: true, txid, fee }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }

  return new Response("Invalid Action", { status: 400 });
});
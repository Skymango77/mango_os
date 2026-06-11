// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      // @ts-ignore
      Deno.env.get('SUPABASE_URL') ?? '',
      // @ts-ignore
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, paymentId, split } = await req.json()
    // @ts-ignore
    const PI_API_KEY = Deno.env.get('PI_API_KEY')

    // 1. Pi Network API를 통한 결제 유효성 검증
    const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}`, {
      method: 'GET',
      headers: { 'Authorization': `Key ${PI_API_KEY}` }
    })

    if (!piResponse.ok) throw new Error('Pi API Verification Failed')
    const paymentData = await piResponse.json()

    if (action === 'approve') {
      // 2. 승인 로직: Pi 서버에 결제 승인 요청
      const approveRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Key ${PI_API_KEY}` }
      })
      
      if (!approveRes.ok) throw new Error('Pi API Approval Failed')

      // 3. 수익 분배 및 정산 데이터 기록 (Creator 70% : Mango 30%)
      const totalAmount = paymentData.amount
      const creatorShare = totalAmount * (split?.creator || 0.7)
      const mangoShare = totalAmount * (split?.mango || 0.3)

      const { error: dbError } = await supabaseClient
        .from('emoticon_settlements')
        .insert([{
          payment_id: paymentId,
          user_uid: paymentData.user_uid,
          creator_id: paymentData.metadata.creatorId,
          total_pi: totalAmount,
          creator_payout: creatorShare,
          platform_fee: mangoShare,
          status: 'approved',
          created_at: new Date()
        }])

      if (dbError) throw dbError

      // 4. 크리에이터 지갑 잔액 업데이트 (RPC 호출)
      await supabaseClient.rpc('increment_creator_balance', {
        c_id: paymentData.metadata.creatorId,
        amount: creatorShare
      })

      return new Response(JSON.stringify({ success: true, message: 'Settlement Synchronized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    return new Response(JSON.stringify({ message: "No valid action found" }), { status: 400 })

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Unknown error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
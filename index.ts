// @ts-ignore: Deno 전용 라이브러리임을 명시
/// <reference types="https://deno.land/x/deno_types/index.d.ts" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request): Promise<Response> => {
  // 1. CORS Preflight 처리
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('서버 환경 변수 누락')
    }

    // 서비스 롤 클라이언트 (DB 업데이트 권한)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    // 2. JWT를 통한 유저 인증 (보안 강화)
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('인증 헤더가 없습니다.')
    }

    const { data: { user }, error: authError } = await createClient(
      supabaseUrl,
      supabaseAnonKey,
      { global: { headers: { Authorization: authHeader } } }
    ).auth.getUser()

    if (authError || !user) {
      throw new Error('유효하지 않은 토큰이거나 로그인이 필요합니다.')
    }

    // 3. 요청 데이터 파싱 및 검증 (해킹 방지)
    const { piAmount, mngAmount, productId, portalType } = await req.json()

    const parsedPi = parseFloat(piAmount || '0')
    const parsedMng = parseFloat(mngAmount || '0')

    // 마이너스 결제 시도 원천 차단
    if (parsedPi < 0 || parsedMng < 0) {
      throw new Error('결제 금액은 0보다 작을 수 없습니다.')
    }

    // 4. DB 트랜잭션 함수 호출 (Atomic Transaction)
    const { data, error: rpcError } = await supabaseAdmin.rpc('process_hybrid_payment', {
      p_user_id: user.id,
      p_pi_amount: parsedPi,
      p_mng_amount: parsedMng,
      p_product_id: productId,
      p_portal: portalType
    })

    if (rpcError) throw rpcError

    // SQL 함수 내부에서 실패 처리된 경우 (예: 잔액 부족)
    if (data && data.success === false) {
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // 결제 성공
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 서버 에러'
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
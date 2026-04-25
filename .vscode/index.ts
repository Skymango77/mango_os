// @ts-nocheck: Deno와 Node.js 환경 혼용 시 발생하는 타입 에러를 강제 억제합니다.
/// <reference types="https://raw.githubusercontent.com/denoland/deno/master/cli/schemas/lib.deno.d.ts" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// @ts-ignore: Deno 객체 인식 문제 해결
serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Deno 전역 객체를 사용하여 환경 변수 로드 (에러 2304 해결)
    const supabaseUrl = (Deno as any).env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = (Deno as any).env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabaseAnonKey = (Deno as any).env.get('SUPABASE_ANON_KEY') ?? '';

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('서버 환경 변수 누락');
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // 1. 유저 인증 로직
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('인증 헤더가 없습니다.');

    const { data: { user }, error: authError } = await createClient(
      supabaseUrl,
      supabaseAnonKey,
      { global: { headers: { Authorization: authHeader } } }
    ).auth.getUser();

    if (authError || !user) throw new Error('로그인이 필요합니다.');

    // 2. 데이터 파싱
    const { piAmount, mngAmount, productId, portalType } = await req.json();
    const parsedPi = parseFloat(piAmount || '0');
    const parsedMng = parseFloat(mngAmount || '0');

    // 3. DB RPC 호출 (핵심 결제 엔진)
    const { data, error: rpcError } = await supabaseAdmin.rpc('process_hybrid_payment', {
      p_user_id: user.id,
      p_pi_amount: parsedPi,
      p_mng_amount: parsedMng,
      p_product_id: productId,
      p_portal: portalType
    });

    if (rpcError) throw rpcError;

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: data?.success === false ? 400 : 200,
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});

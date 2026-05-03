// @ts-ignore: Deno 전용 라이브러리임을 명시
/// <reference types="https://deno.land/x/deno_types/index.d.ts" />

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"
// runtime-safe `serve`: prefer global Deno serve, then std lib, otherwise Node fallback
let serve: (handler: (req: Request) => Promise<Response>) => void

if ((globalThis as any).serve) {
  serve = (globalThis as any).serve
} else if ((globalThis as any).Deno) {
  // Deno runtime without global serve: import std serve dynamically
  // @ts-ignore: ignore TypeScript resolution for remote std module in non-Deno editors
  const mod = await import("https://deno.land/std@0.168.0/http/server.ts")
  serve = mod.serve
} else {
  // Node.js fallback: adapt Node http to a Web Request/Response handler
  const http = await import('http')
  serve = (handler: (req: Request) => Promise<Response>) => {
    const server = http.createServer(async (req, res) => {
      try {
        const { method, headers } = req
        const url = `http://localhost${req.url ?? '/'}`
        const chunks: Uint8Array[] = []
        for await (const chunk of req) chunks.push(chunk as Uint8Array)
        const body = chunks.length ? Buffer.concat(chunks as any).toString() : undefined
        const request = new Request(url, { method, headers: headers as any, body })
        const response = await handler(request)
        res.writeHead(response.status, Object.fromEntries(response.headers as any))
        const buffer = Buffer.from(await response.arrayBuffer())
        res.end(buffer)
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: String(err) }))
      }
    })
    const port = process.env.PORT ? parseInt(process.env.PORT) : 8000
    server.listen(port)
    console.log('Server listening on port', port)
  }
}

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
    const getEnv = (key: string) =>
      (globalThis as any).Deno?.env?.get(key) ??
      (typeof process !== 'undefined' ? process.env[key] : undefined) ??
      ''

    const supabaseUrl = getEnv('SUPABASE_URL')
    const supabaseServiceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY')
    const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY')

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
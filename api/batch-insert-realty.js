import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // 대량 삽입은 RLS를 우회하는 서비스 롤 키 권장
  );

  try {
    const { properties } = await req.json(); // 대량의 매물 데이터 배열
    if (!Array.isArray(properties)) throw new Error('Data must be an array');

    const CHUNK_SIZE = 500; // 한 번에 삽입할 적정 크기
    const results = [];

    // 데이터를 CHUNK_SIZE 단위로 루프 돌며 삽입
    for (let i = 0; i < properties.length; i += CHUNK_SIZE) {
      const chunk = properties.slice(i, i + CHUNK_SIZE);
      
      console.log(`[Batch] Inserting chunk: ${i} to ${i + chunk.length}`);
      
      const { data, error } = await supabase
        .from('properties')
        .insert(chunk)
        .select('id');

      if (error) {
        console.error(`[Batch Error] at index ${i}:`, error.message);
        // 특정 청크 실패 시 롤백하거나 기록하는 로직 추가 가능
        throw error;
      }
      
      results.push(...data);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      inserted_count: results.length,
      message: 'All batches processed successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
import { createClient } from '@supabase/supabase-js';

export const config = {
  runtime: 'edge',
};

// Supabase 클라이언트를 핸들러 외부에서 초기화하여 Edge Function의 Warm Start 성능을 최적화합니다.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is not set in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { username } = await req.json();

  if (!username) {
    return new Response(JSON.stringify({ error: 'Username is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Supabase RPC (저장 프로시저) 호출
    const { data, error } = await supabase.rpc('get_user_profile', { p_username: username });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, profile: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Supabase RPC Error:', error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

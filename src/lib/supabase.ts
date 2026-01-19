import { createClient } from '@supabase/supabase-js';

// Supabase 환경 변수는 Next.js에서 NEXT_PUBLIC_ 접두사로 시작해야 클라이언트와 서버 모두에서 접근 가능합니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL 또는 Anon Key 환경 변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요.');
}

// Supabase 클라이언트 인스턴스 생성 및 내보내기
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 환경 변수 확인 스크립트 (임시)
// 이 파일은 환경 변수가 제대로 로드되는지 확인하기 위한 것입니다.
// 사용 후 삭제해도 됩니다.

console.log('=== 환경 변수 확인 ===');
console.log('GOOGLE_GEMINI_API_KEY:', process.env.GOOGLE_GEMINI_API_KEY ? '설정됨 (길이: ' + process.env.GOOGLE_GEMINI_API_KEY.length + '자)' : '설정되지 않음');
console.log('모든 환경 변수 키:', Object.keys(process.env).filter(key => key.includes('GEMINI') || key.includes('GOOGLE')));

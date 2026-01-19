# Daily English - 영어 일기 교정 서비스

의도를 유지한 채 세련된 영어 표현으로 업그레이드하는 일기 교정 서비스입니다.

## 기술 스택

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend/DB**: Supabase
- **AI**: Google Gemini 1.5 Pro API
- **배포**: Vercel

## 프로젝트 구조

```
daily-english/
├── src/
│   └── app/              # Next.js App Router
│       ├── layout.tsx    # 루트 레이아웃
│       ├── page.tsx      # 메인 페이지
│       └── globals.css   # 전역 스타일
├── instructions.md       # 프로젝트 설계 문서
├── package.json          # 프로젝트 의존성
├── tsconfig.json         # TypeScript 설정
├── tailwind.config.ts    # Tailwind CSS 설정
└── next.config.ts        # Next.js 설정
```

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```env
# Supabase 설정
# Supabase 대시보드에서 발급받은 정보를 입력하세요
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google Gemini API 설정
# Google AI Studio에서 발급받은 API 키를 입력하세요
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
```

**주의**: `.env.local` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다. 실제 API 키는 안전하게 관리하세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 다음 단계

1. Supabase 프로젝트 생성 및 인증 설정
2. Google Gemini API 키 발급
3. 디자인 시스템 구현
4. 핵심 기능 개발 (교정 엔진)

## 참고 문서

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Google Gemini API 문서](https://ai.google.dev/docs)

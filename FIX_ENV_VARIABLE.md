# 환경 변수 이름 수정 필요

## 문제 발견
`.env.local` 파일의 변수 이름이 코드와 일치하지 않습니다.

**현재 `.env.local` 파일:**
```env
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyBT3JaCE-LpvIj2f7_3BGHTw6ZVu32jMQo
```

**코드에서 찾는 변수 이름:**
```typescript
process.env.GOOGLE_GEMINI_API_KEY
```

## 해결 방법

`.env.local` 파일을 열어서 다음과 같이 수정하세요:

### 변경 전:
```env
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyBT3JaCE-LpvIj2f7_3BGHTw6ZVu32jMQo
```

### 변경 후:
```env
GOOGLE_GEMINI_API_KEY=AIzaSyBT3JaCE-LpvIj2f7_3BGHTw6ZVu32jMQo
```

## 단계별 안내

1. 프로젝트 루트 폴더에서 `.env.local` 파일 열기
2. `NEXT_PUBLIC_GEMINI_API_KEY`를 `GOOGLE_GEMINI_API_KEY`로 변경
3. 파일 저장
4. **서버 재시작** (`Ctrl+C` → `npm run dev`)

## 참고

- `NEXT_PUBLIC_` 접두사는 클라이언트 측에서도 사용 가능하게 만드는 접두사입니다
- 서버 액션에서는 `NEXT_PUBLIC_` 없이도 접근 가능하므로, 일관성을 위해 `GOOGLE_GEMINI_API_KEY`를 사용합니다

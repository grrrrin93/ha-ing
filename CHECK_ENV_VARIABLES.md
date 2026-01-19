# 환경 변수 확인 체크리스트

## 현재 코드에서 사용하는 변수 이름
코드는 다음 환경 변수를 읽고 있습니다:
- **`GOOGLE_GEMINI_API_KEY`** (정확한 이름)

## .env.local 파일 확인 사항

### 1. 파일 위치
`.env.local` 파일이 다음 위치에 있어야 합니다:
```
daily-english/          ← 프로젝트 루트
├── .env.local          ← 여기!
├── package.json
├── src/
└── ...
```

### 2. 파일 내용 형식
**정확한 형식:**
```env
GOOGLE_GEMINI_API_KEY=AIzaSy여기에실제API키입력
```

**주의사항:**
- ✅ 따옴표 없음: `GOOGLE_GEMINI_API_KEY=키값`
- ✅ 등호(=) 양쪽 공백 없음: `GOOGLE_GEMINI_API_KEY=키값`
- ✅ 주석 없음: `GOOGLE_GEMINI_API_KEY=키값 # 주석` ❌ (주석이 같은 줄에 있으면 안 됨)
- ✅ 한 줄에 하나의 변수만

**잘못된 예시:**
```env
# 따옴표 있으면 안 됨
GOOGLE_GEMINI_API_KEY="AIzaSy..."

# 공백 있으면 안 됨
GOOGLE_GEMINI_API_KEY = AIzaSy...

# 다른 변수 이름이면 안 됨
GEMINI_API_KEY=AIzaSy...  ❌ (GOOGLE_ 접두사 필요!)
```

### 3. 파일 이름 확인
- 정확한 이름: **`.env.local`** (앞에 점 포함)
- 확장자: 없음 (`.env.local.txt` ❌)
- Windows에서 숨김 파일로 표시될 수 있음

## 디버깅 방법

코드에 디버깅 로그를 추가했습니다. 서버 터미널에서 다음을 확인하세요:

1. 서버를 재시작하세요 (`Ctrl+C` → `npm run dev`)
2. 버튼을 클릭하면 서버 터미널에 다음이 표시됩니다:
   ```
   환경 변수 확인:
   - GOOGLE_GEMINI_API_KEY 존재: true/false
   - API 키 길이: 숫자
   - 모든 GEMINI 관련 변수: [배열]
   ```

## 문제 해결 단계

1. **.env.local 파일 열기**
   - 파일이 프로젝트 루트에 있는지 확인
   - 내용이 정확한지 확인

2. **변수 이름 확인**
   - 정확히 `GOOGLE_GEMINI_API_KEY`인지 확인 (대소문자 구분!)

3. **서버 완전히 재시작**
   - `Ctrl+C`로 서버 중지
   - `npm run dev`로 다시 시작

4. **터미널 로그 확인**
   - 버튼 클릭 후 서버 터미널에 디버깅 정보 확인

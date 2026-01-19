# 환경 변수 설정 가이드

## 문제: "Gemini API 키가 설정되지 않았습니다" 에러

이 에러가 발생하는 주요 원인과 해결 방법:

## 1. 가장 중요한 해결 방법: 서버 재시작

`.env.local` 파일을 저장했거나 수정한 후에는 **반드시 개발 서버를 재시작**해야 합니다!

### 서버 재시작 방법:

1. **현재 실행 중인 서버 중지**
   - 명령 프롬프트 창에서 `Ctrl + C`를 누르세요
   - 또는 터미널 창을 닫으세요

2. **서버 다시 시작**
   ```bash
   npm run dev
   ```
   또는 `install-and-dev.bat` 파일을 다시 실행하세요

## 2. .env.local 파일 위치 확인

`.env.local` 파일은 **반드시 프로젝트 루트 디렉토리**에 있어야 합니다.

올바른 위치:
```
daily-english/
├── .env.local          ← 여기에 있어야 함!
├── package.json
├── src/
└── ...
```

잘못된 위치:
```
daily-english/
├── src/
│   └── .env.local      ← 여기 있으면 안 됨!
└── ...
```

## 3. .env.local 파일 형식 확인

파일 내용은 **정확히** 다음과 같은 형식이어야 합니다:

```env
GOOGLE_GEMINI_API_KEY=여기에_실제_API_키를_입력하세요
```

### ✅ 올바른 예시:
```env
GOOGLE_GEMINI_API_KEY=AIzaSyA1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### ❌ 잘못된 예시:
```env
# 따옴표 있으면 안 됨
GOOGLE_GEMINI_API_KEY="AIzaSyA1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"

# 공백 있으면 안 됨
GOOGLE_GEMINI_API_KEY = AIzaSyA1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

# 주석과 같은 줄에 있으면 안 됨
GOOGLE_GEMINI_API_KEY=AIzaSy... # 내 API 키
```

## 4. 파일 인코딩 확인

- 파일 인코딩: **UTF-8**로 저장되어야 합니다
- Windows 메모장에서 저장 시 "인코딩"을 "UTF-8"로 선택하세요

## 5. 파일 이름 확인

- 정확한 이름: `.env.local` (앞에 점(.)이 있어야 함!)
- 파일 확장자: 없음 (`.env.local.txt` 같은 형식이면 안 됨)

## 6. 확인 방법

서버를 재시작한 후 브라우저에서 다시 테스트해보세요.

여전히 문제가 발생한다면:
1. `.env.local` 파일을 열어 내용 확인
2. 파일 위치 확인 (프로젝트 루트)
3. 서버 완전히 재시작

## 추가 정보

- `.env.local` 파일은 Git에 커밋되지 않습니다 (보안상 안전)
- 다른 컴퓨터에서 작업할 때는 `.env.local` 파일을 새로 만들어야 합니다

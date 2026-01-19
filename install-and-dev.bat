@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo ========================================
echo Daily English 프로젝트 설정 중...
echo ========================================
echo.
echo 현재 위치: %CD%
echo.

if not exist "node_modules" (
    echo [1/2] npm install 실행 중... (처음 실행 시 몇 분 걸릴 수 있습니다)
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo 오류: npm install이 실패했습니다.
        pause
        exit /b 1
    )
    echo.
    echo npm install 완료!
    echo.
) else (
    echo node_modules가 이미 존재합니다. npm install을 건너뜁니다.
    echo.
)

echo [2/2] 개발 서버 시작 중...
echo.
echo 브라우저에서 http://localhost:3000 을 열어주세요!
echo 서버를 중지하려면 Ctrl+C를 누르세요.
echo.
call npm run dev

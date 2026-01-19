@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo 프로젝트 디렉토리로 이동 중...
echo 현재 위치: %CD%
echo.
echo npm install 실행 중...
call npm install
echo.
echo npm run dev 실행 중...
call npm run dev

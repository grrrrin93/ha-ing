"use client";

import { useState, useEffect } from "react";
import { correctDiary } from "./actions/correctDiary"; // 서버 액션
import CorrectionCard from "@/components/CorrectionCard"; // 교정 결과 카드
import DiaryList from "@/components/DiaryList"; // ✨ 새로 추가된 일기 목록 컴포넌트

// API 응답 타입 정의
interface CorrectionResult {
  formal: string;
  casual: string;
  feedback: string;
}

export default function Home() {
  const [diaryText, setDiaryText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CorrectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  
  // ✨ 일기 목록을 새로고침하기 위한 신호(Trigger) 상태
  const [refreshDiaries, setRefreshDiaries] = useState(false);

  // 일기 제출 버튼 클릭 시 호출될 함수
  const handleSubmit = async () => {
    if (!diaryText.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setSaveMessage(null);

    try {
      // AI 교정 요청 및 저장 시도
      const response = await correctDiary(diaryText);

      if (response.success) {
        setResult(response.result); // 결과 보여주기
        
        if (response.saved) {
          setSaveMessage("✨ 일기가 성공적으로 저장되었습니다!");
          // ✨ 저장이 성공했으니 목록을 새로고침하라고 신호를 보냄
          setRefreshDiaries((prev) => !prev); 
        } else {
          setSaveMessage("⚠️ 교정은 됐지만 저장은 실패했어요. (관리자 확인 필요)");
        }
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("예상치 못한 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("오류:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 저장 메시지 3초 뒤 삭제
  useEffect(() => {
    if (saveMessage) {
      const timer = setTimeout(() => setSaveMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveMessage]);

  return (
    <main className="min-h-screen bg-surface-light flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-2xl">
        
        {/* 1. 메인 제목 */}
        <header className="mb-12 text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          {/* 기존: Daily English */}
          하잉 <span className="text-primary">🍊</span> {/* ✨ 변경! 이모지는 선택 */}
        </h1>
        <p className="text-gray-500">
          오늘 하루를 영어로 기록해보세요.
        </p>
      </header>

        {/* 2. 일기 입력 영역 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <textarea
            value={diaryText}
            onChange={(e) => setDiaryText(e.target.value)}
            placeholder="예: I tried to learn coding today..."
            className="w-full min-h-[200px] sm:min-h-[300px] text-base sm:text-lg p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none placeholder:text-gray-400"
            style={{ fontFamily: "inherit" }}
          />
          <div className="mt-4 text-right text-sm text-gray-500">
            {diaryText.length}자
          </div>
        </div>

        {/* 3. 버튼 영역 */}
        <button
          onClick={handleSubmit}
          disabled={!diaryText.trim() || isLoading}
          className="w-full py-4 sm:py-5 bg-primary hover:bg-[#66E302] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg sm:text-xl rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:hover:shadow-lg relative"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              교정 중...
            </span>
          ) : (
            "원어민 표현으로 업그레이드하기"
          )}
        </button>

        {/* 4. 메시지 표시 영역 */}
        {saveMessage && (
          <div className={`mt-4 text-center text-sm font-medium animate-[fadeIn_0.3s_ease-in-out] ${saveMessage.includes('성공') ? 'text-primary' : 'text-red-500'}`}>
            {saveMessage}
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-2xl p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <h3 className="font-bold text-red-600 mb-1">오류 발생</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* 5. 결과 카드 */}
        {result && <CorrectionCard result={result} />}

        {!result && !error && !saveMessage && (
          <p className="text-center text-sm text-gray-500 mt-6 mb-12">
            💡 의도를 유지한 채 세련된 영어 표현으로 교정해드립니다
          </p>
        )}

        {/* 6. ✨ 일기 목록 컴포넌트 (하단 배치) */}
        <div className="mt-16">
           <DiaryList refreshFlag={refreshDiaries} />
        </div>

      </div>
    </main>
  );
}
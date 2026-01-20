"use client";

import { useState } from "react";
import { correctDiary } from "@/app/actions/correctDiary";
import { supabase } from "@/lib/supabase";

interface DiaryInputProps {
  userId: string;
  onDiaryAdded: () => void;
}

export default function DiaryInput({ userId, onDiaryAdded }: DiaryInputProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    try {
      // 1. AI에게 교정 요청 (이제 저장 안 하고 결과만 줌)
      const aiResult = await correctDiary(input);

      // 2. 여기서 Supabase에 저장! (닉네임 포함)
      const { error } = await supabase.from("diaries").insert([
        {
          author_id: userId,          // 닉네임
          original_text: input,       // 원본
          formal_text: aiResult.formal, // AI 결과 1
          casual_text: aiResult.casual, // AI 결과 2
          feedback: aiResult.feedback,  // AI 결과 3
          status: "active",           // 상태
        },
      ]);

      if (error) throw error;

      // 3. 성공
      setInput("");
      onDiaryAdded();

    } catch (error) {
      console.error("저장 실패:", error);
      alert("일기 저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full relative shadow-2xl rounded-2xl bg-white/90 backdrop-blur-sm border border-orange-100"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          loading
            ? "AI 선생님이 교정 중입니다... 🍊"
            : "오늘 하루는 어땠나요? (영어로 작성)"
        }
        disabled={loading}
        className="w-full p-5 pr-20 rounded-2xl border-2 border-transparent focus:border-orange-400 outline-none transition text-lg bg-transparent placeholder-gray-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="absolute right-3 top-3 bottom-3 bg-orange-500 text-white rounded-xl px-5 font-bold hover:bg-orange-600 transition disabled:bg-gray-300 flex items-center justify-center shadow-md"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          "GO"
        )}
      </button>
    </form>
  );
}
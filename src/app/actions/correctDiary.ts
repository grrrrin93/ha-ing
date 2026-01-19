"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/lib/supabase";

interface CorrectionResult {
  formal: string; // 세련된 문어체
  casual: string; // 친근한 구어체
  feedback: string; // 다정한 친구 피드백
}

export async function correctDiary(
  diaryText: string
): Promise<{ success: true; result: CorrectionResult; saved: boolean } | { success: false; error: string }> {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        error: "Gemini API 키가 설정되지 않았습니다. .env.local 파일을 확인해주세요.",
      };
    }

    if (!diaryText || diaryText.trim().length === 0) {
      return {
        success: false,
        error: "일기 내용을 입력해주세요.",
      };
    }

    // 1. Gemini API 초기화 (안정적인 1.5 Flash 또는 최신 2.5 Flash 사용)
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-lite", // 혹은 "gemini-2.5-flash"
      generationConfig: { responseMimeType: "application/json" } // JSON 출력을 강제합니다.
    });

    // 2. 프롬프트 작성
    const prompt = `You are a friendly English teacher.
The user wrote: "${diaryText}"

Respond in JSON format:
{
  "formal": "polished English",
  "casual": "conversational English",
  "feedback": "warm Korean feedback"
}`;

    // 3. API 호출
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 4. JSON 파싱 (오류가 잦은 백틱 제거 로직 개선)
    let jsonText = text.trim();
    if (jsonText.includes("```")) {
      jsonText = jsonText.replace(/```json|```/g, "").trim();
    }

    const parsedResult: CorrectionResult = JSON.parse(jsonText);

    // 5. Supabase 저장 (컬럼명을 'feedback'으로 맞췄습니다)
    let saved = false;
    const { error: dbError } = await supabase
      .from("diaries")
      .insert({
        original_text: diaryText,
        formal_text: parsedResult.formal,
        casual_text: parsedResult.casual,
        feedback: parsedResult.feedback, // 테이블 설계 당시 이름으로 수정
      });

    if (!dbError) {
      saved = true;
    } else {
      console.error("Supabase 저장 실패:", dbError.message);
    }

    return {
      success: true,
      result: parsedResult,
      saved: saved,
    };

  } catch (error: any) {
    console.error("처리 중 오류 발생:", error);
    return {
      success: false,
      error: error.message || "알 수 없는 오류가 발생했습니다.",
    };
  }
}
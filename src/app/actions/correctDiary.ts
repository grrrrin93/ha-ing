"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// Supabase 관련 코드는 여기서 삭제합니다! (화면에서 저장할 거니까요)

interface CorrectionResult {
  formal: string;
  casual: string;
  feedback: string;
}

export async function correctDiary(diaryText: string): Promise<CorrectionResult> {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) throw new Error("API 키가 없습니다.");
    if (!diaryText) throw new Error("일기 내용이 없습니다.");

    // 1. Gemini 설정
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", // 혹은 "gemini-1.5-flash" (사용 가능한 모델로)
      generationConfig: { responseMimeType: "application/json" },
    });

    // 2. 프롬프트
    const prompt = `
      You are a friendly English teacher.
      The user wrote: "${diaryText}"

      Respond in JSON format:
      {
        "formal": "Natural and polished business English version",
        "casual": "Natural daily conversation style English version",
        "feedback": "Warm and encouraging feedback in Korean"
      }
    `;

    // 3. AI 요청
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 4. JSON 파싱
    let jsonText = text.trim();
    if (jsonText.includes("```")) {
      jsonText = jsonText.replace(/```json|```/g, "").trim();
    }

    const parsedResult: CorrectionResult = JSON.parse(jsonText);

    // 5. 저장 없이 결과만 바로 반환!
    return parsedResult;

  } catch (error: any) {
    console.error("❌ AI 처리 중 에러 발생:", error);
    
    // 에러 메시지를 문자열로 가져옴
    const errorMessage = error.message || "";

    // 1. 할당량 초과 에러 (429 또는 Quota exceeded) 잡기
    if (errorMessage.includes("429") || errorMessage.includes("Quota exceeded")) {
      return {
        formal: "일일 사용량을 초과했습니다. 😭",
        casual: "내일 다시 이용해주세요!",
        feedback: "무료 버전의 하루 이용 가능 횟수가 끝났어요. (내일 다시 시도해주세요!) 🍊" 
      };
    }

    // 2. 그 외 일반적인 에러
    return {
      formal: "오류가 발생했습니다.",
      casual: "잠시 후 다시 시도해주세요.",
      feedback: `AI 연결 상태를 확인해주세요. (${errorMessage})`, 
    };
  }
}
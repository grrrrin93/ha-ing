"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import moment from "moment";
import "moment/locale/ko"; // 한국어 설정

// moment 한국어 설정 적용
moment.locale("ko");

// 데이터 타입 정의 (Supabase 테이블 컬럼과 일치해야 함)
interface Diary {
  id: number;
  original_text: string;
  formal_text: string;
  casual_text: string;
  feedback: string; // 혹은 feedback_text (DB 컬럼명 확인 필요)
  created_at: string;
  status: string; // ✨ 상태 컬럼 추가됨
}

interface DiaryListProps {
  refreshFlag: boolean;
}

export default function DiaryList({ refreshFlag }: DiaryListProps) {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Supabase에서 일기 목록 가져오기
  const fetchDiaries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("diaries")
        .select("*")
        .eq("status", "active") // ✨ 핵심: 'active' 상태인 것만 가져오기 (삭제된 건 제외)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDiaries(data || []);
    } catch (error) {
      console.error("일기 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✨ 삭제 버튼 클릭 시 실행될 함수 (Soft Delete)
  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // 삭제 버튼 눌렀을 때 카드가 펼쳐지지 않게 막음

    if (!window.confirm("정말 이 일기를 삭제하시겠습니까? (휴지통으로 이동)")) {
      return;
    }

    try {
      // DB에서 실제로 지우지 않고 상태만 'deleted'로 변경
      const { error } = await supabase
        .from("diaries")
        .update({ status: "deleted" })
        .eq("id", id);

      if (error) throw error;

      // 성공하면 목록 새로고침 (화면에서 즉시 제거)
      alert("일기가 삭제되었습니다.");
      fetchDiaries(); 

    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다. (권한 설정을 확인하세요)");
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, [refreshFlag]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) return <div className="text-center py-10 text-gray-400">일기장을 불러오는 중...</div>;
  if (diaries.length === 0) return <div className="text-center py-10 text-gray-400">아직 작성된 일기가 없습니다.</div>;

  return (
    <div className="w-full animate-[fadeIn_0.5s_ease-in-out]">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        나의 영어 일기 📚
      </h2>
      
      <div className="space-y-4">
        {diaries.map((diary) => (
          <div 
            key={diary.id} 
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:scale-[1.01] transition-transform cursor-pointer relative group"
            onClick={() => toggleExpand(diary.id)}
          >
            {/* ✨ 삭제 버튼 (평소엔 숨겨져 있다가 마우스 올리면(group-hover) 나타남) */}
            <button
              onClick={(e) => handleDelete(e, diary.id)}
              className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              title="삭제하기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>

            {/* 카드 헤더 */}
            <div className="p-6 flex justify-between items-center">
              <div className="flex flex-col gap-1 overflow-hidden pr-10">
                <h3 className="text-xl font-semibold text-gray-800">
                  {moment(diary.created_at).format("YYYY년 M월 D일")}
                </h3>
                <p className="text-gray-600 truncate mt-1">
                  {diary.original_text}
                </p>
              </div>
              <span className="text-primary text-lg flex-shrink-0">
                {expandedId === diary.id ? "▲" : "▼"}
              </span>
            </div>

            {/* 카드 상세 내용 */}
            {expandedId === diary.id && (
              <div className="px-6 pb-6 pt-0 border-t border-gray-100 bg-white space-y-4 animate-[fadeIn_0.3s_ease-in-out]">
                
                {/* 1. 원문 */}
                 <div className="mt-4">
                  <p className="font-bold text-gray-700 mb-1">원문:</p>
                  <p className="text-gray-600 whitespace-pre-wrap">{diary.original_text}</p>
                </div>

                {/* 2. 세련된 문어체 */}
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="font-bold text-blue-800 mb-1">Formal (문어체):</p>
                  <p className="text-gray-800">{diary.formal_text}</p>
                </div>

                {/* 3. 친근한 구어체 */}
                <div className="bg-green-50 p-4 rounded-xl">
                   <p className="font-bold text-green-800 mb-1">Casual (구어체):</p>
                  <p className="text-gray-800">{diary.casual_text}</p>
                </div>

                {/* 4. AI 피드백 */}
                <div className="bg-orange-50 p-4 rounded-xl">
                   <p className="font-bold text-orange-800 mb-1">AI 피드백:</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{diary.feedback}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
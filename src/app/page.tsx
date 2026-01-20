// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import DiaryList from '@/components/DiaryList';
import DiaryInput from '@/components/DiaryInput';

export default function Home() {
  const [userId, setUserId] = useState<string>(''); // 현재 로그인한 닉네임
  const [tempId, setTempId] = useState(''); // 입력창에 치고 있는 값
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부

  // 1. 페이지 열리면 "저장된 닉네임 있나?" 확인
  useEffect(() => {
    const savedId = localStorage.getItem('haing_user_id');
    if (savedId) {
      setUserId(savedId);
      setIsLogin(true);
    }
  }, []);

  // 2. [시작하기] 버튼 누르면 실행
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempId.trim()) return;
    localStorage.setItem('haing_user_id', tempId); // 브라우저에 저장 (새로고침해도 유지)
    setUserId(tempId);
    setIsLogin(true);
  };

  // 3. [로그아웃] 버튼 누르면 실행
  const handleLogout = () => {
    localStorage.removeItem('haing_user_id');
    setIsLogin(false);
    setUserId('');
  };

  // 🌟 로그인 안 했을 때 보여줄 화면 (온보딩)
  if (!isLogin) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-orange-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">하잉 <span className="text-primary">🍊</span></h1>
          <p className="text-gray-500 mb-8">나만의 닉네임으로 시작하세요!</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="닉네임 입력 (예: apple)"
              value={tempId}
              onChange={(e) => setTempId(e.target.value)}
              className="w-full p-4 border-2 border-orange-100 rounded-xl focus:border-orange-500 outline-none transition"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition"
            >
              시작하기
            </button>
          </form>
        </div>
      </main>
    );
  }

  // 🌟 로그인 했을 때 보여줄 화면 (기존 앱 화면)
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto pb-24">
      <header className="mb-12 text-center space-y-2 relative">
        <button onClick={handleLogout} className="absolute right-0 top-0 text-xs text-gray-400 underline">로그아웃</button>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          하잉 <span className="text-primary">🍊</span>
        </h1>
        <p className="text-gray-500">
          <span className="font-bold text-orange-600">{userId}</span>님의 영어 기록장
        </p>
      </header>
      
      {/* 닉네임을 전달해서 "내 글만 보여줘!" 라고 시킴 */}
      <DiaryList userId={userId} />
      
      {/* 닉네임을 전달해서 "내가 쓴 거야!" 라고 저장함 */}
      <div className="fixed bottom-8 left-0 right-0 px-4 max-w-2xl mx-auto">
        <DiaryInput userId={userId} onDiaryAdded={() => window.location.reload()} />
      </div>
    </main>
  );
}
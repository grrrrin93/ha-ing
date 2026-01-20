import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "하잉 - AI와 함께하는 영어 일기",
  description: "매일 쓰는 영어 일기, AI가 자연스럽게 고쳐드려요.",
  // 👇 여기부터 추가/수정하세요!
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png', // 아이폰용
    shortcut: '/icon-192.png', // 안드로이드 바로가기용
  },
  manifest: '/manifest.webmanifest', // (선택사항이지만 적어두면 좋습니다)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}

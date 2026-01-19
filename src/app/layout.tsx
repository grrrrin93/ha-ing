import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily English - 영어 일기 교정",
  description: "의도를 유지한 채 세련된 영어 표현으로 업그레이드하는 일기 교정 서비스",
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

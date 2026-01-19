import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "하잉 - AI와 함께하는 영어 일기",
  description: "매일 쓰는 영어 일기로 회화 연습까지!",
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

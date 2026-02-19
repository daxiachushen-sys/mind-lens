import type { Metadata } from "next";
// 🚀 必须加上下面这一行，否则 Tailwind 样式不会生效！
import "./globals.css"; 

export const metadata: Metadata = {
  title: "Mind Lens - 神经社交解码实验室",
  description: "解码社交潜台词的 AI 代理",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      {/* 移除了内联 style，交给 globals.css 和 Tailwind 处理 */}
      <body>
        {children}
      </body>
    </html>
  );
}

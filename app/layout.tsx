import type { Metadata } from "next";

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
      {/* 这里的 style 是为了确保背景是纯黑，且没有多余的边距 */}
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0a0a0a' }}>
        {children}
      </body>
    </html>
  );
}

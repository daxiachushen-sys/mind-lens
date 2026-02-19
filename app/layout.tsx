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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

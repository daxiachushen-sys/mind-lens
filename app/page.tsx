export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex">
        <div className="border border-green-500/50 bg-green-500/10 p-8 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          <h1 className="text-4xl font-bold text-green-500 mb-4 animate-pulse">
            SYSTME ACTIVATED
          </h1>
          <p className="text-gray-400 text-lg">
            大侠，心之眼（Mind-Lens）实验室已成功连接云端。
          </p>
          <div className="mt-6 flex gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-ping"></span>
            <span className="text-green-500/80">核心逻辑就绪，等待注入 AI 意识...</span>
          </div>
        </div>
      </div>
    </main>
  );
}

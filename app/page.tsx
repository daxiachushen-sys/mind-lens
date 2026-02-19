"use client";
import React, { useState } from 'react';

export default function MindLensLab() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setResult(null); // 清空上次结果

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content: input,    // 匹配后端要求的 content
          mode: "Deep Analysis",
          mask: "Fox",       // 默认狐狸人格
          lang: "Chinese",
          type: "chat"
        }),
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setResult({ subtext: "神经链路中断，请检查 API Key 或网络。", suggestions: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#00ff41', minHeight: '100vh', padding: '20px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h1 style={{ borderBottom: '2px solid #00ff41', paddingBottom: '10px', textAlign: 'center', letterSpacing: '2px' }}>
          MIND LENS SYSTEM v1.0
        </h1>
        
        <div style={{ marginTop: '30px' }}>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入对方发来的话（例如：你人真好，但我现在不想谈恋爱）"
            style={{ width: '100%', height: '120px', backgroundColor: '#1a1a1a', border: '1px solid #00ff41', color: '#00ff41', padding: '15px', outline: 'none', fontSize: '16px', borderRadius: '4px' }}
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            style={{ width: '100%', backgroundColor: loading ? '#333' : '#00ff41', color: '#000', border: 'none', padding: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px', fontSize: '18px', transition: '0.3s' }}
          >
            {loading ? "正在解析神经脉冲..." : "启动深度解码"}
          </button>
        </div>

        {result && (
          <div style={{ marginTop: '30px', border: '1px solid #00ff41', padding: '25px', backgroundColor: 'rgba(0,255,65,0.05)', borderRadius: '8px', animation: 'fadeIn 0.5s' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#ff00ff', marginBottom: '10px' }}>▶ 潜台词解析 (SUBTEXT)</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#fff' }}>{result.subtext}</p>
            </div>
            
            <div>
              <h3 style={{ color: '#008cff', marginBottom: '10px' }}>▶ 应对策略 (SUGGESTIONS)</h3>
              {result.suggestions?.map((s: any, i: number) => (
                <div key={i} style={{ marginBottom: '15px', padding: '10px', borderLeft: '3px solid #008cff', backgroundColor: 'rgba(0,140,255,0.1)' }}>
                  <span style={{ fontWeight: 'bold', color: '#008cff' }}>[{s.label}]</span>
                  <p style={{ marginTop: '5px', color: '#ccc' }}>{s.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

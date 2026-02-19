"use client";
import React, { useState } from 'react';

export default function MindLensLab() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content: input,
          mode: "Deep Analysis",
          mask: "Fox",
          lang: "Chinese",
          type: "chat"
        }),
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setResult({ subtext: "神经链路中断，请检查 API Key 或环境变量设置。", suggestions: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#00ff41', minHeight: '100vh', padding: '20px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        
        {/* --- 标题修改区：如果网页没出现这行红字，说明 Vercel 没读到新代码 --- */}
        <h1 style={{ color: '#ff0000', textAlign: 'center', border: '5px solid #ff0000', padding: '10px', marginBottom: '20px' }}>
          【检测中】MIND LENS 核心系统已更新
        </h1>
        {/* ------------------------------------------------------------ */}

        <div style={{ marginTop: '30px' }}>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="在此输入需要解码的言论..."
            style={{ width: '100%', height: '120px', backgroundColor: '#111', border: '2px solid #00ff41', color: '#00ff41', padding: '15px', outline: 'none', fontSize: '16px' }}
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            style={{ width: '100%', backgroundColor: loading ? '#333' : '#00ff41', color: '#000', border: 'none', padding: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px', fontSize: '18px' }}
          >
            {loading ? "正在解析..." : "立即启动深度解码"}
          </button>
        </div>

        {result && (
          <div style={{ marginTop: '30px', border: '1px solid #00ff41', padding: '25px', backgroundColor: 'rgba(0,255,65,0.1)' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#ff00ff' }}>▶ 潜台词：</h3>
              <p style={{ fontSize: '18px', color: '#fff' }}>{result.subtext}</p>
            </div>
            
            <div>
              <h3 style={{ color: '#008cff' }}>▶ 狐狸建议：</h3>
              {result.suggestions?.map((s: any, i: number) => (
                <div key={i} style={{ marginBottom: '10px', padding: '5px', borderLeft: '3px solid #008cff' }}>
                  <strong>{s.label}:</strong> {s.content}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

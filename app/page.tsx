"use client";
import React, { useState } from 'react';

export default function MindLensLab() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'SYSTEM READY. 社交解码器已上线，请输入对方的言论进行深度分析...' }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }, { role: 'ai', content: '分析模块正在接入 DeepSeek API... (连接成功)' }]);
    setInput('');
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#00ff41', minHeight: '100vh', padding: '20px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #00ff41', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>MIND-LENS-LAB_v1.0</h1>
      </header>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%',
            padding: '10px',
            borderRadius: '4px',
            border: `1px solid ${msg.role === 'user' ? '#008cff' : '#00ff41'}`,
            backgroundColor: msg.role === 'user' ? 'rgba(0,140,255,0.1)' : 'rgba(0,255,65,0.05)'
          }}>
            <span style={{ fontSize: '0.7rem', display: 'block', marginBottom: '5px', opacity: 0.7 }}>
              [{msg.role === 'user' ? 'USER_INPUT' : 'AI_RESPONSE'}]
            </span>
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="输入待解码的社交信号..."
          style={{ flex: 1, backgroundColor: '#1a1a1a', border: '1px solid #00ff41', color: '#00ff41', padding: '10px', outline: 'none' }}
        />
        <button 
          onClick={handleSend}
          style={{ backgroundColor: '#00ff41', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          解码
        </button>
      </div>
    </div>
  );
}

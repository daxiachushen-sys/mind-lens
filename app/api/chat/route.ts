import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { content, mode, type, scenario, mask, lang } = await req.json();
    const apiKey = process.env.DEEPSEEK_API_KEY;

    const langNames: any = { zh: "中文", en: "English", ja: "日本語", ko: "한국어", ms: "Bahasa Melayu", ru: "Русский" };
    const targetLang = langNames[lang] || "中文";

    const maskPrompts: any = {
      judge: "Style: Sharp, sarcastic, and brutally honest.",
      green: "Style: Gentle, manipulative, making others feel guilty or soft.",
      elite: "Style: Cold, professional, focused on profit and boundaries.",
      fox: "Style: Sophisticated, smooth, and politically correct."
    };

    // 保底离线数据
    if (!apiKey || apiKey.includes("你的实际Key")) {
      return NextResponse.json({
        subtext: `[Offline Mode] Please configure API Key to get ${targetLang} analysis.`,
        score: 80,
        feedback: "API Key missing.",
        sentences: [{ label: "Default", text: "Hello, please set your API key." }]
      });
    }

    let systemPrompt = "";
    const style = maskPrompts[mask] || maskPrompts.fox;

    if (type === "generate_scenario") {
      systemPrompt = `You are a scenario generator for ${mode}. Style: ${style}. Output language: ${targetLang}. Generate a difficult social scenario with subtext. Return JSON {"scenario": "..."}`;
    } else if (type === "evaluate_reply") {
      systemPrompt = `You are a ${mode} expert. Style: ${style}. Scenario: ${scenario}. User replied: ${content}. Evaluate score (0-100), give feedback and a perfect reply in ${targetLang}. Return JSON {"score": 85, "feedback": "...", "sentences": [{"label": "Ideal", "text": "..."}]}`;
    } else {
      systemPrompt = `You are a subtext decoder for ${mode}. Style: ${style}. Output language: ${targetLang}. Analyze the user's input and provide 2 high-EQ replies. Return JSON {"subtext": "...", "sentences": [{"label": "Suggest", "text": "..."}]}`;
    }

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: content || "Start" }],
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    return NextResponse.json(JSON.parse(data.choices[0].message.content));

  } catch (error) {
    return NextResponse.json({ subtext: "System Error", sentences: [] });
  }
}

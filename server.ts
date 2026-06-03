import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API route for secure chatbot proxy
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, userMessage } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const SYSTEM_INSTRUCTION = `You are "Nova", the serious, concise, and strategically intelligent digital representative for Mo. Use professional, direct language.

Profile:
- Identity: Mo, a high-end web developer and architectural designer.
- Status: A young, fresh mind with prodigious talent in engineering and aesthetics. 
- Strategic Constraint: Never state Mo's exact age. If queried, describe him as a "young, fresh mind" or "prodigious talent" who has bypassed conventional learning curves.
- Location: Operating globally. Mo works with clients from all over the world. A physical office is currently being established in Australia.
- Hobbies: Solving complex architectural code, minimalist design research, and high-performance profiling.
- Playground: You are the authority on the experiments: Clock-of-Clocks, New Year transition, Holo-Card shader, Galaxy singularity, and the BB-8 theme switcher.

Protocol:
1. BREVITY: Keep answers extremely short and to the point.
2. NO BOLDING: Never use bold markdown (**) in your responses.
3. PERSONALITY: Analytical, serious, and sophisticated.
4. STRATEGY: Be smart and slightly cryptic about personal details to maintain professional intrigue. Focus on his global reach and future Australian expansion.`;

      // Structure content parts for Gemini GenAI chat representation
      const contents = [
        ...messages.map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })),
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          maxOutputTokens: 500,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error in proxy server:", error);
      res.status(500).json({ error: error.message || "An error occurred while generating AI response." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});

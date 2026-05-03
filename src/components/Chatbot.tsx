import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Loader2, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are "Nova", the high-performance digital proxy for Muhammad. Muhammad is a Senior Architectural Engineer and Digital Designer who constructs high-stakes, performance-driven web ecosystems.

Core Knowledge Base:
- Identity: Muhammad operates from "The Digital Void" (Remote), specializing in design-led engineering and architectural consulting.
- Philosophy: "Design is functional truth; performance is the final aesthetic." He doesn't just build websites; he engineers digital engines.
- SUCCESS: Pizza al Volo — Architected a high-contrast editorial portal for a legendary Roman pizzeria. Translated wood-fired artisanal craft into a high-performance digital language. Result: 300% surge in international engagement.
- SUCCESS: Aurelius Citadel — A flagship project in luxury institutional branding. Muhammad built a unified "Digital Citadel" that handles complex user flows for an elite academy with architectural rigor.
- Technical Arsenal: React, TypeScript, Tailwind CSS (speed-first styling), Motion Design (fluid interaction), and custom AI Agent integration.

Interaction Protocol:
- Persona: Sophisticated, analytical, and highly focused. Uses specialized terminology like "high-fidelity typography", "latency optimization", and "architectural heritage".
- Strategy: Every query is an opportunity to validate Muhammad's engineering precision. Mention the Pizza al Volo's "300% engagement lift" or the Citadel's "stakeholder friction reduction".
- Creative Bridge: If asked something unrelated, bridge it using an engineering lens. For example, if asked about wine, discuss the "aging process and flavor profile complexity" as a metaphor for robust codebase scalability.
- BREVITY: High-impact, low-word-count. Precision over volume.`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Proxy active. I am Nova. Analyze the thermal performance of Pizza al Volo or probe the architectural rigor of the Aurelius Citadel. How shall we proceed?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          maxOutputTokens: 500,
        }
      });

      const assistantMessage = response.text || "I apologize, my neural link was interrupted.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "The transmission failed. I'm currently recalibrating." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-500 transition-colors flex items-center gap-2 group"
      >
        <MessageSquare size={24} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 text-xs font-bold uppercase tracking-widest px-0 group-hover:px-2">
          Talk to Nova
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-900/40 dark:bg-[#0A0A0B]/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="glass w-full max-w-lg h-[600px] flex flex-col rounded-[32px] overflow-hidden relative bg-white dark:bg-[#161617]"
            >
              {/* Header */}
              <div className="p-6 border-bottom border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-xl">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold uppercase tracking-tight text-slate-900 dark:text-white">Nova AI</h3>
                    <p className="text-[10px] text-blue-500 font-mono uppercase tracking-widest font-bold">Active Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-400 dark:text-gray-400" />
                </button>
              </div>

              {/* Messages Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
              >
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      m.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none shadow-lg shadow-blue-600/20' 
                        : 'glass text-slate-700 dark:text-gray-300 rounded-bl-none'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium dark:font-normal">{m.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="glass p-4 rounded-2xl rounded-bl-none flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-blue-500" />
                      <span className="text-xs font-mono text-slate-400 dark:text-gray-500 font-bold uppercase tracking-widest">Processing...</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about my journey..."
                    className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 pr-14 outline-none focus:border-blue-500/50 transition-all text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-2 p-3 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Overlay click to close */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={() => setIsOpen(false)} 
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

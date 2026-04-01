// Mango OS: High-end AI Chat 시작
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ShieldCheck, TrendingUp, Globe } from 'lucide-react';

/**
 * RealtyAiChat Component
 * - Theme: Premium Dark Glass & Mango Orange
 * - Feature: FAQ Chips, Slide-up UX, Smooth Animations
 */
export const RealtyAiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "반갑습니다, SkyMango님. Mango Advisor입니다. 어떤 지역의 투자 가치를 분석해 드릴까요?" }
  ]);
  const chatEndRef = useRef(null);

  const faqChips = [
    { label: '이 지역 안전해?', icon: <ShieldCheck size={12} /> },
    { label: '수익률 계산해줘', icon: <TrendingUp size={12} /> },
    { label: '외국인 구매 가능?', icon: <Globe size={12} /> }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-24 right-6 z-[999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className="w-full max-w-[420px] h-[600px] mb-4 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* 챗봇 헤더 */}
            <div className="p-6 bg-gradient-to-r from-[#FF8C00]/20 to-transparent border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                <span className="font-black text-white italic tracking-tighter uppercase text-sm">Mango AI Advisor</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
            </div>

            {/* 대화 영역 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-5 py-3.5 rounded-[1.5rem] text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#FF8C00] text-black font-extrabold shadow-[0_5px_15px_rgba(255,140,0,0.3)]' 
                      : 'bg-white/10 text-white border border-white/10'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* 추천 FAQ 칩 (Horizontal Scroll) */}
            <div className="px-6 py-3 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5">
              {faqChips.map((chip) => (
                <button key={chip.label} className="flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-gray-400 hover:text-white hover:border-[#FF8C00]/50 transition-all active:scale-95">
                  {chip.icon} {chip.label}
                </button>
              ))}
            </div>

            {/* 입력창 (Glowing Input) */}
            <div className="p-6 pt-2 bg-[#050505]/50">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF8C00] to-yellow-500 rounded-[1.5rem] opacity-20 group-focus-within:opacity-50 blur transition duration-500"></div>
                <input 
                  type="text" 
                  placeholder="Ask about Global Property..." 
                  className="relative w-full bg-black border-none rounded-[1.5rem] px-6 py-4 text-sm text-white focus:outline-none placeholder:text-gray-600"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FF8C00] font-black text-xs px-2 tracking-widest hover:scale-110 transition-transform italic">SEND</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-br from-[#FF8C00] to-yellow-500 rounded-full flex items-center justify-center text-black shadow-[0_10px_30px_rgba(255,140,0,0.4)] z-[1000]"
      >
        {isOpen ? <X size={28} strokeWidth={3} /> : <MessageCircle size={28} strokeWidth={3} />}
      </motion.button>
    </div>
  );
};
// Mango OS: High-end AI Chat 끝
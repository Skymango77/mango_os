import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MoreVertical, Search, Plus, Send, Smile, Gift, Globe, FileText, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MANGO SUPER APP - ChatRoom (Module 1)
 * Production-Ready Hyper-Chat UI with Luxury Glassmorphism
 */
const ChatRoom = () => {
  const currentUsername = "SkyMango"; // Mock current user
  const partner = { name: 'Sarah', poa: 85 };
  
  const [messages, setMessages] = useState([
    { id: 1, sender: "Sarah", text: "안녕하세요! 망고 부동산(mPi) 매물 보러 오셨나요? 🏠", timestamp: '14:20', unreadCount: 0 },
    { id: 2, sender: "SkyMango", text: "네, 부산 노드 쪽 매물 리스트 보고 싶습니다.", timestamp: '14:21', unreadCount: 1 },
  ]);

  const [inputText, setInputText] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "SkyMango",
      timestamp: new Date().toLocaleTimeString(),
      unreadCount: 1,
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const PlusMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-20 left-4 w-52 bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-3 shadow-2xl z-50"
    >
      <div className="flex flex-col gap-2">
        {[
          { label: 'Pi Gift', icon: Gift, color: 'bg-orange-500', text: 'text-black' },
          { label: 'Translate', icon: Globe, color: 'bg-blue-500', text: 'text-white' },
          { label: 'Realty Contract', icon: FileText, color: 'bg-emerald-500', text: 'text-white' }
        ].map((item) => (
          <button key={item.label} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-all group">
            <div className={`w-9 h-9 ${item.color} ${item.text} rounded-xl flex items-center justify-center shadow-lg group-active:scale-90 transition-transform`}>
              <item.icon size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-white">{item.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-screen max-w-[480px] mx-auto bg-[#050505] text-white overflow-hidden border-x border-white/5 relative font-sans">
      {/* Ambient Lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5 px-4 py-4 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-6 h-6 text-white/60 hover:text-orange-500 cursor-pointer transition-colors" />
          <div>
            <h2 className="text-md font-bold leading-tight">{partner.name}</h2>
            <div className="flex items-center gap-1.5">
              <Zap size={10} className="text-orange-500 fill-orange-500 animate-pulse" />
              <span className="text-[10px] text-orange-500 font-black uppercase tracking-widest">Mango PoA: {partner.poa}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/40">
          <Search className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          <MoreVertical className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
        </div>
      </header>

      {/* Chat Area */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar relative z-0">
        {messages.map((msg) => {
          const isMe = msg.sender === currentUsername;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`max-w-[75%] px-4 py-3 rounded-2xl backdrop-blur-md shadow-xl border transition-all ${
                  isMe 
                    ? 'bg-orange-600 border-orange-500 text-white font-semibold rounded-tr-none' 
                    : 'bg-white/5 border-white/10 text-white/90 rounded-tl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </motion.div>
              
              {/* Meta Info (Read Receipt + Timestamp) */}
              <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-1`}>
                <div className={`flex items-center gap-1 ${isMe ? 'flex-row' : 'flex-row-reverse'}`}>
                  {msg.unreadCount > 0 && <span className="text-yellow-400 text-[10px] font-black">1</span>}
                  <span className="text-[8px] text-white/20 font-bold uppercase tracking-tighter">{msg.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* Dynamic Footer */}
      <footer className="p-4 bg-black/80 backdrop-blur-2xl border-t border-white/5 z-50 relative">
        <AnimatePresence>
          {showPlusMenu && <PlusMenu />}
        </AnimatePresence>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPlusMenu(!showPlusMenu)}
            className={`p-2.5 rounded-2xl border transition-all active:scale-90 ${
              showPlusMenu ? 'bg-orange-500 text-black border-orange-500' : 'bg-white/5 text-white/40 border-white/10 hover:text-orange-500'
            }`}
          >
            <Plus className="w-6 h-6" />
          </button>
          
          <div className="flex-1 relative flex items-center group">
            <input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              type="text" 
              placeholder="Mango Secure Message..." 
              className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/50 transition-all text-white placeholder:text-white/40 shadow-inner"
            />
            <Smile className="absolute right-3 w-5 h-5 text-white/20 cursor-pointer hover:text-orange-500 transition-colors" />
          </div>

          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`p-3 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center ${
              inputText.trim() ? 'bg-orange-500 text-black shadow-orange-500/20' : 'bg-white/5 text-white/20 border border-white/5'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatRoom;
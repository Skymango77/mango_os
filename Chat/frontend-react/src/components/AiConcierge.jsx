import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Coffee, TrendingUp, X, ChevronRight } from 'lucide-react';

/**
 * MANGO PREDICTIVE AI CONCIERGE 7.0
 * Visual Interface for the Neural Engine.
 */

const ActionCard = ({ suggestion, onApprove }) => (
  <motion.div 
    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
    className="p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer transition-all group"
    onClick={() => onApprove(suggestion)}
  >
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2">
        {suggestion.action.type === 'FINANCE' ? 
          <TrendingUp size={14} className="text-orange-500" /> : 
          <Coffee size={14} className="text-cyan-400" />
        }
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
          {suggestion.reason}
        </span>
      </div>
      <span className="text-[10px] font-bold text-orange-500 italic">
        {suggestion.action.trustBoost}
      </span>
    </div>
    <h4 className="text-sm font-bold text-white group-hover:text-orange-500 transition-colors">
      {suggestion.action.label}
    </h4>
    <div className="mt-3 flex justify-end">
      <ChevronRight size={16} className="text-white/20 group-hover:translate-x-1 transition-transform" />
    </div>
  </motion.div>
);

const AiConcierge = ({ userData, nearPioneers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [hasNew, setHasNew] = useState(false);

  // Simulate Neural Analysis on Load
  useEffect(() => {
    // In production, this calls the backend NeuralEngine.js
    setTimeout(() => {
      const mockSuggestions = [
        {
          reason: "Premium Realty Match",
          action: { type: 'FINANCE', label: "Invest in Lotte Castle Penthouse", trustBoost: "+15% Yield", draft: "I am ready to send 10 Pi as a deposit." }
        },
        {
          reason: "Social Trust Build",
          action: { type: 'SOCIAL', label: "Meet Elena for Coffee", trustBoost: "+5% Trust", draft: "Hi Elena, noticed you're nearby. Sync for coffee?" }
        }
      ];
      setSuggestions(mockSuggestions);
      setHasNew(true);
    }, 3000);
  }, []);

  const handleAction = (s) => {
    console.log(`[AI Concierge] Pre-drafting: ${s.action.draft}`);
    setIsOpen(false);
    // Integration Hook: document.getElementById('chat-input').value = s.action.draft;
  };

  return (
    <div className="fixed bottom-24 right-6 z-[999] pointer-events-none">
      <div className="relative pointer-events-auto">
        
        {/* --- NEURAL ORB --- */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: hasNew 
              ? ["0 0 20px rgba(249,115,22,0.2)", "0 0 40px rgba(249,115,22,0.6)", "0 0 20px rgba(249,115,22,0.2)"]
              : ["0 0 10px rgba(255,255,255,0.1)", "0 0 20px rgba(255,255,255,0.2)", "0 0 10px rgba(255,255,255,0.1)"]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          onClick={() => { setIsOpen(true); setHasNew(false); }}
          className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-3xl border border-white/20
            ${hasNew ? 'bg-gradient-to-tr from-orange-500 to-yellow-500' : 'bg-white/10'}
          `}
        >
          <div className="absolute inset-0 rounded-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <Sparkles className={hasNew ? "text-black animate-pulse" : "text-orange-500"} size={24} />
          
          {/* Suggestion Pulse */}
          {hasNew && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-bounce" />
          )}
        </motion.div>

        {/* --- NEURAL BRIEFING OVERLAY --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-20 right-0 w-[320px] glass-panel rounded-[2.5rem] p-6 border-orange-500/30 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden"
              style={{ backgroundColor: 'rgba(5, 5, 5, 0.95)' }}
            >
              {/* Gold Dust Particles */}
              <div className="absolute inset-0 pointer-events-none opacity-30">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute bg-orange-500 rounded-full blur-[1px]"
                    style={{ 
                      width: '2px', height: '2px', 
                      top: `${Math.random()*100}%`, left: `${Math.random()*100}%`,
                      animation: `pulse 2s infinite ${Math.random()}s`
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-orange-500 fill-orange-500" />
                    <h2 className="text-xs font-black italic tracking-widest text-white uppercase">Neural Briefing</h2>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-3">
                  {suggestions.map((s, idx) => (
                    <ActionCard key={idx} suggestion={s} onApprove={handleAction} />
                  ))}
                </div>

                <p className="mt-6 text-[8px] text-center text-white/20 font-bold uppercase tracking-[0.4em]">
                  AI Analysis based on current GPS & Pi Liquidity
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx="true">{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default AiConcierge;

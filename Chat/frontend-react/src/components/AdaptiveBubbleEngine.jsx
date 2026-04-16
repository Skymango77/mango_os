import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, 
  Home, 
  GraduationCap, 
  CheckCircle2, 
  ExternalLink, 
  Coins,
  ArrowUpRight
} from 'lucide-react';

/**
 * MANGO ADAPTIVE TRANSACTIONAL BUBBLE ENGINE 6.0
 * Transforms static messages into interactive Micro-Apps.
 */

// --- Micro-App: PiGiftBubble ---
const PiGiftBubble = ({ data, isMe }) => {
  const [status, setStatus] = useState('sealed'); // 'sealed', 'opening', 'opened'

  const handleOpenGift = async () => {
    setStatus('opening');
    // Placeholder for Pi SDK: Simulate transaction verification
    setTimeout(() => {
      setStatus('opened');
      console.log(`[Pi SDK] Finalizing gift transaction for ${data.id}`);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative w-64 overflow-hidden rounded-3xl border ${status === 'opening' ? 'border-[#f97316] animate-pulse' : 'border-white/10'} bg-zinc-950/90 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]`}
    >
      {/* Luxury Pi Watermark */}
      <div className="absolute -right-4 -top-6 opacity-[0.04] pointer-events-none select-none">
        <span className="text-[120px] font-orb font-black text-white italic">π</span>
      </div>

      <div className="bg-gradient-to-br from-[#f97316]/20 to-transparent p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-[#f97316] to-[#fbbf24] rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(249,115,22,0.5)]">
          <span className="text-xl font-black font-orb">π</span>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-none">Luxury Gift</p>
          <h4 className="text-sm font-bold text-[#f97316] italic">{data.item_name || 'Golden Treasure'}</h4>
        </div>
      </div>

      <div className="p-5 flex flex-col items-center gap-4">
        <AnimatePresence mode="wait">
          {status === 'sealed' && (
            <motion.div key="sealed" exit={{ y: -20, opacity: 0 }} className="text-center">
              <div className="text-4xl mb-3 drop-shadow-glow">🎁</div>
              <button 
                onClick={handleOpenGift}
                className="w-full py-2 bg-[#f97316] text-black text-[10px] font-black uppercase tracking-tighter rounded-full shadow-lg hover:brightness-110 transition-all"
              >
                Open with Pi Network
              </button>
            </motion.div>
          )}
          {status === 'opening' && (
            <motion.div key="opening" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin mb-2" />
              <p className="text-[9px] font-bold text-white/60 animate-pulse">VERIFYING BLOCKCHAIN...</p>
            </motion.div>
          )}
          {status === 'opened' && (
            <motion.div key="opened" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center">
              <div className="text-4xl mb-2">💎</div>
              <p className="text-[10px] text-emerald-400 font-bold uppercase">Success! 0.05 π Added</p>
              <button className="mt-3 text-[8px] text-white/20 underline uppercase tracking-widest">View Receipt</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- Micro-App: RealtyBubble ---
const RealtyBubble = ({ data }) => {
  const [signed, setSigned] = useState(false);

  const handleSign = () => {
    // Generate a unique hash for the contract placeholder
    const contractHash = `SIG_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setSigned(true);
    console.log(`[Pi Smart Contract] Signing request generated: ${contractHash}`);
  };

  return (
    <div className="w-72 premium-glass rounded-3xl overflow-hidden border border-white/5 bg-zinc-950/40 backdrop-blur-3xl shadow-2xl">
      <div className="relative aspect-video bg-zinc-900 overflow-hidden">
        {/* Placeholder for 360 Viewer */}
        <img src={data.image_url || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"} className="w-full h-full object-cover opacity-60" alt="Apartment" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-[#f97316] rounded-full animate-pulse" />
          <span className="text-[9px] font-black text-white uppercase tracking-widest">360° Interactive</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-tight">{data.title || 'Elite Penthouse'}</h4>
          <p className="text-[9px] text-white/40">{data.location || 'Busan, Haeundae District'}</p>
        </div>
        
        <div className="flex justify-between items-end border-t border-white/5 pt-3">
          <div className="text-xs font-orb font-black text-[#f97316] tracking-tighter">
            {data.price_pi || '450,000'} <span className="text-[10px]">π</span>
          </div>
          <button 
            disabled={signed}
            onClick={handleSign}
            className={`px-4 py-2 rounded-xl text-[9px] font-black transition-all ${signed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white text-black hover:bg-[#f97316] shadow-lg'}`}
          >
            {signed ? 'CONTRACT SIGNED' : 'SIGN CONTRACT'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Micro-App: EduBubble ---
const EduBubble = ({ data }) => {
  return (
    <div className="max-w-[280px] premium-glass p-4 rounded-2xl border-l-4 border-[#f97316] bg-zinc-950/60 shadow-xl">
      <div className="flex items-center gap-2 mb-3">
        <GraduationCap size={14} className="text-[#f97316]" />
        <span className="text-[10px] font-black text-[#f97316] uppercase tracking-[0.2em]">AI Learning Lab</span>
      </div>
      
      <div className="text-sm text-white/90 leading-relaxed font-medium">
        {/* AI Corrected Text Logic Placeholder */}
        Developing on 
        <span className="border-b-2 border-dashed border-[#f97316] mx-1 text-white">Pi Network</span> 
        requires high-performance 
        <span className="border-b-2 border-dashed border-[#f97316] mx-1 text-white">Web3</span> 
        architectures.
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-[9px] text-white/20">Corrected by Mango AI</span>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 rounded-lg border border-white/5 hover:border-[#f97316]/50 transition-all">
          <Coins size={12} className="text-yellow-500" />
          <span className="text-[10px] font-bold text-white/60">Tip 0.1 π</span>
        </button>
      </div>
    </div>
  );
};

// --- Standard: TextBubble ---
const TextBubble = ({ content, isMe }) => (
  <div className={`px-4 py-3 rounded-2xl shadow-lg ${isMe ? 'bg-[#f97316] text-black font-medium rounded-tr-none' : 'bg-white/5 text-white/90 backdrop-blur-md border border-white/10 rounded-tl-none'}`}>
    <p className="text-sm">{content}</p>
  </div>
);

// --- MAIN ENGINE DISPATCHER ---
const AdaptiveBubbleEngine = ({ message, currentUser }) => {
  const isMe = message.sender_id === currentUser.id;

  const renderAdaptiveBubble = () => {
    switch (message.content_type) {
      case 'gift':
        return <PiGiftBubble data={message.payload} isMe={isMe} />;
      case 'realty':
        return <RealtyBubble data={message.payload} isMe={isMe} />;
      case 'education':
        return <EduBubble data={message.payload} isMe={isMe} />;
      case 'text':
      default:
        return <TextBubble content={message.content} isMe={isMe} />;
    }
  };

  return (
    <div className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} mb-6 px-4`}>
      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[70%] space-y-1`}>
        {/* Avatar & User Info (Simplified for performance) */}
        {!isMe && (
          <div className="flex items-center gap-2 mb-1 ml-1">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{message.sender_name || 'Pioneer'}</span>
            {message.is_verified && <CheckCircle2 size={10} className="text-blue-400" />}
          </div>
        )}

        {/* The Adaptive Bubble */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {renderAdaptiveBubble()}
        </motion.div>

        {/* Metadata Footer */}
        <div className={`flex items-center gap-2 mt-1 px-2 text-white/20`}>
          <span className="text-[8px] font-bold">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {isMe && (
            <div className="flex gap-0.5">
              <div className={`w-1 h-1 rounded-full ${message.read_status ? 'bg-blue-400' : 'bg-white/20'}`} />
            </div>
          )}
        </div>
      </div>

      {/* Global CSS for Glow Effects */}
      <style jsx="true">{`
        .premium-glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px rgba(249, 115, 22, 0.5));
        }
        .font-orb {
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default React.memo(AdaptiveBubbleEngine);
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Utensils, Truck, Plane, Heart, 
  Building2, ShoppingBag, MessageCircle, GraduationCap,
  Search, Info, Sparkles, Zap
} from 'lucide-react';

// --- Mock Data: 300 Pioneers ---
const generatePioneers = () => {
  const categories = ['Food', 'Transfer', 'Travel', 'Hobby', 'Realty', 'Market', 'Chat', 'Education'];
  return Array.from({ length: 300 }).map((_, i) => ({
    id: i,
    name: `Pioneer_${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    status: Math.random() > 0.7 ? 'active' : 'idle',
    distance: Math.random() * 5, // 0 to 5km
    angle: Math.random() * 360,  // Degree for radar placement
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`
  }));
};

const MangoRadar = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [pioneers] = useState(generatePioneers());
  const [scanning, setScanning] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const longPressTimer = useRef(null);

  // --- Logic: Filtering ---
  const filteredPioneers = useMemo(() => {
    if (activeCategory === 'All') return pioneers;
    return pioneers.filter(p => p.category === activeCategory);
  }, [activeCategory, pioneers]);

  // --- Logic: AI Concierge 소환 (Long Press) ---
  const handleTouchStart = (user) => {
    longPressTimer.current = setTimeout(() => {
      setSelectedUser({ ...user, isAI: true });
      if (window.navigator.vibrate) window.navigator.vibrate(50);
    }, 800);
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer.current);
  };

  const categories = [
    { id: 'Food', icon: Utensils, label: '맛집' },
    { id: 'Transfer', icon: Truck, label: '물류' },
    { id: 'Travel', icon: Plane, label: '여행' },
    { id: 'Hobby', icon: Heart, label: '취미' },
    { id: 'Realty', icon: Building2, label: '부동산' },
    { id: 'Market', icon: ShoppingBag, label: '마켓' },
    { id: 'Chat', icon: MessageCircle, label: '채팅' },
    { id: 'Education', icon: GraduationCap, label: '교육' },
  ];

  return (
    <div className="relative w-full max-w-[480px] h-[100dvh] bg-[#050505] overflow-hidden font-sans text-white border-x border-white/5 mx-auto">
      {/* --- Digital Twin Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      {/* --- Luxury Header --- */}
      <header className="relative z-50 p-6 flex justify-between items-center bg-black/60 backdrop-blur-2xl border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
            <div className="w-2 h-2 bg-orange-500 rounded-full absolute inset-0" />
          </div>
          <h1 className="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 font-orb uppercase">Radar 5.0</h1>
        </div>
        <button onClick={() => setScanning(!scanning)} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all">
          <Zap size={18} className={scanning ? "text-orange-500" : "text-white/20"} />
        </button>
      </header>

      {/* --- Spatial Engine Visualization --- */}
      <section className="relative w-full h-[55%] flex items-center justify-center mt-10">
        {/* Orbit Rings & Markers */}
        <div className="absolute w-[340px] h-[340px] border border-white/[0.03] rounded-full" />
        <div className="absolute w-[240px] h-[240px] border border-white/[0.05] rounded-full" />
        <div className="absolute w-[140px] h-[140px] border border-white/[0.08] rounded-full" />
        
        {/* Degree Markers */}
        {[0, 90, 180, 270].map(deg => (
          <div 
            key={deg} 
            className="absolute text-[8px] font-orb text-white/20 font-black"
            style={{ transform: `rotate(${deg}deg) translateY(-180px)` }}
          >
            {deg}°
          </div>
        ))}

        {/* Scanning Beam */}
        <AnimatePresence>
          {scanning && (
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute w-[340px] h-[340px] rounded-full bg-gradient-to-r from-orange-500/15 to-transparent origin-center pointer-events-none"
              style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}
            />
          )}
        </AnimatePresence>

        {/* User Center Node (The Sun) */}
        <div className="relative z-20 w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.4)] border-2 border-white/30 active:scale-90 transition-all">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Compass className="text-black" size={28} />
          </motion.div>
        </div>

        {/* Spatial Pioneer Nodes */}
        {mappedNodes.map((user) => {
          const glowIntensity = (user.poa_score - 40) / 60; // 0 to 1
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute z-10 cursor-pointer group"
              style={{ x: user.x, y: user.y }}
              onMouseDown={() => handleTouchStart(user)}
              onMouseUp={handleTouchEnd}
              onTouchStart={() => handleTouchStart(user)}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setHoveredUser(user)}
              onMouseLeave={() => setHoveredUser(null)}
            >
              <div className={`relative w-3.5 h-3.5 rounded-full border border-white/20 transition-all duration-500 
                ${user.status === 'active' ? 'bg-orange-500' : 'bg-zinc-700'}
                group-hover:scale-150 group-hover:z-50 group-hover:border-white
              `}
              style={{ 
                boxShadow: user.status === 'active' 
                  ? `0 0 ${10 + glowIntensity * 20}px rgba(249, 115, 22, ${0.3 + glowIntensity * 0.7})` 
                  : 'none' 
              }}>
                {user.status === 'active' && (
                  <span className="absolute inset-0 rounded-full border border-orange-500 animate-ping" 
                        style={{ animationDuration: `${3 - glowIntensity * 2}s` }} />
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Detailed Hover Glass Card */}
        <AnimatePresence>
          {hoveredUser && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute z-50 pointer-events-none"
              style={{ x: hoveredUser.x + 20, y: hoveredUser.y - 60 }}
            >
              <div className="glass-panel p-4 rounded-2xl min-w-[160px] border-orange-500/20 shadow-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <img src={hoveredUser.avatar} className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/10" alt="" />
                  <div>
                    <p className="text-[10px] font-black text-white leading-tight uppercase">{hoveredUser.name}</p>
                    <p className="text-[8px] text-orange-500 font-bold uppercase tracking-widest">{hoveredUser.category}</p>
                  </div>
                </div>
                <div className="space-y-1 pt-1 border-t border-white/5">
                  <div className="flex justify-between">
                    <span className="text-[7px] text-white/40 uppercase">Distance</span>
                    <span className="text-[8px] font-black text-white">{hoveredUser.distance.toFixed(2)}km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[7px] text-white/40 uppercase">Pi Balance</span>
                    <span className="text-[8px] font-black text-yellow-500">{hoveredUser.pi_balance} π</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* --- Spatial Controls: Radius & Category --- */}
      <section className="px-8 space-y-6">
        <div className="glass-panel p-4 rounded-3xl border-white/5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Search size={14} className="text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Scanning Radius</span>
            </div>
            <span className="text-xs font-black text-orange-500 font-orb">{radarRadius === 50 ? 'GLOBAL' : `${radarRadius.toFixed(1)} KM`}</span>
          </div>
          <input 
            type="range" min="0.5" max="50" step="0.5" 
            value={radarRadius} 
            onChange={(e) => setRadarRadius(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-orange-500"
          />
        </div>
      </section>

      {/* --- Category Layering Dock --- */}
      <section className="absolute bottom-4 left-0 w-full p-6 z-50">
        <div className="grid grid-cols-4 gap-3 bg-white/5 backdrop-blur-3xl p-4 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <button 
            onClick={() => setActiveCategory('All')}
            className={`p-3 rounded-2xl flex flex-col items-center gap-1 transition-all ${activeCategory === 'All' ? 'bg-orange-500 text-black shadow-lg scale-105' : 'text-white/40 hover:bg-white/5'}`}
          >
            <Sparkles size={18} />
            <span className="text-[8px] font-black uppercase tracking-tighter">전체</span>
          </button>
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-3 rounded-2xl flex flex-col items-center gap-1 transition-all 
                ${activeCategory === cat.id ? 'bg-orange-500 text-black shadow-lg scale-105' : 'text-white/40 hover:bg-white/5'}
              `}
            >
              <cat.icon size={18} />
              <span className="text-[8px] font-black uppercase tracking-tighter">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* --- AI Concierge Overlay (Hologram) --- */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-end p-6"
          >
            <div className="w-full glass-panel rounded-[3rem] p-8 border-orange-500/30 flex flex-col gap-6 bg-zinc-900/90 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl border-2 border-orange-500 p-1 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                    <img src={selectedUser.avatar} className="w-full h-full rounded-xl bg-zinc-800" alt="avatar" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black italic text-white leading-none">{selectedUser.name}</h3>
                    <p className="text-[10px] text-orange-500 font-bold uppercase mt-1 tracking-widest flex items-center gap-1">
                      < Zap size={10} fill="currentColor" /> AI Concierge Active
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelectedUser(null)} className="text-white/20 hover:text-white"><Info size={20}/></button>
              </div>
              
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                <p className="text-sm text-white/80 leading-relaxed italic">
                  "안녕하세요, {selectedUser.name}의 AI 페르소나입니다. 
                  현재 주변의 {selectedUser.category} 관련 프리미엄 정보를 분석 중입니다. 
                  무엇을 도와드릴까요?"
                </p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  프로필 보기
                </button>
                <button className="flex-1 py-4 bg-orange-500 text-black font-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
                  1:1 대화 시작
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Styling Utilities --- */}
      <style jsx="true">{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MangoRadar;
// Mango OS: High-end Realty Dashboard 시작
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Layout, Sparkles, FileText, ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react';

/**
 * RealtyDashboard Component
 * - Features: Asset Count-up, Horizontal Listings, Transaction Timeline
 * - Theme: Premium Deep Dark & Gold
 */
export const RealtyDashboard = () => {
  const targetAsset = 12580.45;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const controls = animate(count, targetAsset, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, []);

  // 카운팅되는 값을 실제 state에 반영 (화면 표시용)
  useEffect(() => {
    rounded.on("change", (v) => setDisplayValue(v));
  }, [rounded]);

  const userData = {
    name: "SkyMango",
    listings: [
      { id: 1, title: "LCT Penthouse", views: 1240, chats: 45, status: "Active" },
      { id: 2, title: "Centum Sky Villa", views: 890, chats: 12, status: "Premium" }
    ],
    transactions: [
      { id: "tx_01", type: "Premium Ads", amount: -0.05, date: "2026.03.30", icon: <Sparkles size={14} />, color: "text-orange-400" },
      { id: "tx_02", type: "AI Report Buy", amount: -0.005, date: "2026.03.29", icon: <FileText size={14} />, color: "text-blue-400" },
      { id: "tx_03", type: "Sold: Studio A", amount: 4500, date: "2026.03.25", icon: <Layout size={14} />, color: "text-green-400" }
    ]
  };

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-screen bg-[#050505] text-white p-8 no-scrollbar overflow-y-auto pb-32 shadow-[0_0_100px_rgba(0,0,0,1)]">
      
      {/* 1. 하이엔드 프로필 헤더 */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-5 mb-10"
      >
        <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-200 p-[1.5px] shadow-lg shadow-yellow-500/10">
          <div className="w-full h-full rounded-[1.4rem] bg-[#0a0a0a] flex items-center justify-center text-2xl font-black italic text-yellow-500">M</div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase">{userData.name}</h2>
            <span className="text-[8px] font-black bg-yellow-500 text-black px-1.5 py-0.5 rounded-sm">TOP CDO</span>
          </div>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1 opacity-70">Global Portfolio Architect</p>
        </div>
      </motion.div>

      {/* 2. 총 자산 요약 (Count-up 애니메이션) */}
      <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 mb-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[60px] rounded-full group-hover:bg-yellow-500/10 transition-colors"></div>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Net Worth</p>
        <div className="flex items-baseline gap-2">
          <motion.span className="text-4xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-gray-500">
            {displayValue}
          </motion.span>
          <span className="text-lg font-black text-yellow-500 italic">π</span>
        </div>
      </div>

      {/* 3. 내 등록 매물 (Horizontal Scroll) */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-5 px-1">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">My Listings</h3>
          <button className="flex items-center gap-1 text-yellow-500 text-[10px] font-black uppercase hover:opacity-80 transition-opacity">
            <Plus size={12} /> New Asset
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
          {userData.listings.map((item) => (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              key={item.id} 
              className="min-w-[240px] bg-white/[0.02] border border-white/5 rounded-[2rem] p-5 snap-start"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[8px] px-2.5 py-1 rounded-full font-black uppercase tracking-tighter ${item.status === 'Premium' ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-white/10 text-gray-400'}`}>
                  {item.status}
                </span>
              </div>
              <h4 className="font-black text-sm uppercase tracking-tight mb-4">{item.title}</h4>
              <div className="flex gap-4 border-t border-white/5 pt-4">
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-600 font-bold uppercase">Exposure</span>
                  <span className="text-xs font-black text-white">{item.views.toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-600 font-bold uppercase">Inquiry</span>
                  <span className="text-xs font-black text-yellow-500">{item.chats}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Pi 트랜잭션 타임라인 */}
      <div className="space-y-5">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Global Transactions</h3>
        <div className="space-y-3">
          {userData.transactions.map((tx) => (
            <motion.div 
              key={tx.id} 
              whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.04)" }}
              className="bg-white/[0.02] border border-white/5 rounded-[1.5rem] p-4 flex justify-between items-center transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center ${tx.color}`}>
                  {tx.icon}
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-tight">{tx.type}</p>
                  <p className="text-[9px] text-gray-600 font-bold">{tx.date}</p>
                </div>
              </div>
              <div className={`text-sm font-black italic ${tx.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} <span className="text-[10px] not-italic ml-0.5">π</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
// Mango OS: High-end Realty Dashboard 끝
// Mango OS: High-end Comparison UI 시작
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeGlobalInvestment } from '../utils/realtyAI';

export const ComparisonOverlay = ({ propA, propB, onClose }) => {
  const analysis = useMemo(() => analyzeGlobalInvestment(propA, propB), [propA, propB]);
  
  // 국가별 가상 환율 설정 (1 Pi = 50,000 KRW / 35 USD 기준)
  const exchangeRate = propA.country === "Korea" ? 50000 : 35;
  const currencyLabel = propA.country === "Korea" ? "KRW" : "USD";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex justify-center items-center p-4"
    >
      <div className="w-full max-w-[420px] flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex justify-between items-center px-2">
          <div className="flex flex-col">
            <h2 className="text-white text-2xl font-black italic tracking-tighter uppercase">
              <span className="text-[#FFD700]">Mango</span> AI Compare
            </h2>
            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Global Investment Intelligence</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors">✕</button>
        </div>

        {/* Comparison Cards: Side-by-Side Slide Animation */}
        <div className="grid grid-cols-2 gap-4 relative">
          {[
            { data: propA, side: 'left', id: 'A', x: -50 },
            { data: propB, side: 'right', id: 'B', x: 50 }
          ].map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: card.x }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className={`relative bg-white/[0.03] rounded-[2rem] p-4 border ${analysis.winners.roi === card.id ? 'border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.15)]' : 'border-white/10'}`}
            >
              {analysis.winners.roi === card.id && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFD700] text-black text-[9px] font-black px-3 py-1 rounded-full shadow-xl whitespace-nowrap">
                  BEST CHOICE
                </span>
              )}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-800">
                <img src={card.data.images[0]} className="w-full h-full object-cover" alt="realty" />
              </div>
              <div className="text-[10px] text-[#FFD700] font-black uppercase tracking-tighter mb-1">{card.data.city}</div>
              <h3 className="text-white font-bold text-sm truncate mb-2">{card.data.title}</h3>
              <div className="text-lg font-black text-white">{card.data.price.toLocaleString()} <span className="text-[#FFD700] text-xs">Pi</span></div>
              <div className="text-[9px] text-gray-500 font-bold">≈ {(card.data.price * exchangeRate).toLocaleString()} {currencyLabel}</div>
            </motion.div>
          ))}
        </div>

        {/* Analysis Metrics */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 space-y-8 shadow-inner">
          <MetricRow label="Expected ROI" valA={`${analysis.propA.roi}%`} valB={`${analysis.propB.roi}%`} winner={analysis.winners.roi} />
          <MetricRow label="Price per Area" valA={analysis.propA.unitPrice} valB={analysis.propB.unitPrice} winner={analysis.winners.unitPrice} />
          <MetricRow label="Legal Risk" valA={analysis.propA.riskScore} valB={analysis.propB.riskScore} winner={analysis.winners.risk} />
          
          <div className="pt-6 border-t border-white/5 text-center">
            <p className="text-gray-500 text-[10px] leading-relaxed font-medium">
              *AI 알고리즘이 2026년 1분기 글로벌 거시 경제 데이터를 분석한 결과입니다.<br/>
              <span className="text-[#FFD700]">{analysis.winners.roi === 'A' ? propA.city : propB.city}</span> 자산의 수익성이 우수한 것으로 판단됩니다.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-[#FFD700] to-[#f59e0b] text-black font-black py-5 rounded-[1.5rem] shadow-[0_10px_40px_rgba(245,158,11,0.2)] active:scale-95 transition-all text-sm uppercase italic tracking-widest">
          Unlock Comprehensive Report (0.005 Pi)
        </button>
      </div>
    </motion.div>
  );
};

const MetricRow = ({ label, valA, valB, winner }) => (
  <div className="flex flex-col gap-3">
    <div className="text-center text-[9px] text-gray-600 font-black uppercase tracking-[0.2em]">{label}</div>
    <div className="flex justify-between items-center px-2">
      <div className={`w-1/3 text-sm font-bold ${winner === 'A' ? 'text-white' : 'text-gray-600'}`}>{valA}</div>
      <div className="flex-1 mx-6 h-[1.5px] bg-white/5 relative">
        <motion.div 
          initial={{ width: "50%", left: "25%" }}
          animate={{ 
            left: winner === 'A' ? "0%" : "auto", 
            right: winner === 'B' ? "0%" : "auto",
            backgroundColor: winner === 'A' ? "#ffffff" : "#FFD700"
          }}
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]"
        />
      </div>
      <div className={`w-1/3 text-right text-sm font-bold ${winner === 'B' ? 'text-[#FFD700]' : 'text-gray-600'}`}>{valB}</div>
    </div>
  </div>
);
// Mango OS: High-end Comparison UI 끝
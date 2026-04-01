// Mango OS: High-end Realty Portal Card 시작
import React from 'react';
import { motion } from 'framer-motion';

/**
 * RealtyPortalCard Component
 * - Theme: Premium Dark Glass & Gold
 * - Features: AI Score Gauge, 3D Tour Floating Badge, Hover Interaction
 */
export const RealtyPortalCard = ({ property }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
      className="relative w-full max-w-[400px] mx-auto rounded-[2.5rem] overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer group"
    >
      {/* 이미지 섹션: 3D 투어 및 AI 점수 플로팅 */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
        />
        
        {/* 프리미엄 블랙 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20"></div>
        
        {/* 3D 투어 뱃지 (우측 상단 플로팅) */}
        <div className="absolute top-5 right-5 bg-yellow-500 text-black px-3 py-1.5 rounded-full text-[10px] font-black italic tracking-widest border border-yellow-400 shadow-lg shadow-yellow-500/20 flex items-center gap-1.5 z-20">
          <span className="text-sm">🌐</span> 3D VIRTUAL TOUR
        </div>

        {/* AI 투자 점수 (좌측 상단 네온 포인트) */}
        <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl text-[10px] font-bold border border-white/10 flex items-center gap-2 z-20">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          AI SCORE: <span className="text-yellow-400 font-black">{property.investmentScore}</span>
        </div>
      </div>

      {/* 매물 정보 섹션 */}
      <div className="p-8 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-black italic text-white tracking-tighter uppercase leading-tight">
              {property.title}
            </h3>
            <p className="text-gray-500 text-[11px] font-bold tracking-widest mt-1 uppercase opacity-80">
              📍 {property.city} · {property.country}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-gray-500 font-black uppercase mb-1">Asset Value</p>
            <span className="text-2xl font-black text-yellow-500 italic drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">
              {property.price.toLocaleString()} <span className="text-xs font-normal not-italic ml-0.5">π</span>
            </span>
          </div>
        </div>

        {/* AI 투자 가치 프로그레스 바 (Progress Bar) */}
        <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
            <span className="text-gray-400">Growth Potential</span>
            <span className="text-green-400">+12% / 3MO</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "78%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 h-full rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"
            ></motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
// Mango OS: High-end Realty Portal Card 끝
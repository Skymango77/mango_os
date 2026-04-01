// Mango OS: High-end Realty Detail View 시작
import React from 'react';
import { motion } from 'framer-motion';

/**
 * RealtyDetailView Component
 * - Theme: Ultra Luxury Dark Glass
 * - Features: Parallax Header, AI Score Analysis, Sticky Payment Bar
 */
export const RealtyDetailView = ({ property, onBack }) => {
  // 데이터가 없을 경우를 대비한 하이엔드 샘플 데이터
  const data = property || {
    title: "Haeundae LCT The Sharp Penthouse",
    city: "Busan",
    country: "Korea",
    price: 15000,
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000"],
    aiScore: { total: 92, location: 95, growth: 88, infra: 94 }
  };

  const handlePiPayment = () => {
    // Pi SDK 연동 포인트
    console.log("Initiating Pi Payment for:", data.title);
    alert(`[Escrow Protected] ${data.price.toLocaleString()} Pi 결제 요청이 시작되었습니다.`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="relative w-full max-w-[420px] mx-auto h-[850px] bg-[#050505] overflow-y-auto overflow-x-hidden no-scrollbar pb-24 shadow-[0_0_100px_rgba(0,0,0,0.9)]"
    >
      {/* 1. 상단 플로팅 네비게이션 */}
      <div className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="w-12 h-12 bg-black/40 backdrop-blur-xl rounded-2xl flex justify-center items-center border border-white/10 text-white active:scale-90 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="w-12 h-12 bg-black/40 backdrop-blur-xl rounded-2xl flex justify-center items-center border border-white/10 text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* 2. Parallax 이미지 섹션 */}
      <div className="relative h-[450px] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={data.images[0]} 
          alt={data.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20" />
        <div className="absolute bottom-10 left-6 bg-yellow-500 text-black px-4 py-1.5 rounded-full text-[10px] font-black italic tracking-widest shadow-lg">
           LIVE 3D VIRTUAL TOUR
        </div>
      </div>

      {/* 3. 상세 정보 컨텐츠 */}
      <div className="px-8 py-6 -mt-12 relative z-10 rounded-t-[3rem] bg-[#050505]">
        <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-400/30 px-3 py-1 rounded-full bg-blue-400/10">
            Verified Asset
          </span>
          <div className="text-gray-500 text-xs font-bold uppercase tracking-tighter">📍 {data.city} · {data.country}</div>
        </div>

        <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-4 leading-none">
          {data.title}
        </h1>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-10 opacity-80 font-medium">
          망고 AI가 엄증한 최고의 투자 가치를 지닌 자산입니다. 고도화된 인프라와 독보적인 지리적 이점을 결합하여 미래 가치 상승률이 매우 높게 측정되었습니다.
        </p>

        {/* 4. Mango AI 투자 점수 분석 (Progress Bars) */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 space-y-6">
          <div className="flex justify-between items-end mb-2">
            <h3 className="text-white font-black italic text-xl uppercase tracking-tighter">
              <span className="text-yellow-500 mr-2">Mango</span> AI Score
            </h3>
            <span className="text-3xl font-black text-yellow-500 leading-none">{data.aiScore.total}<span className="text-xs text-gray-600 ml-1">/100</span></span>
          </div>
          
          {[
            { label: "Location & Infra", score: data.aiScore.location, color: "from-blue-600 to-cyan-400" },
            { label: "Growth Potential", score: data.aiScore.growth, color: "from-yellow-600 to-yellow-300" },
            { label: "Asset Stability", score: data.aiScore.infra, color: "from-purple-600 to-pink-400" }
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                <span>{item.label}</span>
                <span className="text-white">{item.score}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.score}%` }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  className={`bg-gradient-to-r ${item.color} h-full rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 하단 Sticky 결제 바 */}
      <div className="fixed bottom-0 w-full max-w-[420px] bg-[#0a0a0a]/90 backdrop-blur-3xl border-t border-white/5 p-6 z-[100] flex items-center justify-between pb-10">
        <div>
          <p className="text-gray-500 text-[10px] font-black uppercase mb-1 tracking-widest">Ownership Price</p>
          <div className="text-3xl font-black text-white italic tracking-tighter">
            {data.price.toLocaleString()} <span className="text-yellow-500 not-italic text-lg">π</span>
          </div>
        </div>
        <button 
          onClick={handlePiPayment}
          className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-black px-10 py-4 rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.3)] active:scale-95 transition-all uppercase italic text-sm tracking-widest"
        >
          Pay with Pi
        </button>
      </div>
    </motion.div>
  );
};
// Mango OS: High-end Realty Detail View 끝
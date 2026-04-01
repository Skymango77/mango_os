// Mango OS: High-end Realty Map View 시작
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Sliders, Navigation } from 'lucide-react';

/**
 * RealtyMapView Component
 * - Theme: Luxury Dark / Silver
 * - Features: Floating Glass Searchbar, Pi-Logo Markers, Staggered Animation
 */
const RealtyMapView = () => {
  const [selectedProp, setSelectedProp] = useState(null);
  const [priceRange, setPriceRange] = useState(500);

  // 샘플 데이터: 핀 애니메이션 테스트용
  const properties = [
    { id: 1, lat: 35.1595, lng: 129.1611, title: 'LCT Penthouse', price: '15,000' },
    { id: 2, lat: 35.1650, lng: 129.1350, title: 'Centum Sky', price: '8,500' },
    { id: 3, lat: 35.1520, lng: 129.1550, title: 'Marine City Villa', price: '12,000' },
  ];

  // 애니메이션 변수 (Stagger Effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 }
    }
  };

  const markerVariants = {
    hidden: { y: -50, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } }
  };

  return (
    <div className="relative w-full max-w-[400px] mx-auto h-[780px] bg-[#050505] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pb-20 mt-4">
      
      {/* 1. 상단 Floating Glassmorphism 검색바 & 필터 */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] space-y-3">
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-4 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-500 p-2 rounded-xl text-black">
              <Search size={18} strokeWidth={3} />
            </div>
            <input 
              type="text" 
              placeholder="City, Country..." 
              className="bg-transparent border-none text-white text-sm focus:outline-none w-full placeholder:text-gray-500 font-bold"
            />
            <button className="text-gray-400 hover:text-white transition-colors">
              <Sliders size={18} />
            </button>
          </div>
          
          {/* 가격 범위 슬라이더 (Gold Accent) */}
          <div className="px-1">
            <div className="flex justify-between text-[10px] font-black uppercase text-gray-500 mb-1 tracking-tighter">
              <span>Price Range</span>
              <span className="text-yellow-500">{priceRange}π ~ MAX</span>
            </div>
            <input 
              type="range" 
              min="0" max="1000" 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* 2. 지도 영역 (Luxury Dark 컨셉 레이어) */}
      <div className="absolute inset-0 z-10 bg-[#0a0a0a]">
        <div className="w-full h-full opacity-40 grayscale contrast-125 brightness-75 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/129.1611,35.1595,13,0/400x800?access_token=YOUR_TOKEN_HERE')] bg-cover bg-center">
          {/* 실제 Mapbox GL JS 연동 시 여기에 캔버스가 렌더링됩니다 */}
        </div>
        
        {/* 3. Staggered Markers (망고 오렌지 물방울 + Pi 로고) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="absolute inset-0 z-20 pointer-events-none"
        >
          {properties.map((prop) => (
            <motion.div
              key={prop.id}
              variants={markerVariants}
              style={{ top: `${30 + prop.id * 15}%`, left: `${20 + prop.id * 20}%` }}
              className="absolute pointer-events-auto cursor-pointer group"
              onClick={() => setSelectedProp(prop)}
            >
              {/* 망고 오렌지 물방울 핀 UI */}
              <div className="relative flex flex-col items-center">
                <div className="w-10 h-10 bg-[#FF8C00] rounded-full rounded-bl-none rotate-45 border-2 border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,140,0,0.5)] group-hover:scale-110 transition-transform">
                  <span className="text-white font-black text-sm -rotate-45 drop-shadow-md">π</span>
                </div>
                <div className="mt-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="text-[10px] text-white font-bold">{prop.price} π</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 4. 클릭 시 나타나는 미니 팝업 (RealtyPortalCard 연동 부위) */}
      <AnimatePresence>
        {selectedProp && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-24 left-0 right-0 px-6 z-40"
          >
            <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-yellow-500/30 rounded-[2rem] p-4 flex items-center gap-4 shadow-3xl relative">
              <button 
                onClick={() => setSelectedProp(null)}
                className="absolute -top-2 -right-2 bg-yellow-500 text-black w-6 h-6 rounded-full text-xs flex items-center justify-center font-black"
              >✕</button>
              <div className="w-20 h-20 bg-gray-800 rounded-2xl overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-yellow-600/20 to-transparent flex items-center justify-center text-yellow-500">
                  <Navigation size={24} />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-white text-sm font-black uppercase tracking-tighter">{selectedProp.title}</h4>
                <p className="text-yellow-500 font-black text-xl italic">{selectedProp.price} <span className="text-[10px] not-italic text-gray-500 ml-0.5">π</span></p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">AI Score 98</span>
                </div>
              </div>
              <button className="bg-white text-black px-4 py-2 rounded-xl font-black text-[10px] uppercase shadow-lg active:scale-95 transition-all">View Detail</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default RealtyMapView;
// Mango OS: High-end Realty Map View 끝
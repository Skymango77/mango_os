// Mango OS: Grand Assembly App.js 시작
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RealtyPortalCard } from './RealtyPortalCard';
import RealtyMapView from './RealtyMapView';
import { RealtyDetailView } from './RealtyDetailView';
import { RealtyDashboard } from './RealtyDashboard';
import { RealtyAiChat } from './RealtyAiChat';

function App() {
  const [view, setView] = useState('home'); // 'home', 'map', 'detail', 'dashboard', 'chat'
  const [selectedProp, setSelectedProp] = useState(null);

  // Pi SDK 초기화
  useEffect(() => {
    if (window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: true });
      console.log("Mango Realty: Pi SDK Initialized");
    }
  }, []);

  const renderView = () => {
    switch(view) {
      case 'home': return <div className="space-y-6 p-4 pt-10"><RealtyPortalCard property={sampleData} onClick={() => setView('detail')} /></div>;
      case 'map': return <RealtyMapView onSelect={(p) => { setSelectedProp(p); setView('detail'); }} />;
      case 'detail': return <RealtyDetailView property={selectedProp} onBack={() => setView('home')} />;
      case 'dashboard': return <RealtyDashboard />;
      case 'chat': return <RealtyAiChat />;
      default: return <RealtyDashboard />;
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-screen bg-[#0a0a0a] relative overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {renderView()}
        </motion.div>
      </AnimatePresence>

      {/* 하이엔드 하단 네비게이션 바 (Width 420px 준수) */}
      <nav className="fixed bottom-0 w-full max-w-[420px] bg-black/80 backdrop-blur-2xl border-t border-white/10 px-6 py-4 flex justify-between items-center z-[100]">
        <NavButton icon="🏠" active={view === 'home'} onClick={() => setView('home')} />
        <NavButton icon="🗺️" active={view === 'map'} onClick={() => setView('map')} />
        <NavButton icon="🧠" active={view === 'chat'} onClick={() => setView('chat')} />
        <NavButton icon="👤" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
      </nav>
    </div>
  );
}

const NavButton = ({ icon, active, onClick }) => (
  <button onClick={onClick} className={`text-xl transition-all ${active ? 'scale-125 brightness-125' : 'opacity-40 grayscale'}`}>
    {icon}
  </button>
);

const sampleData = { title: "Haeundae LCT Penthouse", price: 15000, images: ["/sample-lct.jpg"], city: "Busan", country: "Korea", investmentScore: 92 };

export default App;
// Mango OS: Grand Assembly App.js 끝
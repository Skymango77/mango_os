import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { 
  Utensils, CreditCard, Plane, MessageSquare, Share2, Home, ShoppingBag, ShieldAlert,
  Navigation, MapPin, Globe, Info, Smartphone, Glasses, Bell
} from 'lucide-react';

const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const App = () => {
  const [deviceType, setDeviceType] = useState('phone'); 
  const [user, setUser] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [destination] = useState("Mango Premium Hotel");
  
  const portals = useMemo(() => [
    { id: 'food', name: 'Food', color: '#fbbf24', icon: Utensils },
    { id: 'pay', name: 'Pay', color: '#10b981', icon: CreditCard },
    { id: 'trip', name: 'Trip', color: '#3b82f6', icon: Plane },
    { id: 'chat', name: 'Chat', color: '#8b5cf6', icon: MessageSquare },
    { id: 'share', name: 'Share', color: '#f43f5e', icon: Share2 },
    { id: 'realty', name: 'Realty', color: '#06b6d4', icon: Home },
    { id: 'market', name: 'Market', color: '#ec4899', icon: ShoppingBag },
    { id: 'admin', name: 'Admin', color: '#64748b', icon: ShieldAlert },
  ], []);

  const angleStep = 360 / portals.length;
  // 현재 정면에 있는 인덱스 계산
  const currentIdx = (Math.round(-rotation / angleStep) % portals.length + portals.length) % portals.length;

  useEffect(() => {
    signInAnonymously(auth);
    onAuthStateChanged(auth, setUser);
  }, []);

  const toggleDevice = () => setDeviceType(prev => prev === 'phone' ? 'glass' : 'phone');

  return (
    <div className={`relative min-h-screen transition-all duration-700 ${deviceType === 'glass' ? 'bg-transparent' : 'bg-[#020617]'} text-white overflow-hidden font-sans`}>
      
      {/* 커스텀 애니메이션 스타일 정의 */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1.1); box-shadow: 0 0 20px rgba(255, 255, 255, 0.2); border-color: rgba(255, 255, 255, 0.4); }
          50% { transform: scale(1.15); box-shadow: 0 0 50px rgba(255, 255, 255, 0.6); border-color: rgba(255, 255, 255, 0.9); }
        }
        .active-portal {
          animation: pulse-glow 1.5s infinite ease-in-out;
        }
        .portal-transition {
          transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s, filter 0.5s;
        }
      `}</style>

      {/* 기기 모드 스위처 */}
      <button 
        onClick={toggleDevice}
        className="fixed top-24 right-6 z-[100] flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-white/20 transition-all pointer-events-auto"
      >
        {deviceType === 'phone' ? <Smartphone size={14} /> : <Glasses size={14} />}
        {deviceType} Mode
      </button>

      {/* AR 내비게이션 레이어 */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${showNav ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md flex flex-col items-center">
          <div className={`transition-transform duration-700 ${deviceType === 'glass' ? 'translate-y-40' : 'translate-y-20'}`}>
            <div className="relative animate-bounce">
              <Navigation size={60} className="text-yellow-400 fill-yellow-400 rotate-45 drop-shadow-[0_0_30px_rgba(250,204,21,0.9)]" />
            </div>
            <div className="mt-4 px-6 py-2 bg-black/80 backdrop-blur-md rounded-full border border-yellow-400/50 flex items-center gap-3">
              <MapPin size={14} className="text-yellow-400" />
              <span className="text-xs font-bold tracking-tighter">{destination} (120m)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 포털 휠 시스템 */}
      <main className={`relative flex items-center justify-center min-h-screen transition-transform duration-1000 ${deviceType === 'glass' ? 'scale-75 -translate-y-20' : ''}`} style={{ perspective: '2000px' }}>
        <div 
          className="relative w-48 h-64 transition-transform duration-700 ease-out"
          style={{ transform: `rotateY(${rotation}deg)`, transformStyle: 'preserve-3d' }}
        >
          {portals.map((portal, idx) => {
            const angle = idx * angleStep;
            const isFront = currentIdx === idx;
            
            return (
              <div
                key={portal.id}
                className="absolute inset-0"
                style={{ 
                  transform: `rotateY(${angle}deg) translateZ(${deviceType === 'glass' ? '380px' : '420px'})`, 
                  backfaceVisibility: 'hidden'
                }}
              >
                <div className={`
                  relative w-full h-full rounded-[2.5rem] p-6 flex flex-col justify-between border portal-transition
                  ${isFront ? 'bg-slate-900/90 active-portal z-50 brightness-125' : 'bg-slate-950/20 border-white/5 opacity-20 blur-[3px] scale-90'}
                `}>
                  {/* 정면 포털용 백그라운드 맥동 광원 */}
                  {isFront && (
                    <div className="absolute inset-0 bg-white/5 rounded-[2.5rem] animate-pulse pointer-events-none"></div>
                  )}

                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isFront ? 'scale-110 shadow-lg' : ''}`} 
                       style={{ backgroundColor: portal.color, boxShadow: isFront ? `0 0 25px ${portal.color}` : 'none' }}>
                    <portal.icon size={24} className="text-white" />
                  </div>

                  <div className="relative">
                    <h2 className={`text-lg font-black italic uppercase tracking-tighter transition-all duration-500 ${isFront ? 'translate-x-1 text-white' : 'text-white/40'}`}>
                      {portal.name}
                    </h2>
                    {isFront && <div className="h-1 w-8 bg-white/40 mt-1 rounded-full animate-bounce"></div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* 네비게이션 컨트롤 */}
        <div className="absolute bottom-32 flex gap-6 z-[90]">
          <button onClick={() => setRotation(r => r + angleStep)} className="p-5 bg-white/5 rounded-full border border-white/10 hover:bg-white/20 transition-all active:scale-90"><Navigation className="-rotate-90" size={24} /></button>
          <button onClick={() => setShowNav(!showNav)} className={`p-5 rounded-full border border-white/10 transition-all active:scale-95 ${showNav ? 'bg-yellow-400 text-black shadow-[0_0_30px_rgba(250,204,21,0.5)]' : 'bg-white/5'}`}><MapPin size={24} /></button>
          <button onClick={() => setRotation(r => r - angleStep)} className="p-5 bg-white/5 rounded-full border border-white/10 hover:bg-white/20 transition-all active:scale-90"><Navigation className="rotate-90" size={24} /></button>
        </div>
      </main>

      {/* 하단 광고 레이어 (Phone 전용) */}
      <footer className={`
        fixed bottom-0 w-full transition-all duration-1000 z-[80]
        ${deviceType === 'glass' ? 'h-0 opacity-0 overflow-hidden' : 'h-32 bg-[#020617]/90 backdrop-blur-2xl border-t border-white/10 p-6'}
      `}>
        {deviceType === 'phone' && (
          <div className="max-w-5xl mx-auto grid grid-cols-2 gap-6 h-full">
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 to-transparent border border-emerald-500/30 p-4 flex items-center gap-4 cursor-pointer hover:border-emerald-500 transition-all">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="text-emerald-500" size={24} />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block mb-1">Local AD</span>
                <p className="text-sm font-bold truncate">주변 식당 20% 할인권 도착!</p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 p-4 flex items-center gap-4 cursor-pointer hover:border-blue-500 transition-all">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
                <Globe className="text-blue-500" size={24} />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">Global AD</span>
                <p className="text-sm font-bold truncate">최신형 테크 안경 할인 예약</p>
              </div>
            </div>
          </div>
        )}
      </footer>

      {/* 글래스 전용 오버레이 */}
      {deviceType === 'glass' && (
        <>
          <div className="fixed top-12 right-12 w-56 animate-pulse">
            <div className="bg-black/40 backdrop-blur-lg border-r-4 border-emerald-500 p-4 rounded-l-xl">
              <p className="text-[10px] font-black uppercase text-emerald-400">Local Highlight</p>
              <p className="text-xs font-bold truncate">Nearby: Mango Cafe 50m</p>
            </div>
          </div>
          <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] border-[20px] border-white/5 opacity-50"></div>
        </>
      )}

      {/* 헤더 유닛 */}
      <header className="absolute top-0 w-full p-10 flex justify-between items-start pointer-events-none">
        <div className="z-10">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Mango <span className="text-yellow-400">Portal</span></h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">System Active</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 flex items-center gap-3">
            <span className="text-[10px] font-mono text-emerald-400">SYNC: 100%</span>
            <div className="w-[1px] h-3 bg-white/20"></div>
            <span className="text-[10px] font-mono opacity-50">GPS: 37.56, 126.97</span>
          </div>
          {deviceType === 'glass' && (
            <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-lg border border-yellow-400/20">
              <Bell size={14} />
              <span className="text-[10px] font-black uppercase">Visual Space Optimized</span>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default App;
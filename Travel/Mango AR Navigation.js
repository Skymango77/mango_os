import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  MapPin, 
  ArrowUp, 
  ArrowUpRight, 
  ArrowUpLeft, 
  Utensils, 
  Hotel,
  Bell
} from 'lucide-react';

const App = () => {
  const [distance, setDistance] = useState(15.0);
  const [direction, setDirection] = useState('forward'); // forward, left, right
  const [poi, setPoi] = useState({ name: '부산 해운대 맛집: 바다횟집', type: 'food' });
  const [isAlerting, setIsAlerting] = useState(false);

  // 시뮬레이션: 거리가 점점 줄어듦
  useEffect(() => {
    const timer = setInterval(() => {
      setDistance((prev) => {
        if (prev <= 0.1) return 0;
        const next = prev - 0.1;
        
        // 특정 거리에서 알림음 시뮬레이션 (시각적 피드백)
        if (Math.floor(next) !== Math.floor(prev)) {
          triggerAudioSignal();
        }
        
        // 방향 전환 시뮬레이션
        if (next < 5 && next > 4.8) setDirection('right');
        if (next < 2) setDirection('forward');
        
        return parseFloat(next.toFixed(1));
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  const triggerAudioSignal = () => {
    setIsAlerting(true);
    setTimeout(() => setIsAlerting(false), 300);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans text-white">
      {/* 카메라 배경 시뮬레이션 (실제 글래스에서는 투명함) */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1541339905195-0662757d4eb0?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>

      {/* AR HUD Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-12 pointer-events-none">
        
        {/* 상단: POI 정보 */}
        <div className="w-full flex justify-between items-start animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="bg-black/40 backdrop-blur-md border-l-4 border-orange-500 p-4 rounded-r-xl">
            <div className="flex items-center gap-2 mb-1">
              {poi.type === 'food' ? <Utensils size={16} className="text-orange-500" /> : <Hotel size={16} className="text-orange-500" />}
              <span className="text-xs font-bold tracking-widest uppercase text-orange-400">Destination Found</span>
            </div>
            <h2 className="text-xl font-black">{poi.name}</h2>
          </div>
          
          <div className="flex flex-col items-end">
            <div className={`p-2 rounded-full transition-colors duration-300 ${isAlerting ? 'bg-orange-500' : 'bg-black/40'}`}>
              <Bell size={20} className={isAlerting ? 'animate-bounce' : 'text-slate-400'} />
            </div>
            <span className="text-[10px] text-slate-400 mt-2 tracking-tighter">BT: AR-GLASS-X1</span>
          </div>
        </div>

        {/* 중앙: 실시간 가이드 화살표 */}
        <div className="relative flex flex-col items-center">
          <div className={`transition-all duration-500 transform ${direction === 'left' ? '-rotate-45' : direction === 'right' ? 'rotate-45' : 'rotate-0'}`}>
            <div className="relative">
              {/* 펄스 효과 */}
              <div className="absolute inset-0 animate-ping bg-orange-500/20 rounded-full"></div>
              <div className="bg-orange-500/80 p-6 rounded-full shadow-[0_0_40px_rgba(249,115,22,0.5)]">
                {direction === 'forward' && <ArrowUp size={64} strokeWidth={3} />}
                {direction === 'left' && <ArrowUpLeft size={64} strokeWidth={3} />}
                {direction === 'right' && <ArrowUpRight size={64} strokeWidth={3} />}
              </div>
            </div>
          </div>
          
          {/* 거리 표시 */}
          <div className="mt-8 flex flex-col items-center">
            <div className="flex items-baseline gap-1">
              <span className={`text-7xl font-black tracking-tighter transition-colors ${distance < 3 ? 'text-green-400' : 'text-white'}`}>
                {distance}
              </span>
              <span className="text-2xl font-bold opacity-50">m</span>
            </div>
            <div className="h-1 w-32 bg-white/20 rounded-full mt-2 overflow-hidden">
               <div 
                 className="h-full bg-orange-500 transition-all duration-200" 
                 style={{ width: `${(distance / 15) * 100}%` }}
               ></div>
            </div>
          </div>
        </div>

        {/* 하단: 상태 바 */}
        <div className="w-full flex justify-center">
          <div className="bg-black/60 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">GPS Linked</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10"></div>
            <div className="text-xs font-bold text-orange-400">
              WALKING MODE
            </div>
            <div className="w-[1px] h-4 bg-white/10"></div>
            <div className="text-xs opacity-60">
              14:25 PM
            </div>
          </div>
        </div>

      </div>

      {/* 주변 시야 방해 금지 가이드 라인 (글래스 보정용) */}
      <div className="absolute inset-0 border-[40px] border-black/10 pointer-events-none"></div>
    </div>
  );
};

export default App;
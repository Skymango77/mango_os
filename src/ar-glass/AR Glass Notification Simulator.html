import React, { useState, useEffect, useRef } from 'react';
import { Bell, Utensils, Volume2, Info, CheckCircle, AlertTriangle } from 'lucide-react';

const App = () => {
  const [notifications, setNotifications] = useState([]);
  const [isGlassOn, setIsGlassOn] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const audioContext = useRef(null);

  // 시계 업데이트
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 가상의 알림 생성 함수 (관리자 페이지에서 전송될 데이터를 시뮬레이션)
  const triggerNotification = (type) => {
    const newNotif = {
      id: Date.now(),
      type,
      message: type === 'order' ? '새로운 주문: 망고 빙수 외 2건' : '안내: 5분 뒤 브레이크 타임입니다.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: type === 'order' ? <Utensils className="w-6 h-6" /> : <Info className="w-6 h-6" />,
      color: type === 'order' ? 'bg-orange-500' : 'bg-blue-500'
    };

    setNotifications(prev => [newNotif, ...prev]);
    playBeep();

    // 5초 후 알림 자동 제거 (AR 글래스 특성상 시야 확보를 위해 필요)
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
    }, 5000);
  };

  // 비프음 재생 (관리자 업로드 음성 대신 브라우저 오피 생성음 사용)
  const playBeep = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();
    osc.connect(gain);
    gain.connect(audioContext.current.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioContext.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.current.currentTime + 0.5);
    osc.start();
    osc.stop(audioContext.current.currentTime + 0.5);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 text-white font-sans">
      <div className="max-w-md w-full space-y-8">
        {/* 설명 영역 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-orange-400">Mango AR Glass</h1>
          <p className="text-slate-400 text-sm">기기의 시야에 표시될 UI를 미리 확인합니다.</p>
        </div>

        {/* AR 글래스 뷰포트 시뮬레이터 */}
        <div className={`relative aspect-video rounded-[3rem] border-8 border-slate-700 overflow-hidden shadow-2xl transition-all duration-500 ${isGlassOn ? 'bg-slate-800' : 'bg-black'}`}>
          {isGlassOn && (
            <>
              {/* 글래스 상단 상태바 */}
              <div className="absolute top-6 left-10 right-10 flex justify-between items-center text-xs opacity-60">
                <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div className="flex items-center space-x-2">
                  <Volume2 size={14} />
                  <span>Online</span>
                </div>
              </div>

              {/* 중앙 가이드 (실제 안경 시야의 중심) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-white/10 rounded-full"></div>

              {/* 알림 표시 영역 (우측 상단 집중형) */}
              <div className="absolute top-12 right-6 space-y-3 w-64">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className={`${notif.color} p-3 rounded-xl shadow-lg flex items-start space-x-3 animate-in slide-in-from-right-full duration-300`}
                  >
                    <div className="mt-0.5">{notif.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-bold leading-tight">{notif.message}</p>
                      <span className="text-[10px] opacity-80">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 배경 격자 (AR 심도 시뮬레이션) */}
              <div className="absolute inset-0 pointer-events-none opacity-5" 
                   style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
              </div>
            </>
          )}
        </div>

        {/* 개발용 컨트롤 패널 */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">기기 전원</span>
            <button 
              onClick={() => setIsGlassOn(!isGlassOn)}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-colors ${isGlassOn ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {isGlassOn ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => triggerNotification('order')}
              disabled={!isGlassOn}
              className="flex items-center justify-center space-x-2 p-3 bg-slate-700 hover:bg-orange-600 rounded-xl transition-all disabled:opacity-50"
            >
              <Utensils size={18} />
              <span className="text-sm">주문 알림</span>
            </button>
            <button 
              onClick={() => triggerNotification('info')}
              disabled={!isGlassOn}
              className="flex items-center justify-center space-x-2 p-3 bg-slate-700 hover:bg-blue-600 rounded-xl transition-all disabled:opacity-50"
            >
              <Info size={18} />
              <span className="text-sm">안내 알림</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, MapPin, Clock, CheckCircle2, Plane, Hotel, Utensils, 
  Camera, ChevronRight, Info, Navigation, MessageSquare, 
  LayoutDashboard, Send, Image as ImageIcon, X, Star
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '안녕하세요! 파리 여행 가이드입니다. 무엇을 도와드릴까요?' }
  ]);
  const [photos, setPhotos] = useState([]);
  const fileInputRef = useRef(null);

  // 여행 데이터
  const travelData = {
    title: "파리 & 스위스 힐링 여행",
    dates: "2024.06.10 - 06.18",
    itinerary: [
      { id: 1, time: "09:00", type: "flight", title: "인천 공항 출발 (KE901)", location: "ICN T2", status: "completed", icon: <Plane className="w-5 h-5" /> },
      { id: 2, time: "15:30", type: "hotel", title: "풀만 파리 투르 에펠 체크인", location: "Paris", status: "current", icon: <Hotel className="w-5 h-5" /> },
      { id: 3, time: "19:00", type: "food", title: "저녁: 르 줄 베르느", location: "Eiffel Tower", status: "upcoming", icon: <Utensils className="w-5 h-5" /> },
    ],
    checklist: [
      { id: 1, task: "여권 및 비자", done: true },
      { id: 2, task: "유로 환전", done: true },
      { id: 3, task: "여행자 보험", done: false },
    ]
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { role: 'user', text: chatInput }]);
    setChatInput('');
    // 시뮬레이션된 응답
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: `'${chatInput}'에 대한 정보를 찾고 있습니다. 잠시만 기다려주세요!` }]);
    }, 1000);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (f) => setPhotos([...photos, f.target.result]);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 pb-24 font-sans text-slate-900 shadow-2xl relative overflow-hidden">
      {/* 상단 고정 헤더 */}
      <header className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-6 rounded-b-[40px] shadow-xl sticky top-0 z-40">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">{travelData.title}</h1>
            <p className="text-indigo-100 flex items-center text-sm mt-1">
              <Calendar className="w-3.5 h-3.5 mr-1.5" /> {travelData.dates}
            </p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <Info className="w-5 h-5" />
          </div>
        </div>
        
        <div className="bg-white/10 rounded-3xl p-4 flex justify-between items-center backdrop-blur-xl border border-white/20">
          <div className="flex items-center">
            <div className="text-3xl mr-3">☀️</div>
            <div>
              <p className="text-xs text-indigo-100 font-medium uppercase">현재 날씨: 파리</p>
              <p className="text-lg font-bold">24°C 맑음</p>
            </div>
          </div>
          <button className="bg-white text-indigo-600 px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg active:scale-95 transition-transform">
            길찾기
          </button>
        </div>
      </header>

      <main className="px-5 py-6">
        {/* 여정 탭 */}
        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <h2 className="text-xl font-bold flex items-center">
                <Clock className="w-5 h-5 mr-2 text-indigo-600" /> 오늘 일정
              </h2>
              <span className="text-xs text-slate-400 font-bold">6월 12일 수요일</span>
            </div>
            <div className="space-y-4">
              {travelData.itinerary.map((item, idx) => (
                <div key={item.id} className="relative flex">
                  {idx !== travelData.itinerary.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-dashed bg-slate-200"></div>
                  )}
                  <div className={`z-10 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0 transition-all
                    ${item.status === 'completed' ? 'bg-slate-100 text-slate-400 border border-slate-200' : 
                      item.status === 'current' ? 'bg-indigo-600 text-white ring-8 ring-indigo-50 shadow-indigo-200' : 
                      'bg-white text-indigo-600 border border-slate-100'}`}>
                    {item.icon}
                  </div>
                  <div className={`ml-4 flex-1 p-4 rounded-3xl border transition-all
                    ${item.status === 'current' ? 'bg-white border-indigo-100 shadow-md ring-1 ring-indigo-50' : 'bg-white/60 border-slate-100 shadow-sm'}`}>
                    <div className="flex justify-between">
                      <span className="text-[10px] font-black text-indigo-500 uppercase">{item.time}</span>
                      {item.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <h3 className={`font-bold text-base mt-1 ${item.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-rose-400" /> {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI 비서 탭 */}
        {activeTab === 'ai' && (
          <div className="flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm
                    ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="맛집 추천, 날씨 등 질문하기..."
                className="flex-1 p-4 rounded-2xl border-none bg-white shadow-inner focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg hover:bg-indigo-700 active:scale-95 transition-all">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* 기록(사진) 탭 */}
        {activeTab === 'camera' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">여행의 순간들</h2>
              <button 
                onClick={() => fileInputRef.current.click()}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center">
                <ImageIcon className="w-4 h-4 mr-2" /> 추가
              </button>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handlePhotoUpload} accept="image/*" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {photos.length === 0 && (
                <div className="col-span-2 py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl text-slate-400">
                  <Camera className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>첫 번째 사진을 기록해보세요!</p>
                </div>
              )}
              {photos.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-3xl overflow-hidden shadow-md group">
                  <img src={src} className="w-full h-full object-cover" alt="Travel" />
                  <button className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 하단 플로팅 네비게이션 */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/80 backdrop-blur-xl border border-white/40 px-4 py-3 rounded-[32px] flex justify-between items-center z-50 shadow-2xl ring-1 ring-black/5">
        <NavButton icon={<LayoutDashboard />} label="여정" active={activeTab === 'itinerary'} onClick={() => setActiveTab('itinerary')} />
        <NavButton icon={<CheckCircle2 />} label="준비물" active={activeTab === 'checklist'} onClick={() => setActiveTab('checklist')} />
        
        {/* 중앙 AI 버튼 */}
        <button 
          onClick={() => setActiveTab('ai')}
          className={`relative -mt-12 w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-300 shadow-2xl
            ${activeTab === 'ai' ? 'bg-indigo-600 text-white rotate-12 scale-110' : 'bg-white text-indigo-600 hover:scale-105 shadow-indigo-100 border border-indigo-50'}`}>
          <MessageSquare className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 border-2 border-white"></span>
          </span>
        </button>

        <NavButton icon={<Camera />} label="기록" active={activeTab === 'camera'} onClick={() => setActiveTab('camera')} />
        <NavButton icon={<Star />} label="혜택" active={activeTab === 'benefits'} onClick={() => setActiveTab('benefits')} />
      </nav>
    </div>
  );
};

const NavButton = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center p-2 rounded-2xl transition-all ${active ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
    {React.cloneElement(icon, { className: "w-6 h-6" })}
    <span className={`text-[10px] font-black mt-1 uppercase tracking-tighter ${active ? 'opacity-100' : 'opacity-0'}`}>
      {label}
    </span>
  </button>
);

export default App;
import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  Users, 
  Copy, 
  CheckCircle2, 
  PlaneTakeoff, 
  MapPin, 
  CalendarCheck,
  Milestone,
  Car,
  Hotel,
  Map,
  Languages,
  Banknote,
  PhoneCall,
  Camera,
  Plus,
  Home,
  Search,
  MessageSquare,
  User,
  ChevronRight
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';

// --- Firebase 초기화 ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'mango-journey-v2';

const App = () => {
  const [user, setUser] = useState(null);
  const [journey, setJourney] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // 고유 여행 ID (실제로는 URL 파라미터 등에서 가져올 수 있음)
  const tripId = "BKK_2024_PREMIUM";

  useEffect(() => {
    const initAuth = async () => {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'trips', tripId);
    
    const unsub = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setJourney(snap.data());
      } else {
        const initialData = {
          title: "부산-방콕 4박 5일",
          subtitle: "네온 시티 투어 에디션",
          companions: [user.uid],
          days: 12,
          weather: "32°C",
          items: 8
        };
        setDoc(docRef, initialData);
      }
    });
    return () => unsub();
  }, [user]);

  const handleCopyLink = () => {
    const shareUrl = `https://mango-travel.app/journey/${tripId}`;
    const textArea = document.createElement("textarea");
    textArea.value = shareUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-white p-4 md:p-8 font-sans selection:bg-rose-500/30">
      <div className="max-w-5xl mx-auto pb-24">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-rose-500">
              MY<span className="text-white">JOURNEY</span>
            </h1>
            <p className="text-gray-400 text-sm font-bold mt-1 uppercase tracking-widest">
              고객 여정 관리 시스템 v2.1
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-black tracking-tighter uppercase">Active Reservation</p>
                <p className="text-sm font-bold">{journey?.title || "로딩 중..."}</p>
              </div>
              <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
                <CalendarCheck size={24} />
              </div>
            </div>
            <button 
              onClick={() => setShowShareModal(true)}
              className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-rose-500 transition-all active:scale-95"
            >
              <Share2 size={20} />
            </button>
          </div>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="남은 시간" value={`D-${journey?.days || 0}`} />
          <StatCard label="예약 항목" value={`${journey?.items || 0}`} subValue="Items" />
          <StatCard label="날씨 (방콕)" value={journey?.weather || "---"} />
          <StatCard label="Emergency" value="SOS" isEmergency />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline (Left) */}
          <div className="lg:col-span-2 space-y-6 relative pl-12">
            {/* Step Line Decorator */}
            <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-500 via-blue-500 to-transparent opacity-30"></div>
            
            <h3 className="text-xl font-black mb-8 flex items-center gap-2">
              <Milestone className="text-rose-500" /> 타임라인 가이드
            </h3>

            {/* Step 1 */}
            <TimelineStep 
              icon={<PlaneTakeoff size={18} />}
              day="Day 1 - 출발"
              time="오전 09:30"
              title="김해 국제공항 출국"
              desc="망고 트래블 전용 VIP 라운지 이용 가능 (L-24 구역)"
              isActive
              color="bg-blue-500"
              buttons={["E-티켓 확인", "수하물 정보"]}
            />

            {/* Step 2 */}
            <TimelineStep 
              icon={<Car size={18} />}
              day="Day 1 - 이동"
              time="오후 02:00"
              title="방콕 수완나품 공항 픽업"
              desc="전용 기사가 'MANGO TRAVEL' 피켓을 들고 대기 중입니다."
              color="bg-gray-800"
              tip="태국에서는 합장(Wai)을 하며 인사하는 것이 예의입니다."
            />

            {/* Step 3 */}
            <TimelineStep 
              icon={<Hotel size={18} />}
              day="Day 1 - 체크인"
              time="오후 04:00"
              title="네온 정글 리조트 도착"
              desc="망고 회원 전용 얼리 체크인 및 웰컴 드링크 제공"
              color="bg-gray-800"
            />
          </div>

          {/* Side Cards (Right) */}
          <div className="space-y-6">
            <div className="glass rounded-[40px] overflow-hidden aspect-square relative group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513002040384-124424462140?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h4 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Map className="text-rose-500" /> 실시간 경로
                </h4>
                <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs hover:bg-rose-500 hover:text-white transition-all shadow-xl">
                  구글 맵으로 열기
                </button>
              </div>
            </div>

            <div className="glass p-8 rounded-[40px]">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 italic">Quick Tools</h4>
              <div className="grid grid-cols-2 gap-4">
                <QuickTool icon={<Languages size={20} />} label="번역기" />
                <QuickTool icon={<Banknote size={20} />} label="환율" />
                <QuickTool icon={<PhoneCall size={20} />} label="긴급문의" />
                <QuickTool icon={<Camera size={20} />} label="포토로그" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Nav */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg glass rounded-full p-2 flex justify-between items-center z-50 shadow-2xl border border-white/10">
          <NavBtn icon={<Home />} active />
          <NavBtn icon={<Search />} />
          <button className="w-14 h-14 bg-rose-500 rounded-full flex items-center justify-center -translate-y-4 shadow-xl shadow-rose-500/40 text-white hover:scale-110 transition-transform">
            <Plus size={28} />
          </button>
          <NavBtn icon={<MessageSquare />} />
          <NavBtn icon={<User />} />
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowShareModal(false)}></div>
            <div className="relative w-full max-w-sm glass border-white/10 rounded-[40px] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
              <h3 className="text-2xl font-black mb-2">동반자와 공유</h3>
              <p className="text-sm text-gray-400 mb-8 font-medium italic">이 링크를 보내면 동반자도 실시간으로 일정을 확인할 수 있습니다.</p>
              
              <button 
                onClick={handleCopyLink}
                className="w-full bg-white text-black p-5 rounded-3xl font-black text-sm flex items-center justify-between group active:scale-95 transition-all"
              >
                <span className="flex items-center gap-3">
                  <Share2 size={18} /> 여정 링크 복사
                </span>
                {copied ? <CheckCircle2 className="text-green-600" /> : <Copy size={18} className="text-gray-400" />}
              </button>
              
              <button onClick={() => setShowShareModal(false)} className="w-full mt-6 text-gray-500 text-xs font-bold uppercase tracking-widest">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Sub Components ---

const StatCard = ({ label, value, subValue, isEmergency }) => (
  <div className={`glass p-5 rounded-[24px] ${isEmergency ? 'border border-rose-500/30' : ''}`}>
    <p className={`${isEmergency ? 'text-rose-500' : 'text-gray-500'} text-[10px] font-black uppercase tracking-tighter`}>{label}</p>
    <h2 className="text-2xl font-black mt-1">
      {value} {subValue && <span className="text-xs text-gray-400 font-bold">{subValue}</span>}
    </h2>
  </div>
);

const TimelineStep = ({ icon, day, time, title, desc, isActive, color, buttons, tip }) => (
  <div className={`glass p-6 rounded-[32px] relative transition-all duration-500 group ${isActive ? 'active-glow ring-1 ring-blue-500/20' : 'opacity-60 hover:opacity-100'}`}>
    <div className={`absolute -left-[52px] top-6 w-10 h-10 rounded-full ${color} border-4 border-[#080a0f] flex items-center justify-center z-10 shadow-lg ${isActive ? 'shadow-blue-500/40' : ''}`}>
      {icon}
    </div>
    <div className="flex justify-between items-start mb-4">
      <span className={`px-3 py-1 ${isActive ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-400'} rounded-full text-[10px] font-black uppercase tracking-widest`}>
        {day}
      </span>
      <span className="text-xs font-bold text-gray-500">{time}</span>
    </div>
    <h4 className="text-xl font-black mb-2 group-hover:text-rose-500 transition-colors">{title}</h4>
    <p className="text-sm text-gray-400 mb-4 leading-relaxed font-medium">{desc}</p>
    
    {buttons && (
      <div className="flex gap-2">
        {buttons.map(btn => (
          <button key={btn} className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-[11px] font-bold transition-all border border-white/5">
            {btn}
          </button>
        ))}
      </div>
    )}

    {tip && (
      <div className="bg-black/20 p-4 rounded-2xl border border-white/5 mt-2">
        <p className="text-[10px] text-yellow-500 font-black uppercase mb-1 tracking-tighter">Culture Tip</p>
        <p className="text-xs italic text-gray-500 font-medium">"{tip}"</p>
      </div>
    )}
  </div>
);

const QuickTool = ({ icon, label }) => (
  <button className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-3xl hover:bg-rose-500 transition-all group border border-white/5">
    <div className="mb-2 text-gray-400 group-hover:text-white transition-colors">
      {icon}
    </div>
    <span className="text-[10px] font-black tracking-tight">{label}</span>
  </button>
);

const NavBtn = ({ icon, active }) => (
  <button className={`w-12 h-12 flex items-center justify-center transition-colors ${active ? 'text-rose-500' : 'text-gray-500 hover:text-white'}`}>
    {React.cloneElement(icon, { size: 24 })}
  </button>
);

export default App;
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import * as Lucide from 'lucide-react';

// 드론 관제 모달 임포트 (파일명과 경로 확인 필수)
import DroneControlModal from '.mango\Transfer\src/components/Drone/DroneControlModal';

// --- Firebase Configuration ---
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const appId = typeof __app_id !== 'undefined' ? __app_id : 'mango-transfer-v3';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// --- Translations ---
const TRANSLATIONS = {
  ko: { title: "망고 트랜스퍼", search: "기사명 또는 차량 번호 검색...", fleet: "함대 관리", dashboard: "대시보드", safety: "안전 지수", map: "라이브 맵", security: "보안 관제" },
  en: { title: "Mango Transfer", search: "Search driver or plate...", fleet: "Fleet Mgmt", dashboard: "Dashboard", safety: "Safety Index", map: "Live Map", security: "Security" }
};

// --- Helper for Icons ---
const Icon = ({ name, ...props }) => {
  const LucideIcon = Lucide[name];
  return LucideIcon ? <LucideIcon {...props} /> : <Lucide.HelpCircle {...props} />;
};

// --- Sub-Components ---

// 1. Dashboard Tab Content
const DashboardContent = ({ vehicles, t }) => (
  <div className="space-y-10 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCard title="Active Fleet" value={Object.keys(vehicles).length} trend="Live" iconName="Globe" colorClass="bg-indigo-500" />
      <StatCard title="Delivery Efficiency" value="94.2%" trend="+2.4%" iconName="Zap" colorClass="bg-emerald-500" />
      <StatCard title="System Uptime" value="99.9%" trend="Stable" iconName="Cpu" colorClass="bg-orange-500" />
      <StatCard title={t('safety')} value="98.8" trend="+0.1%" iconName="Shield" colorClass="bg-blue-500" />
    </div>
    
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
      <div className="xl:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-xl p-8 min-h-[400px]">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-black text-slate-800 text-lg">System Intelligence</h3>
          <div className="flex gap-2 text-[10px] font-black uppercase">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">AI Analysis On</span>
          </div>
        </div>
        <div className="h-64 flex items-end gap-4 px-4">
          {[40, 70, 45, 90, 65, 80, 95, 60, 85].map((h, i) => (
            <div key={i} className="flex-1 bg-slate-50 rounded-t-2xl relative group hover:bg-indigo-50 transition-colors">
              <div style={{ height: `${h}%` }} className="bg-indigo-500/20 rounded-t-2xl absolute bottom-0 w-full group-hover:bg-indigo-500 transition-all"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-slate-900 rounded-[3rem] p-8 text-white flex flex-col justify-between overflow-hidden relative">
        <div className="absolute -right-10 -bottom-10 opacity-10"><Icon name="Globe" size={240} /></div>
        <div className="relative">
          <Icon name="MessageSquare" className="text-indigo-400 mb-6" size={32} />
          <h3 className="text-2xl font-black mb-4">Command Center</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">현재 강남구 역삼동 부근 차량 밀집도가 높습니다.</p>
        </div>
        <button className="w-full py-4 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-indigo-600 transition-all relative">
          Activate Optimizer
        </button>
      </div>
    </div>
  </div>
);

// 2. Fleet Management Tab Content (드론 버튼 로직 통합 버전)
const FleetContent = ({ vehicles, onSelectDrone }) => (
  <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {Object.values(vehicles).map((v) => (
        <div key={v.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-wrap sm:flex-nowrap gap-8 items-center">
          <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center text-indigo-600 relative overflow-hidden">
            <Icon name={v.type === 'drone' ? "Navigation" : "Truck"} size={40} />
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-emerald-500" style={{ width: `${v.battery}%` }}></div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-black text-slate-800">{v.name} <span className="text-[10px] text-slate-300 ml-2">#{v.type}</span></h4>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase">Normal</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col"><span className="text-[10px] font-black text-slate-400 uppercase">Speed</span><span className="font-black text-slate-700">{v.speed}</span></div>
              <div className="flex flex-col"><span className="text-[10px] font-black text-slate-400 uppercase">Energy</span><span className="font-black text-slate-700">{Math.round(v.battery)}%</span></div>
              <div className="flex flex-col"><span className="text-[10px] font-black text-slate-400 uppercase">Status</span><span className="font-black text-emerald-500">Active</span></div>
            </div>
          </div>
          <div className="flex gap-2">
            {v.type === 'drone' && (
              <button 
                onClick={() => onSelectDrone(v)}
                className="px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100"
              >
                Launch
              </button>
            )}
            <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors">
              <Icon name="Settings" size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 3. Live Map Tab Content
const MapContent = ({ vehicles }) => (
  <div className="h-[calc(100vh-250px)] bg-slate-100 rounded-[3rem] border border-slate-100 shadow-inner relative overflow-hidden animate-in fade-in duration-700">
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(#4f46e5 1.5px, transparent 1.5px)`, backgroundSize: '40px 40px' }}></div>
    {Object.values(vehicles).map((v) => (
      <div key={v.id} className="absolute transition-all duration-3000 ease-in-out" 
           style={{ left: `${(v.lng - 126.97) * 5000 + 50}%`, top: `${(37.56 - v.lat) * 5000 + 50}%` }}>
        <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl animate-bounce">
          <Icon name={v.type === 'drone' ? "Navigation" : "Car"} size={20} />
        </div>
      </div>
    ))}
  </div>
);

// 4. Security Tab Content
const SecurityContent = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in slide-in-from-right-4 duration-500">
    <div className="lg:col-span-2 space-y-6">
      <h3 className="text-xl font-black text-slate-800 flex items-center gap-3"><Icon name="Lock" /> Security Log</h3>
      <div className="bg-white p-6 rounded-3xl border border-slate-100 text-sm font-bold text-slate-400">No recent threats detected.</div>
    </div>
  </div>
);

const StatCard = ({ title, value, trend, iconName, colorClass }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
    <div className="flex items-center justify-between mb-6">
      <div className={`p-4 rounded-2xl ${colorClass} bg-opacity-10 group-hover:scale-110 transition-transform`}>
        <Icon name={iconName} className={colorClass.replace('bg-', 'text-')} size={24} />
      </div>
      <span className="text-xs font-black px-3 py-1.5 rounded-full text-emerald-500 bg-emerald-50">{trend}</span>
    </div>
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{title}</p>
    <p className="text-4xl font-black mt-1 text-slate-900 tracking-tighter">{value}</p>
  </div>
);

// --- Main App ---
export default function App() {
  const [lang, setLang] = useState('ko');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [vehicles, setVehicles] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDrone, setSelectedDrone] = useState(null);

  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en'][key];

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (e) { console.error(e); }
    };
    initAuth();
    return onAuthStateChanged(auth, (u) => { 
      setUser(u);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'vehicles');
    return onSnapshot(colRef, (snap) => {
      const data = {};
      snap.forEach(d => { data[d.id] = d.data(); });
      setVehicles(data);
    }, (err) => console.error(err));
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(async () => {
      const myVehicleDoc = doc(db, 'artifacts', appId, 'public', 'data', 'vehicles', user.uid);
      await setDoc(myVehicleDoc, {
        id: user.uid,
        name: `Mango-${user.uid.substring(0,4)}`,
        type: Math.random() > 0.5 ? 'drone' : 'car',
        lat: 37.5665 + (Math.random() - 0.5) * 0.015,
        lng: 126.9780 + (Math.random() - 0.5) * 0.015,
        speed: Math.floor(Math.random() * 50) + 15,
        battery: Math.max(0, 95 - (Date.now() % 10000) / 1000),
        lastSeen: serverTimestamp()
      }, { merge: true });
    }, 5000);
    return () => clearInterval(interval);
  }, [user]);

  if (loading) return <div className="h-screen flex items-center justify-center bg-white font-black text-indigo-600 animate-pulse tracking-widest uppercase">Booting Mango OS...</div>;

  return (
    <div className="flex h-screen bg-slate-50/50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-24 lg:w-80 bg-white border-r border-slate-100 flex flex-col z-50 shadow-2xl shadow-slate-200/20">
        <div className="p-10 flex items-center gap-5">
          <div className="w-14 h-14 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200 transform -rotate-6">
            <Icon name="Smartphone" size={28} />
          </div>
          <div className="hidden lg:block">
            <h1 className="font-black text-3xl tracking-tighter text-slate-900 uppercase leading-none">Mango</h1>
            <p className="text-[11px] font-black text-indigo-500 tracking-[0.4em] uppercase mt-1">Control v3</p>
          </div>
        </div>
        <nav className="flex-1 px-8 space-y-4">
          {[{ id: 'dashboard', icon: 'Activity', label: t('dashboard') },
            { id: 'fleet', icon: 'Truck', label: t('fleet') },
            { id: 'map', icon: 'Navigation', label: t('map') },
            { id: 'security', icon: 'Shield', label: t('security') }].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-5 p-5 rounded-[1.5rem] transition-all duration-300 ${activeTab === item.id ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-50'}`}>
              <Icon name={item.icon} size={22} />
              <span className="hidden lg:block text-sm font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-28 px-12 flex items-center justify-between z-20">
          <div className="flex items-center bg-white rounded-[2rem] px-8 py-4 w-full max-w-2xl border border-slate-100 shadow-xl">
            <Icon name="Search" className="w-5 h-5 text-slate-300 mr-5" />
            <input type="text" placeholder={t('search')} className="bg-transparent text-sm w-full focus:outline-none font-bold text-slate-700" />
          </div>
        </header>

        <div className="flex-1 px-12 pb-12 overflow-y-auto custom-scrollbar">
          <div className="mb-12">
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.6em] mb-3">Operating Terminal</p>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">{t(activeTab)}</h2>
          </div>

          {activeTab === 'dashboard' && <DashboardContent vehicles={vehicles} t={t} />}
          {activeTab === 'fleet' && <FleetContent vehicles={vehicles} onSelectDrone={setSelectedDrone} />}
          {activeTab === 'map' && <MapContent vehicles={vehicles} />}
          {activeTab === 'security' && <SecurityContent />}
        </div>
      </main>

      {/* 드론 제어 모달 (상태가 존재할 때만 렌더링) */}
      {selectedDrone && (
        <DroneControlModal 
          drone={selectedDrone} 
          onClose={() => setSelectedDrone(null)} 
        />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        @keyframes swing { 0%, 100% { transform: rotate(0deg); } 20% { transform: rotate(15deg); } 40% { transform: rotate(-10deg); } 60% { transform: rotate(5deg); } 80% { transform: rotate(-5deg); } }
        .animate-swing { animation: swing 1s ease-in-out; }
      `}} />
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { 
  Users, Map, Calendar, TrendingUp, Settings, Bell, Search, Menu, 
  ChevronRight, MoreHorizontal, Plane, ShieldCheck, Star, 
  Download, Filter, CheckCircle2, Clock, AlertCircle,
  MapPin, ArrowRight, X
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, setDoc, updateDoc, getDoc } from 'firebase/firestore';

// --- Firebase Configuration ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'mango-travel-v1';

const App = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('journeys');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [error, setError] = useState(null);
  
  // State for Cloud Data
  const [stats, setStats] = useState([]);
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Authentication (RULE 3)
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth Error:", err);
        setError("인증에 실패했습니다.");
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // 2. Initial Data Setup & Real-time Listeners (RULE 1 & 2)
  useEffect(() => {
    if (!user) return;

    const statsDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'dashboard_stats');
    const journeysDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'active_journeys');

    // Helper to initialize data if not exists
    const ensureInitialData = async () => {
      try {
        const statsSnap = await getDoc(statsDocRef);
        if (!statsSnap.exists()) {
          await setDoc(statsDocRef, { items: [
            { id: 1, label: '활성 여행객', value: '1,284', change: '+12%', icon: 'Users' },
            { id: 2, label: '대기 중인 예약', value: '45', change: '-2%', icon: 'Clock' },
            { id: 3, label: '이달의 매출', value: '$84,200', change: '+18%', icon: 'TrendingUp' },
            { id: 4, label: '고객 만족도', value: '98%', change: '+0.5', icon: 'Star' },
          ]});
        }

        const journeysSnap = await getDoc(journeysDocRef);
        if (!journeysSnap.exists()) {
          await setDoc(journeysDocRef, { items: [
            { id: 'J-9901', name: '김민준', destination: '파리, 프랑스', status: 'Confirmed', date: '2025-05-12', package: '럭셔리 허니문', email: 'minjun@example.com' },
            { id: 'J-9902', name: '이지은', destination: '도쿄, 일본', status: 'Pending', date: '2025-04-20', package: '시티 익스케이프', email: 'jieun@example.com' },
            { id: 'J-9903', name: '박서준', destination: '발리, 인도네시아', status: 'In Progress', date: '2025-03-15', package: '웰니스 리트릿', email: 'seojun@example.com' },
          ]});
        }
      } catch (e) {
        console.warn("Initial data setup skipped or already exists.");
      }
    };

    ensureInitialData();

    // Stats Listener
    const unsubStats = onSnapshot(statsDocRef, 
      (docSnap) => { if (docSnap.exists()) setStats(docSnap.data().items); },
      (err) => { console.error("Stats sync error:", err); setError("통계 동기화 오류"); }
    );

    // Journeys Listener
    const unsubJourneys = onSnapshot(journeysDocRef, 
      (docSnap) => { 
        if (docSnap.exists()) setJourneys(docSnap.data().items); 
        setLoading(false);
      },
      (err) => { console.error("Journey sync error:", err); setError("여정 동기화 오류"); setLoading(false); }
    );

    return () => { unsubStats(); unsubJourneys(); };
  }, [user]);

  // Status Update Logic
  const updateJourneyStatus = async (id, newStatus) => {
    if (!user) return;
    try {
      const updated = journeys.map(j => j.id === id ? { ...j, status: newStatus } : j);
      const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'active_journeys');
      await updateDoc(docRef, { items: updated });
    } catch (err) {
      setError("상태 업데이트 중 오류가 발생했습니다.");
    }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#0a0c10] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold tracking-widest uppercase opacity-40">Connecting to Mango Cloud...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0a0c10] text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#11141d] border-r border-white/5 transition-all duration-300 flex flex-col z-20`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-rose-500 rounded-lg flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Plane size={18} className="text-white fill-white" />
          </div>
          {isSidebarOpen && <span className="font-black tracking-tighter text-xl text-white uppercase">Mango</span>}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavItem icon={<TrendingUp size={18}/>} label="대시보드" active={activeTab === 'overview'} isOpen={isSidebarOpen} onClick={() => setActiveTab('overview')} />
          <NavItem icon={<Map size={18}/>} label="여정 관리" active={activeTab === 'journeys'} isOpen={isSidebarOpen} onClick={() => setActiveTab('journeys')} />
          <NavItem icon={<Users size={18}/>} label="고객 리스트" active={activeTab === 'customers'} isOpen={isSidebarOpen} onClick={() => setActiveTab('customers')} />
        </nav>

        {error && (
          <div className="p-4 mx-4 mb-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
             <p className="text-[10px] text-rose-400 font-bold">{error}</p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/5 bg-[#0a0c10]/80 backdrop-blur-md flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400">
              <Menu size={20} />
            </button>
            <h1 className="text-sm font-bold text-white uppercase tracking-wider">Operation Center</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-[10px] text-slate-500 font-black uppercase">Admin UID</p>
                <p className="text-[10px] text-indigo-400 font-mono">{user?.uid?.substring(0, 10)}...</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                <Users size={18} className="text-slate-500" />
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-[#11141d] border border-white/5 p-6 rounded-2xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-black text-white">{stat.value}</h3>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl text-indigo-400">
                    <StatIcon name={stat.icon} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-[#11141d] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-lg font-black text-white italic">Active Journeys</h2>
              <div className="flex gap-2">
                 <button className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-[11px] font-black">Export</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-500 uppercase border-b border-white/5 bg-white/[0.01]">
                    <th className="px-6 py-4 text-indigo-400">Customer</th>
                    <th className="px-6 py-4">Destination</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {journeys.map((j) => (
                    <tr key={j.id} className="group hover:bg-white/[0.02] cursor-pointer" onClick={() => setSelectedCustomer(j)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">{j.name[0]}</div>
                          <span className="text-xs font-bold text-white">{j.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1"><MapPin size={12} className="text-rose-500"/> {j.destination}</div>
                      </td>
                      <td className="px-6 py-4"><StatusBadge status={j.status} /></td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-500">{j.date}</td>
                      <td className="px-6 py-4 text-right">
                        {j.status === 'Pending' && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); updateJourneyStatus(j.id, 'Confirmed'); }}
                            className="p-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-lg transition-all"
                          >
                            <CheckCircle2 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Detail Drawer Mock */}
          {selectedCustomer && (
            <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-[#11141d] shadow-2xl z-30 border-l border-white/10 p-8 transform transition-transform animate-in slide-in-from-right duration-300">
              <button onClick={() => setSelectedCustomer(null)} className="mb-8 p-2 hover:bg-white/5 rounded-full"><X size={20}/></button>
              <h3 className="text-2xl font-black text-white mb-2">{selectedCustomer.name}</h3>
              <p className="text-xs text-indigo-400 font-bold mb-8">{selectedCustomer.package}</p>
              
              <div className="space-y-6">
                <DetailRow label="ID" value={selectedCustomer.id} />
                <DetailRow label="Email" value={selectedCustomer.email} />
                <DetailRow label="Destination" value={selectedCustomer.destination} />
                <div className="pt-8 border-t border-white/5">
                   <h4 className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">여정 프로세스</h4>
                   <div className="space-y-4">
                      <div className="flex gap-3">
                         <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2"></div>
                         <p className="text-xs text-slate-300">항공권 발권 완료</p>
                      </div>
                      <div className="flex gap-3">
                         <div className="w-1 h-1 rounded-full bg-slate-700 mt-2"></div>
                         <p className="text-xs text-slate-500">현지 가이드 매칭 대기 중</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, isOpen, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${active ? 'bg-indigo-500/10 text-indigo-400 shadow-xl' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}>
    {icon}
    {isOpen && <span className="text-[11px] font-bold tracking-tight">{label}</span>}
  </button>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-[10px] font-black text-slate-500 uppercase">{label}</span>
    <span className="text-xs text-slate-200 font-medium">{value}</span>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    'Confirmed': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    'Pending': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    'In Progress': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  };
  return <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase border ${styles[status]}`}>{status}</span>;
};

const StatIcon = ({ name }) => {
  switch (name) {
    case 'Users': return <Users size={18} />;
    case 'Clock': return <Clock size={18} />;
    case 'TrendingUp': return <TrendingUp size={18} />;
    case 'Star': return <Star size={18} />;
    default: return <TrendingUp size={18} />;
  }
};

export default App;
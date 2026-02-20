import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Star, 
  Navigation, 
  Bed, 
  Music, 
  Languages, 
  Heart, 
  Compass, 
  Play,
  X,
  Calendar,
  ChevronRight,
  CloudRain,
  DollarSign,
  Clock,
  ArrowRight
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

// --- Firebase Configuration ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'mango-travel-v1';

const App = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedStay, setSelectedStay] = useState(null);
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 1. Firebase 인증 초기화
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

  // 2. 위시리스트 실시간 동기화
  useEffect(() => {
    if (!user) return;
    const q = collection(db, 'artifacts', appId, 'users', user.uid, 'wishlist');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWishlist(items);
    }, (err) => console.error("Firestore Error:", err));
    return () => unsubscribe();
  }, [user]);

  const toggleWishlist = async (stay) => {
    if (!user) return;
    const stayId = stay.id.toString();
    const isExist = wishlist.find(item => item.id === stayId);
    const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'wishlist', stayId);
    
    if (isExist) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, { ...stay, timestamp: serverTimestamp() });
    }
  };

  const stays = [
    { id: 1, name: "Neon Paradise Resort", location: "Bangkok, Thailand", price: "$120", rating: 4.9, img: "https://images.unsplash.com/photo-1551882547-ff43c63faf76?auto=format&fit=crop&w=800&q=80", tag: "Hot Deal" },
    { id: 2, name: "Cyberpunk Suites", location: "Tokyo, Japan", price: "$250", rating: 5.0, img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80", tag: "Luxury" },
    { id: 3, name: "Electric Island Villa", location: "Bali, Indonesia", price: "$180", rating: 4.8, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80", tag: "Beach Side" }
  ];

  const filteredStays = stays.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-rose-500/30 overflow-x-hidden">
      
      {/* --- 상단 정보 바 (Weather & FX) --- */}
      <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider overflow-x-auto whitespace-nowrap">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2 text-cyan-400">
            <CloudRain size={12} />
            <span>SEOUL 22°C</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400 border-l border-white/10 pl-6">
            <DollarSign size={12} />
            <span>USD/KRW 1,324.50</span>
          </div>
          <div className="flex items-center gap-2 text-rose-400 border-l border-white/10 pl-6">
            <Clock size={12} />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="hidden md:block text-white/40">
          Logged in as: <span className="text-white/80">{user?.uid || 'Guest'}</span>
        </div>
      </div>

      {/* --- 네비게이션 --- */}
      <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:rotate-12 transition-transform">
              <Compass className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter italic">MANGO<span className="text-rose-500">TRAVEL</span></h1>
          </div>
          
          <div className="hidden md:flex bg-white/5 p-1 rounded-full border border-white/10">
            {['explore', 'stays', 'music', 'wishlist'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-xs font-black transition-all ${
                  activeTab === tab ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                } uppercase tracking-widest`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <input 
                type="text" 
                placeholder="Search destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:w-64 transition-all focus:bg-white/10 focus:border-rose-500/50 outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-white/30 group-focus-within:text-rose-500" size={14} />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-rose-500 p-0.5 overflow-hidden ring-4 ring-rose-500/10 cursor-pointer">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid || 'default'}`} alt="avatar" />
            </div>
          </div>
        </div>
      </nav>

      {/* --- 메인 콘텐츠 --- */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {activeTab === 'explore' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* 히어로 섹션 */}
            <div className="relative rounded-[40px] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80" 
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
                alt="Main Hero"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 space-y-6">
                <span className="bg-rose-500 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full w-fit">
                  Summer 2024 Collection
                </span>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter max-w-2xl leading-[0.85]">
                  DREAM <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">BEYOND</span> <br/> BORDERS
                </h2>
                <p className="text-white/60 max-w-md text-sm font-medium leading-relaxed">
                  네온이 반짝이는 도쿄의 밤부터 발리의 평화로운 석양까지, 망고 트래블이 제안하는 럭셔리 휴양을 경험하세요.
                </p>
                <button className="bg-white text-black px-10 py-5 rounded-[20px] font-black text-sm w-fit hover:bg-rose-500 hover:text-white transition-all hover:translate-x-2 flex items-center gap-3">
                  BOOK YOUR JOURNEY <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* 추천 숙소 */}
            <div>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-black tracking-tighter uppercase italic">Trending <span className="text-rose-500">Now</span></h3>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Handpicked Luxury Experiences</p>
                </div>
                <button className="text-[10px] font-black text-white/40 hover:text-rose-500 uppercase tracking-[0.2em] transition-colors border-b border-white/10 pb-1">View All</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredStays.map(stay => (
                  <div key={stay.id} className="group relative bg-white/5 rounded-[32px] p-4 border border-white/5 hover:border-rose-500/30 transition-all hover:-translate-y-2">
                    <div className="relative rounded-[24px] overflow-hidden aspect-[4/5]">
                      <img src={stay.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={stay.name} />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                          {stay.tag}
                        </span>
                      </div>
                      <button 
                        onClick={() => toggleWishlist(stay)}
                        className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                          wishlist.find(item => item.id === stay.id.toString()) 
                            ? 'bg-rose-500 text-white' 
                            : 'bg-black/40 text-white hover:bg-rose-500'
                        }`}
                      >
                        <Heart size={18} fill={wishlist.find(item => item.id === stay.id.toString()) ? "currentColor" : "none"} />
                      </button>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                        <button className="bg-white text-black w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-colors">
                          Quick View
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 px-2">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-black text-lg group-hover:text-rose-500 transition-colors">{stay.name}</h4>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star size={14} fill="currentColor" />
                          <span className="text-xs font-bold text-white">{stay.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-white/40 mb-4">
                        <MapPin size={14} />
                        <span className="text-xs font-medium">{stay.location}</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <p className="text-sm font-black italic">{stay.price}<span className="text-white/40 text-[10px] not-italic ml-1">/ NIGHT</span></p>
                        <Navigation size={18} className="text-rose-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-12">
              <h2 className="text-5xl font-black tracking-tighter uppercase italic">Your <span className="text-rose-500">Dream</span> List</h2>
              <p className="text-white/40 text-sm mt-2 font-medium">저장된 숙소: {wishlist.length}곳</p>
            </div>
            
            {wishlist.length === 0 ? (
              <div className="py-32 flex flex-col items-center border-2 border-dashed border-white/5 rounded-[40px] text-white/20">
                <Heart size={64} className="mb-4 animate-pulse" />
                <p className="font-black text-xl uppercase tracking-widest">List is empty</p>
                <button onClick={() => setActiveTab('explore')} className="mt-6 text-rose-500 text-xs font-black hover:underline tracking-[0.2em] uppercase">Start Exploring</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlist.map(stay => (
                  <div key={stay.id} className="bg-white/5 border border-white/10 rounded-3xl p-4 group relative">
                    <img src={stay.img} className="w-full h-40 object-cover rounded-2xl mb-4" alt={stay.name} />
                    <h5 className="font-black text-md mb-1">{stay.name}</h5>
                    <p className="text-white/40 text-xs mb-4">{stay.location}</p>
                    <button 
                      onClick={() => toggleWishlist(stay)}
                      className="absolute top-6 right-6 p-2 bg-rose-500 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                    <button className="w-full py-3 bg-white/10 hover:bg-white hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- Music Player Tab (Simple Placeholder) --- */}
        {activeTab === 'music' && (
           <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in-95 duration-500">
              <div className="relative w-64 h-64 mb-12">
                <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-20"></div>
                <div className="relative z-10 w-full h-full bg-gradient-to-tr from-rose-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-rose-500/40 border-4 border-white/10">
                   <Music size={80} className="text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-black tracking-tighter italic uppercase mb-2 text-center">Travel <span className="text-rose-500">Radio</span></h3>
              <p className="text-white/40 font-black text-xs uppercase tracking-[0.3em] mb-8">Curated for your next journey</p>
              <div className="flex gap-4">
                 <button className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-rose-500 transition-colors group">
                    <Play size={24} className="group-hover:fill-white" />
                 </button>
              </div>
           </div>
        )}
      </main>

      {/* --- 플로팅 바 (Dynamic Island 스타일) --- */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md">
        <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[32px] p-2 flex items-center justify-between shadow-2xl ring-1 ring-white/20">
          <div className="flex items-center gap-4 px-4 py-2 border-r border-white/10">
            {activeTab === 'explore' ? (
               <div className="flex flex-col">
                  <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-none">Exploring</span>
                  <p className="text-xs text-white font-black truncate max-w-[120px]">Global Destinations</p>
               </div>
            ) : activeTab === 'music' ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center animate-pulse shadow-lg shadow-rose-500/40">
                  <Play size={14} className="text-white fill-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest leading-none">Live Radio</span>
                  <p className="text-xs font-black text-white">Cafe Del Mar Mix</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                <p className="text-[10px] font-black uppercase tracking-tighter text-white/80">Engine Ready</p>
              </div>
            )}
          </div>

          <button className="bg-white text-black px-6 py-3 rounded-[24px] font-black text-[10px] hover:bg-rose-500 hover:text-white transition-all shadow-xl active:scale-95 whitespace-nowrap uppercase tracking-widest">
            Book Engine
          </button>
        </div>
      </div>

      {/* --- 푸터 --- */}
      <footer className="border-t border-white/5 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-black italic tracking-tighter leading-none">MANGO<br/><span className="text-rose-500">TRAVEL</span></h1>
            <p className="text-white/40 text-xs font-bold leading-loose max-w-xs uppercase tracking-widest">
              Empowering your dreams through futuristic travel technology and luxury experiences.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h5 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em]">Services</h5>
              <ul className="text-xs font-bold space-y-3 text-white/40 uppercase tracking-widest">
                <li className="hover:text-white transition-colors cursor-pointer">Private Jet</li>
                <li className="hover:text-white transition-colors cursor-pointer">Luxury Stays</li>
                <li className="hover:text-white transition-colors cursor-pointer">VIP Concierge</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em]">Support</h5>
              <ul className="text-xs font-bold space-y-3 text-white/40 uppercase tracking-widest">
                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Safety Policy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms of Use</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">
          <p>© 2024 MANGO TRAVEL EXPRESS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-white cursor-pointer transition-colors">Discord</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
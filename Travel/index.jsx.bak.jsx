import React, { useState, useEffect } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

// --- Firebase Configuration ---
// 환경 변수 __firebase_config가 제공된다고 가정합니다.
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

  // 1. Firebase 인증 초기화
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("인증 오류:", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. Firestore에서 찜 목록(Wishlist) 실시간 동기화
  useEffect(() => {
    if (!user) return;
    
    // 규칙 1 준수: /artifacts/{appId}/users/{userId}/wishlist
    const wishlistRef = collection(db, 'artifacts', appId, 'users', user.uid, 'wishlist');
    const unsubscribe = onSnapshot(wishlistRef, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWishlist(items);
    }, (error) => {
      console.error("Firestore 수신 오류:", error);
    });

    return () => unsubscribe();
  }, [user]);

  // 목업 데이터 (숙소 정보)
  const stays = [
    {
      id: "stay_van_01",
      name: "밴쿠버 모던 포레스트 캐빈",
      location: "Vancouver, Canada",
      price: "₩185,000",
      rating: 4.92,
      reviews: 124,
      coords: { top: '35%', left: '42%' },
      image: "https://images.unsplash.com/photo-1449156001437-37c645dca501?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "stay_jeju_02",
      name: "서귀포 럭셔리 씨사이드 빌라",
      location: "Jeju, Korea",
      price: "₩320,000",
      rating: 4.88,
      reviews: 89,
      coords: { top: '65%', left: '68%' },
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "stay_tokyo_03",
      name: "시부야 스카이라인 펜트하우스",
      location: "Tokyo, Japan",
      price: "₩275,000",
      rating: 4.95,
      reviews: 210,
      coords: { top: '45%', left: '75%' },
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800"
    }
  ];

  // 찜하기 토글 함수
  const toggleWishlist = async (stay) => {
    if (!user) return;
    const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'wishlist', stay.id);
    
    if (wishlist.some(item => item.id === stay.id)) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, {
        name: stay.name,
        location: stay.location,
        price: stay.price,
        image: stay.image,
        category: 'Travel',
        addedAt: serverTimestamp()
      });
    }
  };

  const isLiked = (id) => wishlist.some(item => item.id === id);

  return (
    <div className="flex flex-col h-screen bg-white text-slate-900 font-sans overflow-hidden">
      {/* 상단 헤더 */}
      <header className="px-8 py-5 border-b border-gray-100 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center shadow-xl shadow-rose-100">
            <Compass className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Mango Travel</h1>
            <p className="text-[10px] text-rose-500 font-bold tracking-[0.2em] uppercase mt-1">Premium Portal</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-400">
            <a href="#" className="text-slate-900">숙소 예약</a>
            <a href="#" className="hover:text-rose-500 transition-colors">항공권</a>
            <a href="#" className="hover:text-rose-500 transition-colors">렌터카</a>
            <a href="#" className="hover:text-rose-500 transition-colors">패키지</a>
          </nav>
          <div className="h-6 w-[1px] bg-gray-200 hidden lg:block"></div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">{user ? `User-${user.uid.slice(0,5)}` : "Guest"}</p>
              <p className="text-[10px] text-gray-400 font-medium">Mango Member</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-tr from-rose-400 to-orange-300"></div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 레이아웃 */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* 왼쪽 사이드바: 리스트 */}
        <div className="w-full md:w-[480px] bg-white border-r flex flex-col overflow-y-auto no-scrollbar">
          <div className="p-8 sticky top-0 bg-white z-10 space-y-6">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="어디로 떠나고 싶으신가요?"
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 focus:outline-none transition-all font-medium text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {['추천', '인기 급상승', '숲속 힐링', '해변가', '럭셔리 빌라', '반려견 동반'].map(cat => (
                <button key={cat} className="px-5 py-2.5 bg-gray-100 hover:bg-slate-900 hover:text-white rounded-xl text-xs font-bold whitespace-nowrap transition-all">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="px-8 pb-32 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">맞춤형 숙소 발견</h2>
              <span className="text-xs font-bold text-rose-500 bg-rose-50 px-3 py-1 rounded-full">{stays.length}개의 결과</span>
            </div>

            {stays.map(stay => (
              <div 
                key={stay.id} 
                className={`group cursor-pointer transition-all duration-500 ${selectedStay?.id === stay.id ? 'scale-[1.02]' : ''}`}
                onClick={() => setSelectedStay(stay)}
              >
                <div className="relative aspect-[16/9] rounded-[32px] overflow-hidden mb-4 shadow-2xl shadow-gray-200">
                  <img src={stay.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={stay.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(stay); }}
                    className={`absolute top-5 right-5 p-3 rounded-2xl backdrop-blur-xl shadow-2xl transition-all active:scale-90 ${isLiked(stay.id) ? 'bg-rose-500 text-white' : 'bg-white/80 text-gray-400 hover:text-rose-500'}`}
                  >
                    <Heart size={20} fill={isLiked(stay.id) ? "currentColor" : "none"} />
                  </button>
                  
                  <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                    <Star size={14} className="fill-rose-500 text-rose-500" />
                    <span className="text-xs font-black">{stay.rating}</span>
                    <span className="text-[10px] text-gray-500 font-medium">({stay.reviews})</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-500 transition-colors leading-tight">{stay.name}</h3>
                    <div className="flex items-center gap-1 text-gray-400 mt-1.5 font-bold">
                      <MapPin size={12} />
                      <span className="text-xs">{stay.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-900">{stay.price}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Per Night</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 영역: 맵 시뮬레이션 및 상세 제어 */}
        <div className="hidden md:block flex-1 relative bg-slate-50">
          {/* 가상 지도 배경 */}
          <div className="absolute inset-0 opacity-40" 
               style={{
                 backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
                 backgroundSize: '40px 40px'
               }}>
          </div>

          {/* 지도 핀들 */}
          {stays.map(stay => (
            <div 
              key={stay.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-10"
              style={{ top: stay.coords.top, left: stay.coords.left }}
              onClick={() => setSelectedStay(stay)}
            >
              <div className={`px-5 py-2.5 rounded-2xl font-black text-sm shadow-2xl border-2 transition-all flex items-center gap-2 group ${selectedStay?.id === stay.id ? 'bg-slate-900 text-white border-slate-900 scale-125' : 'bg-white text-slate-900 border-white hover:border-rose-500'}`}>
                <Bed size={16} className={selectedStay?.id === stay.id ? 'text-rose-400' : 'text-gray-400'} /> 
                {stay.price}
              </div>
            </div>
          ))}

          {/* 플로팅 지도 컨트롤 */}
          <div className="absolute top-8 right-8 flex flex-col gap-3">
            {['+', '-', 'GPS'].map(ctrl => (
              <button key={ctrl} className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center font-black text-slate-900 hover:bg-slate-900 hover:text-white transition-all">
                {ctrl === 'GPS' ? <Navigation size={20} /> : ctrl}
              </button>
            ))}
          </div>

          {/* 선택된 숙소 상세 카드 (하단 팝업) */}
          {selectedStay && (
            <div className="absolute bottom-10 left-10 right-10 max-w-4xl mx-auto bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] p-8 flex gap-8 border border-gray-50 animate-in fade-in slide-in-from-bottom-10 duration-500">
              <div className="w-64 h-64 rounded-[32px] overflow-hidden shadow-inner flex-shrink-0">
                <img src={selectedStay.image} className="w-full h-full object-cover" alt="detail" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-rose-50 text-rose-500 text-[10px] font-black rounded-full uppercase">Verified Property</span>
                        <div className="flex items-center gap-1">
                          <Star size={12} className="fill-rose-500 text-rose-500" />
                          <span className="text-xs font-bold">{selectedStay.rating}</span>
                        </div>
                      </div>
                      <h4 className="text-3xl font-black text-slate-900 leading-tight">{selectedStay.name}</h4>
                      <p className="text-sm text-gray-400 mt-2 font-medium flex items-center gap-1">
                        <MapPin size={14} /> {selectedStay.location} · 도심에서 2.4km
                      </p>
                    </div>
                    <button onClick={() => setSelectedStay(null)} className="p-3 bg-gray-50 rounded-full text-gray-300 hover:text-slate-900 transition-colors">
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <div className="flex-1 p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Check In</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black">2024.12.28</span>
                        <Calendar size={14} className="text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-1 p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Guests</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black">성인 2명</span>
                        <ChevronRight size={14} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <span className="text-3xl font-black text-rose-500">{selectedStay.price}</span>
                    <span className="text-sm text-gray-400 font-bold ml-2">/ 총 결제 금액</span>
                  </div>
                  <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm hover:bg-rose-500 shadow-2xl shadow-slate-200 active:scale-95 transition-all">
                    지금 바로 예약하기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 하단 유틸리티 바 (Floating) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-[35px] p-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[100]">
        <div className="flex items-center gap-2 pl-2">
          {[
            { id: 'explore', icon: Bed, label: '탐색' },
            { id: 'map', icon: MapPin, label: '주변' },
            { id: 'translate', icon: Languages, label: '번역' },
            { id: 'music', icon: Music, label: '무드' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-[24px] transition-all duration-500 ${activeTab === tab.id ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-gray-500 hover:text-white'}`}
            >
              <tab.icon size={20} />
              {activeTab === tab.id && <span className="text-xs font-black">{tab.label}</span>}
            </button>
          ))}
        </div>

        <div className="flex-1 mx-6 h-12 bg-white/5 rounded-2xl flex items-center px-5 border border-white/5">
          {activeTab === 'translate' ? (
            <div className="flex items-center gap-4 w-full">
              <span className="text-[10px] bg-rose-500 px-2 py-0.5 rounded-lg text-white font-black">AI 번역기</span>
              <p className="text-xs text-white/80 font-medium truncate">"가장 가까운 지하철역이 어디인가요?"</p>
            </div>
          ) : activeTab === 'music' ? (
            <div className="flex items-center gap-3 w-full">
              <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center animate-pulse">
                <Play size={14} className="text-white fill-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Playing Now</p>
                <p className="text-xs font-black truncate text-white">Cafe Del Mar - Sunset Mix</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-ping"></div>
              <p className="text-[11px] font-bold tracking-tight">망고 트래블 익스프레스 엔진 가동 중...</p>
            </div>
          )}
        </div>

        <button className="bg-white text-slate-900 px-8 py-4 rounded-[24px] font-black text-xs hover:bg-rose-500 hover:text-white transition-all shadow-xl active:scale-95 whitespace-nowrap">
          나의 여행 가방
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
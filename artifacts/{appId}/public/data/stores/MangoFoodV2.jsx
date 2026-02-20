import React, { useState, useEffect, useMemo } from 'react';
import { 
  Utensils, 
  User, 
  Store, 
  Camera, 
  Plus, 
  MessageSquare, 
  Flame, 
  MapPin, 
  ChevronRight,
  Star,
  Search,
  X,
  Image as ImageIcon,
  CreditCard,
  Crown,
  ChevronDown,
  TrendingUp,
  Award,
  Clock,
  Navigation,
  ThumbsUp,
  Share2,
  Copy,
  LayoutGrid,
  Maximize2,
  CheckCircle2,
  Heart,
  Sparkles
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged,
  signInWithCustomToken
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  doc, 
  updateDoc,
  increment,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';

// --- Firebase Setup ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'mango-food-visual-v2';

export default function App() {
  const [user, setUser] = useState(null);
  const [viewMode, setViewMode] = useState('consumer'); // 'consumer' | 'owner'
  const [displayMode, setDisplayMode] = useState('smart'); // 'smart' (List) | 'glass' (Visual)
  const [stores, setStores] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [expandedStoreId, setExpandedStoreId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Auth (Rule 3)
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) { console.error("Auth failed:", err); }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Sync Data (Rule 1 & 2)
  useEffect(() => {
    if (!user) return;
    const storesRef = collection(db, 'artifacts', appId, 'public', 'data', 'stores');
    const unsubscribe = onSnapshot(storesRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStores(data);
    }, (err) => console.error("Sync error:", err));
    return () => unsubscribe();
  }, [user]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2000);
  };

  // Advanced Share Logic
  const handleShare = (store) => {
    const shareText = `[MANGO 추천] ${store.name}\n🔥 현재 온도: ${store.temperature}°C\n📍 위치: ${store.address}\n\n지금 망고 푸드에서 확인해보세요!`;
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = shareText;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    showToast("홍보 문구와 링크가 복사되었습니다!");
  };

  // Like Action
  const handleLike = async (storeId) => {
    if (!user) return;
    const storeRef = doc(db, 'artifacts', appId, 'public', 'data', 'stores', storeId);
    await updateDoc(storeRef, { 
      likes: increment(1),
      temperature: increment(0.2)
    });
    showToast("관심 매장에 등록되었습니다! 🔥");
  };

  // Upgrade Action
  const upgradeToPremium = async (storeId) => {
    const storeRef = doc(db, 'artifacts', appId, 'public', 'data', 'stores', storeId);
    await updateDoc(storeRef, {
      isPremium: true,
      visualMenu: [
        { id: 1, name: "트러플 한우 스테이크", price: "58,000", img: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=300", tag: "BEST" },
        { id: 2, name: "제주 전복 파스타", price: "24,000", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=300", tag: "SIGNATURE" },
        { id: 3, name: "망고 바질 에이드", price: "8,500", img: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=300", tag: "HOT" }
      ]
    });
    setIsPaymentModalOpen(false);
    showToast("프리미엄 파트너가 되신 것을 환영합니다! ✨");
  };

  return (
    <div className="min-h-screen bg-[#060607] text-white font-sans selection:bg-yellow-500/30 overflow-x-hidden">
      {/* Dynamic Toast */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-white text-black px-8 py-4 rounded-3xl font-black text-sm shadow-[0_20px_50px_rgba(255,255,255,0.2)] flex items-center gap-3 animate-in slide-in-from-top duration-500">
          <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-[60] bg-[#060607]/80 backdrop-blur-3xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-tr from-yellow-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Utensils className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none">MANGO</h1>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Viral & Visual</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle Group */}
          <div className="bg-white/5 rounded-2xl p-1.5 flex items-center border border-white/10 shadow-inner">
            <button 
              onClick={() => setDisplayMode('smart')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${displayMode === 'smart' ? 'bg-white text-black font-black shadow-md' : 'text-white/40 hover:text-white'}`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-tighter hidden xs:block">Smart</span>
            </button>
            <button 
              onClick={() => setDisplayMode('glass')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${displayMode === 'glass' ? 'bg-white text-black font-black shadow-md' : 'text-white/40 hover:text-white'}`}
            >
              <Maximize2 className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-tighter hidden xs:block">Glass</span>
            </button>
          </div>

          <button 
            onClick={() => setViewMode(prev => prev === 'consumer' ? 'owner' : 'consumer')}
            className="w-11 h-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all group"
          >
            {viewMode === 'consumer' ? <Store className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" /> : <User className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />}
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto pb-36 pt-6">
        {viewMode === 'consumer' ? (
          <div className="px-6 space-y-10 animate-in fade-in duration-700">
            {displayMode === 'glass' ? (
              /* --- Glass Visual Mode --- */
              <div className="space-y-12">
                {stores.map(store => (
                  <div key={store.id} className="relative h-[550px] rounded-[3.5rem] overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5">
                    <img src={store.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    
                    {/* Floating Interaction Bar */}
                    <div className="absolute top-8 right-8 flex flex-col gap-4">
                      <button 
                        onClick={() => handleShare(store)}
                        className="w-14 h-14 bg-black/40 backdrop-blur-2xl rounded-[1.5rem] border border-white/20 flex items-center justify-center hover:bg-yellow-500 hover:text-black hover:scale-110 transition-all active:scale-95"
                      >
                        <Share2 className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={() => handleLike(store.id)}
                        className="w-14 h-14 bg-black/40 backdrop-blur-2xl rounded-[1.5rem] border border-white/20 flex items-center justify-center hover:bg-pink-500 hover:scale-110 transition-all active:scale-95"
                      >
                        <Heart className="w-6 h-6 fill-current" />
                      </button>
                    </div>

                    {/* Store Info Overlay */}
                    <div className="absolute bottom-12 left-10 right-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1.5 bg-yellow-500 text-black text-[11px] font-black rounded-full uppercase tracking-widest">{store.category}</span>
                        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="text-xs font-black">{store.temperature.toFixed(1)}°C</span>
                        </div>
                      </div>
                      <h2 className="text-5xl font-black tracking-tighter leading-none mb-4">{store.name}</h2>
                      <div className="flex items-center gap-2 text-white/50 text-sm mb-8">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{store.address}</span>
                      </div>
                      <button 
                        onClick={() => { setSelectedStore(store); setExpandedStoreId(expandedStoreId === store.id ? null : store.id); }}
                        className="w-full py-6 bg-white text-black rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all shadow-xl active:scale-[0.98]"
                      >
                        PREMIUM MENU <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* --- Smart Phone Mode --- */
              <>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-black tracking-tighter leading-none">Nearby Hotspots</h3>
                    <p className="text-white/30 text-xs mt-2 font-bold uppercase tracking-widest">실시간 인기 급상승 매장</p>
                  </div>
                  <button className="text-[11px] font-black text-yellow-500 underline decoration-2 underline-offset-4">VIEW ALL</button>
                </div>
                
                <div className="space-y-6">
                  {stores.sort((a,b) => b.temperature - a.temperature).map(store => (
                    <div key={store.id} className="bg-[#121214] border border-white/5 rounded-[2.5rem] p-5 hover:border-white/10 transition-all shadow-xl group">
                      <div className="flex gap-5">
                        <div className="relative flex-shrink-0">
                          <img src={store.imageUrl} className="w-32 h-32 rounded-[2rem] object-cover group-hover:scale-105 transition-transform" />
                          {store.isPremium && <div className="absolute -top-2 -left-2 bg-yellow-500 p-2 rounded-xl shadow-lg"><Crown className="w-3 h-3 text-black" /></div>}
                        </div>
                        <div className="flex-grow flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="text-xl font-black tracking-tight">{store.name}</h4>
                              <button onClick={() => handleShare(store)} className="p-2 text-white/20 hover:text-yellow-500 transition-colors"><Share2 className="w-4 h-4" /></button>
                            </div>
                            <p className="text-xs text-white/40 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {store.address}</p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => setExpandedStoreId(expandedStoreId === store.id ? null : store.id)}
                              className="flex-grow py-3 bg-white/5 rounded-2xl text-[11px] font-black border border-white/10 hover:bg-white/10 flex items-center justify-center gap-2 transition-all"
                            >
                              {expandedStoreId === store.id ? 'CLOSE' : 'SHOW MENU'} 
                              <ChevronDown className={`w-3 h-3 transition-transform ${expandedStoreId === store.id ? 'rotate-180' : ''}`} />
                            </button>
                            <button onClick={() => handleLike(store.id)} className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white/20 hover:text-pink-500 hover:border-pink-500/30 transition-all"><Heart className="w-4 h-4" /></button>
                          </div>
                        </div>
                      </div>
                      
                      {expandedStoreId === store.id && (
                        <div className="mt-5 pt-5 border-t border-white/5 grid grid-cols-2 gap-4 animate-in slide-in-from-top-4 duration-500">
                          {store.visualMenu ? (
                            store.visualMenu.map(m => (
                              <div key={m.id} className="relative aspect-square rounded-3xl overflow-hidden group/item">
                                <img src={m.img} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform" />
                                <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end">
                                  <p className="text-[10px] font-black uppercase text-yellow-500 mb-0.5">{m.tag}</p>
                                  <p className="text-xs font-black truncate">{m.name}</p>
                                  <p className="text-[10px] font-bold opacity-60">₩{m.price}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="col-span-2 py-8 text-center text-white/20 text-xs font-bold border border-dashed border-white/10 rounded-3xl">
                              PREMIUM MENU NOT FOUND
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          /* --- Owner Mode Dashboard --- */
          <div className="px-6 space-y-10 animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-black tracking-tighter">Growth<br/>Dashboard</h2>
                <p className="text-white/30 text-sm mt-3 font-bold uppercase tracking-widest">비즈니스 성공을 위한 인사이트</p>
              </div>
              <button 
                onClick={() => setIsStoreModalOpen(true)}
                className="w-16 h-16 bg-yellow-500 text-black rounded-[2rem] flex items-center justify-center shadow-2xl shadow-yellow-500/20 active:scale-90 transition-transform"
              >
                <Plus className="w-9 h-9 font-black" />
              </button>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white/5 border border-white/10 p-7 rounded-[2.5rem] relative overflow-hidden group">
                <TrendingUp className="absolute -bottom-4 -right-4 w-24 h-24 text-white/[0.02]" />
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Total Shares</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black">1.4k</span>
                  <span className="text-[10px] text-green-500 font-bold mb-1.5">+24%</span>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-7 rounded-[2.5rem] relative overflow-hidden group">
                <Heart className="absolute -bottom-4 -right-4 w-24 h-24 text-white/[0.02]" />
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Total Hearts</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black">842</span>
                  <span className="text-[10px] text-pink-500 font-bold mb-1.5">+8%</span>
                </div>
              </div>
            </div>

            {/* Premium Promotion */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#000] border border-yellow-500/20 p-8 rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-[80px]" />
              <Crown className="w-10 h-10 text-yellow-500 mb-6" />
              <h3 className="text-2xl font-black mb-3">Upgrade to Premium</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8 font-medium">
                고품질 시각화 메뉴판으로 Glass 뷰 점유율을 300% 높이세요. <br/>
                공유 시 더 화려한 카드 뉴스가 생성됩니다.
              </p>
              <button 
                onClick={() => setIsPaymentModalOpen(true)}
                className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-yellow-400 active:scale-95 transition-all shadow-lg shadow-yellow-500/20"
              >
                START NOW <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Managed Stores */}
            <div className="space-y-6">
              <h3 className="text-lg font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4 flex items-center gap-3">
                <Store className="w-5 h-5" /> My Active Stores
              </h3>
              {stores.filter(s => s.ownerId === user?.uid).map(store => (
                <div key={store.id} className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] flex items-center justify-between group hover:bg-white/[0.07] transition-all">
                  <div className="flex items-center gap-5">
                    <img src={store.imageUrl} className="w-20 h-20 rounded-[1.5rem] object-cover border border-white/10" />
                    <div>
                      <h4 className="font-black text-xl flex items-center gap-2">
                        {store.name} 
                        {store.isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                      </h4>
                      <p className="text-xs text-white/30 font-medium mt-1">{store.category} • {store.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleShare(store)}
                      className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 hover:text-yellow-500 hover:bg-yellow-500/10 transition-all active:scale-90"
                      title="Share Store"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => { setSelectedStore(store); setIsPaymentModalOpen(true); }}
                      className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                    >
                      <Award className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Payment Upgrade Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#121214] border border-white/10 p-10 rounded-[3.5rem] w-full max-w-md space-y-10 animate-in zoom-in-95 duration-500 shadow-[0_0_100px_rgba(255,190,0,0.1)]">
            <div className="flex justify-between items-start">
              <div>
                <Crown className="w-10 h-10 text-yellow-500 mb-4" />
                <h2 className="text-3xl font-black tracking-tight">Premium Plan</h2>
                <p className="text-white/40 text-xs mt-2 font-bold uppercase tracking-widest">매장: {selectedStore?.name}</p>
              </div>
              <button onClick={() => setIsPaymentModalOpen(false)} className="p-3 bg-white/5 rounded-full text-white/30 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => upgradeToPremium(selectedStore?.id)}
                className="w-full p-8 bg-yellow-500/10 border border-yellow-500/30 rounded-[2.5rem] text-left hover:bg-yellow-500/20 transition-all group border-l-4 border-l-yellow-500 shadow-xl"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-black text-xl text-yellow-500">시각화 풀패키지</span>
                  <span className="text-yellow-500 font-black">₩12,900</span>
                </div>
                <ul className="text-[11px] text-white/50 space-y-1.5 font-bold">
                  <li>• Glass 뷰 최적화 고해상도 메뉴판</li>
                  <li>• 홍보 문구 자동 생성 및 공유 스킨</li>
                  <li>• 검색 결과 프리미엄 배지 부여</li>
                </ul>
              </button>
              
              <div className="flex items-center gap-3 p-5 bg-white/5 rounded-2xl">
                <CreditCard className="w-5 h-5 text-white/30" />
                <span className="text-[11px] font-black text-white/60">Registered: **** 1234 (Mastercard)</span>
                <button className="ml-auto text-[10px] font-black text-yellow-500">CHANGE</button>
              </div>
            </div>
            
            <p className="text-[10px] text-center text-white/20 font-medium">언제든 해지 가능하며, 첫 달은 30% 할인이 적용됩니다.</p>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {isStoreModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
          <div className="bg-[#121214] border border-white/10 p-10 rounded-[3.5rem] w-full max-w-md space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black tracking-tight">New Store</h2>
              <button onClick={() => setIsStoreModalOpen(false)} className="p-2 text-white/20"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-white/30 ml-2 uppercase tracking-widest">Store Name</p>
                <input id="new-store-name" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:outline-none focus:border-yellow-500 font-bold placeholder:text-white/10" placeholder="가게 이름을 입력하세요" />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-white/30 ml-2 uppercase tracking-widest">Store Location</p>
                <input id="new-store-addr" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:outline-none focus:border-yellow-500 font-bold placeholder:text-white/10" placeholder="상세 주소를 입력하세요" />
              </div>
              
              <div className="p-5 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl flex items-start gap-4">
                <ImageIcon className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-[11px] font-black text-yellow-500 uppercase">Image Tip</p>
                  <p className="text-[10px] text-white/40 font-medium leading-relaxed mt-1">
                    밝은 자연광에서 촬영한 사진이 공유율을 2.5배 높입니다. <br/>가게를 가장 잘 설명하는 사진을 등록해주세요.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={() => setIsStoreModalOpen(false)} className="flex-1 py-5 bg-white/5 rounded-3xl font-black text-white/40 hover:bg-white/10 transition-all">CANCEL</button>
              <button 
                onClick={async () => {
                  const name = document.getElementById('new-store-name').value;
                  const addr = document.getElementById('new-store-addr').value;
                  if (!name || !user) return;
                  await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'stores'), {
                    name, address: addr, ownerId: user.uid, category: '한식',
                    temperature: 36.5, likes: 0, isPremium: false,
                    imageUrl: `https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600&seed=${Math.random()}`
                  });
                  setIsStoreModalOpen(false);
                  showToast("매장이 성공적으로 오픈되었습니다!");
                }}
                className="flex-1 py-5 bg-yellow-500 text-black rounded-3xl font-black shadow-lg shadow-yellow-500/20 active:scale-95 transition-all"
              >
                OPEN STORE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#0a0a0b]/40 backdrop-blur-3xl border border-white/10 px-10 py-5 rounded-[2.5rem] flex items-center gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50">
        <button onClick={() => setActiveTab('home')} className={`${activeTab === 'home' ? 'text-yellow-500' : 'text-white/20'} hover:scale-125 transition-all active:scale-90`}><Search className="w-7 h-7" /></button>
        <button onClick={() => setActiveTab('feed')} className={`${activeTab === 'feed' ? 'text-yellow-500' : 'text-white/20'} hover:scale-125 transition-all active:scale-90`}><Camera className="w-7 h-7" /></button>
        <button onClick={() => setActiveTab('chat')} className={`${activeTab === 'chat' ? 'text-yellow-500' : 'text-white/20'} hover:scale-125 transition-all active:scale-90`}><MessageSquare className="w-7 h-7" /></button>
        <button onClick={() => setActiveTab('profile')} className={`${activeTab === 'profile' ? 'text-yellow-500' : 'text-white/20'} hover:scale-125 transition-all active:scale-90`}><User className="w-7 h-7" /></button>
      </nav>
    </div>
  );
}
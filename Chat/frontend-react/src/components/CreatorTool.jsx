import React, { useState, useMemo } from 'react';
import { 
  User, 
  Utensils, 
  Truck, 
  Plane, 
  Heart, 
  Building2, 
  ShoppingBag, 
  MessageCircle, 
  GraduationCap,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const CreatorTool = () => {
  // --- State Management ---
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('Male');
  const [category, setCategory] = useState('Food');
  const [material, setMaterial] = useState('Polished Gold');
  const [theme, setTheme] = useState('Minimal Luxury');
  const [isCreating, setIsCreating] = useState(false);

  // --- Configuration Data ---
  const categories = [
    { id: 'Food', icon: Utensils, occupation: 'Michelin Street Master' },
    { id: 'Transfer', icon: Truck, occupation: 'Global Logistics Captain' },
    { id: 'Travel', icon: Plane, occupation: 'Luxury Chalet Guide' },
    { id: 'Hobby', icon: Heart, occupation: 'Vintage Collector' },
    { id: 'Realty', icon: Building2, occupation: 'Penthouse Specialist' },
    { id: 'Market', icon: ShoppingBag, occupation: 'Ecosystem Merchant' },
    { id: 'Chat', icon: MessageCircle, occupation: 'Social Architect' },
    { id: 'Education', icon: GraduationCap, occupation: 'Web3 Developer' },
  ];

  const materials = ['Polished Gold', 'Brushed Chrome', 'Crystal Glass'];
  const themes = ['Tropical Paradise', 'Cyber City', 'Minimal Luxury'];

  // --- Logic ---
  const currentOccupation = useMemo(() => {
    return categories.find(c => c.id === category)?.occupation || 'Mango Pioneer';
  }, [category]);

  const handleCreate = () => {
    setIsCreating(true);
    
    const characterData = {
      uid: `MP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      nickname: nickname || 'Anonymous Pioneer',
      gender,
      category,
      occupation: currentOccupation,
      pi_balance: 0,
      poa_score: 50,
      avatar_style: {
        material,
        theme
      },
      createdAt: new Date().toISOString()
    };

    // Simulation of the creation process
    setTimeout(() => {
      console.log('✨ Mango Pioneer Created:', characterData);
      setIsCreating(false);
      alert(`Welcome to the Universe, ${characterData.nickname}! Check console for data.`);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen flex flex-col items-center justify-center font-sans selection:bg-orange-500/30">
      {/* Custom Styles for Golden Particle Effect */}
      <style>{`
        @keyframes particle-rise {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        .particle {
          position: absolute;
          background: #f97316;
          border-radius: 50%;
          pointer-events: none;
          animation: particle-rise 1.5s ease-out forwards;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>

      <div className="w-full flex flex-col md:flex-row gap-8 items-stretch">
        
        {/* --- LEFT: LIVE PREVIEW --- */}
        <div className="flex-1 glass-panel rounded-[3rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
          
          {/* Profile Frame Simulation */}
          <div className={`w-64 h-64 rounded-full flex items-center justify-center relative transition-all duration-700
            ${material === 'Polished Gold' ? 'border-4 border-[#f97316] shadow-[0_0_30px_rgba(249,115,22,0.3)]' : 
              material === 'Brushed Chrome' ? 'border-4 border-slate-400 shadow-[0_0_30px_rgba(148,163,184,0.2)]' : 
              'border-4 border-white/20 backdrop-blur-3xl'}
          `}>
            <div className="text-8xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
              {gender === 'Male' ? '👨‍🚀' : gender === 'Female' ? '👩‍🚀' : '👤'}
            </div>
            
            {/* Floating Status Badges */}
            <div className="absolute -bottom-4 bg-orange-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic">
              PoA: 50
            </div>
          </div>

          {/* Character Card Info */}
          <div className="mt-12 text-center space-y-2">
            <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">
              {nickname || 'Identity Pending'}
            </h2>
            <p className="text-orange-500 font-bold text-xs uppercase tracking-[0.3em]">
              {currentOccupation}
            </p>
            <div className="pt-4 flex gap-3 opacity-40">
              <span className="text-[10px] border border-white/20 px-2 py-1 rounded-md">{material}</span>
              <span className="text-[10px] border border-white/20 px-2 py-1 rounded-md">{theme}</span>
            </div>
          </div>

          {/* Particle Container */}
          {isCreating && (
            <div className="absolute inset-0 z-50 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 8 + 4}px`,
                    height: `${Math.random() * 8 + 4}px`,
                    animationDelay: `${Math.random() * 1}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* --- RIGHT: CONFIGURATOR LAB --- */}
        <div className="flex-[1.2] space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
              <Sparkles className="text-black" size={20} />
            </div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase text-white">Character Lab</h1>
          </div>

          {/* 1. Identity */}
          <div className="glass-panel p-6 rounded-[2rem] space-y-4">
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
              <User size={12} /> Identity Protocol
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Enter Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-orange-500 transition-all text-white"
              />
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-orange-500 transition-all text-white appearance-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
              </select>
            </div>
          </div>

          {/* 2. Category Picker */}
          <div className="glass-panel p-6 rounded-[2rem] space-y-4">
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck size={12} /> Domain Specialization
            </div>
            <div className="grid grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group
                    ${category === cat.id ? 'bg-orange-500 border-orange-500 text-black' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'}
                  `}
                >
                  <cat.icon size={20} className={category === cat.id ? 'animate-bounce' : 'group-hover:text-white'} />
                  <span className="text-[9px] font-black uppercase tracking-tighter">{cat.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Style Config */}
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-[2rem] space-y-4">
              <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block">Material</label>
              <div className="flex flex-col gap-2">
                {materials.map(m => (
                  <button 
                    key={m}
                    onClick={() => setMaterial(m)}
                    className={`text-left p-3 rounded-xl text-xs font-bold transition-all
                      ${material === m ? 'bg-white/10 text-orange-500 border border-orange-500/50' : 'text-white/40 hover:text-white'}
                    `}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-[2rem] space-y-4">
              <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block">Environment</label>
              <div className="flex flex-col gap-2">
                {themes.map(t => (
                  <button 
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`text-left p-3 rounded-xl text-xs font-bold transition-all
                      ${theme === t ? 'bg-white/10 text-orange-500 border border-orange-500/50' : 'text-white/40 hover:text-white'}
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Action */}
          <button 
            onClick={handleCreate}
            disabled={isCreating}
            className="w-full py-6 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-900 text-black font-black italic uppercase tracking-[0.4em] rounded-[2rem] transition-all transform active:scale-95 shadow-[0_20px_50px_rgba(249,115,22,0.2)] flex items-center justify-center gap-4"
          >
            {isCreating ? (
              <>
                <div className="w-5 h-5 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              'Initialize Pioneer'
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreatorTool;

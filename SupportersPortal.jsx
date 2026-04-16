import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  Zap, 
  TrendingUp, 
  PieChart, 
  Users, 
  Share2, 
  Upload, 
  CheckCircle2, 
  Globe, 
  Utensils, 
  Truck, 
  Plane, 
  Heart, 
  Building2, 
  ShoppingBag, 
  MessageCircle, 
  GraduationCap,
  ChevronRight,
  Plus
} from 'lucide-react';

const SupportersPortal = () => {
  const [activeTier] = useState('Ambassador');
  const [poaScore] = useState(942);
  const [rank] = useState('#142');

  const categories = [
    { id: 'food', name: 'Food', icon: Utensils, stake: '10 π', yield: '+12.4%', location: 'Paris District' },
    { id: 'realty', name: 'Realty', icon: Building2, stake: '500 π', yield: '+8.2%', location: 'Seoul Haeundae' },
    { id: 'transfer', name: 'Transfer', icon: Truck, stake: '25 π', yield: '+15.1%', location: 'Global Fleet' },
    { id: 'travel', name: 'Travel', icon: Plane, stake: '100 π', yield: '+6.7%', location: 'Swiss Alps' },
    { id: 'market', name: 'Market', icon: ShoppingBag, stake: '50 π', yield: '+9.8%', location: 'Ecosystem Wide' },
    { id: 'hobby', name: 'Hobby', icon: Heart, stake: '5 π', yield: '+4.2%', location: 'Collectors Hub' },
    { id: 'chat', name: 'Chat', icon: MessageCircle, stake: '2 π', yield: '+22.5%', location: 'Ad Network' },
    { id: 'edu', name: 'Education', icon: GraduationCap, stake: '30 π', yield: '+11.0%', location: 'Web3 Academy' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-4 pb-24 md:p-8 selection:bg-orange-500/30">
      {/* Ambient Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
              Supporters <span className="text-orange-500">Portal</span>
            </h1>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.4em] mt-2 ml-1">
              Mango Elite Financial Terminal v1.0
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Node Verified</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Status & Revenue */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Supporter Status Card */}
            <motion.div 
              custom={0} initial="hidden" animate="visible" variants={cardVariants}
              className="glass-panel p-6 rounded-[2.5rem] border-orange-500/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Crown size={80} className="text-orange-500" />
              </div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-black shadow-lg">
                  <Crown size={20} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-orange-500 italic">{activeTier} Tier</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Global Supporter Rank</p>
                  <h3 className="text-4xl font-black italic tracking-tighter">{rank}</h3>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-white/5">
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">PoA Score</p>
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xl font-bold">{poaScore}</span>
                    </div>
                  </div>
                  <button className="text-[10px] font-black text-orange-500 uppercase border-b border-orange-500/30 pb-1">Upgrade Tier</button>
                </div>
              </div>
            </motion.div>

            {/* Revenue Monitor */}
            <motion.div 
              custom={1} initial="hidden" animate="visible" variants={cardVariants}
              className="glass-panel p-6 rounded-[2.5rem] border-white/5"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-orange-500" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Revenue Monitor</h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">+12.5%</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-3xl font-black italic">4,210.50 <span className="text-sm font-bold text-orange-500">π</span></h4>
                  <p className="text-[9px] text-white/20 uppercase font-bold">Total Earned</p>
                </div>
                
                {/* Mini Chart Mockup */}
                <div className="h-20 w-full flex items-end gap-1 px-1">
                  {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-orange-500/20 to-orange-500/60 rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 p-3 rounded-2xl">
                    <p className="text-[8px] text-white/40 uppercase font-bold mb-1">Referral Bonus</p>
                    <p className="text-sm font-bold">142.0 π</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl">
                    <p className="text-[8px] text-white/40 uppercase font-bold mb-1">Investment Yield</p>
                    <p className="text-sm font-bold text-orange-500">85.4 π</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Investments & Partnership */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Fractional Investment UI */}
            <motion.div 
              custom={2} initial="hidden" animate="visible" variants={cardVariants}
              className="glass-panel p-8 rounded-[3rem] border-white/5"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                  <PieChart size={20} className="text-orange-500" />
                  <h3 className="text-sm font-black uppercase tracking-[0.2em]">Fractional Asset Staking</h3>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-bold text-white/40 uppercase border border-white/10">Active Pools: 14</span>
                  <span className="px-3 py-1 bg-orange-500/10 rounded-full text-[8px] font-bold text-orange-500 uppercase border border-orange-500/20">Yield High</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat, i) => (
                  <div key={cat.id} className="p-4 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-orange-500/30 transition-all group cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/60 group-hover:text-orange-500 transition-colors">
                        <cat.icon size={20} />
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-emerald-400 italic">{cat.yield}</p>
                        <p className="text-[8px] text-white/20 uppercase font-bold tracking-tighter">Est. APR</p>
                      </div>
                    </div>
                    <h4 className="text-[13px] font-bold text-white group-hover:translate-x-1 transition-transform flex items-center gap-2">
                      {cat.name} <ChevronRight size={12} className="text-orange-500" />
                    </h4>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-[9px] text-white/40 font-medium uppercase tracking-widest">{cat.location}</p>
                      <div className="bg-orange-500 text-black px-3 py-1 rounded-lg text-[9px] font-black italic">
                        FROM {cat.stake}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Partnership Connect */}
              <motion.div 
                custom={3} initial="hidden" animate="visible" variants={cardVariants}
                className="glass-panel p-6 rounded-[2.5rem] border-blue-500/20"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Globe size={18} className="text-blue-400" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Radar Integration</h3>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed mb-6 italic">
                  Connect your local business to the Mango Radar network. Start accepting Pi payments globally.
                </p>
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-white/5 cursor-pointer transition-all">
                  <Upload size={20} className="text-white/20" />
                  <p className="text-[9px] font-bold text-white/40 uppercase">Upload Business Docs (PDF)</p>
                </div>
                <button className="w-full mt-4 py-3 bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                  Apply for Partnership
                </button>
              </motion.div>

              {/* Share & Earn */}
              <motion.div 
                custom={4} initial="hidden" animate="visible" variants={cardVariants}
                className="glass-panel p-6 rounded-[2.5rem] border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Share2 size={18} className="text-purple-400" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Share & Earn</h3>
                </div>
                <div className="bg-black/40 rounded-2xl p-4 flex items-center justify-between border border-white/5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white p-1 rounded-lg">
                      <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=MangoRef_Elite')] bg-cover" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-purple-400 uppercase tracking-widest leading-none">Your Link</p>
                      <p className="text-[10px] font-mono text-white/40 mt-1">mango.os/ref/elite77</p>
                    </div>
                  </div>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>
                <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl hover:bg-orange-500 hover:text-black transition-colors flex items-center justify-center gap-3 active:scale-95">
                  <Share2 size={14} />
                  Generate Elite Story
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .font-orb { font-family: 'Orbitron', sans-serif; }
      `}</style>
    </div>
  );
};

export default SupportersPortal;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Activity, Globe, Users, Zap, Radio, 
  TrendingUp, Cpu, Map as MapIcon, Send, BarChart3 
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="glass-panel p-6 border-l-4" style={{ borderColor: color }}>
    <div className="flex justify-between items-start mb-2">
      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{title}</p>
      <Icon size={16} style={{ color }} />
    </div>
    <h3 className="text-2xl font-orb font-black text-white italic">{value}</h3>
  </div>
);

const AdminCommandCenter = () => {
  const [stats, setStats] = useState({ activeUsers: 0, totalPi: 0, txCount: 0 });
  const [broadcastMsg, setBroadcastMsg] = useState("");

  // 실시간 데이터 폴링 (또는 소켓 연동)
  useEffect(() => {
    const interval = setInterval(() => {
      // Mocking real-time changes
      setStats(prev => ({
        activeUsers: 342 + Math.floor(Math.random() * 10),
        totalPi: 14520.45 + (Math.random() * 0.5),
        txCount: 1562
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const sendGlobalPush = async () => {
    console.log(`[HQ] Transmitting: ${broadcastMsg}`);
    // API 호출 로직 (생략)
    alert("Global announcement has been broadcasted.");
    setBroadcastMsg("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-[#020202] min-h-screen text-white font-sans">
      {/* --- Dashboard Header --- */}
      <header className="flex justify-between items-end mb-12 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="text-orange-500 animate-pulse" size={24} />
            <h1 className="text-3xl font-black italic tracking-tighter uppercase">
              Mango <span className="text-orange-500">Command Center</span>
            </h1>
          </div>
          <p className="text-xs text-white/20 font-bold uppercase tracking-[0.5em]">System Sovereign View v1.0</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Mainnet Connected</span>
          </div>
        </div>
      </header>

      {/* --- Analytics Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Active Pioneers" value={stats.activeUsers} icon={Users} color="#f97316" />
        <StatCard title="Total Pi Volume" value={`${stats.totalPi.toFixed(2)} π`} icon={TrendingUp} color="#fbbf24" />
        <StatCard title="Daily Transactions" value={stats.txCount} icon={BarChart3} color="#06b6d4" />
        <StatCard title="System Stability" value="99.9%" icon={Zap} color="#8b5cf6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Global Broadcast Hub --- */}
        <section className="lg:col-span-1 glass-panel p-8 rounded-[2.5rem] border-orange-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Radio size={80} />
          </div>
          <h3 className="text-sm font-black italic text-orange-500 mb-6 flex items-center gap-2 uppercase">
            <Radio size={18} /> Global Announcement
          </h3>
          <textarea 
            value={broadcastMsg}
            onChange={(e) => setBroadcastMsg(e.target.value)}
            placeholder="Enter priority message for all Pioneers..."
            className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-orange-500 transition-all resize-none mb-4"
          />
          <button 
            onClick={sendGlobalPush}
            className="w-full py-4 bg-orange-500 text-black font-black rounded-2xl uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
          >
            <Send size={16} /> Transmit Message
          </button>
        </section>

        {/* --- Ecosystem Traffic Heatmap --- */}
        <section className="lg:col-span-2 glass-panel p-8 rounded-[2.5rem] border-blue-500/20 relative overflow-hidden">
          <h3 className="text-sm font-black italic text-blue-400 mb-6 flex items-center gap-2 uppercase">
            <MapIcon size={18} /> Spatial Traffic Heatmap
          </h3>
          <div className="w-full h-64 bg-zinc-900/50 rounded-3xl border border-white/5 flex items-center justify-center relative group">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
             <div className="relative z-10 text-center">
                <Globe className="text-white/10 animate-spin-slow mx-auto mb-4 group-hover:text-blue-500/20 transition-colors" size={64} />
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Scanning Global Clusters...</p>
             </div>
             
             {/* Pulsing Hotspots */}
             <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-orange-500/20 rounded-full blur-xl animate-pulse" />
             <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
             <div className="absolute top-1/2 right-1/2 w-8 h-8 bg-yellow-500/20 rounded-full blur-lg animate-pulse" />
          </div>
          <div className="mt-4 flex justify-between">
            <div className="flex gap-4">
                <span className="text-[8px] font-bold text-orange-500">● Food Hotspot</span>
                <span className="text-[8px] font-bold text-blue-400">● Realty Node</span>
            </div>
            <span className="text-[8px] text-white/20 uppercase">Sector: Haeundae District 051</span>
          </div>
        </section>
      </div>

      <style jsx="true">{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .font-orb { font-family: 'Orbitron', sans-serif; }
      `}</style>
    </div>
  );
};

export default AdminCommandCenter;

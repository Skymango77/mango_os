import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  Lock, 
  QrCode, 
  Fingerprint,
  Copy,
  ChevronRight,
  FileText
} from 'lucide-react';

/**
 * MANGO VAULT & WALLET ENGINE 8.0
 * High-end Swiss Vault + Cyberpunk Aesthetics
 */

const TransactionCard = ({ tx }) => (
  <motion.div 
    whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-3 transition-all"
  >
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        tx.type === 'send' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
      }`}>
        {tx.type === 'send' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
      </div>
      <div>
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{tx.label}</h4>
        <p className="text-[9px] text-white/30 font-mono">{tx.date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`text-xs font-black ${tx.type === 'send' ? 'text-white' : 'text-orange-500'}`}>
        {tx.type === 'send' ? '-' : '+'}{tx.amount} π
      </p>
      <p className="text-[8px] text-white/20 uppercase font-bold">{tx.status}</p>
    </div>
  </motion.div>
);

const MangoWallet = ({ piBalance = "1,240.50", poaScore = 85 }) => {
  const [showQR, setShowQR] = useState(false);
  const [swipeX, setSwipeX] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const transactions = [
    { id: 1, type: 'receive', label: 'Gift from Sarah', amount: '5.00', date: '2026.03.05 14:20', status: 'verified' },
    { id: 2, type: 'send', label: 'Haeundae Realty Deposit', amount: '150.00', date: '2026.03.04 09:12', status: 'cleared' },
    { id: 3, type: 'receive', label: 'System PoA Reward', amount: '0.15', date: '2026.03.03 23:59', status: 'verified' },
  ];

  const activeContracts = [
    { id: 'C-101', type: 'Realty', title: 'Hannam THE HILL 105', status: 'Active', date: '2026.02.28' },
    { id: 'C-102', type: 'Escrow', title: 'Global Market Batch #4', status: 'Pending', date: '2026.03.01' },
  ];

  const handleSwipe = (event, info) => {
    if (info.point.x > 250) {
      setIsConfirmed(true);
      setTimeout(() => setIsConfirmed(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-[480px] min-h-screen bg-[#050505] p-6 text-white font-sans overflow-y-auto no-scrollbar mx-auto border-x border-white/5">
      
      {/* --- ASSET OVERVIEW --- */}
      <section className="relative mt-10 mb-12">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
            <ShieldCheck size={14} className="text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Vault Secure</span>
          </div>
          <Fingerprint size={24} className="text-white/20" />
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] ml-1">Total Available</p>
          <div className="flex items-baseline gap-3">
            <h1 className="text-5xl font-orb font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              {piBalance}
            </h1>
            <span className="text-2xl font-black text-orange-500 italic">π</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="glass-card p-4 border-l-2 border-orange-500/50">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={12} className="text-orange-500" />
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">PoA Score</span>
            </div>
            <p className="text-xl font-orb font-black text-white">{poaScore}<span className="text-[10px] text-white/20 ml-1">pts</span></p>
          </div>
          <div className="glass-card p-4 border-l-2 border-blue-500/50">
            <div className="flex items-center gap-2 mb-1">
              <Lock size={12} className="text-blue-400" />
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Escrow</span>
            </div>
            <p className="text-xl font-orb font-black text-white">45.00<span className="text-[10px] text-white/20 ml-1">π</span></p>
          </div>
        </div>
      </section>

      {/* --- QUICK ACTIONS --- */}
      <div className="flex gap-4 mb-12">
        <button 
          onClick={() => setShowQR(true)}
          className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/10 transition-all active:scale-95"
        >
          <QrCode size={20} className="text-orange-500" />
          <span className="text-[10px] font-black uppercase tracking-widest">Receive</span>
        </button>
        
        {/* SWIPE TO CONFIRM SEND */}
        <div className="flex-[2] relative h-[68px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Swipe to Send</span>
          </div>
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 220 }}
            onDrag={handleSwipe}
            className="absolute left-1 top-1 bottom-1 w-14 bg-orange-500 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shadow-lg shadow-orange-500/20"
          >
            {isConfirmed ? <ShieldCheck className="text-black" /> : <ChevronRight className="text-black" />}
          </motion.div>
          {isConfirmed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-orange-500 flex items-center justify-center z-20">
              <span className="text-[10px] font-black text-black uppercase tracking-[0.5em]">Payment Sent</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* --- SMART CONTRACT SAFE --- */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6 px-2">
          <Lock size={16} className="text-orange-500" />
          <h3 className="text-xs font-black uppercase tracking-widest text-white/60">Smart Contract Safe</h3>
        </div>
        <div className="space-y-3">
          {activeContracts.map(contract => (
            <div key={contract.id} className="glass-card p-4 flex items-center justify-between border border-white/5 hover:border-orange-500/30 transition-all cursor-pointer">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white uppercase tracking-wider">{contract.title}</h4>
                  <p class="text-[8px] text-white/30 font-mono">ID: {contract.id} • {contract.date}</p>
                </div>
              </div>
              <span class={`text-[8px] px-2 py-1 rounded-md font-black uppercase ${contract.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {contract.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* --- TRANSACTION HISTORY --- */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="flex items-center gap-2">
            <History size={16} className="text-white/40" />
            <h3 className="text-xs font-black uppercase tracking-widest text-white/60">Recent Activity</h3>
          </div>
          <button className="text-[10px] font-bold text-orange-500 uppercase tracking-tighter">View All</button>
        </div>
        <div className="custom-scroll max-h-[300px]">
          {transactions.map(tx => <TransactionCard key={tx.id} tx={tx} />)}
        </div>
      </section>

      {/* --- RECEIVE MODAL (QR) --- */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-8"
          >
            <div className="w-full glass-panel p-8 rounded-[3rem] border-orange-500/30 flex flex-col items-center text-center">
              <div className="w-48 h-48 bg-white p-4 rounded-3xl mb-8 shadow-[0_0_40px_rgba(249,115,22,0.3)]">
                <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=MangoVault_GDT...3F4')] bg-cover" />
              </div>
              <h3 className="text-xl font-black italic text-white mb-2 uppercase">Your Pi Address</h3>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 mb-8">
                <span className="text-[10px] font-mono text-orange-500 truncate w-40">GDT72...X93F4</span>
                <Copy size={14} className="text-white/40 cursor-pointer hover:text-white" />
              </div>
              <button 
                onClick={() => setShowQR(false)}
                className="w-full py-4 bg-orange-500 text-black font-black rounded-2xl uppercase tracking-widest active:scale-95 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.5rem;
        }
        .glass-panel {
          background: rgba(15, 15, 15, 0.8);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .font-orb { font-family: 'Orbitron', sans-serif; }
        .custom-scroll::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
};

export default MangoWallet;
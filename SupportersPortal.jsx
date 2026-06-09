import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import html2canvas from 'html2canvas';
import {
  Building2,
  Camera,
  CheckCircle2,
  ChevronRight,
  Crown,
  Globe,
  GraduationCap,
  Heart,
  History,
  MessageCircle,
  Package,
  PieChart,
  Plane,
  Scan,
  Search,
  Share2,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Truck,
  Upload,
  Utensils,
  X,
  Zap
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/**
 * Sub-component for Magnetic Tilt Effect
 */
const CategoryCard = ({ cat, i, mousePos, variants, onMouseEnter, onMouseLeave, setViewingYield }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Map normalized mouse position to rotation degrees
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 25 });

  useEffect(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize mouse position relative to card center (-0.5 to 0.5)
    const dx = (mousePos.x - centerX) / (rect.width);
    const dy = (mousePos.y - centerY) / (rect.height);
    
    const distance = Math.sqrt(Math.pow(mousePos.x - centerX, 2) + Math.pow(mousePos.y - centerY, 2));
    
    // Tilt activates when cursor is within 300px of card center
    if (distance < 300) {
      x.set(dx);
      y.set(dy);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [mousePos, x, y]);

  return (
    <motion.div 
      ref={cardRef}
      custom={i}
      initial="hidden"
      animate="visible"
      variants={variants}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
      whileHover={{ 
        scale: 1.02,
        borderColor: "rgba(249, 115, 22, 0.4)",
        boxShadow: "0 0 30px rgba(249, 115, 22, 0.15)"
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="p-4 rounded-3xl bg-white/[0.03] border border-white/5 transition-colors group cursor-pointer relative overflow-hidden"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/60 group-hover:text-orange-500 transition-colors">
            <cat.icon size={20} />
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-white flex items-center gap-2">
              {cat.name} <ChevronRight size={12} className="text-orange-500" />
            </h4>
            <p className="text-[9px] text-white/40 font-medium uppercase tracking-widest mt-1 leading-none">{cat.location}</p>
          </div>
        </div>
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" fill="transparent" className="text-white/10" />
            <motion.circle
              cx="24" cy="24" r="18" stroke="#f97316" strokeWidth="2.5" fill="transparent"
              strokeDasharray={2 * Math.PI * 18}
              initial={{ strokeDashoffset: 2 * Math.PI * 18 }}
              animate={{ strokeDashoffset: (2 * Math.PI * 18) - (cat.progress / 100) * (2 * Math.PI * 18) }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
          <span className="absolute text-[8px] font-black">{cat.progress}%</span>
        </div>
      </div>
      <div className="flex justify-between items-end mt-4 pt-4 border-t border-white/5">
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-[8px] text-white/20 uppercase font-bold tracking-tighter mb-0.5">Yield Performance</p>
            <p className="text-xs font-black text-emerald-400 italic">{cat.yield}</p>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setViewingYield(cat); }}
            className="flex items-center gap-1.5 text-[7px] font-black uppercase text-orange-500/60 hover:text-orange-500 transition-colors"
          >
            <TrendingUp size={10} /> View Live Yield
          </button>
        </div>
        <div className="bg-orange-500 text-black px-3 py-1 rounded-lg text-[9px] font-black italic shadow-lg shadow-orange-500/20">
          STAKE {cat.stake}
        </div>
      </div>
    </motion.div>
  );
};

const SupportersPortal = () => {
  const [activeTier] = useState('Ambassador');
  const [poaScore] = useState(942);
  const [rank] = useState('#142');
  const [showStakingHistory, setShowStakingHistory] = useState(false);
  const [yieldToasts, setYieldToasts] = useState([]);
  const [sharingItem, setSharingItem] = useState(null);
  const [viewingYield, setViewingYield] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [chartData, setChartData] = useState(Array.from({ length: 11 }, () => Math.floor(Math.random() * 80) + 40));
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [totalEarned, setTotalEarned] = useState(4210.50);
  const [scanStatus, setScanStatus] = useState('idle'); // idle, scanning, success
  const [scanHistory, setScanHistory] = useState([
    { id: 1, name: 'Seoul Centum Node', date: '2024-05-10', reward: '10.0 π' },
    { id: 2, name: 'Tokyo Shibuya Node', date: '2024-05-08', reward: '10.0 π' },
  ]);
  const [tickerSearch, setTickerSearch] = useState('');
  const certRef = useRef(null);
  const storyRef = useRef(null);

  // AR Node Scanning Success Sequence Logic
  useEffect(() => {
    let timer;
    if (isScanning) {
      setScanStatus('scanning');
      timer = setTimeout(() => {
        setScanStatus('success');
      }, 4000);
    } else {
      setScanStatus('idle');
    }
    return () => clearTimeout(timer);
  }, [isScanning]);

  // Simulation for real-time Yield Notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const amount = (Math.random() * 2 + 0.1).toFixed(2);
      const id = Date.now();
      setYieldToasts(prev => [...prev, { id, amount: `${amount} π`, asset: 'Staking Yield' }]);
      setTimeout(() => {
        setYieldToasts(prev => prev.filter(t => t.id !== id));
      }, 4000);
    }, 20000); // Trigger notification every 20 seconds
    return () => clearInterval(interval);
  }, []);

  const handleCollectReward = () => {
    const amount = 10.0;
    setTotalEarned(prev => prev + amount);
    
    // Add to Scan History
    const newNode = {
      id: Date.now(),
      name: `Global Node #${Math.floor(Math.random() * 9999)}`,
      date: new Date().toISOString().split('T')[0],
      reward: `${amount.toFixed(1)} π`
    };
    setScanHistory(prev => [newNode, ...prev]);

    // Trigger success toast
    const id = Date.now();
    setYieldToasts(prev => [...prev, { 
      id, 
      amount: `+${amount} π`, 
      asset: 'AR Node Reward', 
      isCert: false 
    }]);

    // Brief delay before closing scanner
    setTimeout(() => setIsScanning(false), 800);
  };

  // Dynamic data generator for the SVG chart
  useEffect(() => {
    if (!viewingYield) return;
    
    const updateInterval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        // Random walk or noise around a value
        const lastVal = prev[prev.length - 1];
        const change = (Math.random() * 30) - 15;
        const nextVal = Math.max(20, Math.min(130, lastVal + change));
        newData.push(nextVal);
        return newData;
      });
    }, 2000);

    return () => clearInterval(updateInterval);
  }, [viewingYield]);

  const stakingHistory = [
    { id: 1, date: '2024-05-15', asset: 'Lotte Castle', amount: '12.5 π', status: 'Completed' },
    { id: 2, date: '2024-05-01', asset: 'Paris Food', amount: '4.2 π', status: 'Completed' },
    { id: 3, date: '2024-04-20', asset: 'Swiss Alps', amount: '8.8 π', status: 'Completed' },
    { id: 4, date: '2024-04-10', asset: 'Global Fleet', amount: '15.4 π', status: 'Completed' },
  ];

  const categories = [
    { id: 'food', name: 'Food', icon: Utensils, stake: '10 π', yield: '+12.4%', location: 'Paris District', progress: 85 },
    { id: 'realty', name: 'Realty', icon: Building2, stake: '500 π', yield: '+8.2%', location: 'Seoul Haeundae', progress: 42 },
    { id: 'transfer', name: 'Transfer', icon: Truck, stake: '25 π', yield: '+15.1%', location: 'Global Fleet', progress: 68 },
    { id: 'travel', name: 'Travel', icon: Plane, stake: '100 π', yield: '+6.7%', location: 'Swiss Alps', progress: 91 },
    { id: 'market', name: 'Market', icon: ShoppingBag, stake: '50 π', yield: '+9.8%', location: 'Ecosystem Wide', progress: 35 },
    { id: 'hobby', name: 'Hobby', icon: Heart, stake: '5 π', yield: '+4.2%', location: 'Collectors Hub', progress: 77 },
    { id: 'chat', name: 'Chat', icon: MessageCircle, stake: '2 π', yield: '+22.5%', location: 'Ad Network', progress: 54 },
    { id: 'edu', name: 'Education', icon: GraduationCap, stake: '30 π', yield: '+11.0%', location: 'Web3 Academy', progress: 20 },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  const toastVariants = {
    initial: { x: 100, opacity: 0, scale: 0.9 },
    animate: { 
      x: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    },
    exit: { 
      x: 50, 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const handleShareCertificate = async (item) => {
    const id = Date.now();
    setYieldToasts(prev => [...prev, { 
      id, 
      amount: 'Generating...', 
      asset: item.asset, 
      isCert: true 
    }]);

    setSharingItem(item);

    // Brief timeout to ensure the hidden template is rendered before capture
    setTimeout(async () => {
      if (certRef.current) {
        const canvas = await html2canvas(certRef.current, { useCORS: true, backgroundColor: '#050505', scale: 2 });
        const link = document.createElement('a');
        link.download = `Mango_Elite_Cert_${item.id}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        setYieldToasts(prev => prev.map(t => t.id === id ? { ...t, amount: 'Downloaded' } : t));
        const text = `🥭 Mango Elite Staking Certificate\nAsset: ${item.asset}\nAmount: ${item.amount}\nVerified Pioneer: ${rank}\nJoin the Elite: mango.ceo`;
        navigator.clipboard.writeText(text);
      }
      setSharingItem(null);
      setTimeout(() => setYieldToasts(prev => prev.filter(t => t.id !== id)), 3000);
    }, 300);
  };

  const handleGenerateStory = async () => {
    const id = Date.now();
    setYieldToasts(prev => [...prev, { 
      id, 
      amount: 'Generating Story...', 
      asset: 'Elite Identity', 
      isCert: true 
    }]);

    setTimeout(async () => {
      if (storyRef.current) {
        const canvas = await html2canvas(storyRef.current, { 
          useCORS: true, 
          backgroundColor: '#050505', 
          scale: 2 
        });
        const link = document.createElement('a');
        link.download = `Mango_Elite_Story_${id}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        setYieldToasts(prev => prev.map(t => t.id === id ? { ...t, amount: 'Story Saved' } : t));
      }
      setTimeout(() => setYieldToasts(prev => prev.filter(t => t.id !== id)), 3000);
    }, 300);
  };

  const generatePath = (data, isArea = false) => {
    const points = data.map((y, i) => `${i * 40},${150 - y}`).join(' L ');
    const line = `M ${points}`;
    if (isArea) {
      return `${line} L 400,150 L 0,150 Z`;
    }
    return line;
  };

  // Step 1: Stylized Portfolio Ticker Items
  const tickerItems = useMemo(() => {
    const baseItems = categories.map(cat => ({
      name: cat.name,
      yield: cat.yield,
      stake: cat.stake
    }));
    return [...baseItems, ...baseItems, ...baseItems]; // Multiplied for length
  }, [categories]);

  return (
    <div 
      className="min-h-screen bg-[#050505] text-white font-sans p-4 pb-24 md:p-8 selection:bg-orange-500/30"
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {/* Custom Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-orange-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHoveringCard ? 1.5 : 0,
          opacity: isHoveringCard ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
      />

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
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsScanning(true)}
              className="flex items-center gap-3 bg-orange-500 text-black px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-lg shadow-orange-500/20"
            >
              <Scan size={14} /> Scan AR Node
            </button>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Node Verified</span>
            </div>
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
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowStakingHistory(true)} className="hover:text-orange-500 transition-colors">
                    <History size={14} className="text-white/40 hover:text-orange-500" />
                  </button>
                  <span className="text-[10px] font-mono text-emerald-400">+12.5%</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-3xl font-black italic">
                    {totalEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                    <span className="text-sm font-bold text-orange-500"> π</span>
                  </h4>
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

            {/* Scan History (Discovered Nodes) */}
            <motion.div 
              custom={5} initial="hidden" animate="visible" variants={cardVariants}
              className="glass-panel p-6 rounded-[2.5rem] border-white/5"
            >
              <div className="flex items-center gap-2 mb-6">
                <Scan size={16} className="text-orange-500" />
                <h3 className="text-xs font-black uppercase tracking-widest">Scan History</h3>
              </div>
              
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1 no-scrollbar">
                {scanHistory.map(node => (
                  <div key={node.id} className="bg-white/5 p-3 rounded-2xl flex justify-between items-center border border-white/5 group hover:border-orange-500/20 transition-all">
                    <div>
                      <h4 className="text-[10px] font-bold text-white uppercase">{node.name}</h4>
                      <p className="text-[8px] text-white/30 font-medium">{node.date}</p>
                    </div>
                    <span className="text-[10px] font-black text-orange-500 italic">+{node.reward}</span>
                  </div>
                ))}
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
                  <CategoryCard 
                    key={cat.id}
                    cat={cat}
                    i={i}
                    mousePos={mousePos}
                    variants={cardVariants}
                    onMouseEnter={() => setIsHoveringCard(true)}
                    onMouseLeave={() => setIsHoveringCard(false)}
                    setViewingYield={setViewingYield}
                  />
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
                <button 
                  onClick={handleGenerateStory}
                  className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl hover:bg-orange-500 hover:text-black transition-colors flex items-center justify-center gap-3 active:scale-95"
                >
                  <Share2 size={14} />
                  Generate Elite Story
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Staking History Modal */}
      <AnimatePresence>
        {showStakingHistory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg glass-panel rounded-[2.5rem] p-8 border-orange-500/20 relative"
            >
              <button 
                onClick={() => setShowStakingHistory(false)}
                className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-8">
                <History size={20} className="text-orange-500" />
                <h2 className="text-xl font-black italic uppercase tracking-tighter">Staking History</h2>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {stakingHistory.map((item) => (
                  <div key={item.id} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex justify-between items-center group hover:border-orange-500/30 transition-all">
                    <div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{item.date}</p>
                      <h4 className="text-sm font-bold text-white mt-0.5">{item.asset}</h4>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <p className="text-sm font-black text-orange-500 italic">{item.amount}</p>
                        <p className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">{item.status}</p>
                      </div>
                      <button 
                        onClick={() => handleShareCertificate(item)}
                        className="p-2 bg-white/5 rounded-xl text-white/40 hover:text-orange-500 hover:bg-orange-500/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowStakingHistory(false)}
                className="w-full mt-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl active:scale-95 transition-all"
              >
                Close History
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Yield Chart Modal */}
      <AnimatePresence>
        {viewingYield && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-2xl glass-panel rounded-[3rem] p-10 border-orange-500/20 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
              
              <button 
                onClick={() => setViewingYield(null)}
                className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 border border-orange-500/20">
                  <viewingYield.icon size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter">{viewingYield.name} Live Yield</h2>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.4em]">{viewingYield.location} • Real-time Node Data</p>
                </div>
              </div>

              <div className="h-64 w-full bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 relative group">
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live Syncing</span>
                </div>
                <div className="absolute top-6 right-6">
                  <span className="text-xl font-mono font-bold text-orange-500">{viewingYield.yield} <span className="text-[10px] text-white/40 uppercase">APR</span></span>
                </div>

                <svg className="w-full h-full" viewBox="0 0 400 150">
                  <AnimatePresence>
                    {hoveredPoint && (
                      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <line x1={hoveredPoint.x} y1="0" x2={hoveredPoint.x} y2="150" stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" />
                        <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="6" fill="#f97316" className="shadow-lg" />
                        <foreignObject x={hoveredPoint.x - 40} y={hoveredPoint.y - 40} width="80" height="30">
                          <div className="bg-orange-500 text-black text-[10px] font-black rounded-lg text-center py-1.5 shadow-xl border border-white/20">
                            {hoveredPoint.value.toFixed(1)}%
                          </div>
                        </foreignObject>
                      </motion.g>
                    )}
                  </AnimatePresence>

                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {[0, 1, 2, 3].map(i => (
                    <line key={i} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                  ))}

                  <motion.path
                    d={generatePath(chartData, true)}
                    fill="url(#lineGradient)"
                    animate={{ d: generatePath(chartData, true) }}
                    transition={{ duration: 1.5, ease: "linear" }}
                  />

                  <motion.path
                    d={generatePath(chartData)}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ d: generatePath(chartData) }}
                    transition={{ duration: 1.5, ease: "linear" }}
                  />

                  {/* Hit areas for Tooltip */}
                  {chartData.map((y, i) => (
                    <rect
                      key={i} x={i * 40 - 20} y="0" width="40" height="150" fill="transparent"
                      onMouseEnter={() => setHoveredPoint({ x: i * 40, y: 150 - y, value: y })}
                      onMouseLeave={() => setHoveredPoint(null)}
                      className="cursor-crosshair"
                    />
                  ))}
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { label: 'Staked Volume', value: '1.2M π' },
                  { label: 'Active Miners', value: '8.4K' },
                  { label: 'Trust Score', value: '98.2%' }
                ].map(stat => (
                  <div key={stat.label} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[8px] text-white/40 uppercase font-bold mb-1">{stat.label}</p>
                    <p className="text-sm font-black text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hidden Certificate Template for html2canvas */}
      <div className="fixed -left-[2000px] -top-[2000px] pointer-events-none">
        {sharingItem && (
          <div ref={certRef} className="w-[600px] h-[400px] bg-[#050505] p-12 border-2 border-orange-500/50 flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 p-8 opacity-5"><Crown size={200} className="text-orange-500" /></div>
            <div>
              <h1 className="text-4xl font-black italic tracking-tighter text-orange-500 uppercase mb-2">Mango Elite Certificate</h1>
              <p className="text-xs font-bold text-white/40 uppercase tracking-[0.4em]">Official Staking Validation</p>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Asset Staked</p>
                <h2 className="text-3xl font-black text-white">{sharingItem.asset}</h2>
              </div>
              <div className="flex gap-12">
                <div><p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Yield Amount</p><p className="text-2xl font-black text-orange-500 italic">{sharingItem.amount}</p></div>
                <div><p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Supporter ID</p><p className="text-2xl font-black text-white italic">{rank}</p></div>
              </div>
            </div>
            <div className="flex justify-between items-end border-t border-white/10 pt-8">
              <p className="text-[8px] text-white/20 font-bold uppercase tracking-widest">Verified via Mango Global Node Gateway</p>
              <div className="w-12 h-12 bg-white p-1 rounded-lg">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=MangoRef_Elite" alt="QR" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Story Template for html2canvas (Vertical 9:16) */}
      <div className="fixed -left-[2000px] -top-[2000px] pointer-events-none">
        <div ref={storyRef} className="w-[450px] h-[800px] bg-[#050505] p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-orange-500/10 to-transparent" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <Crown size={80} className="text-orange-500 mb-8" />
            <h1 className="text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
              Mango Elite <br/> <span className="text-orange-500">Identity</span>
            </h1>
            <div className="w-16 h-1.5 bg-orange-50 mt-6 rounded-full opacity-50" />
          </div>

          <div className="relative z-10 space-y-12">
            <div className="text-center">
              <p className="text-sm font-black text-white/40 uppercase tracking-[0.5em] mb-4">Current Status</p>
              <h2 className="text-8xl font-black italic tracking-tighter text-white leading-none">{rank}</h2>
              <p className="text-xl font-black text-orange-500 uppercase tracking-widest mt-2">{activeTier} Tier</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 text-center">
              <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-2">Proof of Alliance</p>
              <p className="text-5xl font-black text-white">{poaScore}</p>
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-6">Join the ecosystem: mango.ceo</p>
            <div className="w-16 h-16 bg-white p-2 rounded-2xl">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MangoRef_Elite" alt="QR" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Yield Toasts */}
      <div className="fixed top-6 right-6 z-[1000] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {yieldToasts.map((toast) => (
            <motion.div
              key={toast.id}
              variants={toastVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-zinc-900/90 border border-orange-500/30 p-4 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-4 pointer-events-auto min-w-[240px]"
            >
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500">
                {toast.isCert ? <CheckCircle2 size={20} /> : <Zap size={20} />}
              </div>
              <div>
                <p className="text-[8px] text-white/40 font-black uppercase tracking-widest">
                  {toast.isCert ? 'Social Sync' : 'Real-time Yield'}
                </p>
                <p className="text-[11px] font-bold text-white">
                  {toast.asset}: <span className="text-orange-500">{toast.amount}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Step 2: AR Node Scanner Interface */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
               <div className="w-full h-full bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>
            
            <div className="relative w-full max-w-sm aspect-[9/16] bg-zinc-900 rounded-[3rem] border-4 border-white/10 overflow-hidden shadow-2xl">
              {/* Corner Viewfinder Indicators */}
              <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-orange-500 rounded-tl-xl" />
              <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-orange-500 rounded-tr-xl" />
              <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-orange-500 rounded-bl-xl" />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-orange-500 rounded-br-xl" />
              
              {/* Scanning Ray */}
              {scanStatus === 'scanning' && (
                <motion.div 
                  animate={{ top: ["10%", "90%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 right-0 h-0.5 bg-orange-500 shadow-[0_0_20px_#f97316] z-10"
                />
              )}

              {scanStatus === 'scanning' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-12 text-center">
                  <Camera size={48} className="text-white/20 animate-pulse" />
                  <div>
                    <p className="text-xs font-black uppercase text-orange-500 tracking-[0.3em] mb-2">Align Node Frame</p>
                    <p className="text-[10px] text-white/40 font-bold uppercase leading-relaxed px-4">Detecting holographic partner credentials in physical space...</p>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-12 text-center"
                >
                  <div className="relative">
                    <motion.div 
                      animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} 
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Package size={80} className="text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.6)]" />
                    </motion.div>
                    <Sparkles className="absolute -top-4 -right-4 text-yellow-400 animate-pulse" size={32} />
                  </div>
                  <div>
                    <p className="text-xl font-black italic uppercase text-orange-500 tracking-[0.1em] mb-2">Node Found!</p>
                    <p className="text-[10px] text-white/60 font-bold uppercase leading-relaxed">Hidden Pi treasure chest revealed. Pioneer reward incoming.</p>
                  </div>
                  <button 
                    onClick={handleCollectReward}
                    className="px-8 py-3 bg-orange-500 text-black font-black text-[10px] uppercase rounded-2xl active:scale-95 transition-transform shadow-lg shadow-orange-500/30"
                  >
                    Collect 10.0 π
                  </button>
                </motion.div>
              )}

              <button 
                onClick={() => setIsScanning(false)}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-xl border border-white/20 active:scale-90 transition-transform"
              >
                <X size={32} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 1: Horizontal Staking Portfolio Ticker */}
      <div className="fixed bottom-0 left-0 w-full z-[80] bg-black/80 backdrop-blur-2xl border-t border-white/5 py-4 overflow-hidden flex flex-col gap-2">
        <div className="px-8 flex justify-end">
          <div className="relative flex items-center group">
            <Search size={10} className="absolute left-3 text-white/30 group-focus-within:text-orange-500" />
            <input 
              type="text" 
              placeholder="FILTER ASSETS..." 
              value={tickerSearch}
              onChange={(e) => setTickerSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full px-8 py-1 text-[8px] font-black text-white focus:outline-none focus:border-orange-500/50 transition-all w-32 focus:w-48 placeholder:text-white/20 uppercase tracking-widest"
            />
          </div>
        </div>
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-12 whitespace-nowrap px-8"
        >
          {tickerItems.map((item, idx) => {
            const isHighlighted = tickerSearch && item.name.toLowerCase().includes(tickerSearch.toLowerCase());
            return (
            <div key={idx} className={`flex items-center gap-4 group transition-all duration-500 ${isHighlighted ? 'scale-110 blur-none opacity-100' : tickerSearch ? 'opacity-20 blur-[1px]' : ''}`}>
              <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
              <div className="flex flex-col">
                <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${isHighlighted ? 'text-orange-500' : 'text-white/30'}`}>{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-white italic">{item.stake}</span>
                  <span className="text-[10px] font-black text-emerald-400">{item.yield}</span>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-white/5 ml-4" />
            </div>)
          })}
        </motion.div>
      </div>

      <style>{`
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
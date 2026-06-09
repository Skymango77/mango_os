import { createClient } from '@supabase/supabase-js';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, Building2, Crown, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

// Supabase 설정 (Apply_Master_Console과 동일값 사용)
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const MangoAdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({ total: 0, participant: 0, infra: 0, media: 0 });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchInitialData();

    // 실시간 구독 활성화
    const channel = supabase
      .channel('admin_realtime_all')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mango_global_applications' }, (payload) => {
        setApplications(prev => [payload.new, ...prev]);
        updateStats([payload.new, ...applications]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [applications]);

  const fetchInitialData = async () => {
    const { data, error } = await supabase
      .from('mango_global_applications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setApplications(data);
      updateStats(data);
    }
  };

  const updateStats = (data) => {
    const newStats = data.reduce((acc, app) => {
      acc.total++;
      acc[app.application_type] = (acc[app.application_type] || 0) + 1;
      return acc;
    }, { total: 0, participant: 0, infrastructure: 0, media: 0, publish: 0 });
    setStats(newStats);
  };

  const filteredApps = filter === 'all' ? applications : applications.filter(app => app.application_type === filter);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 font-sans">
      <header className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 uppercase">
            Mango Global Admin
          </h1>
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mt-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Real-time Node Monitoring
          </p>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 'all', label: '전체', icon: Activity, count: stats.total },
            { id: 'participant', label: '참가자', icon: Users, count: stats.participant },
            { id: 'infrastructure', label: '인프라', icon: Building2, count: stats.infrastructure },
            { id: 'publish', label: '상점', icon: Crown, count: stats.publish }
          ].map(btn => (
            <button 
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all whitespace-nowrap ${filter === btn.id ? 'bg-amber-500 border-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
            >
              <btn.icon size={16} />
              <span className="text-xs font-black uppercase">{btn.label}</span>
              <span className={`text-[10px] font-bold px-1.5 rounded-full ${filter === btn.id ? 'bg-black/20' : 'bg-white/10'}`}>{btn.count}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredApps.map((app) => (
            <motion.div
              key={app.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:border-amber-500/50 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${
                  app.application_type === 'participant' ? 'bg-blue-500/20 text-blue-400' :
                  app.application_type === 'infrastructure' ? 'bg-amber-500/20 text-amber-500' :
                  'bg-rose-500/20 text-rose-500'
                }`}>
                  {app.application_type === 'participant' ? <Users size={20} /> : 
                   app.application_type === 'infrastructure' ? <Building2 size={20} /> : <Crown size={20} />}
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-tighter">Application Date</p>
                  <p className="text-[10px] font-bold text-white/60">{new Date(app.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <h3 className="text-lg font-black text-white group-hover:text-amber-500 transition-colors truncate">
                {app.team_name}
              </h3>
              
              <div className="flex items-center gap-2 mt-2 mb-6">
                <MapPin size={12} className="text-white/40" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{app.city}</span>
                <div className="w-1 h-1 rounded-full bg-white/20 mx-1" />
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{app.application_type}</span>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-white/30 font-bold uppercase">Status</span>
                  <span className="text-green-500 font-black uppercase italic">Pending Review</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-white/30 font-bold uppercase">Identity Token</span>
                  <span className="text-white/60 font-mono truncate max-w-[150px]">{app.id}</span>
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                Review Full Dossier
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredApps.length === 0 && (
          <div className="col-span-full py-32 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
            <Activity size={48} className="mx-auto text-white/10 mb-4 animate-pulse" />
            <p className="text-white/30 font-black uppercase tracking-widest italic text-sm">Waiting for real-time node signals...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MangoAdminDashboard;

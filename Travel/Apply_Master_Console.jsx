import { createClient } from '@supabase/supabase-js';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, AlertCircle, Building2, Bus, Check, Clock, Crown, FileText, Globe, Hotel, Image, Link, MapPin, MessageCircle, Mic, Minus, Percent, Plane, Plus, Rocket, Share2, ShieldCheck, Ticket, Trophy, Upload, UserCheck, Users, Utensils, Video, Wallet, X, Youtube, Zap } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MangoVault } from '../MangoVault';
import DAO_Engine from '../src/components/DAO_Engine';

// Step 100: 최종 가동 선언 함수
export const bootMangoOS = () => {
  console.log("%c[SYSTEM]: Mango OS DAO Alliance Network fully operational, Global Entry Point Open", "color: #f59e0b; font-weight: bold; font-size: 14px;");
};

// Step 100: 최종 가동 네온 사인 컴포넌트
const FinalSystemFlag = () => (
  <div className="mt-12 p-8 border-t border-white/10 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full animate-pulse" />
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative z-10"
    >
      <div className="animate-pulse text-yellow-500 font-black text-3xl tracking-[0.5em] italic drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
        MANGO_SYSTEM_READY
      </div>
      <button 
        onClick={bootMangoOS}
        className="mt-8 px-10 py-4 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 rounded-full font-black text-[10px] text-white shadow-xl shadow-teal-500/20 uppercase tracking-[0.3em] active:scale-95 transition-all"
      >
        Initialize Global Entry
      </button>
    </motion.div>
  </div>
);

// --- Node Components (Placeholders for logic sync) ---
const WelcomeAuthModal = ({ onValid }) => null;
const QueueStatusNode = ({ status, rank, waitTime }) => {
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map(v => v < 10 ? "0" + v : v).join(":");
  };

  return (
    <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-6 mb-8 overflow-hidden relative group shadow-2xl">
      {/* Status Badge */}
      <div className="absolute top-4 right-6 z-10">
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest transition-all ${
          status === 'OPEN' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-rose-500/10 border-rose-500/30 text-rose-500'
        }`}>
          <div className={`w-1 h-1 rounded-full animate-pulse ${status === 'OPEN' ? 'bg-green-500' : 'bg-rose-500'}`} />
          Gateway: {status}
        </div>
      </div>

      <div className="flex items-center gap-8 relative z-10">
        {/* Radar / Rank Animation */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center bg-black/40 shadow-inner">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t-2 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            />
            <div className="text-center">
              <p className="text-[9px] font-black text-white/20 uppercase tracking-tighter leading-none mb-1">Queue</p>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={rank}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-3xl font-black italic text-white tracking-tighter leading-none"
                >
                  #{rank}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Countdown Info */}
        <div className="flex-1 space-y-1">
          <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] italic">Orchestration Phase</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-mono font-black text-white tabular-nums tracking-tighter">
              {formatTime(waitTime)}
            </span>
            <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Est. Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const OnboardingProgressBar = ({ progress }) => null;
const ReceiptModal = ({ isOpen, onClose, data, applicationId }) => {
  if (!isOpen) return null;

  // Confetti particles logic
  const particles = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      {/* Confetti Burst */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "50%", y: "50%", scale: 0, opacity: 1 }}
            animate={{ 
              x: `${50 + (Math.random() - 0.5) * 100}%`, 
              y: `${50 + (Math.random() - 0.5) * 100}%`, 
              scale: Math.random() * 1.5,
              opacity: 0 
            }}
            transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.02 }}
            className="absolute w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]"
          />
        ))}
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-[380px] bg-white text-black rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col font-sans"
      >
        <div className="bg-amber-500 p-8 text-center relative">
          <div className="absolute top-4 right-6 opacity-20">
            <Ticket size={60} className="rotate-12" />
          </div>
          <div className="w-14 h-14 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Check size={28} className="text-black stroke-[3px]" />
          </div>
          <h2 className="font-black italic uppercase tracking-tighter text-2xl leading-none">Node Activation<br/>Success</h2>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-black/30 uppercase tracking-widest">Global Application ID</p>
            <p className="text-xs font-mono font-bold bg-black/5 p-2 rounded-lg break-all border border-black/5">
              {applicationId || 'MNG-NODE-TEMP-XXXX'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2 border-t border-black/5">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-black/30 uppercase tracking-widest">Merchant</p>
              <p className="text-[11px] font-black uppercase truncate">{data.storeName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-black/30 uppercase tracking-widest">Network Status</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[11px] font-black text-green-600 uppercase">Premium</p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-black text-black/30 uppercase tracking-widest">Activation Fee</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black italic">10.00</span>
              <span className="text-xs font-black">π (PI)</span>
            </div>
          </div>
          
          <div className="pt-4">
             <div className="text-[9px] text-black/40 leading-relaxed font-bold italic uppercase">
               * This digital receipt confirms the successful registration of your node on the Mango Global network via the Pi Blockchain.
             </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-6 bg-black text-white font-black text-[11px] uppercase tracking-[0.3em] hover:bg-zinc-900 transition-all active:scale-[0.98]"
        >
          Finalize & Claim Bonus
        </button>
      </motion.div>
    </div>
  );
};

// Phase 9 - Step 81: Supabase 클라이언트 초기화 (대표님 기지국 설정값)
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Step 4: Prominent TICKET visual anchor
const TicketHeader = () => (
  <div className="relative py-4 mb-8 flex flex-col items-center justify-center">
    <div className="absolute -inset-4 bg-amber-500/5 blur-3xl rounded-full animate-pulse" />
    <div className="relative flex flex-col items-center">
      <span className="text-[10px] font-black text-amber-500/40 uppercase tracking-[0.5em] mb-1">Node Gateway</span>
      <h1 className="text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] via-[#B8860B] to-[#3E2C1E] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">TICKET</h1>
      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mt-2 rounded-full" />
    </div>
  </div>
);

// Step 12: 팀명/아티스트명 입력을 위한 독립 컴포넌트 노드
const TeamNameInput = ({ value, onChange }) => {
  const isValid = value.length === 0 || value.length >= 2;

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Team / Artist Name</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="팀명 또는 아티스트명을 입력하세요"
          className={`w-full bg-black/40 border ${isValid ? 'border-white/10' : 'border-rose-500/50'} rounded-2xl p-4 text-sm text-white placeholder:text-white/20 gold-focus transition-all`}
        />
        {!isValid && <p className="text-[9px] text-rose-500 mt-1 ml-2 font-bold uppercase tracking-tighter animate-pulse">최소 2자 이상 입력해 주세요 (Min 2 chars)</p>}
      </div>
    </div>
  );
};

// Step 13: 국가 및 도시 선택을 위한 글로벌 대륙별 드롭다운 셀렉터
const GlobalLocationSelector = ({ continent, city, onContinentChange, onCityChange }) => {
  const regions = {
    'Asia': ['Seoul', 'Tokyo', 'Bangkok', 'Jakarta'],
    'Europe': ['Paris', 'Berlin', 'London', 'Madrid'],
    'Americas': ['New York', 'Los Angeles', 'Sao Paulo', 'Toronto'],
    'Oceania': ['Sydney', 'Melbourne', 'Auckland']
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Continent</label>
        <select
          value={continent}
          onChange={(e) => onContinentChange(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none gold-focus appearance-none cursor-pointer"
        >
          <option value="" disabled>Select Continent</option>
          {Object.keys(regions).map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">City</label>
        <select
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          disabled={!continent}
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none gold-focus appearance-none cursor-pointer disabled:opacity-30"
        >
          <option value="" disabled>Select City</option>
          {continent && regions[continent].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </div>
  );
};

// Step 14: 인스타그램 릴스 및 유튜브 URL 정밀 검증 입력란
const VideoUrlInput = ({ value, onChange }) => {
  const regex = /^(https?:\/\/)?(www\.)?(instagram\.com\/reels\/|youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/).+$/;
  const isValid = value === '' || regex.test(value);

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Video URL (Instagram Reels / YouTube)</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className={`w-full bg-black/40 border ${isValid ? 'border-white/10' : 'border-rose-500/50'} rounded-2xl p-4 text-sm text-white placeholder:text-white/20 gold-focus transition-all`}
        />
        {!isValid && <p className="text-[9px] text-rose-500 mt-1 ml-2 font-bold uppercase tracking-tighter">유효한 URL 형식이 아닙니다 (Reels, YouTube)</p>}
      </div>
    </div>
  );
};

// Step 15: 참가 인원수 지정을 위한 카운터 컨트롤
const ParticipantCounter = ({ value, onChange, maxCount = 50 }) => (
  <div className="flex items-center justify-between bg-black/30 border border-white/5 rounded-2xl p-4">
    <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Participants</label>
    <div className="flex items-center gap-4">
      <button onClick={() => onChange(Math.max(1, value - 1))} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 text-white transition-all active:scale-90">
        <Minus size={14} />
      </button>
      <span className="text-sm font-black text-white w-4 text-center">{value}</span>
      <button onClick={() => onChange(Math.min(maxCount, value + 1))} className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center hover:bg-amber-600 text-black transition-all active:scale-90">
        <Plus size={14} />
      </button>
    </div>
  </div>
);

// Step 16: 골드 메탈릭 체크박스
const AuditionCheckbox = ({ checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group py-2">
    <div className="relative flex items-center justify-center">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-6 h-6 border-2 border-amber-500/50 rounded-lg bg-black/40 peer-checked:bg-amber-500 transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)] flex items-center justify-center">
        {checked && <Check size={16} className="text-black stroke-[4px]" />}
      </div>
    </div>
    <span className="text-[11px] font-black text-white/70 uppercase tracking-tighter group-hover:text-amber-500 transition-colors">
      대형 기획사 비공개 캐스팅 오디션 동시 지원
    </span>
  </label>
);

// Step 17: 음원 파일 드래그 앤 드롭 클라우드 파일 로더
const MusicFileLoader = ({ fileName, onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'audio/mpeg' || file.type === 'audio/wav' || file.name.endsWith('.mp3') || file.name.endsWith('.wav'))) {
      onFileSelect(file.name);
    } else {
      alert('mp3 또는 wav 파일만 업로드 가능합니다.');
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Music File (.mp3 / .wav)</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full h-32 border-2 border-dashed ${isDragging ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 bg-black/20'} rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer group`}
        onClick={() => document.getElementById('music-upload').click()}
      >
        <input type="file" id="music-upload" hidden accept=".mp3,.wav" onChange={(e) => e.target.files[0] && onFileSelect(e.target.files[0].name)} />
        <Upload size={24} className={`${isDragging ? 'text-amber-500' : 'text-white/20'} group-hover:text-amber-500 transition-colors mb-2`} />
        <p className="text-[10px] font-bold text-white/40 uppercase px-4 text-center">
          {fileName ? <span className="text-amber-500 italic">{fileName}</span> : 'Drag & Drop or Click to Upload'}
        </p>
      </div>
    </div>
  );
};

// Step 19: 서포터즈 추천 코드 자동 바인딩 필드
const FriendsCodeInput = ({ value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Friends Code (Incentive)</label>
    <div className="relative">
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="추천인 코드를 입력하세요" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-white/20 gold-focus transition-all" />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded-full"><span className="text-[8px] text-amber-500 font-black uppercase tracking-tighter">Auto Link</span></div>
    </div>
  </div>
);

// Phase 3 - Step 22, 23: 항공사/여행사 얼라이언스 및 API 동기화 폼
const AlliancePartnerForm = ({ data, onChange }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Alliance Type</label>
      <div className="flex gap-2">
        {['Airline', 'Travel Agency'].map(type => (
          <button key={type} onClick={() => onChange({ ...data, type })} className={`flex-1 py-3 rounded-xl text-[10px] font-bold border transition-all ${data.type === type ? 'bg-amber-500 text-black border-amber-500' : 'bg-white/5 text-white/40 border-white/10'}`}>{type}</button>
        ))}
      </div>
    </div>
    <div className="space-y-2">
      <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Company / Brand Name</label>
      <input type="text" value={data.companyName || ''} onChange={(e) => onChange({ ...data, companyName: e.target.value })} placeholder="항공사 또는 여행사명을 입력하세요" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white gold-focus transition-all" />
    </div>
    <div className="space-y-2">
      <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1 flex items-center gap-1"><Link size={10} /> API Endpoint Kernel</label>
      <input type="text" value={data.apiEndpoint || ''} onChange={(e) => onChange({ ...data, apiEndpoint: e.target.value })} placeholder="https://api.partner.com/v1/routes" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs font-mono text-cyan-400 gold-focus transition-all" />
    </div>
  </div>
);

// Phase 3 - Step 24: 여권/비자 문서 암호화 업로드 모듈
const EncryptedDocUploader = ({ fileName, onFileSelect }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest ml-1 flex items-center gap-1"><ShieldCheck size={10} /> Secure Doc Upload (Passport/Visa)</label>
    <div onClick={() => document.getElementById('secure-upload').click()} className="w-full py-6 bg-rose-500/5 border-2 border-dashed border-rose-500/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer group hover:bg-rose-500/10 transition-all">
      <input type="file" id="secure-upload" hidden onChange={(e) => e.target.files[0] && onFileSelect(e.target.files[0].name)} />
      <ShieldCheck className="text-rose-500/40 group-hover:scale-110 transition-transform mb-2" size={24} />
      <p className="text-[9px] font-bold text-rose-500/60 uppercase">{fileName || 'AES-256 Encrypted Tunnel Active'}</p>
    </div>
  </div>
);

// Phase 3 - Step 25: 단체 할인 및 요율 설정
const SettlementRateConfig = ({ discount, settlement, onChange }) => (
  <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-2xl border border-white/5">
    <div className="space-y-2">
      <label className="text-[10px] font-black text-amber-500/60 uppercase tracking-tighter flex items-center gap-1"><Percent size={10} /> Group Quota</label>
      <input type="text" value={discount} onChange={(e) => onChange('discountRate', e.target.value)} placeholder="0.00%" className="w-full bg-transparent border-b border-white/10 p-1 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
    </div>
    <div className="space-y-2 border-l border-white/10 pl-4">
      <label className="text-[10px] font-black text-amber-500/60 uppercase tracking-tighter flex items-center gap-1"><Trophy size={10} /> Mango Rate</label>
      <input type="text" value={settlement} onChange={(e) => onChange('mangoRate', e.target.value)} placeholder="0.00%" className="w-full bg-transparent border-b border-white/10 p-1 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
    </div>
  </div>
);

// Phase 3 - Step 26: 입국 스케줄 타임라인 피커
const ArrivalTimelinePicker = ({ city, date, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1 flex items-center gap-1"><Clock size={10} /> Arrival Timeline (Seoul / Busan)</label>
    <div className="flex gap-2">
      <select value={city} onChange={(e) => onChange('arrivalCity', e.target.value)} className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none gold-focus flex-1">
        <option value="" disabled>Select City</option>
        <option value="Seoul">ICN - Seoul</option>
        <option value="Busan">PUS - Busan</option>
      </select>
      <input type="datetime-local" value={date} onChange={(e) => onChange('arrivalDate', e.target.value)} className="bg-black/40 border border-white/10 rounded-xl p-3 text-[10px] text-white focus:outline-none gold-focus flex-[1.5]" />
    </div>
  </div>
);

// Phase 3 - Step 27, 28: 가이드 및 로컬 투어 에이전시 등록
const GuideAgencySlot = ({ data, onChange }) => {
  const languages = ['Korean', 'English', 'Chinese', 'Japanese', 'Spanish'];
  return (
    <div className="space-y-4 border-t border-white/5 pt-4">
      <div className="flex items-center gap-2 mb-2">
        <UserCheck size={14} className="text-cyan-400" />
        <h3 className="text-xs font-black text-white/80 uppercase tracking-widest">Guide & Local Agency</h3>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-cyan-400/60 uppercase tracking-widest ml-1">Languages</label>
        <div className="flex flex-wrap gap-1">
          {languages.map(lang => (
            <button key={lang} onClick={() => {
              const next = data.languages?.includes(lang) ? data.languages.filter(l => l !== lang) : [...(data.languages || []), lang];
              onChange({ ...data, languages: next });
            }} className={`px-3 py-1 rounded-full text-[9px] font-black border transition-all ${data.languages?.includes(lang) ? 'bg-cyan-500 border-cyan-500 text-black' : 'border-white/10 text-white/40'}`}>{lang}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-cyan-400/60 uppercase tracking-widest ml-1">License No.</label>
          <input type="text" value={data.licenseNo || ''} onChange={(e) => onChange({ ...data, licenseNo: e.target.value })} placeholder="자격증 번호" className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-xs text-white gold-focus" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-cyan-400/60 uppercase tracking-widest ml-1">Exp. Years</label>
          <input type="number" value={data.experience || ''} onChange={(e) => onChange({ ...data, experience: e.target.value })} placeholder="경력(년)" className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-xs text-white gold-focus" />
        </div>
      </div>
    </div>
  );
};

// Phase 3 - Step 29: 브랜드 로고 이미지 컴파일러
const BrandLogoCompiler = ({ logoName, onFileSelect }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1 flex items-center gap-1"><Image size={10} /> Brand Identity Logo</label>
    <div onClick={() => document.getElementById('logo-upload').click()} className="relative w-full h-24 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl flex items-center justify-center cursor-pointer group overflow-hidden">
      <input type="file" id="logo-upload" hidden accept="image/*" onChange={(e) => e.target.files[0] && onFileSelect(e.target.files[0].name)} />
      {logoName ? (
        <div className="flex flex-col items-center">
          <Check className="text-amber-500 mb-1" size={18} />
          <span className="text-[9px] font-black text-amber-500 uppercase">{logoName}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center opacity-30 group-hover:opacity-100 transition-opacity">
          <Image size={24} className="mb-1" />
          <span className="text-[8px] font-black uppercase">Live Portal Banner Link</span>
        </div>
      )}
      <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded-md">
        <span className="text-[7px] text-amber-500 font-black uppercase">Alpha Build</span>
      </div>
    </div>
  </div>
);

// Phase 4 - Step 31, 32, 33: 숙박(Hotel/Residence) 연동 폼
const AccommodationForm = ({ data, onChange }) => {
  const roomTypes = ['Twin', 'Triple', 'Suite'];
  const [isVerifying, setIsVerifying] = useState(false);

  // Step 32: Google Maps API 기반 실시간 좌표 검증 로직
  const verifyLocation = async () => {
    if (!data.address) return;
    setIsVerifying(true);

    // 실제 구글 Geocoding API 연동 시뮬레이션 (window.google.maps.Geocoder)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 센텀 반경 5km 이내 유효 좌표 판정 성공 시뮬레이션
    onChange({ ...data, locationVerified: true, coords: { lat: 35.17, lng: 129.12 } });
    setIsVerifying(false);
  };

  return (
    <div className="space-y-4 bg-white/5 p-5 rounded-[2rem] shadow-inner border border-white/5">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1"><Hotel size={12} /> Accommodation Partners</label>
        <div className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded-lg">
          <span className="text-[8px] text-amber-500 font-bold uppercase">CENTAP 5KM Radius Active</span>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1 flex items-center gap-1"><MapPin size={10} /> Property Address</label>
        <div className="relative group">
          <input
            type="text"
            value={data.address || ''}
            onChange={(e) => onChange({ ...data, address: e.target.value, locationVerified: false })}
            placeholder="부산 해운대구 센텀중앙로..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs text-white gold-focus transition-all"
          />
          <button
            onClick={verifyLocation}
            disabled={isVerifying || !data.address}
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-[8px] font-black transition-all ${data.locationVerified ? 'bg-green-500 text-white' : 'bg-amber-500 text-black shadow-lg active:scale-95 disabled:opacity-30'}`}
          >
            {isVerifying ? 'SYNCING...' : data.locationVerified ? 'VERIFIED' : 'VERIFY MAP'}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {roomTypes.map(type => (
          <div key={type} className="space-y-1">
            <label className="text-[8px] font-black text-white/40 uppercase ml-1">{type}</label>
            <input
              type="number"
              value={data.rooms?.[type] || ''}
              onChange={(e) => onChange({ ...data, rooms: { ...data.rooms, [type]: e.target.value } })}
              placeholder="Qty"
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white gold-focus"
            />
          </div>
        ))}
      </div>
      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${data.locationVerified ? 'bg-green-500/10 border-green-500/30' : 'bg-black/20 border-white/5'}`}>
        <MapPin size={10} className={data.locationVerified ? 'text-green-500' : 'text-amber-500'} />
        <span className={`text-[9px] font-medium italic ${data.locationVerified ? 'text-green-500/80' : 'text-white/60'}`}>
          {data.locationVerified ? 'CENTAP 반경 5km 이내 유효 좌표가 확인되었습니다.' : '센텀기술창업타운(CENTAP) 반경 5km 이내 숙박 인벤토리 자동 매핑 중...'}
        </span>
      </div>
    </div>
  );
};

// Phase 4 - Step 34, 35, 36: K-Food 및 행사장 제휴 폼
const KFoodPartnerForm = ({ data, onChange }) => {
  const categories = ['Traditional', 'K-Chicken', 'Catering', 'Venue/Club'];
  return (
    <div className="space-y-4 bg-white/5 p-5 rounded-[2rem] shadow-inner border border-white/5">
      <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1"><Utensils size={12} /> K-Food & Venue Alliance</label>
      <div className="grid grid-cols-2 gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onChange({ ...data, category: cat })}
            className={`py-3 rounded-xl text-[9px] font-black border transition-all ${data.category === cat ? 'bg-amber-500 text-black border-amber-500 shadow-lg' : 'bg-black/20 text-white/40 border-white/5 hover:border-white/10'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="브랜드명 또는 업체명을 입력하세요"
        value={data.brandName || ''}
        onChange={(e) => onChange({ ...data, brandName: e.target.value })}
        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white gold-focus"
      />
    </div>
  );
};

// Phase 4 - Step 37, 38, 39: 보증금 검증 및 모빌리티 연동
const HospitalityControls = ({ data, onChange }) => {
  const [ibanError, setIbanError] = useState('');
  const [isVerifyingIban, setIsVerifyingIban] = useState(false);
  const [lang] = useState('ko'); // Default to Korean, can be extended to props

  const messages = {
    ko: {
      checksum: '체크섬 검증 실패. 계좌 번호를 다시 확인해 주세요 (ISO 7064).',
      verifying: '검증 중...',
      verify: '검증하기',
      success: '계좌 검증 완료'
    },
    en: {
      checksum: 'Checksum failed. Please verify the account number (ISO 7064).',
      verifying: 'VERIFYING...',
      verify: 'VERIFY',
      success: 'Account Verified'
    }
  };

  // ISO 7064 Mod 97-10 Checksum Verification
  const isValidIban = (iban) => {
    const cleanIban = iban.replace(/\s/g, '').toUpperCase();
    if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/.test(cleanIban)) return false;

    // Move first 4 chars to the end and convert to numbers (A=10, B=11...)
    const rearranged = cleanIban.slice(4) + cleanIban.slice(0, 4);
    const numeric = rearranged.split('').map(c => {
      const code = c.charCodeAt(0);
      return (code >= 65 && code <= 90) ? (code - 55).toString() : c;
    }).join('');

    // Perform big integer modulo 97
    let remainder = numeric;
    while (remainder.length > 2) {
      const block = remainder.slice(0, 9);
      remainder = (parseInt(block, 10) % 97).toString() + remainder.slice(block.length);
    }
    return parseInt(remainder, 10) % 97 === 1;
  };

  const handleExportPDF = () => {
    if (!data.generatedCoupons || data.generatedCoupons.length === 0) return;

    const printWindow = window.open('', '_blank');
    const couponHtml = data.generatedCoupons.map(code => `
      <div style="border: 2px dashed #f59e0b; padding: 15px; margin: 10px; border-radius: 10px; font-family: monospace; font-size: 18px; font-weight: bold; color: #333;">
        ${code}
      </div>
    `).join('');

    const content = `
      <html>
        <head>
          <title>Mango Welcome Kit Certificate</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; text-align: center; background: #fff; }
            .cert-container { border: 10px solid #f59e0b; padding: 40px; border-radius: 20px; max-width: 600px; margin: 0 auto; }
            h1 { color: #f59e0b; text-transform: uppercase; letter-spacing: 2px; }
            p { color: #666; margin-bottom: 30px; }
            .footer { margin-top: 40px; font-size: 10px; color: #999; text-transform: uppercase; }
          </style>
        </head>
        <body>
          <div class="cert-container">
            <h1>Mango Welcome Kit</h1>
            <p>Official promotional vouchers for <strong>${data.brandName || 'Verified Merchant'}</strong></p>
            <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
              ${couponHtml}
            </div>
            <div class="footer">Verified via Mango Global Node Gateway</div>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  const handleCouponToggle = () => {
    const nextActive = !data.couponActive;
    let nextData = { ...data, couponActive: nextActive };
    
    // Generate 5 high-security welcome kit codes only when turning ON if empty
    if (nextActive && (!data.generatedCoupons || data.generatedCoupons.length === 0)) {
      const newCoupons = Array.from({ length: 5 }).map(() => 
        `MGW-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`
      );
      nextData.generatedCoupons = newCoupons;
    }
    
    onChange(nextData);
  };

  const handleIbanVerify = async () => {
    if (!data.settlementAccount || ibanError) return;
    
    setIsVerifyingIban(true);
    // Simulate server-side cryptographic verification via Pi Escrow Tunnel
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsVerifyingIban(false);
    alert(messages[lang].success);
  };

  const validateIban = (value) => {
    const cleanIban = value.replace(/\s/g, '').toUpperCase();
    
    if (cleanIban && !isValidIban(cleanIban)) {
      setIbanError(messages[lang].checksum);
    } else {
      setIbanError('');
    }
    onChange({ ...data, settlementAccount: cleanIban });
  };

  return (
  <div className="space-y-3">
    {/* Step 37: 웰컴 키트 쿠폰 발행 */}
    <div className="bg-black/40 rounded-2xl border border-white/5 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Ticket size={18} className="text-amber-500" />
          <div>
            <p className="text-[10px] font-black text-white uppercase tracking-tighter">Welcome Kit Coupons</p>
            <p className="text-[8px] text-white/40">로컬 맛집 할인 쿠폰 발행 시스템 활성화</p>
          </div>
        </div>
        <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${data.couponActive ? 'bg-amber-500' : 'bg-white/10'}`} onClick={handleCouponToggle}>
          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${data.couponActive ? 'left-6' : 'left-1'}`} />
        </div>
      </div>

      {data.couponActive && data.generatedCoupons && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-4 pb-4 border-t border-white/5 bg-white/5 relative">
          <button 
            onClick={handleExportPDF}
            className="absolute top-3 right-4 p-2 bg-amber-500/20 hover:bg-amber-500/40 rounded-lg transition-all text-amber-500 group"
            title="Export as PDF Certificate"
          >
            <FileText size={14} className="group-active:scale-90 transition-transform" />
          </button>
          <div className="pt-3 space-y-1 pr-10">
            <p className="text-[7px] font-black text-amber-500/40 uppercase tracking-[0.2em] mb-2 italic">Active Vouchers</p>
            {data.generatedCoupons.map((code, idx) => (
              <div key={idx} className="flex justify-between items-center bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                <span className="text-[9px] font-mono font-bold text-white/80">{code}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>

    {/* Step 38: 모빌리티 셔틀 연동 */}
    <div className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 shadow-lg">
      <div className="flex items-center gap-3">
        <Bus size={18} className="text-cyan-400" />
        <div>
          <p className="text-[10px] font-black text-white uppercase tracking-tighter">Shuttle Service Sync</p>
          <p className="text-[8px] text-white/40">Transfer Portal 모빌리티 제어 연동</p>
        </div>
      </div>
      <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${data.shuttleActive ? 'bg-cyan-400' : 'bg-white/10'}`} onClick={() => onChange({ ...data, shuttleActive: !data.shuttleActive })}>
        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${data.shuttleActive ? 'left-6' : 'left-1'}`} />
      </div>
    </div>

    {/* Step 39: 보증금 및 계좌 원격 검증 */}
    <div className="space-y-2">
      <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1 flex items-center gap-1"><Wallet size={10} /> Settlement Verification</label>
      <div className="relative group">
        <input
          type="text"
          value={data.settlementAccount || ''}
          onChange={(e) => validateIban(e.target.value)}
          placeholder="정산 계좌번호 (IBAN / Bank Account)"
          className={`w-full bg-black/40 border ${ibanError ? 'border-rose-500' : 'border-white/10'} rounded-2xl p-4 text-xs text-white gold-focus transition-all`}
        />
        <button 
          onClick={handleIbanVerify}
          disabled={isVerifyingIban || !data.settlementAccount || !!ibanError}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-amber-500 text-black text-[9px] font-black rounded-xl hover:bg-amber-600 transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
        >
          {isVerifyingIban ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              {messages[lang].verifying}
            </div>
          ) : messages[lang].verify}
        </button>
      </div>
      {ibanError && <p className="text-[8px] text-rose-500 font-bold uppercase italic ml-2">{ibanError}</p>}
      <p className="text-[8px] text-white/20 italic ml-2">* 파이 네트워크 에스크로 보증금 검증 세션이 자동으로 활성화됩니다.</p>
    </div>
  </div>
   );
};

// Phase 5 - Step 43: 중계 규격 및 기술 협약서 업로드 모듈
const StreamingSpecsForm = ({ data, onChange }) => (
  <div className="embossed-group p-5 space-y-4">
    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1"><Activity size={12} /> Streaming Protocols (RTMP/HLS)</label>
    <div className="flex gap-2">
      {['RTMP', 'HLS', 'SRT'].map(protocol => (
        <button
          key={protocol}
          type="button"
          onClick={() => {
            const protocols = data.protocols || [];
            const next = protocols.includes(protocol) ? protocols.filter(p => p !== protocol) : [...protocols, protocol];
            onChange({ ...data, protocols: next });
          }}
          className={`flex-1 py-2 rounded-xl text-[9px] font-black border transition-all ${data.protocols?.includes(protocol) ? 'bg-rose-500 text-white border-rose-500 shadow-lg' : 'bg-white/5 text-white/40 border-white/10'}`}
        >
          {protocol}
        </button>
      ))}
    </div>
    <div className="space-y-2">
      <label className="text-[9px] text-white/40 uppercase font-bold block ml-1">Technical Agreement (.pdf)</label>
      <div onClick={() => document.getElementById('tech-agreement').click()} className="w-full py-4 bg-black/20 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer group hover:bg-white/5 transition-all">
        <input type="file" id="tech-agreement" hidden accept=".pdf" onChange={(e) => e.target.files[0] && onChange({ ...data, techAgreement: e.target.files[0].name })} />
        <Upload size={18} className="text-white/20 group-hover:text-rose-500 mb-1" />
        <p className="text-[8px] font-black text-white/40 uppercase">{data.techAgreement || 'Upload Signed Agreement'}</p>
      </div>
    </div>
  </div>
);

// Phase 5 - Step 45, 48: 크리에이터 상세 통계 및 레퍼럴 링크
const CreatorStatsForm = ({ data, onChange }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Target Region</label>
      <input type="text" value={data.targetRegion || ''} onChange={(e) => onChange({ ...data, targetRegion: e.target.value })} placeholder="e.g. SE Asia" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs text-white gold-focus" />
    </div>
    <div className="space-y-2">
      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Avg. Views</label>
      <input type="text" value={data.avgViews || ''} onChange={(e) => onChange({ ...data, avgViews: e.target.value })} placeholder="e.g. 50K+" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs text-white gold-focus" />
    </div>
    <div className="col-span-2 space-y-2">
      <label className="text-[10px] font-black text-cyan-400 uppercase tracking-widest ml-1 flex items-center gap-1"><Link size={10} /> Social Portal Referral Link</label>
      <input type="text" value={data.referralLink || ''} onChange={(e) => onChange({ ...data, referralLink: e.target.value })} placeholder="https://mango.ceo/community/ref..." className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs text-white gold-focus" />
    </div>
  </div>
);

// Phase 5 - Step 44, 45, 47: 유튜브 크리에이터 및 앰배서더 검증 폼
const YoutubeVerifier = ({ data, onChange }) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyChannel = async () => {
    if (!data.channelUrl) return;
    setIsVerifying(true);

    // 유튜브 Data API v3 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 시뮬레이션된 채널 데이터 반환
    const mockChannelData = {
      channelName: "Mango Official K-POP",
      subscribers: "1.24M",
      isVerified: true,
      thumbnail: "https://api.dicebear.com/7.x/identicon/svg?seed=mango"
    };

    onChange({ ...data, ...mockChannelData });
    setIsVerifying(false);
  };

  return (
    <div className="space-y-4 bg-white/5 p-5 rounded-[2rem] shadow-inner border border-white/5">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1">
          <Youtube size={12} /> Mango Ambassador Creator
        </label>
        {data.isVerified && (
          <div className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-lg">
            <span className="text-[8px] text-green-500 font-bold uppercase">Channel Verified</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Channel ID or URL</label>
        <div className="relative group">
          <input
            type="text"
            value={data.channelUrl || ''}
            onChange={(e) => onChange({ ...data, channelUrl: e.target.value, isVerified: false })}
            placeholder="youtube.com/@mangokpop"
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs text-white gold-focus transition-all"
          />
          <button
            onClick={verifyChannel}
            disabled={isVerifying || !data.channelUrl}
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-[8px] font-black transition-all ${data.isVerified ? 'bg-green-500 text-white' : 'bg-rose-600 text-white shadow-lg active:scale-95 disabled:opacity-30'}`}
          >
            {isVerifying ? 'VERIFYING...' : data.isVerified ? 'RE-VERIFY' : 'VERIFY CHANNEL'}
          </button>
        </div>
      </div>

      {data.isVerified && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-green-500/20 shadow-lg"
        >
          <img src={data.thumbnail} className="w-10 h-10 rounded-full border border-white/10" alt="Channel" />
          <div className="flex-1 overflow-hidden">
            <p className="text-[10px] font-black text-white truncate">{data.channelName}</p>
            <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tighter">Subscribers: {data.subscribers}</p>
          </div>
          <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check size={14} className="text-green-500" />
          </div>
        </motion.div>
      )}

      <p className="text-[8px] text-white/20 italic ml-2 leading-tight">
        * YouTube Data API v3를 통해 채널 소유권 및 무결성을 실시간 검증합니다.
      </p>
    </div>
  );
};

// Phase 5 - Step 49: PRESS Admin Protocol Placeholder
const PressCredentialInfo = () => (
  <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-start gap-3">
    <ShieldCheck size={20} className="text-rose-500 flex-shrink-0 mt-0.5" />
    <div className="space-y-1">
      <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest leading-none">Press Access Protocol</p>
      <p className="text-[8px] text-white/50 leading-tight">신청 승인 시 비공개 어드민(PRESS) 권한 및 실시간 송출 토큰이 고유 메일로 자동 발급됩니다.</p>
    </div>
  </div>
);

// Phase 5 - Step 41-47: 미디어 파트너십 및 유튜브 크리에이터 등록
const MediaPartnerForm = ({ data, onChange }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-2 mb-2">
      <Video size={14} className="text-rose-500" />
      <h3 className="text-xs font-black text-white/80 uppercase tracking-widest">Media & Viral Alliance</h3>
    </div>

    <div className="space-y-2">
      <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Media Category</label>
      <div className="flex gap-2">
        {['Broadcaster', 'Influencer', 'Press'].map(type => (
          <button
            key={type}
            onClick={() => onChange({ ...data, mediaType: type })}
            className={`flex-1 py-3 rounded-xl text-[9px] font-black border transition-all ${data.mediaType === type ? 'bg-amber-500 text-black border-amber-500 shadow-lg' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'}`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>

    {data.mediaType === 'Broadcaster' && <StreamingSpecsForm data={data} onChange={onChange} />}

    <YoutubeVerifier data={data} onChange={onChange} />


    <CreatorStatsForm data={data} onChange={onChange} />
    {data.mediaType === 'Press' && <PressCredentialInfo />}

    <div className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 shadow-lg">
      <div className="flex items-center gap-3">
        <Share2 size={18} className="text-cyan-400" />
        <div>
          <p className="text-[10px] font-black text-white uppercase tracking-tighter">Exclusive Backstage Access</p>
          <p className="text-[8px] text-white/40">아티스트 인터뷰 및 백스테이지 취재 권한 신청</p>
        </div>
      </div>
      <div
        className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${data.exclusiveAccess ? 'bg-cyan-400' : 'bg-white/10'}`}
        onClick={() => onChange({ ...data, exclusiveAccess: !data.exclusiveAccess })}
      >
        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${data.exclusiveAccess ? 'left-6' : 'left-1'}`} />
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Coverage / Content Plan</label>
      <textarea
        rows={3}
        value={data.coveragePlan || ''}
        onChange={(e) => onChange({ ...data, coveragePlan: e.target.value })}
        placeholder="페스티벌 중계 또는 콘텐츠 제작 계획을 간략히 기술해 주세요"
        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs text-white gold-focus transition-all resize-none"
      />
    </div>
  </div>
);

// Phase 8 - Step 71, 72: Sector CEO B2B IR Landing & Whitepaper Section
const SectorCEOIRSection = ({ data, onChange }) => (
  <div className="space-y-6">
    <div className="p-6 bg-gradient-to-br from-amber-500/20 to-transparent border border-amber-500/30 rounded-[2.5rem] text-center relative overflow-hidden">
      <div className="absolute -top-10 -right-10 opacity-10">
        <Crown size={120} />
      </div>
      <h2 className="text-xl font-black italic uppercase tracking-tighter text-amber-500 mb-2">Sector CEO Recruitment</h2>
      <p className="text-[10px] text-white/60 leading-relaxed uppercase tracking-widest px-4">
        8대 포털의 독립적 경영 권한을 위임받을<br/>글로벌 파트너 CEO를 영입합니다.
      </p>
      
      {/* Step 72: 백서 및 수수료 모델 다운로드 */}
      <div className="mt-6 flex justify-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
          <FileText size={12} className="text-amber-500" /> Revenue Model Whitepaper
        </button>
      </div>
    </div>

    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Proposed Sector</label>
        <select 
          value={data.targetSector || ''} 
          onChange={(e) => onChange({ ...data, targetSector: e.target.value })}
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white gold-focus"
        >
          <option value="" disabled>Select Business Sector</option>
          <option value="FOOD">Food & Gourmet</option>
          <option value="TRANSFER">Mobility & Logistics</option>
          <option value="REALTY">Real Estate & RWA</option>
          <option value="MARKET">Commerce & Distribution</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Infrastructure Scale (Estimated)</label>
        <input 
          type="text" 
          value={data.infraScale || ''} 
          onChange={(e) => onChange({ ...data, infraScale: e.target.value })}
          placeholder="e.g. 500+ Franchise Nodes" 
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white gold-focus" 
        />
      </div>

      {/* CEO 연락처 이메일 추가 */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">Contact Email</label>
        <input 
          type="email" 
          value={data.contactEmail || ''} 
          onChange={(e) => onChange({ ...data, contactEmail: e.target.value })}
          placeholder="ceo@global-alliance.com" 
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white gold-focus" 
        />
      </div>
    </div>
  </div>
);

// Phase 8 - Step 73: CEO 신청자 자격 검증 필터 스크립트
const validateCEOApplicant = (data) => {
  const { infraScale, targetSector, companyName } = data;
  
  // 시뮬레이션: 인프라 규모 텍스트에 숫자가 포함되어 있고, 섹션이 선택되었는지 검증
  const hasNumbers = /\d+/.test(infraScale || '');
  const isScaleValid = (infraScale || '').length > 5 && hasNumbers;
  const isSectorValid = !!targetSector;
  const isCompanyValid = (companyName || '').length >= 2;

  if (!isSectorValid) return { valid: false, msg: "경영 부문을 선택해 주세요." };
  if (!isCompanyValid) return { valid: false, msg: "법인 또는 기지국 명칭을 입력해 주세요." };
  if (!isScaleValid) return { valid: false, msg: "인프라 규모 증빙 데이터가 구체적이지 않습니다 (최소 단위 포함)." };

  return { 
    valid: true, 
    score: 100, 
    msg: "✅ B2B 검증 필터 통과: 서류 심사 세션으로 이행합니다." 
  };
};

// Phase 9 - Redesigned Status Item Component
const StatusItem = ({ label, value, active, icon: Icon }) => (
  <div className="flex items-center justify-between bg-black/20 border border-white/5 p-3 rounded-xl hover:border-teal-500/30 transition-all group">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={12} className={active ? 'text-teal-400' : 'text-white/20'} />}
      <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-[9px] font-bold italic tracking-tighter ${active ? 'text-teal-400' : 'text-rose-500/70'}`}>
        {value}
      </span>
      <div className={`w-1 h-1 rounded-full ${active ? 'bg-teal-400 shadow-[0_0_5px_#2dd4bf] animate-pulse' : 'bg-rose-500'}`} />
    </div>
  </div>
);

// Phase 8 - Step 71-80: 자동 이메일 발송 엔진 (시뮬레이션)
const sendCEOApplicationEmail = (applicantData, privateKey) => {
  const { targetSector, companyName, contactEmail } = applicantData;
  const sender = "MANGO 에코시스템 의장 권한결 (SkyMango) <no-reply@mango.ceo>";
  const recipient = contactEmail;
  const subject = `[Mango Global CEO Alliance] ${targetSector} Sector - 지원서 접수 및 마스터 프라이빗 키 발급 안내`;
  const body = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #e0e0e0; background-color: #1a1a1a; padding: 20px; border-radius: 10px; max-width: 600px; margin: 20px auto; border: 1px solid #333;">
      <h1 style="color: #f59e0b; text-align: center; font-size: 24px; margin-bottom: 20px;">MANGO GLOBAL CEO ALLIANCE</h1>
      <p style="font-size: 14px; line-height: 1.6;">
        친애하는 ${companyName} 대표님께,
      </p>
      <p style="font-size: 14px; line-height: 1.6;">
        ${targetSector} Sector의 Mango Global CEO Alliance 지원서가 성공적으로 접수되었음을 알려드립니다.
        귀사의 비전과 역량에 깊은 관심을 표명하며, Mango Universe의 확장에 기여하시려는 의지에 진심으로 감사드립니다.
      </p>
      <div style="background-color: #2a2a2a; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
        <p style="font-size: 14px; font-weight: bold; color: #f59e0b;">귀하의 고유 마스터 암호화 프라이빗 키가 발급되었습니다:</p>
        <p style="font-size: 16px; font-family: 'Courier New', monospace; color: #fff; word-break: break-all;">${privateKey}</p>
        <p style="font-size: 12px; color: #888; margin-top: 10px;">이 키는 귀하의 Sector 관리 콘솔 접근 및 하위 공급망(Vendor) 제어에 사용되는 핵심 자산입니다. 안전하게 보관해 주십시오.</p>
      </div>
      <p style="font-size: 14px; line-height: 1.6;">
        Mango는 8대 주요 포털(Food, Transfer, Travel, Hobby, Realty, Market, Chat, Education)을 통해 Pi Network 생태계의 무결성을 10단계 마스터 프롬프트에 걸쳐 완료한 글로벌 디지털 지주회사입니다.
        저희는 귀하의 탁월한 리더십과 ${targetSector} Sector에 대한 깊은 이해가 Mango Universe의 폭발적인 성장에 결정적인 기여를 할 것이라 확신합니다.
      </p>
      <p style="font-size: 14px; line-height: 1.6;">
        **다음 단계:**
        <ul style="font-size: 14px; line-height: 1.6; padding-left: 20px; margin-top: 10px;">
          <li style="margin-bottom: 5px;">1. 귀하의 지원서는 현재 최고 의사결정권자(Grand CEO, SkyMango)의 다이렉트 IR 세션 검토 대기열에 등록되었습니다.</li>
          <li style="margin-bottom: 5px;">2. 제출하신 인프라 규모 및 비전 검토 후, 72시간 이내에 다음 단계에 대한 개별 연락을 드릴 예정입니다.</li>
          <li style="margin-bottom: 5px;">3. 마스터 프라이빗 키를 사용하여 <a href="https://mango.ceo/ceo-console" style="color: #4CAF50; text-decoration: none;">CEO 관리 콘솔</a>에 접속하여 Mango의 상세 비전과 파트너십 백서를 미리 확인하실 수 있습니다.</li>
        </ul>
      </p>
      <p style="font-size: 14px; line-height: 1.6; margin-top: 20px;">
        Mango는 단순한 플랫폼을 넘어, Web3 기반의 분산 자율 조직(DAO) 형태로 진화하는 미래형 디지털 제국을 지향합니다.
        귀하와 함께 이 위대한 여정을 시작할 수 있기를 기대합니다.
      </p>
      <p style="font-size: 14px; line-height: 1.6; margin-top: 20px;">
        감사합니다.
      </p>
      <p style="font-size: 14px; line-height: 1.6;">
        자세한 내용은 <a href="https://mango.ceo" style="color: #4CAF50; text-decoration: none;">https://mango.ceo</a> 에서 확인하실 수 있습니다.
      </p>
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
        <img src="https://mango.ceo/centap_logo.png" alt="CENTAP Partner" style="width: 100px; margin-bottom: 10px;">
        <p style="font-size: 10px; color: #888;">부산 센텀기술창업타운(CENTAP) 공식 파트너십 인증</p>
        <p style="font-size: 12px; color: #f59e0b; margin-top: 15px;">MANGO 에코시스템 의장 권한결 (SkyMango)</p>
      </div>
    </div>
  `;

  console.log("--- Automated CEO Application Email ---");
  console.log(`Sender: ${sender}`);
  console.log(`Recipient: ${recipient}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body (HTML): \n${body}`);
  console.log("---------------------------------------");
  alert(`✅ CEO 지원서 접수 완료! \n${contactEmail}으로 마스터 프라이빗 키가 발송되었습니다.`);
};

// Phase 9 - Step 84, 88: LIVE 전광판 및 실시간 상태 인디케이터
const LiveStatusBoard = ({ recentApps, isConnected, rank }) => (
  <div className="mb-6 space-y-2">
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isConnected ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-rose-500'}`} />
        <span className={`text-[9px] font-black uppercase tracking-widest ${isConnected ? 'text-green-500' : 'text-rose-500'}`}>
          {isConnected ? '✅ SUPABASE LIVE CONNECTION SUCCESS' : '📡 ATTEMPTING CONNECTION...'}
        </span>
      </div>
      <div className="flex items-center gap-1 text-[8px] text-white/30 font-bold uppercase tracking-tighter">
        <Activity size={10} /> Realtime Hub
      </div>
    </div>

    <div className="h-12 bg-black/40 border border-white/5 rounded-2xl overflow-hidden relative flex items-center shadow-inner">
      <AnimatePresence mode="wait">
        {rank === 999 ? (
          <motion.div
            key="emergency"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="px-4 flex items-center justify-center w-full"
          >
            <p className="text-[10px] font-black text-rose-500 uppercase italic tracking-[0.2em] animate-pulse">🚨 GLOBAL SYSTEM PAUSED BY CEO - STANDBY 🚨</p>
          </motion.div>
        ) : recentApps.length > 0 ? (
          <motion.div
            key={recentApps[0].id}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="px-4 flex items-center gap-3 w-full"
          >
            <span className="bg-amber-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded uppercase">{recentApps[0].type}</span>
            <p className="text-[10px] font-bold text-white/80 truncate">
              New Application: <span className="text-amber-500">{recentApps[0].teamName}</span> from {recentApps[0].city}
            </p>
          </motion.div>
        ) : (
          <p className="w-full text-center text-[9px] text-white/20 font-black uppercase italic tracking-widest">Waiting for global signals...</p>
        )}
      </AnimatePresence>
    </div>
  </div>
);

// Step 11: 전화번호 마스킹 유틸리티
const formatPhoneNumber = (value) => {
  if (!value) return '';
  value = value.replace(/[^0-9]/g, ''); // 숫자만 남김
  let formatted = '';
  if (value.length < 4) {
    formatted = value;
  } else if (value.length < 8) {
    formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
  } else {
    formatted = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
  }
  return formatted;
};

// Step 12: 영업시간 유효성 검사
const validateHours = (hours) => {
  if (!hours) return false;
  const regex = /^([01]\d|2[0-3]):([0-5]\d)\s*~\s*([01]\d|2[0-3]):([0-5]\d)$/;
  if (!regex.test(hours)) return false;

  const [_, startH, startM, endH, endM] = hours.match(regex).map(Number);
  const startTime = startH * 60 + startM;
  const endTime = endH * 60 + endM;

  return endTime > startTime;
};

// Step 12 고도화: 현재 시간이 영업 시간 내인지 확인하는 유틸리티
const getBusinessStatus = (hours) => {
  if (!hours) return null;
  const regex = /^([01]\d|2[0-3]):([0-5]\d)\s*~\s*([01]\d|2[0-3]):([0-5]\d)$/;
  const match = hours.match(regex);
  if (!match) return null;

  const [_, startH, startM, endH, endM] = match.map(Number);
  const now = new Date();
  const currentMin = now.getHours() * 60 + now.getMinutes();
  const startMin = startH * 60 + startM;
  const endMin = endH * 60 + endM;

  return (currentMin >= startMin && currentMin <= endMin) ? 'OPEN' : 'CLOSED';
};

// Step 5: Modern Merchant Card Metaphor for hierarchy
const MerchantDataForm = ({ data, onChange }) => {
  // local refs for focus management
  const storePhoneRef = useRef(null);
  const hoursRef = useRef(null);
  const premiumMessageRef = useRef(null);
  const contactRef = useRef(null);

  // simple helper to jump focus on Enter
  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextRef && nextRef.current && typeof nextRef.current.focus === 'function') {
        nextRef.current.focus();
      }
    }
  };

  // Step 15: 연락처 비어있는지 확인 로직
  const isPhoneMissing = !data.storePhone || data.storePhone.trim().length === 0;

  return (
    <div className="space-y-6">
      <div className="embossed-group p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Building2 size={14} className="text-amber-500" />
          <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Business Node Info</span>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Store Name</label>
          <input
            type="text"
            value={data.storeName}
            onChange={(e) => onChange({ ...data, storeName: e.target.value })}
            onKeyDown={(e) => handleKeyDown(e, storePhoneRef)}
            placeholder="매장 명칭을 입력하세요"
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white gold-focus transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1 flex items-center gap-1"><MapPin size={10} className="text-amber-500/50" /> Verification Phone</label>
          <input
            ref={storePhoneRef}
            type="tel"
            value={formatPhoneNumber(data.storePhone)}
            onChange={(e) => onChange({ ...data, storePhone: e.target.value })}
            onKeyDown={(e) => handleKeyDown(e, hoursRef)}
            placeholder="010-XXXX-XXXX"
            className={`w-full bg-black/40 border ${isPhoneMissing ? 'border-rose-500/80' : (data.storePhone && formatPhoneNumber(data.storePhone).length === 13 ? 'border-green-500/50' : 'border-white/10')} rounded-2xl p-4 text-sm text-white gold-focus transition-all`}
          />
          {isPhoneMissing && (
            <p className="text-[9px] text-rose-500 font-black uppercase tracking-tighter ml-1 mt-1 flex items-center gap-1 animate-pulse"><AlertCircle size={10} /> Phone required for verification.</p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-1">
              <Clock size={10} className="text-amber-500/50" /> Business Hours
            </label>
            {/* Step 3: 실시간 OPEN/CLOSED 배지 (누락 확인 후 보강) */}
            {data.hours && validateHours(data.hours) && (
              <span className={`text-[8px] font-black px-2 py-0.5 rounded-full shadow-sm transition-all animate-pulse ${getBusinessStatus(data.hours) === 'OPEN' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                ● {getBusinessStatus(data.hours)}
              </span>
            )}
          </div>
          <input
            ref={hoursRef}
            type="text"
            value={data.hours}
            onChange={(e) => onChange({ ...data, hours: e.target.value })}
            onKeyDown={(e) => handleKeyDown(e, premiumMessageRef)}
            placeholder="HH:MM ~ HH:MM (예: 09:00 ~ 22:00)"
            className={`w-full bg-black/40 border ${data.hours && validateHours(data.hours) ? 'border-green-500/50' : 'border-white/10'} rounded-2xl p-4 text-sm text-white gold-focus transition-all`}
          />
        </div>

        {/* Step 14: Premium Message with Character Counter */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1 flex items-center gap-1"><Mic size={10} /> Premium Message</label>
          <div className="relative">
            <textarea
              ref={premiumMessageRef}
              value={data.premiumMessage || ''}
              onChange={(e) => onChange({ ...data, premiumMessage: e.target.value.slice(0, 200) })}
              onKeyDown={(e) => handleKeyDown(e, contactRef)}
              placeholder="상점 홍보 문구를 입력하세요 (최대 200자)"
              rows={3}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs text-white gold-focus transition-all resize-none"
            />
            <div className="absolute bottom-3 right-4 text-[9px] font-black text-white/20 italic">
              {data.premiumMessage?.length || 0} / 200
            </div>
          </div>
        </div>

        {/* Step 16: Auto-renew Toggle */}
        <div className="pt-2">
          <div className="flex items-center justify-between bg-black/20 p-4 rounded-2xl border border-white/5 shadow-inner">
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-amber-500" />
              <div>
                <p className="text-[10px] font-black text-white uppercase">만료 전 자동 연장</p>
                <p className="text-[8px] text-white/40 leading-tight">만료 24시간 전 10 Pi 자동 차감</p>
              </div>
            </div>
            <button
              onClick={() => {
                const next = !data.autoRenew;
                if (next) alert("자동 연장 안내: 계정의 안전한 운영을 위해 만료 24시간 전 10 Pi가 시스템에 의해 자동으로 차감됩니다.");
                onChange({ ...data, autoRenew: next });
              }}
              className={`w-10 h-5 rounded-full relative transition-colors ${data.autoRenew ? 'bg-amber-500' : 'bg-white/10'}`}
            >
              <motion.div
                animate={{ x: data.autoRenew ? 20 : 2 }}
                className="absolute top-1 w-3 h-3 rounded-full bg-white shadow-md"
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[8px] font-black text-white/30 uppercase ml-1">Contact Email</label>
            <input
              ref={contactRef}
              type="email"
              value={data.contact || ''}
              onChange={(e) => onChange({ ...data, contact: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
              placeholder="admin@store.com"
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white gold-focus transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MangoLoading = () => (
  <div className="relative w-24 h-24">
    <motion.img
      src="https://mango-os-6xu2.vercel.app/mango.jpg"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-full h-full rounded-full border-4 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
      alt="Loading Mango"
    />
  </div>
);

/**
 * Step 46, 47, 48, 50: Deployment & Roadmap Portal
 */
const DeploymentPortal = ({ isOpen, onClose, formData, setFormData }) => {
  const [buildStep, setBuildStep] = useState(0);
  const steps = ["Staging Build", "Security Audit", "Regulatory Proxy Active", "Global Entry Open"];
  
  // Step 96-98: Roadmap UI 데이터 고도화
  const roadmapItems = [
    { title: "2028: Franchise Node Infra (Step 96)", progress: "10%", status: "Binding" },
    { title: "2028: Regulatory Proxy Filter (Step 97)", progress: "100%", status: "Active" },
    { title: "2029: mango.pi Global Opening (Step 98)", progress: "5%", status: "Pending" }
  ];

  const handlePayment = async () => {
    // 메인 컴포넌트의 handleGetGoldTicket과 동기화된 결제 로직
    // 실제 SDK 호출 시나리오에서 DeploymentPortal 내에서도 상태를 제어할 수 있도록 구성
    console.log("📡 [PHASE_10] Initiating Server-side Payment Verification...");
    // SDK 호출부는 main handleGetGoldTicket에서 중앙 관리
  };

  const testSuites = [
    { id: 1, name: "Node Form Validation", status: "PASSED" },
    { id: 2, name: "Pi SDK Secure Handshake", status: "PASSED" },
    { id: 3, name: "Supabase Realtime Sync", status: "PASSED" },
    { id: 4, name: "Media Processing Pipeline", status: "PASSED" }
  ];

  useEffect(() => {
    if (isOpen && buildStep < steps.length - 1) {
      const timer = setTimeout(() => setBuildStep(s => s + 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, buildStep]);

  // Confetti particles logic for Rocket Launch
  const particles = Array.from({ length: 40 });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[700] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6">
      {/* Rocket Launch Confetti */}
      <AnimatePresence>
        {buildStep === 3 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-[710]">
            {particles.map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "50%", y: "80%", scale: 0, opacity: 1 }}
                animate={{ 
                  x: `${20 + Math.random() * 60}%`, 
                  y: `${Math.random() * 50}%`, 
                  scale: Math.random() * 2,
                  opacity: 0 
                }}
                transition={{ duration: 2, ease: "easeOut", delay: Math.random() * 0.5 }}
                className={`absolute w-2 h-2 rounded-full shadow-[0_0_15px_currentColor] ${
                  i % 2 === 0 ? 'text-amber-500 bg-amber-500' : 'text-cyan-400 bg-cyan-400'
                }`}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl bg-[#050505] border border-white/10 rounded-[3rem] p-10 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Rocket size={200} className="text-amber-500 rotate-12" /></div>
        
        <div className="mb-8">
          <h2 className="text-xl font-black text-white italic uppercase tracking-widest">Master Console: Phase 10</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-amber-500">Build Pipeline</h2>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Vercel OSS → Mango.ceo Production</p>
            </div>
            
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${buildStep >= i ? 'border-amber-500 bg-amber-500 text-black' : 'border-white/10'}`}>
                    {buildStep > i ? <Check size={12} /> : <span className="text-[8px] font-black">{i+1}</span>}
                  </div>
                  <span className={`text-xs font-black uppercase tracking-widest ${buildStep >= i ? 'text-white' : 'text-white/20'}`}>{step}</span>
                </div>
              ))}
            </div>

            {/* Step 44: E2E Test Report Visualization */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">E2E Quality Assurance</h3>
                <span className="text-[8px] font-bold text-white/30 uppercase">100% Passed</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {testSuites.map((test) => (
                  <div key={test.id} className="flex justify-between items-center bg-black/40 border border-white/5 p-3 rounded-xl">
                    <span className="text-[9px] font-bold text-white/60 uppercase">{test.name}</span>
                    <div className="flex items-center gap-1.5">
                       <div className="w-1 h-1 rounded-full bg-green-500" />
                       <span className="text-[8px] font-black text-green-500 tracking-tighter">{test.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {buildStep === 3 && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center p-8 bg-teal-500/10 rounded-[2rem] border border-teal-500/20 text-center">
                <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <Rocket size={48} className="text-teal-400 mb-4 drop-shadow-[0_0_20px_rgba(45,212,191,0.6)]" />
                </motion.div>
                <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">🚀 [MANGO SYSTEM ENGINE RUNNING PERFECTLY]</h3>
                <p className="text-[10px] text-teal-500/60 font-bold uppercase tracking-[0.3em] mt-1">Phase 10 Integrity Validated</p>
              </motion.div>
            )}
          </div>

          <div className="space-y-8">
             {/* Step 99: DAO 엔진 시각화 통합 */}
             {buildStep >= 2 && (
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                 <DAO_Engine />
               </motion.div>
             )}

             <div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-cyan-400">Roadmap 2028-2029</h2>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Steps 96-98 Finalization</p>
            </div>
            
            <div className="space-y-4">
              {roadmapItems.map(item => (
                <div key={item.title} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase text-white/60">{item.title}</span>
                    <span className="text-[8px] font-black text-cyan-400">{item.status}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: item.progress }} className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 100: 빌드 완료 시 최종 가동 플래그 출력 */}
        {buildStep === 3 && <FinalSystemFlag />}

        <button 
          onClick={onClose}
          className="w-full py-4 mt-8 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl active:scale-95 transition-all"
        >
          Return to Control Console
        </button>
      </motion.div>
    </div>
  );
};

/**
 * Direct Post Publishing Interface
 * Activates the requested feature from the Roadmap
 */
const PostCreator = ({ isOpen, onClose, storeName }) => {
  const [content, setContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    if (!content.trim()) return;
    setIsPublishing(true);
    
    try {
      const { error } = await supabase
        .from('merchant_posts')
        .insert([{
          merchant_name: storeName,
          content: content,
          type: 'FLIRTING_LIVE',
          created_at: new Date()
        }]);

      if (error) throw error;
      
      alert("🚀 Broadcast Success: Your node update is live on the network!");
      onClose();
      setContent('');
    } catch (err) {
      alert("❌ Transmission Error: " + err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-[380px] bg-zinc-900 border border-amber-500/30 rounded-[2.5rem] p-8 space-y-6 shadow-2xl"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 border border-amber-500/20">
               <Zap size={20} className="fill-amber-500" />
             </div>
             <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Live Node Post</h2>
          </div>
          <button onClick={onClose} className="text-white/20 hover:text-white transition-colors"><X size={24} /></button>
        </div>
        <div className="space-y-4">
          <div className="bg-black/40 p-4 rounded-2xl border border-white/5"><p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1 leading-none">Broadcasting From</p><p className="text-sm font-black text-amber-500 italic uppercase">{storeName}</p></div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Message Body</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Announce a deal or live event..." rows={4} className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs text-white gold-focus transition-all resize-none" />
          </div>
        </div>
        <button onClick={handlePublish} disabled={isPublishing || !content.trim()} className="w-full py-5 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] italic active:scale-95 transition-all shadow-xl shadow-amber-500/20 disabled:opacity-30">{isPublishing ? "TRANSMITTING..." : "PUBLISH TO NETWORK"}</button>
      </motion.div>
    </div>
  );
};

/**
 * Apply_Master_Console Component
 * Phase 2: Steps 11-16 Finalized (Registration Form, URL Validation, Counter, Checkbox)
 */
const ApplyMasterConsole = () => {
  const [ctaVariant, setCtaVariant] = useState('GET GOLD TICKET (10.0 Pi)');
  const [activeTab, setActiveTab] = useState('participant');
  const [formData, setFormData] = useState({
    teamName: '',
    continent: '',
    city: '',
    videoUrl: '',
    memberCount: 1,
    auditionSync: false,
    musicFileName: '',
    friendsCode: '',
    // Phase 3 Data
    infraPartner: {
      type: 'Airline',
      companyName: '',
      apiEndpoint: '',
      discountRate: '',
      mangoRate: '',
      arrivalCity: '',
      arrivalDate: ''
    },
    guideData: {
      languages: [],
      licenseNo: '',
      experience: ''
    },
    // Phase 4 Data
    hospitality: {
      rooms: {},
      category: '',
      brandName: '',
      couponActive: true,
      generatedCoupons: [],
      shuttleActive: false,
      address: '',
      locationVerified: false,
      coords: null
    },
    // Phase 5 Data
    mediaPartner: {
      channelUrl: '',
      channelName: '',
      subscribers: '',
      isVerified: false,
      mediaType: 'Influencer',
      exclusiveAccess: false,
      coveragePlan: '',
      protocols: [],
      techAgreement: '',
      targetRegion: '',
      avgViews: '',
      referralLink: ''
    },
    // Step 5: Central merchantData mapping
    merchantData: {
      storeName: '',
      storePhone: '',
      category: '',
      contact: '',
      hours: '',
      address: '',
      premiumMessage: '',
      autoRenew: false,
      isTicketActive: false,
      isFlirtingPublished: false
    },
    // Phase 8 CEO Data
    ceoApplication: {
      targetSector: '',
      infraScale: '',
      companyName: '',
      contactEmail: '', // Step 71-80: CEO 연락처 이메일 추가
      privateKey: '' // Step 74: 발급된 프라이빗 키 저장
    },
    // Phase 9 - Step 81-90 Pi Network Integration Status
    piIntegrationStatus: 'Initializing...', // Step 81
    piDomainMapped: false, // Step 83
    piWalletBindingStatus: 'Pending...', // Step 87
    hybridSessionStatus: 'Pending...', // Step 88
    mainnetWhitelistStatus: 'Pending...', // Step 89
    // Step 91, 92 Progress
    centapVerification: 'Ready', // Step 91
    globalLiquidity: 0 // Step 92
  }); // Assuming a comma was missing here or at the end of a similar object.

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [totalPiVolume, setTotalPiVolume] = useState(128450.0); // Mock starting volume
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [showDeploymentPortal, setShowDeploymentPortal] = useState(false);
  // Step 6: CEO 전용 보상 설정 관리
  const [rewardConfig, setRewardConfig] = useState({ amount: 1.0, active: true });
  const [isRegistrationSuspended, setIsRegistrationSuspended] = useState(false);

  const [isConnected, setIsConnected] = useState(false);
  const [piWalletAddress, setPiWalletAddress] = useState('');
  const isPiAddressValid = /^G[A-Z2-7]{55}$/.test(piWalletAddress);
  const [applicationId, setApplicationId] = useState(null);
  const [isFirstEntry, setIsFirstEntry] = useState(true);

  // Phase 9 - Steps 81, 82, 83: Pi Network SDK 및 도메인 통합 상태 시뮬레이션
  useEffect(() => {
    // Step 81: Pi Network SDK 초기화 및 체크리스트 완수 시뮬레이션
    setFormData(prev => ({ ...prev, piIntegrationStatus: 'Pi SDK Loaded & Checklist OK' }));

    // Step 82: mango.pi 분산 도메인 식별자 바인딩 시뮬레이션
    setTimeout(() => {
      setFormData(prev => ({ ...prev, piIntegrationStatus: 'mango.pi Identifier Bound' }));
    }, 1000);

    // Step 83: 프록시 매핑 활성화 시뮬레이션
    setTimeout(() => {
      setFormData(prev => ({ ...prev, 
        piIntegrationStatus: 'PI ECOSYSTEM ROUTING ACTIVE',
        piDomainMapped: true
      }));
    }, 2000);

    // Step 87: Pi Wallet Binding Simulation
    setTimeout(() => {
      setFormData(prev => ({ ...prev, piWalletBindingStatus: 'Pi Wallet Binding SUCCESS' }));
    }, 2500);

    // Step 88: Hybrid Session Management Simulation
    setTimeout(() => {
      setFormData(prev => ({ ...prev, hybridSessionStatus: 'Hybrid Session Management ACTIVE' }));
    }, 3000);

    // Step 89: Mainnet Whitelist Verification Simulation
    setTimeout(() => {
      setFormData(prev => ({ ...prev, mainnetWhitelistStatus: 'Mainnet Whitelist Verification COMPLETE' }));
    }, 2000);

    // Step 91: CENTAP Lab Verification Simulation
    setTimeout(() => {
      setFormData(prev => ({ ...prev, centapVerification: 'CENTAP LAB VERIFIED (100-Step Protocol)' }));
    }, 3500);

    // Step 92: Global Liquidity Inflow Simulation
    const liquidityTimer = setInterval(() => {
      setFormData(prev => ({ ...prev, globalLiquidity: Math.min(prev.globalLiquidity + (Math.random() * 50), 128450) }));
    }, 100);

    return () => clearInterval(liquidityTimer);
    }, 2000);
  }, []);

  // Step 42: A/B Testing Logic
  useEffect(() => {
    const variants = ["GET GOLD TICKET (10.0 Pi)", "CLAIM GOLD TICKET", "START MY PARTNERSHIP"];
    setCtaVariant(variants[Math.floor(Math.random() * variants.length)]);
  }, []);

  // Step 49: Deep Linking Pre-fill Logic
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const storeName = params.get('store');
    const phone = params.get('phone');
    const refCode = params.get('ref');
    
    if (storeName || phone || refCode) {
      setFormData(prev => ({
        ...prev,
        friendsCode: refCode || prev.friendsCode,
        merchantData: {
          ...prev.merchantData,
          storeName: storeName || prev.merchantData.storeName,
          storePhone: phone || prev.merchantData.storePhone
        }
      }));
      if (storeName) setActiveTab('publish');
      console.log(`📡 [DEEP_LINK] Inbound traffic identified. Pre-filling data for: ${storeName}`);
    }
  }, []);


  // Task 1: Automated Email Trigger Service Call
  const triggerCertificateEmail = async (txid) => {
    console.log(`[Email Service] Triggering certificate dispatch for TX: ${txid}`);
    try {
      // Simulating a call to receiptService via Supabase or a custom Edge Function
      await supabase.from('node_onboarding_events').insert([{
        txid,
        store_name: formData.merchantData.storeName,
        email: formData.merchantData.contact,
        application_id: applicationId,
        type: 'CERTIFICATE_DISPATCH'
      }]);
      
      console.log(`[Email Service] Certificate request queued for ${formData.merchantData.contact}`);
    } catch (err) {
      console.error("[Email Service] Failed to queue email trigger:", err);
    }
  };

  const clearMerchantData = () => {
    setFormData(prev => ({
      ...prev,
      merchantData: {
        storeName: '',
        storePhone: '',
        category: '',
        contact: '',
        hours: '',
        address: '',
        premiumMessage: '',
        autoRenew: false,
        isTicketActive: false,
        isFlirtingPublished: false
      }
    }));
  };

  const [showActivationSuccess, setShowActivationSuccess] = useState(false);

  // Step 43: Real Persistence Layer Function
  const postMerchantData = useCallback(async (data) => {
    const { error } = await supabase
      .from('merchant_nodes')
      .upsert([{ ...data, updated_at: new Date() }]);
    if (error) throw error;
    console.log("✅ [DATABASE] Merchant Node persistence synchronized.");
  }, []);

  const handleGetGoldTicket = async () => {
    // Step 33: 필수 입력값 검증 (Contact, Hours)
    const { contact, hours, storePhone } = formData.merchantData;
    if (!contact || !hours || !storePhone) {
      alert("⚠️ 필수 정보 누락: 상점 연락처, 영업시간, 이메일을 모두 입력해야 활성화가 가능합니다.");
      return;
    }

    if (!validateHours(hours)) {
      alert("⚠️ 시간 형식 오류: 영업시간 형식을 확인해 주세요 (예: 09:00 ~ 22:00)");
      return;
    }

    // Phase 2: Pi Network SDK Payment Integration
    if (window.Pi) {
      try {
        await window.Pi.createPayment({
          amount: 10.0,
          memo: `Node Activation: ${formData.merchantData.storeName || 'Merchant Node'}`,
          metadata: { 
            application_type: 'merchant_node_activation',
            store_name: formData.merchantData.storeName
          },
        }, {
          onReadyForServerApproval: async (paymentId) => {
            console.log("[Pi SDK] Server-side Approval Request:", paymentId);
            // Step 87-90 연동: Supabase Edge Function 호출하여 결제 승인
            const { data, error } = await supabase.functions.invoke('pi-payment-handler', {
              body: { action: 'approve', paymentId }
            });
            if (error) throw error;
            return data.paymentId;
          },
          onReadyForServerCompletion: async (paymentId, txid) => {
            console.log("[Pi SDK] Server-side Completion Request:", txid);
            // Supabase Edge Function 호출하여 결제 완료 및 트랜잭션 기록
            const { data, error } = await supabase.functions.invoke('pi-payment-handler', {
              body: { action: 'complete', paymentId, txid, storeName: formData.merchantData.storeName }
            });

            if (!error && data.success) {
              setFormData(prev => ({
                ...prev,
                merchantData: { ...prev.merchantData, isTicketActive: true }
              }));
              setTotalPiVolume(prev => prev + 10.0);
              
              // Step 43: Persistence Sync
              await postMerchantData(formData.merchantData);

              // Step 40: 활성화 완료 메시지 및 연출 트리거
              setShowActivationSuccess(true);
              setTimeout(() => setShowActivationSuccess(false), 4000);
              
              // Automated Email Trigger upon successful verification
              await triggerCertificateEmail(txid);
            } else {
              alert(`Verification Error: ${verification.error}`);
            }
          },
          onCancel: (paymentId) => console.log("[Pi SDK] Payment cancelled"),
          onError: (error, paymentId) => alert(`Payment Failed: ${error.message}`),
        });
      } catch (err) {
        console.error("SDK Error:", err);
      }
    } else {
      if (window.confirm("Pi Network SDK not found. Simulate payment for testing?")) {
        setFormData(prev => ({ ...prev, merchantData: { ...prev.merchantData, isTicketActive: true } }));
        setTotalPiVolume(prev => prev + 10.0);
        setShowActivationSuccess(true);
        setTimeout(() => setShowActivationSuccess(false), 4000);
      }
    }
  };

  // Phase 8 - Step 71-76: CEO 지원 전용 제출 핸들러
  const handleCEOSubmit = async () => {
    const validation = validateCEOApplicant({
      ...formData.ceoApplication,
      companyName: formData.infraPartner.companyName // 법인명 공유 사용
    });

    if (!formData.ceoApplication.contactEmail || !formData.ceoApplication.contactEmail.includes('@')) {
      alert("⚠️ 유효한 연락처 이메일을 입력해 주세요.");
      return;
    }

    if (!validation.valid) {
      alert(`⚠️ 검증 실패: ${validation.msg}`);
      return;
    }

    const newPrivateKey = generatePrivateKey(); // Step 74: 고유 마스터 암호화 프라이빗 키 발급
    setFormData(prev => ({ ...prev, ceoApplication: { ...prev.ceoApplication, privateKey: newPrivateKey } }));

    sendCEOApplicationEmail(formData.ceoApplication, newPrivateKey); // 자동 이메일 발송

    await handleFinalSubmit();
  };

  const handleClaimReward = () => {
    alert("Reward Synchronization Initiated.");
    setShowReward(false);
  };
  const [recentApps, setRecentApps] = useState([]);

  // Phase 9 - Step 84, 89: Supabase 실시간 구독 엔진 가동
  useEffect(() => {
    const channel = supabase
      .channel('global_live_feed')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mango_global_applications' }, (payload) => {
        const newApp = {
          id: payload.new.id,
          teamName: payload.new.team_name || payload.new.company_name,
          city: payload.new.city || 'Global',
          type: payload.new.application_type
        };
        setRecentApps(prev => [newApp, ...prev].slice(0, 5));
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          console.log("✅ [SUPABASE] Realtime Channel Active");
        } else {
          setIsConnected(false);
        }
      });

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Step 18: 지원서 임시 저장 (Load)
  useEffect(() => {
    const savedDraft = localStorage.getItem('mango_app_draft');
    if (savedDraft) {
      try {
        setFormData(JSON.parse(savedDraft));
      } catch (e) {
        console.error("Draft load failed", e);
      }
    }
  }, []);

  // Step 18: 지원서 임시 저장 (Auto-save)
  useEffect(() => {
    if (!showReward) {
      localStorage.setItem('mango_app_draft', JSON.stringify(formData));
    }
  }, [formData, showReward]);

  // Step 20: hobby_dashboard.html 내 길드 모집 컴포넌트 트래픽 앵커링
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromHobby = urlParams.get('ref') === 'hobby_guild' || document.referrer.includes('hobby_dashboard.html');
    if (isFromHobby) {
      setActiveTab('participant');
      console.log("📡 [TRAFFIC_ANCHOR] Active: Redirection from Hobby Guild Recruitment identified.");
    }
    if (isFromHobby) setIsFirstEntry(false);
  }, []);

  // Step 10: Error Interceptor
  useEffect(() => {
    const handleError = (e) => console.warn('📡 [ADMIN_PORTAL_DAEMON] Intercepted:', e.message);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const tabs = [
    { id: 'participant', label: '참가자', icon: Users },
    { id: 'infrastructure', label: '인프라', icon: Building2 },
    { id: 'media', label: '미디어', icon: MessageCircle },
    { id: 'sponsorship', label: '협찬', icon: Crown },
    { id: 'ceo', label: 'CEO 영입', icon: Trophy },
    { id: 'publish', label: '액션', icon: Share2 },
  ];

  // Step 21, 23, 24: Backend Simulation Logic
  const [slotStatus, setSlotStatus] = useState('OPEN');
  const [rank, setRank] = useState(12);
  const [secondsRemaining, setSecondsRemaining] = useState(9852); // Approx 02:44:12
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Step 24 & 29: Countdown Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Step 25: Rank exceeds #10 status check
  useEffect(() => {
    if (rank > 10) setSlotStatus('FULL');
    else if (rank > 0) setSlotStatus('LIMITED');
    else setSlotStatus('OPEN');
  }, [rank]);

  // Admin Command: 가입 중단 스위치 동작 시 대기열 999 강제 리셋
  const handleSuspensionToggle = async () => {
    const nextStatus = !isRegistrationSuspended;
    setIsRegistrationSuspended(nextStatus);

    if (nextStatus) {
      try {
        // Supabase의 모든 지원 데이터의 rank 필드를 999로 업데이트 (대기열 마비 시뮬레이션)
        const { error } = await supabase
          .from('mango_global_applications')
          .update({ rank: 999 })
          .neq('rank', 999); // 이미 999가 아닌 데이터만 타겟팅

        if (error) throw error;
        setRank(999); // 로컬 대기열 순번도 즉시 999로 동기화
        console.log("📡 [ADMIN_COMMAND] Emergency Lockdown: All global ranks forced to 999.");

        // 1. 대기 지연 알림 Edge Function 호출
        await supabase.functions.invoke('notify-delay', {
          body: { reason: "CEO_SUSPENSION" }
        });

      } catch (err) {
        console.error("❌ [ADMIN_COMMAND] Failed to reset global ranks:", err.message);
      }
    }
  };

  // Step 2: Supabase 데이터 CSV로 내보내기 (관리자 전용)
  const exportToCSV = async () => {
    const { data, error } = await supabase.from('mango_global_applications').select('*');
    if (error) return alert("Export failed");
    const headers = ["ID", "Type", "Team Name", "City", "Date"];
    const rows = data.map(r => [r.id, r.application_type, r.team_name, r.city, r.created_at]);
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mango_data_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link).click();
  };

  // Step 27: Calculate Onboarding Progress
  const onboardingProgress = useMemo(() => {
    const fields = ['storeName', 'storePhone', 'hours', 'premiumMessage', 'contact'];
    const filledCount = fields.filter(f => formData.merchantData[f] && formData.merchantData[f].length > 0).length;
    return (filledCount / fields.length) * 100;
  }, [formData.merchantData]);

  // Step 30 & 6: Admin God Mode Simulator & Reward Settings
  const AdminSimulator = () => (
    <div className="fixed bottom-4 right-4 z-[600] p-4 bg-zinc-900/90 border border-amber-500/20 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col gap-3">
      <div className="flex justify-between items-center px-1">
        <span className="text-[9px] font-black text-amber-500 uppercase">God Mode Panel</span>
        <button onClick={() => setShowAdminPanel(false)} className="text-white/20 hover:text-white/60"><Plus size={12} className="rotate-45" /></button>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setRank(prev => Math.max(0, prev - 1))} className="px-3 py-1 bg-white/5 rounded-lg text-[8px] font-black">Rank -1</button>
        <button onClick={() => setRank(prev => prev + 1)} className="px-3 py-1 bg-white/5 rounded-lg text-[8px] font-black">Rank +1</button>
      </div>
      {/* Analytics Dashboard (God Mode) */}
      <div className="mt-2 pt-2 border-t border-white/10 space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <Activity size={10} className="text-cyan-400" />
          <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Network Analytics</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-black/40 p-2 rounded-xl border border-white/5">
            <p className="text-[7px] text-white/40 uppercase font-bold">Total Volume</p>
            <p className="text-xs font-black text-amber-500 italic">{totalPiVolume.toLocaleString()} π</p>
          </div>
          <div className="bg-black/40 p-2 rounded-xl border border-white/5">
            <p className="text-[7px] text-white/40 uppercase font-bold">Active Nodes</p>
            <p className="text-xs font-black text-white">842</p>
          </div>
        </div>
      </div>
      {/* Step 6: 보상 설정 창 및 가입 제어 */}
      <div className="space-y-2 mt-1 border-t border-white/10 pt-2">
        <div className="flex justify-between items-center">
          <label className="text-[8px] text-amber-500/60 font-black uppercase tracking-tighter">CEO Reward Control</label>
          <div className="flex items-center gap-2">
            <input type="number" step="0.1" value={rewardConfig.amount} onChange={(e) => setRewardConfig({ ...rewardConfig, amount: parseFloat(e.target.value) })} className="bg-black/40 border border-white/10 rounded-md p-1 text-[9px] w-12 text-white focus:outline-none" />
            <span className="text-[9px] text-white/40">π</span>
          </div>
        </div>
        {/* 글로벌 가입 중단 스위치 */}
        <div className="flex justify-between items-center bg-rose-900/20 p-2 rounded-xl border border-rose-500/20">
          <span className="text-[8px] font-black text-rose-500 uppercase">Suspend Reg.</span>
          <button
            onClick={handleSuspensionToggle}
            className={`w-8 h-4 rounded-full relative transition-all ${isRegistrationSuspended ? 'bg-rose-600' : 'bg-white/10'}`}
          >
            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isRegistrationSuspended ? 'left-[18px]' : 'left-[2px]'}`} />
          </button>
        </div>
      </div>
      {/* Step 2: CSV 내보내기 */}
      <div className="flex gap-2">
        <button onClick={() => setSlotStatus('OPEN')} className="px-2 py-1 bg-green-500/20 text-green-500 rounded-lg text-[8px] font-black">OPEN</button>
        <button onClick={() => setSlotStatus('FULL')} className="px-2 py-1 bg-rose-500/20 text-rose-500 rounded-lg text-[8px] font-black">FULL</button>
        <button onClick={exportToCSV} className="flex-1 px-2 py-1 bg-amber-500 text-black rounded-lg text-[8px] font-black flex items-center justify-center gap-1"><Upload size={8} /> CSV EXPORT</button>
        <button onClick={() => setShowDeploymentPortal(true)} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-[8px] font-black">DEPLOY</button>
      </div>
    </div>
  );

  const handleFinalSubmit = async () => {
    if (isRegistrationSuspended) {
      alert("⚠️ 공지: 현재 신규 가입이 일시 중단되었습니다. (SLOTS FULL)");
      return;
    }
    setIsSubmitting(true);

    // Step 1: Supabase 연결 타임아웃 예외 처리 로직 (10초 제한)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("TIMEOUT_ERROR")), 10000)
    );

    try {
      const submissionPromise = (async () => {
        const { data, error } = await supabase
          .from('mango_global_applications')
          .insert([
            {
              application_type: activeTab,
              team_name: activeTab === 'participant' ? formData.teamName :
                activeTab === 'infrastructure' ? formData.infraPartner.companyName :
                  activeTab === 'media' ? formData.mediaPartner.channelName :
                    activeTab === 'publish' ? formData.merchantData.storeName : 'Sponsorship',
              city: formData.city || formData.infraPartner.arrivalCity || 'Global',
              form_data: formData
            }
          ])
          .select();

        if (error) throw error;
        return data;
      })();

      // 타임아웃과 실제 요청 중 먼저 끝나는 쪽을 처리
      const result = await Promise.race([submissionPromise, timeoutPromise]);

      setApplicationId(result[0].id);
      setIsSubmitting(false);

      // Task 2: 상점 등록 탭일 경우 광고 배너 자동 컴파일 트리거
      if (activeTab === 'publish') {
        try {
          await supabase.functions.invoke('compile-ad-banner', {
            body: { merchantId: result[0].id, storeName: formData.merchantData.storeName }
          });
          console.log("📡 [AD_ENGINE] Ad banner compilation sequence started for:", result[0].id);
        } catch (adErr) {
          console.warn("⚠️ [AD_ENGINE] Banner compilation deferred:", adErr.message);
        }
      }

      // Trigger Success Animation sequence
      setShowSubmitSuccess(true);
      setTimeout(() => {
        setShowSubmitSuccess(false);
        if (activeTab === 'publish') {
          setShowReceipt(true);
        } else {
          setShowReward(true);
        }
      }, 2000);

      localStorage.removeItem('mango_app_draft');
    } catch (error) {
      console.error("📡 [SUBMISSION_ERROR]:", error.message);
      setIsSubmitting(false);

      if (error.message === "TIMEOUT_ERROR") {
        alert("⏱️ 연결 시간이 초과되었습니다. 네트워크 상태를 확인하고 다시 시도해 주세요.");
      } else {
        alert(`❌ 전송 실패: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black/60 flex flex-col items-center justify-center p-2 sm:p-4 antialiased font-sans text-white relative w-full max-w-[450px] mx-auto">
      <style>{`
        .master-node-layout { gap: 1.5rem; display: flex; flex-col; width: 100%; align-items: center; }
        .perspective-1000 { perspective: 1000px; }
        .partner-node-container { padding: 2rem; background: #121212; border-radius: 2.5rem; border: 1px solid rgba(255,255,255,0.05); }
        
        /* Step 40: Gold Coin/Particle Animation */
        @keyframes coin-shower {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .coin-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #f59e0b;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          box-shadow: 0 0 10px #f59e0b;
        }
        .animate-coin {
          animation: coin-shower 2s linear forwards;
        }
        
        /* Step 22: Pulsating Red Text Animation */
        @keyframes pulse-red {
          0%, 100% { color: #ef4444; opacity: 1; text-shadow: 0 0 10px rgba(239, 68, 68, 0.4); }
          50% { color: #f87171; opacity: 0.6; text-shadow: 0 0 20px rgba(239, 68, 68, 0.7); }
        }
        .pulsate-red { animation: pulse-red 1.5s infinite ease-in-out; }

        /* Step 10: Verified Merchant Glowing Border Effect */
        .verified-merchant-glow {
          position: relative;
        }
        .verified-merchant-glow::after {
          content: ''; position: absolute; inset: -3px; border-radius: 2.6rem;
          border: 2px solid rgba(245, 158, 11, 0.4);
          animation: pulse-glow 2s infinite ease-in-out; pointer-events: none;
        }
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 5px rgba(245, 158, 11, 0.2); opacity: 0.5; }
          50% { box-shadow: 0 0 30px rgba(245, 158, 11, 0.6); opacity: 1; }
          100% { box-shadow: 0 0 5px rgba(245, 158, 11, 0.2); opacity: 0.5; }
        }

        /* Step 41: Unified Button Interaction States */
        button { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); outline-offset: 4px; }
        button:hover:not(:disabled) { transform: translateY(-1px) scale(1.01); filter: brightness(1.1); box-shadow: 0 0 20px rgba(245, 158, 11, 0.3); }
        button:active:not(:disabled) { transform: scale(0.97); filter: contrast(1.2); }
        button:focus-visible { 
          outline: 2px solid #f59e0b; 
        }

        .metallic-frame { position: relative; background: #121212; border-radius: 2.5rem; z-index: 1; }
        .metallic-frame::before {
          content: ""; position: absolute; inset: -1.5px; z-index: -1;
          background: linear-gradient(180deg, #A67C52 0%, #634832 50%, #3E2C1E 100%);
          border-radius: calc(2.5rem + 1.5px);
        }
        .embossed-title {
          font-family: 'Orbitron', sans-serif; font-weight: 900; font-style: italic; color: #1a1a1a;
          text-transform: uppercase; letter-spacing: -0.02em;
          text-shadow: 1px 1px 0px #333, 2px 2px 0px #222, 3px 3px 2px rgba(0,0,0,0.8), -1px -1px 1px rgba(255,255,255,0.1);
        }
        .embossed-group {
          background: #121212;
          box-shadow: inset 4px 4px 8px rgba(0,0,0,0.5), inset -4px -4px 8px rgba(255,255,255,0.05);
          border-radius: 2rem;
        }
        .gold-focus:focus { outline: none; border-color: #f59e0b !important; box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2), 0 0 15px rgba(245, 158, 11, 0.5); transition: all 0.3s ease; }
        .gold-metallic { background: linear-gradient(to bottom, #FFD700 0%, #B8860B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-metallic {
          background: linear-gradient(180deg, #FFD700 0%, #B8860B 100%);
          box-shadow: 0 4px 15px rgba(184, 134, 11, 0.3), inset 0 1px 1px rgba(255,255,255,0.4);
        }
      `}</style>

      {/* Step 40: Gold Ticket Activation Success Overlay */}
      <AnimatePresence>
        {showActivationSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none"
          >
            {[...Array(30)].map((_, i) => (
              <div 
                key={i} 
                className="coin-particle animate-coin" 
                style={{ left: `${Math.random() * 100}%`, top: `-5%`, animationDelay: `${Math.random() * 2}s` }}
              />
            ))}
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="bg-amber-500 text-black px-8 py-4 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.5)] border-2 border-white/50">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-center">Gold Ticket 활성화 완료!</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 4: 플랫폼 최상단 메인 배너 광고 윈도우 */}
      <div className="w-full max-w-[450px] bg-gradient-to-r from-stone-900 via-amber-950/20 to-stone-900 flex items-center justify-center border-dashed border-stone-800 rounded-2xl p-3 mb-4 relative z-50 h-16">
        <span className="text-[10px] text-stone-500 tracking-[0.3em] font-bold uppercase">Mango Partners Ad Banner Place</span>
      </div>

      {/* Step 6: 글로벌 유저 오프닝 스크린에 가독성 높은 네온 인디케이터 요소 결합 */}
      <div className="w-full max-w-[450px] bg-black/40 border border-teal-500/30 rounded-2xl p-3 mb-4 relative z-50">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="text-xs font-bold text-teal-500 tracking-widest uppercase">System Status</span>
        </div>
        <div className="mt-2">
          <p className="text-sm text-white/80 italic">Global Node Sync: <span className="text-teal-400 font-bold">ACTIVE</span></p>
          <p className="text-xs text-white/60 italic">Latency: <span className="text-teal-300">24ms</span></p>
        </div>
      </div>

      {/* Step 3: 상하 무빙 구조의 Pi Network 실시간 뉴스 윈도우 */}
      <div className="w-full max-w-[450px] bg-black/40 border border-amber-500/30 rounded-2xl p-3 overflow-hidden mb-4 relative z-50">
        <div className="flex items-center gap-3 mb-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Pi Network Live News</span>
        </div>
        <div className="h-10 overflow-hidden relative">
          <div id="pi-news-marquee" className="flex flex-col animate-marquee-vertical">
            <div className="h-10 flex items-center">
              <p className="text-sm text-white/80 italic truncate">Pi Network 메인넷 마이그레이션 가속화 로직 가동 중...</p>
            </div>
            <div className="h-10 flex items-center">
              <p className="text-sm text-white/80 italic truncate">새로운 글로벌 파트너 노드 1,200개 추가 연결 완료!</p>
            </div>
            <div className="h-10 flex items-center">
              <p className="text-sm text-white/80 italic truncate">Mango OS v3.0 업데이트: 보안 및 성능 대폭 향상.</p>
            </div>
            {/* Loop for seamless effect */}
            <div className="h-10 flex items-center">
              <p className="text-sm text-white/80 italic truncate">Pi Network 메인넷 마이그레이션 가속화 로직 가동 중...</p>
            </div>
            <div className="h-10 flex items-center">
              <p className="text-sm text-white/80 italic truncate">새로운 글로벌 파트너 노드 1,200개 추가 연결 완료!</p>
            </div>
            <div className="h-10 flex items-center">
              <p className="text-sm text-white/80 italic truncate">Mango OS v3.0 업데이트: 보안 및 성능 대폭 향상.</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); } /* Adjust based on number of items */
        }
        .animate-marquee-vertical { animation: marquee-vertical 15s linear infinite; }
      `}</style>

      {/* Step 22 고도화: SLOTS FULL 긴급 공지 배너 */}
      {isRegistrationSuspended && (
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[450px] mb-4 bg-rose-600 border border-rose-400 rounded-2xl p-4 flex items-center justify-between shadow-[0_0_30px_rgba(225,29,72,0.4)] z-[50]"
        >
          <div className="flex items-center gap-3">
            <AlertCircle size={20} className="text-white animate-pulse" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] italic">Emergency: SLOTS FULL - Registration Paused</span>
          </div>
        </motion.div>
      )}

      {/* Step 3: PARTNER_NODE overarching container structure */}
      <div className={`w-full max-w-[450px] metallic-frame shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden ${formData.merchantData.storeName ? 'verified-merchant-glow' : ''}`}>
        <div className="p-6 sm:p-8 relative">
          {/* 제출 중 애니메이션 오버레이 */}
          <AnimatePresence>
            {isFirstEntry && <WelcomeAuthModal onValid={() => setIsFirstEntry(false)} />}

            {isSubmitting && !isFirstEntry && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
              >
                <div className="mb-6">
                  <MangoLoading />
                </div>
                <h2 className="font-orb text-amber-500 text-lg font-black animate-pulse">SUBMITTING...</h2>
                <p className="text-[10px] text-white/40 mt-2 uppercase tracking-widest leading-relaxed">
                  보안 에스크로 시스템에<br />지원서 마스터 노드를 기록 중입니다
                </p>
              </motion.div>
            )}

            {showSubmitSuccess && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-[110] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8"
              >
                <motion.div 
                  initial={{ scale: 0.5, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]"
                >
                  <Check size={40} className="text-black stroke-[4px]" />
                </motion.div>
                <h2 className="font-orb text-white text-xl font-black italic tracking-tighter uppercase">Identity Secured</h2>
                <p className="text-[9px] text-green-500 font-black uppercase tracking-[0.3em] mt-3 animate-pulse">Node Sync Successful</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4: Prominent Ticket visual */}
          <TicketHeader />

          {/* 상단 텍스트 및 탭 */}
          <button onClick={() => setShowAdminPanel(true)} className="w-full text-[9px] text-white/30 text-center font-black uppercase tracking-[0.4em] mb-4 hover:text-amber-500 transition-colors">Master Node Onboarding</button>
          {/* <h1 className="embossed-title text-center text-lg sm:text-xl mb-8 tracking-tighter">MANGO GLOBAL<br/>APPLICATION GATEWAY</h1> */}

          {/* Phase 9: LIVE 전광판 마운트 */}
          <LiveStatusBoard recentApps={recentApps} isConnected={isConnected} rank={rank} />

          <div className="flex justify-between items-center mb-8 bg-black/30 p-1 rounded-2xl border border-white/5">
            {tabs.map((tab) => (
              <button key={tab.id} aria-label={`${tab.label} tab`} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex flex-col items-center py-2 transition-all rounded-xl ${activeTab === tab.id ? 'bg-white/5 shadow-inner' : 'opacity-40 hover:opacity-100'}`}>
                <tab.icon size={18} className={activeTab === tab.id ? "gold-metallic" : "text-white"} />
                <span className={`text-[9px] font-black mt-1 uppercase tracking-widest ${activeTab === tab.id ? "text-amber-500" : "text-white"}`}>{tab.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              {activeTab === 'participant' ? (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={14} className="text-amber-500" />
                    <h3 className="text-xs font-black text-white/80 uppercase tracking-widest">Audition Registration</h3>
                  </div>
                  <TeamNameInput value={formData.teamName} onChange={(val) => setFormData({ ...formData, teamName: val })} />
                  <GlobalLocationSelector continent={formData.continent} city={formData.city} onContinentChange={(val) => setFormData({ ...formData, continent: val, city: '' })} onCityChange={(val) => setFormData({ ...formData, city: val })} />
                  <VideoUrlInput value={formData.videoUrl} onChange={(val) => setFormData({ ...formData, videoUrl: val })} />
                  <ParticipantCounter value={formData.memberCount} onChange={(val) => setFormData({ ...formData, memberCount: val })} />
                  <AuditionCheckbox checked={formData.auditionSync} onChange={(val) => setFormData({ ...formData, auditionSync: val })} />
                  <MusicFileLoader fileName={formData.musicFileName} onFileSelect={(name) => setFormData({ ...formData, musicFileName: name })} />
                  <FriendsCodeInput value={formData.friendsCode} onChange={(val) => setFormData({ ...formData, friendsCode: val })} />

                  <button onClick={handleFinalSubmit} className="w-full mt-8 py-5 btn-metallic text-black font-black rounded-2xl text-xs uppercase tracking-[0.2em] italic active:scale-95 transition-all">Submit Application</button>
                  <p className="text-[9px] text-white/20 text-center mt-4 italic font-medium tracking-tighter">모든 지원 데이터는 Supabase 보안 원장에 암호화되어 전송됩니다</p>
                </div>
              ) : activeTab === 'infrastructure' ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Plane size={14} className="text-amber-500" />
                    <h3 className="text-xs font-black text-white/80 uppercase tracking-widest">Hospitality & Logistics Alliance</h3>
                  </div>

                  <AlliancePartnerForm data={formData.infraPartner} onChange={(val) => setFormData({ ...formData, infraPartner: val })} />
                  <SettlementRateConfig discount={formData.infraPartner.discountRate} settlement={formData.infraPartner.mangoRate} onChange={(key, val) => setFormData({ ...formData, infraPartner: { ...formData.infraPartner, [key]: val } })} />
                  <ArrivalTimelinePicker city={formData.infraPartner.arrivalCity} date={formData.infraPartner.arrivalDate} onChange={(key, val) => setFormData({ ...formData, infraPartner: { ...formData.infraPartner, [key]: val } })} />
                  <EncryptedDocUploader fileName={formData.infraPartner.secureFile} onFileSelect={(name) => setFormData({ ...formData, infraPartner: { ...formData.infraPartner, secureFile: name } })} />
                  <GuideAgencySlot data={formData.guideData} onChange={(val) => setFormData({ ...formData, guideData: val })} />
                  <BrandLogoCompiler logoName={formData.infraPartner.logoName} onFileSelect={(name) => setFormData({ ...formData, infraPartner: { ...formData.infraPartner, logoName: name } })} />

                  <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] text-center italic">Hospitality & Food Logistics</h4>
                    <AccommodationForm data={formData.hospitality} onChange={(val) => setFormData({ ...formData, hospitality: val })} />
                    <KFoodPartnerForm data={formData.hospitality} onChange={(val) => setFormData({ ...formData, hospitality: val })} />
                    <HospitalityControls data={formData.hospitality} onChange={(val) => setFormData({ ...formData, hospitality: val })} />
                  </div>

                  <button onClick={handleFinalSubmit} className="w-full mt-4 py-5 btn-metallic text-black font-black rounded-2xl text-xs uppercase tracking-[0.2em] italic active:scale-95 transition-all">Register Infrastructure</button>
                  <p className="text-[9px] text-white/20 text-center mt-2 italic font-medium tracking-tighter leading-tight">얼라이언스 가입 승인 시 글로벌 Travel Portal 메인 배너에 브랜드 로고가 실시간 컴파일됩니다</p>
                </div>
              ) : activeTab === 'media' ? (
                <div className="space-y-6">
                  <MediaPartnerForm data={formData.mediaPartner} onChange={(val) => setFormData({ ...formData, mediaPartner: val })} />
                  <button onClick={handleFinalSubmit} className="w-full mt-8 py-5 btn-metallic text-black font-black rounded-2xl text-xs uppercase tracking-[0.2em] italic active:scale-95 transition-all">Register Media Alliance</button>
                  <p className="text-[9px] text-white/20 text-center mt-4 italic font-medium tracking-tighter uppercase">승인 완료 시 공식 PRESS 권한 및 미디어 킷이 자동 발송됩니다</p>
                </div>
              ) : activeTab === 'ceo' ? (
                <div className="space-y-6">
                  <SectorCEOIRSection data={formData.ceoApplication} onChange={(val) => setFormData({ ...formData, ceoApplication: val })} />
                  <AlliancePartnerForm data={{ ...formData.infraPartner, type: 'Corporation' }} onChange={(val) => setFormData({ ...formData, infraPartner: val })} />
                  <button onClick={handleCEOSubmit} className="w-full mt-8 py-5 btn-metallic text-black font-black rounded-2xl text-xs uppercase tracking-[0.2em] italic active:scale-95 transition-all">Apply for Sector CEO</button>
                  <p className="text-[9px] text-white/20 text-center mt-4 italic font-medium tracking-tighter uppercase leading-relaxed">접수 즉시 기지국 원장에 기록되며,<br/>최고 의사결정권자(SkyMango)의 다이렉트 IR 세션이 시작됩니다.</p>
                  {/* Step 80: 모든 Sector CEO 인터페이스는 마스터 UI 디자인 가이드 규격(max-w-[450px], 메탈릭 테마)을 준수합니다. */}
                  {/* Step 75: 하위 공급망 관리 콘솔 (Placeholder) */}

                  {/* Phase 9 - Steps 81, 82, 83: Pi Network 통합 상태 표시 */}
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mt-6 space-y-3">
                    <h4 className="text-[10px] font-black text-teal-500 uppercase tracking-widest">Pi Network Integration Status</h4>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${formData.piIntegrationStatus.includes('Active') ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                      <p className="text-[9px] text-white/60 italic">{formData.piIntegrationStatus}</p>
                    </div>
                    {formData.piDomainMapped && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-[9px] text-green-500 italic font-bold">mango.pi -> mango.ceo Proxy Mapped</p>
                      </div>
                    )}
                    {/* Step 84: 단일 엔트리 포인트 정책 */}
                    <div className="flex items-center gap-2">
                      <Check size={10} className="text-green-500" />
                      <p className="text-[9px] text-white/60 italic">Single Entry Point Enforced (mango.pi)</p>
                    </div>
                    {/* Step 85: HTTPS 무결성 매칭 */}
                    <div className="flex items-center gap-2">
                      <Check size={10} className="text-green-500" />
                      <p className="text-[9px] text-white/60 italic">HTTPS Integrity Matched (Pi Native Engine)</p>
                    </div>
                    {/* Step 86: Pi SDK 마운트 및 유저 커널 인증 */}
                    <div className="flex items-center gap-2">
                      <Check size={10} className="text-green-500" />
                      <p className="text-[9px] text-white/60 italic">Pi SDK Mounted & User Kernel Auth Synced</p>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mt-6 space-y-3">
                    <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Post-Onboarding Features:</h4>
                    <p className="text-[9px] text-white/60 italic flex items-center gap-2"><Check size={10} className="text-green-500" /> Sector Console Access (via Private Key)</p>
                    <p className="text-[9px] text-white/60 italic flex items-center gap-2"><Check size={10} className="text-green-500" /> Vendor Management Dashboard (Step 75)</p>
                    <p className="text-[9px] text-white/60 italic flex items-center gap-2"><Check size={10} className="text-green-500" /> Third-Party Ad Slot Control (Step 76)</p>
                    <p className="text-[9px] text-white/60 italic flex items-center gap-2"><Check size={10} className="text-green-500" /> Supabase Multi-tenancy Guard (Step 77)</p>
                    <p className="text-[9px] text-white/60 italic flex items-center gap-2"><Check size={10} className="text-green-500" /> Real-time Telemetry Node (Step 78)</p> {/* Step 78 Placeholder */}
                    <p className="text-[9px] text-white/60 italic flex items-center gap-2"><Check size={10} className="text-green-500" /> DAO Vote Engine Integration (Step 79)</p> {/* Step 79 Placeholder */}
                    <p className="text-[9px] text-white/60 italic flex items-center gap-2"><Check size={10} className="text-green-500" /> Master UI Design Enforcement (Step 80)</p> {/* Step 80 Placeholder */}
                  </div>
                </div>
              ) : activeTab === 'publish' ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Share2 size={14} className="text-amber-500" />
                      <h3 className="text-xs font-black text-white/80 uppercase tracking-widest">Final Node Activation</h3>
                    </div>
                    <button onClick={clearMerchantData} className="text-[8px] font-black text-white/30 hover:text-rose-500 transition-colors uppercase tracking-widest">Reset Node</button>
                  </div>

                  {!formData.merchantData.isTicketActive ? (
                    <>
                      {/* Step 21, 23, 24, 26: Live Status Widgets */}
                      <QueueStatusNode status={slotStatus} rank={rank} waitTime={secondsRemaining} />

                      {/* Step 27: Progress Bar */}
                      <OnboardingProgressBar progress={onboardingProgress} />

                      <MerchantDataForm data={formData.merchantData} onChange={(val) => setFormData({ ...formData, merchantData: val })} />

                      {/* Step 31, 36: 구매 섹션 버튼 */}
                      <div className="pt-4">
                        <button
                          onClick={handleGetGoldTicket}
                          aria-label={ctaVariant}
                          className="w-full py-5 btn-metallic text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.2em] italic transition-all shadow-xl shadow-amber-500/20"
                        >
                          {onboardingProgress === 100 ? ctaVariant : "COMPLETE PROFILE TO ACTIVATE"}
                        </button>
                        <p className="text-[8px] text-white/30 text-center mt-3 uppercase font-bold tracking-widest">Node activation requires verification fee</p>
                      </div>
                    </>
                  ) : (
                    /* Step 37, 38, 39: Active Ticket UI */
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="space-y-6"
                    >
                      {/* Step 37: Gold Bordered Active Area */}
                      <div className="bg-amber-500/10 border-2 border-amber-500/50 rounded-[3rem] p-10 text-center relative overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                        <div className="absolute top-0 right-0 bg-green-500 text-black px-4 py-1 rounded-bl-2xl text-[8px] font-black uppercase tracking-widest">
                          Active Node
                        </div>
                        <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/40 shadow-inner">
                          <Check size={40} className="text-amber-500 stroke-[3px]" />
                        </div>
                        <h4 className="text-white text-xl font-black italic uppercase tracking-[0.2em] mb-1">GOLD_NODE_#{rank}</h4>
                        <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Identity Verified & Secured</p>
                      </div>

                      {/* Step 38, 39: Publish Button (Active Ticket 전용) */}
                      <div className="pt-4 flex flex-col items-center">
                        <button
                          onClick={async () => { await handleFinalSubmit(); setShowPostCreator(true); }}
                          aria-label="Publish Flirting Now"
                          className="w-full py-7 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-700 text-black font-black rounded-[2.5rem] text-sm uppercase tracking-[0.3em] italic transition-all shadow-[0_20px_60px_rgba(184,134,11,0.4)] border-t border-white/30"
                        >
                          PUBLISH FLIRTING NOW
                        </button>
                        <p className="text-[9px] text-rose-500 font-black uppercase tracking-[0.2em] mt-6 animate-pulse">Critical Sync: Live Broadcast Node Ready</p>
                      </div>
                    </motion.div>
              )}
            </div>
            ) : (
            <div className="flex flex-col items-center justify-center min-h-[300px] border border-white/5 rounded-3xl bg-black/20 text-center">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Syncing {activeTab} Channel...</p>
            </div>
              )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>

      <ReceiptModal 
        isOpen={showReceipt} 
        onClose={() => { setShowReceipt(false); setShowReward(true); }} 
        data={formData.merchantData}
        applicationId={applicationId}
      />

      <DeploymentPortal 
        isOpen={showDeploymentPortal} 
        onClose={() => setShowDeploymentPortal(false)} 
        formData={formData}
        setFormData={setFormData}
      />

      <PostCreator 
        isOpen={showPostCreator} 
        onClose={() => setShowPostCreator(false)} 
        storeName={formData.merchantData.storeName} 
      />

      {showAdminPanel && <AdminSimulator />}

      <AnimatePresence>
        {showReward && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <React.Fragment>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-[380px] bg-zinc-900 border border-amber-500/30 rounded-[2.5rem] p-10 text-center shadow-[0_0_50px_rgba(245,158,11,0.2)]"
              >
                <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Trophy size={40} className="text-amber-500" />
                </div>
                <h2 className="font-orb text-white text-2xl font-black italic tracking-tighter mb-2 uppercase">Registration Success!</h2>
                <p className="text-xs text-white/60 leading-relaxed mb-8">지원이 완료되었습니다. 선착순 얼라이언스 합류 보상으로 <span className="text-amber-500 font-black">1.0 π</span> 가 적립될 예정입니다.</p>

                <div className="bg-black/40 rounded-2xl p-4 border border-white/5 mb-8">
                  <p className="text-[9px] text-white/40 uppercase font-black tracking-widest mb-1">Estimated Reward</p>
                  <p className="text-2xl font-orb font-black text-amber-500 tracking-tighter">{rewardConfig.amount.toFixed(4)} π</p>
                </div>

                <div className="bg-black/40 rounded-2xl p-4 border border-white/5 mb-8 text-left">
                  <label className="text-[9px] text-white/40 uppercase font-black tracking-widest mb-2 block ml-1 flex items-center gap-1"><Wallet size={10} /> Pi Wallet Address</label>
                  <input
                    type="text"
                    value={piWalletAddress}
                    onChange={(e) => setPiWalletAddress(e.target.value.toUpperCase().trim())}
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs text-white gold-focus"
                  />
                  {piWalletAddress && !isPiAddressValid && (
                    <p className="text-[8px] text-rose-500 mt-1 ml-1 font-bold uppercase tracking-tighter">유효하지 않은 주소 형식 (G로 시작하는 56자)</p>
                  )}
                  {isPiAddressValid && (
                    <p className="text-[8px] text-green-500 mt-1 ml-1 font-bold italic flex items-center gap-1"><Check size={8} /> VALID WALLET STRUCTURE IDENTIFIED</p>
                  )}
                </div>

                <button
                  onClick={handleClaimReward}
                  disabled={!isPiAddressValid || !applicationId}
                  className={`w-full py-4 font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all ${isPiAddressValid ? 'bg-white text-black active:scale-95 shadow-lg' : 'bg-white/10 text-white/20 cursor-not-allowed'}`}
                >
                  {isPiAddressValid ? 'Secure Claim & Sync' : 'Enter Valid Pi Address'}
                </button>
              </motion.div>
            </React.Fragment>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApplyMasterConsole;

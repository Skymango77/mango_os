import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Calendar, ShieldCheck, Sparkles, Store, Truck, Upload } from 'lucide-react';
import { useState } from 'react';

/**
 * MarketVendorOnboarding Component
 * Phase 6: K-Beauty & Commerce Vendor Pipeline
 */
export default function MarketVendorOnboarding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    vendorType: 'beauty', // beauty, goods
    managerContact: '',
    deliveryTimeline: '',
    piEscrowAccept: false,
    signatureProduct: '',
    productPricePi: '',
  });

  const [files, setFiles] = useState({
    businessLicense: null,
    trademarkDoc: null,
    hdProductImg: null,
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // 탑 디자이너 규격: 고화질(1MB 이상) 검증 로직
    if (type === 'hdProductImg' && file.size < 1024 * 1024 * 1) {
      setErrorMsg('❌ 고화질 규격 미달: 1MB 이상의 시그니처 이미지가 필요합니다.');
      return;
    }
    setErrorMsg('');
    setFiles(prev => ({ ...prev, [type]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // [아키텍처 로직] 데이터 파이프라인 가동
      // 1. 에셋 경로 분리 업로드 (Simulation)
      // const licenseUrl = await uploadToStorage(`vendors/licenses/${Date.now()}_license`, files.businessLicense);
      // const productUrl = await uploadToStorage(`vendors/products/${Date.now()}_product`, files.hdProductImg);
      
      // 2. DB 도큐먼트 생성 (Simulation)
      // await addDoc(collection(db, 'market_vendors'), { ...formData, licenseUrl, productUrl });

      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
    } catch (err) {
      setErrorMsg('📡 시스템 동기화 실패: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black/60 flex items-center justify-center p-2 sm:p-4 antialiased">
      <div className="w-full max-w-[450px] metallic-frame shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* 제출 로딩 오버레이 */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4" />
              <p className="text-amber-500 font-black italic animate-pulse uppercase tracking-widest text-xs">Deploying Pipeline...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 헤더 섹션 */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-black tracking-[0.3em] text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full uppercase border border-amber-500/20">
            Market Portal
          </span>
          <h1 className="embossed-title text-2xl mt-4 leading-tight">
            K-BEAUTY & COMMERCE<br/>VENDOR ONBOARDING
          </h1>
          <p className="text-[9px] text-white/40 mt-2 uppercase tracking-widest italic">Phase 6: Infrastructure Synchronization</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 유형 선택 */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Vendor Category</label>
            <div className="flex gap-2">
              {['beauty', 'goods'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, vendorType: type })}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black border transition-all ${formData.vendorType === type ? 'bg-amber-500 text-black border-amber-500 shadow-lg' : 'bg-white/5 text-white/40 border-white/10'}`}
                >
                  {type === 'beauty' ? 'K-BEAUTY ZONE' : 'OFFICIAL GOODS'}
                </button>
              ))}
            </div>
          </div>

          {/* 브랜드 명칭 */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1 flex items-center gap-1"><Store size={10}/> Brand / Academy Identity</label>
            <input 
              type="text" 
              placeholder="브랜드명 또는 업체명을 입력하세요"
              required
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white gold-focus transition-all"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            />
          </div>

          {/* 서류 검증 슬롯 */}
          <div className="embossed-group p-5 space-y-4">
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1"><ShieldCheck size={12}/> Verification Protocols</span>
            
            <div className="space-y-3">
              <div>
                <label className="text-[9px] text-white/40 uppercase font-bold mb-2 block">Business License (Required)</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'businessLicense')} className="text-[10px] text-white/30 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-white/5 file:text-white file:font-black hover:file:bg-white/10" />
              </div>
              <div>
                <label className="text-[9px] text-white/40 uppercase font-bold mb-2 block">Trademark Certificate (Optional)</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'trademarkDoc')} className="text-[10px] text-white/30 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-white/5 file:text-white file:font-black hover:file:bg-white/10" />
              </div>
            </div>
          </div>

          {/* 물류 및 에스크로 */}
          <div className="embossed-group p-5 space-y-4">
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-1"><Truck size={12}/> Logistics & Pi Escrow</span>
            <input 
              type="text" 
              placeholder="물류 배송 기일 (예: 결제 후 3일 이내)"
              className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 transition-all"
              value={formData.deliveryTimeline}
              onChange={(e) => setFormData({ ...formData, deliveryTimeline: e.target.value })}
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-bold text-white/60">Accept Pi Network Escrow</span>
              <button 
                type="button"
                onClick={() => setFormData({ ...formData, piEscrowAccept: !formData.piEscrowAccept })}
                className={`w-10 h-5 rounded-full relative transition-colors ${formData.piEscrowAccept ? 'bg-purple-600' : 'bg-white/10'}`}
              >
                <motion.div animate={{ x: formData.piEscrowAccept ? 20 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-lg" />
              </button>
            </div>
          </div>

          {/* 실시간 스케줄러 (Beauty 전용) */}
          {formData.vendorType === 'beauty' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1"><Calendar size={10}/> Live Scheduler Node</span>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              </div>
              <div className="grid grid-cols-4 gap-1 text-[9px] text-center font-black">
                <div className="p-2 bg-blue-900/20 rounded border border-blue-900/40 text-white/20">10:00</div>
                <div className="p-2 bg-blue-500/20 rounded border border-blue-500/40 text-blue-300">13:00</div>
                <div className="p-2 bg-blue-900/20 rounded border border-blue-900/40 text-white/20">15:00</div>
                <div className="p-2 bg-blue-500/20 rounded border border-blue-500/40 text-blue-300">17:00</div>
              </div>
            </motion.div>
          )}

          {/* 상품 자동 등록 트리거 */}
          <div className="embossed-group p-5 space-y-4">
            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest flex items-center gap-1"><Sparkles size={12}/> Auto-Enrollment Trigger</span>
            <input 
              type="text" 
              placeholder="시그니처 입점 상품명"
              className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-orange-500"
              value={formData.signatureProduct}
              onChange={(e) => setFormData({ ...formData, signatureProduct: e.target.value })}
            />
            <div className="space-y-2">
              <label className="text-[9px] text-white/40 font-bold uppercase block ml-1">Signature Media (Min. 1MB)</label>
              <div onClick={() => document.getElementById('hd-upload').click()} className="w-full py-4 bg-orange-500/5 border-2 border-dashed border-orange-500/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer group hover:bg-orange-500/10 transition-all">
                <input type="file" id="hd-upload" hidden accept="image/*" onChange={(e) => handleFileChange(e, 'hdProductImg')} />
                <Upload size={18} className="text-orange-500/40 group-hover:scale-110 transition-transform mb-1" />
                <p className="text-[8px] font-black text-orange-500/60 uppercase">{files.hdProductImg ? files.hdProductImg.name : 'Top Designer Spec Media'}</p>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 text-[10px] text-rose-400 font-bold bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
              <AlertCircle size={14} /> {errorMsg}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full py-5 btn-metallic text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.2em] italic active:scale-95 transition-all shadow-xl shadow-amber-500/20"
          >
            망고 마켓 파이프라인 기동 및 지원 제출
          </button>

          <p className="text-[9px] text-white/20 text-center italic font-medium tracking-tight">
            제출 완료 시 글로벌 Market Portal 인벤토리에 시그니처 상품이 실시간 큐잉됩니다.
          </p>
        </form>
      </div>
    </div>
  );
}

import { createClient } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
// Supabase 설정 (Apply_Master_Console과 동일한 키 사용)
const supabaseUrl = 'https://kxmnxzcqrcqvxgrjkcyk.supabase.co';
const supabaseKey = 'your-anon-key'; // 실제 키로 교체 필요
const supabase = createClient(supabaseUrl, supabaseKey);

const portals = ['Food', 'Transfer', 'Travel', 'Hobby', 'Realty', 'Market', 'Chat', 'Education'];
const TARGET_GOAL = 100.0; // 각 포털당 게이지 100%를 채우기 위한 목표 Pi 수량

const DAO_Engine = () => {
  const [allocation, setAllocation] = useState(portals.map(() => 0));

  // 파트너에게 Pi를 전송하는 정산 로직 (시뮬레이션)
  const handleSettlement = useCallback(async (portalName, amountPi) => {
    console.log(`[DAO Engine] ${portalName} 포털 정산 시작: ${amountPi.toFixed(2)} Pi`);
    // 실제 환경에서는 Supabase Edge Function을 호출하여 Pi Network에 결제 요청을 보냅니다.
    // 예: await supabase.functions.invoke('dao-settlement-handler', { body: { portal: portalName, amount: amountPi } });
    
    // UI 피드백 (토스트 메시지 등)
    alert(`✅ ${portalName} 포털에 ${amountPi.toFixed(2)} Pi가 성공적으로 정산되었습니다!`);

    // 정산 후 해당 포털의 게이지를 초기화하거나, 100%를 초과한 부분만 차감
    setAllocation(prev => {
      const newAlloc = [...prev];
      const portalIndex = portals.findIndex(p => p === portalName);
      if (portalIndex !== -1) {
        newAlloc[portalIndex] = Math.max(0, newAlloc[portalIndex] - 100); // 100% 차감 후 남은 값 유지
      }
      return newAlloc;
    });

  }, []);

  // 실제 DB에서 누적 수수료 데이터를 가져오는 함수
  const fetchTreasuryData = useCallback(async () => {
    const { data, error } = await supabase
      .from('dao_treasury')
      .select('portal_name, amount');

    if (data) {
      const newAllocation = portals.map(name => {
        const total = data
          .filter(item => item.portal_name.toLowerCase() === name.toLowerCase())
          .reduce((sum, item) => sum + item.amount, 0);
        const currentGauge = (total / TARGET_GOAL) * 100;
        
        if (currentGauge >= 100) {
          handleSettlement(name, total); // 100% 초과 시 정산 로직 호출
        }
        return Math.min(100, currentGauge); // 게이지는 100%까지만 표시
      });
      setAllocation(newAllocation);
    }
  }, [handleSettlement]);

  useEffect(() => {
    fetchTreasuryData();

    // Supabase Realtime 구독: dao_treasury 테이블에 변화가 생기면 즉시 반영
    const channel = supabase
      .channel('dao_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'dao_treasury' }, () => {
        fetchTreasuryData();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchTreasuryData]);

  return (
    <div className="p-6 bg-black/40 border border-amber-500/20 rounded-[2.5rem] text-center shadow-2xl backdrop-blur-md">
      <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-8">DAO Treasury Allocation (2% Fee) - Target: {TARGET_GOAL} Pi</h3>
      
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full transform -rotate-90">
          {portals.map((name, i) => {
            const radius = 75;
            const circumference = 2 * Math.PI * radius;
            const angle = (360 / portals.length);
            const offset = i * angle;
            return (
              <circle
                key={name}
                cx="96"
                cy="96"
                r={radius}
                fill="rgba(255, 255, 255, 0.05)" // 채워지지 않은 부분 배경
                stroke={i % 2 === 0 ? "#f59e0b" : "#06b6d4"}
                strokeWidth="10"
                strokeDasharray={`${(allocation[i] / 100) * (circumference / portals.length)} 1000`}
                style={{ transform: `rotate(${offset}deg)`, transformOrigin: 'center' }}
                className="transition-all duration-1000 ease-out"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-black italic text-white leading-none tracking-tighter">DAO</p>
          <p className="text-[8px] text-amber-500 font-bold uppercase tracking-widest mt-1">Smart Engine</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-8">
        {portals.map((name, i) => (
          <div key={name} className="bg-black/20 p-2 rounded-xl border border-white/5">
            <p className="text-[7px] text-white/30 uppercase font-black mb-1">{name}</p>
            <p className="text-[9px] font-bold text-amber-500">{allocation[i].toFixed(1)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DAO_Engine;
// 기존 코드에서 아래 기능을 보강합니다.
import { create } from 'zustand';

const useUserStore = create((set) => ({
    piBalance: 1000.0,
    stakedAmount: 450000, // 예: 롯데캐슬에 스테이킹된 금액
    currentApr: 8.5,

    // 실시간 보상 추가 (백엔드 dexService 로직을 프론트에서 시뮬레이션)
    tickReward: () => set((state) => {
        const rewardPerTick = (state.stakedAmount * (state.currentApr / 100)) / (365 * 24 * 60 * 60);
        return { piBalance: state.piBalance + rewardPerTick };
    })
}));

export default useUserStore;
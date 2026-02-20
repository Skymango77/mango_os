import { create } from 'zustand';

/**
 * 유저 자산 및 결제 상태 관리 스토어
 */
const useUserStore = create((set) => ({
    piBalance: 1000.0, // 가상 초기 잔액
    ownedProperties: [], // 유저가 지분을 보유한 매물 리스트
    isPaymentLoading: false,

    // 1. Pi 결제 완료 후 자산 업데이트
    completePurchase: (propertyId, amountPi) => set((state) => ({
        piBalance: state.piBalance - amountPi,
        ownedProperties: [...state.ownedProperties, propertyId]
    })),

    // 2. 결제 로딩 상태 제어
    setPaymentLoading: (status) => set({ isPaymentLoading: status }),

    // 3. 실시간 보상(DEX APR) 반영
    addStakingReward: (reward) => set((state) => ({
        piBalance: state.piBalance + reward
    }))
}));

export default useUserStore;
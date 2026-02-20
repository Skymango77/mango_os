/**
 * Pi RWA DEX 수익 정산 서비스
 */
const dexService = {
    /**
     * 부동산 지분 보유량에 따른 실시간 수익 계산
     * @param {number} principal - 예치된 Pi 수량
     * @param {number} apr - 연간 수익률 (예: 8.5)
     */
    calculateInterest: (principal, apr) => {
        // 초 단위 정산을 위한 로직 (시뮬레이션용)
        // 연 수익률을 초 단위로 환산
        const annualReward = principal * (apr / 100);
        const rewardPerSecond = annualReward / (365 * 24 * 60 * 60);
        return rewardPerSecond;
    }
};

module.exports = dexService;
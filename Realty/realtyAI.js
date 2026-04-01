// Mango OS: AI Comparison Logic 시작

/**
 * 글로벌 부동산 투자 가치 비교 분석 엔진
 * @param {Object} propA - 첫 번째 매물 데이터
 * @param {Object} propB - 두 번째 매물 데이터
 */
export const analyzeGlobalInvestment = (propA, propB) => {
  const calculateROI = (price, rent) => ((rent * 12) / price) * 100;
  const getPricePerArea = (price, area) => price / area;

  const dataA = {
    roi: calculateROI(propA.price, propA.monthlyRent || (propA.price * 0.004)).toFixed(1),
    unitPrice: getPricePerArea(propA.price, propA.area || 100).toFixed(2),
    riskScore: propA.country === "Korea" ? 12 : 28, // 가상 법률/세금 리스크 지수
  };

  const dataB = {
    roi: calculateROI(propB.price, propB.monthlyRent || (propB.price * 0.005)).toFixed(1),
    unitPrice: getPricePerArea(propB.price, propB.area || 120).toFixed(2),
    riskScore: propB.country === "Singapore" ? 8 : 22,
  };

  return {
    propA: dataA,
    propB: dataB,
    // 항목별 승자 판독 (ROI는 높을수록, 단가는 낮을수록, 리스크는 낮을수록 우수)
    winners: {
      roi: parseFloat(dataA.roi) > parseFloat(dataB.roi) ? 'A' : 'B',
      unitPrice: parseFloat(dataA.unitPrice) < parseFloat(dataB.unitPrice) ? 'A' : 'B',
      risk: dataA.riskScore < dataB.riskScore ? 'A' : 'B',
    }
  };
};
// Mango OS: AI Comparison Logic 끝
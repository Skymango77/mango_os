// Mango OS: Global Currency Engine 시작

/**
 * CurrencyEngine.js
 * Pi Network의 가치를 글로벌 주요 통화로 자동 변환 및 포맷팅합니다.
 * 
 * @param {number} piAmount - 변환할 Pi 수량
 * @param {string} targetCurrency - 대상 통화 코드 (KRW, USD, SGD, THB)
 * @returns {string} 포맷팅된 현지 통화 문자열
 */
export const convertPiToLocal = (piAmount, targetCurrency = 'KRW') => {
  // 2026-2027 로드맵 기준 Mock 환율 데이터
  const rates = {
    KRW: 42500, // 1 Pi = 42,500 KRW
    USD: 31.41, // 1 Pi = 31.41 USD
    SGD: 42.15, // 1 Pi = 42.15 SGD
    THB: 1125   // 1 Pi = 1,125 THB
  };

  const rate = rates[targetCurrency] || rates['KRW'];
  const converted = piAmount * rate;
  
  // 국가별 숫자 포맷팅 적용
  return new Intl.NumberFormat(targetCurrency === 'KRW' ? 'ko-KR' : 'en-US', {
    style: 'currency',
    currency: targetCurrency,
    maximumFractionDigits: targetCurrency === 'KRW' ? 0 : 2,
  }).format(converted);
};

// 사용 예시: <span>{convertPiToLocal(15000, 'KRW')}</span>
// 결과: ₩637,500,000
// Mango OS: Global Currency Engine 끝
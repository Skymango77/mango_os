import React, { useState } from 'react';

// 1. 매물 데이터 샘플 (추후 백엔드 API와 연동)
const propertyData = {
  id: "MANGO-RE-2026-001",
  title: "롯데캐슬 라센트 로얄층",
  price_pi: 450000,
  price_krw: "12억",
  pi_ratio: 30, // 30% 파이 결제 가능
  score: 98,
  images: [
    "https://via.placeholder.com/400x250/FFD700/000000?text=Living+Room",
    "https://via.placeholder.com/400x250/DAA520/000000?text=Kitchen+View"
  ]
};

const RealtyCard = () => {
  const [imgIdx, setImgIdx] = useState(0);

  return (
    /* 사용자 지침: 기존 카드들과 동일한 너비와 스타일 유지 */
    <div className="portal-card realty-portal" style={{ width: '92%', margin: '0 auto', borderRadius: '15px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
      
      {/* 매물 이미지 슬라이드 부분 */}
      <div className="image-container" style={{ position: 'relative', height: '180px' }}>
        <img 
          src={propertyData.images[imgIdx]} 
          alt="property" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div className="badge-verified" style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#FF8C00', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
          VERIFIED {propertyData.score}%
        </div>
      </div>

      {/* 매물 상세 정보 부분 */}
      <div className="details" style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>{propertyData.title}</h3>
        
        <div className="price-info" style={{ marginBottom: '10px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#673AB7' }}>{propertyData.price_pi.toLocaleString()} π</span>
          <span style={{ fontSize: '14px', color: '#888', marginLeft: '8px' }}>({propertyData.price_krw})</span>
        </div>

        {/* 하이브리드 결제 표시바 */}
        <div className="payment-bar" style={{ height: '8px', backgroundColor: '#eee', borderRadius: '4px', position: 'relative', marginTop: '5px' }}>
          <div style={{ width: `${propertyData.pi_ratio}%`, height: '100%', backgroundColor: '#673AB7', borderRadius: '4px' }}></div>
          <span style={{ fontSize: '11px', color: '#666', marginTop: '4px', display: 'block' }}>
            Pi 결제 가능 비율: <strong>{propertyData.pi_ratio}%</strong>
          </span>
        </div>

        {/* 액션 버튼 */}
        <button 
          onClick={() => alert('Pi SDK 연동 결제창으로 이동합니다.')}
          style={{ width: '100%', marginTop: '15px', padding: '10px', backgroundColor: '#673AB7', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          매물 예약하기 (Reserve)
        </button>
      </div>
    </div>
  );
};

export default RealtyCard;
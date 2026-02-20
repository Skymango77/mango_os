import React from 'react';
import RealtyCard from './RealtyCard';
import NewsWindow from './NewsWindow';

function App() {
  // 1. 매물 데이터 (3번 단계인 백엔드 연결 전까지 사용할 가상 데이터입니다)
  const properties = [
    {
      id: 1,
      status: 'Available',
      verification_score: 98,
      details: {
        title: "📍 강남 파이 하이츠 (Gangnam Pi Heights)",
        price_pi: 5000,
        pi_payment_ratio: 100,
        location: { lat: 37.4979, lng: 127.0276 }
      },
      finance_dex_data: {
        token_symbol: "GNP-RE",
        staking_apr: 12.5
      }
    },
    {
      id: 2,
      status: 'Verified ✅',
      verification_score: 95,
      details: {
        title: "📍 해운대 마린 파이 (Haeundae Marine Pi)",
        price_pi: 3500,
        pi_payment_ratio: 80,
        location: { lat: 35.1587, lng: 129.1604 }
      },
      finance_dex_data: {
        token_symbol: "HMD-RE",
        staking_apr: 10.2
      }
    }
  ];

  // 2. 전체 컨테이너 스타일 (배경색 및 최소 높이)
  const appContainerStyle = {
    backgroundColor: '#050505',
    minHeight: '100vh',
    paddingBottom: '50px',
    color: '#fff',
    fontFamily: 'sans-serif'
  };

  return (
    <div style={appContainerStyle}>
      {/* 제목 섹션 */}
      <header style={{ textAlign: 'center', padding: '40px 0' }}>
        <h1 style={{ color: '#ffaa00', fontSize: '2.2rem', margin: '0' }}>🏠 MANGO REALTY DEX</h1>
        <p style={{ color: '#888', marginTop: '10px' }}>Pi Network Real Estate Ecosystem</p>
      </header>
      
      {/* 매물 리스트 섹션 (RealtyCard 내부에서 92% 너비 규격 적용됨) */}
      <main>
        {properties.map(item => (
          <RealtyCard key={item.id} property={item} />
        ))}
      </main>

      {/* 2번 단계: 위아래로 움직이는 뉴스 스크롤 창 (92% 너비) */}
      <NewsWindow />

      <footer style={{ marginTop: '30px', fontSize: '0.8rem', color: '#444', textAlign: 'center' }}>
        © 2026 Mango Realty Universe - All Windows set to 92% Width
      </footer>
    </div>
  );
}

export default App;
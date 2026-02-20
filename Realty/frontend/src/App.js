import React from 'react';

function App() {
    // 임시 부동산 데이터
    const realEstateList = [
        { id: 1, name: "강남 파이 자이", price: "45,000 π", type: "아파트", area: "84㎡" },
        { id: 2, name: "판교 테크노 밸리", price: "120,000 π", type: "상가", area: "120㎡" },
        { id: 3, name: "해운대 오션뷰", price: "88,000 π", type: "오피스텔", area: "59㎡" }
    ];

    return (
        <div style={containerStyle}>
            {/* 상단 헤더 */}
            <div style={headerStyle}>
                <h1 style={titleStyle}>🏠 REALTY PORTAL</h1>
                <p style={subtitleStyle}>Pi Network Real Estate DEX</p>
            </div>

            {/* 매물 리스트 (카드형) */}
            <div style={listStyle}>
                {realEstateList.map(item => (
                    <div key={item.id} style={cardStyle}>
                        <div style={badgeStyle}>{item.type}</div>
                        <h2 style={itemNameStyle}>{item.name}</h2>
                        <div style={infoStyle}>
                            <span>면적: {item.area}</span>
                            <span style={priceStyle}>{item.price}</span>
                        </div>
                        <button style={btnStyle}>상세보기</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- 사용자 요청 규격 (92% 너비) 적용 스타일 ---
const containerStyle = {
    width: '92%', // 메인 로비 창들과 동일한 크기 고정
    margin: '0 auto',
    backgroundColor: '#050505',
    color: '#fff',
    minHeight: '100vh',
    padding: '20px 0'
};

const headerStyle = { textAlign: 'center', marginBottom: '30px' };
const titleStyle = { color: '#ffaa00', fontSize: '24px', fontWeight: '900' };
const subtitleStyle = { color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '2px' };

const listStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };

const cardStyle = {
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,170,0,0.2)',
    borderRadius: '20px',
    padding: '20px',
    position: 'relative'
};

const badgeStyle = {
    position: 'absolute', top: '15px', right: '15px',
    backgroundColor: '#ffaa00', color: '#000',
    padding: '2px 8px', borderRadius: '5px', fontSize: '10px', fontWeight: 'bold'
};

const itemNameStyle = { fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' };
const infoStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' };
const priceStyle = { color: '#ffaa00', fontWeight: 'bold', fontSize: '16px' };

const btnStyle = {
    width: '100%', padding: '12px', backgroundColor: 'transparent',
    border: '1px solid #ffaa00', color: '#ffaa00', borderRadius: '10px',
    fontWeight: 'bold', cursor: 'pointer'
};
export default App;
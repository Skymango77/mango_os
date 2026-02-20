import React, { useState, useEffect } from 'react';
import RealtyMap from './components/RealtyMap';
import RealtyCard from './components/RealtyCard';
import axios from 'axios';

function App() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // 백엔드 API에서 매물 리스트 가져오기
        const fetchProperties = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/realty/list');
                setProperties(res.data);
            } catch (err) {
                console.error("데이터 로딩 실패", err);
            }
        };
        fetchProperties();
    }, []);

    return (
        <div style={appContainer}>
            {/* 1. 배너 광고 영역 (너비 92% 통일) */}
            <div style={bannerWindow}>
                <p>📢 Pi Network 부동산 DEX 런칭 기념 이벤트!</p>
            </div>

            {/* 2. 지도 영역 */}
            <RealtyMap properties={properties} />

            {/* 3. 매물 리스트 영역 */}
            <div style={listContainer}>
                {properties.map(item => (
                    <RealtyCard key={item.property_id} property={item} />
                ))}
            </div>

            {/* 4. Pi Network 뉴스 (상하 스크롤 윈도우) */}
            <div style={newsWindow}>
                <marquee direction="up" scrollamount="2" style={{ height: '40px' }}>
                    🔥 실시간 뉴스: 가락동 롯데캐슬 30% Pi 결제 매물 등장! <br />
                    🚀 DEX 유동성 풀 총 예치량 1,500,000 π 돌파!
                </marquee>
            </div>
        </div>
    );
}

// --- 레이아웃 스타일 (사용자 지정 너비 규격 준수) ---
const appContainer = {
    backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: '50px'
};

const bannerWindow = {
    width: '92%', height: '80px', margin: '15px auto',
    backgroundColor: '#2c3e50', color: '#fff', borderRadius: '12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
};

const listContainer = {
    marginTop: '10px'
};

const newsWindow = {
    width: '92%', height: '60px', margin: '20px auto',
    backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '12px',
    padding: '10px', overflow: 'hidden', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
};

export default App;
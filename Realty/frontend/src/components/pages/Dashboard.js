import React, { useState, useEffect } from 'react';
import RealtyMap from '../components/map/RealtyMap';
import RealtyCard from '../components/RealtyCard';
import NewsWindow from '../components/common/NewsWindow';
import axios from 'axios';

const Dashboard = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // backend/routes/propertyRoutes.js API 호출
        const loadData = async () => {
            try {
                const res = await axios.get('/api/realty/list');
                setProperties(res.data);
            } catch (err) {
                console.error("데이터 로드 실패:", err);
            }
        };
        loadData();
    }, []);

    return (
        <div style={containerStyle}>
            {/* 상단 뉴스 윈도우 (상하 스크롤) */}
            <NewsWindow />

            {/* 메인 지도 (92% 너비) */}
            <RealtyMap properties={properties} />

            {/* 매물 카드 리스트 */}
            <div style={listStyle}>
                {properties.map(item => (
                    <RealtyCard key={item.property_id} property={item} />
                ))}
            </div>
            
            {/* 하단 배너 광고 윈도우 (92% 너비) */}
            <div style={bannerStyle}>
                <p>🚀 Pi RWA Ecosystem: 실물 자산을 π로 소유하세요.</p>
            </div>
        </div>
    );
};

// --- 사용자 요청 규격 스타일 ---
const containerStyle = { paddingBottom: '80px', backgroundColor: '#f9f9f9' };
const listStyle = { marginTop: '10px' };
const bannerStyle = {
    width: '92%', height: '70px', margin: '20px auto',
    backgroundColor: '#34495e', color: '#fff', borderRadius: '12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px'
};

export default Dashboard;
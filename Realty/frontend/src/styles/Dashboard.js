// mango/realty/frontend/src/pages/Dashboard.js

import React from 'react';
import NewsWindow from '../components/common/NewsWindow'; // 뉴스 윈도우 (92% 너비)
import RealtyMap from '../components/map/RealtyMap';     // 지도 (92% 너비)
import RealtyCard from '../components/RealtyCard';       // 매물 카드 (92% 너비)
import '../styles/PortalGlobal.css';                     // 공통 스타일 (92% 규격)

const Dashboard = ({ properties }) => {
    return (
        <div className="dashboard-container">
            {/* 1. Pi Network 뉴스 창 (상하 스크롤) */}
            <NewsWindow />

            {/* 2. 메인 배너 광고 영역 */}
            <div className="banner-ad" style={{ height: '80px', backgroundColor: '#2c3e50', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>🚀 Pi Network 부동산 DEX 런칭!</p>
            </div>

            {/* 3. 지도 윈도우 */}
            <RealtyMap properties={properties} />

            {/* 4. 부동산 매물 리스트 (각 카드 92% 너비) */}
            <div className="property-list">
                {properties.map(item => (
                    <RealtyCard key={item.property_id} property={item} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
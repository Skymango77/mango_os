import React from 'react';
// 폴더명이 styles이므로 아래와 같이 입력해야 합니다.
import '../styles/PortalGlobal.css'; 

const Dashboard = ({ properties }) => {
    return (
        <div className="dashboard-container">
            {/* 1. 뉴스 윈도우 (92% 너비 + 상하 스크롤) */}
            <div className="pi-news-window">
                <div className="news-content">
                    🔥 [공지] Pi 부동산 DEX 수익 정산이 시작되었습니다!
                </div>
            </div>

            {/* 2. 배너 광고 (92% 너비) */}
            <div className="banner-ad" style={{ height: '100px', backgroundColor: '#34495e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>배너 광고 영역 (92% 너비)</p>
            </div>

            {/* ... 나머지 코드 */}
        </div>
    );
};

export default Dashboard;
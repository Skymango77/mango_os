import React, { useEffect } from 'react';
import useUserStore from '../store/useUserStore';
// ... 기존 import 생략

const Dashboard = () => {
    const { piBalance, tickReward } = useUserStore();

    useEffect(() => {
        // 1초마다 수익 정산 실행 (실시간 시각화)
        const timer = setInterval(() => {
            tickReward();
        }, 1000);

        return () => clearInterval(timer);
    }, [tickReward]);

    return (
        <div style={containerStyle}>
            {/* 상단 자산 현황판 (92% 너비) */}
            <div style={assetStatusStyle}>
                <span>나의 자산: <strong>{piBalance.toFixed(6)} π</strong></span>
                <span style={rewardTagStyle}>수익 정산 중... ⚡</span>
            </div>
            
            {/* 뉴스 윈도우, 지도, 카드 리스트 생략 (기존 동일) */}
        </div>
    );
};

// 스타일 추가
const assetStatusStyle = {
    width: '92%', margin: '10px auto', padding: '15px',
    backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e67e22',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
};
const rewardTagStyle = { fontSize: '12px', color: '#27ae60', fontWeight: 'bold' };

export default Dashboard;
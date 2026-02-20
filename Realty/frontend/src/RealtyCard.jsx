import React, { useState } from 'react';
import axios from 'axios';

/**
 * RealtyCard: 검증 UI와 DEX 금융 정보가 결합된 통합 컴포넌트
 */
const RealtyCard = ({ property }) => {
    const [verifyStatus, setVerifyStatus] = useState(property.status);
    const [loading, setLoading] = useState(false);

    // 1. 현장 인증 (GPS 검증) 핸들러
    const handleVerify = async () => {
        setLoading(true);
        // 가상의 사진 업로드 및 서버 통신 (propertyRoutes.js 연결)
        try {
            const formData = new FormData();
            formData.append('targetLat', property.details.location.lat);
            formData.append('targetLng', property.details.location.lng);
            
            const res = await axios.post('/api/realty/verify-location', formData);
            if (res.data.success) {
                setVerifyStatus('Verified ✅');
                alert(`인증 성공! 거리: ${res.data.distance}`);
            }
        } catch (err) {
            alert('인증 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={cardStyle}>
            {/* 상단: 매물 상태 및 등급 */}
            <div style={headerStyle}>
                <span style={badgeStyle(verifyStatus)}>{verifyStatus}</span>
                <span style={scoreStyle}>신뢰점수: {property.verification_score}점</span>
            </div>

            {/* 중단: 매물 기본 정보 */}
            <h3 style={{ margin: '10px 0' }}>{property.details.title}</h3>
            <p style={priceStyle}>
                {property.details.price_pi.toLocaleString()} π 
                <span style={subPriceStyle}>(비중 {property.details.pi_payment_ratio}%)</span>
            </p>

            {/* 하단: DEX 금융 대시보드 (2번 기능) */}
            <div style={dexBoxStyle}>
                <div style={dexRow}>
                    <span>수익권 토큰</span>
                    <strong>{property.finance_dex_data.token_symbol}</strong>
                </div>
                <div style={dexRow}>
                    <span>스테이킹 보상(APR)</span>
                    <strong style={{ color: '#27ae60' }}>{property.finance_dex_data.staking_apr}%</strong>
                </div>
                <button style={stakingButtonStyle}>π 스테이킹 참여</button>
            </div>

            {/* 버튼 섹션 */}
            <div style={actionBox}>
                <button 
                    onClick={handleVerify} 
                    disabled={loading}
                    style={verifyButtonStyle}
                >
                    {loading ? '검증 중...' : '실시간 현장 인증'}
                </button>
                <button style={payButtonStyle}>Pi 결제하기</button>
            </div>
        </div>
    );
};

// --- 스타일 정의 (카드 스타일 윈도우 너비 92% 규격 준수) ---
const cardStyle = {
    width: '92%', margin: '15px auto', padding: '20px',
    borderRadius: '15px', backgroundColor: '#fff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)', boxSizing: 'border-box'
};

const dexBoxStyle = {
    background: '#f8f9fa', padding: '15px', borderRadius: '10px', margin: '15px 0'
};

const dexRow = {
    display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px'
};

const stakingButtonStyle = {
    width: '100%', padding: '8px', marginTop: '10px', border: '1px solid #3498db',
    borderRadius: '5px', background: 'transparent', color: '#3498db', fontWeight: 'bold'
};

const actionBox = { display: 'flex', gap: '10px', marginTop: '10px' };

const verifyButtonStyle = { flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: '#34495e', color: '#fff' };
const payButtonStyle = { flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: '#e67e22', color: '#fff', fontWeight: 'bold' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const badgeStyle = (status) => ({ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: status.includes('Verified') ? '#e8f5e9' : '#fff3e0', color: status.includes('Verified') ? '#2e7d32' : '#ef6c00' });
const scoreStyle = { fontSize: '12px', color: '#7f8c8d' };
const priceStyle = { fontSize: '20px', fontWeight: 'bold', color: '#2c3e50' };
const subPriceStyle = { fontSize: '14px', color: '#95a5a6', marginLeft: '5px' };

export default RealtyCard;
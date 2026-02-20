import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

/**
 * RealtyMap: 매물의 위치를 지도로 표시하고, 
 * 클릭 시 DEX 수익률(APR) 등 금융 데이터를 팝업으로 보여줍니다.
 */
const RealtyMap = ({ properties }) => {
    const [selected, setSelected] = useState(null);

    // 사용자 지정 스타일: 모든 포탈 윈도우 너비(92%)와 동일하게 설정
    const mapContainerStyle = {
        width: '92%',
        height: '350px',
        margin: '15px auto', // 상하 여백 및 중앙 정렬
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        overflow: 'hidden'
    };

    // 기본 지도 중심 (가락동 롯데캐슬 인근)
    const center = {
        lat: 37.496,
        lng: 127.123
    };

    return (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
            >
                {/* 매물 마커 표시 */}
                {properties && properties.map(item => (
                    <Marker
                        key={item.property_id}
                        position={{ 
                            lat: item.details.location.lat, 
                            lng: item.details.location.lng 
                        }}
                        onClick={() => setSelected(item)}
                    />
                ))}

                {/* 마커 클릭 시 나타나는 정보창 */}
                {selected && (
                    <InfoWindow
                        position={{ 
                            lat: selected.details.location.lat, 
                            lng: selected.details.location.lng 
                        }}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div style={infoWindowStyle}>
                            <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>
                                {selected.details.title}
                            </h4>
                            <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                                {selected.details.location.address}
                            </p>
                            <div style={dexBadgeStyle}>
                                <span style={{ color: '#e67e22', fontWeight: 'bold' }}>
                                    APR: {selected.finance_dex_data.staking_apr}%
                                </span>
                            </div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

// --- 내부 스타일 정의 ---
const infoWindowStyle = {
    padding: '5px',
    minWidth: '150px'
};

const dexBadgeStyle = {
    marginTop: '8px',
    padding: '4px',
    backgroundColor: '#fff7ed',
    borderRadius: '4px',
    textAlign: 'center',
    fontSize: '11px',
    border: '1px solid #ffedd5'
};

export default RealtyMap;
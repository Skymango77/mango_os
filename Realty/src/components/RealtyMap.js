import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

/**
 * RealtyMap: 매물 위치 및 DEX 정보를 지도로 표시
 * 카드 스타일 윈도우 너비와 조화를 이루도록 설계
 */
const RealtyMap = ({ properties }) => {
    const [selected, setSelected] = useState(null);

    const mapContainerStyle = {
        width: '92%', // 사용자 설정: 카드 스타일 윈도우 너비와 동일하게 유지
        height: '400px',
        margin: '10px auto',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    };

    const center = {
        lat: 37.496, // 송파구 가락동 기준
        lng: 127.123
    };

    return (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
            >
                {properties.map(item => (
                    <Marker
                        key={item.property_id}
                        position={{ lat: item.details.location.lat, lng: item.details.location.lng }}
                        onClick={() => setSelected(item)}
                    />
                ))}

                {selected && (
                    <InfoWindow
                        position={{ lat: selected.details.location.lat, lng: selected.details.location.lng }}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div style={{ padding: '5px', maxWidth: '200px' }}>
                            <h4 style={{ margin: '0 0 5px 0' }}>{selected.details.title}</h4>
                            <p style={{ fontSize: '12px', color: '#666' }}>{selected.details.location.address}</p>
                            <div style={{ background: '#f0f7ff', padding: '5px', borderRadius: '5px' }}>
                                <strong style={{ color: '#e67e22' }}>APR: {selected.finance_dex_data.staking_apr}%</strong>
                                <br />
                                <small>Symbol: {selected.finance_dex_data.token_symbol}</small>
                            </div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default RealtyMap;
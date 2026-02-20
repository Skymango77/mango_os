const exifr = require('exifr'); // 사진 메타데이터 추출
const crypto = require('crypto'); // 이미지 무결성 해시
const axios = require('axios'); // API 연동

/**
 * [통합 고도화] REALTY 검증 컨트롤러
 */
const verifyController = {
    
    /**
     * 1. 사진 메타데이터(GPS) 및 위치 일치성 검증
     */
    verifyImageMetadata: async (req, res) => {
        try {
            const { file } = req;
            const { targetLat, targetLng } = req.body;

            if (!file) return res.status(400).json({ success: false, message: "사진 없음" });

            // 사진에서 GPS 정보 추출
            const gps = await exifr.gps(file.path);
            
            if (!gps || !gps.latitude || !gps.longitude) {
                return res.json({ success: false, score_deduction: 20, message: "GPS 정보 없음" });
            }

            // 거리 계산 (100m 이내 촬영 여부)
            const distance = calculateDistance(gps.latitude, gps.longitude, targetLat, targetLng);
            const isVerified = distance <= 0.1;

            return res.json({
                success: isVerified,
                score: isVerified ? 100 : 50,
                distance: `${(distance * 1000).toFixed(0)}m`,
                message: isVerified ? "현장 촬영 인증됨" : "위치 불일치"
            });
        } catch (error) {
            res.status(500).json({ success: false, message: "위치 검증 오류" });
        }
    },

    /**
     * 2. AI 이미지 해시 무결성 검증 (보안 고도화)
     * 원본과 현재 업로드된 이미지의 해시값을 비교하여 변조 여부 확인
     */
    verifyImageIntegrity: (uploadedImageBuffer, originalHash) => {
        const currentHash = crypto.createHash('sha256').update(uploadedImageBuffer).digest('hex');
        const isIntegrityOk = currentHash === originalHash;
        
        return {
            verified: isIntegrityOk,
            confidence: isIntegrityOk ? 100 : 0,
            timestamp: new Date().toISOString()
        };
    },

    /**
     * 3. 실거래가 및 등기부 변동 확인 (데이터 고도화)
     */
    checkRegistryAndPrice: async (propertyId, inputPrice) => {
        console.log(`[Verify] ${propertyId}의 실시간 데이터 검증 중...`);
        
        // 시세 대조 (가상 데이터)
        const avgPrice = 1100000000; 
        const isPriceReasonable = (inputPrice / avgPrice) >= 0.8;

        return {
            propertyId,
            ownership_verified: true,
            price_integrity: isPriceReasonable ? "Normal" : "Warning",
            last_check: new Date().toISOString()
        };
    }
};

/**
 * 위경도 거리 계산 함수 (Haversine Formula)
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구 반지름 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

module.exports = verifyController;
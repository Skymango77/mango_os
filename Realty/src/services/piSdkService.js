const axios = require('axios');

// Pi Network 개발자 설정 (환경 변수 관리 권장)
const PI_API_URL = "https://api.minepi.com/v2";
const PI_API_KEY = process.env.PI_API_KEY; // .env 파일에 저장하세요.

/**
 * Pi Network SDK 백엔드 연동 서비스
 */
const piSdkService = {
    /**
     * 1. 결제 승인 및 완료 (Approve & Complete)
     * 클라이언트에서 결제가 생성된 후 백엔드에서 최종 승인을 처리합니다.
     */
    approvePayment: async (paymentId) => {
        try {
            // Pi API를 호출하여 결제를 승인합니다.
            const response = await axios.post(
                `${PI_API_URL}/payments/${paymentId}/approve`,
                {},
                { headers: { Authorization: `Key ${PI_API_KEY}` } }
            );

            console.log(`[Pi SDK] 결제 승인 완료: ${paymentId}`);
            return response.data;
        } catch (error) {
            console.error("[Pi SDK] 결제 승인 오류:", error.response?.data || error.message);
            throw new Error("Pi 결제 승인에 실패했습니다.");
        }
    },

    /**
     * 2. 에스크로 로직 (Escrow)
     * 부동산 계약 조건이 달성될 때까지 상태를 '예치 중'으로 유지합니다.
     */
    handleEscrow: async (paymentId, propertyId, status) => {
        // 실제 운영 시 DB와 연동하여 상태를 관리합니다.
        // status: 'PENDING' (예치), 'RELEASED' (지급), 'CANCELLED' (환불)
        
        console.log(`[Escrow] 매물 ${propertyId}에 대한 결제 ${paymentId} 상태 변경: ${status}`);
        
        if (status === 'RELEASED') {
            // 등기 확인 후 중개인/집주인에게 Pi 지급 로직 실행
            return await piSdkService.completePayment(paymentId);
        }
    },

    /**
     * 3. 결제 최종 완료 (Complete)
     */
    completePayment: async (paymentId) => {
        try {
            const response = await axios.post(
                `${PI_API_URL}/payments/${paymentId}/complete`,
                {},
                { headers: { Authorization: `Key ${PI_API_KEY}` } }
            );
            return response.data;
        } catch (error) {
            console.error("[Pi SDK] 결제 완료 오류:", error.response?.data || error.message);
            throw new Error("Pi 결제 완료 처리에 실패했습니다.");
        }
    }
};

module.exports = piSdkService;
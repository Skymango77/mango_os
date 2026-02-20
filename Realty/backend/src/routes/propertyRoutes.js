const express = require('express');
const router = express.Router();
const verifyController = require('../controllers/verifyController');
const piSdkService = require('../services/piSdkService');

// 매물 리스트 반환
// UI 가이드에 따라 realty_portal의 카드 크기를 다른 포털과 맞추기 위한 일관된 데이터 구조
router.get('/list', (req, res) => {
    try {
        const properties = require('../../data/property_sample.json');
        // 프론트엔드에서 동일한 규격의 카드를 렌더링할 수 있도록 래핑
        res.json({
            portalType: 'realty_portal',
            data: properties // properties가 배열인 경우
        });
    } catch (error) {
        res.status(500).json({ error: "데이터를 불러오는데 실패했습니다." });
    }
});

// Pi 결제 승인 프로세스
router.post('/payment/approve', async (req, res) => {
    const { paymentId } = req.body;
    
    if (!paymentId) {
        return res.status(400).json({ error: "paymentId가 필요합니다." });
    }

    try {
        const result = await piSdkService.approvePayment(paymentId);
        res.json({
            success: true,
            status: 'approved',
            details: result
        });
    } catch (error) {
        console.error("Payment Approval Error:", error);
        res.status(500).json({ success: false, message: "결제 승인 중 오류 발생" });
    }
});

module.exports = router;
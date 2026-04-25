/**
 * MANGO TRANSFER - AI 기반 이동/운송 분석 컨트롤러
 */
const transferController = {
    /**
     * 1. 사용자 요청 AI 분석 (Analyze)
     */
    analyzeRequest: async (req, res) => {
        const { userText, location } = req.body;
        
        // 실제 구현 시 Google Gemini API 또는 OpenAI 연동
        // 여기서는 패턴 매칭 시뮬레이션 적용
        const isHeavy = userText.includes("크레인") || userText.includes("사다리차");
        
        const analysis = {
            category: isHeavy ? "HEAVY_EQUIPMENT" : "LOGISTICS",
            requiredServices: isHeavy ? ["Crane", "Moving"] : ["Taxi"],
            urgency: userText.includes("빨리") ? "HIGH" : "NORMAL",
            estimatedTime: "2026-03-20 14:00"
        };

        res.json({ success: true, analysis });
    },

    /**
     * 2. AI 자동 견적 산출 (Estimate)
     */
    calculateEstimate: async (req, res) => {
        const { serviceType, distanceKm, floor } = req.body;
        
        let basePricePi = 0;
        if (serviceType === "Crane") basePricePi = 50 + (floor * 5);
        else basePricePi = 5 + (distanceKm * 0.5);

        res.json({
            success: true,
            estimate: {
                totalPi: basePricePi,
                currency: "π",
                validUntil: new Date(Date.now() + 3600000) // 1시간 유효
            }
        });
    },

    /**
     * 3. 실시간 배차 매칭 (Dispatch)
     */
    dispatchPartner: async (req, res) => {
        const { equipmentId, region } = req.body;
        
        // 주변 파트너 기사님들에게 푸시 알림 전송 로직
        console.log(`[Dispatch] ${region} 지역 ${equipmentId} 장비 기사님 호출 중...`);
        
        res.json({ success: true, message: "배차가 진행 중입니다. 기사님 정보를 기다려주세요." });
    }
};

module.exports = transferController;
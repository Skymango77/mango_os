/**
 * Smart Itinerary Generator
 * Domain 05: Itinerary Personalization
 * 사용자의 의도를 바탕으로 최적화된 여행 스케줄을 생성합니다.
 */

export const itineraryService = {
    /**
     * 여행 계획 자동 생성
     * @param {Object} structuredQuery - AI가 해석한 쿼리 객체
     */
    generatePlan(structuredQuery) {
        const { destination, nights, startDate } = structuredQuery;
        
        console.log(`[Itinerary] Building ${nights} nights plan for ${destination}`);

        const schedule = [];
        for (let i = 0; i <= nights; i++) {
            const day = i + 1;
            schedule.push({
                day: day,
                activities: this.getSuggestedActivities(destination, day === 1, day > nights)
            });
        }

        return {
            tripId: `TRIP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            destination,
            startDate,
            schedule
        };
    },

    getSuggestedActivities(city, isFirstDay, isLastDay) {
        if (isFirstDay) return ['공항 픽업', '호텔 체크인', '시내 가벼운 산책'];
        if (isLastDay) return ['기념품 쇼핑', '호텔 체크아웃', '공항 이동'];
        return ['현지 핫스팟 탐방', 'AI 추천 맛집 방문', '자유 일정'];
    }
};
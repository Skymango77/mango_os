/**
 * Flight Deal Ranking Engine
 * Domain 03: Flight Intelligence Engine
 */
export const flightRanking = {
    sort(flights, criteria = 'price') {
        return [...flights].sort((a, b) => {
            switch (criteria) {
                case 'price': return parseFloat(a.price) - parseFloat(b.price);
                case 'duration': return (a.durationMinutes || 0) - (b.durationMinutes || 0);
                case 'stops': return (a.stops || 0) - (b.stops || 0);
                case 'trend': 
                    // 트렌드 점수가 높을수록(예약 급상승 등) 상단 배치
                    return (b.trendScore || 0) - (a.trendScore || 0);
                default: return 0;
            }
        });
    }
};
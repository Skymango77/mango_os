/**
 * Hotel Recommendation Scoring
 * Domain 04: Hotel Intelligence Engine
 */
export const hotelRanking = {
    rank(hotels) {
        return hotels.map(hotel => {
            // 복합 가중치 계산 (리뷰 40%, 가격 가치 30%, 거리 20%, 점유율 10%)
            const reviewScore = (hotel.rating || 0) * 10;
            const valueScore = (1 / parseFloat(hotel.price)) * 1000;
            const distanceScore = (1 / ((hotel.distanceKm || 1) + 1)) * 100;
            const occupancyScore = (hotel.occupancyRate || 0) * 100;

            const totalScore = (reviewScore * 0.4) + (valueScore * 0.3) + (distanceScore * 0.2) + (occupancyScore * 0.1);
            
            return { ...hotel, compositeScore: totalScore };
        }).sort((a, b) => b.compositeScore - a.compositeScore);
    }
};
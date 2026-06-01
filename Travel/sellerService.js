/**
 * Seller Services (Uploader & Analytics)
 * Phase 22 & 23: 판매자 패키지 관리 및 데이터 분석
 */
export const sellerService = {
    async uploadPackage(packageData) {
        console.log('[Seller] Uploading new travel package:', packageData.title);
        return { success: true, packageId: `PKG-${Date.now()}` };
    },

    getAnalytics() {
        return {
            totalSales: 14520.45,
            conversions: 12.4, // %
            activeBookings: 45,
            popularDestinations: [
                { name: 'Tokyo', count: 156 },
                { name: 'Paris', count: 89 },
                { name: 'Busan', count: 210 }
            ],
            revenueChart: [1200, 1900, 3000, 5000, 2400, 3100] // 월별 매출
        };
    }
};

/**
 * Admin Monitoring Layer
 * Phase 24: 시스템 건전성 감시
 */
export const adminMonitor = {
    getSystemHealth() {
        return { status: 'GREEN', latency: '42ms', activeUsers: 1284, apiNodes: 8 };
    }
};
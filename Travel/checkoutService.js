/**
 * Checkout Flow Service
 * 결제 승인 및 예약 확정 프로세스를 총괄합니다.
 */
import { publish } from '../eventBus.js';
import { walletService } from './walletService.js';

export const checkoutService = {
    async executeCheckout(bookingData) {
        console.log('[Checkout] Starting process for:', bookingData.title);
        
        try {
            // 1. 결제 처리
            const tx = await walletService.processPayment(bookingData.price, bookingData.title);
            
            // 2. 예약 확정 이벤트 발행
            publish('BOOKING_CONFIRMED', {
                bookingId: `BK-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
                transaction: tx,
                details: bookingData
            });

            return { success: true, transactionId: tx.id };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};
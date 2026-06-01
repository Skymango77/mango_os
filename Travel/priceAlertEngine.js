/**
 * Price Alert Engine
 * Domain 03/04: Intelligence Engines
 */
import { publish } from '../eventBus.js';

export const priceAlertEngine = {
    alerts: [],

    watchPrice(itemId, targetPrice, currentPrice) {
        this.alerts.push({ itemId, targetPrice });
        console.log(`[Alert] Started watching item ${itemId} for price ${targetPrice} π`);
    },

    checkVolatility(itemId, newPrice) {
        const alert = this.alerts.find(a => a.itemId === itemId);
        if (alert && newPrice <= alert.targetPrice) {
            publish('PRICE_DROP_NOTIFICATION', {
                itemId,
                message: `찜하신 상품의 가격이 ${newPrice} π로 하락했습니다! 지금 예약하세요.`
            });
        }
    }
};
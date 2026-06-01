class MangoPiPricingEngine {
    constructor() {
        this.serviceFee = 0.05;
        this.currentPiPrice = 42.85;
        this.currentPiPriceKRW = 60000; // 기본 KRW 시세 초기값
        this.cacheKey = 'mango_pi_cache';
        this.interval = 60000;
        this.taxRate = 0.10; // 국가별 세금 (평균 10%)
        this.promoDiscount = 0.05; // 프로모션 할인 (5%)
        this.memberDiscounts = {
            pioneer: 0,
            ambassador: 0.02,
            whale: 0.05
        };
    }

    async fetchPiPrice() {
        try {
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=pi-network&vs_currencies=usd,krw');
            const data = await res.json();

            if (data['pi-network']) {
                this.currentPiPrice = data['pi-network'].usd;
                this.currentPiPriceKRW = data['pi-network'].krw;

                localStorage.setItem(this.cacheKey, JSON.stringify({
                    price: this.currentPiPrice,
                    priceKRW: this.currentPiPriceKRW,
                    ts: Date.now()
                }));
            }

        } catch {
            const cache = localStorage.getItem(this.cacheKey);

            if (cache) {
                const parsed = JSON.parse(cache);
                this.currentPiPrice = parsed.price;
                this.currentPiPriceKRW = parsed.priceKRW || 60000;
            }
        }
    }

    convertToPi(amount, currency = 'usd') {
        const rate = currency.toLowerCase() === 'krw' ? this.currentPiPriceKRW : this.currentPiPrice;
        return amount / rate;
    }

    calculateAdvanced(amount, currency = 'usd', memberTier = 'pioneer') {
        const basePi = this.convertToPi(amount, currency);
        const taxPi = basePi * this.taxRate;
        const marginPi = basePi * this.serviceFee;
        const promoPi = basePi * this.promoDiscount;
        const memberPi = basePi * (this.memberDiscounts[memberTier] || 0);
        
        const totalPi = basePi + taxPi + marginPi - promoPi - memberPi;

        return {
            basePi: basePi.toFixed(2),
            taxPi: taxPi.toFixed(2),
            feePi: marginPi.toFixed(2),
            promoPi: promoPi.toFixed(2),
            memberPi: memberPi.toFixed(2),
            totalPi: totalPi.toFixed(2),
            isPriceLocked: true,
            lockExpiry: new Date(Date.now() + 10 * 60000).toLocaleTimeString() // 10분 가격 잠금
        };
    }

    async start() {
        await this.fetchPiPrice();

        setInterval(async () => {
            await this.fetchPiPrice();
            window.updateAllTravelPricing?.();
        }, this.interval);
    }
}

window.mangoPiPricing = new MangoPiPricingEngine();
window.mangoPiPricing.start();
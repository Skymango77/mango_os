// services/piPricingEngine.js

const PI_EXCHANGE_RATE_KEY = 'mango_pi_exchange_rate';
const PI_LAST_FETCH_KEY = 'mango_pi_last_fetch';
const MANGO_SERVICE_FEE_PERCENT = 5; // 5% service fee

let currentPiExchangeRate = {
    KRW: 1000, // 1 Pi = 1000 KRW (mock value)
    USD: 0.7   // 1 Pi = 0.7 USD (mock value)
};

// Function to simulate fetching a real-time Pi exchange rate
async function fetchRealtimePiExchangeRate() {
    // In a real app, this would call an API (e.g., Pi Network's own exchange rate API or a DEX)
    return new Promise(resolve => {
        setTimeout(() => {
            // Simulate slight fluctuations
            const fluctuationKRW = (Math.random() * 200 - 100); // +/- 100 KRW
            const fluctuationUSD = (Math.random() * 0.1 - 0.05); // +/- 0.05 USD
            
            const newRate = {
                KRW: parseFloat((1000 + fluctuationKRW).toFixed(2)),
                USD: parseFloat((0.7 + fluctuationUSD).toFixed(3))
            };
            localStorage.setItem(PI_EXCHANGE_RATE_KEY, JSON.stringify(newRate));
            localStorage.setItem(PI_LAST_FETCH_KEY, Date.now().toString());
            currentPiExchangeRate = newRate;
            console.log("[Pi Pricing] Fetched new Pi rate:", newRate);
            resolve(newRate);
        }, 1000); // Simulate API call delay
    });
}

// Initialize from cache or fetch
async function initializePiRate() {
    const cachedRate = localStorage.getItem(PI_EXCHANGE_RATE_KEY);
    const lastFetch = localStorage.getItem(PI_LAST_FETCH_KEY);
    const oneMinute = 60 * 1000;

    if (cachedRate && lastFetch && (Date.now() - parseInt(lastFetch) < oneMinute)) {
        currentPiExchangeRate = JSON.parse(cachedRate);
        console.log("[Pi Pricing] Loaded Pi rate from cache:", currentPiExchangeRate);
    } else {
        await fetchRealtimePiExchangeRate();
    }
}

// Ensure rate is initialized on module load
initializePiRate();

export const piPricingEngine = {
    /**
     * Converts a fiat amount to Pi, applying Mango service fee.
     * @param {number} fiatAmount - The original price in fiat (e.g., KRW or USD).
     * @param {string} currency - The fiat currency ('KRW' or 'USD').
     * @returns {Object} { originalFiat, piConverted, mangoFeePi, totalPi }
     */
    convertToPi: (fiatAmount, currency = 'KRW') => {
        let rate = currentPiExchangeRate[currency.toUpperCase()];
        if (!rate) {
            console.warn(`[Pi Pricing] Unknown currency: ${currency}. Falling back to cached rate.`);
            const cachedRate = JSON.parse(localStorage.getItem(PI_EXCHANGE_RATE_KEY));
            if (cachedRate && cachedRate[currency.toUpperCase()]) {
                rate = cachedRate[currency.toUpperCase()];
            } else {
                rate = (currency.toUpperCase() === 'USD') ? 0.7 : 1000;
            }
        }

        const piValue = fiatAmount / rate;
        const mangoFeePi = piValue * (MANGO_SERVICE_FEE_PERCENT / 100);
        const totalPi = piValue + mangoFeePi;

        return {
            originalFiat: fiatAmount,
            piConverted: parseFloat(piValue.toFixed(2)),
            mangoFeePi: parseFloat(mangoFeePi.toFixed(2)),
            totalPi: parseFloat(totalPi.toFixed(2))
        };
    },

    /**
     * Returns the current Pi exchange rate.
     * @param {string} currency - The fiat currency ('KRW' or 'USD').
     * @returns {number} The exchange rate.
     */
    getCurrentPiValue: (currency = 'KRW') => {
        return currentPiExchangeRate[currency.toUpperCase()] || 0;
    },

    /**
     * Refreshes the Pi exchange rate.
     */
    refreshPiRate: async () => {
        await fetchRealtimePiExchangeRate();
    },

    /**
     * Gets the Mango service fee percentage.
     * @returns {number} The service fee percentage.
     */
    getServiceFeePercent: () => MANGO_SERVICE_FEE_PERCENT
};

// Expose for global access if needed, or use import
window.piPricingEngine = piPricingEngine;
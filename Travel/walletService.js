/**
 * Wallet / Pi Ledger
 * Domain 07: Travel Mall Commerce
 */
export const walletService = {
    balance: 128.50, // 초기 모의 잔액

    getBalance() { return this.balance; },

    async processPayment(amount, description) {
        if (this.balance < amount) {
            throw new Error('잔액이 부족합니다. Pi를 충전해주세요.');
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                this.balance -= amount;
                const transaction = {
                    id: `TX-${Date.now()}`,
                    amount,
                    description,
                    timestamp: new Date().toISOString()
                };
                console.log('[Ledger] Transaction Complete:', transaction);
                resolve(transaction);
            }, 1000);
        });
    }
};
/**
 * Mango OS Global Wallet System v1.0
 * Handles cross-portal balance synchronization and transaction history.
 */
const MangoWallet = {
    // Default mock data if no storage exists
    defaults: {
        balances: { pi: 3141.59, mng: 12500.00 },
        history: [
            { id: 1, type: 'pi', amount: -25.0, desc: 'Flight to Tokyo', portal: 'Travel', date: '2026-05-15' },
            { id: 2, type: 'mng', amount: 2.5, desc: 'Travel Reward', portal: 'Travel', date: '2026-05-15' },
            { id: 3, type: 'pi', amount: -10.0, desc: 'Food Delivery', portal: 'Food', date: '2026-05-14' },
            { id: 4, type: 'mng', amount: 1.0, desc: 'Market Purchase', portal: 'Market', date: '2026-05-13' },
            { id: 5, type: 'pi', amount: -500.0, desc: 'Apartment Deposit', portal: 'Realty', date: '2026-05-12' },
            { id: 6, type: 'mng', amount: 15.0, desc: 'Web3 Certification', portal: 'Education', date: '2026-05-10' }
        ]
    },

    getBalances() {
        const saved = localStorage.getItem('mango_balances');
        return saved ? JSON.parse(saved) : this.defaults.balances;
    },

    getHistory() {
        const saved = localStorage.getItem('mango_tx_history');
        return saved ? JSON.parse(saved) : this.defaults.history;
    },

    // Universally updates header balance displays
    syncHeader() {
        const bal = this.getBalances();
        const piNodes = document.querySelectorAll('.global-pi-val');
        const mngNodes = document.querySelectorAll('.global-mng-val');
        
        piNodes.forEach(n => n.innerText = bal.pi.toLocaleString(undefined, { minimumFractionDigits: 2 }));
        mngNodes.forEach(n => n.innerText = bal.mng.toLocaleString(undefined, { minimumFractionDigits: 2 }));
    }
};

// Auto-sync on every page load
document.addEventListener('DOMContentLoaded', () => MangoWallet.syncHeader());
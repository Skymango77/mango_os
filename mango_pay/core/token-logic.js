/**
 * [2026-02-24] Mango Pay Core - Hyper-Cleaned v2.5
 * Location: mango_pay/core/token-logic.js
 * Designer: Mango Top Designer
 */

const MangoPay = {
    config: {
        tokenName: "Mango Token",
        symbol: "MNG",
        precision: 0,
        pointsPerPi: 1000 // 1 Pi = 1000 MNG
    },

    // 1. 잔액 조회 (안전한 파싱)
    getUserBalance: function() {
        const balance = localStorage.getItem('mango_pay_balance') || "0";
        const parsed = parseFloat(balance);
        return isNaN(parsed) ? 0 : parsed;
    },

    // 2. 거래 장부 기록 (포털 통합용)
    addHistory: function(type, amount, memo) {
        try {
            const history = JSON.parse(localStorage.getItem('mango_pay_history') || "[]");
            const record = {
                id: Date.now(),
                date: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
                type: type, // 'CHARGE' or 'PAYMENT'
                amount: amount,
                memo: memo || "일반 거래",
                balanceAfter: this.getUserBalance()
            };
            history.unshift(record);
            localStorage.setItem('mango_pay_history', JSON.stringify(history.slice(0, 50)));
        } catch (e) { console.error("History Save Error:", e); }
    },

    // 3. 결제 실행 (모달 호출 엔진)
    executePayment: function(amount, memo = "Mango Service") {
        const currentBalance = this.getUserBalance();
        
        if (currentBalance < amount) {
            alert(`❌ 잔액 부족\n현재 잔액: ${currentBalance.toLocaleString()} MNG`);
            return;
        }

        // 모달 UI 업데이트
        const modal = document.getElementById('mango-pay-modal');
        const balanceDisp = document.getElementById('display-mng-balance');
        const infoDisp = document.getElementById('payment-target-info');
        
        if (balanceDisp) balanceDisp.innerText = currentBalance.toLocaleString();
        if (infoDisp) infoDisp.innerText = `[${memo}]\n결제 요청금액: ${amount.toLocaleString()} MNG`;
        
        // 모달 표시 (이마에서 떼어낸 카드가 여기서 등장!)
        if (modal) modal.classList.remove('hidden');

        // 승인 버튼 연결
        const payBtn = document.getElementById('final-pay-btn');
        if (payBtn) {
            payBtn.onclick = () => {
                if(this.processPayment(amount, memo)) {
                    if (modal) modal.classList.add('hidden');
                }
            };
        }
    },

    // 4. 실제 차감 프로세스
    processPayment: function(amount, memo) {
        const remaining = this.getUserBalance() - amount;
        localStorage.setItem('mango_pay_balance', remaining.toFixed(this.config.precision));
        
        this.addHistory('PAYMENT', amount, memo);
        alert(`✅ 결제가 완료되었습니다!\n${memo}`);
        
        // OS 전역 잔액 업데이트 이벤트 발생
        window.dispatchEvent(new CustomEvent('mangoPayUpdated', { detail: { balance: remaining } }));
        return true;
    },

    // 5. 충전 (Pi 코인 -> MNG)
    chargeToken: function(piAmount) {
        const addedMng = piAmount * this.config.pointsPerPi;
        const newTotal = this.getUserBalance() + addedMng;
        
        localStorage.setItem('mango_pay_balance', newTotal.toFixed(0));
        this.addHistory('CHARGE', addedMng, `Pi 코인 충전 (${piAmount} Pi)`);
        
        alert(`🥭 Mango Pay 충전 성공!\n현재 잔액: ${newTotal.toLocaleString()} MNG`);
        window.dispatchEvent(new CustomEvent('mangoPayUpdated', { detail: { balance: newTotal } }));
        return newTotal;
    }
};

// 전역 모달 닫기 기능
window.closeMangoPay = function() {
    const modal = document.getElementById('mango-pay-modal');
    if (modal) modal.classList.add('hidden');
};
/**
 * Booking Receipt Generator
 * Phase 21: 상호작용 가능한 프리미엄 영수증 데이터 생성
 */
export const receiptService = {
    generate(bookingData) {
        const timestamp = new Date().toLocaleString();
        const hash = Math.random().toString(36).substring(7).toUpperCase();
        
        return {
            receiptId: `MNG-RCP-${hash}`,
            date: timestamp,
            merchant: "Mango Global Travel",
            itemName: bookingData.title,
            basePrice: bookingData.price,
            tax: (bookingData.price * 0.1).toFixed(2),
            total: (bookingData.price * 1.1).toFixed(2),
            currency: "π",
            status: "PAID",
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${hash}`
        };
    },

    downloadPDF(receiptId) {
        console.log(`[Receipt] Generating PDF for ${receiptId}...`);
        // 실제 환경에서는 PDF library(jspdf 등) 연동
    }
};
/**
 * Mango Booking Orchestration Engine
 * Phase: Global Orchestration
 * Lifecycle: SEARCH -> SELECT -> PRICE CONFIRM -> PAYMENT -> BOOKING -> TICKET/VOUCHER
 */

export const bookingEngine = {
    /**
     * Orchestrates the final booking creation after payment confirmation
     * Integrates logic for Amadeus (Flights) and Hotelbeds (Hotels) simulation
     */
    async createBooking(type, data) {
        console.log(`[BookingEngine] Orchestrating ${type} booking lifecycle...`);

        // 1. Identification Generation (Simulation of GDS/Provider response)
        const bookingId = `MNG-BK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const reservationNumber = Math.floor(10000000 + Math.random() * 90000000);
        
        // 2. Provider Specific Logic (Simulated Adapters)
        let providerData = {};
        if (type === 'FLIGHT') {
            // Amadeus PNR Simulation
            providerData = {
                supplier: 'Amadeus',
                pnr: Math.random().toString(36).substring(2, 8).toUpperCase(),
                ticketStatus: 'OPEN'
            };
        } else if (type === 'HOTEL') {
            // Hotelbeds Voucher Simulation
            providerData = {
                supplier: 'Hotelbeds',
                voucherId: `HB-VCH-${reservationNumber}`,
                confirmationStatus: 'CONFIRMED'
            };
        }

        // 3. QR Code Generation for Offline Verification (using PNR or Voucher ID)
        // Updated to include the full verification URL for admin scanners
        const qrData = type === 'FLIGHT' ? providerData.pnr : providerData.voucherId;
        const verifyUrl = `${window.location.origin}/Travel/admin_verify.html?id=${qrData}`;
        const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(verifyUrl)}`;

        // 3. Assemble Final Booking Record
        const bookingRecord = {
            bookingId,
            reservationNumber,
            type,
            provider: providerData,
            qrCode,
            item: data,
            status: 'BOOKED',
            piAmount: data.price,
            createdAt: new Date().toISOString()
        };

        // 4. Persistence to Local Storage
        this.saveToLocal(bookingRecord);

        return bookingRecord;
    },

    saveToLocal(record) {
        // Save to general booking history
        const history = JSON.parse(localStorage.getItem('mango_booking_history') || '[]');
        history.unshift(record);
        localStorage.setItem('mango_booking_history', JSON.stringify(history));

        // Save to hotel escrow specifically for the payment dashboard
        const escrows = JSON.parse(localStorage.getItem('mango_hotel_escrows') || '[]');
        escrows.push({
            title: record.item.name || record.item.airline,
            price: record.piAmount + ' π',
            date: new Date().toLocaleDateString()
        });
        localStorage.setItem('mango_hotel_escrows', JSON.stringify(escrows));
    },

    getBookingHistory() {
        return JSON.parse(localStorage.getItem('mango_booking_history') || '[]');
    }
};

window.bookingEngine = bookingEngine;
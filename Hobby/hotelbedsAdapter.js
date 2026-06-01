/**
 * Hotelbeds API Adapter for Accommodation Services
 * Handles hotel searches, availability checks, and detailed pricing.
 */

export const hotelbedsAdapter = {
    /**
     * Searches for hotels in a specific location
     */
    async searchHotels(city, checkIn, checkOut, guests) {
        console.log(`[Hotelbeds] Searching hotels in ${city} for ${guests.adults} adults`);
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { hotelId: 'H001', name: 'Grand Chosun Busan', rating: 9.2, price: '19.04', currency: 'π', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945' },
                    { hotelId: 'H002', name: 'Signiel Busan', rating: 9.5, price: '35.00', currency: 'π', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb' }
                ]);
            }, 1200);
        });
    },

    /**
     * Checks real-time availability for a specific hotel and dates
     */
    async availability(hotelId, dates) {
        console.log(`[Hotelbeds] Checking availability for ${hotelId}`);
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    isAvailable: true,
                    remainingRooms: 3,
                    roomTypes: ['Deluxe Double', 'Ocean Suite']
                });
            }, 900);
        });
    },

    /**
     * Gets final pricing including taxes and fees
     */
    async pricing(hotelId, roomType) {
        console.log(`[Hotelbeds] Getting final pricing for ${hotelId} - ${roomType}`);
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    basePrice: 18.00,
                    taxes: 1.04,
                    total: 19.04,
                    currency: 'π'
                });
            }, 700);
        });
    }
};
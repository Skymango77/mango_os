/**
 * Wishlist Sync Service
 * 모든 플랫폼(항공/호텔/몰)의 찜 목록을 통합 관리합니다.
 */
export const wishlistService = {
    items: JSON.parse(localStorage.getItem('mango_wishlist') || '[]'),

    toggle(item) {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index > -1) {
            this.items.splice(index, 1);
        } else {
            this.items.push({ ...item, savedAt: new Date().toISOString() });
        }
        localStorage.setItem('mango_wishlist', JSON.stringify(this.items));
        return this.items;
    },

    getWishlist() { return this.items; }
};
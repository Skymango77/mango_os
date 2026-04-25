/**
 * Mango OS i18n Engine v1.0
 * Persists language settings across all portals via localStorage.
 */
const MangoI18n = {
    currentLang: localStorage.getItem('mango_lang') || 'ko',
    translations: {},

    async init(path) {
        try {
            const response = await fetch(path);
            this.translations = await response.json();
            this.apply();
            this.updateSelectorUI();
        } catch (err) {
            console.error("i18n Init Error:", err);
        }
    },

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('mango_lang', lang);
        this.apply();
        window.dispatchEvent(new CustomEvent('mangoLangChanged', { detail: { lang } }));
    },

    apply() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
                el.innerHTML = this.translations[this.currentLang][key];
            }
        });
        document.documentElement.lang = this.currentLang;
    },

    updateSelectorUI() {
        const select = document.getElementById('mango-lang-select');
        if (select) select.value = this.currentLang;
    }
};
/**
 * Mango Ultimate OS - i18n Engine v1.0
 * Persistent real-time translation module
 */
const MangoI18n = {
    currentLang: localStorage.getItem('mango_lang') || 'ko',
    translations: {},

    async init(configPath) {
        try {
            const response = await fetch(configPath);
            if (!response.ok) throw new Error('Translation file not found');
            this.translations = await response.json();
            this.applyTranslations();
            this.updateLanguageUI();
            console.log(`[i18n] Language initialized: ${this.currentLang}`);
        } catch (error) {
            console.error('[i18n] Initialization failed:', error);
        }
    },

    applyTranslations() {
        const langData = this.translations[this.currentLang];
        if (!langData) return;

        // Static Text (Content)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (langData[key]) {
                if (langData[key].includes('<')) el.innerHTML = langData[key];
                else el.textContent = langData[key];
            }
        });

        // Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (langData[key]) el.placeholder = langData[key];
        });
        
        // Re-create icons if they were inside translatable areas
        if (window.lucide) window.lucide.createIcons();
    },

    t(key) {
        return (this.translations[this.currentLang] && this.translations[this.currentLang][key]) 
            ? this.translations[this.currentLang][key] 
            : key;
    },

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('mango_lang', lang);
        this.applyTranslations();
        
        // Broadcast change for other components (e.g., dynamic product lists)
        window.dispatchEvent(new CustomEvent('mangoLangChanged', { detail: lang }));
        this.updateLanguageUI();
    },

    updateLanguageUI() {
        const select = document.getElementById('mango-lang-select');
        if (select) select.value = this.currentLang;
    }
};
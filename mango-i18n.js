/**
 * Mango OS i18n Engine v1.0
 * Persists language settings across all portals via localStorage.
 */
const MangoI18n = {
    currentLang: localStorage.getItem('mango_lang') || 'ko',
    currentRegion: localStorage.getItem('mango_region') || 'KR',
    translations: {},
    languages: [
        { code: 'ko', name: '한국어', region: 'KR', currency: 'KRW', unit: 'km' },
        { code: 'en', name: 'English', region: 'US', currency: 'USD', unit: 'mi' },
        { code: 'ja', name: '日本語', region: 'JP', currency: 'JPY', unit: 'km' },
        { code: 'vi', name: 'Tiếng Việt', region: 'VN', currency: 'VND', unit: 'km' }
    ],

    async init(path) {
        try {
            const response = await fetch(path);
            this.translations = await response.json();
            this.renderLanguageList();
            this.apply();
            this.updateContextUI();
        } catch (err) {
            console.error("i18n Init Error:", err);
        }
    },

    async setLanguage(langCode) {
        const lang = this.languages.find(l => l.code === langCode);
        if (!lang) return;

        // Show Sync Visual Feedback
        const overlay = document.getElementById('sync-overlay');
        overlay?.classList.remove('hidden');

        this.currentLang = lang.code;
        this.currentRegion = lang.region;
        
        localStorage.setItem('mango_lang', lang.code);
        localStorage.setItem('mango_region', lang.region);

        // 🛠️ Real-time DB Sync (Fixing useSupabaseSync logic)
        if (window.SupabaseClient) {
            await SupabaseClient.from('user_settings')
                .upsert({ lang: lang.code, region: lang.region })
                .match({ user_id: localStorage.getItem('mango_user_id') });
        }

        // Simulate network latency for visual feedback
        setTimeout(() => {
            this.apply();
            this.updateContextUI();
            overlay?.classList.add('hidden');
            document.getElementById('global-control-panel')?.classList.add('hidden');
            window.dispatchEvent(new CustomEvent('mangoLangChanged', { detail: { lang: lang.code } }));
        }, 1500);
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

    updateContextUI() {
        const lang = this.languages.find(l => l.code === this.currentLang);
        const currencyEl = document.getElementById('ctx-currency');
        const unitEl = document.getElementById('ctx-unit');
        if (currencyEl) currencyEl.innerText = `Pi (π) ↔ ${lang.currency}`;
        if (unitEl) unitEl.innerText = `${lang.unit === 'km' ? 'Metric' : 'Imperial'} (${lang.unit})`;
    },

    renderLanguageList(filter = '') {
        const list = document.getElementById('lang-list');
        if (!list) return;
        
        const filtered = this.languages.filter(l => 
            l.name.toLowerCase().includes(filter.toLowerCase()) || 
            l.code.toLowerCase().includes(filter.toLowerCase())
        );

        list.innerHTML = filtered.map(l => `
            <div onclick="MangoI18n.setLanguage('${l.code}')" 
                 class="p-4 rounded-xl border ${this.currentLang === l.code ? 'border-orange-500 bg-orange-500/10' : 'border-white/5 bg-white/[0.03]'} 
                        hover:border-white/20 transition-all cursor-pointer group">
                <p class="text-xs font-black ${this.currentLang === l.code ? 'text-orange-400' : 'text-white/60'} group-hover:text-white">${l.name}</p>
                <p class="text-[9px] text-white/20 mt-1 uppercase">${l.code} / ${l.region}</p>
            </div>
        `).join('');
    }
};

// Control Panel Toggles
function toggleGlobalControl() {
    const panel = document.getElementById('global-control-panel');
    panel?.classList.toggle('hidden');
    if (!panel?.classList.contains('hidden')) {
        MangoI18n.renderLanguageList();
    }
}

function filterLanguages() {
    const val = document.getElementById('lang-search').value;
    MangoI18n.renderLanguageList(val);
}
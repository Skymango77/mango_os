/**
 * MANGO OS Core Engine v4.0
 * Shared Layout, Theme Switcher, and Haptic Optimization
 */

(function() {
    // 1. 전역 스타일 주입 (Loading Bar, Taskbar, Themes)
    const coreStyles = `
        #mango-loading-bar {
            position: fixed; top: 0; left: 0; height: 3px;
            background: linear-gradient(90deg, #f97316, #fbbf24);
            box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
            z-index: 100005; width: 0%;
            transition: width 0.4s cubic-bezier(0.1, 0.7, 0.1, 1);
            pointer-events: none;
        }
        .global-taskbar-wrapper { position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%); width: 92%; max-width: 450px; z-index: 10002; pointer-events: none; }
        .global-taskbar-container { 
            pointer-events: auto; background: rgba(10, 10, 10, 0.85); 
            backdrop-filter: blur(25px); border: 1px solid rgba(255, 215, 0, 0.2); 
            border-radius: 35px; padding: 10px 20px; display: flex; 
            justify-content: space-around; align-items: center; 
            box-shadow: 0 15px 40px rgba(0,0,0,0.6); 
        }
        .taskbar-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.3s ease; }
        .taskbar-item:active { transform: scale(0.9); }
        .taskbar-item.active { color: #f97316; }
        .taskbar-anchor-mango { 
            width: 64px; height: 64px; 
            background: linear-gradient(135deg, #f59e0b, #ea580c); 
            border-radius: 50%; margin-top: -40px; border: 4px solid #000; 
            display: flex; align-items: center; justify-content: center; 
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 25px rgba(249, 115, 22, 0.4);
        }
        .pi-balance-pill { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 170, 0, 0.2); padding: 4px 10px; border-radius: 20px; font-family: 'Orbitron', sans-serif; font-size: 10px; color: #fbbf24; }
        
        /* Theme Engine CSS */
        body.mode-watch { transform: scale(0.85); transform-origin: top center; }
        body.mode-glass .glass { border-color: rgba(255, 170, 0, 0.5) !important; background: rgba(0,0,0,0.15) !important; backdrop-filter: blur(8px) !important; }
    `;
    const styleEl = document.createElement("style");
    styleEl.innerText = coreStyles;
    document.head.appendChild(styleEl);

    // 2. 전역 레이아웃 엔진
    window.MangoCore = {
        init: function() {
            this.injectHTML();
            this.syncState();
            this.applyTheme();
            if (window.lucide) lucide.createIcons();
        },

        injectHTML: function() {
            const html = `
                <div id="mango-loading-bar"></div>
                <nav class="global-taskbar-wrapper">
                    <div class="global-taskbar-container">
                        <div class="taskbar-item" onclick="MangoCore.navigate('../index.html')"><i data-lucide="layout-grid" class="w-6 h-6"></i><span class="text-[9px] font-black uppercase">Universe</span></div>
                        <div class="taskbar-item" onclick="MangoCore.navigate('../Chat/chat_dashboard.html')"><i data-lucide="message-circle" class="w-6 h-6"></i><span class="text-[9px] font-black uppercase">Connect</span></div>
                        <div class="taskbar-anchor-mango" onclick="MangoCore.navigate('index.html')"><img src="mango.ico" class="w-8 h-8" alt="M"></div>
                        <div class="taskbar-item" onclick="MangoCore.triggerHaptic('click'); alert('Vault Access')"><div class="pi-balance-pill mb-1"><span id="taskbar-pi-val">1.25</span> π</div><span class="text-[9px] font-black uppercase">Vault</span></div>
                        <div class="taskbar-item" onclick="MangoCore.navigate('profile/profile_dashboard.html')"><i data-lucide="user" class="w-6 h-6"></i><span class="text-[9px] font-black uppercase">Profile</span></div>
                    </div>
                </nav>
            `;
            document.body.insertAdjacentHTML('beforeend', html);
        },

        navigate: function(url) {
            this.triggerHaptic('click');
            const bar = document.getElementById('mango-loading-bar');
            if(bar) bar.style.width = '100%';
            setTimeout(() => { window.location.href = url; }, 350);
        },

        syncState: function() {
            const balance = localStorage.getItem('mango_pi_balance') || '1250.00';
            const el = document.getElementById('taskbar-pi-val');
            if (el) el.innerText = parseFloat(balance).toFixed(2);
        },

        // 3. 햅틱 피드백 최적화 (Tuning)
        triggerHaptic: function(type) {
            if (!navigator.vibrate) return;
            const patterns = {
                'click': 15,
                'success': [30, 50, 30],
                'error': [100, 50, 100],
                'heavy': 50
            };
            navigator.vibrate(patterns[type] || 15);
        },

        // 4. 다이나믹 테마 스위처
        setTheme: function(mode) {
            document.body.classList.remove('mode-phone', 'mode-watch', 'mode-glass');
            document.body.classList.add(`mode-${mode}`);
            localStorage.setItem('mango_theme_mode', mode);
            this.triggerHaptic('heavy');
        },

        applyTheme: function() {
            const mode = localStorage.getItem('mango_theme_mode') || 'phone';
            this.setTheme(mode);
        }
    };

    window.addEventListener('storage', (e) => {
        if (e.key === 'mango_pi_balance') MangoCore.syncState();
        if (e.key === 'mango_theme_mode') MangoCore.applyTheme();
    });

    window.addEventListener('DOMContentLoaded', () => MangoCore.init());
})();
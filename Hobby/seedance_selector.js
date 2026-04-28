/**
 * 🤖 MODEL 게이트웨이: SEEDANCE 2.0 코어 엔진
 * 기반: 스크린샷 'OTHER MODEL' 선택 인터페이스
 */
const SeedanceEngine = {
    config: {
        version: "2.0.4-Busan",
        currentModel: "SEEDANCE 2.0",
        status: "Ready",
        visuals: {
            theme: "Mango Pearl",
            outfit: "Two-piece Suit", // 디자이너 정의: 망고 펄색 투피스
            glow: "Golden Aurora"
        },
        options: [
            { id: "M-01", name: "SEEDANCE 2.0", type: "Prime", spec: "High-End" },
            { id: "M-02", name: "OTHER MODEL A", type: "Alpha", spec: "Standard" },
            { id: "M-03", name: "OTHER MODEL B", type: "Beta", spec: "Standard" }
        ]
    },

    activate() {
        console.log(`%c🤖 ${this.config.currentModel} 엔진 활성화...`, "color: #f97316; font-weight: bold; font-size: 1.1rem;");
        
        // 시각 요소 렌더링 준비 (망고 펄색 테마 주입)
        document.documentElement.style.setProperty('--model-main-glow', 'rgba(255, 215, 0, 0.6)');
        
        if (window.showMangoToast) {
            window.showMangoToast(`${this.config.currentModel}: ${this.config.visuals.outfit} 로드 완료`);
        }
    },

    switchModel(modelId) {
        const target = this.config.options.find(opt => opt.id === modelId);
        if (!target) return;
        
        this.config.currentModel = target.name;
        this.activate();
    }
};

window.MangoModel = SeedanceEngine;
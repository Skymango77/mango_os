/* 🤝 SOCIAL 게이트웨이: 부산 Community 초고도화 엔진 (GHS-A) */
const userLocation = { lat: 35.1490, lng: 129.0100 }; // 스크린샷의 부산 좌표 적용

// 🛰️ GHS-A 가중치 설정 (Pulse 40% + Density 30% + Recruit 30%)
const GHS_WEIGHTS = { PULSE: 0.4, DENSITY: 0.3, RECRUIT: 0.3 };

function loadLocalMeetings() {
    // 1. 부산 실시간 데이터 소스
    const rawData = [
        { id: 1, title: "배찌가 말아주는 야장낮술", time: "16:00", location: "전포", members: 19, capacity: 20, pulse: 98, newRecruits: 5 },
        { id: 2, title: "화요곱창 번개", time: "20:00", location: "사상", members: 16, capacity: 20, pulse: 75, newRecruits: 2 },
        { id: 3, title: "해운대 오션뷰 요가", time: "07:00", location: "우동", members: 8, capacity: 30, pulse: 40, newRecruits: 12 }
    ];

    // 2. GHS-A 엔진 가동: 시너지 점수 계산 및 정렬
    const synergeticMeetings = rawData.map(m => {
        const densityScore = (m.members / m.capacity) * 100;
         m.synergyScore = (m.pulse * GHS_WEIGHTS.PULSE) + 
                          (densityScore * GHS_WEIGHTS.DENSITY) + 
                          (m.newRecruits * 10 * GHS_WEIGHTS.RECRUIT);
        return m;
    }).sort((a, b) => b.synergyScore - a.synergyScore);

    renderMeetingCards(synergeticMeetings);
}

function renderMeetingCards(meetings) {
    const container = document.getElementById('nearby-meetings-list');
    if(!container) return;

    container.innerHTML = meetings.map(m => {
        const isUltraActive = m.synergyScore > 85;
        return `
            <div class="flex items-center p-5 rounded-[2rem] bg-zinc-900/60 border ${isUltraActive ? 'border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)] animate-pulse' : 'border-white/5'} active:scale-95 transition-all">
                <div class="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mr-4 border border-emerald-500/20">
                    <i data-lucide="map-pin" class="text-emerald-400 w-5 h-5"></i>
                </div>
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        <h4 class="text-sm font-bold text-white/90 leading-none">${m.title}</h4>
                        ${isUltraActive ? '<span class="text-[7px] bg-orange-600 text-black px-1 rounded font-black italic">ACTIVE PULSE</span>' : ''}
                    </div>
                    <p class="text-[10px] text-white/30 mt-2 font-medium tracking-tight">부산 ${m.location} · 오늘 ${m.time} 시작</p>
                </div>
                <div class="text-right mr-4">
                    <p class="text-[10px] text-emerald-400 font-bold">${m.members}/${m.capacity}</p>
                    <p class="text-[8px] text-white/20 uppercase font-orbit">Sync: ${Math.round(m.synergyScore)}%</p>
                </div>
                <i data-lucide="chevron-right" class="text-white/10 w-5 h-5"></i>
            </div>
        `;
    }).join('');
    if(window.lucide) lucide.createIcons();
}

// ⚡ FLASH MEET 전용 카운트다운 동기화
function syncFlashTimers() {
    // 스크린샷의 번개 아이콘 및 카운트다운 요소 실시간 업데이트
}

window.addEventListener('load', () => {
    loadLocalMeetings();
});

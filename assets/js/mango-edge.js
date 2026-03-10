/**
 * Mango Edge System - Force Positioning Engine
 */

// [1] 사이드바 열기/닫기
function toggleMangoEdge() {
    const panel = document.querySelector('.mango-edge-panel');
    if (panel) panel.classList.toggle('active');
}

// [2] 메뉴 데이터 구성
const edgeMenus = [
    { icon: '📝', title: 'Quick Memo', desc: '여행 일정 및 장바구니' },
    { icon: '⭐', title: 'Favorites', desc: '관심 목록 및 즐겨찾기' },
    { icon: '🤝', title: 'Friends', desc: '내 친구 찾기' },
    { icon: '👛', title: 'Wallet', desc: '내 지갑 연결 (Pi)' }
];

// [3] 초기화 및 자동 위치 교정
document.addEventListener('DOMContentLoaded', () => {
    const handle = document.querySelector('.mango-edge-handle');
    const panel = document.querySelector('.mango-edge-panel');
    const container = document.getElementById('edge-menu-container');

    // 🚨 핵심: 코드가 엉뚱한 곳에 있으면 <body> 바로 아래로 강제 이동
    if (handle) document.body.appendChild(handle);
    if (panel) document.body.appendChild(panel);

    // 메뉴 렌더링
    if (container) {
        container.innerHTML = '';
        edgeMenus.forEach(menu => {
            const div = document.createElement('div');
            div.style.cssText = "padding: 20px; margin-bottom: 15px; background: rgba(255,255,255,0.07); border-radius: 15px; cursor: pointer; border: 1px solid rgba(255,193,7,0.1);";
            div.innerHTML = `
                <div style="font-size: 1.2rem; color: #ffc107; margin-bottom: 5px;">${menu.icon} <strong>${menu.title}</strong></div>
                <div style="font-size: 0.85rem; color: #999;">${menu.desc}</div>
            `;
            container.appendChild(div);
        });
    }
});
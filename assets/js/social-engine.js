// Mango OS Social Interaction Engine
let flirtCount = 0;

/**
 * 1. 플러팅(하트) 전송 함수
 * @param {string} targetId - 하트를 받을 유저의 Pi ID
 */
function sendFlirt(targetId) {
    // [초고도화 포인트] 실제로는 Pi SDK의 데이터베이스나 서버 API와 연동될 부분입니다.
    flirtCount++;
    
    // 화면의 숫자를 즉시 업데이트
    const countElement = document.getElementById('flirt-counter');
    if (countElement) {
        countElement.innerText = flirtCount;
        // 하트 애니메이션 효과 실행 (UI 제어)
        countElement.classList.add('pulse-animation');
        setTimeout(() => countElement.classList.remove('pulse-animation'), 500);
    }
    
    console.log(`💖 ${targetId}님에게 플러팅을 보냈습니다. 현재 총 합계: ${flirtCount}`);
}

// 초기 로드 시 기존 데이터를 불러오는 로직 (추후 확장)
function loadRoomStats() {
    console.log("📍 프로필 룸 통계 로딩 완료.");
}
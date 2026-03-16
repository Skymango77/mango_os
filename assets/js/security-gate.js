// [CEO 전용] MANGO OS 마스터 게이트 (무적 모드)
(function() {
    console.log("CEO 보안 게이트가 대표님의 입력을 대기 중입니다.");

    // 화면 전체에서 클릭을 감시하여 '범인'을 찾아내는 방식
    document.addEventListener('click', function(e) {
        // 클릭된 타겟이 'main-mango-logo'라는 ID를 가졌는지 확인
        const target = e.target.closest('#main-mango-logo');
        
        if (target) {
            console.log("마스터 타점 감지됨!");
            
            // 1. 보안을 위해 0.3초 뒤에 입력창 띄움 (살짝의 딜레이가 더 고급스러움)
            setTimeout(() => {
                const masterKey = prompt("Mango OS CEO Verification:");
                
                if (masterKey === "7777") {
                    alert("반갑습니다, 권한결 대표님. 집무실로 이동합니다.");
                    window.location.href = 'ceo-room.html';
                } else if (masterKey !== null) {
                    alert("인증에 실패했습니다.");
                }
            }, 300);
        }
    }, true); // 'true'를 사용하여 다른 코드보다 먼저 가로챕니다.
})();
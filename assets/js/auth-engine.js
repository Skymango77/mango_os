// 섹션 전환 함수
function toggleSection(type) {
    const loginSec = document.getElementById('auth-login-section');
    const resetSec = document.getElementById('auth-reset-section');
    
    if (type === 'reset') {
        loginSec.classList.add('hidden');
        resetSec.classList.remove('hidden');
    } else {
        loginSec.classList.remove('hidden');
        resetSec.classList.add('hidden');
    }
}

// 1. 이메일로 임시 비번 전송 시뮬레이션
async function sendRecoveryEmail() {
    const email = document.getElementById('recovery-email').value;
    if(!email) return alert("이메일을 입력해주세요.");

    console.log(`${email}로 임시 비밀번호 발송 요청 중...`);
    
    // 로딩 토스트 (기존 기능 활용)
    if(window.showMangoToast) showMangoToast("Sending recovery email...");

    // 실제 환경에서는 API 호출: fetch('/api/reset-password', {method: 'POST', body: JSON.stringify({email})})
    setTimeout(() => {
        alert(`${email}로 임시 비밀번호가 전송되었습니다. 메일함을 확인해주세요.`);
    }, 1500);
}

// 2. 관리자 직접 비밀번호 변경
function updatePassword() {
    const newPw = document.getElementById('new-password').value;
    
    if(newPw.length < 4) {
        alert("비밀번호는 최소 4자리 이상이어야 합니다.");
        return;
    }

    // 로컬 스토리지 또는 DB에 저장 (임시로 로컬 스토리지 사용)
    localStorage.setItem('mango_admin_pw', newPw);
    
    if(window.showMangoToast) showMangoToast("Password updated successfully!");
    alert("비밀번호가 안전하게 변경되었습니다.");
    toggleSection('login');
}
/**
 * 2. 내 프로필 룸 초대 링크 생성
 * @returns {string} - 생성된 URL
 */
function generateInviteLink() {
    const currentUserId = document.getElementById('user-pi-id').innerText.replace('@', '');
    // Pi Network 앱 내에서 내 방으로 바로 연결되는 딥링크 구조
    const inviteUrl = `https://pinet.com/v/mango.pi?room=${currentUserId}`;
    
    console.log("🔗 초대 링크 생성 완료:", inviteUrl);
    return inviteUrl;
}

/**
 * 링크를 클립보드에 복사하고 알림 표시
 */
function copyInviteLink() {
    const link = generateInviteLink();
    navigator.clipboard.writeText(link).then(() => {
        alert("내 프로필 룸 초대 링크가 복사되었습니다! 친구들에게 공유해보세요.");
    });
}
/* File: assets/js/mango-hompy.js 
   Description: Mango OS 개인화 미니홈피 및 확산 엔진 (High-End Version)
*/

// 1. 유저 상태 관리 엔진 (초기값)
window.mangoUser = {
    username: "Pioneer",
    isKYC: false,
    level: "SEED",
    exp: 15,
    stats: { cart: 0, fav: 12, rating: 4.9 },
    inventory: []
};

// 2. 로그인 성공 시 실행 (Pi SDK 연동)
function onLoginSuccess(auth) {
    if (auth && auth.user) {
        mangoUser.username = auth.user.username;
        // 실제 SDK 데이터에 따라 KYC 여부 판단 (예시)
        mangoUser.isKYC = auth.user.roles ? auth.user.roles.includes("kyc") : false;
    }
    
    refreshMiniHompy();
}

// 3. 미니홈피 UI 리프레시 (고도화된 렌더링)
function refreshMiniHompy() {
    const container = document.querySelector('#integrated-auth-modal > div');
    if (!container) return;

    // Glassmorphism & UI 구성
    container.innerHTML = `
        <div class="p-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 max-h-[90vh] overflow-y-auto custom-scroll">
            
            <div class="relative w-28 h-28 mx-auto mb-4">
                <div class="w-full h-full rounded-[2rem] p-1 bg-gradient-to-br ${mangoUser.isKYC ? 'from-blue-500 to-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.5)]' : 'from-yellow-500 to-orange-500 shadow-[0_0_30px_rgba(234,179,8,0.4)]'}">
                    <img src="assets/img/mango.jpg" class="w-full h-full rounded-[1.8rem] object-cover border-4 border-black" onerror="this.src='https://via.placeholder.com/150'">
                </div>
                ${mangoUser.isKYC ? '<div class="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg border-2 border-black">KYC</div>' : ''}
            </div>

            <h2 class="text-2xl font-black text-white tracking-tight">@${mangoUser.username}</h2>
            <p class="${mangoUser.isKYC ? 'text-blue-400' : 'text-yellow-500'} text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
                ${mangoUser.isKYC ? 'Verified Citizen' : 'Mango Explorer'}
            </p>

            <div class="grid grid-cols-3 gap-3 mb-6">
                <div class="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                    <span class="block text-[8px] text-white/40 mb-1 uppercase">Shopping</span>
                    <span class="text-lg font-black text-white">🛒 ${mangoUser.stats.cart}</span>
                </div>
                <div class="bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                    <span class="block text-[8px] text-white/40 mb-1 uppercase">Wishlist</span>
                    <span class="text-lg font-black text-pink-500">❤️ ${mangoUser.stats.fav}</span>
                </div>
                <div onclick="openChatPortal()" class="bg-yellow-500/10 backdrop-blur-md p-3 rounded-2xl border border-yellow-500/20 hover:bg-yellow-500/20 transition-all cursor-pointer group">
                    <span class="block text-[8px] text-yellow-500/60 mb-1 uppercase group-hover:text-yellow-500">Chat Room</span>
                    <span class="text-lg font-black text-white">💬 GO</span>
                </div>
            </div>

            <div class="bg-black/40 rounded-3xl p-5 border border-white/5 mb-6 text-left relative overflow-hidden">
                <div class="flex justify-between items-end mb-3">
                    <div>
                        <p class="text-[9px] text-white/40 uppercase">Current Level</p>
                        <p class="text-lg font-black text-white italic">🌰 LV.1 ${mangoUser.level}</p>
                    </div>
                    <p class="text-xs font-black text-yellow-500">${mangoUser.exp}%</p>
                </div>
                <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-yellow-500 to-orange-500 shadow-[0_0_15px_#EAB308]" style="width: ${mangoUser.exp}%"></div>
                </div>
            </div>

            <div class="bg-blue-500/10 rounded-3xl p-5 border border-blue-500/20 mb-8">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-[10px] text-blue-400 font-bold uppercase">Invite & Earn Pi</span>
                    <button onclick="copyReferral()" class="text-[9px] bg-blue-500 text-white px-3 py-1 rounded-full font-bold">Copy Link</button>
                </div>
                <div class="flex gap-2">
                    <div class="flex-1 bg-black/60 rounded-xl p-3 border border-white/5 font-mono text-white text-center tracking-widest">
                        ${mangoUser.username.toUpperCase()}
                    </div>
                    <button onclick="shareMango()" class="bg-white text-black w-12 rounded-xl flex items-center justify-center hover:bg-blue-400 transition-colors">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>

            <button onclick="enterMainSystem()" class="w-full py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-black rounded-[2rem] shadow-[0_20px_40px_rgba(234,179,8,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300 text-lg">
                ENTER MANGO OS
            </button>
        </div>
    `;
}

// 4. 확산 기능: 스마트폰 공유창 연동
async function shareMango() {
    const shareText = `[Mango OS] @${mangoUser.username}님이 당신을 초대했습니다!\n초대코드: ${mangoUser.username.toUpperCase()}\n지금 접속해서 파이 생태계를 경험하세요!`;
    if (navigator.share) {
        try {
            await navigator.share({ title: 'Mango OS 초대', text: shareText, url: window.location.href });
        } catch (e) { console.error(e); }
    } else {
        copyReferral(shareText);
    }
}

function copyReferral(text = mangoUser.username.toUpperCase()) {
    navigator.clipboard.writeText(text);
    showMangoToast("✅ 복사 완료! 친구에게 전달하세요.");
}
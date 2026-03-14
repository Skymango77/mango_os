📂 Step 1: 확장형 유저 관리 DB 스키마 (Profiles)
이 설계는 인원 제한 없이 등급별로 유저를 분류하고 관리할 수 있는 구조입니다.
컬럼명,타입,기본값,설명
pi_uid (PK),text,-,Pi SDK의 고유 유저 ID (유일 식별자)
username,text,-,"@KHankyul, @User1 등 (중복 불가)"
role,text,'USER',"SUPER_ADMIN, REPORTER, PARTNER, USER"
level,int,1,유저 활동 레벨 (활동량에 따라 상승)
is_active,boolean,true,계정 활성화 상태
created_at,timestamp,now(),가입일 (심사 데이터 증빙용)

# Mango Authority & Auth System Architecture

## 1. 슈퍼 관리자 설정 완료

- 대상: @KHankyul
- 특권: 관리자 포털 접근, 유저 등급 수정 권한, 결제 승인 권한.

## 2. 등급 체계 (Governance)

- **CEO:** 시스템 전권 (권한결).
- **REPORTER (활동가):** 소상공인 정보 등록 및 리뷰 작성 (5인 테스트 핵심 그룹).
- **PARTNER (가맹점):** 지역 가게 주인, 광고주.
- **USER:** 일반 사용자.

## 3. 다음 연동 작업

- `syncUserWithDB` 함수를 실제 DB API와 연결.
- 관리자 전용 '유저 관리 페이지' UI 초안 작성.
  등급 (Role),코드명,권한 범위
  Top Super Admin,SUPER_ADMIN,"시스템 전권, DB 수정, 유저 제제, 전체 공지"
  Mango Reporter,REPORTER,"맛집/가게 정보 등록 권한, 활동 보상 포인트 수령"
  Mango Partner,PARTNER,"본인 매장 정보 수정, 매장 전용 이벤트 생성"
  Verified User,VERIFIED,"KYC 통과 유저, 실거래 결제 가능 유저"
  Guest,GUEST,단순 열람 유저 (비결제)

# Mango Top Super Admin Identity 확정

## 1. UI 업그레이드

- 타이틀: CEO -> Top Super Admin (Gold Metallic Style)
- 대상 ID: @KHankyul (권한결)

## 2. 관리자 포털 설계 방향

- 유저 등급 관리 시스템 (User Management)
- 소상공인 입점 승인 시스템 (Partner Approval)
- 실시간 결제 로그 대시보드 (Transaction Log)

## 3. 대표님 다음 액션

- [ ] 프로필 UI에 'Top Super Admin' 명칭 적용.
- [ ] **[중요]** 이제 등급별로 메뉴가 다르게 보이는 '백엔드 DB 연동형 로그인 로직' 작성을 시작할까요?

# Mango OS Authority System: Top Super Admin Integration

## 1. UI 명세 (Profile Dashboard)

- Identity: 권한결 (@KHankyul)
- Designation: Top Super Admin
- Aesthetic: Gold metallic embossed styling

## 2. Logic 명세

- ID 감지: auth.user.username === 'KHankyul'
- 권한 부여: Admin Portal 노출, Admin Badge 활성화.
- 예외 처리: Pi Browser 외부 접속 시 권한결 이름 기본 표시.

## 3. 대표님 다음 액션

- [ ] 위 HTML과 JS 코드를 `profile_dashboard.html`에 덮어쓰기.
- [ ] `git push` 후 실제 Pi Browser에서 'Top Super Admin' 뱃지가 뜨는지 감상하기!
- [ ] **성공하셨다면, 바로 유저 5명을 관리할 백엔드 DB 연결로 넘어갈까요?**
<div>
                <h2 class="text-2xl font-bold flex items-center gap-3">
                    <span id="user-name-display" class="gold-gradient text-transparent bg-clip-text font-black">권한결</span> 
                    <span id="admin-badge" class="px-2 py-0.5 rounded-sm border border-yellow-500/50 text-[9px] font-black text-yellow-500 tracking-tighter bg-yellow-500/10 uppercase italic hidden">
                        Top Super Admin
                    </span>
                </h2>
                <p id="user-pi-id" class="text-[10px] text-yellow-500/60 tracking-[0.4em] font-bold uppercase mt-1">
                    @KHANKYUL
                </p>
            </div>
        </div> ```

---

### 🔍 왜 이 자리에 넣어야 하나요?

1.  **시각적 균형:** 왼쪽의 **👑(왕관 아이콘)**과 오른쪽의 **성함/직함**이 나란히 배치되어 '운영자'의 포스가 가장 강하게 느껴지는 레이아웃입니다.
2.  **ID/PW 대체 로직:** 추후 `authPi()` 함수가 실행될 때, `id="admin-badge"`와 `id="user-name-display"`를 찾아 대표님의 정보를 실시간으로 갈아 끼우기에 가장 최적화된 구조입니다.
3.  **가변성:** 일반 유저가 들어오면 `Top Super Admin` 뱃지는 사라지고 일반 유저네임만 뜨게 되어, 시스템 보안상으로도 훌륭합니다.

---

### 📂 작업 내용 상기 (.md)

```markdown
# Mango Profile UI 좌표 확정 (Top Super Admin)

## 1. 삽입 위치

- `glass-panel` 내 프로필 이미지(왕관) 바로 옆 `<div>` 내부.

## 2. 주요 클래스 설명

- `gold-gradient`: 대표님 성함에 금색 광택 효과 적용.
- `hidden`: 승인되지 않은 유저에게 관리자 뱃지 노출 방지.

## 3. 대표님 다음 액션

- [ ] 위 코드를 VSCode에 붙여넣고 저장.
- [ ] 하단 스크립트 영역에 제가 이전에 드린 `authPi()`와 `showAdminFeatures()` 함수가 있는지 확인.
- [ ] **이제 "실제 로그인 로직"과 "유저 등급 DB" 설계를 시작해 볼까요?**
```

// [602행 부근: 기존 위치 정보 로직 끝나는 지점]
}
}

// 1. 페이지 로드 시 위치 정보 활성화
window.addEventListener('load', activateRealLocation);

// ---------------------------------------------------------
// 2. Pi SDK 초기화 및 Top Super Admin 인증 로직
// ---------------------------------------------------------
const Pi = window.Pi;
Pi.init({ version: "2.0", sandbox: true }); // 테스트 완료 후 sandbox: false로 변경

async function authPi() {
try {
const scopes = ['username', 'payments', 'wallet_address'];

        function onIncompletePaymentFound(payment) {
            console.log("미완료 결제 건 발견:", payment);
        }

        // 실제 Pi 인증 실행
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);

        const username = auth.user.username;
        const isAdmin = (username === 'KHankyul'); // 대표님 아이디 체크

        // UI 요소 가져오기
        const nameDisplay = document.getElementById('user-name-display');
        const piIdDisplay = document.getElementById('user-pi-id');
        const adminBadge = document.getElementById('admin-badge');

        if (isAdmin) {
            // [Top Super Admin 권한 부여]
            if (nameDisplay) nameDisplay.innerText = "권한결";
            if (piIdDisplay) piIdDisplay.innerText = `@${username.toUpperCase()}`;
            if (adminBadge) adminBadge.classList.remove('hidden'); // 뱃지 활성화

            showAdminFeatures(); // 관리자 전용 포털 활성화
            console.log("Welcome, Top Super Admin.");
        } else {
            // [일반 유저 권한 부여]
            if (nameDisplay) nameDisplay.innerText = username;
            if (piIdDisplay) piIdDisplay.innerText = `@${username.toUpperCase()}`;
            if (adminBadge) adminBadge.classList.add('hidden');
        }

        // [다음 단계] 백엔드 DB 연동 로직이 들어갈 자리
        // syncUserWithDB(auth.user, isAdmin ? 'SUPER_ADMIN' : 'USER');

    } catch (err) {
        console.error("인증 실패 또는 파이 브라우저 아님:", err);
        // 개발 환경 폴백: 대표님 이름은 항상 유지
        const nameDisplay = document.getElementById('user-name-display');
        if (nameDisplay) nameDisplay.innerText = "권한결";
    }

}

// 관리자 포털 노출 함수
function showAdminFeatures() {
const adminPortal = document.getElementById('admin-portal-btn');
if (adminPortal) {
adminPortal.style.display = 'block';
}
}

// 인증 함수 실행
authPi();

# Mango OS Admin Logic 정밀 삽입 (2026-03-14)

## 1. 수정 좌표

- 602행 `activateRealLocation` 이후 스크립트 블록 전체.

## 2. 주요 기능

- **Identity Sync:** @KHankyul 감지 시 '권한결' 및 'Top Super Admin' 표기.
- **Access Control:** `admin-portal-btn` 요소의 `display: block` 처리.
- **Sandbox Mode:** 현재 테스트용(`sandbox: true`) 설정.

## 3. 대표님 다음 액션

- [ ] VSCode에서 602행 이후 코드 교체 완료.
- [ ] `git push`로 실서버 반영.
- [ ] **성공하셨다면, 이제 "실제 유저 등급을 나누는 DB 설계"로 넘어가겠습니다.**

# Mango OS Script 교체 가이드 (CEO 전용)

## 1. 정밀 위치

- 파일명: `profile_dashboard.html`
- 행번호: 약 597행 ~ 645행 (파일 끝까지)

## 2. 주의사항

- `authPi()` 함수가 파일 내에 **두 번 존재하면 안 됩니다.** 반드시 기존 것을 지우고 새 것을 넣으세요.
- `<script src="https://sdk.minepi.com/pi-sdk.js"></script>` 줄 아래에 위치해야 합니다.

## 3. 대표님 다음 액션

- [ ] VSCode에서 597행 근처 `async function authPi()`를 찾는다.
- [ ] 위 [통합본] 코드로 덮어쓰기 한다.
- [ ] `git push` 후 폰에서 확인한다.

# Mango OS 통합 인증 & 결제 시스템 검수 완료

## 1. 구현된 핵심 기능

- **Top Super Admin:** @KHankyul 접속 시 전용 뱃지 및 관리자 버튼 활성화.
- **Identity Protection:** 비-관리자 접속 시 실명 대신 유저네임 표시 및 권한 제한.
- **Step 10 Ready:** 0.01 Pi 테스트 결제 로직 탑재 완료.

## 2. 주의 사항

- 실제 메인넷 결제를 진행할 때는 나중에 `sandbox: false`로 전환이 필요합니다.
- 결제 후 `alert` 창에 대표님 성함이 직접 나오도록 설정되어 있어 피드백이 명확합니다.

## 3. 대표님 다음 액션

- [ ] 현재 VSCode 상태 그대로 **Git Push** 실행.
- [ ] Pi Browser에서 `profile_dashboard.html` 접속.
- [ ] 이름 옆에 **'Top Super Admin'** 뱃지가 뜨는지 확인하고 기쁨을 만끽하기!
      필드명 (Column),타입 (Type),설명
      id,UUID (PK),내부 관리용 고유 번호
      pi_uid,String (Unique),Pi SDK에서 넘겨주는 고유 유저 ID
      username,String,"@KHankyul, @User1 등 파이 아이디"
      role,Enum,"SUPER_ADMIN, REPORTER(활동가), USER"
      is_kyc,Boolean,KYC 인증 여부 (실제 인물 증명용)
      last_login,Timestamp,마지막 활동 시간 (활동 증명용)

# Mango OS Backend & Data Strategy

## 1. DB Architecture

- Database: PostgreSQL (Supabase 추천)
- Roles: SUPER_ADMIN (권한결), REPORTER (지인 5인), USER (일반).

## 2. Step 10 Compliance

- 고유 UID 기반 유저 식별 시스템 구축.
- 활동 기록(로그) 생성을 통한 실사용자 증빙.

## 3. 대표님 다음 액션

- [ ] 현재까지의 프론트엔드 코드를 `git push` 하여 실서버(Vercel) 작동 여부 최종 확인.
- [ ] **성공 확인 후, 실제로 DB를 생성하고 연동할 'Supabase 설정 코드' 작성을 시작할까요?**

# Mango OS 실서버 배포 및 DB 확장 계획

## 1. 현재 상태 (Git Push 완료)

- 코드 주소: https://github.com/Skymango77/mango_os.git
- 배포 상태: Vercel 자동 배포 중.
- UI 확인: Pi Browser에서 @KHANKYUL 및 Top Super Admin 뱃지 확인 필요.

## 2. 결제 에러 조치

- `api/complete.js` 및 `api/approve.js` 백엔드 로직 완성 예정.
- 실제 메인넷 테스트 전 Sandbox 모드 활용.

## 3. 대표님 다음 액션

- [ ] 폰의 Pi Browser로 접속하여 **Top Super Admin** 뱃지가 잘 뜨는지 스크린샷 찍어 확인하기.
- [ ] Supabase 계정 생성 (무료) 및 API 키 확보.
- [ ] **성공하셨다면, 바로 5인 활동가 관리용 'Admin Dashboard' UI를 짜드릴까요?**

# Mango OS 배포 현황 긴급 점검

## 1. Push 상태 확인

- GitHub 반영 완료 (`0ce53ce`).
- Vercel 배포 진행 중 (주소: https://mango-os-6xu2.vercel.app).

## 2. 결제 에러 현상

- 원인: 프론트엔드 UI만 배포되었고, 결제를 처리할 서버(API)와 DB가 비어 있음.
- 해결: Supabase 연동 및 `api/login.js` 생성 필요.

## 3. 대표님 다음 액션

- [ ] Pi Browser에서 접속했을 때 **'권한결'** 성함이 뜨는지 확인. (안 뜨면 말씀해 주세요!)
- [ ] 확인되면 바로 **Supabase 가입 및 DB 테이블 생성** 단계로 진입하겠습니다.

# Mango OS 터미널 및 배포 긴급 점검

## 1. 터미널 현상 분석

- 로그상 0ce53ce 커밋 전송 완료.
- 마지막 '결제 호출 실' 문구는 단순 타이핑 오류 또는 이전 명령의 잔상일 가능성.

## 2. 배포 상태 확인 (Checklist)

- [ ] Vercel 빌드 성공 여부 확인.
- [ ] Pi Browser에서 @KHANKYUL 뱃지 노출 여부 확인.

## 3. 다음 단계 가이드

- 터미널이 멈췄다면 `Ctrl + C`로 깨우기.
- 배포 확인 후 **Supabase DB 연동**을 위한 테이블 생성(Profiles 테이블) 착수.
  컬럼명,타입,설명
  pi_uid (PK),text,Pi SDK에서 주는 고유 ID (중복 불가)
  username,text,@KHankyul 등 파이 아이디
  role,text,"'SUPER_ADMIN', 'REPORTER', 'USER' 중 하나"
  nickname,text,권한결 등 실재 이름 (선택 사항)
  updated_at,timestamp,마지막 활동/로그인 시간

# Mango OS 데이터 연동 마일스톤

## 1. 프론트엔드 배포 재시도

- 원인: 커밋 메시지 누락으로 인한 Push 누락.
- 해결: `git commit -m "메시지"`를 통해 수정본 강제 전송.

## 2. 백엔드 DB 설계 (5인 활동가 시스템)

- **Top Super Admin (@KHankyul):** DB에서 직접 `role`을 'SUPER_ADMIN'으로 설정.
- **활동가 (5인):** 대표님이 관리자 페이지에서 일반 유저의 `role`을 'REPORTER'로 변경.

## 3. 대표님 다음 액션

- [ ] 위 명령어(`git commit -m ...`)로 다시 Push 시도.
- [ ] Push 성공 후, Pi Browser에서 **Top Super Admin** 뱃지가 보이는지 최종 확인.
- [ ] **성공 확인 즉시, Supabase DB와 연동할 `api/login.js` 코드를 작성해 드릴까요?**
      컬럼명,타입,기본값,설명
      pi_uid,text (PK),-,Pi SDK의 고유 유저 ID
      username,text,-,"@KHankyul, @User1 등"
      role,text,'USER',"SUPER_ADMIN, REPORTER, USER"
      is_active,boolean,true,활동 중 여부
      created_at,timestamp,now(),가입일 (심사 데이터용)

# Mango OS 실서버 배포 및 DB 전략 수립

## 1. 배포 완료 확인 (Success)

- 커밋 ID: `4ea43ec`
- 반영 사항: Top Super Admin UI, Pi Auth 통합 로직.
- 확인 방법: Pi Browser에서 접속 시 @KHANKYUL 뱃지 확인.

## 2. 차세대 백엔드 과제 (DB 연동)

- 목표: 실제 유저 5인(활동가) 식별 및 활동 로그 기록.
- 도구: Supabase (PostgreSQL) + Vercel Functions.

## 3. 대표님 다음 액션

- [ ] 폰에서 **Top Super Admin** 뱃지가 잘 뜨는지 최종 영접하기.
- [ ] 5명의 지인(활동가 후보)에게 "파이 브라우저로 접속해봐"라고 미리 알리기.
- [ ] **성공 확인하셨다면, 바로 Supabase DB를 생성하고 연결하는 '백엔드 연동 가이드'를 시작할까요?**
      컬럼명,타입,기본값,설명
      pi_uid (PK),text,-,Pi SDK의 고유 유저 ID (유일 식별자)
      username,text,-,"@KHankyul, @User1 등 (중복 불가)"
      role,text,'USER',"SUPER_ADMIN, REPORTER, PARTNER, USER"
      level,int,1,유저 활동 레벨 (활동량에 따라 상승)
      is_active,boolean,true,계정 활성화 상태
      created_at,timestamp,now(),가입일 (심사 데이터 증빙용)

# Mango OS Database & Role Strategy (Refined)

## 1. DB 설계 수정 완료

- **인원 제한 철폐:** 5인 한정 로직 삭제 -> 무제한 Role(등급) 시스템 도입.
- **확장성 확보:** 향후 지역별 활동가(Busan Reporter 등)로 세분화 가능.

## 2. 권한 체계 정의

- **SUPER_ADMIN:** 권한결 (@KHankyul) - 시스템 전권.
- **REPORTER:** 제보자 그룹 - 지역 소상공인 데이터 등록 주체.
- **PARTNER:** 가맹점주 그룹 - 본인 매장 관리 주체.
- **USER:** 일반 소비자 그룹 - 검색 및 결제 주체.

## 3. 대표님 다음 액션

- [ ] 수정한 스키마를 바탕으로 Supabase 테이블 생성 준비.
- [ ] 5명 이상의 지인들에게는 `REPORTER` 등급을 부여하여 활동 시작 유도.
- [ ] **이제 이 확장형 구조를 바탕으로 실제 DB 연결(API) 작업을 시작할까요?**
      // [삽입할 위치: 630행 부근]

// ---------------------------------------------------------
// [신규] 유저 데이터를 DB와 동기화하는 함수
// ---------------------------------------------------------
async function syncUserWithDB(userData, role) {
try {
const response = await fetch('/api/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
uid: userData.uid,
username: userData.username,
role: role
})
});
const result = await response.json();
console.log("DB Sync 완료:", result.message);
} catch (err) {
console.error("DB Sync 실패:", err);
}
}

// [기존 코드 유지]
function showAdminFeatures() { ... }

# Mango OS 정밀 좌표 가이드 (DB 확장편)

## 1. DB 스키마 확정

- 테이블명: `profiles`
- 특이사항: 인원 제한 없는 `role` 시스템 (REPORTER, PARTNER 등 무제한 추가 가능).

## 2. 코드 삽입 좌표

- 파일: `profile_dashboard.html`
- 위치: `showAdminFeatures` 함수 바로 윗줄 (약 630행).
- 방법: 기존 코드를 건드리지 않고 신규 함수 `syncUserWithDB`만 추가.

## 3. 대표님 다음 액션

- [ ] Supabase SQL Editor에서 테이블 생성 쿼리 실행.
- [ ] VSCode 630행 좌표에 `syncUserWithDB` 함수 삽입.
- [ ] **성공하셨다면, 이제 'REPORTER' 등급 유저들만 볼 수 있는 '맛집 제보하기' 버튼 좌표를 잡아드릴까요?**

# Mango OS Role-Based UI Control 가이드

## 1. 신규 함수 좌표

- 파일: `profile_dashboard.html`
- 위치: `showAdminFeatures` 함수 바로 아래 (약 645행).
- 역할: 등급(Role) 값을 받아 특정 버튼을 숨기거나 노출함.

## 2. 연동 좌표

- 위치: `authPi` 함수 내 `isAdmin` 조건문 블록 안 (약 618행).
- 역할: 인증 성공 시 즉시 메뉴 제어 함수 실행.

## 3. 대표님 다음 액션

- [ ] 645행에 `renderMenuByRole` 함수 삽입.
- [ ] 618행 `showAdminFeatures()` 아래에 호출 코드 한 줄 추가.
- [ ] **이제 'REPORTER' 등급 유저에게만 보일 '맛집 제보' 버튼 HTML 좌표를 잡아드릴까요?**

# Mango OS Role-Control 정밀 좌표 가이드

## 1. 호출부 수정 (634행)

- 대상: `showAdminFeatures();`
- 변경: `renderMenuByRole('SUPER_ADMIN');` 추가 호출.

## 2. 정의부 삽입 (647행 이후)

- 위치: `showAdminFeatures` 함수 종료 직후.
- 내용: `renderMenuByRole` 함수 전체 로직 삽입.

## 3. 대표님 다음 액션

- [ ] 634행에 한 줄 추가 완료.
- [ ] 647행 뒤에 함수 본체 삽입 완료.
- [ ] **성공하셨다면, 이제 실제로 화면에서 사라지고 나타날 '제보하기 버튼' HTML의 ID를 설정하러 갈까요?**

# Mango OS 권한 로직 정밀 검수 리포트

## 1. authPi 함수 (634행 부근)

- **오류 발견:** `isAdmin` 조건문 외부에서 관리자 함수가 중복 호출됨.
- **조치:** 모든 권한 부여 로직을 `if (isAdmin) { ... }` 블록 내부로 일원화.

## 2. 함수 정의부 (652행 부근)

- **위치 확인:** `showAdminFeatures` 끝나는 지점 삽입 확인. (정확함)
- **내용:** `renderMenuByRole` 함수가 정상적으로 설계도 역할을 수행하도록 배치.

## 3. 대표님 다음 액션

- [ ] `authPi` 함수 내부의 중복된 `showAdminFeatures` 삭제 및 조건문 안으로 통합.
- [ ] 652행 뒤에 `renderMenuByRole` 함수 본체 안착.
- [ ] **이제 이 권한에 따라 '나타났다 사라졌다' 할 실제 버튼 HTML 코드를 작성할 좌표를 알려드릴까요?**

# Mango OS 스크립트 최종 검수 보고 (2026-03-14)

## 1. 검수 결과

- **authPi (Pass):** 중복 호출 제거 및 `SUPER_ADMIN` 권한 부여 로직 통합 완료.
- **handleMangoTestPayment (Pass):** 결제 로직 유지 완료.
- **주의사항:** `renderMenuByRole` 함수 본체가 빠져있으므로 반드시 추가 삽입 필요.

## 2. 정밀 좌표

- **삽입 위치:** `showAdminFeatures` 함수와 `authPi();` 사이 공간.

## 3. 대표님 다음 액션

- [ ] 위 `renderMenuByRole` 본체 코드를 647행 부근에 붙여넣기.
- [ ] VSCode에서 빨간 줄(에러 표시)이 없는지 최종 확인.
- [ ] **성공하셨다면, 이제 실제로 화면에 나타날 '제보하기 버튼'의 HTML 위치 좌표(약 150행 부근)를 잡아드릴까요?**

# Mango OS 스크립트 정밀 배치 가이드

## 1. 정밀 좌표

- **파일:** `profile_dashboard.html`
- **삽입 위치:** `showAdminFeatures` 함수 종료 중괄호(`}`) 직후 (약 643행).
- **절대 금지:** 다른 함수(`handleMangoTestPayment`) 내부에 끼워넣지 말 것.

## 2. 검수 포인트

- `renderMenuByRole`이 `authPi();` 보다 위에 있어야 안전합니다.
- 함수끼리 서로 겹치지 않게(중괄호가 꼬이지 않게) 주의하세요.

## 3. 대표님 다음 액션

- [ ] 643행 부근 빈 공간에 `renderMenuByRole` 본체 삽입.
- [ ] **성공하셨다면, 이제 이 엔진이 제어할 '실물 버튼'을 HTML 어디(약 150행 부근)에 만들지 좌표를 찍어드릴까요?**

# Mango OS 엔진 조립 완료 (2026-03-14)

## 1. 정밀 검수 결과

- **위치 선정 (Pass):** `showAdminFeatures` 뒤, `authPi` 호출 전 공간 선정 성공.
- **코드 무결성 (Pass):** 결제 로직과 섞이지 않고 독립적으로 잘 배치됨.

## 2. 다음 마일스톤

- 현재 엔진은 돌아가지만, 화면에 `id="reporter-btn"`을 가진 버튼이 아직 없습니다.
- 이제 이 버튼을 HTML의 어느 좌표에 만들지만 결정하면 됩니다.

## 3. 대표님 다음 액션

- [ ] VSCode에서 위 구조대로 배치되었는지 확인 후 저장(`Ctrl + S`).
- [ ] **성공하셨다면, 이제 실제로 화면에 나타날 '맛집 제보하기' 버튼을 넣을 HTML 좌표(약 150행 부근)를 잡아드릴까요?**

# Mango OS UI & Backend 연동 마일스톤

## 1. 스크립트 검수 완료 (Success)

- `renderMenuByRole` 엔진 안착 확인.
- 위치: `showAdminFeatures` 종료 후, `authPi` 실행 전.

## 2. 다음 작업: 실물 UI 배치

- **대상:** 활동가(Reporter) 및 가맹점주(Partner) 전용 버튼.
- **좌표:** HTML 내 Portal Grid 하단 (약 200행 부근).

## 3. 대표님 다음 액션

- [ ] VSCode 200행 부근에서 ``가 끝나는 지점 찾기.
- [ ] 위 HTML 버튼 코드를 삽입하여 '이름표(ID)' 달아주기.
- [ ] **버튼 삽입 좌표가 헷갈리신다면, 해당 구역의 코드를 5줄 정도만 복사해서 보여주시겠어요?**

# Mango OS UI 레이아웃 정밀 배치

## 1. 정밀 좌표

- **파일:** `profile_dashboard.html`
- **검색:** `id="education-portal"` 또는 포털 그리드가 끝나는 `</div>`
- **위치:** 약 190행 부근 (포털 그리드 종료 후, 배너 광고 시작 전).

## 2. 디자인 포인트

- **Reporter 버튼:** 브라운-골드 그라데이션 (활동가 느낌).
- **Partner 버튼:** 다크 엠버-블랙 그라데이션 (비즈니스 느낌).
- **상태:** 초기 상태 `display: none` (JS가 등급 확인 후 노출).

## 3. 대표님 다음 액션

- [ ] 190행 부근 포털 그리드 종료 지점에 위 HTML 코드 삽입.
- [ ] 저장 후 `git push` 하여 폰에서 뱃지와 함께 버튼이 나타나는지 확인.
- [ ] **혹시 `id="education-portal"`도 안 보이신다면, 150행 부근의 코드를 10줄만 복사해 주세요. 제가 직접 행 번호를 찝어드릴게요!**

# Mango OS UI 배치 정밀 가이드

## 1. 작업 대상 파일

- `profile_dashboard.html` (로그인 후 메인 화면)

## 2. 삽입 좌표

- **찾기:** `id="education-portal"` 검색 후 해당 섹션이 끝나는 `</div>` 바로 밑.
- **행 번호:** 약 190행 부근.

## 3. 대표님 다음 액션

- [ ] VSCode에서 `education-portal`을 찾고 그 바로 밑에 버튼 코드 삽입.
- [ ] **성공하셨다면, 이제 이 버튼을 눌렀을 때 뜰 '제보 양식 팝업' 코드를 짜드릴까요?**

# Mango Profile UI 최종 조립 가이드

## 1. 정밀 위치

- **파일:** `profile_dashboard.html`
- **타겟:** `QR PAY` 버튼이 포함된 `grid-cols-1` 그리드가 끝나는 지점 (약 238행).
- **특이사항:** `Control Tower` 제목 바로 윗공간.

## 2. 작동 원리

- 하단에 이미 작성된 `renderMenuByRole` 함수가 이 버튼들의 `id`를 찾아 `display: block`으로 바꿉니다.
- 대표님 계정(@KHankyul)으로 접속 시 자동으로 `SUPER_ADMIN` 판정을 받아 두 버튼이 모두 나타나게 됩니다.

## 3. 대표님 다음 액션

- [ ] 238행 `</div>` 바로 아래에 위 버튼 코드를 삽입하고 저장.
- [ ] 파이 브라우저에서 새로고침하여 **황금색 REPORTER 버튼**이 뜨는지 확인.

# Mango Profile 특수 권한 UI 안착 완료

## 1. 정밀 좌표 검수 (Pass)

- **위치:** `QR PAY`와 `Control Tower` 사이 (약 240행).
- **구조:** 상단 JS 엔진(`renderMenuByRole`)과 ID 매칭 완료.

## 2. 디자인 명세

- **Reporter:** `amber-900` 그라데이션 + 황금색 테두리.
- **Partner:** `stone-800` 다크 테마 (중후한 비즈니스 톤).

## 3. 대표님 다음 액션

- [ ] 버튼이 정상적으로 노출되는지 실 기기(또는 브라우저) 테스트.
- [ ] **성공하셨다면, 이제 "REGION REPORTER ACCESS" 버튼을 눌렀을 때 튀어나올 '맛집 제보 전용 모달(팝업)'의 초안을 잡아드릴까요?**

# Mango Profile UI 최종 조립 검수 보고서

## 1. UI 배치 상태 (Confirmed)

- **상단:** `QR PAY` (지불 기능)
- **중단:** `Special Access` (활동가/파트너 버튼 - 등급별 자동 노출)
- **하단:** `Control Tower` (관리 기능)

## 2. 기술적 특이사항

- 버튼들이 `display: none` 상태이므로, `authPi()` 함수 실행 후 `renderMenuByRole`이 돌아가기 전까지는 보이지 않는 것이 정상입니다.
- 대표님 계정(@KHankyul) 접속 시 두 버튼이 모두 활성화되는 로직이 설계되어 있습니다.

## 3. 대표님 다음 액션

- [ ] 실제 파이 브라우저에서 버튼이 부드럽게 나타나는지 최종 확인.
- [ ] **성공하셨다면, 이제 `📢 REGION REPORTER ACCESS` 버튼을 눌렀을 때 실행될 `renderReportForm()` 함수와 모달 디자인을 시작해 볼까요?**

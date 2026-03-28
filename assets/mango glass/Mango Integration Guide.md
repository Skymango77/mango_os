Mango Global Payment & Security 연동 가이드이 문서는 Payment & Booking 시스템의 결과 데이터를 active-trip.html (Security UI)로 전달하는 방법을 설명합니다.1. 파일 구조 (최종)mango/
└── transfer-portal/
├── js/
│ ├── payment-engine.js # 결제 및 예약 로직 (기존)
│ └── security-engine.js # 보안 감지 로직 (신규)
└── views/
├── booking-pay.html # 결제 진행 화면 (기존)
└── active-trip.html # 운행 중 & 보안 화면 (신규) 2. 연동 흐름 (Workflow)Step 1: 결제 성공 시 데이터 전달booking-pay.html에서 결제가 성공하는 시점에 아래 코드를 실행하여 정보를 넘겨줍니다.// payment-engine.js의 일부 예시
function onPaymentSuccess(paymentData) {
const tripData = {
bookingId: paymentData.id,
driverName: "김망고",
carNumber: "12가 3456",
amount: paymentData.amount,
safetyPin: "8829" // 시스템에서 생성한 보안 번호
};

    // 로컬 스토리지에 저장하여 active-trip.html에서 꺼내 쓰게 함
    localStorage.setItem('current_trip', JSON.stringify(tripData));

    // 보안 화면으로 이동
    window.location.href = 'active-trip.html';

}
Step 2: active-trip.html에서 데이터 수신 및 반영보안 화면이 열릴 때 저장된 데이터를 불러와 UI를 업데이트합니다.// active-trip.html 내부 스크립트
window.onload = function() {
const data = JSON.parse(localStorage.getItem('current_trip'));
if (data) {
document.getElementById('ui-driver-name').innerText = data.driverName;
document.getElementById('ui-car-number').innerText = data.carNumber;
document.getElementById('ui-amount').innerText = "₩" + data.amount.toLocaleString();
// 보안 PIN 코드 활성화
console.log("보안 PIN 확인됨:", data.safetyPin);
}
}; 3. 실시간 보안 연동 (AI Security)운행 중 보안 이벤트(경로 이탈 등)가 발생하면 security-engine.js가 결제 시스템에 알림을 보내 "결제 일시 정지" 또는 "긴급 신고"를 수행합니다.

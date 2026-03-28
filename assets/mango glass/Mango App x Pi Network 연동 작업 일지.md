📝 Mango App x Pi Network 연동 작업 일지
[2026-02-21] Mango App - Pi Network SDK 초기 연동 및 검수

1. 작업 개요
   목적: Mango App 내 파이 코인 결제 및 유저 인증 시스템 구축을 위한 기초 SDK 연동

대상: index.html (메인 레이아웃 및 스크립트 섹션)

2. 주요 변경 사항
   🚀 SDK 인프라 구축
   SDK 로드: <head> 최상단(11행)에 공식 Pi SDK 스크립트(pi-sdk.js) 삽입 완료.

초기화 로직: Pi.init() 함수를 통해 버전 2.0 및 sandbox: true 모드 설정.

인증 시스템: Pi.authenticate()를 호출하여 유저 정보(username) 및 결제 권한(payments) 스코프 확보.

🎨 레이아웃 정밀 조정
배너 위치 최적화: 기존 final-banner-fix를 광고 피드 최하단으로 이동.

간격 가이드 준수:

롯데시네마 카드와 트래블 배너 사이 5mm 간격 적용.

기존의 이상 마진(-80px) 제거 및 규격 통일(92%, 430px).

3. 검수 결과 (Console Log)
   [x] SDK 로드: 성공 (✅ Pi SDK 초기화 성공 로그 확인)

[!] Origin Mismatch: 로컬 테스트 환경(127.0.0.1)에 따른 보안 경고 발생 확인 (실서버 및 Pi Browser 접속 시 해결될 이슈로 판단)

4. 향후 계획 (Next Step)
   결제 함수 구현: 특정 상품 클릭 시 1 Pi를 전송하는 createPayment 로직 추가.

서버 사이드 검증: 앱 엔진과 파이 플랫폼 간의 결제 승인(App-to-App) 연동.

유저 커스터마이징: 인증된 파이 유저의 이름을 헤더에 실시간 바인딩.

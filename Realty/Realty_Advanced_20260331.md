# 🥭 Mango Realty UI Advanced Update (2026-03-31)

## 1. 현재 작업 위치 및 맥락

- **Time/Location:** 2026년 3월 31일, 부산 (MVP 핵심 테스트 베드). 향후 싱가포르(2027), 글로벌(2028-2029)로 확장하기 위한 초기 하이엔드 UI 확립.
- **Goal:** 직방, Zillow를 뛰어넘는 하이엔드 글로벌 부동산 플랫폼 디자인 적용.

## 2. 메인 윈도우 레이아웃 제약 사항 (필독)

- `realty_portal`의 가로 폭(Width)은 **반드시** 아래의 윈도우들과 동일한 크기를 유지할 것.
  - `food_portal`, `transfer_portal`, `travel_portal`, `hobby_portal`, `market_portal`, `social_portal`, `admin_portal`
  - 배너 광고 윈도우
  - 지속적으로 위아래로 움직이는 Pi Network 뉴스 스크롤 윈도우

## 3. 이번 업데이트 적용 사항 (RealtyPortalCard)

- **Glassmorphism 적용:** `bg-white/10 backdrop-blur-md` 기반의 고급스러운 반투명 효과.
- **애니메이션:** Framer Motion을 이용한 호버 스케일 업 및 Floating 효과.
- **AI Score & 3D Tour UI:** 골드(#FFD700)와 망고(#FF8C00) 톤을 활용한 강력한 시각적 포인트(투자 점수 뱃지, 프로그레스 바).
- **데이터 구조:** `city`, `country`, `price`(Pi), `investmentScore` 반영 완료.

## 4. Next Step

- Pi Browser SDK 연동 시 모달 결제창(0.01 Pi 프리미엄 등록)을 이 카드 디자인 톤앤매너(다크/글래스)에 맞춰 고도화할 것.

# 🥭 Mango Realty: Luxury Map Search Update (2026-03-31)

## 1. 개발 맥락 및 위치

- **위치:** 대한민국 부산 센텀시티 (글로벌 진출을 위한 테스트베드).
- **비전:** 2026년 부산을 시작으로, 2027년 싱가포르, 2028년 두바이/런던 매물을 연결하는 세계 최대 Web3 부동산 지도 구축.

## 2. 디자인 시스템 가이드 (Top Designer 필수 준수)

- **Portal Consistency:** `realty_map_window`의 폭은 `food_portal`, `education_portal` 등 8개 핵심 포털 및 뉴스 스크롤 윈도우와 동일한 420px로 고정.
- **Color Palette:** - Base: Deep Black / Charcoal (#121212)
  - Point: Mango Orange (#FF8C00) / Gold Line (#FFD700)
  - Effect: Glassmorphism (Background Blur 20px 이상)

## 3. 핵심 기능 구현 현황

- [x] Luxury Dark 테마 지도 레이아웃 설계.
- [x] Floating Glassmorphism 검색 필터 바 컴포넌트화.
- [x] 매물 선택 시 하단 'Quick Summary Card' 애니메이션(Framer Motion) 적용.
- [x] Pi Network 결제 유도를 위한 가격 단위(Pi) 시각화 최적화.

## 4. 향후 과제

- 실제 Mapbox/Google Maps API 토큰 연결 및 Custom Marker 디자인 적용.
- 사용자 현재 위치(GPS) 추적을 통한 "주변 프리미엄 매물 알림" 푸시 기능.

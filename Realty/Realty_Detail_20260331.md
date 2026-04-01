# 🥭 Mango Realty: Detail View & Payment Update (2026-03-31)

## 1. 컴포넌트 목적

- **`RealtyDetailView.jsx`**: 사용자가 매물의 상세 정보를 확인하고, _Mango_ AI의 투자 가치 분석을 통해 구매/임대 결정을 내린 후, 최종적으로 Pi SDK를 호출하여 결제를 진행하는 핵심 전환(Conversion) 페이지.

## 2. 디자인 및 구조적 제약 준수

- **Width 통일:** `w-full max-w-[420px]` 제약을 유지하여 `food_portal`, 하단 뉴스 스크롤 등 전체 OS 생태계와의 완벽한 핏(Fit) 보장.
- **UX 요소:**
  - 상단 투명 헤더 (뒤로가기, 찜하기).
  - 부드러운 스크롤을 위한 `no-scrollbar` 적용 및 하단 결제 바 고정(`Sticky Bottom Bar`).
  - _Mango_ 브랜드 폰트 스타일(Italic) 적용된 AI 분석 패널.

## 3. 핵심 연동 준비 (다음 단계)

- 버튼 클릭 시 `window.Pi.createPayment` 함수가 실행될 수 있도록 `src/api/piPayment.js`의 모의(Mock) 함수와 실제 연결.
- AI 점수 시각화 시 데이터 변동에 따른 애니메이션 처리 최적화.

## 4. 3년 로드맵 기준 현재 위치

- 2026년 부산 지역 내 테스트 결제를 위한 UI/UX 뼈대 완성. 향후 싱가포르, 유럽 매물 등록 시 해당 국가의 세금/법률 정보 패널이 AI 분석 아래에 추가될 예정.

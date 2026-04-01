# 🥭 Mango Realty: Global AI Comparison Update (2026-03-31)

## 1. 개발 배경 (Location & Time)

- **현재 위치:** 부산 센텀시티 Mango OS R&D 센터.
- **맥락:** 부산 해운대 매물과 글로벌(싱가포르, 방콕 등) 매물을 실시간 비교하여 사용자의 Pi 투자 결정을 돕는 알고리즘 및 UI 구현.

## 2. 디자인 가이드라인 (Top Designer 지침)

- **Width:** `420px` (All portals consistency).
- **Comparison Logic:** ROI(수익률)를 최우선 지표로 설정하고, 우위 매물에 Gold(#FFD700) 포인트를 부여하여 시각적 위계 확립.
- **Interaction:** 오버레이 방식을 채택하여 사용자가 보고 있던 맥락(지도/리스트)을 잃지 않도록 설계.

## 3. 핵심 업데이트 사항

- [x] `analyzeGlobalInvestment` 유틸리티 함수를 통한 데이터 분석 자동화.
- [x] Side-by-side 비교 카드 레이아웃 구현.
- [x] 유료 AI 리포트 결제 버튼 (0.005 Pi) 추가하여 수익 모델(Revenue Stream) 확보.

## 4. 차주 계획 (2026-04-01 ~)

- 실제 Pi Browser 환경에서 결제 승인 후 AI 상세 리포트 PDF 생성 기능 구현.
- 포르투갈 리스본, UAE 두바이 등 'Wildcard' 투자 지역 데이터 샘플링 및 연동.

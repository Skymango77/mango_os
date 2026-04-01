# 🥭 Mango Realty: Dashboard & Pi Transaction Update (2026-03-31)

## 1. 개발 맥락

- **장소:** 부산 센텀시티 (Mango OS 프로젝트 본부).
- **사용자:** SkyMango (최고 디자인 책임자).
- **목적:** 개별 매물을 넘어 사용자의 전체 부동산 포트폴리오와 Pi 결제 흐름을 한눈에 관리하는 하이엔드 대시보드 구축.

## 2. 디자인 시스템 준수 사항

- **Width:** `420px` 고정 (포털 간 일관성 유지).
- **Color:** Deep Dark (#0A0A0A) + Mango Orange (#FF8C00).
- **Typography:** 굵고 대담한 Black/ExtraBold 스타일로 자산 가치 강조.

## 3. 핵심 기능 구현 완료

- [x] 사용자 자산 가치 실시간 요약 (Pi 단위).
- [x] 내 등록 매물(My Listings) 가로 스크롤 관리 뷰.
- [x] Pi Network 기반 트랜잭션 타임라인 (입출금 구분).
- [x] 리스트 진입 및 호버 애니메이션 (Framer Motion).

## 4. 차주 계획

- 실제 Pi Wallet API를 연동하여 `Pending` 상태의 트랜잭션 실시간 업데이트 로직 추가.
- 매물 상세 통계(클릭률, 지역 인기 데이터) 차트 시각화 (Recharts 라이브러리 사용 검토).

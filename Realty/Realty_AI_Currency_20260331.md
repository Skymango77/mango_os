# 🥭 Mango Realty: AI Advisor & Currency Engine Update (2026-03-31)

## 1. 현재 작업 Context

- **위치:** 부산 센텀시티 Mango OS 전략본부.
- **업데이트 핵심:** 대시보드 내 AI 상담 시스템 통합 및 글로벌 환율 변환 로직 확립.

## 2. 디자인 및 기능 사양

- **AI Chatbot:** `RealtyAiChat.jsx`
  - 420px 가로 폭 규격 엄수.
  - Glassmorphism & Slide-up UX 적용.
  - 사용자 맞춤형 퀵 답변 칩 제공.
- **Currency Engine:** `CurrencyEngine.js`
  - Pi 코인을 KRW, USD, SGD, THB로 자동 변환.
  - 다국어 숫자 포맷팅(Intl.NumberFormat) 지원.

## 3. 핵심 적용 포인트 (Pre-Implementation Check)

- 모든 가격 표시 컴포넌트(DetailView, Card) 옆에 `(약 ₩000,000)` 형태의 환율 보조 지표를 추가할 것.
- AI 챗봇 대화 시 `realtyAI.js`에서 만든 수익률 분석 데이터와 연동하여 답변하게 할 것.

## 4. 넥스트 액션

- **Pi Browser SDK 실제 환경 테스트:** Sandbox 모드에서 결제 흐름 재확인.
- **PWA 오프라인 모드 최적화:** 지도 데이터 캐싱 및 챗봇 오프라인 대응 로직 구현.

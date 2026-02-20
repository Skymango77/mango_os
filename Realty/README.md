# 🏠 MANGO REALTY Universe Project

MANGO 생태계 내에서 **Pi Network SDK**를 활용한 실거래 기반 부동산 중개 포탈입니다.

## 🚀 프로젝트 철학

1. **Trust First**: AI와 공공데이터를 활용한 3중 검증으로 허위 매물을 원천 차단합니다.
2. **Pi-Economy**: 현금과 Pi의 하이브리드 결제를 통해 실질적인 실물 자산 거래를 구현합니다.
3. **UI Consistency**: MANGO Universe의 카드 스타일 규격(Unified Width: 92%)을 엄격히 준수합니다.

---

## 📂 폴더 구조 및 주요 파일

```text
mango/realty/
├── README.md                # [현재 파일] 프로젝트 전체 가이드
├── package.json             # 워크스페이스 및 전체 종속성 관리
├── frontend/                # React 기반의 사용자 화면
│   ├── package.json
│   ├── src/
│   │   ├── components/      # RealtyCard.js (포탈 규격 카드)
│   │   └── store/           # usePropertyStore.js (매물 상태 관리)
│   └── assets/img/          # 매물 사진 및 아이콘
└── backend/                 # Node.js 기반의 검증 서버
    ├── package.json
    ├── src/
    │   ├── controllers/     # verifyController.js (AI 검증 로직)
    │   └── services/        # piSdkService.js (결제 및 에스크로)
    └── data/                # property_sample.json (매물 데이터)
```

## 📅 업데이트 이력

- **2026-01-06 18:30**: 프론트엔드 핵심 컴포넌트 `RealtyCard.js` 초기 코드 작성 완료.
- **주요 기능**:
  - 매물 이미지 렌더링 및 검증 점수 표시.
  - KRW-Pi 하이브리드 결제 비율 시각화(ProgressBar).
  - 기존 포탈 윈도우와의 크기 통일성 확보.

## 📅 업데이트 이력

- **2026-01-06 18:45**: 백엔드 검증 엔진 `verifyController.js` 구현 완료.
- **핵심 알고리즘**:
  - **GPS Distance Validation**: 사진 Exif 데이터와 매물 주소 간의 하이브리드 거리 연산(100m 기준).
  - **Price Consistency Check**: 지역 평균 실거래가 대조를 통한 미끼 매물 필터링 기반 마련.

## 📅 업데이트 이력

- **2026-01-06 19:00**: Pi SDK 연동 서비스 `piSdkService.js` 구현 완료.
- **주요 기능**:
  - **Payment Lifecycle**: 결제 승인(Approve) 및 최종 완료(Complete) 백엔드 로직 구축.
  - **Escrow Logic**: 부동산 거래의 안전성을 위한 Pi 예치 및 조건부 지급 시스템 설계.
  - **Security**: Pi API Key를 통한 서버 간(Server-to-Server) 보안 통신 적용.

## 📅 업데이트 이력

- **2026-01-06 19:50**: `property_sample.json` 데이터 세트 완성 및 `dexService.js` 설계.
- **2026-01-06 20:00**: PostGIS 기반 DB 스키마(`schema.sql`) 작성 완료.

## 📂 추가된 파일 위치

- `mango/realty/backend/src/services/dexService.js`
- `mango/realty/backend/src/models/schema.sql`

## 📅 업데이트 이력

- **2026-01-06 20:30**:
  1. `RealtyMap.js` 구현: 92% 너비 규격 적용 및 구글 맵 연동.
  2. `propertyRoutes.js` 구현: 매물 데이터 공급 API 구축.
  3. `verifyController.js` 고도화: SHA-256 해시 기반 이미지 무결성 검증 추가.

## 🚀 다음 단계 구상

- **실제 Pi 결제 흐름 테스트**: `piSdkService`와 프론트엔드 버튼 연동.
- **RWA 토큰화 대시보드**: 사용자의 부동산 지분 보유 현황 UI 개발.

- **2026-01-06**: `verifyController.js` 통합 고도화 완료.
  - 기능: GPS 위치 검증 + SHA-256 이미지 보안 + 시세/등기 기반 권리분석 통합.

## 🌐 API 엔드포인트 현황 (2026-01-06 완성)

| Method | Endpoint                       | Description                        |
| :----- | :----------------------------- | :--------------------------------- |
| GET    | `/api/realty/list`             | 매물 및 DEX 금융 데이터 목록 조회  |
| POST   | `/api/realty/verify-location`  | 현장 사진 GPS 기반 위치 인증       |
| GET    | `/api/realty/:id/status`       | 등기부 및 시세 기반 신뢰도 검사    |
| POST   | `/api/realty/verify-integrity` | SHA-256 해시를 통한 사진 변조 확인 |

## 📂 프로젝트 구조 정정 (2026-01-06)

- **Frontend**: `mango/realty/frontend/src/components/` 내에 UI 컴포넌트 집약.
- **Backend**: `mango/realty/backend/src/` 내에 API 및 로직 집약.
- **통합**: `App.js`에서 지도, 카드, 뉴스 윈도우를 92% 너비 규격으로 통합 완료.

## 🏗️ 시스템 폴더 구조 (Standardized Architecture)

1. **assets**: 정적 자원 관리
2. **components**: UI 유닛 (common, dashboard, map)
   - `RealtyCard.js`, `RealtyMap.js` 포함
3. **controllers**: API 실행 로직 (verifyController)
4. **middlewares**: 보안 및 데이터 필터링
5. **models**: 데이터베이스 설계 (SQL/Schema)
6. **pages**: 라우트별 페이지 구성
7. **routes**: 엔드포인트 정의 (propertyRoutes)
8. **services**: 외부 SDK 및 금융 로직 (piSdkService)
9. **store**: 글로벌 상태 관리 (Redux/Zustand)
10. **styles**: 전역 스타일링 및 테마

## 🔄 데이터 흐름도 (Data Flow)

1. **Frontend**: `Dashboard.js`가 `propertyRoutes.js` API 호출.
2. **Backend**: `verifyController.js`가 이미지 및 GPS 검증 수행.
3. **Finance**: `piSdkService.js`가 Pi Network 결제망과 통신.
4. **Display**: 모든 결과는 **92% 정규 너비 윈도우**에 출력.

## 📅 최종 업데이트 내역

- **2026-01-06**: 10개 폴더 구조 기반 전 계층(Layer) 통합 완료.
- **특이사항**: 뉴스 윈도우, 배너, 지도, 카드의 시각적 정렬(Width: 92%) 일치화.## 🔄 데이터 흐름도 (Data Flow)

1. **Frontend**: `Dashboard.js`가 `propertyRoutes.js` API 호출.
2. **Backend**: `verifyController.js`가 이미지 및 GPS 검증 수행.
3. **Finance**: `piSdkService.js`가 Pi Network 결제망과 통신.
4. **Display**: 모든 결과는 **92% 정규 너비 윈도우**에 출력.

## 📅 최종 업데이트 내역

- **2026-01-06**: 10개 폴더 구조 기반 전 계층(Layer) 통합 완료.
- **특이사항**: 뉴스 윈도우, 배너, 지도, 카드의 시각적 정렬(Width: 92%) 일치화.

## 📅 업데이트 이력 (2026-01-06)

- **A. 상태 관리 (`store/`)**: Zustand 도입. 결제 시 Pi 잔액 차감 및 자산 리스트 업데이트 로직 완비.
- **B. 디자인 시스템 (`styles/`)**: 92% 너비 규격을 전역 상수로 정의하여 모든 컴포넌트 시각적 정렬 보장.
- **C. 보안 계층 (`middlewares/`)**: 중요 API 호출 전 Pi Auth 토큰 검증 미들웨어 구축.

## 📅 업데이트 이력 (2026-01-06)

- **DEX 수익 자동 정산 기능**:
  - `dexService.js`: 초 단위 수익률 계산 로직 구현.
  - `useUserStore.js`: 실시간 보상 반영 스토어 액션 추가.
  - `Dashboard.js`: 1초 주기 리프레시를 통한 자산 증식 시각화 완료.

## 🏁 통합 개발 현황 (2026-01-06)

- **Finance**: `piSdkService`를 통해 Pi 결제 승인 로직의 서버 기반 마련.
- **UI Standard**: `PortalGlobal.css`를 도입하여 모든 윈도우(Realty, Food, News 등)의 **너비를 92%로 강제 통일**.
- **Animation**: Pi 뉴스 윈도우에 상하 스크롤 효과 적용 완료.

## 🚀 미리보기 안내

- 아래의 코드를 실행하면 **모든 창이 일렬로 정렬된 메인 화면**을 확인할 수 있습니다.

## 📅 최종 통합 결과 (2026-01-06)

- **Data Flow**: `App.js` (Fetch) -> `Dashboard.js` (Layout) -> `RealtyCard/Map` (Display)
- **Feature**:
  - Axios를 이용한 백엔드 API 연동 완료.
  - 로딩 스피너 및 예외 처리 로직 추가.
  - 모든 UI 요소가 **92% 정규 너비**를 유지하며 렌더링됨.

## 🚀 실행 가이드 (2026-01-06)

1. **터미널 위치**: `C:\Users\용크컴퓨터\mango glass\realty\frontend`
2. **명령어**: `npm start`
3. **확인**: 브라우저에서 `localhost:3000` 접속 시 92% 너비의 대시보드가 출력되는지 확인.

## 🛠️ 스타일 경로 동기화 완료 (2026-01-06)

- **Path**: `src/pages/Dashboard.js`에서 `../styles/PortalGlobal.css` 참조 확인.
- **UI Verification**:
  - 브라우저(`localhost:5173`)에서 모든 컴포넌트가 중앙 정렬(92%) 되는지 확인.
  - `news-content` 클래스에 애니메이션이 정상 작동하는지 확인.

## 🛠️ Vite 프로젝트 구조 복구 (2026-01-06)

- **Issue**: Vite 환경에서 필수인 `index.html` 부재로 인한 404 에러.
- **Action**:
  1. `frontend` 루트 폴더에 `index.html` 생성.
  2. `id="root"` 설정 및 `src/main.jsx` 연결 완료.

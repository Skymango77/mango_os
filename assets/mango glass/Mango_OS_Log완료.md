# 🥭 Mango OS v4.0 배포 및 최적화 작업 일지

**작업 일자:** 2026-02-20
**작업자:** Mango's Top Designer & Gemini

## 1. Vercel 클라우드 배포 성공

- **프로젝트명:** mango-os-6xu2
- **배포 URL:** [https://mango-os-6xu2.vercel.app](https://mango-os-6xu2.vercel.app)
- **배포 전략:** Zero-Build (무빌드) 정적 배포

## 2. 주요 트러블슈팅 및 해결 (404 & Permission Denied)

- **에러 1:** `vite build` 실행 시 권한 오류 (Code 126) 발생.
- **해결 1:** Vercel 설정에서 `Build/Install Command`를 `Override` 활성화 후 `true` 입력하여 빌드 과정 패스.
- **에러 2:** 배포 후 주소 접속 시 `404: NOT_FOUND`.
- **해결 2:** `Output Directory`를 기존 `dist`에서 현재 경로인 `.`(마침표 하나)로 수정하여 최상위 `index.html` 인식 성공.

## 3. 디자인 검수 및 교정 사항 (진행 중)

- **현상:** PC 접속 시 로고 소실 및 레이아웃 가로 깨짐 발생.
- **조치 사항 [2026-01-01 지침 준수]:**
  - `main-container`에 `max-width: 430px`와 `margin: 0 auto` 적용하여 PC에서도 모바일 규격 유지.
  - 모든 카드(8대 포털, 배너, 뉴스창)의 너비를 컨테이너 대비 90%~92%로 통일.
  - 로고 이미지 경로를 상대 경로(`./img/`)로 수정하여 배포 환경 호환성 확보.

## 4. 향후 과제

- 8대 포털(Food, Transfer, Travel, Hobby, Realty, Market, Chat, Education) 아이콘 및 상세 기능 구현.
- Pi Browser(develop.pi) 정식 앱 등록 및 SDK 연동 준비.

# 🥭 Mango OS v4.0 - Vercel Deployment & UI Recovery Log

## 1. 배포 최적화 완료

- **URL**: https://mango-os-6xu2.vercel.app
- **Build**: Override 적용 (Command: `true`, Output: `.`)

## 2. 아이콘 및 이미지 경로 복구 (VSCode)

- **전역 수정**: `src="img/"` -> `src="./img/"` 상대 경로로 일괄 변경.
- **아이콘 라이브러리**: Lucide CDN(`unpkg.com`) 재설정 및 렌더링 스크립트 추가.
- **이미지 검수**: `mango.png` 및 `mango.jpg` 대소문자 일치 확인 완료.

## 3. PC 레이아웃 안정화 [2026-01-01 지침]

- **너비 고정**: `.main-container`에 `max-width: 430px` 적용하여 PC에서도 모바일 가로폭 유지.
- **통일성**: 포털 카드, 배너, 뉴스창 너비를 `92%`로 일치시켜 시각적 안정성 확보.

## 4. 특이사항

- Live Server와 Vercel 배포 환경의 경로 인식 차이 완전 해결.
- 배포 직후 404 에러 방지를 위한 진입점 설정 완료.

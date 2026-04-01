# 🥭 Mango OS: Realty Portal Main Screen Hotfix (2026-04-01)

## 1. 개발 맥락 및 환경

- **위치:** 부산 센텀시티 Mango OS R&D 센터.
- **목표:** 메인 OS 화면(`mango glass/index.html`)에서 Realty 아이콘 클릭 시, React로 빌드된 부동산 플랫폼(`Realty/index.html`)이 완벽한 중앙 팝업 형태로 구동되도록 레이아웃 충돌 해결.

## 2. 디자인 규격 유지 사항 (Top Designer Rule)

- 포털 창 가로 폭은 `food_portal`, `travel_portal`, 뉴스 윈도우 등과 완벽히 동일한 **420px**로 고정.
- 하이엔드 라운딩 처리 (`border-radius: 30px`).

## 3. 핵심 수정 사항 (Bug Fix)

- **이전:** `relative` 클래스 사용으로 인해 메인 문서의 DOM 흐름 끝(하단)에 렌더링되어 태스크바와 겹침 발생.
- **수정:** `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` Tailwind 유틸리티를 적용하여 화면 정중앙으로 강제 부양 및 `z-[99999]` 적용.

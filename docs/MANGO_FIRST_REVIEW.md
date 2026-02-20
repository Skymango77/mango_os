# MANGO Main Index 1차 기술 검수 보고서

(검수 범위: index.html 약 1048 ~ 2039 line)

---

## 1. 검수 목적

본 문서는 Mango 메인(index.html)의 현재 상태를 기준으로

- 기능 안정성
- 구조적 확장성
- 투자/IR 관점의 기술 신뢰도

를 검증하기 위한 **1차 기술 검수 결과**이다.

---

## 2. 전체 구조 요약

현재 index.html은 다음 기능을 **단일 파일에 집중**하고 있다.

- 메인 배너 로테이션 (이미지/비디오)
- 8개 포탈(FOOD / TRAVEL / TRANSFER 등) 3D 회전 UI
- Mango Hub (통합 허브)
- Chat 시스템
- OAuth / Login / 2FA
- Partner / Admin 대시보드
- 광고/프로모션 UI

👉 **UI 완성도는 매우 높으나, 역할 분리가 되지 않은 상태**

---

## 3. 1차 검수에서 발견된 핵심 문제 (확정)

### 3.1 JavaScript 함수 중복 정의 (치명)

아래 함수들이 파일 내에서 **2~3회 이상 중복 선언**됨:

- `openChat()`
- `closeChat()`
- `sendMessage()`
- `loginWithPi()`
- 일부 OAuth / 이벤트 핸들러

#### 문제점

- JavaScript 특성상 **가장 마지막 선언만 유효**
- 이전 로직은 모두 무시됨
- 디버깅 및 유지보수 난이도 급상승

👉 **즉시 단일화 필요**

---

### 3.2 Consumer Portal과 Admin Hub의 경계 붕괴

현재 구조:

- Food / Travel / Transfer 같은 **Consumer 서비스**
- Mango Hub / confirm / modal 로직과 섞여 있음

예시:

```html
onclick="openWindow('food_portal'); closeMangoHub();"
```

mango/
├─ index.html
├─ travel/
├─ food/
├─ transfer/
├─ assets/
├─ docs/
│ ├─ MANGO_FIRST_REVIEW.md ✅ (지금 이 내용)
│ ├─ MANGO_TECH_DECISION.md (선택, 이유 정리용)
│ └─ CHANGELOG.md (나중에)
└─ README.md

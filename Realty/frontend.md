frontend/
├── src/
│ ├── components/
│ │ ├── common/
│ │ │ └── CardWindow.js # [필수] 기존 포탈과 동일 사이즈 카드 틀
│ │ ├── dashboard/
│ │ │ ├── VerificationBadge.js # 검증 완료 마크 컴포넌트
│ │ │ └── PriceTracker.js # π 시세 변동 및 한화 환산기
│ │ └── map/
│ │ └── RealtyMap.js # 매물 위치 기반 지도
│ ├── pages/
│ │ ├── PropertyDetail.js # 매물 상세 정보 (VR 투어 포함)
│ │ └── Dashboard.js # 매물 목록 및 필터링 메인
│ ├── store/ # 상태 관리 (Redux/Zustand)
│ │ └── usePropertyStore.js
│ ├── assets/
│ │ └── icons/ # REALTY 전용 아이콘
│ └── styles/
│ └── tailwind.css # MANGO 스타일 가이드 적용
└── package.json

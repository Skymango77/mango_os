# Mango Global Real Estate Project Plan

## 1. UI/UX Concept

- Interface: Modern, Minimalist (Airbnb Style)
- Primary Color: Mango Orange (#FF8C00) / Pi Purple (#673AB7)
- Layout: Mobile-first PWA with Bottom Navigation Tab

## 2. Key Modules to Develop

- [ ] Pi Auth Module: Integration with Pi Browser sandbox.
- [ ] Map Module: Google Maps API with Marker clustering.
- [ ] AI Module: Simple linear regression for price prediction based on regional growth data.
- [ ] Payment Module: Server-side validation for Pi payments.

## 3. Technology Stack

- Frontend: React.js + Tailwind CSS
- State: Zustand
- Backend: Firebase (Auth, Firestore, Hosting, Functions)
- Map: Mapbox SDK (or Google Maps)

## 4. Next Step

- Initialize Firebase project and link with Pi Sandbox.
- Design 'Global Comparison' view components.

mango-realty/
├── public/
│ ├── manifest.json # PWA 설정
│ └── icons/ # 앱 아이콘 (192x192, 512x512)
├── src/
│ ├── api/ # Firebase 및 Pi SDK 통신 로직
│ ├── components/ # 재사용 UI (Card, Modal, Navbar)
│ ├── hooks/ # useAuth, useLocation 등 커스텀 훅
│ ├── pages/ # 주요 화면 (Home, Map, Detail, MyPage)
│ ├── store/ # Global State (Zustand 또는 Context API)
│ ├── styles/ # Tailwind CSS 설정
│ └── utils/ # AI 가격 예측 알고리즘, 단위 변환기
├── firestore.rules # 보안 규칙
├── next.config.js (또는 vite.config.ts)
└── tailwind.config.js

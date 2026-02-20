backend/
├── src/
│ ├── controllers/ # 비즈니스 로직 (매물 등록, 검증 승인)
│ │ ├── propertyController.js
│ │ └── verifyController.js # 실거래가 및 등기부 검증 로직
│ ├── models/ # 데이터베이스 스키마 (PostgreSQL/Prisma)
│ │ ├── Property.js # 매물 정보, 검증 상태 등
│ │ └── Agent.js # 중개사 평판 및 인증 상태
│ ├── routes/ # API 엔드포인트
│ │ ├── propertyRoutes.js
│ │ └── authRoutes.js
│ ├── services/ # 외부 연동 서비스
│ │ ├── molitApiService.js # 국토교통부 API 연동
│ │ └── imageAnalysis.js # AI 이미지 해시값 비교 (중복 매물 방지)
│ ├── middlewares/ # 보안 및 인증 (CEO/중개인 권한 체크)
│ └── app.js # 서버 메인 설정
├── tests/ # 매물 검증 알고리즘 테스트 코드
└── .env # API 키 및 DB 연결 설정

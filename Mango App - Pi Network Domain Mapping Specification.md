# Mango App - Pi Network Domain Mapping Specification

## 1. 분산 도메인 런타임 제약 조건 (Domain Protocol Specs)

- **도메인 엔트리**: 파이 브라우저 주소창 내 `mango.pi` 고정 (하위 서브 도메인 `www.` 미적용 규격)
- **프로토콜 사양**: 파이 브라우저 샌드박스 내부 엔진에 의해 `https://` 보안 레이어가 네이티브 자동 맵핑됨. 별도 SSL 발급 불필요.

## 2. 기지국 바인딩 관계 (Infrastructure Binding)

- **타깃 엔드포인트**: 글로벌 라이브 운영 서버인 `https://mango.ceo`로 포워딩 서빙 결속.
- **백엔드 공유 구조**: 유입 경로(`mango.pi` / `mango.ceo`)에 관계없이 데이터 트랜잭션은 중앙 Supabase 실물 데이터베이스 기지국 하나로 완벽히 수렴 및 동기화됨.

## 3. 3개년 글로벌 포탈 확장 로드맵 (2026-2029)

- 본 도메인 아키텍처는 향후 3개년 동안 8대 핵심 서비스(Food, Transfer, Travel, Hobby, Realty, Market, Chat, Education)가 글로벌 메인넷 풀에 안착할 때, 블록체인 결제 처리 속도와 일반 웹 트래픽 분산 효율을 극대화하기 위한 가상 라우팅 구조의 핵심 표준 사양으로 정의됨.

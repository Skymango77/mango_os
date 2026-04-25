-- MANGO REALTY & TRANSFER 통합 스키마

-- 1. 매물 정보 테이블 (DEX 연동 포함)
CREATE TABLE properties (
    id VARCHAR(50) PRIMARY KEY,
    title TEXT NOT NULL,
    price_krw BIGINT,
    price_pi DECIMAL(20, 4),
    pi_ratio INT DEFAULT 30,
    verification_score INT,
    status VARCHAR(20), -- 'Verified', 'Suspicious', 'Sold'
    is_tokenized BOOLEAN DEFAULT FALSE,
    lp_pool_address VARCHAR(100),
    image_hashes TEXT[], -- 이미지 도용 방지
    location_point GEOGRAPHY(POINT, 4326), -- PostGIS 위치 데이터
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. DEX 유동성 풀 현황
CREATE TABLE liquidity_pools (
    pool_address VARCHAR(100) PRIMARY KEY,
    property_id VARCHAR(50) REFERENCES properties(id),
    total_pi DECIMAL(30, 4),
    staking_apr DECIMAL(5, 2),
    dividend_history JSONB -- 월별 배당 기록
);

-- 3. 운송/중장비 파트너 테이블
CREATE TABLE transfer_partners (
    partner_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pi_username VARCHAR(50) UNIQUE,
    service_type VARCHAR(30), -- 'CRANE', 'MOVING', 'TAXI'
    equipment_info JSONB, -- { "tonnage": "25t", "type": "Crawler" }
    region_base VARCHAR(50), -- 'Busan', 'Seoul'
    trust_rating DECIMAL(3, 2) DEFAULT 5.0,
    is_online BOOLEAN DEFAULT FALSE
);

-- 4. 결제 및 에스크로 이력
CREATE TABLE payments (
    payment_id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(50),
    target_id VARCHAR(50), -- property_id 또는 dispatch_id
    amount_pi DECIMAL(20, 4),
    status VARCHAR(20), -- 'PENDING', 'COMPLETED', 'ESCROW_HOLD'
    tx_hash VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. 거버넌스 제안 및 투표 기록
CREATE TABLE governance_proposals (
    proposal_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    target_pool VARCHAR(100) REFERENCES liquidity_pools(pool_address),
    proposer_id VARCHAR(50),
    votes_for DECIMAL(30, 4) DEFAULT 0,
    votes_against DECIMAL(30, 4) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ACTIVE', -- 'ACTIVE', 'PASSED', 'REJECTED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ends_at TIMESTAMP NOT NULL
);

-- 6. AI 결정 감사 로그 (Transparency)
CREATE TABLE ai_audit_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(50),
    context VARCHAR(20), -- 'REALTY', 'TRANSFER'
    input_text TEXT,
    ai_decision JSONB, -- AI가 내린 판단 근거
    is_anomaly BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 설정 (검색 최적화)
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_partners_region ON transfer_partners(region_base);
CREATE INDEX idx_audit_user ON ai_audit_logs(user_id);
-- 1. 매물 기본 정보 테이블
CREATE TABLE properties (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price_krw BIGINT,
    price_pi DECIMAL(20, 4),
    pi_ratio INT DEFAULT 0,
    verification_score INT DEFAULT 0,
    location_point GEOGRAPHY(Point, 4326), -- 위치 기반 검색용 (PostGIS)
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. DEX 유동성 풀 정보 테이블
CREATE TABLE realty_dex_pools (
    pool_id SERIAL PRIMARY KEY,
    property_id VARCHAR(50) REFERENCES properties(id),
    lp_address VARCHAR(100) UNIQUE,
    token_symbol VARCHAR(20),
    staking_apr DECIMAL(5, 2),
    is_active BOOLEAN DEFAULT TRUE
);
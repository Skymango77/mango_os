/**
 * MANGO AI Interpreter v1.0
 * Domain 06: AI Concierge Orchestrator
 * 자연어 입력을 구조화된 검색 쿼리로 변환합니다.
 */

const CITY_MAP = {
    '부산': 'PUS',
    '도쿄': 'NRT',
    '서울': 'ICN',
    '인천': 'ICN',
    '제주': 'CJU',
    '오사카': 'KIX',
    '싱가포르': 'SIN'
};

export const aiInterpreter = {
    /**
     * 자연어 분석 엔진
     * @param {string} input - 예: "부산에서 도쿄 6월 2박"
     */
    interpret(input) {
        console.log(`[AI Interpreter] Analyzing: "${input}"`);
        
        const result = {
            intent: 'package', // 기본값은 패키지(항공+호텔)
            origin: 'PUS',
            destination: '',
            startDate: '',
            nights: 1,
            passengers: 1
        };

        // 1. 목적지 추출 (Mapping)
        for (const [name, code] of Object.entries(CITY_MAP)) {
            if (input.includes(name)) {
                if (input.includes(`${name}에서`)) {
                    result.origin = code;
                } else {
                    result.destination = code;
                }
            }
        }

        // 2. 날짜 추출 (단순화된 로직: "N월")
        const monthMatch = input.match(/(\d+)월/);
        if (monthMatch) {
            const month = monthMatch[1].padStart(2, '0');
            result.startDate = `2026-${month}-01`; // 예시 연도
        }

        // 3. 숙박 일수 추출 ("N박")
        const nightMatch = input.match(/(\d+)박/);
        if (nightMatch) {
            result.nights = parseInt(nightMatch[1]);
        }

        // 4. 의도 판별
        if (input.includes('항공') || input.includes('비행기')) {
            result.intent = 'flight';
        } else if (input.includes('호텔') || input.includes('숙소')) {
            result.intent = 'hotel';
        }

        // 목적지가 없으면 분석 실패로 간주하여 유연하게 대응
        if (!result.destination) {
            console.warn("[AI] Destination not detected. Setting default.");
            result.destination = 'NRT'; 
        }

        return result;
    },

    formatForDisplay(structuredQuery) {
        return `${structuredQuery.origin} ➔ ${structuredQuery.destination} (${structuredQuery.startDate}, ${structuredQuery.nights}박)`;
    }
};
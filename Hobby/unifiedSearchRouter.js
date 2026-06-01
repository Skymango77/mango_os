/**
 * MANGO Unified Search Router
 * Domain 01: Architecture Modularization
 * 모든 검색 요청을 통합 관리하고 관련 서비스로 라우팅합니다.
 */

import { publish } from '../eventBus.js';
import { setFlightDate, setFlightDeparture, setFlightDestination } from '../flightState.js';
import { setHotelDates, setHotelLocation } from '../hotelState.js';
import { aiInterpreter } from './aiInterpreter.js';

export const unifiedSearchRouter = {
    /**
     * 통합 검색 실행
     * @param {string} rawQuery - 자연어 입력값
     */
    async executeSearch(rawQuery) {
        publish('SEARCH_START', { query: rawQuery });

        // 1. AI 해석
        const structured = aiInterpreter.interpret(rawQuery);
        console.log('[Router] Structured Query:', structured);

        // 2. 전역 상태 동기화 (Domain 01)
        if (structured.intent === 'flight' || structured.intent === 'package') {
            setFlightDeparture(structured.origin);
            setFlightDestination(structured.destination);
            setFlightDate(structured.startDate);
        }

        if (structured.intent === 'hotel' || structured.intent === 'package') {
            setHotelLocation(structured.destination);
            // 체크아웃 날짜 계산 로직 생략 (기본 1박 추가 등)
            setHotelDates(structured.startDate, ''); 
        }

        // 3. 결과 이벤트 발행 (UI 업데이트 트리거)
        setTimeout(() => {
            publish('SEARCH_COMPLETE', {
                type: structured.intent,
                summary: aiInterpreter.formatForDisplay(structured),
                data: structured
            });
        }, 1500); // AI 분석 시뮬레이션 지연

        return structured;
    }
};
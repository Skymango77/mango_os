/**
 * Observability & Analytics Engine
 * Phase 29: 검색 성공률, 전환율, 지연시간 트래킹
 */
const metrics = {
    searches: 0,
    conversions: 0,
    errors: 0,
    latencyLogs: []
};

export const trackSearch = (latency) => {
    metrics.searches++;
    metrics.latencyLogs.push(latency);
    console.log(`[Observability] Search logged. Avg Latency: ${latency}ms`);
};

export const trackConversion = () => {
    metrics.conversions++;
    const rate = ((metrics.conversions / metrics.searches) * 100).toFixed(1);
    console.log(`[Observability] Conversion tracked. Rate: ${rate}%`);
};

export const getMetrics = () => ({ ...metrics });
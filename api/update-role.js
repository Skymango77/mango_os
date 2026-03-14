// Mango OS 대규모 서포터즈 관리 API
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { username, requestedRole, region, timestamp } = req.body;

    try {
        // [비즈니스 로직] 10만 명 이상의 데이터를 처리하기 위해 DB 인덱싱 전략 필요
        // 여기에 MongoDB 또는 데이터베이스 연동 코드가 들어갑니다.
        
        console.log(`[Mango DB] 신규 신청 접수: @${username} / 역할: ${requestedRole} / 지역: ${region}`);

        // 성공 응답 (대표님 승인 대기 상태로 저장)
        return res.status(200).json({ 
            success: true, 
            message: "신청이 완료되었습니다. CEO 승인 후 활동이 시작됩니다.",
            receivedData: { username, requestedRole, region, timestamp }
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
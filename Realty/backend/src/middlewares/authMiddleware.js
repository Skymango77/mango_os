/**
 * Pi Network 지갑 인증 미들웨어
 */
const authMiddleware = (req, res, next) => {
    // 요청 헤더에서 Pi Auth 토큰 확인
    const piToken = req.headers['authorization'];

    if (!piToken) {
        return res.status(401).json({ 
            success: false, 
            message: "Pi 지갑 인증이 필요합니다." 
        });
    }

    // 실제 환경에서는 Pi SDK를 통해 토큰 유효성 검증
    console.log("[Auth] Pi 인증 토큰 확인됨:", piToken);
    next();
};

module.exports = authMiddleware;
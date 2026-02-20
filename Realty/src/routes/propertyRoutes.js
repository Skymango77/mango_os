const express = require('express');
const router = express.Router();
const multer = require('multer'); // 사진 업로드 처리를 위한 미들웨어
const path = require('path');
const fs = require('fs');
const verifyController = require('../controllers/verifyController');

// 사진 업로드 설정 (임시 폴더 저장)
const upload = multer({ dest: 'uploads/' });

/**
 * [GET] 전체 매물 목록 조회 (DEX 데이터 포함)
 */
router.get('/list', (req, res) => {
    try {
        const dataPath = path.join(__dirname, '../../data/property_sample.json');
        const properties = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        // 실제로는 DB에서 가져온 배열 형태여야 함 (임시로 배열화)
        res.status(200).json([properties]);
    } catch (error) {
        res.status(500).json({ error: "데이터 로드 실패" });
    }
});

/**
 * [POST] 매물 현장 촬영 및 GPS 검증 요청
 * 프론트엔드에서 사진과 목표 위경도를 보낼 때 사용
 */
router.post('/verify-location', upload.single('property_photo'), async (req, res) => {
    // verifyController의 GPS 검증 로직 호출
    await verifyController.verifyImageMetadata(req, res);
});

/**
 * [GET] 매물 상세 및 권리분석 조회
 */
router.get('/:id/status', async (req, res) => {
    const { id } = req.params;
    const price = req.query.price || 1200000000; // 쿼리 파라미터로 가격 전달 가정

    try {
        const registryResult = await verifyController.checkRegistryAndPrice(id, price);
        res.status(200).json(registryResult);
    } catch (error) {
        res.status(500).json({ error: "권리분석 중 오류 발생" });
    }
});

/**
 * [POST] 이미지 무결성(SHA-256) 최종 확인
 */
router.post('/verify-integrity', upload.single('property_photo'), (req, res) => {
    const { originalHash } = req.body;
    const fileBuffer = fs.readFileSync(req.file.path);
    
    const result = verifyController.verifyImageIntegrity(fileBuffer, originalHash);
    res.status(200).json(result);
});

module.exports = router;
const mongoose = require('mongoose');

/**
 * MANGO SUPER APP - Message Schema
 * 대화 내용, 미디어, 선물하기(Gift), 읽음 확인 기능을 포함한 초고도화 모델
 */
const messageSchema = new mongoose.Schema({
    // 어느 채팅방의 메시지인지 (인덱싱으로 검색 속도 최적화)
    chat_id: { 
        type: String, 
        required: true, 
        index: true 
    },
    
    // 보낸 사람의 ID
    sender_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    
    // 메시지 타입 (일반 텍스트, 이미지, 비디오, 선물하기 등)
    content_type: { 
        type: String, 
        enum: ['text', 'image', 'video', 'gift', 'system'], 
        default: 'text' 
    },
    
    // 실제 메시지 내용 (텍스트)
    content: { 
        type: String, 
        required: true 
    },

    // 미디어 파일(사진/영상) 경로 (타입이 image/video일 경우 사용)
    media_url: { 
        type: String, 
        default: null 
    },

    /**
     * [초고도화: 선물하기 데이터 섹션]
     * content_type이 'gift'일 경우에만 채워짐
     */
    gift_data: {
        product_id: { type: String, default: null }, // 망고 스토어 상품 ID
        product_name: { type: String, default: null },
        price_pi: { type: Number, default: 0 },       // 결제된 파이 금액
        status: { 
            type: String, 
            enum: ['pending', 'completed', 'expired'], 
            default: 'pending' 
        },
        gift_card_theme: { type: String, default: 'mango_gold' } // 선물 카드 UI 테마
    },

    // 읽음 확인 기능 (메시지를 읽은 유저들의 ID 배열)
    read_by: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],

    // 스텔스 모드 여부 (보안 메시지인 경우)
    is_stealth: { 
        type: Boolean, 
        default: false 
    }

}, { 
    // 생성 시간(createdAt)과 수정 시간(updatedAt) 자동 기록
    timestamps: true 
});

// 특정 채팅방의 최근 메시지를 빠르게 불러오기 위한 복합 인덱스
messageSchema.index({ chat_id: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
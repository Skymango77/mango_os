export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await req.json();
  const { type, subject, content, sender, notifyUser } = body;

  try {
    // 1. Resend API를 이용한 이메일 발송 (Nodemailer 대체)
    // Vercel 환경변수에 RESEND_API_KEY를 등록해야 합니다.
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Mango OS <${process.env.RESEND_FROM_EMAIL}>`, // 예: 'Mango OS <noreply@mg.mango.ceo>'
        to: [process.env.OWNER_EMAIL],
        subject: `[망고 상담신청] ${subject}`,
        text: `신청자: ${sender}\n내용: ${content}`,
      }),
    });

    // 2. 유저에게 '상담 접수 완료' 카카오톡 알림 전송 (가상 API 연동 예시)
    if (notifyUser) {
      console.log(`[KakaoTalk] Sending notification to ${sender}: 상담이 정상적으로 접수되었습니다.`);
      
      /* 
      실제 연동 시 (예: 비즈톡, 알리고 등 사용):
      await fetch('https://api.kakaonotify.com/v1/send', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.KAKAO_KEY}` },
        body: JSON.stringify({
          template_id: 'consult_receipt_01',
          receiver: sender, // 유저 휴대폰 번호 또는 ID
          message: `안녕하세요 ${sender}님! 망고 상담이 정상 접수되었습니다. 곧 사장님이 답변 드릴 예정입니다.`
        })
      });
      */
    }
    
    // 3. 사장님 알림 엔진 (알림톡 우선 발송 후 실패 시 SMS 전환)
    const aligoApiKey = process.env.ALIGO_API_KEY;
    const aligoUserId = process.env.ALIGO_USER_ID;
    const aligoSender = process.env.ALIGO_SENDER_NUMBER;
    const ownerPhone = process.env.OWNER_PHONE_NUMBER;
    const message = `[망고 상담신청]\n제목: ${subject}\n신청자: ${sender}\n내용: ${content}`;

    if (ownerPhone && aligoApiKey && aligoUserId) {
      let alimtalkSuccess = false;

      // 3-1. 알림톡 시도
      if (process.env.KAKAO_OWNER_CHANNEL_ID && process.env.KAKAO_TEMPLATE_CODE) {
        try {
          const kakaoRes = await fetch('https://apis.aligo.in/akv1/alimtalk/send/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              key: aligoApiKey,
              userid: aligoUserId,
              senderkey: process.env.KAKAO_OWNER_CHANNEL_ID,
              tpl_code: process.env.KAKAO_TEMPLATE_CODE,
              sender: aligoSender,
              receiver_1: ownerPhone,
              subject_1: `[망고] 새 상담 도착`,
              message_1: message,
              button_1: JSON.stringify({
                button: [{
                  name: "상담내역 확인하기",
                  linkType: "WL",
                  linkMo: "https://mango-os-6xu2.vercel.app/profile",
                  linkPc: "https://mango-os-6xu2.vercel.app/profile"
                }]
              })
            })
          });
          const kakaoData = await kakaoRes.json();
          if (kakaoData.code === 0) alimtalkSuccess = true;
          else console.warn("[Alimtalk Failed] Switching to SMS Failover. Reason:", kakaoData.message);
        } catch (err) {
          console.error("[Alimtalk Error] Switching to SMS Failover:", err);
        }
      }

      // 3-2. 알림톡 실패 시 또는 설정 안된 경우 SMS 발송 (Failover)
      if (!alimtalkSuccess) {
        // Edge Runtime에서는 Buffer 대신 TextEncoder를 사용합니다.
        // UTF-8 기준 한글은 3바이트이므로 Aligo의 90바이트 제한에 맞춰 기준을 조정합니다.
        const encoder = new TextEncoder();
        const byteLength = encoder.encode(message).length;
        const msgType = byteLength > 85 ? 'LMS' : 'SMS';

        try {
          const smsRes = await fetch('https://apis.aligo.in/send/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              key: aligoApiKey,
              userid: aligoUserId,
              sender: aligoSender,
              receiver: ownerPhone,
              msg: message,
              msg_type: msgType,
              title: msgType === 'LMS' ? `[망고] ${subject}` : ''
            })
          });
          const smsData = await smsRes.json();
          console.log(`[SMS Failover ${msgType}] Result:`, smsData.message);
        } catch (err) {
          console.error("[SMS Failover Error]:", err);
        }
      }
    }

    return new Response(JSON.stringify({ success: true, message: 'Notifications sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Notification Error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
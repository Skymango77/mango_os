const { createClient } = require('@supabase/supabase-js');
const receiptService = require('./receiptService');

/**
 * Mango Real-time Integration Service
 * Handles Supabase subscriptions to trigger MNG point updates and email dispatch
 */
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Helper to send alerts to Slack or Telegram on system errors
 */
async function sendWebhookAlert(error, bookingId) {
    const message = `🚨 *Mango OS Integration Error*\n*Booking ID:* ${bookingId || 'N/A'}\n*Error:* ${error.message}`;

    // Slack Integration
    if (process.env.SLACK_WEBHOOK_URL) {
        try {
            await fetch(process.env.SLACK_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: message })
            });
        } catch (e) { console.error('Failed to send Slack alert:', e); }
    }

    // Telegram Integration
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
        try {
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' })
            });
        } catch (e) { console.error('Failed to send Telegram alert:', e); }
    }
}

const supabaseIntegration = {
    init: () => {
        console.log('[Supabase] Initializing Real-time Subscription for Payments...');

        // Listen to changes in the 'bookings' table
        supabase
            .channel('public:bookings')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, async (payload) => {
                const newBooking = payload.new;
                console.log('[Supabase] New Booking Detected:', newBooking.bookingId);

                try {
                    // 1. 기본 적립률 계산
                    let rewardRate = newBooking.type === 'HOTEL' ? 5.0 : 2.5;
                    
                    // 1.1 VIP 여부 확인 및 호텔 예약 2배 혜택 적용
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('is_vip')
                        .eq('pi_uid', newBooking.user_id)
                        .single();

                    if (profile?.is_vip && newBooking.type === 'HOTEL') {
                        rewardRate *= 2;
                        console.log(`[VIP Benefit] 2x Multiplier applied for user: ${newBooking.user_id}`);
                    }
                    
                    // 2. Update user MNG balance in Supabase (Simulated logic)
                    const { data, error } = await supabase
                        .rpc('increment_mng_points', { 
                            user_uuid: newBooking.user_id, 
                            amount: rewardRate 
                        });

                    if (error) throw error;

                    // 3. Trigger Email Dispatch via receiptService
                    await receiptService.sendDigitalVoucher({
                        email: newBooking.email,
                        hotelName: newBooking.itemName || 'Mango Partner Property',
                        reservationNumber: newBooking.reservationNumber,
                        piAmount: newBooking.piAmount,
                        checkInDate: new Date(newBooking.date).toLocaleDateString()
                    }, data.new_balance);

                    // 레벨업 발생 시 콘솔 기록 (추후 축하 알림 발송 로직 추가 가능)
                    if (data.leveled_up) {
                        console.log(`🎊 [Promotion] User ${newBooking.email} has reached Level ${data.new_level}!`);
                    }

                    console.log(`[Supabase] MNG Sync & Email triggered for ${newBooking.email}`);
                } catch (err) {
                    console.error('[Supabase] Integration Flow Error:', err);
                    await sendWebhookAlert(err, newBooking.bookingId);
                }
            })
            .subscribe();

        // 4. 주간 보너스 지급 감지 및 알림 트리거
        // mango_point_history 테이블에 'Weekly Bonus' 사유로 데이터가 쌓이는 것을 모니터링합니다.
        supabase
            .channel('public:mango_point_history')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mango_point_history' }, async (payload) => {
                const newRecord = payload.new;
                
                // award_weekly_bonus() SQL 함수에서 정의한 reason과 일치해야 합니다.
                if (newRecord.reason === 'Weekly Bonus' || newRecord.change_amount === 50.0) {
                    console.log(`🏆 Weekly Winner Detected: ${newRecord.pi_uid}`);

                    try {
                        // 1위 유저의 이메일과 닉네임 정보를 가져옵니다.
                        const { data: profile, error: pError } = await supabase
                            .from('profiles')
                            .select('email, username')
                            .eq('pi_uid', newRecord.pi_uid)
                            .single();

                        if (pError || !profile?.email) throw new Error("Could not find winner email");

                        // 1.1 최근 7일간의 활동 요약(맛집/호텔 등) 가져오기
                        const { data: activities } = await supabase
                            .from('bookings')
                            .select('itemName, date')
                            .eq('user_id', newRecord.pi_uid)
                            .gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
                            .limit(5);

                        // 2. Nodemailer를 통해 축하 메시지 발송
                        await receiptService.sendBonusCongratulation(
                            profile.email, 
                            profile.username, 
                            newRecord.change_amount,
                            activities.map(a => ({ title: a.itemName, date: a.date }))
                        );

                        console.log(`📧 Congratulatory email sent to ${profile.email}`);
                    } catch (err) {
                        console.error('Failed to notify weekly winner:', err);
                    }
                }
            })
            .subscribe();
    }
};

module.exports = supabaseIntegration;

// supabase/functions/send-notification/index.ts
// Use the built-in Deno.serve to avoid remote std import resolution issues.
// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"; // Error 2307

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// [신규] 국가 코드를 국기 이모지로 변환하는 헬퍼 함수
const getFlagEmoji = (countryCode: string | null) => {
  if (!countryCode || countryCode.length !== 2) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  // @ts-ignore
  return String.fromCodePoint(...codePoints);
};

// @ts-ignore
Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    let { action, paymentId, txid, storeName, amount, startDate, endDate, id, notificationId, userId, paymentMethod, cancelReason, country } = payload;

    // [신규] 텔레그램 콜백 데이터 처리 (approve_ID, cancel_ID 형식 대응)
    if (payload.callback_query && payload.callback_query.data) {
      const tgData = payload.callback_query.data;
      if (tgData.startsWith('approve_')) {
        action = 'approve';
        paymentId = tgData.replace('approve_', '');
      } else if (tgData.startsWith('cancel_')) {
        action = 'cancel';
        paymentId = tgData.replace('cancel_', '');
      }
    }

    // Supabase 클라이언트 초기화
    const supabaseClient = createClient( // Error 2304 for Deno.env.get
      // @ts-ignore
      Deno.env.get('SUPABASE_URL') ?? '', // Error 2304
      // @ts-ignore
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // Error 2304
    );

    // 1. 결제 내역 CSV 리포트 API (사용자 닉네임 포함 쿼리 수정)
    if (action === 'report-csv') {
      if (!startDate || !endDate) throw new Error("조회 기간이 필요합니다.");

      let query = supabaseClient
        .from('payments')
        .select(`
          created_at, 
          payment_id, 
          txid, 
          store_name, 
          amount, 
          payment_method,
          cancel_reason,
          status,
          profiles:user_id ( nickname, country )
        `)
        .gte('created_at', startDate)
        .lte('created_at', endDate)

      if (paymentMethod) {
        query = query.eq('payment_method', paymentMethod);
      }

      if (userId) {
        query = query.eq('user_id', userId);
      }

      // [신규] 국가(Country) 필터링 로직 추가
      if (country) {
        query = query.eq('profiles.country', country);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      // CSV 헤더 및 데이터 생성 (Nickname 및 Method 컬럼 추가)
      interface PaymentRow {
        created_at: string;
        payment_id: string;
        txid: string | null;
        store_name: string;
        amount: number;
        payment_method: string | null;
        cancel_reason: string | null;
        status: string;
        profiles: { nickname: string | null; country: string | null } | null;
      }

      // [신규] 국가별 베스트 셀러 상점 계산
      const countryStoreStats: Record<string, Record<string, number>> = data.reduce((acc: any, row: PaymentRow) => {
        const c = row.profiles?.country || 'Unknown';
        const s = row.store_name || 'Unknown';
        if (!acc[c]) acc[c] = {};
        acc[c][s] = (acc[c][s] || 0) + 1;
        return acc;
      }, {});

      const countryBestStores = Object.entries(countryStoreStats).map(([country, stores]) => {
        const bestStore = Object.entries(stores).reduce((a, b) => (a[1] > b[1] ? a : b));
        return `${country}: ${bestStore[0]} (${bestStore[1]}tx)`;
      }).join(", ");

      // [신규] 국가별 매출 합계 계산
      const countryTotals = data.reduce((acc: Record<string, number>, row: PaymentRow) => {
        const c = row.profiles?.country || 'Unknown';
        acc[c] = (acc[c] || 0) + (row.amount || 0);
        return acc;
      }, {});

      const countrySummary = (Object.entries(countryTotals) as [string, number][])
        .map(([c, amt]) => `${c}: ${amt.toFixed(2)}`)
        .join(", ");

      // 상단 요약 정보 계산
      const totalCount = data.length;
      const totalAmount = data.reduce((sum: number, row: PaymentRow) => sum + (row.amount || 0), 0);
      
      // [신규] 전월 대비 매출 성장률(MoM) 계산 로직
      const pStart = new Date(startDate);
      pStart.setMonth(pStart.getMonth() - 1);
      const pEnd = new Date(endDate);
      pEnd.setMonth(pEnd.getMonth() - 1);

      let prevQuery = supabaseClient
        .from('payments')
        .select('amount')
        .gte('created_at', pStart.toISOString())
        .lte('created_at', pEnd.toISOString());

      if (paymentMethod) prevQuery = prevQuery.eq('payment_method', paymentMethod);
      if (userId) prevQuery = prevQuery.eq('user_id', userId);

      const { data: prevData } = await prevQuery;
      const prevTotalAmount = prevData?.reduce((sum: number, r: any) => sum + (r.amount || 0), 0) || 0;
      const momGrowth = prevTotalAmount > 0 
        ? ((totalAmount - prevTotalAmount) / prevTotalAmount) * 100 
        : (totalAmount > 0 ? 100 : 0);

      // 결제 수단별 부분 합계 계산
      const methodTotals = data.reduce((acc: Record<string, number>, row: PaymentRow) => {
        const method = row.payment_method || 'PI';
        acc[method] = (acc[method] || 0) + (row.amount || 0);
        return acc;
      }, {});

      // [신규] 시간대별(오전/오후) 통계 계산
      const timeStats = data.reduce((acc: { amCount: number; amTotal: number; pmCount: number; pmTotal: number; }, row: PaymentRow) => {
        const hour = new Date(row.created_at).getHours();
        if (hour < 12) { acc.amCount++; acc.amTotal += (row.amount || 0); }
        else { acc.pmCount++; acc.pmTotal += (row.amount || 0); }
        return acc;
      }, { amCount: 0, amTotal: 0, pmCount: 0, pmTotal: 0 });

      // [신규] 요일별(Sun-Sat) 거래량 분포 통계
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayStats = data.reduce((acc: Record<string, { count: number; total: number }>, row: PaymentRow) => {
        const day = dayNames[new Date(row.created_at).getDay()];
        if (!acc[day]) acc[day] = { count: 0, total: 0 };
        acc[day].count++;
        acc[day].total += (row.amount || 0);
        return acc;
      }, {});

      // [신규] 가장 거래가 활발한 Peak Day 계산
      const peakDay = dayNames.reduce((a, b) => (dayStats[a]?.count || 0) > (dayStats[b]?.count || 0) ? a : b);
      
      // [신규] Peak Day 내에서 가장 거래가 활발한 Peak Hour 계산
      const peakDayRows = (data as PaymentRow[]).filter((row: PaymentRow) => dayNames[new Date(row.created_at).getDay()] === peakDay);
      const hourStats = peakDayRows.reduce((acc: Record<number, number>, row: PaymentRow) => {
        const hr = new Date(row.created_at).getHours();
        acc[hr] = (acc[hr] || 0) + 1;
        return acc;
      }, {});
      
      const peakHour = Object.keys(hourStats).length > 0 
        ? Object.keys(hourStats).reduce((a, b) => hourStats[Number(a)] > hourStats[Number(b)] ? a : b)
        : null;

      const peakHourInfo = peakHour !== null ? ` (Peak Hour: ${peakHour}:00)` : "";

      // [신규] 0시-23시 시간별 거래량 분포 (그래프용 데이터)
      const hourlyDistribution = Array(24).fill(0);
      data.forEach((row: PaymentRow) => {
        const hr = new Date(row.created_at).getHours();
        hourlyDistribution[hr]++;
      });
      const hourlySummaryRow = `Hourly Count (00-23h): ${hourlyDistribution.join(",")}\n`;

      const daySummary = dayNames
        .map(day => {
          const display = `${day}: ${dayStats[day]?.count || 0}tx(${(dayStats[day]?.total || 0).toFixed(2)})`;
          return (day === peakDay && dayStats[day]?.count > 0) ? `🔥 ${display}` : display;
        })
        .join(", ");

      // [수정] TypeScript 에러 2345 해결을 위한 타입 캐스팅 적용
      const methodSummary = (Object.entries(methodTotals) as [string, number][])
        .map(([method, amount]) => `${method}: ${amount.toFixed(2)}`)
        .join(", ");

      // [신규] 결제 실패(cancelled) 통계 계산
      const failedCount = (data as PaymentRow[]).filter(row => row.status === 'cancelled').length;
      const failedSummaryRow = `Failure Stats: Total Cancelled: ${failedCount}tx (Admin/System Cancelled)\n`;

      // [신규] 월간 목표 대비 달성률(%) 계산
      const monthlyGoal = payload.monthlyGoal || 5000; // 요청에 목표값이 없으면 기본 5000 Pi
      const achievementRate = monthlyGoal > 0 ? (totalAmount / monthlyGoal) * 100 : 0;
      const performanceRow = `Performance: Monthly Goal: ${monthlyGoal} Pi, Achievement Rate: ${achievementRate.toFixed(2)}%\n`;
      const momRow = `Growth: MoM Performance: Prev Period: ${prevTotalAmount.toFixed(2)} Pi, Growth Rate: ${momGrowth > 0 ? '+' : ''}${momGrowth.toFixed(2)}%\n`;

      const summaryRow = `Summary: Total Payments: ${totalCount}, Total Amount: ${totalAmount.toFixed(2)} (${methodSummary})\n`;
      const timeSummaryRow = `Time Stats: AM: ${timeStats.amCount}tx(${timeStats.amTotal.toFixed(2)}), PM: ${timeStats.pmCount}tx(${timeStats.pmTotal.toFixed(2)})${peakHourInfo}\n`;
      const daySummaryRow = `Weekly Dist: ${daySummary}${peakHourInfo}\n\n`;
      const countryStatsRow = `Country Totals: ${countrySummary}\n`;
      const bestStoreRow = `Best Selling Stores: ${countryBestStores}\n`;

      // [신규] 국가 필터 요약 문자열 추가 (없을 경우 빈 문자열)
      const countrySummaryRow = country ? `Country Filter: ${country}\n` : '';

      const csvHeaders = "Date,Nickname,Payment ID,Transaction ID,Store,Amount,Method,Status,Cancel Reason\n";
      const csvRows = data.map((row: PaymentRow) => 
        `${row.created_at},"${row.profiles?.nickname || 'Unknown'}",${row.payment_id},${row.txid || ''},"${row.store_name}",${row.amount},${row.payment_method || 'PI'},${row.status},"${row.cancel_reason || ''}"`
      ).join("\n");
      
      return new Response(summaryRow + timeSummaryRow + failedSummaryRow + performanceRow + momRow + countryStatsRow + bestStoreRow + countrySummaryRow + hourlySummaryRow + daySummaryRow + csvHeaders + csvRows, {
        headers: { 
          ...corsHeaders,
          "Content-Type": "text/csv", 
          "Content-Disposition": `attachment; filename=mango_report.csv`
        },
      });
    }
    
    // [신규] 텔레그램 결제 취소 사유 선택 메뉴 프롬프트
    if (action === 'prompt_cancel_reason') {
      if (!paymentId) throw new Error("Payment ID가 필요합니다.");

      const messageId = payload.callback_query?.message?.message_id;
      const chatId = payload.callback_query?.message?.chat?.id;
      // @ts-ignore
      const TELEGRAM_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');

      if (TELEGRAM_TOKEN && messageId && chatId) {
        const cancelReasons = [
          { text: "고객 요청", callback_data: `cancel_${paymentId}_고객 요청` },
          { text: "재고 없음", callback_data: `cancel_${paymentId}_재고 없음` },
          { text: "시스템 오류", callback_data: `cancel_${paymentId}_시스템 오류` },
          { text: "기타 사유", callback_data: `cancel_${paymentId}_기타 사유` },
        ];

        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/editMessageReplyMarkup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            reply_markup: {
              inline_keyboard: [cancelReasons]
            }
          })
        });

        return new Response(JSON.stringify({ success: true, message: "Cancel reason prompt sent" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ success: false, message: "Telegram prompt failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // 1-1. Pi Network API를 통한 결제 상태 실시간 확인
    if (action === 'check-payment') {
      if (!paymentId) throw new Error("Payment ID가 필요합니다.");

      // @ts-ignore
      const PI_API_KEY = Deno.env.get('PI_API_KEY') ?? '';

      const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Key ${PI_API_KEY}`
        }
      });

      if (!piResponse.ok) {
        const errorData = await piResponse.json();
        throw new Error(`Pi API Check Failed: ${JSON.stringify(errorData)}`);
      }

      const paymentData = await piResponse.json() as any;

      // 결제가 완료된 상태라면 Supabase DB와 동기화
      if (paymentData.status?.developer_completed === true) {
        // 텔레그램 알림 전송 (옵션: 환경변수 설정 필요)
        try {
          // @ts-ignore
          const TELEGRAM_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');

          // [수정] 여러 관리 채널(재무팀, 개발팀 등)로 알림 분리 전송 로직
          const chatIds = [
            // @ts-ignore
            Deno.env.get('TELEGRAM_CHAT_ID_FINANCE'), // 재무팀 채널
            // @ts-ignore
            Deno.env.get('TELEGRAM_CHAT_ID_DEV')      // 개발팀 모니터링 채널
          ].filter(Boolean);

          if (TELEGRAM_TOKEN && chatIds.length > 0) {
            // 사용자 닉네임 추가 조회
            const { data: userRef } = await supabaseClient
              .from('payments')
              .select('profiles:user_id ( nickname, country )')
              .eq('payment_id', paymentId)
              .single();
            
            const profile = (userRef as any)?.profiles;
            const nickname = profile?.nickname || '알 수 없음';
            const countryInfo = profile?.country || '정보 없음';
            const flag = getFlagEmoji(profile?.country);
            
            const msg = `✅ [Mango Pay Sync] 결제 동기화 완료\n사용자: ${nickname} (${countryInfo} ${flag})\n매장: ${storeName || '알 수 없음'}\n금액: ${paymentData.amount} Pi\n상태: Completed`;

            for (const chatId of chatIds) {
              await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: msg,
                  parse_mode: 'HTML',
                  reply_markup: {
                    inline_keyboard: [[
                      { text: "🔍 상세", url: `https://mango.pi/payment/${paymentId}` }, 
                      { text: "✅ 승인", callback_data: `approve_${paymentId}` },
                      { text: "❌ 취소", callback_data: `prompt_cancel_reason_${paymentId}` }
                    ]]
                  }
                })
              });
            }
          }
        } catch (pushErr) {
          console.error("Admin Notification Failed:", pushErr);
        }

        await supabaseClient
          .from('payments')
          .update({ status: 'completed' })
          .eq('payment_id', paymentId);
        
        console.log(`[Sync] Payment ${paymentId} status synced to 'completed'`);
      }

      return new Response(JSON.stringify(paymentData), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // [신규] Pi 결제 승인 액션 (텔레그램 콜백 연동)
    if (action === 'approve') {
      if (!paymentId) throw new Error("Payment ID가 필요합니다.");
      // @ts-ignore
      const PI_API_KEY = Deno.env.get('PI_API_KEY') ?? '';
      
      const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Key ${PI_API_KEY}`, 'Content-Type': 'application/json' }
      });

      if (!piResponse.ok) throw new Error(`Pi API Approve Failed: ${await piResponse.text()}`);

      await supabaseClient.from('payments').update({ status: 'approved' }).eq('payment_id', paymentId);

      // [신규] 텔레그램 메시지 상태 업데이트 (처리 완료로 편집)
      const messageId = payload.callback_query?.message?.message_id;
      const chatId = payload.callback_query?.message?.chat?.id;
      // @ts-ignore
      const TELEGRAM_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');

      if (TELEGRAM_TOKEN && messageId && chatId) {
        // 상세 정보 조회를 위해 DB 재조회
        const { data: p } = await supabaseClient
          .from('payments')
          .select('created_at, payment_method, profiles:user_id ( nickname, country )')
          .eq('payment_id', paymentId)
          .single();
        
        const profile = (p as any)?.profiles;
        const pTime = p ? new Date(p.created_at).toLocaleString('ko-KR') : '정보 없음';
        const pMethod = p?.payment_method || 'PI';
        const pNick = profile?.nickname || '알 수 없음';
        const pCountry = profile?.country || '정보 없음';
        const flag = getFlagEmoji(profile?.country);

        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: `<b>[처리 완료]</b>\n관리자에 의해 <b>✅ 승인</b> 처리되었습니다.\n\n` +
                  `결제 ID: <code>${paymentId}</code>\n` +
                  `결제 시각: ${pTime}\n` +
                  `결제 수단: ${pMethod}\n` +
                  `사용자: ${pNick} (${pCountry} ${flag})`,
            parse_mode: 'HTML'
          })
        });
      }

      return new Response(JSON.stringify({ success: true, status: 'approved' }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // [신규] 결제 취소 액션 (텔레그램 콜백 연동)
    if (action === 'cancel') {
      if (!paymentId) throw new Error("Payment ID가 필요합니다.");

      // 텔레그램 콜백에서 사유가 넘어왔는지 확인
      if (payload.callback_query && payload.callback_query.data) {
        const tgData = payload.callback_query.data;
        const parts = tgData.split('_'); // cancel_PAYMENTID_REASONCODE
        cancelReason = parts.slice(2).join(' ') || '관리자 수동 취소'; // 사유 추출
        paymentId = parts[1]; // paymentId 재확보
      }
      
      // [수정] 취소 사유(cancel_reason) 컬럼 기록 로직 추가
      await supabaseClient
        .from('payments')
        .update({ status: 'cancelled', cancel_reason: cancelReason || 'Admin Manual Cancel' })
        .eq('payment_id', paymentId);
      console.log(`[Cancel] Payment ${paymentId} has been cancelled by Admin.`);
      
      // [신규] 텔레그램 메시지 상태 업데이트 (취소 완료로 편집)
      const messageId = payload.callback_query?.message?.message_id;
      const chatId = payload.callback_query?.message?.chat?.id;
      // @ts-ignore
      const TELEGRAM_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');

      if (TELEGRAM_TOKEN && messageId && chatId) {
        // 상세 정보 조회를 위해 DB 재조회
        const { data: p } = await supabaseClient
          .from('payments')
          .select('created_at, payment_method, profiles:user_id ( nickname, country )')
          .eq('payment_id', paymentId)
          .single();

        const profile = (p as any)?.profiles;
        const pTime = p ? new Date(p.created_at).toLocaleString('ko-KR') : '정보 없음';
        const pMethod = p?.payment_method || 'PI';
        const pNick = profile?.nickname || '알 수 없음';
        const pCountry = profile?.country || '정보 없음';
        const flag = getFlagEmoji(profile?.country);

        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: `<b>[처리 완료]</b>\n관리자에 의해 <b>❌ 취소</b> 처리되었습니다.\n\n` +
                  `취소 사유: <i>${cancelReason || '관리자 수동 취소'}</i>\n` +
                  `결제 ID: <code>${paymentId}</code>\n\n` +
                  `결제 시각: ${pTime}\n` +
                  `결제 수단: ${pMethod}\n` +
                  `사용자: ${pNick} (${pCountry} ${flag})`,
            parse_mode: 'HTML'
          })
        });
      }

      return new Response(JSON.stringify({ success: true, status: 'cancelled' }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. 알림 읽음 처리 API 추가
    if (action === 'read-notification') {
      const targetId = notificationId || id;
      if (!targetId) throw new Error("Notification ID is required.");

      const { error } = await supabaseClient
        .from('notifications')
        .update({ is_read: true })
        .eq('id', targetId);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2-1. 알림 전체 읽음 처리 API 추가
    if (action === 'mark-all-read') {
      if (!userId) throw new Error("User ID is required.");

      const { error } = await supabaseClient
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Webhook 기반 푸시 발송 (기존 로직 유지 및 보강)
    if (payload.record) {
      const notification = payload.record;
      console.log(`알림 발송 프로세스 기동: ${notification.title} -> User: ${notification.user_id}`);
      
      // 실제 푸시 서비스(FCM/OneSignal) 호출 로직은 여기에 위치합니다.
      
      return new Response(JSON.stringify({ success: true, message: "Push sequence initiated" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ message: "No valid action or record found" }), { status: 400 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
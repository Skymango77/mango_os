export default async function handler(req, res) {
  // POST 요청만 허용 (보안)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paymentId } = req.body;

  try {
    // 파이 네트워크 서버에 승인(Approve) 요청 전송
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`, // Vercel 환경 변수 사용
      },
    });

    const data = await response.json();
    
    // 성공 시 파이 서버로부터 받은 데이터를 그대로 클라이언트에 전달
    res.status(200).json(data);
  } catch (error) {
    console.error("Mango Approval Error:", error);
    res.status(500).json({ error: 'Internal Server Error during approval' });
  }
}
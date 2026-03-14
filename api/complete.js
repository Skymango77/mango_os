export default async function handler(req, res) {
  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paymentId, txid } = req.body;

  try {
    // 파이 네트워크 서버에 완료(Complete) 요청 전송 (txid 포함)
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${process.env.PI_API_KEY}`,
      },
      body: JSON.stringify({ txid }),
    });

    const data = await response.json();

    // 결제 완료 후, 여기서 대표님만의 추가 로직(예: 유저 등급 업그레이드)을 넣을 수 있습니다.
    res.status(200).json(data);
  } catch (error) {
    console.error("Mango Completion Error:", error);
    res.status(500).json({ error: 'Internal Server Error during completion' });
  }
}
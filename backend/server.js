const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// [중요] 개발자 포탈에서 발급받은 API Key를 여기에 넣습니다.
const PI_API_KEY = "79em7uar3p6q4cqldxg0ytk5wsqlwjanjdhcoafuriiyqb5x65u84nwznjyxq8s5"; 

const piApi = axios.create({
  baseURL: 'https://api.minepi.com/v2',
  headers: { 'Authorization': `Key ${PI_API_KEY}` }
});

// 1. 프론트엔드에서 'onReadyForServerApproval' 발생 시 호출할 엔드포인트
app.post('/api/approve', async (req, res) => {
  const { paymentId } = req.body;
  try {
    // 파이 서버에 결제 승인 요청
    await piApi.post(`/payments/${paymentId}/approve`);
    res.status(200).json({ message: "Approved" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Approval failed");
  }
});

// 2. 프론트엔드에서 'onReadyForServerCompletion' 발생 시 호출할 엔드포인트
app.post('/api/complete', async (req, res) => {
  const { paymentId, txid } = req.body;
  try {
    // 파이 서버에 결제 완료 확인 요청
    await piApi.post(`/payments/${paymentId}/complete`, { txid });
    res.status(200).json({ message: "Completed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Completion failed");
  }
});

app.listen(3000, () => console.log('Pi Backend Server running on port 3000'));
import React, { useEffect, useState } from 'react';

const App = () => {
  const [status, setStatus] = useState('Wait for Payment...');

  // 내 백엔드 서버 주소 (로컬 테스트 기준)
  const BACKEND_URL = "http://localhost:3000/api";

  useEffect(() => {
    // 파이 SDK 초기화
    if (window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: true });
    }
  }, []);

  const startPayment = async () => {
    const paymentData = {
      amount: 1.0,
      memo: "Test Purchase",
      metadata: { orderId: "order_001" },
    };

    const callbacks = {
      onReadyForServerApproval: async (paymentId) => {
        setStatus("Server Approving...");
        await fetch(`${BACKEND_URL}/approve`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId }),
        });
      },
      onReadyForServerCompletion: async (paymentId, txid) => {
        setStatus("Server Completing...");
        await fetch(`${BACKEND_URL}/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, txid }),
        });
        setStatus("Payment Successful!");
      },
      onCancel: (paymentId) => setStatus("Payment Cancelled"),
      onError: (error, payment) => setStatus(`Error: ${error.message}`),
    };

    try {
      await window.Pi.createPayment(paymentData, callbacks);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">Pi Store</h1>
        <p className="text-gray-600 mb-6">{status}</p>
        <button
          onClick={startPayment}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition duration-200"
        >
          Pay 1 Pi
        </button>
      </div>
    </div>
  );
};

export default App;
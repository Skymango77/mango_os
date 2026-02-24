import React, { useEffect } from "react"; // useEffect 추가
import "./styles/mango-theme.css";
import MapMock from "./components/MapMock";
import ReviewList from "./components/ReviewList";
import Recommendations from "./components/Recommendations";
import DeliveryModulePlaceholder from "./components/DeliveryModulePlaceholder";

// --- Pi SDK 초기화 및 인증 로직 ---
const Pi = window.Pi;

export default function App() {
  
  useEffect(() => {
    // 1. Pi SDK 초기화 (샌드박스 모드 활성화)
    if (Pi) {
      Pi.init({ version: "2.0", sandbox: true });
      console.log("Mango Food Portal: Pi SDK Ready (Sandbox)");

      // 2. 유저 인증 실행
      Pi.authenticate(['payments', 'username'], (payment) => {
        /* 결제 관련 콜백 */
      }).then((auth) => {
        console.log("Welcome, " + auth.user.username);
      });
    }
  }, []);

  return (
    // [디자인 지침] 전체 컨테이너에서 모든 카드의 너비를 동일하게 제한 (max-w-[450px] 예시)
    <div className="flex flex-col items-center" style={{ padding: "20px", gap: "20px" }}>
      
      <div className="app-header text-2xl font-bold mb-4" style={{ width: "100%", maxWidth: "450px" }}>
        🍍 Mango Food Portal
      </div>

      {/* 모든 mango-card의 너비를 Pi News Window와 동일하게 고정 [cite: 2026-01-01] */}
      <div className="mango-card portal-glow" style={{ width: "100%", maxWidth: "450px" }}>
        <MapMock/>
      </div>

      <div className="mango-card" style={{ width: "100%", maxWidth: "450px" }}>
        <Recommendations/>
      </div>

      <div className="mango-card" style={{ width: "100%", maxWidth: "450px" }}>
        <ReviewList/>
      </div>

      <div className="mango-card" style={{ width: "100%", maxWidth: "450px" }}>
        <DeliveryModulePlaceholder/>
      </div>

    </div>
  );
}
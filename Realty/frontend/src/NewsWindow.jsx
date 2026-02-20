// NewsWindow.jsx 상단 확인
import React from 'react';
import './NewsWindow.css'; // 이 줄이 있어야 CSS가 작동합니다!

const NewsWindow = () => {
  const newsList = [
    "📢 Pi Network 메인넷 전환율 85% 돌파!",
    "🏠 망고 부동산 DEX, 신규 강남 매물 등록 완료",
    "🚀 Pi 코인 결제 매장 전 세계 5만 개 돌파",
    "💡 실시간 현장 인증 시스템 업데이트 완료",
    "💎 파이 생태계 최대 부동산 플랫폼 'Mango Universe'"
  ];

  return (
    <div className="news-window-container">
      <div className="news-label">Pi NEWS</div>
      <div className="news-ticker">
        <div className="news-track">
          {/* 연속 스크롤을 위해 리스트를 2번 렌더링 */}
          {newsList.map((news, i) => <div key={`a-${i}`} className="news-item">{news}</div>)}
          {newsList.map((news, i) => <div key={`b-${i}`} className="news-item">{news}</div>)}
        </div>
      </div>
    </div>
  );
};

export default NewsWindow;
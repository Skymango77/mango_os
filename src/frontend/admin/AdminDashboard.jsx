import React, { useState } from 'react';
import { Send, MessageSquare, Bell, User, Settings, PieChart, Volume2 } from 'lucide-react';

const App = () => {
  const [message, setMessage] = useState('');
  const [targetUser, setTargetUser] = useState('All Workers');
  const [priority, setPriority] = useState('normal');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // 실제로는 여기서 API를 호출하여 AR 글래스로 데이터를 보냅니다.
    console.log(`Sending to ${targetUser}: ${message} (Priority: ${priority})`);
    
    // 전송 후 입력창 초기화
    setMessage('');
    // 사용자 피드백 (간이 알림)
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce';
    toast.innerText = '성공적으로 전송되었습니다!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      {/* 사이드바 */}
      <div className="w-64 bg-slate-900 text-white p-6 space-y-8 flex-shrink-0">
        <div className="flex items-center space-x-3 px-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="font-bold">M</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">MANGO Admin</h1>
        </div>
        
        <nav className="space-y-1">
          <NavItem icon={<PieChart size={20} />} label="대시보드" active />
          <NavItem icon={<MessageSquare size={20} />} label="메시지 전송" />
          <NavItem icon={<User size={20} />} label="직원 관리" />
          <NavItem icon={<Volume2 size={20} />} label="음성 라이브러리" />
          <NavItem icon={<Settings size={20} />} label="시스템 설정" />
        </nav>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">실시간 AR 알림 전송</h2>
            <p className="text-slate-500">현장 직원들의 AR 글래스에 즉각적인 정보를 전달합니다.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600"><Bell size={24} /></button>
            <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white shadow-sm overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="admin" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 전송 폼 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <form onSubmit={handleSendMessage} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">수신 대상</label>
                    <select 
                      value={targetUser}
                      onChange={(e) => setTargetUser(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    >
                      <option>모든 직원</option>
                      <option>홀 매니저</option>
                      <option>주방 팀장</option>
                      <option>바리스타</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">우선순위</label>
                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                      {['normal', 'high'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPriority(p)}
                          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${priority === p ? 'bg-white shadow-sm text-orange-600' : 'text-slate-400'}`}
                        >
                          {p === 'normal' ? '일반' : '긴급'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600">메시지 내용</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="직원들에게 전달할 내용을 입력하세요..."
                    className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2 text-slate-400 text-sm">
                    <Volume2 size={16} />
                    <span>전송 시 선택된 기본 음성 파일이 자동 재생됩니다.</span>
                  </div>
                  <button 
                    type="submit"
                    className="flex items-center space-x-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-200 transition-all transform active:scale-95"
                  >
                    <span>알림 전송</span>
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 상태 요약 사이드카드 */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold mb-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>접속 중인 AR 기기</span>
              </h3>
              <div className="space-y-4">
                <UserStatus name="김철수 (홀)" status="Online" />
                <UserStatus name="이영희 (주방)" status="Online" />
                <UserStatus name="박민수 (바)" status="Offline" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl text-white shadow-lg shadow-orange-100">
              <h3 className="font-bold mb-2">오늘의 통계</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-orange-100 text-xs">전송된 알림</p>
                  <p className="text-2xl font-bold">128건</p>
                </div>
                <div>
                  <p className="text-orange-100 text-xs">평균 반응 속도</p>
                  <p className="text-2xl font-bold">1.2초</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-orange-500/10 text-orange-500' : 'hover:bg-slate-800'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

const UserStatus = ({ name, status }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs text-slate-500">
        {name[0]}
      </div>
      <span className="font-medium">{name}</span>
    </div>
    <span className={status === 'Online' ? 'text-green-500 font-bold' : 'text-slate-300'}>{status}</span>
  </div>
);

export default App;
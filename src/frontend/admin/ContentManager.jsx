import React, { useState, useEffect } from 'react';
import { 
  Youtube, 
  MapPin, 
  Store, 
  Calendar, 
  Globe, 
  Search, 
  Plus, 
  ExternalLink,
  Users,
  Bell,
  MoreVertical,
  Filter,
  CheckCircle2
} from 'lucide-react';

/**
 * 파일 경로: mango/src/frontend/admin/ContentManager.jsx
 * 설명: 유튜브 뉴스, 지역 식당 정보, 아파트 행사 및 광고를 관리하는 통합 대시보드입니다.
 */

const App = () => {
  const [activeTab, setActiveTab] = useState('global'); // global, local, events
  const [searchQuery, setSearchQuery] = useState('');

  // 샘플 데이터: 글로벌 뉴스 (유튜브 등)
  const globalNews = [
    { id: 1, type: 'youtube', title: 'Pi Network Mainnet Update: Everything You Need to Know', author: 'Pi News Official', views: '120K', link: 'https://youtube.com/watch?v=example1', date: '1시간 전', status: 'published' },
    { id: 2, type: 'news', title: 'Global Crypto Adoption Trends 2024', author: 'Tech Insider', views: '45K', link: '#', date: '3시간 전', status: 'draft' },
  ];

  // 샘플 데이터: 지역 정보 및 가입 식당
  const localStores = [
    { id: 1, name: '망고 분식 (강남점)', category: '식당', location: '서울시 강남구', joinedDate: '2024.03.15', benefit: '파이코인 10% 결제 가능', status: 'new' },
    { id: 2, name: '푸른 아파트 바자회', category: '행사', location: '경기도 분당구', date: '2024.03.20', status: 'scheduled' },
    { id: 3, name: '지역 아동 도서 나눔', category: '공연/문화', location: '서울시 서초구', date: '2024.03.25', status: 'published' }
  ];

  const renderStatusBadge = (status) => {
    const styles = {
      published: 'bg-green-100 text-green-700',
      draft: 'bg-slate-100 text-slate-600',
      new: 'bg-blue-100 text-blue-700',
      scheduled: 'bg-amber-100 text-amber-700'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status] || styles.draft}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
      {/* 대시보드 헤더 */}
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800">콘텐츠 및 지역 광고 관리</h1>
            <p className="text-sm text-slate-500 font-medium">글로벌 소식과 우리 동네 뉴스를 관리하세요.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
              <Plus size={18} />
              <span>새 콘텐츠 등록</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* 탭 네비게이션 */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl w-fit border border-slate-200 shadow-sm">
            <button 
              onClick={() => setActiveTab('global')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'global' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Globe size={18} /> 글로벌 뉴스 (YouTube)
            </button>
            <button 
              onClick={() => setActiveTab('local')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'local' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Store size={18} /> 지역 업체 & 광고
            </button>
            <button 
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'events' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Calendar size={18} /> 아파트 행사 & 공연
            </button>
          </div>

          {/* 검색 및 필터 */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="검색어를 입력하세요 (예: 파이코인 뉴스, 강남구 맛집...)"
                className="bg-transparent outline-none w-full text-sm text-slate-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 font-bold text-sm border border-slate-200 rounded-xl hover:bg-slate-50">
              <Filter size={18} /> 필터
            </button>
          </div>

          {/* 메인 리스트 영역 */}
          <div className="grid grid-cols-1 gap-4">
            {activeTab === 'global' && (
              <div className="space-y-4">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">최신 글로벌 뉴스 & 영상</h2>
                {globalNews.map((item) => (
                  <div key={item.id} className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between hover:border-indigo-200 transition-colors group">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                        <Youtube size={28} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="font-semibold">{item.author}</span>
                          <span>•</span>
                          <span>조회수 {item.views}</span>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {renderStatusBadge(item.status)}
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'local' && (
              <div className="space-y-4">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">새로 가입된 식당 및 정보</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localStores.filter(s => s.category === '식당').map((store) => (
                    <div key={store.id} className="bg-white border border-slate-200 p-6 rounded-3xl hover:shadow-xl hover:shadow-slate-200/50 transition-all border-l-4 border-l-blue-500">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
                          <Store size={24} />
                        </div>
                        {renderStatusBadge(store.status)}
                      </div>
                      <h3 className="text-lg font-black text-slate-800 mb-1">{store.name}</h3>
                      <div className="flex items-center gap-1 text-slate-500 text-xs mb-4">
                        <MapPin size={12} /> {store.location}
                      </div>
                      <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 mb-4">
                        <p className="text-xs font-bold text-blue-700 flex items-center gap-2">
                          <CheckCircle2 size={14} /> {store.benefit}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider border-t border-slate-100 pt-4">
                        <span>가입일: {store.joinedDate}</span>
                        <button className="text-indigo-600 hover:underline">상세 정보 편집</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-4">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">우리 지역 아파트 행사 & 공연</h2>
                {localStores.filter(s => s.category !== '식당').map((event) => (
                  <div key={event.id} className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${event.category === '행사' ? 'bg-amber-50 text-amber-600' : 'bg-purple-50 text-purple-600'}`}>
                        {event.category === '행사' ? <Users size={24} /> : <Bell size={24} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-800">{event.name}</h3>
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${event.category === '행사' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>
                            {event.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors">참여자 명단</button>
                      <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">공지하기</button>
                      <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"><MoreVertical size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 하단 요약 플로팅 바 */}
      <footer className="bg-white border-t border-slate-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> 글로벌 피드 정상 작동 중</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> 오늘 신규 가입 업체: 3개</span>
          </div>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-indigo-600 underline">데이터 백업하기</span>
            <span className="cursor-pointer hover:text-indigo-600 underline">로그 보기</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
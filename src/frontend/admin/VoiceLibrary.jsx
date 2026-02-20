import React, { useState } from 'react';
import { Play, Plus, Trash2, Volume2, Search, Music, Save, CheckCircle } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 샘플 음성 데이터
  const [voices, setVoices] = useState([
    { id: 1, name: '일반 알림음', category: 'Effect', duration: '0:02', lastUsed: '2023-10-25' },
    { id: 2, name: '주방 주문 접수', category: 'Voice', duration: '0:04', lastUsed: '2023-10-26' },
    { id: 3, name: '긴급 대피 안내', category: 'Emergency', duration: '0:08', lastUsed: '2023-09-12' },
    { id: 4, name: '테이블 호출 벨', category: 'Effect', duration: '0:03', lastUsed: '2023-10-26' },
    { id: 5, name: '재고 부족 경고', category: 'Voice', duration: '0:05', lastUsed: '2023-10-20' },
  ]);

  const categories = ['All', 'Effect', 'Voice', 'Emergency'];

  const filteredVoices = voices.filter(v => 
    (selectedCategory === 'All' || v.category === selectedCategory) &&
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* 상단 헤더 */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Volume2 className="text-orange-500" size={32} />
              음성 라이브러리 관리
            </h1>
            <p className="text-slate-500 mt-1">AR 글래스에서 재생될 알림음 및 음성 가이드를 설정합니다.</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 transition-all active:scale-95">
            <Plus size={20} />
            새 음성 추가
          </button>
        </header>

        {/* 필터 및 검색바 */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="음성 이름으로 검색..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-white shadow-sm text-orange-600' : 'text-slate-500'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 리스트 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVoices.map((voice) => (
            <div key={voice.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${
                  voice.category === 'Emergency' ? 'bg-red-50 text-red-500' : 
                  voice.category === 'Voice' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'
                }`}>
                  <Music size={24} />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-bold mb-1">{voice.name}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold uppercase">{voice.category}</span>
                <span>•</span>
                <span>{voice.duration}</span>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all active:scale-95">
                  <Play size={16} fill="white" />
                  미리듣기
                </button>
                <button className="p-3 border border-slate-200 hover:border-orange-500 hover:text-orange-500 rounded-xl transition-all">
                  <CheckCircle size={20} />
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-50 text-[10px] text-slate-400 flex justify-between">
                <span>최근 사용: {voice.lastUsed}</span>
                <span>ID: #{voice.id.toString().padStart(3, '0')}</span>
              </div>
            </div>
          ))}

          {/* 추가 카드 (Placeholder) */}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-orange-300 hover:text-orange-400 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center mb-2">
              <Plus size={24} />
            </div>
            <span className="font-bold">새 파일 업로드</span>
          </div>
        </div>

        {/* 하단 안내 */}
        <footer className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 flex items-center gap-4">
          <div className="bg-orange-500 text-white p-3 rounded-xl">
            <Save size={24} />
          </div>
          <div>
            <h4 className="font-bold">라이브러리 동기화</h4>
            <p className="text-sm text-slate-500">설정한 음성 파일은 현장의 모든 AR 글래스로 자동 배포됩니다.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
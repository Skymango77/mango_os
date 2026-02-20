import React, { useState, useEffect } from 'react';
import { 
  Store, 
  MapPin, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  AlertCircle,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';

/**
 * 파일 경로: mango/src/frontend/admin/LocalAdminDashboard.jsx
 * 파일 설명: 상점 및 이벤트 등록 기능을 포함한 관리자용 실시간 대시보드
 */

const App = () => {
  // 상태 관리: 상점 리스트
  const [stores, setStores] = useState([
    { id: 1, name: '망고 카페 (본점)', category: '식당', location: '서울시 강남구', benefit: '10% Pi 할인', status: 'active' },
    { id: 2, name: '중앙 아파트 도서관', category: '행사', location: '경기도 분당구', benefit: '무료 도서 나눔', status: 'pending' }
  ]);

  // 상점 추가 폼 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStore, setNewStore] = useState({
    name: '',
    category: '식당',
    location: '',
    benefit: ''
  });

  // 상점 추가 핸들러
  const handleAddStore = (e) => {
    e.preventDefault();
    const storeToAdd = {
      ...newStore,
      id: Date.now(),
      status: 'active'
    };
    setStores([...stores, storeToAdd]);
    setIsModalOpen(false);
    setNewStore({ name: '', category: '식당', location: '', benefit: '' });
  };

  // 삭제 핸들러
  const handleDelete = (id) => {
    setStores(stores.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      {/* 사이드바 및 레이아웃을 생략한 메인 뷰 */}
      <div className="max-w-6xl mx-auto p-6 lg:p-12">
        
        {/* 헤더 섹션 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">Mango Admin</span>
            <h1 className="text-4xl font-black mt-2 tracking-tight">지역 인프라 관리</h1>
            <p className="text-slate-500 mt-2">상점 등록 및 아파트 단지 내 이벤트를 실시간으로 제어합니다.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
          >
            <Plus size={20} />
            <span>신규 등록하기</span>
          </button>
        </div>

        {/* 대시보드 요약 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-sm font-bold text-slate-400">전체 등록처</p>
            <h3 className="text-3xl font-black mt-1">{stores.length} <span className="text-sm font-normal text-slate-400 font-sans">개소</span></h3>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm border-b-4 border-b-green-500">
            <p className="text-sm font-bold text-slate-400">활성 상태</p>
            <h3 className="text-3xl font-black mt-1">{stores.filter(s => s.status === 'active').length} <span className="text-sm font-normal text-slate-400">정상</span></h3>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-sm font-bold text-slate-400">대기 중</p>
            <h3 className="text-3xl font-black mt-1">{stores.filter(s => s.status === 'pending').length} <span className="text-sm font-normal text-slate-400">건</span></h3>
          </div>
        </div>

        {/* 리스트 테이블 영역 */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="font-black text-xl flex items-center gap-2">
              <Filter size={20} className="text-indigo-600" />
              목록 필터링
            </h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200">
              <Search size={16} className="text-slate-400" />
              <input type="text" placeholder="상점명 검색..." className="outline-none text-sm w-40" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-widest font-black">
                  <th className="px-8 py-5">상호/행사명</th>
                  <th className="px-8 py-5">카테고리</th>
                  <th className="px-8 py-5">위치 정보</th>
                  <th className="px-8 py-5">혜택 정보</th>
                  <th className="px-8 py-5">상태</th>
                  <th className="px-8 py-5 text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stores.map((store) => (
                  <tr key={store.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${store.category === '식당' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                          <Store size={18} />
                        </div>
                        <span className="font-bold text-slate-800">{store.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded-md text-slate-600">{store.category}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <MapPin size={14} />
                        {store.location}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-indigo-600">{store.benefit}</td>
                    <td className="px-8 py-6">
                      {store.status === 'active' ? (
                        <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                          <CheckCircle size={14} /> 노출 중
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-600 text-xs font-bold">
                          <AlertCircle size={14} /> 검토 대기
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-indigo-600">
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(store.id)}
                          className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 신규 등록 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-black">신규 인프라 등록</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">취소</button>
            </div>
            <form onSubmit={handleAddStore} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">상호 또는 행사명</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-medium"
                  placeholder="예: 망고 펫샵"
                  value={newStore.name}
                  onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">카테고리</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 appearance-none font-medium"
                    value={newStore.category}
                    onChange={(e) => setNewStore({...newStore, category: e.target.value})}
                  >
                    <option value="식당">식당/카페</option>
                    <option value="행사">아파트 행사</option>
                    <option value="공연">문화/공연</option>
                    <option value="기타">기타 상점</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">위치(지역)</label>
                  <input 
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-medium"
                    placeholder="예: 서울 강남"
                    value={newStore.location}
                    onChange={(e) => setNewStore({...newStore, location: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">혜택/공지 내용</label>
                <textarea 
                  required
                  rows="3"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-medium"
                  placeholder="예: 파이 결제 시 음료 무료"
                  value={newStore.benefit}
                  onChange={(e) => setNewStore({...newStore, benefit: e.target.value})}
                ></textarea>
              </div>
              <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200">
                등록 완료하기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
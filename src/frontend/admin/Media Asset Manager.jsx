import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  FileImage, 
  FileAudio, 
  Trash2, 
  Search, 
  Plus, 
  Grid, 
  List as ListIcon, 
  CheckCircle2, 
  X,
  Music,
  Image as ImageIcon,
  MoreVertical,
  Download,
  FolderOpen
} from 'lucide-react';

/**
 * 파일 경로: mango/src/frontend/admin/AssetManager.jsx
 * 처리 방식: 신규 생성 또는 기존 AssetManager 파일 전체 덮어쓰기
 * 설명: 실제 파일 업로드 시뮬레이션 및 미디어 자산 목록 관리 기능을 제공하는 관리자 전용 대시보드입니다.
 */

const App = () => {
  const [activeTab, setActiveTab] = useState('assets');
  const [assets, setAssets] = useState([
    { id: 1, name: 'background_music.mp3', type: 'audio', size: '4.2 MB', date: '2023-12-26', url: '#' },
    { id: 2, name: 'hero_section_bg.jpg', type: 'image', size: '1.8 MB', date: '2023-12-25', url: '#' },
    { id: 3, name: 'logo_white.png', type: 'image', size: '450 KB', date: '2023-12-24', url: '#' },
    { id: 4, name: 'intro_voiceover.wav', type: 'audio', size: '12.5 MB', date: '2023-12-23', url: '#' },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  
  const fileInputRef = useRef(null);

  // 파일 핸들러 (업로드 시뮬레이션)
  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    
    // 실제 API 호출 대신 1.5초 후 목록에 추가되도록 시뮬레이션
    setTimeout(() => {
      const newAssets = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'audio',
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        date: new Date().toISOString().split('T')[0],
        url: URL.createObjectURL(file)
      }));
      setAssets(prev => [...newAssets, ...prev]);
      setIsUploading(false);
    }, 1500);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => {
    setDragActive(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const deleteAsset = (id) => {
    if(window.confirm("정말로 이 파일을 삭제하시겠습니까?")) {
      setAssets(assets.filter(asset => asset.id !== id));
    }
  };

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      {/* 사이드바 영역 */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Upload size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Mango CMS</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'}`}
          >
            <Grid size={20} />
            <span className="font-medium">대시보드</span>
          </button>
          <button 
            onClick={() => setActiveTab('assets')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'assets' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'}`}
          >
            <ImageIcon size={20} />
            <span className="font-medium">미디어 자산</span>
          </button>
          
          <div className="pt-6 pb-2 px-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Quick Access</p>
          </div>
          <div className="space-y-1">
            <div className="px-4 py-2 text-sm text-slate-400 hover:text-indigo-400 cursor-pointer flex items-center gap-3 group">
              <FolderOpen size={16} className="group-hover:scale-110 transition-transform" />
              <span>최근 업로드</span>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="bg-slate-700/30 rounded-2xl p-4 border border-slate-700/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] text-slate-400 font-bold uppercase">Cloud Storage</span>
              <span className="text-[11px] text-indigo-400 font-bold">72%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mb-1">
              <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* 헤더 */}
        <header className="h-20 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-8 z-10">
          <div>
            <h1 className="text-xl font-bold text-white">Media Assets</h1>
            <p className="text-xs text-slate-500 font-medium">관리자용 미디어 저장소</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="파일명 검색..." 
                className="bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/50 w-64 text-slate-200 placeholder-slate-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all font-semibold text-sm shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              <Plus size={18} />
              <span>업로드</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              accept="image/*,audio/*"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </header>

        {/* 메인 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* 업로드 드롭존 */}
          <div 
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`mb-8 border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all duration-300 group ${
              dragActive 
                ? 'border-indigo-500 bg-indigo-500/10 scale-[0.99]' 
                : 'border-slate-800 bg-slate-800/20 hover:border-slate-700 hover:bg-slate-800/40'
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${dragActive ? 'bg-indigo-500 text-white rotate-12' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300 group-hover:-translate-y-1'}`}>
              {isUploading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-400 border-t-transparent" />
              ) : (
                <Upload size={32} />
              )}
            </div>
            <h3 className="text-lg font-bold mb-2 tracking-tight">
              {isUploading ? '파일 처리 중...' : '미디어 파일을 여기에 놓으세요'}
            </h3>
            <p className="text-slate-500 text-sm font-medium">PNG, JPG, MP3, WAV (최대 50MB)</p>
          </div>

          {/* 목록 컨트롤 */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Total {filteredAssets.length} Assets</h2>
            <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700/50">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <ListIcon size={16} />
              </button>
            </div>
          </div>

          {/* 자산 렌더링 */}
          {filteredAssets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-600">
              <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-700/30">
                <Search size={32} className="opacity-20" />
              </div>
              <p className="font-bold tracking-tight">검색 결과가 없습니다.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAssets.map(asset => (
                <div key={asset.id} className="group bg-slate-800/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1">
                  <div className="h-44 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                    {asset.type === 'image' ? (
                      <img src={asset.url} alt={asset.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                           onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80"; }} />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-900/20 to-slate-900 flex items-center justify-center">
                        <Music size={40} className="text-indigo-400 opacity-40 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                      <button className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all hover:scale-110 border border-white/10">
                        <Download size={18} />
                      </button>
                      <button 
                        onClick={() => deleteAsset(asset.id)}
                        className="p-2.5 bg-red-500/10 hover:bg-red-500 rounded-xl text-red-500 hover:text-white transition-all hover:scale-110 border border-red-500/20"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-800/60 backdrop-blur-md">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-xs truncate pr-4 text-slate-200 tracking-tight">{asset.name}</h4>
                      <MoreVertical size={14} className="text-slate-600 cursor-pointer hover:text-white" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold">
                      <span className={`uppercase px-2 py-0.5 rounded-md ${asset.type === 'image' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                        {asset.type}
                      </span>
                      <span className="text-slate-500">{asset.size}</span>
                      <span className="text-slate-600 ml-auto">{asset.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/30 rounded-2xl border border-slate-800 overflow-hidden backdrop-blur-md">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    <th className="px-6 py-5">Asset Details</th>
                    <th className="px-6 py-5">Type</th>
                    <th className="px-6 py-5">Weight</th>
                    <th className="px-6 py-5">Upload Date</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredAssets.map(asset => (
                    <tr key={asset.id} className="hover:bg-slate-700/20 transition-all group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/50 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-indigo-500/50 transition-colors">
                            {asset.type === 'image' ? <ImageIcon size={20} className="text-emerald-500/70" /> : <Music size={20} className="text-indigo-500/70" />}
                          </div>
                          <span className="font-bold text-sm text-slate-200 group-hover:text-indigo-400 transition-colors">{asset.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{asset.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500 font-medium">{asset.size}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500 font-medium">{asset.date}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-slate-500 hover:text-white transition-colors"><Download size={16} /></button>
                          <button onClick={() => deleteAsset(asset.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 푸터 */}
        <footer className="h-10 bg-slate-900 border-t border-slate-800 flex items-center px-8 justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> 시스템 안정적</span>
            <span className="opacity-40">STORAGE NODE: AWS-SEOUL-01</span>
          </div>
          <div className="opacity-40">© 2023 Mango Media Asset System</div>
        </footer>
      </main>

      {/* 스타일 커스텀 */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
};

export default App;
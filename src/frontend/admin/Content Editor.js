import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Eye, 
  Settings, 
  Image as ImageIcon, 
  Type, 
  Layout, 
  Send, 
  ChevronLeft,
  Bold,
  Italic,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';

/**
 * 파일 경로: mango/src/frontend/admin/ContentEditor.jsx
 * 처리 방식: 신규 파일 생성
 * 설명: 관리자가 실제 웹 콘텐츠를 작성하고 미디어 자산을 삽입하며 실시간 미리보기를 할 수 있는 에디터입니다.
 */

const App = () => {
  const [title, setTitle] = useState('새로운 프로젝트 소식');
  const [content, setContent] = useState('여기에 내용을 입력하세요...');
  const [isPreview, setIsPreview] = useState(false);
  const [status, setStatus] = useState('draft'); // draft, published
  const [lastSaved, setLastSaved] = useState(null);

  const handleSave = () => {
    // 저장 시뮬레이션
    const now = new Date().toLocaleTimeString();
    setLastSaved(now);
    // 실제 환경에서는 여기서 API 호출을 수행합니다.
    console.log("Saving content:", { title, content, status });
  };

  return (
    <div className="flex flex-col h-screen bg-white text-slate-900 font-sans overflow-hidden">
      {/* 상단 에디터 툴바 */}
      <header className="h-16 border-b border-slate-200 px-6 flex items-center justify-between bg-white/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft size={20} className="text-slate-500" />
          </button>
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Editor</span>
          <h2 className="text-sm font-bold truncate max-w-[200px]">{title || "제목 없음"}</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-[11px] text-slate-400 mr-4 font-medium">
            {lastSaved ? `마지막 저장: ${lastSaved}` : '저장되지 않음'}
          </div>
          <button 
            onClick={() => setIsPreview(!isPreview)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isPreview ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-100 text-slate-600'}`}
          >
            <Eye size={16} />
            <span>{isPreview ? '에디터로 복귀' : '미리보기'}</span>
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-700 transition-all shadow-md active:scale-95"
          >
            <Save size={16} />
            <span>임시 저장</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
            <Send size={16} />
            <span>발행하기</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* 왼쪽: 에디터 패널 */}
        <div className={`flex-1 overflow-y-auto p-12 transition-all duration-500 ${isPreview ? 'opacity-0 translate-x-[-20px] pointer-events-none' : 'opacity-100'}`}>
          <div className="max-w-3xl mx-auto">
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="포스트 제목을 입력하세요"
              className="w-full text-5xl font-black mb-8 placeholder:text-slate-200 outline-none border-none tracking-tight text-slate-900"
            />
            
            {/* 서식 도구바 */}
            <div className="sticky top-0 bg-white py-4 border-b border-slate-100 mb-8 flex items-center gap-2 z-10">
              <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><Bold size={18} /></button>
              <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><Italic size={18} /></button>
              <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><Link size={18} /></button>
              <div className="h-4 w-[1px] bg-slate-200 mx-1" />
              <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><AlignLeft size={18} /></button>
              <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><AlignCenter size={18} /></button>
              <button className="p-2 hover:bg-slate-100 rounded text-slate-600"><AlignRight size={18} /></button>
              <div className="h-4 w-[1px] bg-slate-200 mx-1" />
              <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-indigo-50 text-indigo-600 rounded text-xs font-bold transition-colors">
                <ImageIcon size={14} /> 자산 추가
              </button>
            </div>

            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[500px] text-lg leading-relaxed text-slate-700 outline-none border-none resize-none placeholder:text-slate-300"
              placeholder="당신의 이야기를 시작하세요..."
            />
          </div>
        </div>

        {/* 오른쪽: 미리보기 모드 (전체 화면 전환 시 표시) */}
        {isPreview && (
          <div className="absolute inset-0 bg-slate-50 overflow-y-auto p-12 z-30 flex justify-center animate-in fade-in zoom-in duration-300">
            <div className="max-w-2xl w-full bg-white shadow-2xl shadow-slate-200 rounded-3xl p-16 h-fit">
              <div className="mb-10">
                <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Preview Mode</span>
              </div>
              <h1 className="text-4xl font-bold mb-6 text-slate-900">{title}</h1>
              <div className="prose prose-slate lg:prose-xl">
                <p className="text-slate-600 whitespace-pre-wrap leading-loose">
                  {content}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 우측 사이드바: 설정 */}
        <aside className="w-80 border-l border-slate-200 bg-slate-50/50 p-6 overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">발행 설정</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">URL 경로</label>
                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-400 italic">
                  <span>/posts/</span>
                  <input type="text" className="bg-transparent outline-none text-slate-700 font-medium not-italic" defaultValue="new-project" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">카테고리</label>
                <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none">
                  <option>업데이트</option>
                  <option>뉴스</option>
                  <option>이벤트</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">대표 이미지</h3>
            <div className="aspect-video bg-slate-200 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-indigo-400 cursor-pointer transition-all group">
              <ImageIcon size={24} className="mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold">이미지 선택</span>
            </div>
          </div>

          <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-600/20">
            <h4 className="text-sm font-bold mb-1">작성 팁</h4>
            <p className="text-[11px] opacity-80 leading-normal">
              이미지 자산을 본문에 삽입하려면 왼쪽의 '자산 추가' 버튼을 사용하세요.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default App;
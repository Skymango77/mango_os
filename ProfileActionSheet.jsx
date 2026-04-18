import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

/**
 * ProfileActionSheet - Auto-Save UX Version
 */
export const ProfileActionSheet = ({ isOpen, onClose, type, piId, userName, onUpdate, showToast }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    showToast("⏳ 프로필 반영 중...");

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `public/${piId}/${type}_${Date.now()}.${fileExt}`;

      // 1. Storage Upload
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      // 2. Get URL & DB Upsert
      const { data: { publicUrl } } = supabase.storage.from('profiles').getPublicUrl(filePath);
      const updates = { 
        pi_id: piId, 
        user_name: userName, 
        [type === 'avatar' ? 'avatar_url' : 'bg_url']: publicUrl 
      };

      const { error: dbError } = await supabase.from('user_profiles').upsert(updates);
      if (dbError) throw dbError;

      // 3. UI Update & Auto-Close
      onUpdate(type, publicUrl);
      showToast("✅ 프로필 사진이 변경되었습니다");
      onClose();
    } catch (err) {
      showToast("❌ 업데이트 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      const updates = { pi_id: piId, [type === 'avatar' ? 'avatar_url' : 'bg_url']: null };
      await supabase.from('user_profiles').upsert(updates);
      onUpdate(type, null);
      showToast("♻️ 기본 이미지로 변경되었습니다");
      onClose();
    } catch (err) {
      showToast("❌ 초기화 실패");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-[480px] p-4 transform transition-transform duration-300">
        <div className="bg-[#1e293b]/95 backdrop-blur-2xl rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
          <label className="block w-full py-5 text-center text-sm font-bold text-white border-b border-white/5 active:bg-white/10 cursor-pointer">
            {loading ? "업로드 중..." : "앨범에서 선택 (Choose from Album)"}
            <input type="file" className="hidden" accept="image/*" onChange={handleMediaUpload} disabled={loading} />
          </label>
          <button onClick={handleReset} className="w-full py-5 text-sm font-bold text-red-400 active:bg-white/10">
            기본 이미지로 변경 (Reset to Default)
          </button>
        </div>
        <button onClick={onClose} className="w-full mt-3 py-5 bg-[#1e293b]/95 backdrop-blur-2xl rounded-[1.5rem] text-sm font-black text-white shadow-xl active:scale-95 transition-all">
          취소 (Cancel)
        </button>
      </div>
    </div>
  );
};

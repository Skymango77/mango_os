export default function TravelChatPreview() {
  return (
    <div className="glass-card p-4">
      <h3 className="font-bold mb-3">💬 여행자 커뮤니티</h3>
      <div className="space-y-2 text-sm">
        <div className="bg-white/5 p-3 rounded-xl">
          “도쿄 혼자 여행인데 같이 가실 분?”
        </div>
        <div className="bg-white/5 p-3 rounded-xl">
          “이 근처 마트 어디가 좋아요?”
        </div>
      </div>
      <button className="mt-3 w-full py-2 rounded-xl bg-orange-500 text-black font-bold">
        커뮤니티 참여하기
      </button>
    </div>
  );
}

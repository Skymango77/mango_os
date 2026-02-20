export default function SpotRecommendations() {
  const spots = [
    { id: 1, name: "아사쿠사 센소지", saves: 1240, type: "tourist", img: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800" },
    { id: 2, name: "시부야 골목 카페", saves: 860, type: "local", img: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=800" },
  ];

  return (
    <div className="glass-card p-4">
      <h3 className="text-white font-bold mb-3">📍 여행자 추천 스팟</h3>
      <div className="space-y-3">
        {spots.map(spot => (
          <div key={spot.id} className="flex gap-3 items-center bg-white/5 rounded-xl p-2 hover:bg-white/10 transition">
            <img src={spot.img} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="text-sm font-semibold">{spot.name}</div>
              <div className="text-xs text-white/40">💾 {spot.saves} saved</div>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-400">
              {spot.type === "local" ? "현지인" : "관광"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HobbyTravelFeed() {
  const feeds = [
    {
      id: 1,
      user: "TravelJun",
      route: "도쿄 3일 루트",
      img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800"
    }
  ];

  return (
    <div className="glass-card p-4">
      <h3 className="text-white font-bold mb-3">🎨 Hobby Travel</h3>
      <div className="space-y-4">
        {feeds.map(feed => (
          <div key={feed.id} className="rounded-xl overflow-hidden bg-white/5">
            <img src={feed.img} className="w-full h-40 object-cover" />
            <div className="p-3">
              <div className="text-sm font-semibold">{feed.route}</div>
              <div className="text-xs text-white/40">by {feed.user}</div>
              <div className="flex gap-3 mt-2 text-xs">
                <button>❤️ Like</button>
                <button>🔖 Save</button>
                <button>🍜 Food 연결</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

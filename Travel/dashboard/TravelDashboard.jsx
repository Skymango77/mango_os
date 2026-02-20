import SpotRecommendations from "./components/SpotRecommendations";
import HobbyTravelFeed from "./components/HobbyTravelFeed";
import TravelChatPreview from "./components/TravelChatPreview";
import MangoAITravelSummary from "./components/MangoAITravelSummary";

export default function TravelDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-[420px] mx-auto space-y-4">
      
      {/* Header */}
      <div className="glass-card p-4 rounded-2xl">
        <h1 className="text-lg font-black">✈️ 부산 → 도쿄</h1>
        <p className="text-xs text-white/50">
          4박 5일 · 가성비 · 예상 예산 120만
        </p>
      </div>

      {/* AI Summary */}
      <MangoAITravelSummary />

      {/* Spot Recommendations */}
      <SpotRecommendations />

      {/* Hobby Feed */}
      <HobbyTravelFeed />

      {/* Community */}
      <TravelChatPreview />

    </div>
  );
}

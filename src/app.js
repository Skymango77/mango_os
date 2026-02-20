import "./styles/mango-theme.css";
import MapMock from "./components/MapMock";
import ReviewList from "./components/ReviewList";
import Recommendations from "./components/Recommendations";
import DeliveryModulePlaceholder from "./components/DeliveryModulePlaceholder";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <div className="app-header">
        🍍 Mango Food Portal
      </div>

      <div className="mango-card portal-glow">
        <MapMock/>
      </div>

      <div className="mango-card">
        <Recommendations/>
      </div>

      <div className="mango-card">
        <ReviewList/>
      </div>

      <div className="mango-card">
        <DeliveryModulePlaceholder/>
      </div>
    </div>
  );
}
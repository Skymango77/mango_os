import { useState } from "react";
import FoodPortal from "./pages/FoodPortal.jsx";
import Cart from "./pages/Cart.jsx";
import CourierTracking from "./pages/CourierTracking.jsx";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <header className="topbar">
        <img src="/src/assets/food_icon_small.png" width="32" />
        <span className="title">Mango — Food Portal</span>
      </header>

      {page === "home" && <FoodPortal />}
      {page === "cart" && <Cart />}
      {page === "track" && <CourierTracking />}

      <footer>
        <button onClick={() => setPage("home")}>🏠 Home</button>
        <button onClick={() => setPage("cart")}>🛒 Cart</button>
        <button onClick={() => setPage("track")}>📍 Tracking</button>
      </footer>
    </div>
  );
}

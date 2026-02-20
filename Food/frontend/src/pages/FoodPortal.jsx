import { useEffect, useState } from "react";

export default function FoodPortal() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/vendors")
      .then((res) => res.json())
      .then(data => setVendors(data));
  }, []);

  return (
    <div className="page">
      <h2>🍽 추천 맛집</h2>

      {vendors.map((v, i) => (
        <div key={i} className="vendor-card">
          <img src={v.image} width="100%" />
          <h3>{v.name}</h3>
          <p>{v.city} · {v.category}</p>
          <span>⭐ {v.rating}</span>
        </div>
      ))}
    </div>
  );
}

import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import vendorRoutes from "./routes/vendors.js";
import menuRoutes from "./routes/menus.js";
import orderRoutes from "./routes/orders.js";
import reviewRoutes from "./routes/reviews.js";

const app = express();
app.use(express.json());
app.use(cors());

// API Routes
app.use("/vendors", vendorRoutes);
app.use("/menus", menuRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Driver tracking simulation
io.on("connection", (socket) => {
  console.log("Driver connected:", socket.id);

  setInterval(() => {
    socket.emit("courier-location", {
      lat: 35.1576 + Math.random() * 0.002,
      lng: 129.055 + Math.random() * 0.002
    });
  }, 2000);
});

server.listen(5000, () => {
  console.log("🚀 Backend API running on http://localhost:5000");
});

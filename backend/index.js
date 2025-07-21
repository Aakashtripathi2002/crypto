import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import CryptoAsset from "./models/CryptoAsset.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/crypto", cryptoRoutes);

// Socket.IO Events
io.on("connection", (socket) => {
  // console.log(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Price update logic
const generatePrices = async () => {
  try {
    const assets = await CryptoAsset.find();
    const updatedAssets = await Promise.all(
      assets.map(async (asset) => {
        const randomPrice = (
          Math.random() * (asset.max_price - asset.min_price) + asset.min_price
        ).toFixed(2);
        asset.current_price = parseFloat(randomPrice);
        return asset.save();
      })
    );
    io.emit("priceUpdate", updatedAssets);
  } catch (error) {
    console.error("Error updating prices:", error.message);
  }
};
setInterval(generatePrices, 10000);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Graceful shutdown on Ctrl+C
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => process.exit(0));
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

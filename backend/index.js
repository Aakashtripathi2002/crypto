import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { initSocket } from "./utils/socket.js";
import { generatePrices } from "./utils/priceGenerator.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = initSocket(server); // Initialize socket here

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

// Price update every 10 seconds
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

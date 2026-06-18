import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./src/routes/authRoutes.js";
import auctionRoutes from "./src/routes/auctionRoutes.js";
import bidRoutes from "./src/routes/bidRoutes.js";
import aiRoutes from "./src/routes/aiRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import createAdminRoutes from "./src/routes/adminRoutes.js";

import { setupSocket } from "./src/socket/bidSocket.js";
import { startAuctionExpiryJob } from "./src/jobs/auctionExpiry.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

const allowedOrigins = [
  "http://localhost:5173",
  "https://bidwave-gray.vercel.app", // update after step 3
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({ message: "BidWave API is running" });
});

// Routes — admin routes need io, so it's created as a function call
app.use("/api/auth", authRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", createAdminRoutes(io));

setupSocket(io);
startAuctionExpiryJob(io);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

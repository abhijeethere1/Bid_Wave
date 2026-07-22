import express from "express";
import {
  getFlaggedAuctions,
  updateFlagStatus,
  getPendingVerifications,
  verifyShipment,
} from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

export default (io) => {
  router.get("/flagged", protect, getFlaggedAuctions);
  router.patch("/flagged/:id", protect, updateFlagStatus(io));
  router.get("/pending-verifications", protect, getPendingVerifications);
  router.post("/verify-shipment/:auctionId", protect, verifyShipment);
  return router;
};

import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getAuctions,
  getAuction,
  createAuction,
  getAuctionResults,
} from "../controllers/auctionController.js";

const router = express.Router();

router.get("/", getAuctions);
router.get("/:id", getAuction);
router.get("/:id/results", protect, getAuctionResults);
router.post("/", protect, createAuction);

export default router;

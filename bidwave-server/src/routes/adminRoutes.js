import express from "express";
import {
  getFlaggedAuctions,
  updateFlagStatus,
} from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/flagged", protect, getFlaggedAuctions);
router.patch("/flagged/:id", protect, updateFlagStatus);

export default router;

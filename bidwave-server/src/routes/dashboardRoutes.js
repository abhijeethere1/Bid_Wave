import express from "express";
import {
  getBuyerDashboard,
  getSellerDashboard,
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/buyer", protect, getBuyerDashboard);
router.get("/seller", protect, getSellerDashboard);

export default router;

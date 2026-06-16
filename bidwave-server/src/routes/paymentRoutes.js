import express from "express";
import {
  createPaymentOrder,
  verifyPayment,
  getPendingPayments,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-order", protect, createPaymentOrder);
router.post("/verify", protect, verifyPayment);
router.get("/pending", protect, getPendingPayments);

export default router;

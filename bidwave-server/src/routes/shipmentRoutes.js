import express from "express";
import {
  markShipped,
  getSellerShipments,
} from "../controllers/shipmentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/:auctionId/mark-shipped", protect, markShipped);
router.get("/seller", protect, getSellerShipments);

export default router;

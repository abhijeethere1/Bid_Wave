import express from "express";
import { generateDescription } from "../controllers/aiController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/describe", protect, generateDescription);

export default router;

import express from "express";
import {
  register,
  login,
  getMe,
  googleAuth,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/google", googleAuth);
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;

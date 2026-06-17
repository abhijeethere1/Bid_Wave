import express from "express";
import { protect } from "../middleware/auth.js";
import {
  register,
  login,
  getMe,
  googleAuth,
  updateProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.put("/profile", protect, updateProfile);
router.post("/google", googleAuth);
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;

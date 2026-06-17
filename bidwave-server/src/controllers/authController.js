import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../config/db.js";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleAuth = async (req, res) => {
  const { accessToken, role = "buyer" } = req.body;

  try {
    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    const { name, email, picture } = await googleRes.json();

    if (!email) {
      return res
        .status(400)
        .json({ message: "Could not get user info from Google" });
    }

    let { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) {
      const { data: newUser, error } = await supabase
        .from("users")
        .insert([
          {
            name,
            email,
            password: "GOOGLE_AUTH",
            role,
            avatar_url: picture, // ← saves Google profile pic
          },
        ])
        .select()
        .single();

      if (error) throw error;
      user = newUser;
    }

    res.json({
      message: "Google login successful",
      token: generateToken(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar_url: user.avatar_url,
      },
    });
  } catch (err) {
    console.error("Google auth error:", err.message);
    res.status(401).json({ message: "Google authentication failed" });
  }
};

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

// REGISTER
export const register = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  try {
    // Check if user exists
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const { data: user, error } = await supabase
      .from("users")
      .insert([
        { name, email, phone, password: hashedPassword, role: role || "buyer" },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      message: "Account created successfully",
      token: generateToken(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if user is blocked
    if (user.is_blocked) {
      return res
        .status(403)
        .json({
          message:
            "Your account has been blocked due to suspicious activity. Contact support.",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET CURRENT USER
export const getMe = async (req, res) => {
  const { data: user } = await supabase
    .from("users")
    .select("id, name, email, phone, role, avatar_url")
    .eq("id", req.user.id)
    .single();

  res.json(user);
};

export const updateProfile = async (req, res) => {
  const { name, phone, avatar_url } = req.body;
  const userId = req.user.id;

  try {
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (phone !== undefined) updates.phone = phone;
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;

    const { data: user, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select("id, name, email, phone, role, avatar_url")
      .single();

    if (error) throw error;

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

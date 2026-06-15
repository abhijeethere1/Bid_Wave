import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req, res) => {
  const { imageBase64, mediaType } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ message: "No image provided" });
  }

  try {
    const result = await cloudinary.uploader.upload(
      `data:${mediaType};base64,${imageBase64}`,
      {
        folder: "bidwave",
        transformation: [{ width: 800, height: 600, crop: "limit" }],
      },
    );

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ message: "Image upload failed" });
  }
};

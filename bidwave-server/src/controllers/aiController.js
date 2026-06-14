export const generateDescription = async (req, res) => {
  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ message: "No image provided" });
  }

  // Simulated AI response
  await new Promise((resolve) => setTimeout(resolve, 2500));

  res.json({
    title: "Sony WH-1000XM5 Wireless Headphones",
    description:
      "Premium noise-cancelling headphones in excellent condition. Features 30-hour battery life and crystal clear sound quality. All original accessories included.",
    category: "Electronics",
    suggestedPrice: 8000,
  });
};

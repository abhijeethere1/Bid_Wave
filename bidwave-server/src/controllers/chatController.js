import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const BIDWAVE_CONTEXT = `You are BidWave's customer support assistant. BidWave is an Indian online auction platform.

Key facts about BidWave:
- Buyers browse and bid on live auctions with real-time updates
- Sellers list items with photos, set a starting price and auction end time
- BidWave uses an ESCROW payment system — buyers pay BidWave (not the seller directly)
- Every item is physically verified at BidWave's fulfillment center before delivery
- Delivery charges: Small items ₹80, Medium ₹150, Large ₹400, Extra Large custom quote
- Seller gets paid only after buyer confirms delivery
- Auction auto-ends when timer hits zero, highest bidder wins
- Winner has 48 hours to complete payment or auction is re-listed
- Support email: supportbidwave@gmail.com
- Google OAuth and email/password login supported
- AI auto-generates item descriptions from photos
- Fraud detection system monitors suspicious bidding patterns
- Roles: Buyer, Seller, Admin

Answer questions helpfully, concisely (2-3 sentences max), and in a friendly tone.
If asked something outside BidWave's scope, politely redirect to the support email.`;

// Keyword fallback for when API quota is exceeded
const keywordFallback = (message) => {
  const msg = message.toLowerCase();
  if (msg.includes("bid") && msg.includes("how"))
    return "To place a bid, open any live auction, enter an amount higher than the current bid and click 'Bid Now'. You can also use the quick bid buttons (+₹500, +₹1000, +₹2000) for convenience!";
  if (msg.includes("payment") || msg.includes("pay"))
    return "BidWave uses an escrow payment system. When you win, you pay us — not the seller directly. We release payment to the seller only after you confirm delivery. Zero risk!";
  if (msg.includes("delivery") || msg.includes("shipping"))
    return "Delivery charges: Small ₹80, Medium ₹150, Large ₹400. The seller ships to our center first, we verify the item, then deliver it to you with full tracking.";
  if (msg.includes("sell") || msg.includes("list"))
    return "To sell, click 'Sell Item' in the navbar. Upload photos, our AI auto-fills the description, set a price and auction end time. Once someone wins, ship the item to our fulfillment center.";
  if (msg.includes("safe") || msg.includes("scam") || msg.includes("trust"))
    return "BidWave is completely scam-free! We physically verify every item at our fulfillment center before delivery, and payments are held in escrow until you confirm receipt.";
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey"))
    return "Hello! Welcome to BidWave 👋 I'm here to help with bidding, selling, payments, or delivery questions. What would you like to know?";
  if (
    msg.includes("contact") ||
    msg.includes("support") ||
    msg.includes("help")
  )
    return "For complex issues, email us at supportbidwave@gmail.com. Our team responds within 24 hours!";
  return "I can help with bidding, selling, payments, delivery and more. Could you rephrase your question? For urgent issues contact supportbidwave@gmail.com";
};

export const chat = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "No message provided" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

    const result = await model.generateContent([
      BIDWAVE_CONTEXT,
      `User question: ${message}`,
    ]);

    const reply = result.response.text().trim();
    res.json({ reply });
  } catch (err) {
    console.error("Chat AI Error:", err.message);
    // Fallback to keyword matching if API fails or quota exceeded
    const reply = keywordFallback(message);
    res.json({ reply });
  }
};

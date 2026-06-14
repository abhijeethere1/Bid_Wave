// Smart keyword-based responses about BidWave
const getResponse = (message) => {
  const msg = message.toLowerCase();

  if (msg.includes("bid") && msg.includes("how")) {
    return "To place a bid, open any live auction and enter an amount higher than the current bid. You can also use our quick bid buttons (+₹500, +₹1000, +₹2000) for convenience!";
  }
  if (msg.includes("payment") || msg.includes("pay")) {
    return "BidWave uses an escrow payment system. When you win an auction, you pay us directly — not the seller. We only release payment to the seller after you confirm delivery. This eliminates all scam risk!";
  }
  if (
    msg.includes("delivery") ||
    msg.includes("shipping") ||
    msg.includes("deliver")
  ) {
    return "Delivery charges are based on item size — Small: ₹80, Medium: ₹150, Large: ₹400. The seller ships to our fulfillment center first, we verify the item, then deliver it to you with full tracking.";
  }
  if (msg.includes("sell") || msg.includes("list") || msg.includes("seller")) {
    return "To sell an item, click 'Sell Item' in the navbar. Upload photos, set a starting price and auction duration. Our AI can auto-generate the description from your photo! Once the auction ends, ship the item to our fulfillment center.";
  }
  if (
    msg.includes("scam") ||
    msg.includes("safe") ||
    msg.includes("trust") ||
    msg.includes("fraud")
  ) {
    return "BidWave is completely scam-free! We physically hold and verify every item at our fulfillment center before delivery. Payments are held in escrow until you confirm receipt. Neither buyers nor sellers can cheat the system.";
  }
  if (
    msg.includes("refund") ||
    msg.includes("return") ||
    msg.includes("cancel")
  ) {
    return "If the item doesn't match its description, we issue a full refund. Our team verifies every item at the fulfillment center before dispatch. Disputes are handled by our admin team within 48 hours.";
  }
  if (
    msg.includes("duration") ||
    msg.includes("time") ||
    msg.includes("long") ||
    msg.includes("end")
  ) {
    return "Sellers can set any auction end date and time — from 1 hour to 7 days. You'll see a live countdown timer on every auction page that syncs across all users in real time.";
  }
  if (
    msg.includes("register") ||
    msg.includes("signup") ||
    msg.includes("account") ||
    msg.includes("join")
  ) {
    return "Creating an account is completely free! Click 'Get Started' in the top right corner. You can sign up as a buyer or seller. No credit card required to register.";
  }
  if (
    msg.includes("fee") ||
    msg.includes("commission") ||
    msg.includes("charge") ||
    msg.includes("cost")
  ) {
    return "BidWave charges a small platform commission on successful auctions. Delivery fees are ₹80 (Small), ₹150 (Medium), ₹400 (Large). Listing an item is completely free for sellers!";
  }
  if (
    msg.includes("contact") ||
    msg.includes("support") ||
    msg.includes("help") ||
    msg.includes("human")
  ) {
    return "For urgent issues, email us at support@bidwave.in or use the Contact page. Our support team responds within 24 hours. For disputes, use the 'Raise Dispute' option in your dashboard.";
  }
  if (msg.includes("winner") || msg.includes("win") || msg.includes("won")) {
    return "When you win an auction, you'll receive an email notification and a 'Pay Now' button appears in your dashboard. You have 48 hours to complete payment. After that, the auction may be re-listed.";
  }
  if (
    msg.includes("verify") ||
    msg.includes("verification") ||
    msg.includes("authentic")
  ) {
    return "Every item is physically checked by our team at the fulfillment center. We verify that the item matches the photos and description before dispatching it to the buyer. Fake or mismatched items are returned to the seller.";
  }
  if (
    msg.includes("hello") ||
    msg.includes("hi") ||
    msg.includes("hey") ||
    msg.includes("namaste")
  ) {
    return "Hello! Welcome to BidWave 👋 I'm here to help you with any questions about bidding, selling, payments, or delivery. What would you like to know?";
  }
  if (msg.includes("thank")) {
    return "You're welcome! Happy bidding on BidWave 🎯 Let me know if you have any other questions.";
  }

  return "I can help you with questions about bidding, selling, payments, delivery, and more. Could you rephrase your question? Or contact our support team at support@bidwave.in for complex queries.";
};

export const chat = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "No message provided" });
  }

  // Simulate thinking time
  await new Promise((resolve) => setTimeout(resolve, 800));

  const reply = getResponse(message);
  res.json({ reply });
};

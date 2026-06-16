import Razorpay from "razorpay";
import crypto from "crypto";
import supabase from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
export const createPaymentOrder = async (req, res) => {
  console.log("📦 Create order called:", req.body);
  console.log(
    "🔑 Razorpay Key:",
    process.env.RAZORPAY_KEY_ID ? "Loaded" : "MISSING",
  );
  const { paymentId } = req.body;
  const buyerId = req.user.id;

  try {
    const { data: payment, error } = await supabase
      .from("payments")
      .select(`*, auction:auctions(id, title, images, delivery_charge)`)
      .eq("id", paymentId)
      .eq("buyer_id", buyerId)
      .single();

    if (error || !payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.status !== "pending") {
      return res.status(400).json({ message: "Payment already processed" });
    }
    console.log(
      "💳 Payment record found:",
      payment?.id,
      "Amount:",
      payment?.total_amount,
    );
    console.log("🔑 Creating Razorpay order...");
    // Create Razorpay order (amount in paise)
    const order = await razorpay.orders.create({
      amount: payment.total_amount * 100,
      currency: "INR",
      receipt: `bw_${paymentId.replace(/-/g, "").slice(0, 36)}`,
      notes: {
        paymentId,
        auctionId: payment.auction_id,
        buyerId: payment.buyer_id,
        sellerId: payment.seller_id,
      },
    });

    // Save Razorpay order ID
    await supabase
      .from("payments")
      .update({ payment_gateway_order_id: order.id })
      .eq("id", paymentId);

    res.json({ order, payment });
  } catch (err) {
    console.error("Create order error FULL:", err);
    console.error("Create order error message:", err?.message);
    console.error("Create order error description:", err?.error?.description);
    res.status(500).json({ message: err?.message || "Something went wrong" });
  }
};

// Verify payment after Razorpay confirms
export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    paymentId,
  } = req.body;

  try {
    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Update payment status
    await supabase
      .from("payments")
      .update({ status: "paid" })
      .eq("id", paymentId);

    // Get auction id for shipment update
    const { data: payment } = await supabase
      .from("payments")
      .select("auction_id")
      .eq("id", paymentId)
      .single();

    await supabase
      .from("shipments")
      .update({ status: "awaiting_shipment" })
      .eq("auction_id", payment.auction_id);

    console.log(`✅ Payment verified for paymentId: ${paymentId}`);
    res.json({ message: "Payment verified successfully" });
  } catch (err) {
    console.error("Verify payment error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Get pending payments
export const getPendingPayments = async (req, res) => {
  const buyerId = req.user.id;
  try {
    const { data, error } = await supabase
      .from("payments")
      .select(`*, auction:auctions(id, title, images, delivery_charge)`)
      .eq("buyer_id", buyerId)
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

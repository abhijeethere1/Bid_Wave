import supabase from "../config/db.js";

// Rule weights — each rule adds to risk score
const RULES = {
  SELLER_SELF_BID: 100, // Instant flag
  NEW_ACCOUNT_HIGH_BID: 50, // Account < 7 days, bid > 50% of price
  ABNORMAL_BID_JUMP: 40, // Bid > 3x current price
  RAPID_BIDDING: 60, // Same user bid < 10 seconds ago
  EXCESSIVE_BIDS: 45, // Same user bid > 5 times on same auction
  ROUND_NUMBER_PATTERN: 20, // Suspiciously round numbers repeatedly
};

export const analyzeBid = async ({ auction, bid, bidderId, bidAmount }) => {
  const reasons = [];
  let riskScore = 0;

  try {
    // ── Rule 1: Seller bidding on own auction ──
    if (auction.seller_id === bidderId) {
      reasons.push("Seller attempted to bid on own auction");
      riskScore += RULES.SELLER_SELF_BID;
    }

    // ── Rule 2: New account bidding aggressively ──
    const { data: bidder } = await supabase
      .from("users")
      .select("created_at")
      .eq("id", bidderId)
      .single();

    if (bidder) {
      const accountAge =
        (Date.now() - new Date(bidder.created_at)) / (1000 * 60 * 60 * 24);
      const bidPercent = (bidAmount / auction.current_price) * 100;

      if (accountAge < 7 && bidPercent > 150) {
        reasons.push(
          `New account (${Math.floor(accountAge)} days old) placing unusually high bid`,
        );
        riskScore += RULES.NEW_ACCOUNT_HIGH_BID;
      }
    }

    // ── Rule 3: Abnormal bid jump ──
    if (bidAmount > auction.current_price * 3) {
      reasons.push(
        `Bid of ₹${bidAmount} is ${Math.round(bidAmount / auction.current_price)}x the current price`,
      );
      riskScore += RULES.ABNORMAL_BID_JUMP;
    }

    // ── Rule 4: Rapid bidding (same user bid very recently) ──
    const { data: recentBids } = await supabase
      .from("bids")
      .select("created_at")
      .eq("auction_id", auction.id)
      .eq("bidder_id", bidderId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (recentBids && recentBids.length > 0) {
      const lastBidTime = new Date(recentBids[0].created_at);
      const timeDiff = (Date.now() - lastBidTime) / 1000; // seconds

      if (timeDiff < 10) {
        reasons.push(
          `Bid placed only ${Math.round(timeDiff)} seconds after previous bid`,
        );
        riskScore += RULES.RAPID_BIDDING;
      }
    }

    // ── Rule 5: Excessive bids from same user ──
    const { count } = await supabase
      .from("bids")
      .select("*", { count: "exact", head: true })
      .eq("auction_id", auction.id)
      .eq("bidder_id", bidderId);

    if (count > 5) {
      reasons.push(`User has placed ${count} bids on this auction`);
      riskScore += RULES.EXCESSIVE_BIDS;
    }

    // ── Rule 6: Round number pattern ──
    if (bidAmount % 1000 === 0 && bidAmount > auction.current_price * 1.5) {
      reasons.push(`Suspicious round number bid pattern: ₹${bidAmount}`);
      riskScore += RULES.ROUND_NUMBER_PATTERN;
    }

    console.log(
      `🔍 Fraud check — Score: ${riskScore} — Reasons: ${reasons.join(", ") || "None"}`,
    );

    // ── Flag if risk score exceeds threshold ──
    if (riskScore >= 70) {
      await supabase.from("flagged_auctions").insert([
        {
          auction_id: auction.id,
          bid_id: bid.id,
          bidder_id: bidderId,
          risk_score: riskScore,
          reasons,
          status: "pending",
        },
      ]);

      console.log(`🚨 Auction ${auction.id} FLAGGED — Score: ${riskScore}`);
      return { flagged: true, riskScore, reasons };
    }

    return { flagged: false, riskScore, reasons };
  } catch (err) {
    console.error("Fraud detection error:", err.message);
    return { flagged: false, riskScore: 0, reasons: [] };
  }
};

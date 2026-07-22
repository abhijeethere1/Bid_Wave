import supabase from "../config/db.js";

// BUYER DASHBOARD
export const getBuyerDashboard = async (req, res) => {
  const buyerId = req.user.id;

  try {
    // Get all payments for this buyer
    const { data: payments } = await supabase
      .from("payments")
      .select(
        `
        *,
        auction:auctions(
          id, title, images, size,
          delivery_charge, current_price
        )
      `,
      )
      .eq("buyer_id", buyerId)
      .order("created_at", { ascending: false });

    // Get active bids (auctions still live where user has bid)
    const { data: activeBids } = await supabase
      .from("bids")
      .select(
        `
        *,
        auction:auctions(id, title, status, current_price, ends_at)
      `,
      )
      .eq("bidder_id", buyerId)
      .eq("auctions.status", "live");

    // Calculate stats
    const wonAuctions = payments?.length || 0;
    const totalSpent =
      payments?.reduce((sum, p) => sum + p.total_amount, 0) || 0;
    const itemsReceived =
      payments?.filter((p) => p.status === "released").length || 0;
    const activeBidCount = activeBids?.length || 0;

    res.json({
      stats: {
        activeBids: activeBidCount,
        auctionsWon: wonAuctions,
        totalSpent,
        itemsReceived,
      },
      orders: payments || [],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SELLER DASHBOARD
export const getSellerDashboard = async (req, res) => {
  const sellerId = req.user.id;

  try {
    const { data: auctions } = await supabase
      .from("auctions")
      .select(
        `
    *,
    payments(id, status, total_amount, auction_amount, buyer_id, created_at),
    shipments(id, status),
    bids(id, amount)
  `,
      )
      .eq("seller_id", sellerId)
      .order("created_at", { ascending: false });

    const activeListings =
      auctions?.filter((a) => a.status === "live").length || 0;
    const totalSold = auctions?.filter((a) => a.status === "ended").length || 0;

    const totalEarned =
      auctions?.reduce((sum, a) => {
        const released =
          a.payments?.filter((p) => p.status === "released") || [];
        return sum + released.reduce((s, p) => s + p.auction_amount, 0);
      }, 0) || 0;

    const pendingPayout =
      auctions?.reduce((sum, a) => {
        const pending =
          a.payments?.filter(
            (p) => p.status === "pending" || p.status === "paid",
          ) || [];
        return sum + pending.reduce((s, p) => s + p.auction_amount, 0);
      }, 0) || 0;

    res.json({
      stats: { activeListings, totalSold, totalEarned, pendingPayout },
      listings: auctions || [],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

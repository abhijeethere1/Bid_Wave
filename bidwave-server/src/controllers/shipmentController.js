import supabase from "../config/db.js";

export const markShipped = async (req, res) => {
  const { auctionId } = req.params;
  const sellerId = req.user.id;

  try {
    // Verify this auction belongs to this seller
    const { data: auction, error: auctionError } = await supabase
      .from("auctions")
      .select("id, seller_id, status")
      .eq("id", auctionId)
      .single();

    if (auctionError || !auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    if (auction.seller_id !== sellerId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (auction.status !== "ended") {
      return res.status(400).json({ message: "Auction must be ended first" });
    }

    // Check payment is made by buyer
    const { data: payment } = await supabase
      .from("payments")
      .select("id, status")
      .eq("auction_id", auctionId)
      .single();

    if (!payment || payment.status === "pending") {
      return res
        .status(400)
        .json({ message: "Buyer has not completed payment yet" });
    }

    // Update shipment status to shipped_to_center
    const { data: existing } = await supabase
      .from("shipments")
      .select("id")
      .eq("auction_id", auctionId)
      .single();

    if (existing) {
      await supabase
        .from("shipments")
        .update({ status: "shipped_to_center" })
        .eq("auction_id", auctionId);
    } else {
      await supabase
        .from("shipments")
        .insert([{ auction_id: auctionId, status: "shipped_to_center" }]);
    }

    console.log(`✅ Seller marked auction ${auctionId} as shipped to center`);
    res.json({ message: "Item marked as shipped successfully" });
  } catch (err) {
    console.error("Mark shipped error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const getSellerShipments = async (req, res) => {
  const sellerId = req.user.id;
  try {
    const { data, error } = await supabase
      .from("shipments")
      .select(`*, auction:auctions(id, title, seller_id)`)
      .eq("auctions.seller_id", sellerId);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

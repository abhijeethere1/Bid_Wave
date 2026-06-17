import supabase from "../config/db.js";
import redis from "../config/redis.js";

export const getFlaggedAuctions = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("flagged_auctions")
      .select(
        `
        *,
        auction:auctions(id, title, images, current_price),
        bidder:users(id, name, email, is_blocked)
      `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    res.json(data);
  } catch (err) {
    console.error("getFlaggedAuctions error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Factory function — accepts io and returns the actual controller
export const updateFlagStatus = (io) => async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const { data: flag, error: flagError } = await supabase
      .from("flagged_auctions")
      .select("*")
      .eq("id", id)
      .single();

    if (flagError || !flag) {
      return res.status(404).json({ message: "Flagged record not found" });
    }

    await supabase.from("flagged_auctions").update({ status }).eq("id", id);

    if (status === "blocked") {
      await supabase
        .from("users")
        .update({ is_blocked: true })
        .eq("id", flag.bidder_id);

      await supabase.from("bids").delete().eq("id", flag.bid_id);

      const { data: remainingBids } = await supabase
        .from("bids")
        .select("amount")
        .eq("auction_id", flag.auction_id)
        .order("amount", { ascending: false })
        .limit(1);

      const { data: auction } = await supabase
        .from("auctions")
        .select("starting_price, total_bids")
        .eq("id", flag.auction_id)
        .single();

      const restoredPrice =
        remainingBids?.[0]?.amount || auction.starting_price;

      await supabase
        .from("auctions")
        .update({
          current_price: restoredPrice,
          total_bids: Math.max((auction.total_bids || 1) - 1, 0),
        })
        .eq("id", flag.auction_id);

      await redis.set(`auction:${flag.auction_id}:current_bid`, restoredPrice);
      await redis.del(`auction:${flag.auction_id}`);

      io.to(String(flag.auction_id)).emit("bid_reversed", {
        auctionId: flag.auction_id,
        newPrice: restoredPrice,
        message: "A fraudulent bid was removed by admin",
      });

      console.log(
        `🚫 User ${flag.bidder_id} blocked. Bid rolled back. New price: ₹${restoredPrice}`,
      );
    }

    res.json({ message: `Status updated to ${status}` });
  } catch (err) {
    console.error("Update flag status error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

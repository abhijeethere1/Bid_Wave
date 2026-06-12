import supabase from "../config/db.js";
import redis from "../config/redis.js";

export const placeBid = async (req, res) => {
  const { auctionId } = req.params;
  const { amount } = req.body;
  const bidderId = req.user.id;

  try {
    // 1. Get current auction
    const { data: auction, error: auctionError } = await supabase
      .from("auctions")
      .select("*")
      .eq("id", auctionId)
      .single();

    if (auctionError || !auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    // 2. Check auction is still live
    if (auction.status !== "live") {
      return res.status(400).json({ message: "Auction has ended" });
    }

    // 3. Check auction hasn't expired
    if (new Date(auction.ends_at) < new Date()) {
      return res.status(400).json({ message: "Auction time has expired" });
    }

    // 4. Check bid is higher than current
    if (amount <= auction.current_price) {
      return res.status(400).json({
        message: `Bid must be higher than ₹${auction.current_price}`,
      });
    }

    // 5. Check seller is not bidding on own auction
    if (auction.seller_id === bidderId) {
      return res
        .status(400)
        .json({ message: "You cannot bid on your own auction" });
    }

    // 6. Save bid to database
    const { data: bid, error: bidError } = await supabase
      .from("bids")
      .insert([{ auction_id: auctionId, bidder_id: bidderId, amount }])
      .select(`*, bidder:users(name)`)
      .single();

    if (bidError) throw bidError;

    // 7. Update auction current price
    await supabase
      .from("auctions")
      .update({ current_price: amount, total_bids: auction.total_bids + 1 })
      .eq("id", auctionId);

    // 8. Update Redis cache
    await redis.set(`auction:${auctionId}:current_bid`, amount);

    // 9. Invalidate auction cache so next fetch is fresh
    await redis.del(`auction:${auctionId}`);

    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAuctionBids = async (req, res) => {
  const { auctionId } = req.params;
  try {
    const { data, error } = await supabase
      .from("bids")
      .select(`*, bidder:users(name)`)
      .eq("auction_id", auctionId)
      .order("amount", { ascending: false })
      .limit(20);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

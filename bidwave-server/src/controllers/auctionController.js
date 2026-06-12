import supabase from "../config/db.js";
import redis from "../config/redis.js";

// GET ALL AUCTIONS
export const getAuctions = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("auctions")
      .select(
        `
        *,
        seller:users(id, name)
      `,
      )
      .eq("status", "live")
      .order("ends_at", { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE AUCTION
export const getAuction = async (req, res) => {
  try {
    const { id } = req.params;

    // Try Redis cache first (fastest)
    const cached = await redis.get(`auction:${id}`);
    if (cached) return res.json(cached);

    const { data, error } = await supabase
      .from("auctions")
      .select(
        `
        *,
        seller:users(id, name),
        bids(id, amount, created_at, bidder:users(name))
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    // Cache in Redis for 30 seconds
    await redis.set(`auction:${id}`, data, { ex: 30 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE AUCTION
export const createAuction = async (req, res) => {
  const {
    title,
    description,
    category,
    size,
    starting_price,
    ends_at,
    images,
  } = req.body;

  const DELIVERY_FEES = { Small: 80, Medium: 150, Large: 400, Extra: null };

  try {
    const { data, error } = await supabase
      .from("auctions")
      .insert([
        {
          seller_id: req.user.id,
          title,
          description,
          category,
          size,
          delivery_charge: DELIVERY_FEES[size],
          images: images || [],
          starting_price,
          current_price: starting_price,
          ends_at,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

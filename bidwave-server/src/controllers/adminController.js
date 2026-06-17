import supabase from "../config/db.js";

export const getFlaggedAuctions = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("flagged_auctions")
      .select(
        `
        *,
        auction:auctions(id, title, images, current_price),
        bidder:users(id, name, email)
      `,
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateFlagStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const { data, error } = await supabase
      .from("flagged_auctions")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

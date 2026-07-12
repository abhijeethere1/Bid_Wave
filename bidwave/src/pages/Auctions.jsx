import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import AuctionCard from "../components/AuctionCard";
import { CATEGORIES, SIZES } from "../utils/dummyData";
import api from "../utils/api";

export default function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [sortBy, setSortBy] = useState("ending_soon");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    api
      .get("/auctions")
      .then((res) => setAuctions(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = [...auctions];
    if (search) {
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.category?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (selectedCategory !== "All")
      result = result.filter((a) => a.category === selectedCategory);
    if (selectedSize !== "All")
      result = result.filter((a) => a.size === selectedSize);
    if (sortBy === "ending_soon")
      result.sort((a, b) => new Date(a.ends_at) - new Date(b.ends_at));
    if (sortBy === "highest_bid")
      result.sort((a, b) => b.current_price - a.current_price);
    if (sortBy === "most_bids")
      result.sort((a, b) => b.total_bids - a.total_bids);
    return result;
  }, [auctions, search, selectedCategory, selectedSize, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedSize("All");
    setSortBy("ending_soon");
  };

  const hasFilters =
    search || selectedCategory !== "All" || selectedSize !== "All";

  const inputClass =
    "text-sm rounded-xl border border-[#1A1A1A]/10 dark:border-[#E0E0E0]/10 bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-[#E0E0E0] placeholder-[#737373] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4B0082]/30 dark:focus:ring-[#9D4EDD]/30 focus:border-[#4B0082] dark:focus:border-[#9D4EDD] transition-all";

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] dark:bg-[#121212]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#4B0082] dark:border-[#9D4EDD] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#737373] dark:text-[#A0A0A0]">
            Loading auctions...
          </p>
        </div>
      </div>
    );

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#121212] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8 ml-2">
          <h1 className="font-display text-3xl font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
            Live Auctions
          </h1>
          <p className="text-[#737373] dark:text-[#A0A0A0] mt-1 text-sm">
            {filtered.length} auctions live right now
          </p>
        </div>

        {/* Search + Filter Bar */}
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/8 dark:border-[#9D4EDD]/15 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-3 shadow-[0_2px_12px_rgba(75,0,130,0.04)]">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#A0A0A0]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search auctions..."
              className={`w-full pl-10 pr-4 py-2.5 ${inputClass}`}
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2.5 ${inputClass}`}
          >
            <option value="ending_soon">Ending Soon</option>
            <option value="highest_bid">Highest Bid</option>
            <option value="most_bids">Most Bids</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all duration-200
              ${
                showFilters
                  ? "bg-[#4B0082] dark:bg-[#9D4EDD] border-[#4B0082] dark:border-[#9D4EDD] text-white"
                  : "border-[#1A1A1A]/10 dark:border-[#E0E0E0]/10 bg-white dark:bg-[#1E1E1E] text-[#737373] dark:text-[#A0A0A0] hover:border-[#4B0082]/30 dark:hover:border-[#9D4EDD]/30"
              }`}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/8 dark:border-[#9D4EDD]/15 rounded-2xl p-5 mb-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest mb-3">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                      ${
                        selectedCategory === cat
                          ? "bg-[#4B0082] dark:bg-[#9D4EDD] text-white"
                          : "bg-[#FAF9F6] dark:bg-[#121212] text-[#737373] dark:text-[#A0A0A0] border border-[#1A1A1A]/8 dark:border-[#E0E0E0]/8 hover:border-[#4B0082]/30 dark:hover:border-[#9D4EDD]/30 hover:text-[#4B0082] dark:hover:text-[#9D4EDD]"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest mb-3">
                Item Size
              </p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                      ${
                        selectedSize === size
                          ? "bg-[#4B0082] dark:bg-[#9D4EDD] text-white"
                          : "bg-[#FAF9F6] dark:bg-[#121212] text-[#737373] dark:text-[#A0A0A0] border border-[#1A1A1A]/8 dark:border-[#E0E0E0]/8 hover:border-[#4B0082]/30 dark:hover:border-[#9D4EDD]/30 hover:text-[#4B0082] dark:hover:text-[#9D4EDD]"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {hasFilters && (
          <div className="flex items-center gap-2 mb-6 ml-2">
            <span className="text-xs text-[#737373] dark:text-[#A0A0A0]">
              Active filters:
            </span>
            {search && (
              <span className="flex items-center gap-1 bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10 text-[#4B0082] dark:text-[#9D4EDD] text-xs px-2.5 py-1 rounded-full">
                "{search}"
                <button onClick={() => setSearch("")}>
                  <X size={11} />
                </button>
              </span>
            )}
            {selectedCategory !== "All" && (
              <span className="flex items-center gap-1 bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10 text-[#4B0082] dark:text-[#9D4EDD] text-xs px-2.5 py-1 rounded-full">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")}>
                  <X size={11} />
                </button>
              </span>
            )}
            {selectedSize !== "All" && (
              <span className="flex items-center gap-1 bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10 text-[#4B0082] dark:text-[#9D4EDD] text-xs px-2.5 py-1 rounded-full">
                {selectedSize}
                <button onClick={() => setSelectedSize("All")}>
                  <X size={11} />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-[#737373] dark:text-[#A0A0A0] hover:text-[#B22222] dark:hover:text-[#FF6666] transition-colors ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((auction) => (
              <AuctionCard
                key={auction.id}
                auction={{
                  ...auction,
                  currentBid: auction.current_price,
                  startingBid: auction.starting_price,
                  totalBids: auction.total_bids,
                  endsAt: auction.ends_at,
                  deliveryCharge: auction.delivery_charge,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-[#1A1A1A] dark:text-[#E0E0E0] font-bold text-lg">
              No auctions found
            </p>
            <p className="text-[#737373] dark:text-[#A0A0A0] text-sm mt-2">
              Try adjusting your filters
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-[#4B0082] dark:text-[#9D4EDD] hover:text-[#D4AF37] dark:hover:text-[#FFD700] text-sm font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

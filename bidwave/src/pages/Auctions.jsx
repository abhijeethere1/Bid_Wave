import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import AuctionCard from "../components/AuctionCard";
import { CATEGORIES, SIZES } from "../utils/dummyData";
import api from "../utils/api";

function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [sortBy, setSortBy] = useState("ending_soon");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch real auctions from backend
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await api.get("/auctions");
        setAuctions(res.data);
      } catch (err) {
        console.error("Failed to fetch auctions:", err);
      }
      setLoading(false);
    };
    fetchAuctions();
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

    if (selectedCategory !== "All") {
      result = result.filter((a) => a.category === selectedCategory);
    }

    if (selectedSize !== "All") {
      result = result.filter((a) => a.size === selectedSize);
    }

    if (sortBy === "ending_soon") {
      result.sort((a, b) => new Date(a.ends_at) - new Date(b.ends_at));
    } else if (sortBy === "highest_bid") {
      result.sort((a, b) => b.current_price - a.current_price);
    } else if (sortBy === "most_bids") {
      result.sort((a, b) => b.total_bids - a.total_bids);
    }

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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading auctions...</p>
        </div>
      </div>
    );

  return (
    <div className="bg-orange-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8 ml-2">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Live Auctions
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {filtered.length} auctions live right now
          </p>
        </div>

        {/* Search + Filter Bar */}
        <div className="bg-white dark:bg-gray-900 border border-orange-100 dark:border-gray-800 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search auctions..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all"
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
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-orange-300"
              }`}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-900 border border-orange-100 dark:border-gray-800 rounded-2xl p-5 mb-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        selectedCategory === cat
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-orange-500/10 hover:text-orange-500"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                Item Size
              </p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        selectedSize === size
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-orange-500/10 hover:text-orange-500"
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
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-gray-400">Active filters:</span>
            {search && (
              <span className="flex items-center gap-1 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs px-2.5 py-1 rounded-full">
                "{search}"
                <button onClick={() => setSearch("")}>
                  <X size={11} />
                </button>
              </span>
            )}
            {selectedCategory !== "All" && (
              <span className="flex items-center gap-1 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs px-2.5 py-1 rounded-full">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")}>
                  <X size={11} />
                </button>
              </span>
            )}
            {selectedSize !== "All" && (
              <span className="flex items-center gap-1 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs px-2.5 py-1 rounded-full">
                {selectedSize}
                <button onClick={() => setSelectedSize("All")}>
                  <X size={11} />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Auction Grid */}
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
            <p className="text-gray-900 dark:text-white font-bold text-lg">
              No auctions found
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your filters
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-orange-500 hover:text-orange-600 text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auctions;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, TrendingUp, Wallet, CheckCircle } from "lucide-react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import SectionHeader from "../components/dashboard/SectionHeader";
import ListingCard from "../components/dashboard/ListingCard";
import api from "../utils/api";

export default function SellerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard/seller")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );

  const stats = [
    {
      label: "Active Listings",
      value: String(data?.stats.activeListings || 0),
      icon: <Package size={15} />,
    },
    {
      label: "Total Sold",
      value: String(data?.stats.totalSold || 0),
      icon: <CheckCircle size={15} />,
    },
    {
      label: "Total Earned",
      value: `₹${(data?.stats.totalEarned || 0).toLocaleString("en-IN")}`,
      icon: <Wallet size={15} />,
    },
    {
      label: "Pending Payout",
      value: `₹${(data?.stats.pendingPayout || 0).toLocaleString("en-IN")}`,
      icon: <TrendingUp size={15} />,
    },
  ];

  // Map auction to listing card format
  const listings =
    data?.listings?.map((auction) => ({
      id: auction.id,
      title: auction.title,
      image:
        auction.images?.[0] ||
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&fit=crop",
      currentBid: auction.current_price,
      totalBids: auction.total_bids,
      endsAt: auction.ends_at,
      status: getListingStatus(auction),
    })) || [];

  function getListingStatus(auction) {
    if (auction.status === "live") return "live";
    if (auction.status === "ended") {
      const hasPaid = auction.payments?.some(
        (p) => p.status === "paid" || p.status === "released",
      );
      if (hasPaid) return "awaiting_shipment";
      return "ended";
    }
    return "ended";
  }

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <DashboardHeader
          title="Seller Dashboard"
          subtitle="Manage your listings and track earnings"
          actionLabel="+ List Item"
          actionTo="/sell"
        />

        <StatsGrid stats={stats} />

        <SectionHeader title="My Listings" count={listings.length} />

        {listings.length === 0 ? (
          <div className="text-center py-16 ml-2">
            <p className="text-3xl mb-3">📦</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              No listings yet
            </p>
            <p className="text-xs text-gray-400 mt-1">
              List your first item to start selling
            </p>
            <Link
              to="/sell"
              className="inline-block mt-4 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all"
            >
              List an Item
            </Link>
          </div>
        ) : (
          <div className="ml-2 flex flex-col gap-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

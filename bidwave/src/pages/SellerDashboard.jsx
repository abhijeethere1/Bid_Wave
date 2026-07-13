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
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] dark:bg-[#121212]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#4B0082] dark:border-[#9D4EDD] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#737373] dark:text-[#A0A0A0]">
            Loading dashboard...
          </p>
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

  function getListingStatus(auction) {
    if (auction.status === "live") return "live";

    if (auction.status === "ended") {
      const payment = auction.payments?.[0];

      if (!payment) return "ended"; // no winner / no bids

      if (payment.status === "released") return "payment_released";
      if (payment.status === "paid") return "awaiting_shipment";
      if (payment.status === "pending") return "payment_pending_buyer";

      return "ended";
    }
    return "ended";
  }

  // Also update the listings mapping to include payment info
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
      hasBids: auction.bids?.length > 0 || auction.total_bids > 0,
      paymentStatus: auction.payments?.[0]?.status || null,
    })) || [];

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] transition-colors duration-300">
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
            <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0]">
              No listings yet
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A0A0A0] mt-1">
              List your first item to start selling
            </p>
            <Link
              to="/sell"
              className="inline-block mt-4 px-5 py-2.5 bg-[#4B0082] dark:bg-[#9D4EDD] hover:brightness-110 text-white text-sm font-semibold rounded-xl transition-all shadow-[0_4px_16px_rgba(75,0,130,0.25)]"
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

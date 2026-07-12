import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Trophy, Wallet, Package } from "lucide-react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import SectionHeader from "../components/dashboard/SectionHeader";
import OrderCard from "../components/dashboard/OrderCard";
import api from "../utils/api";

export default function BuyerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard/buyer")
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
      label: "Active Bids",
      value: String(data?.stats.activeBids || 0),
      icon: <ShoppingBag size={15} />,
    },
    {
      label: "Auctions Won",
      value: String(data?.stats.auctionsWon || 0),
      icon: <Trophy size={15} />,
    },
    {
      label: "Total Spent",
      value: `₹${(data?.stats.totalSpent || 0).toLocaleString("en-IN")}`,
      icon: <Wallet size={15} />,
    },
    {
      label: "Items Received",
      value: String(data?.stats.itemsReceived || 0),
      icon: <Package size={15} />,
    },
  ];

  const mapStatus = (payment) => {
    if (payment.status === "pending") return "payment_pending";
    if (payment.status === "paid") return "awaiting_item";
    if (payment.status === "released") return "delivered";
    return "in_transit";
  };

  const orders =
    data?.orders?.map((payment) => ({
      id: payment.id,
      paymentId: payment.id,
      title: payment.auction?.title || "Auction Item",
      image:
        payment.auction?.images?.[0] ||
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&fit=crop",
      amount: payment.auction_amount,
      delivery: payment.delivery_charge,
      status: mapStatus(payment),
      date: new Date(payment.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      totalAmount: payment.total_amount,
      auctionId: payment.auction_id,
    })) || [];

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <DashboardHeader
          title="My Dashboard"
          subtitle="Track your bids, wins and deliveries"
          actionLabel="Browse Auctions"
          actionTo="/auctions"
        />

        <StatsGrid stats={stats} />

        <SectionHeader title="My Orders" count={orders.length} />

        {orders.length === 0 ? (
          <div className="text-center py-16 ml-2">
            <p className="text-3xl mb-3">🎯</p>
            <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0]">
              No orders yet
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A0A0A0] mt-1">
              Win an auction to see your orders here
            </p>
            <Link
              to="/auctions"
              className="inline-block mt-4 px-5 py-2.5 bg-[#4B0082] dark:bg-[#9D4EDD] hover:brightness-110 text-white text-sm font-semibold rounded-xl transition-all shadow-[0_4px_16px_rgba(75,0,130,0.25)]"
            >
              Browse Auctions
            </Link>
          </div>
        ) : (
          <div className="ml-2 flex flex-col gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

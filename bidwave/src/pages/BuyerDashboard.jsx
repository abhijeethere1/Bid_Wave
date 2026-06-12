import { ShoppingBag, Trophy, Wallet, Package } from "lucide-react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import SectionHeader from "../components/dashboard/SectionHeader";
import OrderCard from "../components/dashboard/OrderCard";
import { BUYER_ORDERS } from "../utils/dashboardData";

const STATS = [
  { label: "Active Bids", value: "4", icon: <ShoppingBag size={15} /> },
  { label: "Auctions Won", value: "12", icon: <Trophy size={15} /> },
  { label: "Total Spent", value: "₹1.2L", icon: <Wallet size={15} /> },
  { label: "Items Received", value: "11", icon: <Package size={15} /> },
];

export default function BuyerDashboard() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <DashboardHeader
          title="My Dashboard"
          subtitle="Track your bids, wins and deliveries"
          actionLabel="Browse Auctions"
          actionTo="/auctions"
        />

        <StatsGrid stats={STATS} />

        <SectionHeader title="My Orders" count={BUYER_ORDERS.length} />

        <div className="ml-2 flex flex-col gap-4">
          {BUYER_ORDERS.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

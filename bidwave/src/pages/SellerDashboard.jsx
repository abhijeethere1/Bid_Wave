import { Package, TrendingUp, Wallet, CheckCircle } from "lucide-react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import SectionHeader from "../components/dashboard/SectionHeader";
import ListingCard from "../components/dashboard/ListingCard";
import { SELLER_LISTINGS } from "../utils/dashboardData";

const STATS = [
  { label: "Active Listings", value: "3", icon: <Package size={15} /> },
  { label: "Total Sold", value: "18", icon: <CheckCircle size={15} /> },
  { label: "Total Earned", value: "₹2.4L", icon: <Wallet size={15} /> },
  { label: "Pending Payout", value: "₹8,400", icon: <TrendingUp size={15} /> },
];

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <DashboardHeader
          title="Seller Dashboard"
          subtitle="Manage your listings and track earnings"
          actionLabel="+ List Item"
          actionTo="/sell"
        />

        <StatsGrid stats={STATS} />

        <SectionHeader title="My Listings" count={SELLER_LISTINGS.length} />

        <div className="ml-2 flex flex-col gap-4">
          {SELLER_LISTINGS.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import {
  Gavel,
  ShieldCheck,
  Truck,
  Zap,
  ArrowRight,
  Package,
  BadgeCheck,
  Timer,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const STEPS_BUYER = [
  {
    step: "01",
    icon: <Gavel size={22} className="text-orange-500" />,
    title: "Browse & Bid",
    desc: "Browse live auctions and place a bid higher than the current amount. Live countdown timers show exactly when each auction ends.",
  },
  {
    step: "02",
    icon: <Zap size={22} className="text-orange-500" />,
    title: "Win the Auction",
    desc: "Highest bid when the timer hits zero wins. You get notified instantly and have 48 hours to complete payment.",
  },
  {
    step: "03",
    icon: <ShieldCheck size={22} className="text-orange-500" />,
    title: "We Verify the Item",
    desc: "The seller ships to our fulfillment center. Our team physically checks the item matches the listing before dispatch.",
  },
  {
    step: "04",
    icon: <Truck size={22} className="text-orange-500" />,
    title: "Safe Delivery",
    desc: "We deliver to your address with full tracking. Confirm receipt and the seller gets paid. Simple and scam-free.",
  },
];

const STEPS_SELLER = [
  {
    step: "01",
    icon: <Package size={22} className="text-orange-500" />,
    title: "List Your Item",
    desc: "Upload photos and our AI auto-generates the title and description. Set a starting price and choose when your auction ends.",
  },
  {
    step: "02",
    icon: <Timer size={22} className="text-orange-500" />,
    title: "Auction Goes Live",
    desc: "Your item is instantly visible to thousands of buyers. Watch bids come in live on your seller dashboard.",
  },
  {
    step: "03",
    icon: <BadgeCheck size={22} className="text-orange-500" />,
    title: "Ship to Our Center",
    desc: "Once the auction ends and buyer pays, ship the item to our nearest fulfillment center. We handle the rest.",
  },
  {
    step: "04",
    icon: <Zap size={22} className="text-orange-500" />,
    title: "Get Paid Fast",
    desc: "After the buyer confirms delivery, we transfer your earnings directly. Typically within 2-3 business days.",
  },
];

const FAQS = [
  {
    q: "What happens if the seller sends a fake item?",
    a: "Our team verifies every item at the fulfillment center. If it doesn't match the listing, we reject it, refund the buyer fully, and penalize the seller's account.",
  },
  {
    q: "What if I win but change my mind?",
    a: "Winning an auction is a commitment to buy. If you don't pay within 48 hours, the auction is re-listed and your account receives a strike.",
  },
  {
    q: "How are delivery charges calculated?",
    a: "Delivery charges are based on item size — Small (₹80), Medium (₹150), Large (₹400). The charge is shown clearly before you bid.",
  },
  {
    q: "Can I set a reserve price?",
    a: "Currently we don't support reserve prices. Your starting bid is the minimum you'll accept. This keeps auctions transparent and fast.",
  },
  {
    q: "How long does delivery take?",
    a: "After item verification (1-2 days), delivery typically takes 3-5 business days depending on your location.",
  },
  {
    q: "Is there a fee for listing an item?",
    a: "Listing is completely free. We only charge a small commission on successful sales, plus the delivery fee.",
  },
];

function StepCard({ step, icon, title, desc }) {
  return (
    <div className="flex gap-5">
      <div className="shrink-0 flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center">
          {icon}
        </div>
        <div className="w-px flex-1 bg-orange-100 dark:bg-orange-500/20" />
      </div>
      <div className="pb-8">
        <p className="text-xs font-bold text-orange-500 mb-1">{step}</p>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-14 ml-2">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            How BidWave Works
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            A transparent, scam-free auction platform. We handle verification,
            payments and delivery — so you can focus on bidding and winning.
          </p>
        </div>

        {/* Buyer + Seller */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Buyer */}
          <div>
            <div className="flex items-center gap-2 mb-6 ml-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                For Buyers
              </h2>
            </div>
            {STEPS_BUYER.map((s) => (
              <StepCard key={s.step} {...s} />
            ))}
          </div>

          {/* Seller */}
          <div>
            <div className="flex items-center gap-2 mb-6 ml-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                For Sellers
              </h2>
            </div>
            {STEPS_SELLER.map((s) => (
              <StepCard key={s.step} {...s} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800 mb-14" />

        {/* Delivery Charges */}
        <div className="mb-14 ml-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Delivery Charges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { size: "Small", icon: "📦", desc: "Under 1kg", fee: "₹80" },
              { size: "Medium", icon: "🗃️", desc: "1–5kg", fee: "₹150" },
              { size: "Large", icon: "🚚", desc: "5–20kg", fee: "₹400" },
              { size: "Extra", icon: "🏗️", desc: "Over 20kg", fee: "Quote" },
            ].map((item) => (
              <div
                key={item.size}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 text-center"
              >
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {item.size}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                <p className="text-base font-black text-orange-500 mt-2">
                  {item.fee}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800 mb-14" />

        {/* FAQ */}
        <div className="ml-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-100 dark:border-gray-800 rounded-2xl p-5"
              >
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                  {faq.q}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            Ready to get started?
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Join thousands of buyers and sellers on BidWave.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            {!user && (
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-orange-500/20"
              >
                Create Free Account <ArrowRight size={16} />
              </Link>
            )}
            <Link
              to="/auctions"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-semibold text-sm rounded-xl hover:border-orange-300 transition-all"
            >
              Browse Auctions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

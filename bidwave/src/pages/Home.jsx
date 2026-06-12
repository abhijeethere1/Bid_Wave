import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, Truck } from "lucide-react";

function Home() {
  return (
    <div className="bg-orange-50 dark:bg-gray-950 transition-colors duration-300 font-sans">
      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
        <span className="inline-flex items-center gap-2 text-sm bg-orange-100 dark:bg-transparent text-orange-600 dark:text-orange-500 font-medium px-4 py-1.5 rounded-full mb-6 border border-orange-200 dark:border-transparent">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          Live auctions happening now
        </span>

        <h1 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          The smarter way
          <br />
          to <span className="text-orange-500">buy & sell.</span>
        </h1>

        <p className="mt-6 text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
          Real-time auctions with zero scams. We verify every item and handle
          delivery — so all you do is bid.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            to="/auctions"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-orange-500/30"
          >
            Browse Auctions <ArrowRight size={18} />
          </Link>
          <Link
            to="/sell"
            className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-7 py-3.5 rounded-xl font-semibold border border-orange-200 dark:border-gray-800 bg-white dark:bg-transparent hover:border-orange-300 dark:hover:border-gray-700 transition-all duration-200 shadow-sm"
          >
            Start Selling
          </Link>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-orange-100 dark:border-gray-800" />
      </div>

      {/* ── 3 PILLARS ── */}
      <section className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-6">
        {[
          {
            icon: <ShieldCheck size={28} className="text-green-500" />,
            bg: "bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20",
            iconBg: "bg-green-100 dark:bg-green-500/10",
            title: "Zero Scam",
            desc: "We hold and verify every item before delivery. Buyer pays us, not the seller directly.",
          },
          {
            icon: <Zap size={28} className="text-blue-500" />,
            bg: "bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20",
            iconBg: "bg-blue-100 dark:bg-blue-500/10",
            title: "Real-Time Bidding",
            desc: "Live bid updates without page refresh. Set your auction from 1 hour to 7 days.",
          },
          {
            icon: <Truck size={28} className="text-orange-500" />,
            bg: "bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20",
            iconBg: "bg-orange-100 dark:bg-orange-500/10",
            title: "Managed Delivery",
            desc: "We ship after verification. Charges calculated automatically by item size.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className={`rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.bg}`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.iconBg}`}
            >
              {item.icon}
            </div>
            <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-2">
              {item.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-orange-100 dark:border-gray-800" />
      </div>

      {/* ── STATS ── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="bg-white dark:bg-gray-900 border border-orange-100 dark:border-gray-800 rounded-3xl p-12 grid grid-cols-3 gap-8 text-center shadow-sm">
          {[
            { value: "12,400+", label: "Items Sold" },
            { value: "₹4.2Cr+", label: "Total Bids" },
            { value: "98%", label: "Success Rate" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={
                i !== 2 ? "border-r border-orange-100 dark:border-gray-800" : ""
              }
            >
              <p className="text-4xl font-black text-orange-500">
                {stat.value}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="bg-white dark:bg-gray-900 border border-orange-100 dark:border-gray-800 rounded-3xl px-12 py-16 text-center shadow-sm">
          <span className="inline-flex items-center gap-2 text-sm bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-medium px-4 py-1.5 rounded-full mb-6">
            Free to join
          </span>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white">
            Ready to place your first bid?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-base max-w-md mx-auto">
            Create a free account and join thousands of buyers and sellers on
            India's safest auction platform.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-orange-500/25"
          >
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-orange-100 dark:border-gray-800 py-8 bg-white dark:bg-transparent transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black">
            <span className="text-orange-500">Bid</span>
            <span className="text-gray-900 dark:text-white">Wave</span>
          </span>
          <p className="text-gray-400 text-sm">
            © 2026 BidWave. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <Link
                key={link}
                to="/"
                className="hover:text-orange-500 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

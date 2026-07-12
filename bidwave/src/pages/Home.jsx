import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, Truck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#121212] transition-colors duration-300">
      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
        {/* Live pill */}
        <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10 text-[#4B0082] dark:text-[#9D4EDD] border border-[#4B0082]/15 dark:border-[#9D4EDD]/20 px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-[#B22222] dark:bg-[#FF6666] rounded-full animate-pulse" />
          Live auctions happening now
        </span>

        {/* Headline */}
        <h1 className="font-display text-6xl md:text-7xl font-black text-[#1A1A1A] dark:text-[#E0E0E0] tracking-tight leading-[1.05] mb-6">
          The smarter way
          <br />
          to{" "}
          <span className="text-[#D4AF37] dark:text-[#FFD700]">
            buy & sell.
          </span>
        </h1>

        <p className="text-[#737373] dark:text-[#A0A0A0] text-lg max-w-xl mx-auto leading-relaxed mb-10">
          Real-time auctions with zero scams. We verify every item and handle
          delivery — so all you do is bid.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/auctions"
            className="inline-flex items-center gap-2 bg-[#4B0082] dark:bg-[#9D4EDD] hover:brightness-110 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-[0_4px_24px_rgba(75,0,130,0.25)] dark:shadow-[0_4px_24px_rgba(157,78,221,0.25)]"
          >
            Browse Auctions <ArrowRight size={17} />
          </Link>
          <Link
            to="/sell"
            className="inline-flex items-center gap-2 text-[#737373] dark:text-[#A0A0A0] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] px-8 py-3.5 rounded-xl font-semibold text-sm border border-[#1A1A1A]/10 dark:border-[#E0E0E0]/10 bg-white dark:bg-[#1E1E1E] hover:border-[#4B0082]/30 dark:hover:border-[#9D4EDD]/30 transition-all duration-200"
          >
            Start Selling
          </Link>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-[#4B0082]/8 dark:border-[#9D4EDD]/10" />
      </div>

      {/* ── 3 PILLARS ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-5">
        {[
          {
            icon: <ShieldCheck size={24} />,
            title: "Zero Scam",
            desc: "We hold and verify every item before delivery. Buyer pays us, not the seller directly.",
            color: "text-[#2E8B57] dark:text-[#4EBA75]",
            bg: "bg-[#2E8B57]/8 dark:bg-[#4EBA75]/10",
            border: "border-[#2E8B57]/15 dark:border-[#4EBA75]/20",
          },
          {
            icon: <Zap size={24} />,
            title: "Real-Time Bidding",
            desc: "Live bid updates without page refresh. Set your auction from 1 hour to 7 days.",
            color: "text-[#4B0082] dark:text-[#9D4EDD]",
            bg: "bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10",
            border: "border-[#4B0082]/15 dark:border-[#9D4EDD]/20",
          },
          {
            icon: <Truck size={24} />,
            title: "Managed Delivery",
            desc: "We ship after verification. Charges calculated automatically by item size.",
            color: "text-[#D4AF37] dark:text-[#FFD700]",
            bg: "bg-[#D4AF37]/8 dark:bg-[#FFD700]/10",
            border: "border-[#D4AF37]/15 dark:border-[#FFD700]/20",
          },
        ].map((item) => (
          <div
            key={item.title}
            className={`${item.bg} border ${item.border} rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className={`${item.color} mb-4`}>{item.icon}</div>
            <h3 className="text-[#1A1A1A] dark:text-[#E0E0E0] font-bold text-lg mb-2">
              {item.title}
            </h3>
            <p className="text-[#737373] dark:text-[#A0A0A0] text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-[#4B0082]/8 dark:border-[#9D4EDD]/10" />
      </div>

      {/* ── STATS ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/10 dark:border-[#9D4EDD]/15 rounded-3xl p-10 grid grid-cols-3 gap-6 shadow-[0_4px_24px_rgba(75,0,130,0.06)] dark:shadow-[0_4px_24px_rgba(157,78,221,0.06)]">
          {[
            { value: "12,400+", label: "Items Sold" },
            { value: "₹4.2Cr+", label: "Total Bids" },
            { value: "98%", label: "Success Rate" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${i !== 2 ? "border-r border-[#4B0082]/8 dark:border-[#9D4EDD]/10" : ""}`}
            >
              <p className="font-display text-4xl font-black text-[#D4AF37] dark:text-[#FFD700]">
                {stat.value}
              </p>
              <p className="text-[#737373] dark:text-[#A0A0A0] text-sm mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/10 dark:border-[#9D4EDD]/15 rounded-3xl px-12 py-16 text-center shadow-[0_4px_24px_rgba(75,0,130,0.06)] dark:shadow-[0_4px_24px_rgba(157,78,221,0.06)]">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#D4AF37] dark:text-[#FFD700] bg-[#D4AF37]/10 dark:bg-[#FFD700]/10 px-4 py-1.5 rounded-full mb-6 border border-[#D4AF37]/20 dark:border-[#FFD700]/20">
            🏆 Free to join
          </span>
          <h2 className="font-display text-4xl font-black text-[#1A1A1A] dark:text-[#E0E0E0] mb-3">
            Ready to place your first bid?
          </h2>
          <p className="text-[#737373] dark:text-[#A0A0A0] text-base max-w-md mx-auto">
            Create a free account and join thousands of buyers and sellers on
            India's safest auction platform.
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-flex items-center gap-2 mt-8 bg-[#D4AF37] dark:bg-[#FFD700] hover:brightness-110 text-[#1A1A1A] font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 shadow-[0_4px_24px_rgba(212,175,55,0.30)]"
            >
              Get Started Free <ArrowRight size={17} />
            </Link>
          )}
          {user && (
            <Link
              to="/auctions"
              className="inline-flex items-center gap-2 mt-8 bg-[#4B0082] dark:bg-[#9D4EDD] hover:brightness-110 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 shadow-[0_4px_24px_rgba(75,0,130,0.25)]"
            >
              Browse Auctions <ArrowRight size={17} />
            </Link>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#4B0082]/8 dark:border-[#9D4EDD]/10 py-8 bg-white dark:bg-[#1E1E1E] transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl font-black">
            <span className="text-[#D4AF37] dark:text-[#FFD700]">Bid</span>
            <span className="text-[#1A1A1A] dark:text-[#E0E0E0]">Wave</span>
          </span>
          <p className="text-[#737373] dark:text-[#A0A0A0] text-sm">
            © 2026 BidWave. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[#737373] dark:text-[#A0A0A0]">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <Link
                key={link}
                to="/"
                className="hover:text-[#4B0082] dark:hover:text-[#9D4EDD] transition-colors"
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

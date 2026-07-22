import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye } from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";

const RISK_COLOR = (score) => {
  if (score >= 100)
    return {
      bg: "bg-[#B22222]/8 dark:bg-[#FF6666]/10",
      text: "text-[#B22222] dark:text-[#FF6666]",
      label: "Critical",
    };
  if (score >= 70)
    return {
      bg: "bg-[#D4AF37]/8 dark:bg-[#FFD700]/10",
      text: "text-[#8A6B18] dark:text-[#FFD700]",
      label: "High",
    };
  return {
    bg: "bg-[#4B0082]/5 dark:bg-[#9D4EDD]/10",
    text: "text-[#4B0082] dark:text-[#9D4EDD]",
    label: "Medium",
  };
};

const STATUS_STYLE = {
  pending:
    "text-[#8A6B18] dark:text-[#FFD700] bg-[#D4AF37]/10 dark:bg-[#FFD700]/10",
  reviewed:
    "text-[#4B0082] dark:text-[#9D4EDD] bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10",
  cleared:
    "text-[#2E8B57] dark:text-[#4EBA75] bg-[#2E8B57]/8 dark:bg-[#4EBA75]/10",
  blocked:
    "text-[#B22222] dark:text-[#FF6666] bg-[#B22222]/8 dark:bg-[#FF6666]/10",
};

const STATUS_LABEL = {
  pending: "Pending Review",
  reviewed: "Reviewed",
  cleared: "Cleared",
  blocked: "Blocked",
};

export default function AdminDashboard() {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifications, setVerifications] = useState([]);

  useEffect(() => {
    fetchFlags();
  }, []);

  // Add to fetchFlags:
  const fetchFlags = async () => {
    try {
      const [flagsRes, verifyRes] = await Promise.all([
        api.get("/admin/flagged"),
        api.get("/admin/pending-verifications"),
      ]);
      setFlags(flagsRes.data);
      setVerifications(verifyRes.data);
    } catch {
      toast.error("Failed to load admin data");
    }
    setLoading(false);
  };

  const handleVerify = async (auctionId) => {
    try {
      await api.post(`/admin/verify-shipment/${auctionId}`);
      toast.success("Item verified! Payment released to seller.");
      setVerifications((prev) =>
        prev.filter((v) => v.auction_id !== auctionId),
      );
    } catch {
      toast.error("Failed to verify shipment");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/flagged/${id}`, { status });
      setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));
      toast.success(`Marked as ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] dark:bg-[#121212]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#4B0082] dark:border-[#9D4EDD] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#737373] dark:text-[#A0A0A0]">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );

  const pending = flags.filter((f) => f.status === "pending").length;
  const blocked = flags.filter((f) => f.status === "blocked").length;
  const cleared = flags.filter((f) => f.status === "cleared").length;

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between pb-8 border-b border-[#4B0082]/8 dark:border-[#9D4EDD]/10 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield
                size={20}
                className="text-[#D4AF37] dark:text-[#FFD700]"
              />
              <h1 className="font-display text-2xl font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-sm text-[#737373] dark:text-[#A0A0A0]">
              Fraud detection and auction monitoring
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            {
              label: "Pending Review",
              value: pending,
              color: "text-[#8A6B18] dark:text-[#FFD700]",
              icon: <AlertTriangle size={16} />,
              bg: "bg-[#D4AF37]/8 dark:bg-[#FFD700]/10",
            },
            {
              label: "Cleared",
              value: cleared,
              color: "text-[#2E8B57] dark:text-[#4EBA75]",
              icon: <CheckCircle size={16} />,
              bg: "bg-[#2E8B57]/8 dark:bg-[#4EBA75]/10",
            },
            {
              label: "Blocked",
              value: blocked,
              color: "text-[#B22222] dark:text-[#FF6666]",
              icon: <XCircle size={16} />,
              bg: "bg-[#B22222]/8 dark:bg-[#FF6666]/10",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/8 dark:border-[#9D4EDD]/15 rounded-2xl p-5 shadow-[0_2px_12px_rgba(75,0,130,0.04)]"
            >
              <div className={`flex items-center gap-2 mb-2 ${stat.color}`}>
                {stat.icon}
                <p className="text-xs font-semibold uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
              <p className="font-display text-3xl font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
        {/* Pending Verifications */}
        {verifications.length > 0 && (
          <div className="mb-10">
            <div className="mt-8 mb-6 ml-2 flex items-center gap-3">
              <h2 className="text-base font-bold text-[#1A1A1A] dark:text-[#E0E0E0]">
                Pending Verifications
              </h2>
              <span className="text-xs font-medium text-white bg-[#D4AF37] dark:bg-[#FFD700] dark:text-[#1A1A1A] px-2.5 py-1 rounded-full">
                {verifications.length} items
              </span>
            </div>

            <div className="ml-2 flex flex-col gap-4">
              {verifications.map((v) => (
                <div
                  key={v.id}
                  className="bg-white dark:bg-[#1E1E1E] border border-[#D4AF37]/20 dark:border-[#FFD700]/15 rounded-2xl p-5 shadow-[0_2px_12px_rgba(212,175,55,0.08)]"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        v.auction?.images?.[0] ||
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&fit=crop"
                      }
                      alt={v.auction?.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#4B0082]/8 dark:border-[#9D4EDD]/10"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0] truncate">
                        {v.auction?.title}
                      </p>
                      <p className="text-xs text-[#737373] dark:text-[#A0A0A0] mt-0.5">
                        Seller:{" "}
                        <span className="font-semibold text-[#4B0082] dark:text-[#9D4EDD]">
                          {v.auction?.seller?.name}
                        </span>{" "}
                        · {v.auction?.seller?.email}
                      </p>
                      <p className="text-xs text-[#737373] dark:text-[#A0A0A0] mt-0.5">
                        Shipped on:{" "}
                        {new Date(v.created_at).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-base font-black text-[#D4AF37] dark:text-[#FFD700]">
                        ₹{v.auction?.current_price?.toLocaleString("en-IN")}
                      </p>
                      <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0] mb-2">
                        final bid
                      </p>
                      <button
                        onClick={() => handleVerify(v.auction_id)}
                        className="px-4 py-2 bg-[#2E8B57] dark:bg-[#4EBA75] hover:brightness-110 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                      >
                        ✅ Verify Arrival
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Section Header */}
        <div className="mt-8 mb-6 ml-2 flex items-center gap-3">
          <h2 className="text-base font-bold text-[#1A1A1A] dark:text-[#E0E0E0]">
            Flagged Auctions
          </h2>
          <span className="text-xs font-medium text-[#737373] dark:text-[#A0A0A0] bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10 px-2.5 py-1 rounded-full">
            {flags.length} total
          </span>
        </div>

        {flags.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-3xl mb-3">✅</p>
            <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0]">
              No flagged auctions
            </p>
            <p className="text-xs text-[#737373] dark:text-[#A0A0A0] mt-1">
              All auctions are clean
            </p>
          </div>
        ) : (
          <div className="ml-2 flex flex-col gap-4">
            {flags.map((flag) => {
              const risk = RISK_COLOR(flag.risk_score);
              return (
                <div
                  key={flag.id}
                  className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/8 dark:border-[#9D4EDD]/15 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(75,0,130,0.04)]"
                >
                  {/* Risk Banner */}
                  <div
                    className={`flex items-center justify-between px-5 py-3 ${risk.bg} border-b border-[#4B0082]/8 dark:border-[#9D4EDD]/10`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={14} className={risk.text} />
                      <p className={`text-xs font-bold ${risk.text}`}>
                        {risk.label} Risk — Score: {flag.risk_score}/100
                      </p>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[flag.status]}`}
                    >
                      {STATUS_LABEL[flag.status]}
                    </span>
                  </div>

                  <div className="p-5">
                    {/* Auction Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={
                          flag.auction?.images?.[0] ||
                          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&fit=crop"
                        }
                        alt={flag.auction?.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#4B0082]/8 dark:border-[#9D4EDD]/10"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0] truncate">
                          {flag.auction?.title}
                        </p>
                        <p className="text-xs text-[#737373] dark:text-[#A0A0A0] mt-0.5">
                          Flagged bidder:{" "}
                          <span className="font-semibold text-[#4B0082] dark:text-[#9D4EDD]">
                            {flag.bidder?.name}
                          </span>{" "}
                          · {flag.bidder?.email}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-black text-[#D4AF37] dark:text-[#FFD700]">
                          ₹
                          {flag.auction?.current_price?.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0]">
                          current bid
                        </p>
                      </div>
                    </div>

                    {/* Reasons */}
                    <div className="bg-[#FAF9F6] dark:bg-[#121212] border border-[#1A1A1A]/5 dark:border-[#E0E0E0]/5 rounded-xl p-3 mb-4">
                      <p className="text-xs font-bold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest mb-2">
                        Detected Issues
                      </p>
                      <div className="space-y-1.5">
                        {flag.reasons?.map((reason, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-[#B22222] dark:bg-[#FF6666] rounded-full mt-1.5 shrink-0" />
                            <p className="text-xs text-[#737373] dark:text-[#A0A0A0]">
                              {reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    {flag.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(flag.id, "cleared")}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-[#2E8B57]/20 dark:border-[#4EBA75]/20 text-[#2E8B57] dark:text-[#4EBA75] text-xs font-semibold rounded-xl hover:bg-[#2E8B57]/5 dark:hover:bg-[#4EBA75]/10 transition-all"
                        >
                          <CheckCircle size={13} /> Clear — Not Fraud
                        </button>
                        <button
                          onClick={() => updateStatus(flag.id, "blocked")}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#B22222] dark:bg-[#FF6666] hover:brightness-110 text-white text-xs font-semibold rounded-xl transition-all"
                        >
                          <XCircle size={13} /> Block Bidder
                        </button>
                        <Link
                          to={`/auctions/${flag.auction_id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 border border-[#4B0082]/15 dark:border-[#9D4EDD]/20 text-[#4B0082] dark:text-[#9D4EDD] text-xs font-semibold rounded-xl hover:border-[#D4AF37]/40 hover:text-[#D4AF37] dark:hover:text-[#FFD700] transition-all flex items-center gap-1.5"
                        >
                          <Eye size={13} /> View
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

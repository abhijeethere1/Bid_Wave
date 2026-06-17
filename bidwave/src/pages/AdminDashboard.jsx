import { useState, useEffect } from "react";
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye } from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const RISK_COLOR = (score) => {
  if (score >= 100)
    return {
      bg: "bg-red-50 dark:bg-red-500/10",
      text: "text-red-600",
      label: "Critical",
    };
  if (score >= 70)
    return {
      bg: "bg-orange-50 dark:bg-orange-500/10",
      text: "text-orange-600",
      label: "High",
    };
  return {
    bg: "bg-yellow-50 dark:bg-yellow-500/10",
    text: "text-yellow-600",
    label: "Medium",
  };
};

const STATUS_MAP = {
  pending: {
    label: "Pending Review",
    color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10",
  },
  reviewed: {
    label: "Reviewed",
    color: "text-blue-600 bg-blue-50 dark:bg-blue-500/10",
  },
  cleared: {
    label: "Cleared",
    color: "text-green-600 bg-green-50 dark:bg-green-500/10",
  },
  blocked: {
    label: "Blocked",
    color: "text-red-600 bg-red-50 dark:bg-red-500/10",
  },
};

export default function AdminDashboard() {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlags();
  }, []);

  const fetchFlags = async () => {
    try {
      const res = await api.get("/admin/flagged");
      setFlags(res.data);
    } catch (err) {
      toast.error("Failed to load flagged auctions");
    }
    setLoading(false);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );

  const pending = flags.filter((f) => f.status === "pending").length;
  const blocked = flags.filter((f) => f.status === "blocked").length;
  const cleared = flags.filter((f) => f.status === "cleared").length;

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between pb-8 border-b border-gray-100 dark:border-gray-800 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={20} className="text-orange-500" />
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-sm text-gray-400">
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
              color: "text-yellow-500",
              icon: <AlertTriangle size={16} />,
            },
            {
              label: "Cleared",
              value: cleared,
              color: "text-green-500",
              icon: <CheckCircle size={16} />,
            },
            {
              label: "Blocked",
              value: blocked,
              color: "text-red-500",
              icon: <XCircle size={16} />,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5"
            >
              <div className={`flex items-center gap-2 mb-2 ${stat.color}`}>
                {stat.icon}
                <p className="text-xs font-semibold uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Flagged Auctions */}
        <div className="mt-8 mb-6 ml-2 flex items-center gap-3">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Flagged Auctions
          </h2>
          <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
            {flags.length} total
          </span>
        </div>

        {flags.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-3xl mb-3">✅</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              No flagged auctions
            </p>
            <p className="text-xs text-gray-400 mt-1">All auctions are clean</p>
          </div>
        ) : (
          <div className="ml-2 flex flex-col gap-4">
            {flags.map((flag) => {
              const risk = RISK_COLOR(flag.risk_score);
              const status = STATUS_MAP[flag.status];

              return (
                <div
                  key={flag.id}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm"
                >
                  {/* Risk Banner */}
                  <div
                    className={`flex items-center justify-between px-5 py-3 ${risk.bg} border-b border-gray-100 dark:border-gray-800`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={14} className={risk.text} />
                      <p className={`text-xs font-bold ${risk.text}`}>
                        {risk.label} Risk — Score: {flag.risk_score}/100
                      </p>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${status.color}`}
                    >
                      {status.label}
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
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-100 dark:border-gray-700"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {flag.auction?.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Flagged bidder:{" "}
                          <span className="font-semibold text-gray-600 dark:text-gray-300">
                            {flag.bidder?.name}
                          </span>{" "}
                          · {flag.bidder?.email}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-black text-orange-500">
                          ₹
                          {flag.auction?.current_price?.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[11px] text-gray-400">current bid</p>
                      </div>
                    </div>

                    {/* Reasons */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 mb-4">
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                        Detected Issues
                      </p>
                      <div className="space-y-1.5">
                        {flag.reasons?.map((reason, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0" />
                            <p className="text-xs text-gray-600 dark:text-gray-300">
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
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-green-200 dark:border-green-500/30 text-green-600 dark:text-green-400 text-xs font-semibold rounded-xl hover:bg-green-50 dark:hover:bg-green-500/10 transition-all"
                        >
                          <CheckCircle size={13} /> Clear — Not Fraud
                        </button>
                        <button
                          onClick={() => updateStatus(flag.id, "blocked")}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition-all"
                        >
                          <XCircle size={13} /> Block Bidder
                        </button>
                        <Link
                          to={`/auctions/${flag.auction_id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-semibold rounded-xl hover:border-orange-400 hover:text-orange-500 transition-all flex items-center gap-1.5"
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

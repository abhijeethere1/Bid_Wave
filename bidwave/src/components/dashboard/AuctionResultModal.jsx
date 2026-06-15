import { useState, useEffect } from "react";
import { X, Trophy, User, TrendingUp, Package, Clock } from "lucide-react";
import api from "../../utils/api";

export default function AuctionResultModal({ auctionId, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/auctions/${auctionId}/results`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [auctionId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-black text-gray-900 dark:text-white">
            Auction Results
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data ? (
          <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
            {/* Auction Info */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <img
                  src={
                    data.images?.[0] ||
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&fit=crop"
                  }
                  alt={data.title}
                  className="w-14 h-14 rounded-xl object-cover border border-gray-100 dark:border-gray-700 shrink-0"
                />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {data.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {data.category} · {data.size}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  {
                    icon: <TrendingUp size={13} className="text-orange-500" />,
                    label: "Final Price",
                    value: `₹${data.current_price?.toLocaleString("en-IN")}`,
                  },
                  {
                    icon: <User size={13} className="text-orange-500" />,
                    label: "Total Bids",
                    value: data.bids?.length || 0,
                  },
                  {
                    icon: <Package size={13} className="text-orange-500" />,
                    label: "Delivery",
                    value: `₹${data.delivery_charge}`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center"
                  >
                    <div className="flex justify-center mb-1">{item.icon}</div>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-sm font-black text-gray-900 dark:text-white mt-0.5">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Winner */}
            {data.bids?.length > 0 && (
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  Winner
                </p>
                <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      🏆
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {data.bids[0].bidder?.name}
                      </p>
                      <p className="text-xs text-gray-400">Highest bidder</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-orange-500">
                      ₹{data.bids[0].amount?.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-gray-400">Winning bid</p>
                  </div>
                </div>
              </div>
            )}

            {/* All Bids */}
            <div className="px-6 py-4">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                All Bids
              </p>

              {data.bids?.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-2xl mb-2">😔</p>
                  <p className="text-sm text-gray-400">No bids were placed</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {data.bids?.map((bid, i) => (
                    <div
                      key={bid.id}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl ${
                        i === 0
                          ? "bg-orange-50 dark:bg-orange-500/10"
                          : "bg-gray-50 dark:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            i === 0
                              ? "bg-orange-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white">
                            {bid.bidder?.name}
                          </p>
                          <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <Clock size={9} />
                            {new Date(bid.created_at).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`text-sm font-bold ${
                          i === 0
                            ? "text-orange-500"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        ₹{bid.amount?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-sm text-gray-400">Failed to load results</p>
          </div>
        )}
      </div>
    </div>
  );
}

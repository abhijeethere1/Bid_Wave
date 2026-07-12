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
      <div
        className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/10 dark:border-[#9D4EDD]/20 rounded-3xl shadow-[0_24px_64px_rgba(75,0,130,0.20)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#4B0082]/8 dark:border-[#9D4EDD]/10 bg-[#4B0082]/5 dark:bg-[#9D4EDD]/10">
          <h2 className="text-sm font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
            Auction Results
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#1A1A1A]/5 dark:bg-[#E0E0E0]/5 flex items-center justify-center text-[#737373] dark:text-[#A0A0A0] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#4B0082] dark:border-[#9D4EDD] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data ? (
          <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
            {/* Auction Info */}
            <div className="px-6 py-4 border-b border-[#4B0082]/8 dark:border-[#9D4EDD]/10">
              <div className="flex items-center gap-3">
                <img
                  src={
                    data.images?.[0] ||
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&fit=crop"
                  }
                  alt={data.title}
                  className="w-14 h-14 rounded-xl object-cover border border-[#4B0082]/8 dark:border-[#9D4EDD]/10 shrink-0"
                />
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0]">
                    {data.title}
                  </p>
                  <p className="text-xs text-[#737373] dark:text-[#A0A0A0] mt-0.5">
                    {data.category} · {data.size}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  {
                    icon: (
                      <TrendingUp
                        size={13}
                        className="text-[#D4AF37] dark:text-[#FFD700]"
                      />
                    ),
                    label: "Final Price",
                    value: `₹${data.current_price?.toLocaleString("en-IN")}`,
                  },
                  {
                    icon: (
                      <User
                        size={13}
                        className="text-[#4B0082] dark:text-[#9D4EDD]"
                      />
                    ),
                    label: "Total Bids",
                    value: data.bids?.length || 0,
                  },
                  {
                    icon: (
                      <Package
                        size={13}
                        className="text-[#737373] dark:text-[#A0A0A0]"
                      />
                    ),
                    label: "Delivery",
                    value: `₹${data.delivery_charge}`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#FAF9F6] dark:bg-[#121212] rounded-xl p-3 text-center border border-[#4B0082]/5 dark:border-[#9D4EDD]/10"
                  >
                    <div className="flex justify-center mb-1">{item.icon}</div>
                    <p className="text-xs text-[#737373] dark:text-[#A0A0A0]">
                      {item.label}
                    </p>
                    <p className="text-sm font-black text-[#1A1A1A] dark:text-[#E0E0E0] mt-0.5">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Winner */}
            {data.bids?.length > 0 && (
              <div className="px-6 py-4 border-b border-[#4B0082]/8 dark:border-[#9D4EDD]/10">
                <p className="text-xs font-bold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest mb-3">
                  Winner
                </p>
                <div className="flex items-center justify-between bg-[#D4AF37]/8 dark:bg-[#FFD700]/10 border border-[#D4AF37]/15 dark:border-[#FFD700]/15 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#D4AF37] dark:bg-[#FFD700] rounded-full flex items-center justify-center text-sm">
                      🏆
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0]">
                        {data.bids[0].bidder?.name}
                      </p>
                      <p className="text-xs text-[#737373] dark:text-[#A0A0A0]">
                        Highest bidder
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-[#D4AF37] dark:text-[#FFD700]">
                      ₹{data.bids[0].amount?.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-[#737373] dark:text-[#A0A0A0]">
                      Winning bid
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* All Bids */}
            <div className="px-6 py-4">
              <p className="text-xs font-bold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest mb-3">
                All Bids
              </p>
              {data.bids?.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-2xl mb-2">😔</p>
                  <p className="text-sm text-[#737373] dark:text-[#A0A0A0]">
                    No bids were placed
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {data.bids?.map((bid, i) => (
                    <div
                      key={bid.id}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl ${
                        i === 0
                          ? "bg-[#D4AF37]/8 dark:bg-[#FFD700]/10 border border-[#D4AF37]/15 dark:border-[#FFD700]/15"
                          : "bg-[#FAF9F6] dark:bg-[#121212] border border-[#1A1A1A]/5 dark:border-[#E0E0E0]/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            i === 0
                              ? "bg-[#D4AF37] dark:bg-[#FFD700] text-[#1A1A1A]"
                              : "bg-[#4B0082]/10 dark:bg-[#9D4EDD]/15 text-[#4B0082] dark:text-[#9D4EDD]"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#1A1A1A] dark:text-[#E0E0E0]">
                            {bid.bidder?.name}
                          </p>
                          <p className="text-[10px] text-[#737373] dark:text-[#A0A0A0] flex items-center gap-1 mt-0.5">
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
                        className={`text-sm font-bold ${i === 0 ? "text-[#D4AF37] dark:text-[#FFD700]" : "text-[#1A1A1A] dark:text-[#E0E0E0]"}`}
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
            <p className="text-sm text-[#737373] dark:text-[#A0A0A0]">
              Failed to load results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

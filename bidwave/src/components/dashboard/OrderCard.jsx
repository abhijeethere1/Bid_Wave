import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const STEPS = {
  payment_pending: { step: 1, label: "Complete payment to confirm win" },
  awaiting_item: { step: 2, label: "Seller is shipping to our center" },
  in_transit: { step: 3, label: "Your item is on the way" },
  delivered: { step: 4, label: "Item delivered successfully" },
};

export default function OrderCard({ order }) {
  const step = STEPS[order.status];

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/8 dark:border-[#9D4EDD]/15 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(75,0,130,0.04)] hover:shadow-[0_4px_20px_rgba(75,0,130,0.08)] transition-shadow">
      {/* Pay Now Banner */}
      {order.status === "payment_pending" && (
        <div className="flex items-center justify-between px-5 py-3 bg-[#D4AF37]/10 dark:bg-[#FFD700]/10 border-b border-[#D4AF37]/15 dark:border-[#FFD700]/15">
          <p className="text-xs font-medium text-[#8A6B18] dark:text-[#FFD700]">
            ⚡ Action required — complete payment to secure this item
          </p>
          <Link
            to={`/payment/${order.paymentId}`}
            className="ml-4 px-4 py-1.5 bg-[#D4AF37] dark:bg-[#FFD700] hover:brightness-110 text-[#1A1A1A] text-xs font-bold rounded-lg transition-all whitespace-nowrap shadow-[0_2px_8px_rgba(212,175,55,0.25)]"
          >
            Pay Now →
          </Link>
        </div>
      )}

      {/* Card Body */}
      <div className="p-5 flex flex-col" style={{ height: "140px" }}>
        {/* Top Row */}
        <div className="flex items-start gap-4">
          <img
            src={order.image}
            alt={order.title}
            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#4B0082]/8 dark:border-[#9D4EDD]/10"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-snug truncate">
              {order.title}
            </p>
            <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0] mt-0.5">
              {order.date}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="flex-1" />

        {/* Bottom Row */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1">
            {step && (
              <>
                <div className="flex items-center gap-1.5 mb-1.5">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        n <= step.step
                          ? "bg-[#D4AF37] dark:bg-[#FFD700]"
                          : "bg-[#1A1A1A]/8 dark:bg-[#E0E0E0]/8"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0]">
                  {step.label}
                </p>
              </>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
              ₹{order.amount.toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0] mt-0.5">
              +₹{order.delivery} delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

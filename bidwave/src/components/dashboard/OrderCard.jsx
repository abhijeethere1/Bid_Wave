import StatusBadge from "./StatusBadge";
import { Link } from "react-router-dom";
const STEPS = {
  payment_pending: { step: 1, label: "Complete payment to confirm win" },
  awaiting_item: { step: 2, label: "Seller is shipping to our center" },
  in_transit: { step: 3, label: "Your item is on the way" },
  delivered: { step: 4, label: "Item delivered successfully" },
};

export default function OrderCard({ order }) {
  const step = STEPS[order.status];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Pay Now Banner — only this card grows */}
      {order.status === "payment_pending" && (
        <div className="flex items-center justify-between px-5 py-3 bg-orange-50 dark:bg-orange-500/10 border-b border-orange-100 dark:border-orange-500/20">
          <p className="text-xs font-medium text-orange-600 dark:text-orange-400">
            ⚡ Action required — complete payment to secure this item
          </p>
          <Link
            to={`/payment/${order.paymentId}`}
            className="ml-4 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-all whitespace-nowrap shadow-sm shadow-orange-500/20"
          >
            Pay Now →
          </Link>
        </div>
      )}

      {/* Fixed height body — same for all cards */}
      <div className="p-5 flex flex-col" style={{ height: "140px" }}>
        {/* Top Row */}
        <div className="flex items-start gap-4">
          <img
            src={order.image}
            alt={order.title}
            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-100 dark:border-gray-700"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-snug truncate">
              {order.title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Spacer pushes bottom row down */}
        <div className="flex-1" />

        {/* Bottom Row — always at bottom */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1.5">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`h-1.5 flex-1 rounded-full ${step && n <= step.step ? "bg-orange-500" : "bg-gray-100 dark:bg-gray-700"}`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400">{step ? step.label : "—"}</p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-sm font-black text-gray-900 dark:text-white">
              ₹{order.amount.toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] text-gray-400">
              +₹{order.delivery} delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

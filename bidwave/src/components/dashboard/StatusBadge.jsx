const STATUS_MAP = {
  live: {
    label: "Live",
    bg: "#4B0082",
    color: "#ffffff",
  },
  payment_pending: {
    label: "Payment Pending",
    bg: "rgba(212,175,55,0.12)",
    color: "#8A6B18",
  },
  payment_pending_buyer: {
    label: "Awaiting Payment",
    bg: "rgba(212,175,55,0.12)",
    color: "#8A6B18",
  },
  awaiting_item: {
    label: "Awaiting Item",
    bg: "rgba(75,0,130,0.08)",
    color: "#4B0082",
  },
  awaiting_shipment: {
    label: "Ship to Center",
    bg: "rgba(212,175,55,0.10)",
    color: "#8A6B18",
  },
  shipped_to_center: {
    label: "Shipped to Center",
    bg: "rgba(75,0,130,0.08)",
    color: "#6A0DAD",
  },
  item_received: {
    label: "Item Received",
    bg: "rgba(75,0,130,0.08)",
    color: "#4B0082",
  },
  verified: {
    label: "Item Verified",
    bg: "rgba(46,139,87,0.10)",
    color: "#2E8B57",
  },
  in_transit: {
    label: "In Transit",
    bg: "rgba(75,0,130,0.08)",
    color: "#6A0DAD",
  },
  delivered: {
    label: "Delivered",
    bg: "rgba(46,139,87,0.10)",
    color: "#2E8B57",
  },
  completed: {
    label: "Completed ✓",
    bg: "rgba(46,139,87,0.10)",
    color: "#2E8B57",
  },
  ended: {
    label: "Ended",
    bg: "rgba(26,26,26,0.06)",
    color: "#737373",
  },
};

export default function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.ended;
  return (
    <span
      style={{ backgroundColor: s.bg, color: s.color }}
      className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
    >
      {s.label}
    </span>
  );
}

const STATUS_MAP = {
  live: {
    label: "Live",
    bg: "#fef2f2",
    darkBg: "rgba(239,68,68,0.15)",
    color: "#dc2626",
  },
  payment_pending: {
    label: "Payment Pending",
    bg: "#fefce8",
    darkBg: "rgba(234,179,8,0.15)",
    color: "#ca8a04",
  },
  awaiting_item: {
    label: "Awaiting Item",
    bg: "#eff6ff",
    darkBg: "rgba(59,130,246,0.15)",
    color: "#2563eb",
  },
  in_transit: {
    label: "In Transit",
    bg: "#f5f3ff",
    darkBg: "rgba(139,92,246,0.15)",
    color: "#7c3aed",
  },
  delivered: {
    label: "Delivered",
    bg: "#f0fdf4",
    darkBg: "rgba(34,197,94,0.15)",
    color: "#16a34a",
  },
  ended: {
    label: "Ended",
    bg: "#f3f4f6",
    darkBg: "rgba(107,114,128,0.15)",
    color: "#6b7280",
  },
  awaiting_shipment: {
    label: "Ship to Center",
    bg: "#fff7ed",
    darkBg: "rgba(249,115,22,0.15)",
    color: "#ea580c",
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

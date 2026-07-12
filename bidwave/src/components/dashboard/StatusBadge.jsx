const STATUS_MAP = {
  live: {
    label: "Live",
    bg: "#4B0082",
    darkBg: "rgba(157,78,221,0.15)",
    color: "#ffffff",
    darkColor: "#9D4EDD",
  },
  payment_pending: {
    label: "Payment Pending",
    bg: "rgba(212,175,55,0.12)",
    darkBg: "rgba(255,215,0,0.12)",
    color: "#8A6B18",
    darkColor: "#FFD700",
  },
  awaiting_item: {
    label: "Awaiting Item",
    bg: "rgba(75,0,130,0.08)",
    darkBg: "rgba(157,78,221,0.12)",
    color: "#4B0082",
    darkColor: "#9D4EDD",
  },
  in_transit: {
    label: "In Transit",
    bg: "rgba(75,0,130,0.08)",
    darkBg: "rgba(157,78,221,0.12)",
    color: "#6A0DAD",
    darkColor: "#C77DFF",
  },
  delivered: {
    label: "Delivered",
    bg: "rgba(46,139,87,0.10)",
    darkBg: "rgba(78,186,117,0.12)",
    color: "#2E8B57",
    darkColor: "#4EBA75",
  },
  ended: {
    label: "Ended",
    bg: "rgba(26,26,26,0.06)",
    darkBg: "rgba(224,224,224,0.08)",
    color: "#737373",
    darkColor: "#A0A0A0",
  },
  awaiting_shipment: {
    label: "Ship to Center",
    bg: "rgba(212,175,55,0.10)",
    darkBg: "rgba(255,215,0,0.10)",
    color: "#8A6B18",
    darkColor: "#FFD700",
  },
};

export default function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.ended;
  return (
    <span
      style={{ backgroundColor: s.bg, color: s.color }}
      className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap dark:[background-color:var(--dbg)] dark:[color:var(--dc)]"
    >
      {s.label}
    </span>
  );
}

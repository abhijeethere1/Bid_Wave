import { Truck, Shield } from "lucide-react";

export default function DeliveryInfo({ size, deliveryCharge, currentBid }) {
  return (
    <div className="space-y-4">
      {/* Delivery Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck size={14} className="text-[#737373] dark:text-[#A0A0A0]" />
          <div>
            <p className="text-xs font-medium text-[#1A1A1A] dark:text-[#E0E0E0]">
              {size} item
            </p>
            <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0]">
              Delivery fee
            </p>
          </div>
        </div>
        <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0]">
          ₹{deliveryCharge?.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between bg-[#D4AF37]/8 dark:bg-[#FFD700]/10 border border-[#D4AF37]/15 dark:border-[#FFD700]/15 rounded-xl px-4 py-3">
        <p className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0]">
          Total if you win
        </p>
        <p className="text-sm font-black text-[#D4AF37] dark:text-[#FFD700]">
          ₹{(currentBid + deliveryCharge).toLocaleString("en-IN")}
        </p>
      </div>

      {/* Guarantee */}
      <div className="flex items-start gap-2.5">
        <Shield
          size={14}
          className="text-[#2E8B57] dark:text-[#4EBA75] shrink-0 mt-0.5"
        />
        <p className="text-xs text-[#737373] dark:text-[#A0A0A0] leading-relaxed">
          <span className="text-[#1A1A1A] dark:text-[#E0E0E0] font-semibold">
            BidWave Guarantee —{" "}
          </span>
          Item verified at our center before dispatch. Payment held in escrow
          until you confirm delivery.
        </p>
      </div>
    </div>
  );
}

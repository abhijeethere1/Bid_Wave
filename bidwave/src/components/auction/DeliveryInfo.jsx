import { Truck, Shield } from "lucide-react";

export default function DeliveryInfo({ size, deliveryCharge, currentBid }) {
  return (
    <div className="space-y-4">
      {/* Delivery Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck size={14} className="text-gray-400" />
          <div>
            <p className="text-xs font-medium text-gray-900 dark:text-white">
              {size} item
            </p>
            <p className="text-[11px] text-gray-400">Delivery fee</p>
          </div>
        </div>
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          ₹{deliveryCharge.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-500/10 rounded-xl px-4 py-3">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          Total if you win
        </p>
        <p className="text-sm font-black text-orange-500">
          ₹{(currentBid + deliveryCharge).toLocaleString("en-IN")}
        </p>
      </div>

      {/* Guarantee */}
      <div className="flex items-start gap-2.5">
        <Shield size={14} className="text-green-500 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-400 leading-relaxed">
          <span className="text-gray-900 dark:text-white font-semibold">
            BidWave Guarantee —{" "}
          </span>
          Item verified at our center before dispatch. Payment held in escrow
          until you confirm delivery.
        </p>
      </div>
    </div>
  );
}

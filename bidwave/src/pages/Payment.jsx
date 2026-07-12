import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Shield, ChevronLeft, Lock } from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function Payment() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await api.post("/payments/create-order", { paymentId });
        setPayment(res.data);
      } catch {
        toast.error("Failed to load payment");
        navigate("/dashboard/buyer");
      }
      setLoading(false);
    };
    fetchPayment();
  }, [paymentId]);

  const handlePayment = () => {
    if (!payment) return;
    setPaying(true);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: payment.order.amount,
      currency: "INR",
      name: "BidWave",
      description: payment.payment.auction?.title,
      order_id: payment.order.id,
      image: payment.payment.auction?.images?.[0],
      handler: async (response) => {
        try {
          await api.post("/payments/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            paymentId,
          });
          setPaid(true);
          toast.success("Payment successful! 🎉");
        } catch {
          toast.error("Payment verification failed");
        }
        setPaying(false);
      },
      prefill: { name: "BidWave User", email: "" },
      theme: { color: "#4B0082" },
      modal: { ondismiss: () => setPaying(false) },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] dark:bg-[#121212]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#4B0082] dark:border-[#9D4EDD] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#737373] dark:text-[#A0A0A0]">
            Loading payment...
          </p>
        </div>
      </div>
    );

  if (paid)
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[#FAF9F6] dark:bg-[#121212]">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-[#D4AF37]/10 dark:bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="font-display text-2xl font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
            Payment Successful!
          </h2>
          <p className="text-[#737373] dark:text-[#A0A0A0] text-sm mt-3 leading-relaxed">
            ₹{payment?.payment?.total_amount?.toLocaleString("en-IN")} paid.
            Your payment is held securely in escrow. The seller has been
            notified to ship the item.
          </p>
          <Link
            to="/dashboard/buyer"
            className="inline-block mt-6 px-6 py-3 bg-[#4B0082] dark:bg-[#9D4EDD] hover:brightness-110 text-white font-semibold text-sm rounded-xl transition-all shadow-[0_4px_24px_rgba(75,0,130,0.25)]"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    );

  const p = payment?.payment;

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-md mx-auto px-6 py-10">
        <Link
          to="/dashboard/buyer"
          className="inline-flex items-center gap-1 text-sm text-[#737373] dark:text-[#A0A0A0] hover:text-[#4B0082] dark:hover:text-[#9D4EDD] transition-colors mb-8"
        >
          <ChevronLeft size={15} /> Back to Dashboard
        </Link>

        <div className="mb-8 ml-2">
          <h1 className="font-display text-2xl font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
            Complete Payment
          </h1>
          <p className="text-sm text-[#737373] dark:text-[#A0A0A0] mt-1">
            Secured by escrow — released only after delivery.
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/10 dark:border-[#9D4EDD]/15 rounded-2xl p-5 mb-6 shadow-[0_4px_24px_rgba(75,0,130,0.06)]">
          <p className="text-xs font-bold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest mb-4">
            Order Summary
          </p>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={
                p?.auction?.images?.[0] ||
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&fit=crop"
              }
              alt={p?.auction?.title}
              className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#4B0082]/8 dark:border-[#9D4EDD]/10"
            />
            <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0] flex-1 min-w-0">
              {p?.auction?.title}
            </p>
          </div>
          <div className="space-y-2.5 pt-3 border-t border-[#4B0082]/8 dark:border-[#9D4EDD]/10">
            {[
              {
                label: "Winning Bid",
                value: `₹${p?.auction_amount?.toLocaleString("en-IN")}`,
              },
              {
                label: "Delivery Charge",
                value: `₹${p?.delivery_charge?.toLocaleString("en-IN")}`,
              },
              {
                label: "Platform Fee",
                value: `₹${p?.platform_fee?.toLocaleString("en-IN")}`,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between"
              >
                <p className="text-xs text-[#737373] dark:text-[#A0A0A0]">
                  {row.label}
                </p>
                <p className="text-xs font-semibold text-[#1A1A1A] dark:text-[#E0E0E0]">
                  {row.value}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2.5 border-t border-[#4B0082]/8 dark:border-[#9D4EDD]/10">
              <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0]">
                Total
              </p>
              <p className="text-lg font-black text-[#D4AF37] dark:text-[#FFD700]">
                ₹{p?.total_amount?.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={paying}
          className="w-full py-4 bg-[#D4AF37] dark:bg-[#FFD700] hover:brightness-110 disabled:opacity-60 text-[#1A1A1A] font-bold text-sm rounded-xl shadow-[0_4px_24px_rgba(212,175,55,0.30)] transition-all flex items-center justify-center gap-2"
        >
          <Lock size={15} />
          {paying
            ? "Opening Payment..."
            : `Pay ₹${p?.total_amount?.toLocaleString("en-IN")}`}
        </button>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#737373] dark:text-[#A0A0A0]">
          <Shield size={12} className="text-[#2E8B57] dark:text-[#4EBA75]" />
          Secured by Razorpay · 100% safe & encrypted
        </div>
      </div>
    </div>
  );
}

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
      } catch (err) {
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
      prefill: {
        name: "BidWave User",
        email: "",
      },
      theme: { color: "#f97316" },
      modal: {
        ondismiss: () => setPaying(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading payment...</p>
        </div>
      </div>
    );

  if (paid)
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            Payment Successful!
          </h2>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            Your payment is held securely in escrow. The seller has been
            notified to ship the item.
          </p>
          <Link
            to="/dashboard/buyer"
            className="inline-block mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-xl transition-all"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    );

  const p = payment?.payment;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-md mx-auto px-6 py-10">
        <Link
          to="/dashboard/buyer"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-orange-500 transition-colors mb-8"
        >
          <ChevronLeft size={15} /> Back to Dashboard
        </Link>

        <div className="mb-8 ml-2">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Complete Payment
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Your payment is held securely until delivery is confirmed.
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 space-y-4 mb-6">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Order Summary
          </p>

          <div className="flex items-center gap-3">
            <img
              src={
                p?.auction?.images?.[0] ||
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&fit=crop"
              }
              alt={p?.auction?.title}
              className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-100 dark:border-gray-700"
            />
            <p className="text-sm font-bold text-gray-900 dark:text-white flex-1 min-w-0">
              {p?.auction?.title}
            </p>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-gray-200 dark:border-gray-700">
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
                <p className="text-xs text-gray-400">{row.label}</p>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {row.value}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2.5 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Total
              </p>
              <p className="text-lg font-black text-orange-500">
                ₹{p?.total_amount?.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={paying}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Lock size={15} />
          {paying
            ? "Opening Payment..."
            : `Pay ₹${p?.total_amount?.toLocaleString("en-IN")}`}
        </button>

        {/* Trust */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
          <Shield size={12} className="text-green-500" />
          Secured by Razorpay · 100% safe & encrypted
        </div>
      </div>
    </div>
  );
}

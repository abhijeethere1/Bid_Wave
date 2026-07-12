import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ChevronLeft, CheckCircle } from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4 py-12 bg-[#FAF9F6] dark:bg-[#121212]">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/10 dark:border-[#9D4EDD]/15 rounded-3xl p-8 shadow-[0_4px_24px_rgba(75,0,130,0.06)]">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-[#2E8B57]/10 dark:bg-[#4EBA75]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle
                  size={32}
                  className="text-[#2E8B57] dark:text-[#4EBA75]"
                />
              </div>
              <h1 className="font-display text-xl font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
                Check your email
              </h1>
              <p className="text-[#737373] dark:text-[#A0A0A0] text-sm mt-2 leading-relaxed">
                If an account exists for{" "}
                <span className="text-[#1A1A1A] dark:text-[#E0E0E0] font-medium">
                  {email}
                </span>
                , we've sent a reset link. It expires in 1 hour.
              </p>
              <Link
                to="/login"
                className="inline-block mt-6 text-[#4B0082] dark:text-[#9D4EDD] hover:text-[#D4AF37] dark:hover:text-[#FFD700] text-sm font-semibold transition-colors"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-sm text-[#737373] dark:text-[#A0A0A0] hover:text-[#4B0082] dark:hover:text-[#9D4EDD] transition-colors mb-6"
              >
                <ChevronLeft size={14} /> Back to login
              </Link>
              <div className="mb-8">
                <h1 className="font-display text-2xl font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
                  Forgot password?
                </h1>
                <p className="text-[#737373] dark:text-[#A0A0A0] text-sm mt-1">
                  Enter your email and we'll send you a reset link.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#A0A0A0]"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-[#1A1A1A]/10 dark:border-[#E0E0E0]/10 bg-[#FAF9F6] dark:bg-[#121212] text-[#1A1A1A] dark:text-[#E0E0E0] placeholder-[#737373] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4B0082]/30 dark:focus:ring-[#9D4EDD]/30 focus:border-[#4B0082] dark:focus:border-[#9D4EDD] transition-all"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 mt-2 rounded-xl bg-[#4B0082] dark:bg-[#9D4EDD] hover:brightness-110 disabled:opacity-60 text-white font-semibold text-sm shadow-[0_4px_24px_rgba(75,0,130,0.25)] transition-all"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

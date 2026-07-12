import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Lock, Eye, EyeOff, ChevronLeft } from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full pl-10 pr-11 py-3 text-sm rounded-xl border border-[#1A1A1A]/10 dark:border-[#E0E0E0]/10 bg-[#FAF9F6] dark:bg-[#121212] text-[#1A1A1A] dark:text-[#E0E0E0] placeholder-[#737373] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4B0082]/30 dark:focus:ring-[#9D4EDD]/30 focus:border-[#4B0082] dark:focus:border-[#9D4EDD] transition-all";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", { token, newPassword: password });
      toast.success("Password reset successfully! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4 py-12 bg-[#FAF9F6] dark:bg-[#121212]">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/10 dark:border-[#9D4EDD]/15 rounded-3xl p-8 shadow-[0_4px_24px_rgba(75,0,130,0.06)]">
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-sm text-[#737373] dark:text-[#A0A0A0] hover:text-[#4B0082] dark:hover:text-[#9D4EDD] transition-colors mb-6"
          >
            <ChevronLeft size={14} /> Back to login
          </Link>
          <div className="mb-8">
            <h1 className="font-display text-2xl font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
              Reset password
            </h1>
            <p className="text-[#737373] dark:text-[#A0A0A0] text-sm mt-1">
              Choose a new password for your account.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
                New Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#A0A0A0]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#A0A0A0] hover:text-[#4B0082] dark:hover:text-[#9D4EDD] transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#A0A0A0]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  className={`${inputClass} pr-4`}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-xl bg-[#4B0082] dark:bg-[#9D4EDD] hover:brightness-110 disabled:opacity-60 text-white font-semibold text-sm shadow-[0_4px_24px_rgba(75,0,130,0.25)] transition-all"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

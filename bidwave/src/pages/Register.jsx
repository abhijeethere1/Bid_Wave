import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("buyer");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ ...form, role });
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        await googleLogin(response.access_token, role);
        toast.success("Welcome to BidWave!");
        navigate("/");
      } catch {
        toast.error("Google login failed");
      }
    },
    onError: () => toast.error("Google login failed"),
  });

  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Abhijeet Singh",
      icon: <User size={15} />,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "you@example.com",
      icon: <Mail size={15} />,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "+91 98765 43210",
      icon: <Phone size={15} />,
    },
  ];

  const inputClass =
    "w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-[#1A1A1A]/10 dark:border-[#E0E0E0]/10 bg-[#FAF9F6] dark:bg-[#121212] text-[#1A1A1A] dark:text-[#E0E0E0] placeholder-[#737373] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4B0082]/30 dark:focus:ring-[#9D4EDD]/30 focus:border-[#4B0082] dark:focus:border-[#9D4EDD] transition-all";

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4 py-12 bg-[#FAF9F6] dark:bg-[#121212]">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
            Create account
          </h1>
          <p className="text-[#737373] dark:text-[#A0A0A0] text-sm mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#4B0082] dark:text-[#9D4EDD] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/10 dark:border-[#9D4EDD]/15 rounded-3xl p-8 shadow-[0_4px_24px_rgba(75,0,130,0.06)] dark:shadow-[0_4px_24px_rgba(157,78,221,0.06)]">
          {/* Role Toggle */}
          <div className="flex bg-[#FAF9F6] dark:bg-[#121212] border border-[#1A1A1A]/8 dark:border-[#E0E0E0]/8 rounded-xl p-1 mb-6">
            {["buyer", "seller"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-200
                  ${
                    role === r
                      ? "bg-[#4B0082] dark:bg-[#9D4EDD] text-white shadow-sm"
                      : "text-[#737373] dark:text-[#A0A0A0] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0]"
                  }`}
              >
                I'm a {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
                  {field.label}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#A0A0A0]">
                    {field.icon}
                  </span>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#A0A0A0]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  className={inputClass.replace("pr-4", "pr-11")}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-xl bg-[#4B0082] dark:bg-[#9D4EDD] hover:brightness-110 disabled:opacity-60 text-white font-semibold text-sm shadow-[0_4px_24px_rgba(75,0,130,0.25)] dark:shadow-[0_4px_24px_rgba(157,78,221,0.25)] transition-all duration-200"
            >
              {loading
                ? "Creating account..."
                : `Create ${role === "buyer" ? "Buyer" : "Seller"} Account`}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#1A1A1A]/8 dark:bg-[#E0E0E0]/8" />
            <span className="text-xs text-[#737373] dark:text-[#A0A0A0]">
              or
            </span>
            <div className="flex-1 h-px bg-[#1A1A1A]/8 dark:bg-[#E0E0E0]/8" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            className="w-full py-3 rounded-xl border border-[#1A1A1A]/10 dark:border-[#E0E0E0]/10 bg-[#FAF9F6] dark:bg-[#121212] text-[#1A1A1A] dark:text-[#E0E0E0] text-sm font-medium flex items-center justify-center gap-3 hover:border-[#4B0082]/30 dark:hover:border-[#9D4EDD]/30 hover:bg-[#4B0082]/5 dark:hover:bg-[#9D4EDD]/5 transition-all duration-200"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-[#737373] dark:text-[#A0A0A0] mt-6">
          By signing up you agree to our{" "}
          <Link
            to="/"
            className="text-[#4B0082] dark:text-[#9D4EDD] hover:underline"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            to="/"
            className="text-[#4B0082] dark:text-[#9D4EDD] hover:underline"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

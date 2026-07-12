import { Link, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  Gavel,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const getNavLinks = (user) => {
  const links = [{ label: "How it Works", to: "/how-it-works" }];
  if (user?.role === "buyer") {
    links.unshift({ label: "Live Auctions", to: "/auctions" });
  }
  if (user?.role === "seller") {
    links.unshift({ label: "Sell Item", to: "/sell" });
    links.unshift({ label: "Live Auctions", to: "/auctions" });
  }
  if (user?.role === "admin") {
    links.unshift({ label: "Admin Panel", to: "/admin" });
    links.unshift({ label: "Auctions", to: "/auctions" });
  }
  return links;
};

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 transition-colors duration-300">
      {/* Glass background */}
      <div className="absolute inset-0 bg-[#FAF9F6]/80 dark:bg-[#121212]/80 backdrop-blur-xl border-b border-[#4B0082]/10 dark:border-[#9D4EDD]/10" />

      <div className="relative max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-[#D4AF37] rounded-xl blur-md opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-[#4B0082] dark:bg-[#9D4EDD] text-[#D4AF37] w-9 h-9 rounded-xl flex items-center justify-center shadow-lg">
              <Gavel size={17} strokeWidth={2.5} />
            </div>
          </div>
          <span className="text-xl font-black tracking-tight font-display">
            <span className="text-[#D4AF37]">Bid</span>
            <span className="text-[#1A1A1A] dark:text-[#E0E0E0]">Wave</span>
          </span>
        </Link>

        {/* ── Nav Links ── */}
        <div className="hidden md:flex items-center bg-[#4B0082]/5 dark:bg-[#9D4EDD]/10 rounded-xl p-1 gap-0.5">
          {getNavLinks(user).map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-white dark:bg-[#1E1E1E] text-[#4B0082] dark:text-[#9D4EDD] shadow-sm"
                      : "text-[#737373] dark:text-[#A0A0A0] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0]"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* ── Right Side ── */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-[#4B0082]/5 dark:bg-[#9D4EDD]/10 text-[#737373] dark:text-[#A0A0A0] hover:text-[#4B0082] dark:hover:text-[#9D4EDD] transition-all duration-200 hover:scale-105"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <div className="w-px h-5 bg-[#4B0082]/15 dark:bg-[#9D4EDD]/15 mx-1" />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#4B0082]/5 dark:bg-[#9D4EDD]/10 hover:bg-[#4B0082]/10 dark:hover:bg-[#9D4EDD]/20 transition-all"
              >
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-[#D4AF37]/40"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#4B0082] dark:bg-[#9D4EDD] flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-[#1A1A1A] dark:text-[#E0E0E0] hidden md:block">
                  {user.name?.split(" ")[0]}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-[#737373] transition-transform ${dropOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/10 dark:border-[#9D4EDD]/20 rounded-2xl shadow-xl overflow-hidden z-50">
                  {/* User header */}
                  <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#4B0082]/10 dark:border-[#9D4EDD]/10 bg-[#4B0082]/5 dark:bg-[#9D4EDD]/10">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-[#D4AF37]/40"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#4B0082] dark:bg-[#9D4EDD] flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#1A1A1A] dark:text-[#E0E0E0] truncate">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-[#737373] dark:text-[#A0A0A0] mt-0.5 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setDropOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#737373] dark:text-[#A0A0A0] hover:bg-[#4B0082]/5 dark:hover:bg-[#9D4EDD]/10 hover:text-[#4B0082] dark:hover:text-[#9D4EDD] transition-colors"
                  >
                    <User size={14} /> My Profile
                  </Link>

                  <Link
                    to={
                      user.role === "seller"
                        ? "/dashboard/seller"
                        : user.role === "admin"
                          ? "/admin"
                          : "/dashboard/buyer"
                    }
                    onClick={() => setDropOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#737373] dark:text-[#A0A0A0] hover:bg-[#4B0082]/5 dark:hover:bg-[#9D4EDD]/10 hover:text-[#4B0082] dark:hover:text-[#9D4EDD] transition-colors"
                  >
                    <LayoutDashboard size={14} /> Dashboard
                  </Link>

                  <div className="border-t border-[#4B0082]/10 dark:border-[#9D4EDD]/10" />

                  <button
                    onClick={() => {
                      logout();
                      setDropOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#B22222] dark:text-[#FF6666] hover:bg-[#B22222]/5 dark:hover:bg-[#FF6666]/10 transition-colors"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:block px-4 py-2 text-sm font-medium text-[#737373] dark:text-[#A0A0A0] hover:text-[#4B0082] dark:hover:text-[#9D4EDD] rounded-lg transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="relative group px-5 py-2 text-sm font-semibold text-white dark:text-[#121212] rounded-xl overflow-hidden transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-[#D4AF37] dark:bg-[#FFD700] group-hover:brightness-110 transition-all" />
                <div className="absolute inset-0 bg-[#D4AF37] dark:bg-[#FFD700] blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
                <span className="relative text-[#1A1A1A]">Get Started</span>
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#4B0082]/5 dark:bg-[#9D4EDD]/10 text-[#737373] transition-colors"
          >
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="relative md:hidden border-t border-[#4B0082]/10 dark:border-[#9D4EDD]/10 bg-[#FAF9F6]/90 dark:bg-[#121212]/90 backdrop-blur-xl px-6 py-4 flex flex-col gap-2">
          {getNavLinks(user).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#737373] dark:text-[#A0A0A0] hover:bg-[#4B0082]/5 dark:hover:bg-[#9D4EDD]/10 hover:text-[#4B0082] dark:hover:text-[#9D4EDD] transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-[#4B0082]/10 dark:border-[#9D4EDD]/10 pt-3 mt-1 flex gap-2">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="flex-1 text-center py-2.5 rounded-xl text-sm font-medium border border-[#B22222]/30 text-[#B22222] dark:text-[#FF6666]"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl text-sm font-medium border border-[#4B0082]/20 dark:border-[#9D4EDD]/20 text-[#737373] dark:text-[#A0A0A0]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold bg-[#D4AF37] dark:bg-[#FFD700] text-[#1A1A1A]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

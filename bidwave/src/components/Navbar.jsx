import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Gavel, ChevronDown, User, LogOut } from "lucide-react";
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

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 transition-colors duration-300">
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50" />

      <div className="relative max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
            <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-lg">
              <Gavel size={17} strokeWidth={2.5} />
            </div>
          </div>
          <span className="text-xl font-black tracking-tight">
            <span className="text-orange-500">Bid</span>
            <span className="text-gray-900 dark:text-white">Wave</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center bg-gray-100/80 dark:bg-gray-900/80 rounded-xl p-1 gap-0.5">
          {getNavLinks(user).map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${
            isActive
              ? "bg-white dark:bg-gray-800 text-orange-500 shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-all duration-200 hover:scale-105"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <div className="w-px h-5 bg-gray-200 dark:bg-gray-800 mx-1" />

          {user ? (
            /* Logged In — User Dropdown */
            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white hidden md:block">
                  {user.name?.split(" ")[0]}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform ${dropOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                  </div>
                  <Link
                    to={
                      user.role === "seller"
                        ? "/dashboard/seller"
                        : "/dashboard/buyer"
                    }
                    onClick={() => setDropOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User size={14} /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setDropOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Not Logged In */
            <>
              <Link
                to="/login"
                className="hidden md:block px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="relative group px-4 py-2 text-sm font-semibold text-white rounded-xl overflow-hidden transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:from-orange-400 group-hover:to-orange-500 transition-all" />
                <span className="relative">Get Started</span>
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-500 transition-colors"
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
        <div className="relative md:hidden border-t border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-orange-500 transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-3 mt-1 flex gap-2">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="flex-1 text-center py-2.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-800 text-red-500"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold bg-orange-500 text-white"
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

export default Navbar;

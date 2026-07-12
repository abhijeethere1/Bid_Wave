/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bg: { DEFAULT: "#FAF9F6", dark: "#121212" },
        surface: { DEFAULT: "#FFFFFF", dark: "#1E1E1E" },

        // Text
        primary: { DEFAULT: "#1A1A1A", dark: "#E0E0E0" },
        secondary: { DEFAULT: "#737373", dark: "#A0A0A0" },

        // Brand
        brand: { DEFAULT: "#4B0082", dark: "#9D4EDD", light: "#6A0DAD" },

        // Accent (Gold)
        gold: {
          DEFAULT: "#D4AF37",
          dark: "#FFD700",
          light: "#E8C84A",
          muted: "#B8952A",
        },

        // Status
        win: { DEFAULT: "#2E8B57", dark: "#4EBA75" },
        lose: { DEFAULT: "#B22222", dark: "#FF6666" },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        gold: "0 4px 24px rgba(212,175,55,0.15)",
        brand: "0 4px 24px rgba(75,0,130,0.20)",
        "gold-lg": "0 8px 32px rgba(212,175,55,0.25)",
      },
    },
  },
  plugins: [],
};

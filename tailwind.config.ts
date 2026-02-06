import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zen 2026: warm off-white/ivory base, near-black text, single sage accent
        surface: {
          DEFAULT: "#FDFAF5",
          muted: "#F8F5F0",
        },
        ink: {
          DEFAULT: "#1F1A16",
          muted: "#4A4541",
          subtle: "#6B6560",
        },
        accent: {
          DEFAULT: "#A7BEAE",
          soft: "#C5D4CC",
          muted: "rgba(167, 190, 174, 0.3)",
        },
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-crimson)", "Georgia", "serif"],
      },
      fontSize: {
        body: ["1.125rem", { lineHeight: "2rem" }],
        "body-lg": ["1.25rem", { lineHeight: "2rem" }],
        small: ["0.875rem", { lineHeight: "1.5rem" }],
      },
      maxWidth: {
        content: "72rem",
        narrow: "42rem",
      },
      spacing: {
        section: "12rem",
        "section-lg": "18rem",
        "hero-y": "20rem",
        "hero-y-lg": "24rem",
        "page-x": "8rem",
        "page-x-lg": "16rem",
        "sanctuary-y": "16rem",
        "sanctuary-y-lg": "24rem",
      },
      backgroundImage: {
        noise:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      animation: {
        breathe: "breathe 9s ease-in-out infinite",
        "breathe-sanctuary": "breathe-sanctuary 12s ease-in-out infinite",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.98", transform: "scale(1.02)" },
        },
        "breathe-sanctuary": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.99", transform: "scale(1.02)" },
        },
      },
      boxShadow: {
        inner: "inset 0 1px 0 0 rgba(255,255,255,0.2), inset 0 -1px 0 0 rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
} satisfies Config;

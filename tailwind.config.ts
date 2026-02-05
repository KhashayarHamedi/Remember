import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background base: warm off-white / ivory (never pure white)
        surface: {
          DEFAULT: "hsl(40, 18%, 97%)",
          muted: "hsl(40, 15%, 94%)",
        },
        // Foreground: near-black warm gray
        ink: {
          DEFAULT: "hsl(30, 8%, 14%)",
          muted: "hsl(30, 6%, 32%)",
          subtle: "hsl(30, 5%, 48%)",
        },
        // Single accent: muted sage (used sparingly)
        accent: {
          DEFAULT: "hsl(140, 12%, 42%)",
          soft: "hsl(140, 14%, 55%)",
        },
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-crimson)", "Georgia", "serif"],
      },
      fontSize: {
        "body": ["1.0625rem", { lineHeight: "1.65" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        "small": ["0.875rem", { lineHeight: "1.5" }],
      },
      maxWidth: {
        content: "72rem",
        narrow: "42rem",
      },
      spacing: {
        "section": "12rem",
        "section-lg": "16rem",
        "page-x": "8rem",
        "page-x-lg": "16rem",
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      animation: {
        "breathe": "breathe 8s ease-in-out infinite",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.97" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050508",
        surface: {
          1: "#0a0a14",
          2: "#111022",
          3: "#181630",
          card: "rgba(17, 16, 34, 0.75)",
        },
        brand: {
          purple: "#8b5cf6",
          purpleLight: "#a78bfa",
          purpleDark: "#6d28d9",
          gold: "#f5d061",
          goldLight: "#fef08a",
          goldDark: "#d97706",
          amber: "#ff9e2c",
          magenta: "#ec4899",
        },
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-purple": "0 0 35px -5px rgba(139, 92, 246, 0.4)",
        "glow-gold": "0 0 35px -5px rgba(245, 208, 97, 0.35)",
        "inner-highlight": "inset 0 1px 1px rgba(255, 255, 255, 0.15)",
      },
      borderRadius: {
        "outer": "1.5rem",
        "inner": "1.125rem",
      },
    },
  },
  plugins: [],
};

export default config;

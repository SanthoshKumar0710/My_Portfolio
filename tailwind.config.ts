import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#03050B",
        "bg-secondary": "#080D18",
        "bg-panel": "#0B1220",
        surface: {
          DEFAULT: "#080D18",
          elevated: "#0B1220",
          card: "rgba(11, 18, 32, 0.75)",
        },
        brand: {
          cyan: "#00D9FF",
          violet: "#7657FF",
          purple: "#A855F7",
          gold: "#E7C77A",
          muted: "#9CA8BD",
          white: "#F5F7FF",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-neural": "radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.12), rgba(118, 87, 255, 0.06) 50%, transparent 80%)",
        "gradient-ai": "linear-gradient(135deg, #00D9FF 0%, #7657FF 50%, #A855F7 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-cyan": "0 0 35px -5px rgba(0, 217, 255, 0.35)",
        "glow-violet": "0 0 35px -5px rgba(118, 87, 255, 0.35)",
        "glow-purple": "0 0 35px -5px rgba(168, 85, 247, 0.35)",
        "inner-glow": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;

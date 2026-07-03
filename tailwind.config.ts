import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#06172d",
          900: "#0b1f3a",
          800: "#15345b",
          700: "#254a75"
        },
        leather: {
          900: "#5a2500",
          800: "#7a3400",
          700: "#9a4f16",
          500: "#b8753c"
        },
        ivory: "#f7f2e8",
        graphite: "#24282f"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(6, 23, 45, 0.12)"
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

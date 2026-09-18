import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      colors: {
        // Paleta extraída da identidade visual do @dynamuscapital (Instagram)
        navy: {
          50: "#EEF1F7",
          100: "#D6DEEB",
          200: "#AEBED8",
          300: "#8098BE",
          400: "#55739F",
          500: "#3B5C94",
          600: "#2C4A7C",
          700: "#1F3660",
          800: "#16294D",
          900: "#0F1F3D",
          950: "#0A1730",
        },
        gold: {
          50: "#FBF6ED",
          100: "#F3E6CE",
          200: "#E9D3A8",
          300: "#DCB87C",
          400: "#D2B279",
          500: "#B08850",
          600: "#96723F",
          700: "#7A5C33",
          800: "#5F4728",
        },
      },
    },
  },
  plugins: [],
};

export default config;

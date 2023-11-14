/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: [],
  mode: "jit",
  purge: [
    "./pages/*.{js,jsx,ts,tsx,vue}",
    "./components/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        pink: {
          DEFAULT: "#FBEEFF",
        },
        purple: {
          DEFAULT: "#9378FF",
        },
        gray: {
          DEFAULT: "#FAF9FE",
          copy: "9378FF",
        },
      },
      boxShadow: {
        cta: "0 10px 25px -5px rgba(147, 120, 255, 0.5)",
      },
    },
  },
  plugins: [],
};

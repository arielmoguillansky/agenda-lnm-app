/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: [],
  darkMode: false,
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
    },
  },
  plugins: [],
};

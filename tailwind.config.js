import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
    },
  },
  darkMode: "class",
  plugins: [typography, forms],
}

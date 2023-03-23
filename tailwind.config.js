/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./dist/*.html"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        seafoam: "#42D3B1",
        "soft-red": "#D56A6A",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

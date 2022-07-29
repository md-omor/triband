/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],   
  theme: {
    extend: {
      fontFamily: {
        Oxanium: ["Oxanium", "sans-serif"],
        Jost: ["Jost", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

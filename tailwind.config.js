/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,md,mdx}", "./docs/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        "primary-wopee": "#ffcc00",
        "secondary-wopee": "#7030a0",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  darkMode: ["class", "[data-theme='dark']"],
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "yellow-mustard": "#FFC107",
        "orange-coral": "#FF7F50",
        "sky-blue": "#87CEEB"
      },
      screens: {
        "3xl": "1920px"
      },
      fontFamily: ["Inter", "cursive"]
    }
  },
  plugins: [require("flowbite/plugin")]
};

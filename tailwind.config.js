/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}"
  ],
  theme: {
    extend: {
      colors: {
        "text-color": "#2F4F4F",
        "main-color": "#F5F5DC",
        "secondary-color": "#34568B",
        "hover-color": "#5B7DB1",
        "tag-color": "#97BC62",
        "container-color": "#EBEBEB",
        "extra-color": "#FFA07A",
        "text-color-dark": "#E0E0E0",
        "main-color-dark": "#121212",
        "secondary-color-dark": "#1E3A5F",
        "hover-color-dark": "#2B5178",
        "tag-color-dark": "#748B47",
        "container-color-dark": "#1E1E1E",
        "extra-color-dark": "#CC7B66"
      },
      screens: {
        "3xl": "1920px"
      },
      fontFamily: ["Inter", "cursive"]
    }
  },
  plugins: [require("flowbite/plugin")]
};

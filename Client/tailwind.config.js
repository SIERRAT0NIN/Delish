/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropFilter: {
        none: "none",
        blur: "blur(15px)",
      },
      backgroundColor: {
        glass: "rgba(255, 255, 255, 0.4)",
      },
      borderColor: {
        glass: "rgba(255, 255, 255, 0.5)",
      },
    },
    container: {
      center: true,
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("tailwindcss-filters"), require("daisyui")],
  daisyui: {
    themes: false,
  },
};

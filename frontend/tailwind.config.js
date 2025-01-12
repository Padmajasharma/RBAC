/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.js", // Include this if using flowbite-react components
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite],
};

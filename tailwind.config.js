/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Inter"],
      },
      colors: {
        green: "#0E8388",
      },
    },
  },
  plugins: [],
};

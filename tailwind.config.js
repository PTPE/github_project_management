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
      screens: {
        sm: "320px",
        md: "768px",
        lg: "1170px",
      },
    },
  },
  plugins: [],
};

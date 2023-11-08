/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F0F8FF",
          200: "#CCE4F6",
          300: "#99C3ED",
          400: "#66A3E4",
          500: "#3382DB",
          600: "#0062D2",
          700: "#004C99",
          800: "#003366",
          900: "#001933",
        },
      },
    },
  },
  plugins: [],
};

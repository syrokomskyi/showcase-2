/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        appAccent: {
          50: "#F0F4F1",
          100: "#9FA8A3",
          200: "#7A8A7E",
          300: "#556B59",
          400: "#304D34",
          500: "#1A3A1F",
          DEFAULT: "#0A2213",
          600: "#081B0F",
          700: "#06140B",
          800: "#040D07",
          900: "#020603",
        },
        appGray: {
          50: "#FDFCFB",
          100: "#F9F7F5",
          200: "#E6E9E7",
          300: "#D6D6D6",
          400: "#757182",
          500: "#686473",
          600: "#4A4752",
          700: "#37353D",
          800: "#2A2830",
          900: "#121212",
        },
        appWarning: "#FC5E5E",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          sm: "2.5rem",
          md: "3rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1360px",
        },
      },
    },
  },
};

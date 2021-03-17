module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#A8D1E7",
          dark: "#24315E",
        },
        blue: "#A8D1E7",
        red: "#F76D6D",
        yellow: "#F7E9A0",
        darkblue: "#374785",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

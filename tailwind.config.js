/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "!./node_modules",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: "#F2F2F2",
          100: "#D9D9D9",
          200: "#BFBFBF",
          300: "#A6A6A6",
          400: "#8C8C8C",
          500: "#737373",
          600: "#595959",
          700: "#404040",
          800: "#262626",
          900: "#0D0D0D",
        },
        primary: {
          50: "#FCE1E7",
          100: "#F9B9C6",
          200: "#F68FA3",
          300: "#F36781",
          400: "#F13D5E",
          500: "#EC355D",
          600: "#D82F54",
          700: "#BE2A49",
          800: "#A4263E",
          900: "#8A2133",
        },
        secondary: {
          50: "#F4F0EE",
          100: "#ECE7E3",
          200: "#E3DDD8",
          300: "#DBD5CF",
          400: "#D2CCC7",
          500: "#CABFB9",
          600: "#B8AFA9",
          700: "#A69C96",
          800: "#948A83",
          900: "#7E736C",
        },
        success: {
          50: "#C8E9BF",
          100: "#90D67F",
          200: "#58C43F",
          300: "#24B100",
          400: "#177800",
        },
        warning: {
          50: "#FFF1B5",
          100: "#FFCD54",
          200: "#FF9C00",
          300: "#B86E00",
          400: "#8F5608",
        },
        error: {
          50: "#F5E6E7",
          100: "#E49A9E",
          200: "#D84E53",
          300: "#9F141C",
          400: "#7D1016",
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "hsl(259, 100%, 65%)",
      secondary: "hsl(0, 100%, 67%)",
      white: "hsl(0, 0%, 100%)",
      "off-white": "hsl(0, 0%, 94%)",
      "light-gray": "hsl(0, 0%, 90%)",
      "smokey-gray": "hsl(0, 1%, 44%)",
      "off-black": "hsl(0, 0%, 8%)",
    },
    height: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      full: "100%",
      screen: "calc(var(--vh) * 100)",
    }),
    minHeight: (theme) => ({
      0: "0",
      ...theme("spacing"),
      full: "100%",
      screen: "calc(var(--vh) * 100)",
    }),
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        390: "24rem",
      },
      height: {
        59: "4rem",
        90: "6rem",
      },
    },
  },
  plugins: [],
}

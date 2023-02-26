/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        // ...
        inner: 'inset 0 0 20px 5px rgb(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
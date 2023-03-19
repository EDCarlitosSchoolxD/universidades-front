/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}","node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "85v": "85vh",
        "90v": "90vh",
        "100v": "100vh",
      },
      container:{
        
      }
    },

  },
  plugins: [],
}

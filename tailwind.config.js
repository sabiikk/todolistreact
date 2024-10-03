/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      Poppins:"Poppins"
    },
    extend:{
      colors:{
        transparent: 'bg-tra',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
      }
    },
    screens:{
      xs:"480px",
      sm:"768px",
      md:"1060px",
    },
    
  },
  plugins: [],
}
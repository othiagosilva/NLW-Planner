/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        shape: '0px 8px 8px rgba(0, 0, 0, 0.1) 0px 4px 4px rgba(0, 0 , 0 ,0.1) 0px 2px 2px rgba(0, 0, 0, 0.1), 8px 8 px 0px 1px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        pattern: 'url(/bg.png)'
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        veryLightgrey: 'rgba(0, 0, 0, 0.06)',
        lightGrey: 'rgba(76, 78, 100, 0.54)',
        orangeRed: 'rgba(185, 28, 28, 1)',
        darkRed: 'rgba(190,18,60,1.000)',
        absBack: "rgba(243, 244, 246, 0.5)",
      },
      fontFamily: {
        'DMSans': ['DM Sans', 'sans-serif'],
        'Inter': ['Inter', 'sans-serif'],
        'WorkSans': ['Work Sans', 'sans-serif']
      },
    },
  },
  plugins: [
  
  ],
}
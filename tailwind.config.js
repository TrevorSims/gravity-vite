// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        customBlue: '#1E3A8A', // Custom blue color (converted RGB to HEX for clarity)
      },
    },
  },
  plugins: [],
};


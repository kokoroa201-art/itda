/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Noto Sans KR'", 'system-ui', 'sans-serif'],
      },
      colors: {
        mint: '#00C8A5',
        'mint-dark': '#00A896',
        'itda-blue': '#0057B8',
        'itda-dark': '#1A2035',
      },
    },
  },
  plugins: [],
}

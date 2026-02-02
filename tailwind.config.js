/** @type {import('tailwindcss').Config} */
export default {
  // Pastikan bagian content ini terisi agar Tailwind mendeteksi file Vue kamu
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
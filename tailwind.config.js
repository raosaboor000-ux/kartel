/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      colors: {
        night: "#050509"
      },
      boxShadow: {
        glow: "0 0 24px rgba(112, 90, 255, 0.45)"
      }
    }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#15C770",
        secondary: "#15c771c2",
        tertiary: "#42a7768d",
        "expense-900": "#E86161",
        "expense-800": "#E8616163"
      },
      animation: {
        "fade-in": "fade-in 0.4s ease",
        "fade-out": "fade-out 0.4s ease",
        "modal-open": "modal-open 0.5s ease",
        "modal-close": "modal-close 0.5s ease",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
    },
  },
}

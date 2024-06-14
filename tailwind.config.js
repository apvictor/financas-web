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
        "success-100": "#CBFFF6",
        "success-500": "#15C770",
        "danger-100": "#FFD1D1",
        "danger-500": "#E86161",
      },
      animation: {
        "fade-in": "fade-in 0.4s ease",
        "fade-out": "fade-out 0.4s ease",

        "modal-b-open": "modal-b-open 0.5s ease",
        "modal-b-close": "modal-b-close 0.5s ease",

        "modal-c-open": "modal-c-open 0.5s ease",
        "modal-c-close": "modal-c-close 0.5s ease",

        "modal-t-open": "modal-t-open 0.5s ease",
        "modal-t-close": "modal-t-close 0.5s ease",

        "modal-l-open": "modal-l-open 0.5s ease",
        "modal-l-close": "modal-l-close 0.5s ease",

        "modal-r-open": "modal-r-open 0.5s ease",
        "modal-r-close": "modal-r-close 0.5s ease",
      },
      fontFamily: {
        "space-grotesk": ["Space Grotesk", "sans-serif"]
      },
    },
  },
}

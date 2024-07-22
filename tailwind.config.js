/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{tsx,ts,js,jsx,html}"],
    theme: {
      extend: {
        keyframes: {
          fadeOut: {
            '0%': { backgroundColor: 'rgba(0, 128, 0, 1)' },
            '100%': { backgroundColor: 'rgba(0, 128, 0, 0)' },
          },
          loadingAnimation: {
            '0%': { opacity: '1' },
            '50%': { opacity: '0.5' },
            '100%': { opacity: '1' },
          }
        },
        animation: {
          fadeOut: 'fadeOut 1s ease-in-out forwards',
          loadingAnimation: 'loadingAnimation 1s linear infinite',
        },
      },
    },
    plugins: [],
  }
  
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fluap: {
          primary: '#0066CC',
          'primary-dark': '#0052A3',
          'primary-light': '#3385D6',
          secondary: '#F0F7FF',
          danger: '#DC2626',
          warning: '#F59E0B',
          success: '#10B981',
        },
      },
      borderRadius: {
        'fluap': '12px',
      },
      spacing: {
        'fluap': '24px',
      },
    },
  },
  plugins: [],
}


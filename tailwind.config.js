/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        pink: {
          50: '#fff0f6',
          100: '#ffe0eb',
          200: '#ffc2d6',
          300: '#ffa3c0',
          400: '#ff85aa',
          500: '#ff6694',
          600: '#ff477e',
          700: '#ff2968',
          800: '#e31b54',
          900: '#c1143f',
        },
        purple: {
          50: '#f6f5ff',
          100: '#edebfe',
          200: '#dcd7fe',
          300: '#cabffd',
          400: '#b197fc',
          500: '#9775fa',
          600: '#845ef7',
          700: '#7048e8',
          800: '#6741d9',
          900: '#5f3dc4',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'card-texture': "url('https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      },
    },
  },
  plugins: [],
};
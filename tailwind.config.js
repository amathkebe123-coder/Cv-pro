/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#08080B',
          900: '#0F0F13',
          850: '#15151B',
          800: '#1E1E26',
          700: '#2A2A35',
        },
        gold: {
          300: '#F5DB8B',
          400: '#E5BF5C',
          500: '#D4A843',
          600: '#B88C2A',
          700: '#8E6715',
        },
        cream: {
          50: '#FAF8F5',
          100: '#F5F3EE',
          200: '#EBE7DE',
          300: '#DDD7CA',
        },
        slateCustom: {
          800: '#1E1E26',
          700: '#282833',
          600: '#3A3A4A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,scss,ts}'],
  theme: {
    fontFamily: {
      sans: ['Loli Noto Sans Variable', 'sans-serif'],
      mono: ['Loli JetBrains Mono Variable', 'monospace']
    },
    extend: {
      colors: {
        primary: {
          50: '#F9F3FC',
          100: '#F3E7FA',
          200: '#E0C3F2',
          300: '#CE9FEB',
          400: '#A956DB',
          500: '#840ECC',
          600: '#770DB8',
          700: '#4F087A',
          800: '#3B065C',
          900: '#28043D'
        },
        cerulean: {
          50: '#edf9ff',
          100: '#d7efff',
          200: '#b8e5ff',
          300: '#87d6ff',
          400: '#4ebeff',
          500: '#259eff',
          600: '#0e7eff',
          700: '#0767ee',
          800: '#0e57cc',
          900: '#114897',
          950: '#102c5b'
        },
        zest: {
          50: '#fef8ec',
          100: '#fbedca',
          200: '#f6d991',
          300: '#f1c058',
          400: '#eea931',
          500: '#e18518',
          600: '#cc6613',
          700: '#a94714',
          800: '#8a3816',
          900: '#722f15',
          950: '#411607'
        }
      }
    }
  },
  plugins: []
}

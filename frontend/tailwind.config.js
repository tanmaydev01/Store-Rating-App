/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f7fa",
          100: "#ebeef5",
          200: "#d6dde8",
          300: "#b4c1d9",
          400: "#7a91b8",
          500: "#4f63a0",
          600: "#3d4f7f",
          700: "#2d3d63",
          800: "#1f2a47",
          900: "#151d32",
        },
        secondary: {
          50: "#f8f9fa",
          100: "#f0f2f5",
          200: "#d9dde5",
          300: "#b8bec9",
          400: "#7d8699",
          500: "#5a6578",
          600: "#465060",
          700: "#354251",
          800: "#252d39",
          900: "#1a1f28",
        },
        dark: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79, 99, 160, 0.25)' },
          '50%': { boxShadow: '0 0 40px rgba(79, 99, 160, 0.35)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(79, 99, 160, 0.2)',
        'glow-md': '0 0 25px rgba(79, 99, 160, 0.25)',
        'glow-lg': '0 0 40px rgba(79, 99, 160, 0.3)',
        'glow-purple': '0 0 30px rgba(90, 101, 120, 0.25)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 13px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
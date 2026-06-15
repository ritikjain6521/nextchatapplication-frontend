/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#7c6af7',
        'brand-secondary': '#8b5cf6',
        'brand-indigo': '#6366f1',
        'brand-dark': '#0e0f1a',
        'bg-card': '#1a1b2e',
        'bg-hover': '#1e2035',
        'bg-secondary': '#13141f',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 8s infinite ease-in-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-slide-up': 'fadeSlideUp 0.25s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeSlideUp: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(124,106,247,0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(124,106,247,0.6)' },
        },
      },
      boxShadow: {
        'purple': '0 0 20px rgba(124,106,247,0.4), 0 0 60px rgba(124,106,247,0.15)',
        'purple-sm': '0 0 10px rgba(124,106,247,0.35)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        nexchat: {
          "primary": "#7c6af7",
          "secondary": "#8b5cf6",
          "accent": "#6366f1",
          "neutral": "#1a1b2e",
          "base-100": "#0e0f1a",
          "base-200": "#13141f",
          "base-300": "#1a1b2e",
          "info": "#7c6af7",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        }
      }
    ],
    darkTheme: "nexchat",
  },
}

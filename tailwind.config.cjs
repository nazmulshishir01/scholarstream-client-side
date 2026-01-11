/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        primary: '#3b82f6',
        secondary: '#1e293b',
        accent: '#f59e0b',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#3b82f6",
          "secondary": "#1e293b",
          "accent": "#f59e0b",
          "neutral": "#64748b",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e2e8f0",
          "base-content": "#1e293b",
          "info": "#06b6d4",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
        dark: {
          "primary": "#3b82f6",
          "secondary": "#0f172a",
          "accent": "#f59e0b",
          "neutral": "#94a3b8",
          "base-100": "#1e293b",
          "base-200": "#0f172a",
          "base-300": "#334155",
          "base-content": "#f1f5f9",
          "info": "#06b6d4",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
  },
};

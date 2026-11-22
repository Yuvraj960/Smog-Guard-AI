/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aqi: {
          good: '#10B981',       // 0 - 50 Green
          moderate: '#F59E0B',   // 51 - 100 Yellow/Amber
          sensitive: '#F97316',  // 101 - 150 Orange
          unhealthy: '#EF4444',  // 151 - 200 Red
          veryUnhealthy: '#8B5CF6', // 201 - 300 Purple
          hazardous: '#881337',  // 301+ Maroon
        }
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

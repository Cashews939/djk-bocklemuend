/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        djk: {
          green: '#059669',
          greenDark: '#047857',
          blue: '#0f172a',
          sand: '#d97706',
        }
      }
    },
  },
  plugins: [],
}

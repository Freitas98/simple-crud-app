/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /to-(blue|green|gray)-(400|700)/
    },
    {
      pattern: /from-(blue|green|gray)-(400|700)/
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

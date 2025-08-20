import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        '88': '22rem', // 6rem (w-24) + 16rem (w-64)
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
};

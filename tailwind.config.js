/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Source Serif 4"', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        black: 'var(--fg)',
        white: 'var(--bg)',
        'border-light': 'var(--border-light)',
        'muted-fg': 'var(--muted-fg)',
      },
    },
  },
  plugins: [],
}

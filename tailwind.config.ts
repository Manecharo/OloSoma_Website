import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal-accent': '#62bfa4',
        'teal-accent-dark': '#4fa089',
        'teal-accent-light': '#7dd4ba',
        'dark-base': '#0a0a0a',
        'dark-elevated': '#1a1a1a',
        'dark-surface': '#252525',
      },
      boxShadow: {
        // Flat/Raised shadows
        'neu-flat': '8px 8px 16px rgba(0, 0, 0, 0.6), -8px -8px 16px rgba(98, 191, 164, 0.08)',
        'neu-flat-hover': '10px 10px 20px rgba(0, 0, 0, 0.7), -10px -10px 20px rgba(98, 191, 164, 0.12)',

        // Pressed/Inset shadows
        'neu-pressed': 'inset 6px 6px 12px rgba(0, 0, 0, 0.7), inset -6px -6px 12px rgba(98, 191, 164, 0.05)',
        'neu-pressed-hover': 'inset 6px 6px 12px rgba(0, 0, 0, 0.7), inset -6px -6px 12px rgba(98, 191, 164, 0.1)',

        // Teal glow variants
        'neu-glow': '8px 8px 16px rgba(0, 0, 0, 0.6), -8px -8px 16px rgba(98, 191, 164, 0.08), 0 0 30px rgba(98, 191, 164, 0.3)',
        'neu-glow-strong': '10px 10px 20px rgba(0, 0, 0, 0.7), -10px -10px 20px rgba(98, 191, 164, 0.15), 0 0 40px rgba(98, 191, 164, 0.4)',

        // Card shadows
        'neu-card': '10px 10px 20px rgba(0, 0, 0, 0.6), -10px -10px 20px rgba(98, 191, 164, 0.06)',
        'neu-card-hover': '12px 12px 24px rgba(0, 0, 0, 0.7), -12px -12px 24px rgba(98, 191, 164, 0.1), 0 0 40px rgba(98, 191, 164, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-neu': 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
        'gradient-teal': 'linear-gradient(145deg, #62bfa4, #4fa089)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
};

export default config;

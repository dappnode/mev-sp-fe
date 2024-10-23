/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,ts,jsx,tsx}'],
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        sm: '500px',
      },
      boxShadow: {
        'card-light': '0px 4px 8px rgba(224, 224, 224, 0.3)',
        'card-dark': '0px 4px 8px rgba(63, 63, 63, 0.3)',
      },
      colors: {
        DAppBlue: '#007DFC',
        DAppBackgroundLight: '#F8F8F8',
        'DAppPurple-900': '#7A27D3',
        DAppDeep: '#002C41',
        DAppGray: '#A8A8A8',
        DAppDarkGray: '#5F5F5F',
        DAppLight: '#F8F8F8',
        'DAppNeutral-50': '#F0F2F6',
        'DAppNeutral-100': '#D9DDEA',
        'DAppNeutral-500': '#737992',
        DAppOrange: '#FC9E22',
        'DAppOrange-800': '#FFAE43',
        DAppRed: '#FB2047',
        SkeletonGray: '#EEE',
        DAppDarkSurface: '#121212',
        'DAppDarkSurface-200': '#282828',
        'DAppDarkSurface-200/80': 'rgba(40, 40, 40, 0.8)',
        'DAppDarkSurface-300': '#3f3f3f',
        'DAppDarkSurface-400': '#575757',
        'DAppDarkSurface-500': '#717171',
        'DAppDarkSurface-600': '#8b8b8b',
        DAppDarkText: '#F8F8F8',
        DAppDarkPrimary: '#7A27D3',
      },
      fontFamily: {
        inter: ['var(--font-inter)', ...fontFamily.sans],
        urbanist: ['var(--font-urbanist)'],
      },
      backgroundImage: {
        'DApppurple-linear': 'linear-gradient(to right, #9731dd ,#c237ea)',
        'wave-pattern': "url('/images/wave-pattern.svg')",
        'wave-pattern-dark': "url('/images/wave-pattern-dark.svg')",
      },
      fontSize: {
        '2xl': '1.375rem',
        '3xl': '1.5rem',
      },
      minHeight: {
        'screen-content': 'calc(100vh - 176px)',
      },
      animation: {
        slide: 'slide 45s linear infinite',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

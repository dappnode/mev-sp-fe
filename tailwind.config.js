/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,ts,jsx,tsx}'],
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      screens: {
        sm: '500px',
      },
      boxShadow: {
        card: '0px 4px 8px rgba(224, 224, 224, 0.3)',
      },
      colors: {
        DAppBlue: '#007DFC',
        DAppBackgroundLight: '#F8F8F8',
        'DAppPurple/900': '#7A27D3',
        DAppDeep: '#002C41',
        DAppGray: '#A8A8A8',
        DAppDarkGray: '#5F5F5F',
        DAppLight: '#F8F8F8',
        'DAppNeutral/50': '#F0F2F6',
        'DAppNeutral/100': '#D9DDEA',
        'DAppNeutral/500': '#737992',
        DAppOrange: '#FC9E22',
        'DAppOrange/800': '#FFAE43',
        DAppRed: '#FB2047',
        SkeletonGray: '#EEE',
      },
      fontFamily: {
        inter: ['var(--font-inter)', ...fontFamily.sans],
        urbanist: ['var(--font-urbanist)'],
      },
      backgroundImage: {
        'DApppurple-linear': 'linear-gradient(to right, #9731dd ,#c237ea)',
        'wave-pattern': "url('/images/wave-pattern.svg')",
      },
      fontSize: {
        '2xl': '1.375rem',
        '3xl': '1.5rem',
      },
      minHeight: {
        'screen-content': 'calc(100vh - 176px)',
      },
    },
  },
  plugins: [],
}

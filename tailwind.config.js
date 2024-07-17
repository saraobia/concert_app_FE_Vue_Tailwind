/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        88: '22rem',
        104: '26rem',
        112: '28rem',
        120: '30rem',
        128: '32rem',
        200: '50rem',
        240: '60rem',
        256: '64rem',
      },
    },
    screens: {
      bigSmartphone: '680px',
      tablet: '780px',
      laptop: '1000px',
      desktop: '1280px',
    },
    colors: {
      background: '#f9f9f9',
      card: '#131414',
      light: '#f0f9ff',
      card: '#e0f2fe',
      lightAzure: '#7bd3fe',
      azure: '#35BCFB',
      blue: '#0083ca',
      primary: '#27C499',
      secondary: '#BB86FC',
      secondaryDark: '#3700b3',
      white: '#f9f9f9',
      black: '#000',

      tGray: '#cccccc',
      tDarkGray: '#7a7a7a',
      tMiddle: '#474747',
      tDark: '#181818',

      warning: '#e3b02f',
      danger: '#CF6679',
      darkDanger: '#d44e66',
    },
  },
};

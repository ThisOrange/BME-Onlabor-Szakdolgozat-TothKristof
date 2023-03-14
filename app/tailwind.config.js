/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      syncopate: ['Syncopate', 'sans-serif'],
      inter: ['Inter','inter'],
    },
    extend: {
      colors: {
        primary: {
          black: '#1d1d1f',
          dark_blue: '#0D485B',
          light_blue: '#00B6F4',
          blue: '#4070DE',
          gray: '#F5F5F7',
          white_gray: '#fbfbfd',
          middle_gray: '#6e6e73',
          property_gray: '#808080',
          button_gold:'#9f6d0c',
          input_grey:'#bcbcbc',
          button_grey:'#8a8a8a',
        },
        'light-green': '#b3d1c8',
        green: '#006747',
        green2: '#6EAD5C',
        green4: '#82C65A',
        green3: '#006747',
        green5: 'rgb(179, 209, 200)',

        'warning-30': 'rgba(232, 93, 93, 0.3)',
        warning: '#E85D5D',
      },
      lineHeight: {
        hero: '4.5rem',
      },
      background: ['group-hover'],
      spacing: {
        13: '3.25rem',
      },
      top: {
        '36px': '36px',
      },
      borderWidth: {
        '10xl': '20px',
      },
    },
    screens: {
      '2xs': '375px',
      xs: '490px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1600px',
    },
  },
  variants: {},
  plugins: [],
};

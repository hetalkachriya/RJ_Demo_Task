module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    container: {
      center: true,
      DEFAULT: '1rem',
      sm: '2rem',
      lg: '4rem',
      xl: '5rem',
      '2xl': '6rem',
    },
    colors: {
      gainsboro: '#DDDDDD',
    },
    backgroundPosition: {
      'top-4': 'center top 1rem',
    },
    screens: {
      xxs: { max: '480px' },
      xs: { max: '575px' },
      sm: { min: '576px', max: '767px' },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: '768px', max: '991px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: '992px', max: '1199px' },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: '1200px', max: '1399px' },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': { min: '1400px' },
      '2xlMax': { max: '1400px' },
      // => @media (min-width: 1536px) { ... }

      maxMobile: {
        max: '991px',
      },
      maxDesktop: {
        min: '992px',
      },
      miniDesktop: {
        max: '1366px',
      },
      maxWidthMobile: {
        max: '362px',
      },
      maxMobileSM: {
        max: '767px',
      },
      miniMobileSM: {
        min: '767px',
      },
      miniTablet: {
        min: '992px',
      },
      max1024: {
        max: '1024px',
      },
    },
  },

  plugins: [],
};

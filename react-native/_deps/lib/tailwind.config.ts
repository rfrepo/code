import { plugin } from 'twrnc'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '375px',
      md: '400px'
    },
    colors: {
      black: '#000',
      red: {
        100: '#FFF3EF',
        150: '#FFEBEB',
        200: '#DE3500',
        300: '#E44D4D',
        400: '#F25e5e',
        500: '#FF390D',
        600: '#AB0E0E'
      },
      purple: {
        100: '#7000C8',
        200: '#620F7E',
        300: '#F2D6FB'
      },
      blue: {
        100: '#EBF3FF',
        150: 'rgba(0, 100, 255, 0.08)',
        200: '#A8E3F6',
        300: '#00BAFF',
        400: '#1DA1F2',
        500: '#3b5998',
        600: '#0064FF',
        700: '#0060FF',
        800: '#002661',
        900: '#050c3d',
        1000: '#00AFFF'
      },
      white: '#FFFFFF',
      green: {
        100: '#04AB10',
        200: '#00AB11',
        300: '#1F6156'
      },
      cream: '#FCFAF2',
      brown: {
        100: '#BF7700',
        200: '#291500',
        300: '#F3EDD6',
        350: '#F7F3E4',
        400: '#6D4B04',
        500: '#5E532C',
        600: '#F0E9CD',
        700: '#FCFAF2'
      },
      grey: {
        100: '#FAFAFA',
        150: '#FAF7ED',
        200: '#EDEADC',
        250: '#E6E0CA',
        300: '#EFEBD9',
        350: '#EFECDF',
        400: '#D8D8D8',
        450: '#D8D0BE',
        500: '#D2CEC5',
        600: '#B8B4AB',
        700: '#737373',
        800: '#5A5853',
        900: '#373737'
      },
      yellow: {
        100: '#FDC500',
        150: '#FFD600',
        200: '#FFDC66',
        300: '#FFF6D4',
        400: '#F8BE00',
        450: '#F9D865',
        500: '#FFCF30',
        600: '#FFA721',
        700: '#FFD600',
        800: '#FFA800'
      },
      orange: {
        100: '#FD9800',
        200: '#FDDAC2',
        300: '#FF5C00',
        400: '#FF5C00',
        500: '#FF6633'
      },
      boldRed: '#C92400',
      iceBlue: '#A8E3F6',
      darkRed: '#AB0E0E',
      softRed: '#FFEBEB',
      kycErrorRed: '#FE6D76',
      teal: {
        100: '#439494',
        200: '#007170',
        300: '#40DDC5',
        400: '#1A6F6F',
        450: '#8cb7b7',
        500: '#1F6156',
        700: '#E2F6F6',
        750: '#015A7A',
        800: '#012154'
      },
      darkTeal: '#1A6F6F',
      linkTeal: '#007170',
      darkBlue: '#0064FF',
      linkBlue: '#00BAFF',
      darkGreen: '#89AB00',
      darkCream: '#EFECDF',
      darkDarkCream: '#F3EDD6',
      lightBlue: '#EBF3FF',
      darkerTeal: '#1D535C',
      trackColor: '#C5DBDB',
      fadedYellow: '#FFEDC4',
      lightYellow: '#FFDB63',
      twitterBlue: '#1DA1F2',
      introTierBg: '#EFECDF',
      darkTealText: '#1F6156',
      successGreen: '#00AB11',
      facebookBlue: '#3b5998',
      endGradientBlue: '#002661',
      lightgreen: 'rgba(0, 171, 17, 0.08)',
      lightBrown: 'rgba(191, 119, 0, 0.08)',
      lightOrange: 'rgba(255, 153, 0, 0.08)',
      darkerTealWithOpac: 'rgba(29, 83, 92, .5)',
      foldMediumGreyOpac: 'rgba(210, 206, 197, .5)',
      gold: '#F8BE00'
    },
    fontFamily: {
      'circular-std': ['circular-book'],
      'circular-400': ['circular-book'],
      'circular-700': ['circular-bold'],
      'circular-bold': ['circular-bold'],
      'circular-900': ['circular-black'],
      'circular-500': ['circular-medium'],
      'circular-italic': ['circular-book-italic'],
      'circular-bold-italic': ['circular-bold-italic']
    },
    extend: {
      borderWidth: {
        5: '.5px',
        1: '1px',
        3: '3px'
      },
      opacity: {
        60: '.6'
      },
      borderRadius: {
        10: '10px',
        20: '20px'
      },
      text: {
        md: '14px'
      },
      fontSize: {
        md: '16px',
        xxs: '10px'
      }
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        'side-margins': `mx-4`,
        'legal-text':
          'font-circular-italic text-10px text-black mb-1 text-center leading-1.3',
        'rounded-shadow-block': `rounded-20 bg-white mb-6 p-6 shadow`,
        'margin-top-from-screen': `mt-[24px]`,
        'teal-underline-text-link': `text-sm font-circular-700 text-teal-500 underline`,
        'teal-text-link': `text-sm font-circular-700 text-teal-500`,
        'message-container': `bg-brown-350 border-brown-300 border-1 rounded-10 p-10px px-4`,
        'message-container-text': `text-xs text-grey-800 text- text-center font-circular-700`,
        'shadow-block': {
          elevation: 12,
          shadowOffset: {
            width: 0,
            height: 4
          },
          shadowRadius: 20,
          shadowOpacity: 0.1,
          shadowColor: '#291500'
        }
      })
    })
  ]
}

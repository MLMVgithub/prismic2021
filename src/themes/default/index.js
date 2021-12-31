export const defaultTheme = {
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    default: '0.25rem',
    lg: '0.5rem',
    full: '9999px',
  },
  borderWidth: {
    default: '1px',
    0: '0',
    2: '2px',
    4: '4px',
    8: '8px',
  },

  boxShadow: {
    default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
    outlineLeft: '-8px 8px 0px 16px rgb(214 239 234), 0 4px 6px -2px rgb(0 0 0 / 5%)',
    outlineRight: '8px 8px 0px 16px rgb(214 239 234), 0 4px 6px -2px rgb(0 0 0 / 5%)',
    none: 'none',
  },

  colors: {
    alert: {
      tomato: '#FF6347',
      l1: {
        default: '#478055',
        1100: '#3f734c',
        1200: '#386644',
        1300: '#31593b',
      },
      l2: {
        default: '#6D7C31',
        1100: '#626f2c',
        1200: '#576327',
        1300: '#4c5622',
      },
      l3: {
        default: '#F6C243',
        1100: '#ddae3c',
        1200: '#c49b35',
        1300: '#ac872e',
      },
      l4: {
        default: '#E88D3E',
        1100: '#d07e37',
        1200: '#b97031',
        1300: '#a2622b',
      },
      l5: {
        default: '#D95B4B',
        1100: '#c35143',
        1200: '#ad483c',
        1300: '#973f34',
      },
    },

    card: {
      default: '#171c27',
      100: '#f7fafc',
      200: '#edf2f7',
      300: '#e2e8f0',
      400: '#cbd5e0',
      500: '#a0aec0',
      600: '#718096',
      700: '#4a5568',
      800: '#2d3748',
      900: '#1a202c',
    },

    footer: {
      text: {
        default: '#eeeeee',
      },
      default: '#07152C',
      100: '#E6E7E9',
      200: '#CDD0D4',
      300: '#B4B8BF',
      400: '#9BA1AA',
      500: '#838A95',
      600: '#6A7280',
      700: '#515B6B',
      800: '#384356',
      900: '#1F2C41',
      1100: '#061227',
      1200: '#051023',
      1300: '#040E1E',
    },

    header: {
      text: {
        default: '#ffffff',
      },
      default: '#091b38',
      50: '#091b38BF',
      100: '#E6E8EB',
      200: '#cdd1d7',
      300: '#B5BAC3',
      400: '#9CA3AF',
      500: '#848D9B',
      600: '#6B7687',
      700: '#525F73',
      800: '#3A485F',
      900: '#21314B',
      1100: '#081832',
      1200: '#07152C',
      1300: '#061227',
    },

    primary: {
      default: '#2A708D',
      100: '#e9f0f3',
      200: '#d4e2e8',
      300: '#bfd4dc',
      400: '#a9c5d1',
      500: '#94b7c6',
      600: '#7fa9ba',
      700: '#699aaf',
      800: '#548ca3',
      900: '#3f7e98',
      1100: '#2a6f8d',
      1200: '#25637d',
      1300: '#20566d',
    },

    secondary: {
      default: '#C35322',
      100: '#F9EDE8',
      200: '#F3DCD2',
      300: '#EDCBBC',
      400: '#E7BAA6',
      500: '#E1A890',
      600: '#DB977A',
      700: '#D58664',
      800: '#CF754E',
      900: '#C96438',
      1100: '#AF4A1E',
      1200: '#9C421B',
      1300: '#883A17',
    },

    tertiary: {
      default: '#CEE007',
      100: '#FAFBE6',
      200: '#F5F8CD',
      300: '#F0F5B4',
      400: '#EBF29B',
      500: '#E6EF83',
      600: '#E1EC6A',
      700: '#DCE951',
      800: '#D7E638',
      900: '#D2E31F',
      1100: '#B9C906',
      1200: '#A4B305',
      1300: '#909C04',
    },

    page: {
      default: '#151a1e',
      100: '#e7e8e8',
      200: '#d0d1d2',
      300: '#b8babb',
      400: '#a1a3a5',
      500: '#8a8c8e',
      600: '#727578',
      700: '#5b5e61',
      800: '#43474a',
      900: '#2c3034',
      1100: '#12171b',
      1200: '#101418',
      1300: '#0e1215',

      bground: {
        // default: '#ffffff',
        default: '#fcfcfc',
        // default: '#f7fafc',
      },
    },

    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    // focusVisible: '#9ecaed',
    focusVisible: '#005FCC',
    focusVisibleOnDark: '#80BBFF',

    grey: {
      default: '#323335',
      100: '#EAEAEA',
      200: '#D6D6D6',
      300: '#C1C1C2',
      400: '#ADADAE',
      500: '#98999A',
      600: '#848485',
      700: '#6F7071',
      800: '#5B5B5D',
      900: '#464749',
      1100: '#2D2D2F',
      1200: '#28282A',
      1300: '#251415',
    },
  },

  font: {
    // sans: 'Roboto, sans-serif',
    sans: '"Open Sans", sans-serif',
    slab: 'Rokkitt',
    mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    serif: 'Merriweather, serif',
  },

  // Major second - 1.125
  // fontSize: {
  //   xs: '0.79rem', // x-small
  //   sm: '0.889rem', // small
  //   base: '1rem', // p
  //   lg: '1.125rem', // h6
  //   xl: '1.125rem', // h5
  //   '2xl': '1.266rem', // h4
  //   '3xl': '1.424rem', // h3
  //   '4xl': '1.602rem', // h2
  //   '5xl': '1.802rem', // h1
  //   '6xl': '2.027rem', // Other
  // },

  // Minor third - 1.200
  // fontSize: {
  //   xs: '0.694rem', // x-small
  //   sm: '0.833rem', // small
  //   base: '1rem', // p
  //   lg: '1.2rem', // h6
  //   xl: '1.2rem', // h5
  //   '2xl': '1.44rem', // h4
  //   '3xl': '1.728rem', // h3
  //   '4xl': '2.074rem', // h2
  //   '5xl': '2.488rem', // h1
  //   '6xl': '2.986rem', // Other
  // },

  // Major third - 1.250
  fontSize: {
    xs: '0.64rem', // x-small
    sm: '0.833rem', // small
    base: '1rem', // p
    lg: '1.25rem', // h6
    xl: '1.25rem', // h5
    '2xl': '1.563rem', // h4
    '3xl': '1.953rem', // h3
    '4xl': '2.441rem', // h2
    '5xl': '3.052rem', // h1
    '6xl': '3.815rem', // Other
  },

  // Perfect fourth - 1.333
  // fontSize: {
  //   xs: '0.563rem', // x-small
  //   sm: '0.75rem', // small
  //   base: '1rem', // p
  //   lg: '1.333rem', // h6
  //   xl: '1.333rem', // h5
  //   '2xl': '1.777rem', // h4
  //   '3xl': '2.369rem', // h3
  //   '4xl': '3.157rem', // h2
  //   '5xl': '4.209rem', // h1
  //   '6xl': '5.61rem', // Other
  // },

  fontWeight: {
    hairline: '100',
    thin: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  header: {
    height: '60px',
  },

  inset: {
    0: '0',
    auto: 'auto',
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  listStyleType: {
    none: 'none',
    disc: 'disc',
    decimal: 'decimal',
  },

  objectPosition: {
    bottom: 'bottom',
    center: 'center',
    left: 'left',
    'left-bottom': 'left bottom',
    'left-top': 'left top',
    right: 'right',
    'right-bottom': 'right bottom',
    'right-top': 'right top',
    top: 'top',
  },

  opacity: {
    0: '0',
    25: '0.25',
    50: '0.5',
    75: '0.75',
    100: '1',
  },

  margin: {
    default: '32px',
    '1/2': '16px',
    '1/4': '8px',
    '1/8': '4px',
    '1/16': '2px',
    '1xl': '40px',
    '2xl': '48px',
    '3xl': '56px',
    '4xl': '64px',
    '5xl': '72px',
  },

  padding: {
    default: '32px',
    '1/2': '16px',
    '1/4': '8px',
    '1/8': '4px',
    '1/16': '2px',
    '1xl': '40px',
    '2xl': '48px',
    '3xl': '56px',
    '4xl': '64px',
    '5xl': '72px',
  },

  screens: {
    xs: '576px',
    sm: '768px',
    md: '992px',
    lg: '1200px', // 1280px ?
    xl: '1366px',
    xxl: '1680px',
    full: '100%',
  },

  height: (theme) => ({
    auto: 'auto',
    ...theme('spacing'),
    full: '100%',
    screen: '100vh',
  }),

  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
  },

  transition: {
    easeOut: {
      default: 'all 0.15s ease-out',
      quick: 'all 0.05s ease-out',
      slow: 'all 0.25s ease-out',
      lazy: 'all 0.5s ease-out',
      xtraLazy: 'all 0.25s ease-out',
    },
    easeIn: {
      default: 'all 0.15s ease-in',
      quick: 'all 0.05s ease-in',
      slow: 'all 0.25s ease-in',
      lazy: 'all 0.5s ease-in',
      xtraLazy: 'all 0.25s ease-in',
    },
    linear: {
      default: 'all 0.15s linear',
      quick: 'all 0.05s linear',
      slow: 'all 0.25s linear',
      lazy: 'all 0.5s linear',
      xtraLazy: 'all 0.25s linear',
    },
  },

  cursor: {
    auto: 'auto',
    default: 'default',
    pointer: 'pointer',
    wait: 'wait',
    text: 'text',
    move: 'move',
    'not-allowed': 'not-allowed',
  },
}

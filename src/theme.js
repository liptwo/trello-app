// src/theme.js
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { blue, deepOrange, orange, teal } from '@mui/material/colors'

const HEAD_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${ HEAD_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const HEAD_COLUMN_HEIGHT = '45px'
const FOOTER_COLUMN_HEIGHT = '56px'

const theme = extendTheme({
  trello: {
    headHeight: HEAD_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    headColumnHeight: HEAD_COLUMN_HEIGHT,
    footerColumnHeight: FOOTER_COLUMN_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: '#172b4d'
        }
      }
    },
    dark: {
      palette: {
        text: {
          primary: '#b6c2cf'
        }
      }
    }
    // light: {
    //   palette: {
    //     primary:blue,
    //     secondary:deepOrange
    //   }
    //   // spacing: (factor) => `${0.25 * factor}rem`
    // },
    // dark: {
    //   palette: {
    //     primary: teal,
    //     secondary:orange
    //   }
    //   // spacing: (factor) => `${0.25 * factor}rem`
    // }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(219, 228, 227, 0.61)',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgb(207, 218, 233)' }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': { borderWidth:'0.5px' }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.MuiTypography-body1':{ fontSize: '0.875rem' },
          color: theme.palette.mode === 'dark' ? '#b6c2cf' : '#172b4d'
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root:{
          // color: theme.palette.primary.main,
          fontSize: '0.875rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light
          // },
          // '&:hover':{
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.light
          //   }
          // },
          '& fieldset': {
            boderWidth: '0.5px !important'
          },
          '&:hover fieldset': {
            boderWidth: '1px !important'
          },
          '&:Mui-focused fieldset': {
            boderWidth: '1px !important'
          }
        }
      }
    }
  }
})

export default theme

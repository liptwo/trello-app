// src/theme.js
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { blue, deepOrange, orange, teal } from '@mui/material/colors'

const theme = extendTheme({
  trello: {
    headHeight: 58,
    boardBarHeight: 60
  },
  colorSchemes: {
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
          '*::webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px'
          }
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

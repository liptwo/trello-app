// src/theme.js
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { blue, deepOrange, orange, teal } from '@mui/material/colors'

const theme = extendTheme({
  trello: {
    headHeight: 58,
    boardBarHeight: 60
  },
  colorSchemes: {
    light: {
      palette: {
        primary:blue,
        secondary:deepOrange
      }
      // spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: {
      palette: {
        primary:teal,
        secondary:orange
      }
      // spacing: (factor) => `${0.25 * factor}rem`
    }
  }
})

export default theme

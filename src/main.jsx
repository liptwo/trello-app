// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App'
import theme from '~/theme'
import { Experimental_CssVarsProvider as CssVarProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarProvider theme={theme}>
      <CssBaseline/>
      <App />
    </CssVarProvider>
  </React.StrictMode>
)

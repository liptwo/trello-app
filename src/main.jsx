// src/main.jsx

import ReactDOM from 'react-dom/client'
import App from '~/App'
import theme from '~/theme'
import { Experimental_CssVarsProvider as CssVarProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
// cấu hình toast
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//Cấu hình Mui dialog
import { ConfirmProvider } from 'material-ui-confirm'
//redux
import { store } from '~/redux/store'
import { Provider } from 'react-redux'

// cấu hình react-router-dom với broswer router
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <CssVarProvider theme={theme}>
        <ConfirmProvider defaultOptions={{
          dialogProps: { maxWidth:'xs' },
          confirmationButtonProps: { color: 'error', variant: 'outlined' },
          cancellationButtonProps: { color: 'inherit' },
          allowClose: false
        }}
        >
          <CssBaseline />
          <App />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </ConfirmProvider>
      </CssVarProvider>
    </Provider>
  </BrowserRouter>

)

import { Box, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from './Login'
import RegisterForm from './Register'
const bg = 'src/assets/loginBg.png'

function Auth() {
  const location = useLocation()
  // console.log(location)
  const isLogin = location. pathname === '/login'
  const isRegister = location. pathname === '/register'

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundImage: `url(${bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)'
    }}>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </Box>
  )
}

export default Auth

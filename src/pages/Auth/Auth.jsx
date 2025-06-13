import { Box, Typography } from '@mui/material'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import LoginForm from './Login'
import RegisterForm from './Register'
const bg = 'src/assets/loginBg.png'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

function Auth() {
  const location = useLocation()
  // console.log(location)
  const isLogin = location. pathname === '/login'
  const isRegister = location. pathname === '/register'

  // cách 1 để xử lý đã đăng nhập
  const currentUser = useSelector(selectCurrentUser)
  if ( currentUser ) {
    return <Navigate to='/' replace={true} />
  }

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

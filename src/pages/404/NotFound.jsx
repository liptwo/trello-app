import { Box, Button, keyframes, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
const bg = './src/assets/bg.png'
import astronaut from '~/assets/astronaut.png'

// Animation cho astronaut
const flyAcrossScreen = keyframes`
  0% {
    top: 100%;
    left: -50px;
    transform: scale(0.5) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  50% {
    transform: scale(1) rotate(180deg);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: -50px;
    left: 100vw;
    transform: scale(0.5) rotate(360deg);
  }
`

const moveBackground = keyframes`
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
`

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'repeat-x', // Lặp ngang
        backgroundSize: 'auto 100%', // Giữ chiều cao, không dùng cover
        backgroundPosition: '0% 0%',
        animation: `${moveBackground} 20s linear infinite`
      }}
    >
      {/* Phi hành gia bay ngang màn hình */}
      <Box
        component="img"
        src={astronaut}
        alt="astronaut"
        sx={{
          position: 'absolute',
          height: '150px',
          animation: `${flyAcrossScreen} 20s linear infinite`
        }}
      />

      {/* Nội dung 404 */}
      <Box sx={{ textAlign: 'center', zIndex: 2 }}>
        <Typography
          sx={{ color: 'white', fontWeight: 'medium' }}
          variant="h1"
        >
          404 Not Found!!!
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: 'red' }}>
          This space has lost its way in the universe...
        </Typography>
        <Link to='/' style={{ textDecoration:'none' }} >
          <Button
            variant='contained'
            sx={{}}
            size='large'
          >
            Go Home
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default NotFound

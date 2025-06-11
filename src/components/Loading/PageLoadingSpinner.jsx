import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const PageLoadingSpinner = ({ caption }) => {
  return (
    <Box sx={{ display:'flex', gap:2, width:'100vw', height:'100vh', fontSize:20, alignItems:'center', justifyContent:'center' }}>
      <CircularProgress />
      <Typography variant='h6'>{caption}</Typography>
    </Box>
  )
}

export default PageLoadingSpinner

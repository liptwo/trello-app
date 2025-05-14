import React from 'react'
import ModeSelect from '../../components/ModeSelect'
import Theme from '../../theme'
import Box from '@mui/material/Box'

const AppBar = () => {
  return (
    <Box sx={{
      backgroundColor:'primary.light',
      width: '100vw',
      height: (theme) => theme.trello.headHeight,
      display: 'flex',
      alignItems: 'center'
    }}>
      <ModeSelect />
    </Box>
  )
}

export default AppBar

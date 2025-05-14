import { Box } from '@mui/material'
import Theme from '~/theme'

const BoardBar = () => {
  return (
    <Box sx={{
      backgroundColor:'primary.dark',
      width: '100vw',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center'
    }}>
        Board Bar
    </Box>
  )
}

export default BoardBar

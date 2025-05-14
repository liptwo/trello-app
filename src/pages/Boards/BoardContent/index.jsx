import Box from '@mui/material/Box'
import Theme from '~/theme'

const BoardContent = () => {
  return (
    <Box sx={{
      backgroundColor:'primary.main',
      width: '100%',
      height: (theme) => `calc(100vh - ${theme.trello.headHeight + theme.trello.boardBarHeight}px)`,
      display: 'flex',
      alignItems: 'center'
    }}>
      Main
    </Box>
  )
}

export default BoardContent

import Box from '@mui/material/Box'
import Theme from '~/theme'

const BoardContent = () => {
  return (
    <Box sx={{
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#547792' : 'primary.light'),
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

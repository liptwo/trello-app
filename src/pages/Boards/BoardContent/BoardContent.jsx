import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

const BoardContent = () => {

  return (
    <Box sx={{
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#005485' : '#0079bf'),
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      py:'5px'
    }}>
      <ListColumns />
    </Box>
  )
}

export default BoardContent

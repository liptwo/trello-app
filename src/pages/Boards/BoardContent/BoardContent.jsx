import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import mapOrder from '~/utils/sort'

const BoardContent = ({ board }) => {
  const orderColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box sx={{
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#005485' : '#0079bf'),
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      py:'5px'
    }}>
      <ListColumns columns={ orderColumns } />
    </Box>
  )
}

export default BoardContent

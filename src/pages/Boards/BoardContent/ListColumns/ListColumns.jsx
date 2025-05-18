import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

const ListColumns = ({ columns }) => {
  return (
    <SortableContext
      items={columns?.map(c => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box sx={{
        bgcolor:'inhenrit',
        display: 'flex',
        overflowX:'auto',
        overflowY:'hidden',
        width:'100%',
        height:'100%',
        '&::-webkit-scrollbar-track':{ m:2 }
      }}>
        {columns?.map(column => <Column key={column._id} column={ column }/>)}
        {/* box add new column */}
        <Box sx={{
          color:'white',
          minWidth:'200px',
          maxWidth:'200px',
          height:'fit-content',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#3d7ea3' : '#3d99ce'),
          mx:2,
          borderRadius:'6px'
        }}>
          <Button startIcon={<AddIcon />}
            sx={{
              color:'white',
              width: '100%',
              justifyContent:'flex',
              '&:hover': {backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#33779d' : '#3394cc')},
              py:1
            }}>
            Add New Column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns

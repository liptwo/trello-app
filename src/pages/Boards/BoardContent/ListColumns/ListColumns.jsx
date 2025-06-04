import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
// import { createNewColumnAPI } from '~/apis'

const ListColumns = ({ columns, createdNewColumn, createdNewCard, deleteColumnDetails }) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const [titleColumn, setTitleColumn] = useState('')

  const addNewColumn = ( ) => {
    if ( !titleColumn ) {
      toast.error('Please enter title Column!')
      return
    }
    if ( titleColumn.length > 30) {
      toast.error('quá 30 kí tự rồi anh bạn à')
      return
    }
    // goji api o day
    const newColumnData = {
      title: titleColumn
    }

    createdNewColumn( newColumnData )
    // close state
    toggleOpenNewColumnForm()
    setTitleColumn('')
  }

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
        {columns?.map(column => <Column key={column._id} column={ column } createdNewCard={ createdNewCard } deleteColumnDetails={deleteColumnDetails}/>)}
        {/* box add new column */}
        {!openNewColumnForm ? (
          <Box sx={{
            color:'white',
            minWidth:'250px',
            maxWidth:'250px',
            height:'fit-content',
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#3d7ea3' : '#3d99ce'),
            mx:2,
            borderRadius:'6px'
          }}>
            <Button startIcon={<AddIcon />}
              onClick={toggleOpenNewColumnForm}
              sx={{
                color:'white',
                width: '100%',
                justifyContent:'flex',
                '&:hover': { backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#33779d' : '#3394cc') },
                py:1
              }}>
              Add New Column
            </Button>
          </Box>
        ) : (
          <Box sx={{
            color:'black',
            minWidth:'250px',
            maxWidth:'250px',
            height:'fit-content',
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333743' : 'white'),
            mx:2,
            borderRadius:'6px'
          }}>
            <TextField
              placeholder="Enter column title ... "
              autoFocus
              variant="outlined"
              type="text"
              size="small"
              value={titleColumn}
              inputProps={{ style: { fontSize: 12 } }}
              onChange={(e) => setTitleColumn(e.target.value)}
              sx={ {
                backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#3b434b': 'white'),
                m:1,
                display:'flex',
                // '& label':{ color: 'black' },
                // '& input':{ color: 'black' },
                '& label.Mui-focused':{ color: '#9bc4ff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor:'#8590a2'
                  },
                  '&:hover fieldset':{ borderColor:'#8590a2' },
                  '&.Mui-focused fieldset':{ borderColor:'#9bc4ff' }
                }
              } }
            />
            <Box sx={{ display: 'flex', alignItems:'center' }}>
              <Button
                onClick={addNewColumn}
                variant='contained'
                size='small'
                sx={{
                  color:(theme) => (theme.palette.mode === 'dark' ? 'black': 'white' ),
                  m:1,
                  fontSize: 12,
                  justifyContent:'flex',
                  backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#579dfd': '#0c65e4' ),
                  '&:hover': { backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#76afff' : '#0055cc') }
                }}>
                Save
              </Button>
              <Box onClick={toggleOpenNewColumnForm} sx={{
                p:'6px',
                borderRadius:1,
                display:'flex',
                '&:hover': { backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#6d7780' : '#d0d4db') }
              }}>
                <CloseIcon sx={{
                  color:(theme) => (theme.palette.mode === 'dark' ? 'white': 'black' ),
                  fontSize:20
                }}/>
              </Box>
            </Box>
          </Box>
        )}

      </Box>
    </SortableContext>
  )
}

export default ListColumns

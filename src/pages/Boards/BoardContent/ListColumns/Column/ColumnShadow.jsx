import Box from '@mui/material/Box'
import { useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddCardIcon from '@mui/icons-material/AddCard'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Tooltip from '@mui/material/Tooltip'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import mapOrder from '~/utils/sort'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'


const Column = ({ column, createdNewCard }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging
  } = useSortable({ id: column._id, data: { ...column } })

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const [titleCard, setTitleCard] = useState('')

  const addNewCard = () => {
    if ( !titleCard ) {
      toast.error('Please enter title Card!', { position: 'bottom-left' })
      toggleOpenNewCardForm()
      // console.error(' hãy nhập giá trị đi bạn ')
      return
    }
    if ( titleCard.length > 30) {
      toast.error('quá 30 kí tự rồi anh bạn à')
      return
    }
    // goji api o day
    const newCardData = {
      title: titleCard,
      columnId: column._id
    }

    createdNewCard(newCardData)
    toggleOpenNewCardForm()
    setTitleCard('')

  }
  const dndColumnStyle = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height:'100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')


  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div ref={setNodeRef} style={dndColumnStyle} {...attributes} >
      <Box
        {...listeners}
        sx={{
          display:'hidden',
          minWidth:'300px',
          maxWidth:'300px',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#f1f2f4'),
          ml:2,
          height:'fit-content',
          maxHeight:(theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
          borderRadius:'12px'
        }}>
        {/* Head Column */}
        <Box sx={{
          height:(theme) => theme.trello.headColumnHeight,
          p:2,
          pt:3,
          display: 'flex',
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <Typography variant='h6' sx={{
            fontWeight:'bold',
            fontSize:'1rem',
            cursor:'pointer'
          }}>
            { column?.title }
          </Typography>
          <Box>
            <Tooltip title="Dropdown" arrow>
              <ExpandMoreIcon
                sx={{ color:'primary.text.main', cursor:'pointer' }}
                id="basic-button-expand"
                aria-controls={open ? 'basic-menu-expand' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-expand"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-expand'
              }}
            >

              <MenuItem>
                <ListItemIcon> <AddCardIcon fontSize="small" /> </ListItemIcon>
                <ListItemText>Add a new Card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon> <ContentCopy fontSize="small" /> </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon> <ContentCut fontSize="small" /> </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon> <ContentPaste fontSize="small" /> </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* Body Column */}
        <ListCards cards={ orderedCards } />
        {/* Footer Column */}

        { !openNewCardForm ? (
          <Box sx={{
            height:(theme) => theme.trello.footerColumnHeight,
            p:2,
            display: 'flex',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
            <Button onClick={toggleOpenNewCardForm} startIcon={<AddCardIcon/>}>
              Add new Card
            </Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor:'pointer' }} />
            </Tooltip>
          </Box>
        ) : (
          <>
            <TextField
              placeholder="Enter card title ... "
              autoFocus
              data-no-dnd="true"
              variant="outlined"
              type="text"
              size="small"
              value={titleCard}
              inputProps={{ style: { fontSize: 12 } }}
              onChange={(e) => setTitleCard(e.target.value)}
              sx={ {
                borderRadius: '8px',
                backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#3b434b': 'white'),
                m:1,
                pb:2,
                display:'flex',
                // '& label':{ color: 'black' },
                // '& input':{ color: 'black' },
                '& label.Mui-focused':{ color: '#9bc4ff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor:'#8590a2',
                    borderRadius: '8px',
                    p:'22px'
                  },
                  '&:hover fieldset':{ borderColor:'#8590a2' },
                  '&.Mui-focused fieldset':{ borderColor:'#9bc4ff' }
                }
              } }
            />
            <Box sx={{ display: 'flex', alignItems:'center' }}>
              <Button
                onClick={addNewCard}
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
                Add Card
              </Button>
              <Box onClick={toggleOpenNewCardForm} sx={{
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
          </>
        )
        }

      </Box>
    </div>
  )
}

export default Column

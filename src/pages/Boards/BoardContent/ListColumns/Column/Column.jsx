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

const Column = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{
      minWidth:'300px',
      maxWidth:'300px',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#f1f2f4'),
      ml:2,
      height:'fit-content',
      maxHeight:(theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
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
          To do
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
      <ListCards />
      {/* Footer Column */}
      <Box sx={{
        height:(theme) => theme.trello.footerColumnHeight,
        p:2,
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between'
      }}>
        <Button startIcon={<AddCardIcon/>}>
          Add new Card
        </Button>

        <Tooltip title="Drag to move">
          <DragHandleIcon sx={{ cursor:'pointer' }} />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Column

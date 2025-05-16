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
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import InsertLinkIcon from '@mui/icons-material/InsertLink'

const HEAD_COLUMN_HEIGHT = '45px'
const FOOTER_COLUMN_HEIGHT = '56px'

const BoardContent = () => {
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
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#005485' : '#0079bf'),
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      py:'5px'}}>

      <Box sx={{bgcolor:'inhenrit',
        display: 'flex',
        p:'10px 0',
        overflowX:'auto',
        overflowY:'hidden',
        width:'100%',
        height:'100%',
        '&::-webkit-scrollbar-track':{ m:2 }
      }
      }>
        {/*Column 0*/}


        <Box sx={{
          minWidth:'300px',
          maxWidth:'300px',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#f1f2f4'),
          ml:2,
          borderRadius: '12px',
          height:'fit-content',
          maxHeight:(theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* Head Column */}
          <Box sx={{
            height:HEAD_COLUMN_HEIGHT,
            p:2,
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
          <Box sx={{
            display:'flex',
            flexDirection:'column',
            px:'5px',
            mx:'5px',
            gap:1,
            overflowX:'hidden',
            overflowY:'auto',
            maxHeight: (theme) => `calc(${ theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${HEAD_COLUMN_HEIGHT} - ${FOOTER_COLUMN_HEIGHT})`,
            '&::-webkit-scrollbar':{
              width:'7px',
              height:'7px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgb(137, 147, 171)',
              borderRadius:'8px' },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: 'rgb(111, 112, 113)' }
          }}>
            <Card sx={{ cursor:'pointer', overflow:'unset', boxShadow:'0px 1px 1px #091e4240, 0px 0px 1px #091e424f', borderRadius: '12px'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://images2.thanhnien.vn/528068263637045248/2024/1/25/c3c8177f2e6142e8c4885dbff89eb92a-65a11aeea03da880-1706156293184503262817.jpg"
                title="green iguana"
              />
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>
                  liptwo dev nè
                </Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon />}>12</Button>
                <Button size="small" startIcon={<CommentIcon />}>43</Button>
                <Button size="small" startIcon={<InsertLinkIcon />}>4</Button>
              </CardActions>
            </Card>

            <Card sx={{ cursor:'pointer', overflow:'unset', boxShadow:'0px 1px 1px #091e4240, 0px 0px 1px #091e424f', borderRadius: '8px' }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography >Card nè</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow:'unset', boxShadow:'0px 1px 1px #091e4240, 0px 0px 1px #091e424f', borderRadius: '8px' }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography >Card nè</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow:'unset', boxShadow:'0px 1px 1px #091e4240, 0px 0px 1px #091e424f', borderRadius: '8px' }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography >Card nè</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow:'unset', boxShadow:'0px 1px 1px #091e4240, 0px 0px 1px #091e424f', borderRadius: '8px' }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography >Card nè</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow:'unset', boxShadow:'0px 1px 1px #091e4240, 0px 0px 1px #091e424f', borderRadius: '8px' }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography >Card nè</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow:'unset', boxShadow:'0px 1px 1px #091e4240, 0px 0px 1px #091e424f', borderRadius: '8px' }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography >Card nè</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor:'pointer', overflow:'unset', boxShadow:'0px 1px 1px #091e4240, 0px 0px 1px #091e424f', borderRadius: '8px' }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography >Card nè</Typography>
              </CardContent>
            </Card>
          </Box>

          
          {/* Footer Column */}
          <Box sx={{
            height:FOOTER_COLUMN_HEIGHT,
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
        {/*Column 1*/}
        <Box sx={{
          minWidth:'300px',
          maxWidth:'300px',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#f1f2f4'),
          ml:2,
          borderRadius: '12px',
          height:'fit-content',
          maxHeight:(theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* Head Column */}
          <Box sx={{
            height:HEAD_COLUMN_HEIGHT,
            p:2,
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
          <Box sx={{
            display:'flex',
            flexDirection:'column',
            px:'5px',
            mx:'5px',
            gap:1,
            overflowX:'hidden',
            overflowY:'auto',
            maxHeight: (theme) => `calc(${ theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${HEAD_COLUMN_HEIGHT} - ${FOOTER_COLUMN_HEIGHT})`,
            '&::-webkit-scrollbar':{
              width:'7px',
              height:'7px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c5cad2',
              borderRadius:'8px' },
            '*::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#5c6a82' }
          }}>
            <Card sx={{ cursor:'pointer', overflow:'unset', boxShadow:'0px 1px 1px #091e4240, 0px 0px 1px #091e424f', borderRadius: '12px'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://images2.thanhnien.vn/528068263637045248/2024/1/25/c3c8177f2e6142e8c4885dbff89eb92a-65a11aeea03da880-1706156293184503262817.jpg"
                title="green iguana"
              />
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography>
                  liptwo dev nè
                </Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon />}>12</Button>
                <Button size="small" startIcon={<CommentIcon />}>43</Button>
                <Button size="small" startIcon={<InsertLinkIcon />}>4</Button>
              </CardActions>
            </Card>

            <Card sx={{ cursor:'pointer', overflow:'unset', boxShadow:'0px 1px 1px #091e4240, 0px 0px 1px #091e424f', borderRadius: '8px' }}>
              <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
                <Typography >Card nè</Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Footer Column */}
          <Box sx={{
            height:FOOTER_COLUMN_HEIGHT,
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
      </Box>
    </Box>
  )
}

export default BoardContent

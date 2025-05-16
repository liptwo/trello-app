import { Box, Tooltip } from '@mui/material'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import bear from '~/assets/bear.png'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'


const munus_style = {
  color:'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: 1,
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    backgroundColor: 'primary.50'
  }
}
const BoardBar = () => {
  return (
    <Box px={2} sx={{
      width: '100vw',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      gap: 2,
      borderColor: 'primary.main',
      overflow: 'hidden',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#004065' : '#005c91')
    }}>
      <Box sx={{ display: { xs:'none', md:'flex' }, gap: 2, alignItems: 'center' }}>
        <Chip sx={munus_style} icon={<DashboardIcon sx={ { color: 'primary.main' } } />}
          label="Liptwo trello nè"
          clickable onClick={( ) => { }}/>
        <Chip sx={munus_style} icon={<VpnLockIcon sx={ { color: 'primary.main' } } />}
          label="Public/Private Workspace"
          clickable onClick={() => {}}/>
        <Chip sx={munus_style} icon={<AddToDriveIcon sx={ { color: 'primary.main' } } />}
          label="Add To Google Drive"
          clickable onClick={() => { }}/>
        <Chip sx={munus_style} icon={<FilterListIcon sx={ { color: 'primary.main' } } />}
          label="Filter"
          clickable onClick={() => {}}/>
      </Box>
      <Box sx={{ display:'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon/>}
          sx={{ color:'white',
            borderColor:'white',
            '&:hover':{ borderColor:'white' }
          }}
        >Invite</Button>
        <AvatarGroup max={4}
          sx={{
            gap:'10px',
            '& .MuiAvatar-root': {
              width:34,
              height:34,
              fontSize:16,
              border:'none'
            },
            '& .MuiAvatar-colorDefault':{
              color:  (theme) => (theme.palette.mode === 'dark' ? '#000000' : 'white'),
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#F2F2F2' : '#a4b0de ')
            }
          }}>
          <Tooltip title="Liptwo">
            <Avatar alt="Liptwo" src={bear} />
          </Tooltip>
          <Tooltip title="Liptwo">
            <Avatar alt="Liptwo" src={bear} />
          </Tooltip>
          <Tooltip title="Liptwo">
            <Avatar alt="Liptwo" src={bear} />
          </Tooltip>
          <Tooltip title="Liptwo">
            <Avatar alt="Liptwo" src={bear} />
          </Tooltip>
          <Tooltip title="Liptwo">
            <Avatar alt="Liptwo" src={bear} />
          </Tooltip>
          <Tooltip title="Liptwo">
            <Avatar alt="Liptwo" src={bear} />
          </Tooltip>
          <Tooltip title="Liptwo">
            <Avatar alt="Liptwo" src={bear} />
          </Tooltip>
        </AvatarGroup>

      </Box>
    </Box>
  )
}

export default BoardBar

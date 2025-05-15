import React from 'react'
import ModeSelect from '~/components/ModeSelect'
import Theme from '~/theme'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloIcon from '~/assets/trello.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import WorkSpaces from './Menus/WorkSpaces'
import Recent from './Menus/Recent'
import Started from './Menus/Started'
import Templates from './Menus/Templates'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'

const AppBar = () => {
  return (
    <Box sx={{
      width: '100vw',
      height: (theme) => theme.trello.headHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <AppsIcon fontSize="medium" sx={ { color:'primary.main', cursor:'pointer' } }/>
        <Box sx={{
          display: 'flex',
          gap: 0.5,
          alignItems: 'center'
        }}>
          <SvgIcon
            component={TrelloIcon} fontSize="small" sx={{ color:'primary.main' } } inheritViewBox/>
          <Typography variant='span' sx={{ color: 'primary.main', fontSize: '1.2rem', fontWeight: 'bold' } }>Trello</Typography>
        </Box>
        <WorkSpaces />
        <Recent />
        <Started />
        <Templates />
        <Button variant="outlined">Outlined</Button>
      </Box>
      <Box sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center'
      }}>
        <TextField
          id="outlined-search"
          label="Search..."
          variant="outlined"
          type="search"
          size="small"
        />
        <ModeSelect />
        <Tooltip title="Notifications" arrow>
          <Badge color="secondary" variant="dot" sx={ { cursor:'pointer' } }>
            <NotificationsNoneIcon sx={{color:'primary.main'}} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help" arrow>
          <HelpOutlineIcon sx={ { color:'primary.main', cursor:'pointer' } } />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar

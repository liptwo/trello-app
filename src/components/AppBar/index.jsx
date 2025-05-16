import React, { useState } from 'react'
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
import QueueIcon from '@mui/icons-material/Queue'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

const AppBar = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box px={2} sx={{
      width: '100vw',
      height: (theme) => theme.trello.headHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      gap: 2,
      overflow: 'hidden',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1d2125':'#1565c0')
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <AppsIcon fontSize="medium" sx={ { color:'white', cursor:'pointer' } }/>
        <Box sx={{
          display: 'flex',
          gap: 0.5,
          alignItems: 'center'
        }}>
          <SvgIcon
            component={TrelloIcon} fontSize="small" sx={{ color:'white' } } inheritViewBox/>
          <Typography variant='span' sx={{ color:'white', fontSize: '1.2rem', fontWeight: 'bold' } }>Trello</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
          <WorkSpaces />
          <Recent />
          <Started />
          <Templates />
          <Button variant="outlined" sx={ { color:'white', border:'none', '&:hover':{
            border:'none'
          } } } startIcon={<QueueIcon />}>Outlined</Button>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center'
      }}>
        <TextField
          id="outlined-search"
          label="Search ..."
          variant="outlined"
          type="text"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={ { color:'white' } } />
              </InputAdornment>
            ),
            endAdornment:(
              <CloseIcon
                fontSize="small"
                sx={ { color: searchValue ? 'white' : 'transparent', cursor:'pointer' } }
                onClick={() => setSearchValue('')}
              />
            )
          }}
          sx={ { width:'100%', maxWidth: 400, minWidth:120,
            display:{ xs:'none', md:'flex' },
            '& label':{ color: 'white' },
            '& input':{ color: 'white' },
            '& label.Mui-focused':{ color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor:'white'
              },
              '&:hover fieldset':{ borderColor:'white' },
              '&.Mui-focused fieldset':{ borderColor:'white' }
            }
          } }
        />
        <ModeSelect />
        <Tooltip title="Notifications" arrow>
          <Badge color="warning" variant="dot" sx={ { cursor:'pointer' } }>
            <NotificationsNoneIcon sx={{ color:'white' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help" arrow>
          <HelpOutlineIcon sx={ { color:'white', cursor:'pointer' } } />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar

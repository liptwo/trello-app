import { Box, Popover, Tooltip } from '@mui/material'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
// import bear from '~/assets/bear.png'

const CardUserGroup = ({ boardUser = [], limit = 3 }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  console.log('activeModel BoardUser', boardUser)
  const handleClick = (event) => {
    if ( !anchorEl ) setAnchorEl(event.currentTarget)
    else setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const popoverId = open ? 'all-user-id' : undefined

  return (
    <Box sx={{ display: 'flex', gap: '4px' }}>
      {
        boardUser.map(( user, index) => {
          if (index < limit) {
            return (
              <Tooltip title={user?.displayName} key={user?._id}>
                <Avatar
                  sx={{ width: 34, height: 34, cursor: 'pointer' }}
                  alt={user?.displayName} src={user?.avatar} />
              </Tooltip>
            )
          }
        })
      }

      {
        boardUser.length > limit &&
        <Tooltip title='Show more'>
          <Box
            aria-describedby={popoverId}
            onClick={handleClick}
            sx={{
              width: 36,
              height: 36,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '60%',
              color: (theme) => (theme.palette.mode === 'dark' ? '#000000' : 'white'),
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#F2F2F2' : '#a4b0de')
            }}
          >
            +{boardUser.length - limit}
          </Box>
        </Tooltip>
      }

      <Popover
        disableEnforceFocus
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={{
          maxWidth: '235px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          p: 2
        }}>
          {boardUser.slice(boardUser.length - limit + 1).map((user) => (
            <Tooltip title={user?.displayName} key={user?._id}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt={user?.displayName} src={user?.avatar} />
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  )
}

export default CardUserGroup

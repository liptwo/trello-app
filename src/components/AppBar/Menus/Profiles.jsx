import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
// import bear from '~/assets/bear.png'
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Logout, PersonAdd, Settings } from '@mui/icons-material'
import { useConfirm } from 'material-ui-confirm'
import { Link } from 'react-router-dom'


const Profiles = () => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const confirmLogout = useConfirm()
  const currentUser = useSelector(selectCurrentUser)
  const handleLogOut = async() => {
    confirmLogout({
      title: 'Log out of your account',
      // description: 'End your sesion?',
      confirmationText: 'Confirm Logout'
    }).then(() => {
      dispatch(logoutUserAPI())
    }).catch(() => {})
  }

  // .then( res => {
  //   // kiểm tra không có lỗi thì mới redirect về route login
  //   // if ( !res.error ) {Navigate('/login')}
  // }
  // )
  return (
    <Box>
      <Button
        id="basic-button-profiles"
        aria-controls={open ? 'basic-menu-profiles' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ padding: 0, minWidth: 0 }}
      >
        <Avatar sx={{ width: 32, height: 32 }}
          src={currentUser?.avatar}
          alt="Profile"
        />
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to={'/settings/account'} style={{ textDecoration:'none' }}>
          <MenuItem
            sx={{
              '&:hover':{
                color: 'success.light',
                '& .profile-icon':{
                  color: 'success.light'
                }
              }
            }}
            onClick={handleClose}>
            <Avatar src={currentUser?.avatar} className='profile-icon' /> Profile
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem
          sx={{
            '&:hover':{
              color: 'warning.light',
              '& .logout-icon':{
                color: 'warning.light'
              }
            }
          }}
          onClick={() => handleLogOut()}>
          <ListItemIcon>
            <Logout className='logout-icon' fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles

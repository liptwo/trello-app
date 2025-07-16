import { Box, Tooltip } from '@mui/material'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import FilterListIcon from '@mui/icons-material/FilterList'


import { capitalizeFirstLetter } from '~/utils/fomatters'
import GroupAvatarCustom from './GroupAvatarCustom'
import InviteBoardUser from './InviteBoardUser'


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
const BoardBar = ({ board }) => {
  return (
    <Box px={2}
      sx={{
        ...(board?.boardBg ? { backgroundColor: `(${board?.domicantColor})` } : { backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#004065' : '#005c91') } ),
        width: '100vw',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        gap: 2,
        borderColor: 'primary.main',
        overflow: 'hidden',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)'
        // backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(0, 64, 101, 0.4)' : 'rgba(0, 92, 145, 0.4)')
      }}
      // sx={{
      //   position: 'relative', // quan trọng để overlay nằm trong
      //   width: '100vw',
      //   height: (theme) => theme.trello.boardBarHeight,
      //   display: 'flex',
      //   alignItems: 'center',
      //   justifyContent: 'space-between',
      //   padding: '0 20px',
      //   gap: 2,
      //   overflow: 'hidden',
      //   zIndex: 1 // để nội dung nằm trên overlay
      // }}
    >
      {/* Lớp phủ (overlay) */}
      {/* <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.25)', // lớp phủ đen mờ
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 0
        }}
      /> */}

      {/* Nội dung phía trên */}
      <Box sx={{ display: { xs:'none', md:'flex' }, gap: 2, alignItems: 'center' }}>
        <Tooltip title={board?.description}>
          <Chip sx={munus_style} icon={<DashboardIcon sx={ { color: 'primary.main' } } />}
            label={ board?.title|| ''}
            clickable onClick={( ) => { }}/>
        </Tooltip>
        <Chip sx={munus_style} icon={<VpnLockIcon sx={ { color: 'primary.main' } } />}
          label={capitalizeFirstLetter(board?.type)}
          clickable onClick={() => {}}/>
        <Chip sx={munus_style} icon={<AddToDriveIcon sx={ { color: 'primary.main' } } />}
          label="Add To Google Drive"
          clickable onClick={() => { }}/>
        <Chip sx={munus_style} icon={<FilterListIcon sx={ { color: 'primary.main' } } />}
          label="Filter"
          clickable onClick={() => {}}/>
      </Box>
      <Box sx={{ display:'flex', gap: 2, alignItems: 'center', zIndex: 1 }}>

        <InviteBoardUser boardId={board._id} />


        <GroupAvatarCustom boardUser={board?.FE_allUser} />

      </Box>
    </Box>
  )
}

export default BoardBar

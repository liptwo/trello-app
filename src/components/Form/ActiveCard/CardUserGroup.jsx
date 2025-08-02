import { Badge, Box, Popover, Tooltip } from '@mui/material'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import { useSelector } from 'react-redux'
import { selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { CARD_MEMBER_ACTIONS } from '~/utils/constants'
// import bear from '~/assets/bear.png'

const LIMIT = 3
const CardUserGroup = ({ cardMemberIds = [], onUpdateCardMembers }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)

  // const FE_cardMember = board.FE_allUser.filter((user) =>
  //   cardMemberIds.includes(user._id)
  // )
  const FE_cardMember = cardMemberIds.map((user) => {
    return board.FE_allUser.find(u => u._id === user)
  })
  // console.log('FE_cardMember', FE_cardMember)
  // console.log('activeModel BoardUser', boardUser)
  const handleClick = (event) => {
    if (!anchorEl) setAnchorEl(event.currentTarget)
    else setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const popoverId = open ? 'all-user-id' : undefined

  // xử lý thêm xóa member card
  const handleUpdateCardMember = (user) => {
    // console.log('user', user)
    const addMemberData = {
      userId: user._id,
      action: cardMemberIds.includes(user._id) ? CARD_MEMBER_ACTIONS.REMOVE : CARD_MEMBER_ACTIONS.ADD
    }
    // console.log('addMemberData', addMemberData)
    onUpdateCardMembers(addMemberData)
  }
  return (
    <Box sx={{ display: 'flex', gap: '4px' }}>

      {FE_cardMember.map((user) => (
        <Tooltip title={user?.displayName} key={user?._id}>
          <Avatar
            sx={{ width: 34, height: 34, cursor: 'pointer' }}
            alt={user?.displayName}
            src={user?.avatar}
          />
        </Tooltip>
      ))}


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
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#000000' : 'white',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#F2F2F2' : '#a4b0de'
          }}
        >
          <AddIcon />
        </Box>
      </Tooltip>

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
        <Box
          sx={{
            maxWidth: '235px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            p: 2
          }}
        >
          {board.FE_allUser.map((user) => (
            <Tooltip title={user?.displayName} key={user?._id}>
              <Badge
                className='interceptor-loading'
                sx={{ cursor: 'pointer' }}
                overlap='rectangular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  cardMemberIds.includes(user._id) ?
                    <CheckCircleIcon fontSize='small' sx={{ color: '#27ae60' }} /> : null
                }
                onClick={() => handleUpdateCardMember(user)}
              >
                <Avatar
                  sx={{ width: 34, height: 34, cursor: 'pointer' }}
                  alt={user?.displayName}
                  src={user?.avatar}
                />
              </Badge>
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  )
}

export default CardUserGroup

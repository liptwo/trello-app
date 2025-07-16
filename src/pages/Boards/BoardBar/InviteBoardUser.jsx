import { Box, Button, Popover, TextField, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import { inviteUserToBoardAPI } from '~/apis'

const InviteBoardUser = ( { boardId } ) => {
  const [anchorPopperEl, setAnchorPopperEl] = useState(false)
  const isOpenPopper = Boolean(anchorPopperEl)

  const popperId = isOpenPopper ? 'invite-board-user-popper' : undefined
  const handleTogglePopper = (event) => {
    if (!anchorPopperEl) setAnchorPopperEl(event.currentTarget)
    else setAnchorPopperEl(null)
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()
  const submitInviteUserToBoard = (data) => {
    const { invitedEmail } = data
    inviteUserToBoardAPI({ invitedEmail, boardId }).then( () => {

      setValue('invitedEmail', null)
      setAnchorPopperEl(null)
    })

  }
  return (
    <Box sx={{ display:'flex', gap:'4px'}}>
      <Tooltip title='Invite user to this board'>
        <Button
          variant='outlined'
          aria-describedby={popperId}
          startIcon={<PersonAddIcon />}
          onClick={handleTogglePopper}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
      </Tooltip>
      <Box>
        <Popover
          id={popperId}
          open={isOpenPopper}
          anchorEl={anchorPopperEl}
          onClose={handleTogglePopper}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <form onSubmit={handleSubmit(submitInviteUserToBoard)} style={{ width: '320px' }}>
            <Box sx={{ p: '15px 20px 20px 20px', display: 'flex', flexDirection: 'row', gap: 2 }}>
              {/* <Typography variant="span" sx={{ fontWeight: 'bold', fontSize: '16px' }}>Invite User To This Board !</Typography> */}
              <Box sx={{ width:'80%' }}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Enter email to invite ... "
                  type="text"
                  variant="outlined"
                  { ... register('invitedEmail', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
                  })}
                  error={! !errors ['invitedEmail' ]}
                />
              </Box>

              <Box sx={{ alignSelf: 'center', justifyContent:'center', width:'20%'}}>
                <Button
                  className="interceptor-loading"
                  type="submit"
                  variant="contained"
                  color="info"
                >
                Invite
                </Button>
              </Box>
            </Box>
          </form>
        </Popover>
      </Box>
    </Box>
  )
}

export default InviteBoardUser

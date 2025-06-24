import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MailIcon from '@mui/icons-material/Mail'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'

import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~/utils/validators'
import FieldErrorAlert from '~/components/Alert/Alert'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
// import { useState } from 'react'

// Xử lý custom đẹp cái input file ở đây: https://mui.com/material-ui/react-button/#file-upload
// Ngoài ra note thêm lib này từ docs của MUI nó recommend nếu cần dùng: https://github.com/viclafouch/
// mui-file-input
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 00 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})


function AccountTab() {
  const currentUser = useSelector(selectCurrentUser)

  // Những thông tin của user để init vào form (key tương ứng với register
  const initialGeneralForm = {
    displayName: currentUser?.displayName
  }

  // Sử dụng defaultValues để set giá trị mặc định cho các field cần thiết
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialGeneralForm
  })
  // const [avatar, setAvatar] = useState(null)
  const submitChangeGeneralInformation = (data) => {
    const { displayName } = data
    console. log ('displayName: ', displayName)

    // Nếu không có sự thay đồi gì về displayname thì không làm gì cả
    if (displayName === currentUser?.displayName) return

    // Gọi API ...
    // toast.success('Display name updated successfully!')
  }

  const uploadAvatar = (e) => {
    // Lây file thông qua e.target ?. files[0] và validate nó trước khi xử lý
    console.log ('e.target?.files[0] : ', e.target?.files[0])
    const error = singleFileValidator(e.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }

    // Sử dụng FormData để xử lý dữ liệu liên quan tới file khi gọi API
    let reqData = new FormData()
    reqData.append('avatar', e.target?.files[0])
    // Cách để log được dữ liệu thông qua FormData
    console.log('reqData: ', reqData)
    for (const value of reqData.values()) {
      console.log('reqData Value: ', value)
    }
    // Gọi API ...
  }
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Box sx={{
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <Avatar
              sx={{ width: 84, height: 84, mb: 1 }}
              alt={currentUser?.displayName}
              src={currentUser?.avatar ? currentUser.avatar : {} }
            />
            <Tooltip title="Upload a new image to update your avatar immediately.">
              <Button
                component="label"
                variant="contained"
                size="small"
                startIcon={<CloudUploadIcon />}>
              Upload
                <VisuallyHiddenInput type='file' onChange={uploadAvatar} />
              </Button>
            </Tooltip>
          </Box>
          <Box>
            <Typography variant="h6">{currentUser?.displayName}</Typography>
            <Typography sx={{ color: 'grey' }}>@{currentUser?.username}</Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
          <Box sx={{ width: '400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.email}
                fullWidth
                label="Your Email"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.username}
                fullWidth
                label="Your Username"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <Box>
              <TextField
                error={!!errors['displayName']}
                {...register('displayName', {
                  required:FIELD_REQUIRED_MESSAGE
                })}
                defaultValue={currentUser?.displayName}
                fullWidth
                label="Your DisplayName"
                type="text"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIndIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
              <FieldErrorAlert errors={errors} fieldName={'displayName'}/>
            </Box>
            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:2 }}>
              <Button fullWidth className='interceptor-loading' sx={{ mt:1, height:'40px', color:'white' }} variant="contained" type='submit'> Update </Button>
              <Typography variant='caption' sx={{ color: 'grey', textAlign: 'center' }}>
                You can change your display name here. It will be updated immediately.
                <br />
                Note that your username and email cannot be changed.
              </Typography>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}
export default AccountTab

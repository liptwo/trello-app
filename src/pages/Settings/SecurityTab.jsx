
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Alert/Alert'
// import { useSelector } from 'react-redux'
// import { selectCurrentUser } from '~/redux/user/userSlice'
import { useForm } from 'react-hook-form'
// import { toast } from 'react-toastify'
import PasswordIcon from '@mui/icons-material/Password'
import HttpsIcon from '@mui/icons-material/Https'
import LockResetIcon from '@mui/icons-material/LockReset'
import { useConfirm } from 'material-ui-confirm'
// import { styled } from '@mui/material/styles'
import LogoutIcon from '@mui/icons-material/Logout'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { updateUserAPI } from '~/redux/user/userSlice'


function SecurityTab() {
  // const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  // Sử dụng defaultValues để set giá trị mặc định cho các field cần thiết
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()

  const confirmChangePassword = useConfirm()
  // const [avatar, setAvatar] = useState(null)
  const submitChangeGeneralInformation = () => {
    confirmChangePassword({
      title: <Box sx={{ display:'flex', gap:1, alignItems:'center' }}>
        <LogoutIcon fontSize="medium" /> Are you sure you want to change your password?
      </Box>,
      description: 'This action cannot be undone.',
      confirmationText: 'Yes, change it' })
      // Gọi API ...
      .then(() => {
        // Xử lý logic khi xác nhận thay đổi mật khẩu
        toast.promise(dispatch(updateUserAPI({ current_password: watch('password'),
          new_password: watch('newPassword') })), { pending: 'Changing password...' }).then((res) => {
          if ( !res.error) {
            toast.success('Password changed successfully!')
            reset() // Reset form fields after successful submission)
          }}
        )
        // Ví dụ: gọi API để cập nhật mật khẩu
        // console.log('Password change confirmed')
        // toast.success('Password changed successfully!')
      })
      .catch(() => {})

    // toast.success('Display name updated successfully!')
  }

  // const changePassword = (e) => {
  //   // Sử dụng FormData để xử lý dữ liệu liên quan tới file khi gọi API
  //   let reqData = new FormData()
  //   reqData.append('avatar', e.target?.files[0])
  //   // Cách để log được dữ liệu thông qua FormData
  //   console.log('reqData: ', reqData)
  //   for (const value of reqData.values()) {
  //     console.log('reqData Value: ', value)
  //   }
  //   // Gọi API ...
  // }
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
            <Typography variant="h3">Security Dashboard</Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
          <Box sx={{ width: '400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <TextField
                fullWidth
                label="Current Password"
                error={!!errors['password']}
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
                type="password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
              <FieldErrorAlert errors={errors} fieldName={'password'}/>
            </Box>
            <Box>
              <TextField
                error={!!errors['newPassword']}
                {...register('newPassword', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HttpsIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
              <FieldErrorAlert errors={errors} fieldName={'newPassword'}/>
            </Box>
            <Box>
              <TextField
                fullWidth
                error={!!errors['cofirmNewPassword']}
                {...register('cofirmNewPassword', {
                  required:FIELD_REQUIRED_MESSAGE,
                  validate: (value) => {
                    if (value === watch('newPassword')) {
                      return true
                    }
                    // Nếu không khớp, trả về thông báo lỗi
                    return 'Passwords do not match'
                  }
                })}
                label="Confirm New Password"
                type="password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockResetIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
              <FieldErrorAlert errors={errors} fieldName={'cofirmNewPassword'}/>
            </Box>
            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:2 }}>
              <Button fullWidth className='interceptor-loading' sx={{ mt:1, height:'40px', color:'white' }} variant="contained" type='submit'> Change </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default SecurityTab

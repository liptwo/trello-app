import { Alert, Box, Button, Card as MuiCard, SvgIcon, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import TrelloIcon from '~/assets/trello.svg?react'
import AppsIcon from '@mui/icons-material/Apps'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
// import Zoom from '@mui/material/Zoom'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Alert/Alert'
import { useDispatch } from 'react-redux'
import { loginAPI } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'
import theme from '~/theme'
import { BorderBeam } from '~/components/magicui/border-beam'
// import { Meteors } from "~/components/magicui/meteors"
import { BorderFire } from '~/components/BorderFire/BorderFire'
export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  let [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const registeredEmail = searchParams.get('registeredEmail')
  // console.log('🚀 ~ Login.jsx:15 ~ LoginForm ~ registeredEmail:', registeredEmail)
  const verifiedEmail = searchParams.get('verifiedEmail')

  const submitLogin = async ( data ) => {
    // console.log('🚀 ~ Login.jsx:18 ~ submitLogin ~ data:', data)
    const { email, password } = data
    toast.promise(dispatch( loginAPI({ email, password }) ), { pending: 'Logging progress ...' }
    ).then( res => {
      // kiểm tra không có lỗi thì mới redirect về route
      if ( !res.error ) {navigate('/')}
    }
    )
  }
  // console.log(errors)
  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      {/* <BorderFire> */}
      <MuiCard
        className="relative w-[350px] overflow-hidden"
        sx={{ display: 'flex',
          flexDirection: 'column',
          justifyContent:'center',
          minWidth: 380,
          maxWidth:380,
          marginTop:'6em',
          backgroundColor:'white',
          p:2,
          borderRadius:2,
          fontSize:20,
          fontWeight: 500,
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1d2125':'white')
        }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <AppsIcon fontSize="medium" sx={ { color:(theme) => (theme.palette.mode === 'dark' ? 'white':'black'), cursor:'pointer' } }/>
          <Box sx={{
            display: 'flex',
            gap: 0.5,
            alignItems: 'center'
          }}>
            <SvgIcon
              component={TrelloIcon} fontSize="small" sx={{ color:(theme) => (theme.palette.mode === 'dark' ? 'white':'black') } } inheritViewBox/>
            <Typography variant='span' sx={{ color:(theme) => (theme.palette.mode === 'dark' ? 'white':'black'), fontSize: '1.2rem', fontWeight: 'bold' } }>Trello</Typography>
          </Box>
        </Box>
        <Box sx={{ height:'50px', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Typography variant="h6">
            Hãy nhập tài khoản và mật khẩu để đăng nhập nhé
          </Typography>
        </Box>
        <Box sx={{ display:'flex', gap:1, flexDirection:'column' }}>
          {verifiedEmail && <Alert severity="success">Your email&nbsp; <Typography variant='span' sx={{fontWeight: 'bold', '&:hover':{ color: '#1565c0' }}}>{verifiedEmail}</Typography> has been verified.<br/>
          now you can login to enjoy our services</Alert>}
          {registeredEmail && <Alert severity="info">An email has been sent to&nbsp;<Typography variant='span' sx={{ fontWeight: 'bold', '&:hover':{ color: '#1565c0' } }}>{registeredEmail}</Typography><br/>
          Please check and verify your account before logging in!</Alert>}
        </Box>
        <Box sx={{ marginTop:'1em' }}>
          <TextField
            autoFocus
            fullWidth id="outlined-basic-email"
            label="Email"
            variant="outlined"
            type='text'
            error={!!errors['email']}
            {...register('email', {
              required:FIELD_REQUIRED_MESSAGE,
              pattern:{
                value: EMAIL_RULE,
                message:EMAIL_RULE_MESSAGE
              }
            })}
          />
          <FieldErrorAlert errors={errors} fieldName={'email'}/>
        </Box>
        <Box sx={{ marginTop:'1em' }}>
          <TextField
            fullWidth id="outlined-basic-password"
            label="Password"
            variant="outlined"
            type='password'
            error={!!errors['password']}
            {...register('password', {
              required:FIELD_REQUIRED_MESSAGE,
              pattern:{
                value: PASSWORD_RULE,
                message:PASSWORD_RULE_MESSAGE
              }
            })}
          />
          <FieldErrorAlert errors={errors} fieldName={'password'}/>
        </Box>
        <Box sx={{ display:'flex', pt:1, alignItems:'center', justifyContent:'center', flexDirection:'column', gap:2 }}>
          <Button fullWidth className='interceptor-loading' sx={{ mt:1, height:'40px', backgroundColor: theme.palette.mode === 'dark' ? 'skyblue' : 'primary',
            color: theme.palette.mode === 'dark' ? 'black' : 'white',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? 'skyblue' : '',
            } }}
          variant="contained" type='submit'> Login</Button>

          <Link to='/register' style={{ textDecoration:'none' }} >
            <Box sx={{ display:'flex', pt:1, alignItems:'center', justifyContent:'center', flexDirection:'row', gap:1 }}>
              <Typography> Chưa có tài khoản? </Typography>
              <Typography
                sx={{ color: '#1565c0', '&:hover':{ color: '#8fadde' } }}
                size='large'
              >
                Đăng ký
              </Typography>
            </Box>
          </Link>
        </Box>
          {/* <BorderBeam duration={6}
            delay={3}
            size={400}
            borderWidth={2}
            className="from-transparent via-red-700 to-transparent"/> */}
      </MuiCard>
      {/* </BorderFire> */}
    </form>

  )
}
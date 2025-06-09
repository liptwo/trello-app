import { Alert, Box, Button, Card as MuiCard, SvgIcon, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import TrelloIcon from '~/assets/trello.svg?react'
import AppsIcon from '@mui/icons-material/Apps'
import { Link } from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check'
import Zoom from '@mui/material/Zoom'
import FieldErrorAlert from '~/components/Alert/Alert'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const onSubmit = data => console.log(data)
  // console.log(errors)
  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Zoom in={true} style={{ transitionDelay: '200ms'}}>
        <MuiCard sx={{ display: 'flex',
          flexDirection: 'column',
          justifyContent:'center',
          minWidth: 380,
          maxWidth:380,
          marginTop:'6em',
          backgroundColor:'white',
          p:2,
          borderRadius:2,
          fontSize:20,
          fontWeight: 500
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <AppsIcon fontSize="medium" sx={ { color:'black', cursor:'pointer' } }/>
            <Box sx={{
              display: 'flex',
              gap: 0.5,
              alignItems: 'center'
            }}>
              <SvgIcon
                component={TrelloIcon} fontSize="small" sx={{ color:'black' } } inheritViewBox/>
              <Typography variant='span' sx={{ color:'black', fontSize: '1.2rem', fontWeight: 'bold' } }>Trello</Typography>
            </Box>
          </Box>
          <Box sx={{ m:2, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Typography variant="h6">
              Hãy nhập các thông tin sau để tạo tài khoản
            </Typography>
          </Box>
          <Box sx={{ display:'flex', gap:1, flexDirection:'column' }}>
            <Alert severity="success">This is a success Alert.</Alert>
            <Alert severity="info">This is an info Alert.</Alert>
          </Box>
          <Box sx={{ marginTop:'0.25em' }}>
            <TextField fullWidth id="outlined-basic-email"
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
            <TextField fullWidth id="outlined-basic-password"
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
          <Box sx={{ marginTop:'1em' }}>
            <TextField
              fullWidth
              id="outlined-basic-password-again"
              label="Password confirm" variant="outlined"
              type='password'
              error={!!errors['password_confirm']}
              {...register('password_confirm', {
                validate: (value) => {
                  if ( value === watch('password')) return true
                  return 'Password confirm not match!'
                }
              })} />
            <FieldErrorAlert errors={errors} fieldName={'password_confirm'}/>
          </Box>
          <Box sx={{ display:'flex', pt:1, alignItems:'center', justifyContent:'center', flexDirection:'column', gap:2 }}>
            <Button fullWidth className='interceptor-loading' sx={{mt:1, height:'40px', color:'white' }} variant="contained" type='submit'> Register</Button>
            <Link to='/login' style={{ textDecoration:'none' }} >
              <Box sx={{ display:'flex', pt:1, alignItems:'center', justifyContent:'center', flexDirection:'row', gap:1 }}>
                <Typography> Đã có tài khoản? </Typography>
                <Typography
                  sx={{ color: '#1565c0', '&:hover':{ color: '#8fadde' } }}
                  size='large'
                >
                  Đăng nhập
                </Typography>
              </Box>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>

  )
}
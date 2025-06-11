import React, { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserApi } from '~/apis'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

const AccountVerification = () => {
  // lấy giá trị email và token từ URL
  let [searchParams] = useSearchParams()
  // console.log('🚀 ~ AccountVerification.jsx:7 ~ AccountVerification ~ params:', searchParams)
  // const email = searchParams.get('email')
  // const token = searchParams.get('token')
  const { email, token } = Object.fromEntries([...searchParams])
  // console.log(email, token)
  // Tạo biến state để biết đã verify tài khoản hay chưa
  const [verified, setVerified] = useState(false)

  // Gọi api để verify tài khoản
  useEffect(() => {
    if ( email && token ) { verifyUserApi({ email, token }).then(() => setVerified(true)) }
  }, [email, token])
  // Nếu url có vấn đề, không tồn tại 1 trong 2 giá trị email hoặc token thì đá ra trang 404 luôn
  if ( !email || !token ) return <Navigate to='/404' />
  // Nếu chua verify xong thì hien loading
  if ( !verified ) return <PageLoadingSpinner caption='Verifying account ...' />
  // Cuối cùng nếu không gặp vấn đề gì + với verify thành công thì điều hướng về trang login cùng giá trị

  // verifiedEmail

  return <Navigate to={`/login?verifiedEmail=${email}`}/>
}

export default AccountVerification

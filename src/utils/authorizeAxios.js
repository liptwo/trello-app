import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './fomatters'

// Khởi tạo một đối tượng Axios
// (authorizedAxiosInstance) mục đích để custom và
// cấu hình chung cho dự án.
let authorizedAxiosInstance = axios.create()
// Thời gian chờ tối đa của 1 reqquest: đế 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
// withCredentials: Sẽ cho phép axios tự động gửi
// cookie trong moi request lên BE (phục vụ việc chúng
// ta sẽ lưu JWT tokens (refresh & access) vào trong
// httpOnly Cookie của trình duyệt)
authorizedAxiosInstance.defaults.withCredentials = false


/**
*Cầu hình Interceptors (Bộ đánh chặn vào giữa mọi Request & Response)
* https://axios-http.com/docs/interceptors
*/

// interceptor request can thiệp vào giữa các request api
authorizedAxiosInstance.interceptors.request.use( (config) => {
  // Do something before request is sent
  // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formater chứa function)
  interceptorLoadingElements(true)
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// interceptor response : can thiệp vào giữa cái respone nhận về
authorizedAxiosInstance.interceptors.response.use( (response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formater chứa function)
  interceptorLoadingElements(false)
  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formater chứa function)
  interceptorLoadingElements(false)

  // max http nằm ngoài 2xx thì sẽ lỗi và rơi vào đây

  // xử lý tập trung hiển thị thông báo lỗi trả về từ mọi api ở đây (viết code một lần: Code cleanl)
  // console.log error ra sẽ thấy cấu trúc data dẫn tới message lỗi như dưới đây

  console.log(error)
  let errorMessage =(error.response?.data?.message ? error.response?.data?.message : error?.message)

  // dùng toast để hiển thị  bất kể mọi mã lỗi lên màn hình -- ngoại trừ 410 Gone phục vụ việc fresh lại token
  if (error.respone?.status !== 410) {
    toast.error(errorMessage, { position: 'bottom-left' })
  }
  return Promise.reject(error)
})

export default authorizedAxiosInstance
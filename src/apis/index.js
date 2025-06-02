import axios from 'axios'
// import axiosApi from '~/utils/api'
import { API_ROOT } from '~/utils/constants'

// gọi request và lấy kết quả luôn chứ không try catch vì sẽ gây dư thừa code
// sẽ catch và bắt lỗi tập trung trong axios bằng Interceptors
export const fetchBoardDetailsAPI = async( boardId ) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // kết quả của axios sẽ nằm trong data
  // console.log(request.data)
  return request.data
}
import axios from 'axios'
// import axiosApi from '~/utils/api'
import { API_ROOT } from '~/utils/constants'

// gọi request và lấy kết quả luôn chứ không try catch vì sẽ gây dư thừa code
// sẽ catch và bắt lỗi tập trung trong axios bằng Interceptors
// Board
export const fetchBoardDetailsAPI = async( boardId ) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // kết quả của axios sẽ nằm trong data
  // console.log(request.data)
  return request.data
}

// Columns
export const createNewColumnAPI = async ( newColumnData ) => {
  const respone = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return respone.data
}

// Card
export const createNewCardAPI = async ( newCardData ) => {
  const respone = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return respone.data
}

export const updateBoardDetailsAPI = async( boardId, updateData ) => {
  // console.log(updateData)
  const request = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)

  // kết quả của axios sẽ nằm trong data
  // console.log(request.data)
  return request.data
}


export const moveCardOutColumnAPI = async( updateData ) => {
  console.log(updateData)
  const request = await axios.put(`${API_ROOT}/v1/boards/support/moving_card`, updateData)
  return request.data
}

export const updateColumnDetailsAPI = async( columnId, updateData ) => {
  // console.log(updateData)
  const request = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return request.data
}

export const deleteColumnDetailsAPI = async( columnId ) => {
  // console.log(updateData)
  const request = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return request.data
}


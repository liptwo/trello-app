import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { isEmpty } from 'lodash'
import _ from 'lodash'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceHolderCard } from '~/utils/fomatters'
import mapOrder from '~/utils/sort'


//createAsyncThunk là một hàm
// được cung cấp bởi thư viện Redux
// Toolkit (RTK), dùng để xử lý
//  logic bất đồng bộ (async) trong Redux — ví dụ
// như gọi API. Nó giúp đơn giản hóa việc tạo ra thunk
// (một hàm trả về một hàm khác) và tự động tạo ra các action
// tương ứng với từng trạng thái của quá trình
//  bất đồng bộ: pending, fulfilled, và rejected.
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async( boardId ) => {
    const respone = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
    return respone.data
  }
)

// khởi tạo slice trong kho lưu trữ redux
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  // khoi tao gia tri slice trong redex
  initialState: {
    currentActiveBoard: null
  },
  // Nơi xử lý dữ liệu đồng bộ  ở reducers
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu ở reducer,
      // ở đây chúng ta gắn cho nó 1 biến có nghĩa hơn là fullBoard
      const board = action.payload

      // xử lý dữ liệu nếu cần thiết

      // update lại dữ liệu currentActiveBoard
      state.currentActiveBoard = board
    },
    updateCardInBoard: (state, action) => {
      // nested data
      const incommingCard = action.payload

      // tìm kiếm column chứa card này
      const column = state.currentActiveBoard.columns.find(
        i => i._id === incommingCard.columnId)
      if ( column ) {
        const card = column.cards.find(i => i._id === incommingCard._id)
        if ( card ) {
          // cập nhật card
          // cách 1
          // card.title = incommingCard.title
          // cách 2
          Object.assign(card, incommingCard) // sẽ cập nhật tất cả các thuộc tính của card
          // cách 3: dùng lodash để loại bỏ những thuộc tính không mong muốn
          // Object.assign(card, _.omit(incommingCard, ['_id'])) // omit để loại bỏ thuộc tính không mong muốn
          // Cách 4: dùng vòng lặp forEach để cập nhật từng thuộc tính
          // Object.keys(incommingCard).forEach(key => {
          //   if (key !== '_id') {
          //     card[key] = incommingCard[key]
          //   }
          // })
        }
      }
    },
    updateDetailsBoard: (state, action) => {
      const newDetailBoard = action.payload
      if (!state.currentActiveBoard) return
      Object.assign(state.currentActiveBoard, newDetailBoard)
    }
  },
  // extraReducer nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload

      board.FE_allUser = board.owners.concat(board.members)
      // xử lý dữ liệu nếu cần thiết
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
      board.columns.forEach(column => {
        if ( isEmpty(column.cards) ) {
          column.cards = [generatePlaceHolderCard(column)]
          column.cardOrderIds = [generatePlaceHolderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      // update lại dữ liệu currentActiveBoard
      state.currentActiveBoard = board
    })
  }
})


// Action creators are generated for each case reducer function
// Actions: Là nơi dành cho các components bên dưới gọi bằng dispa ch() tới nó để cập nhật lại dữ liệu
// thông qua reducer (chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được
//thang redux tạo tự động theo tên cua reducer nhé.
export const { updateCurrentActiveBoard, updateCardInBoard, updateDetailsBoard } = activeBoardSlice.actions
// Selectors: Là nơi dành cho các components bên dưới gọi bằng hook useselector() để lấy dữ liệu từ trong
// kho redux store ra sử dụng
export const selectCurrentActiveBoard = ( state ) => {
  return state.activeBoard.currentActiveBoard
}
// dù tên là activeBoardSlice nhưng phải lấy reducer mới đúng !!! lưu ý
export const activeBoardReducer = activeBoardSlice.reducer
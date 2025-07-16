import { createSlice } from '@reduxjs/toolkit'

import { API_ROOT } from '~/utils/constants'

// khởi tạo slice trong kho lưu trữ redux
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState: {
    currentActiveCard: null,
    isShowActiveCard: false
  },
  reducers: {
    showActiveCard: (state) => {
      state.isShowActiveCard = true
    },

    clearAndHideActiveCard: (state) => {
      state.currentActiveCard = null
      state.isShowActiveCard = false
    },

    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    },
    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload

      state.currentActiveCard = fullCard
    }
  },
  // extraReducer nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {}
})

export const {
  clearCurrentActiveCard,
  updateCurrentActiveCard,
  clearAndHideActiveCard,
  showActiveCard
} = activeCardSlice.actions

export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

export const selectIsShowActiveCard = (state) => {
  return state.activeCard.isShowActiveCard
}

export const activeCardReducer = activeCardSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'

import { API_ROOT } from '~/utils/constants'

export const fecthInvitationsAPI = createAsyncThunk(
  'notifications/fecthInvitationsAPI',
  async () => {
    const respone = await authorizedAxiosInstance.get(
      `${API_ROOT}/v1/invitations`
    )
    // axios trả về qua data
    return respone.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ invitationId, status }) => {
    const respone = await authorizedAxiosInstance.put(
      `${API_ROOT}/v1/invitations/board/${invitationId}`,
      { status }
    )
    return respone.data
  }
)

export const activeNotificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    currentNotifications: null
  },

  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    addNotifications: (state, action) => {
      const imcomingInvi = action.payload
      state.currentNotifications.unshift(imcomingInvi)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fecthInvitationsAPI.fulfilled, (state, action) => {
      const incommingNotifications = action.payload
      state.currentNotifications = Array.isArray(incommingNotifications)
        ? incommingNotifications.reverse()
        : []
    })

    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incommingNotification = action.payload

      const getInvitation = state.currentNotifications.find(
        (i) => i._id === incommingNotification._id
      )
      getInvitation.boardInvitation = incommingNotification.boardInvitation
    })
  }
})

export const {
  clearCurrentNotifications,
  updateCurrentNotifications,
  addNotifications
} = activeNotificationsSlice.actions
// Selectors: Là nơi dành cho các components bên dưới gọi bằng hook useselector() để lấy dữ liệu từ trong
// kho redux store ra sử dụng
export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}
// dù tên là activeBoardSlice nhưng phải lấy reducer mới đúng !!! lưu ý
export const activeNotificationsReducer = activeNotificationsSlice.reducer

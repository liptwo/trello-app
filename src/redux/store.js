import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'

// * Cầu hình redux-persist
// * https://www.npmjs.com/package/redux-persist
// * Bài viết hướng dẫn này dễ hiểu hơn:
// * https://edvins.io/how-to-use-redux-persist-with-redux-toolkit
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { activeCardReducer } from './activeCard/activeCardSlice'

// Cấu hình persist
const rootPersistConfig = {
  key: 'root', // key của cái persist do chúng ta chỉ định, cứ để mặc định là root
  storage: storage, // Biên storage ở trên - lưu vào localstorage
  whitelist: ['user'] // định nghĩa các slice dữ liệu ĐƯỢC PHÉP duy trì qua mỗi lần f5 trình duyệt
  // blacklist: ['user' ] // định nghĩa các slice KHÔNG ĐƯỢC PHÉP duy trì qua mỗi lần f5 trình duyệt
}


// Combine các reducers trong dự án của chúng ta ở đây
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer,
  activeCard: activeCardReducer
})

// thực hiện persist reducers
const persistedReducer = persistReducer(rootPersistConfig, reducers)
export const store = configureStore({
  reducer: persistedReducer,
  // Fix warning error when implement redux-persist
  // https://stackoverflow.com/a/63244831/8324172
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})


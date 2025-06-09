import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'

function App() {
  return (
    <Routes>
      // redireact route
      <Route path='/' element={
        // Ở đây cần replace giá trị true để nó thay thế route /, có thể hiểu là route / sẽ không còn nằm
        // trong history của Browser
        // Thực hành dễ hiểu hơn bằng cách nhân Go Home từ trang 404 xong thử quay lại bằng nút back của trình
        // duyệt giữa 2 trường hợp có replace hoặc không có.
        <Navigate to={'/boards/683f14b3bd5db6a299b0828a'}
          replace={true}
        />
      } />

      // board detail
      <Route path='/boards/:boardId' element={ <Board/> }/>

      <Route path='/login' element={ <Auth /> }/>
      <Route path='/register' element={ <Auth /> }/>
      // 404 not found page
      <Route path='*' element={ <NotFound/>}/>
    </Routes>
  )
}

export default App

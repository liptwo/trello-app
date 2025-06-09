import { Box, CircularProgress, Container, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/Mock-data'
import { useEffect } from 'react'
import {
  moveCardOutColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { cloneDeep } from 'lodash'
import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const Board = () => {

  const dispatch = useDispatch()
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)
  const { boardId } = useParams()
  useEffect( () => {
    // call api
    dispatch( fetchBoardDetailsAPI(boardId) )
  }, [dispatch, boardId])

  // xu ly keo tha goi api cap nhap lai vi tri column
  const moveColumns = ( dndOrderedColumns ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    /**
    * Trường hợp dùng Spread Operator này thì lại không sao bởi vì ở đây chúng ta không dùng push như ở trên
    làm thay đổi trực tiếp kiểu mở rộng mảng, mà chỉ đang gán lại toàn bộ giá trị columns và columnOrderIds
    bằng 2 mảng mới. Tương tự như cách làm concat ở trường hợp createNewColumn thôi :) )
    */

    // làm mượt giao diện
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))

    //gọi api update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }
  // goi api cap nhap vi tri cards trong cung 1 column chi can cap nhap lai
  // cardOrderIds la oke la
  const moveCardsInColumn = ( dndOrderedCards, dedOrderedCardIds, columnId ) => {
    // update chuan state board
    // const newBoard = { ...board }

    // cannot assign to read only property 'cards' of object
    // trường hợp này Immutability ở đây đụng tới giá trị card đang được coi là chỉ đọc read only
    // dạng nested object - can thiệp sâu dữ liệu
    const newBoard = cloneDeep(board)
    const columnToAdd = newBoard.columns.find(column => column._id === columnId)

    if (columnToAdd) {
      columnToAdd.cards = dndOrderedCards
      columnToAdd.cardOrderIds = dedOrderedCardIds
    }
    // console.log('columnToAdd', columnToAdd)
    dispatch(updateCurrentActiveBoard(newBoard))
    //gọi api update column
    updateColumnDetailsAPI( columnId, { cardOrderIds: dedOrderedCardIds })
  }
  // * Khi di chuyển card sang Column khác:
  // * B1: Cập nhật mằng cardOrderIds của Column ban đầu chứa nó (Hiểu bản chất là xóa cái id của Card ra khoir
  // mằng)
  // * B2: Cập nhật mảng cardOrderIds của Column tiếp theo (Hiểu bản chất là thêm _id của Card vào mằng)
  // * B3: Cập nhật lại trường columnId mới của cái Card đã kéo
  // * => Làm một API support riêng.
  // update chuan state board
  const moveCardsOutColumn = ( currentCardId, prevColumnId, nextColumnId, dndOrderedColumns ) => {
    // console.log('currentCardId: ', currentCardId)
    // console.log('prevColumnId: ', prevColumnId)
    // console.log('nextColumnId: ', nextColumnId)
    // console.log('dndOrderedColumn: ', dndOrderedColumns)

    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    // làm mượt giao diện
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))

    let preCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    // console.log(preCardOrderIds)
    // xử lý vấn đề khi kéo card cuối cùng ra khỏi column
    // có placeholder cần xóa nó đi trước khi gửi dữ liệu lên be
    if (preCardOrderIds[0].includes('placeholder-card')) { preCardOrderIds = []}
    // goi api xu ly phia be
    moveCardOutColumnAPI({
      currentCardId,
      prevColumnId,
      preCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }


  // console.log(board)
  if (!board) {
    return <Box sx={{ display:'flex', gap:2, width:'100vw', height:'100vh', fontSize:20, alignItems:'center', justifyContent:'center' }}>
      <CircularProgress />
      <Typography>Loading board ...</Typography>
    </Box>
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={ board } />
      <BoardContent
        board={board}

        // createdNewColumn={createdNewColumn}
        // createdNewCard={createdNewCard}
        // deleteColumnDetails={deleteColumnDetails}

        moveColumns={moveColumns}
        moveCardsInColumn={moveCardsInColumn}
        moveCardsOutColumn={moveCardsOutColumn}
      />
    </Container>
  )
}

export default Board

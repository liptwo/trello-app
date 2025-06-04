import { Box, CircularProgress, Container, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/Mock-data'
import { useEffect, useState } from 'react'
import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailsAPI,
  moveCardOutColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { isEmpty } from 'lodash'
import { generatePlaceHolderCard } from '~/utils/fomatters'
import mapOrder from '~/utils/sort'

const Board = () => {

  const [board, setBoard] = useState(null)

  useEffect( () => {
    const boardId = '683f14b3bd5db6a299b0828a'
    // call api
    fetchBoardDetailsAPI( boardId ).then((board) => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(column => {
        if ( isEmpty(column.cards) ) {
          column.cards = [generatePlaceHolderCard(column)]
          column.cardOrderIds = [generatePlaceHolderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  // gọi API
  const createdNewColumn = async ( newColumnData ) => {
    const newColumn = {
      ...newColumnData,
      boardId: board._id
    }
    const createdColumn = await createNewColumnAPI( newColumn )
    // console.log('createdColumn:', createdColumn)
    createdColumn.cards = [generatePlaceHolderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceHolderCard(createdColumn)._id]
    // update state board
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }
  // api tao moi card
  const createdNewCard = async( newCardData ) => {
    const newCard = { ...newCardData, boardId: board._id }
    const createCard = await createNewCardAPI(newCard)
    // console.log('createdCard: ', createCard)

    const newBoard = { ...board }
    const columnToAdd = newBoard.columns.find(column => column._id === createCard.columnId)

    if (columnToAdd) {
      columnToAdd.cards.push(createCard)
      columnToAdd.cardOrderIds.push(createCard._id)
    }
    // console.log('columnToAdd', columnToAdd)
    setBoard(newBoard)
  }
  // xu ly keo tha goi api cap nhap lai vi tri column
  const moveColumns = ( dndOrderedColumns ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    // làm mượt giao diện
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    //gọi api update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }
  // goi api cap nhap vi tri cards trong cung 1 column chi can cap nhap lai
  // cardOrderIds la oke la
  const moveCardsInColumn = ( dndOrderedCards, dedOrderedCardIds, columnId ) => {
    // update chuan state board
    const newBoard = { ...board }
    const columnToAdd = newBoard.columns.find(column => column._id === columnId)

    if (columnToAdd) {
      columnToAdd.cards = dndOrderedCards
      columnToAdd.cardOrderIds = dedOrderedCardIds
    }
    // console.log('columnToAdd', columnToAdd)
    setBoard(newBoard)
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
    setBoard(newBoard)

    // goi api xu ly phia be
    moveCardOutColumnAPI({
      currentCardId,
      prevColumnId,
      preCardOrderIds: dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  // console.log(board)
  if (!board) {
    return <Box sx={{ display:'flex', width:'100vw', height:'100vh', fontSize:20, alignItems:'center', justifyContent:'center' }}>
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
        createdNewColumn={createdNewColumn}
        createdNewCard={createdNewCard}
        moveColumns={moveColumns}
        moveCardsInColumn={moveCardsInColumn}
        moveCardsOutColumn={moveCardsOutColumn}
      />
    </Container>
  )
}

export default Board

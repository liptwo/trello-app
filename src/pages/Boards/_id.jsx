import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/Mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'

const Board = () => {

  const [board, setBoard] = useState(null)

  useEffect( () => {
    const boardId = '683978cd82c3e3c993986359'
    // call api
    fetchBoardDetailsAPI( boardId ).then((board) => {
      setBoard(board)
    })
  }, [])
  // console.log(board)
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={ board } />
      <BoardContent board={ board } />
    </Container>
  )
}

export default Board

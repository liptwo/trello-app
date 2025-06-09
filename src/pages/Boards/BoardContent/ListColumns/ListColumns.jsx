import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { generatePlaceHolderCard } from '~/utils/fomatters'
import { createNewColumnAPI } from '~/apis'
import { cloneDeep } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
// import { createNewColumnAPI } from '~/apis'

const ListColumns = ({ columns }) => {

  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const [titleColumn, setTitleColumn] = useState('')

  const addNewColumn = async () => {
    if ( !titleColumn ) {
      toast.error('Please enter title Column!')
      return
    }
    if ( titleColumn.length > 30) {
      toast.error('quá 30 kí tự rồi anh bạn à')
      return
    }
    // goji api o day
    const newColumnData = {
      title: titleColumn
    }

    // createdNewColumn( newColumnData )
    const newColumn = {
      ...newColumnData,
      boardId: board._id
    }
    const createdColumn = await createNewColumnAPI( newColumn )
    // console.log('createdColumn:', createdColumn)
    createdColumn.cards = [generatePlaceHolderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceHolderCard(createdColumn)._id]
    // update state board
    // const newBoard = { ...board } bị lỗi vì push cập nhập trực tiếp với shallow copy
    // cách 1
    /**
    * Đoạn này sẽ dính lồi object is not extensible bởi dù đã copy/clone ra giá trị newBoard nhưng bản chât
    của spread operator là Shallow Copy/Clone, nên dính phải rules Immutability trong Redux Toolkit không
    dùng được hàm PUSH (sửa giá trị mảng trực tiếp), cách đơn giản nhanh gọn nhất ở trường hợp này của chúng
    ta là dùng tới Deep Copy/Clone toàn bộ cái Board cho dễ hiểu và code ngắn gọn.
    * https://redux-toolkit.js.org/usage/immer-reducers
    * Tài liệu thêm về Shallow và Deep Copy Object trong JS:
    * https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/
    */
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)

    // cách 2
    /**
    * Ngoài ra cách nữa là vẫn có thể dùng array. concat thay cho push như docs của Redux Toolkit ở trên vì
    push như đã nói nó sẽ thay đổi giá trị mảng trực tiếp, còn thằng concat thì nó merge - ghép mảng lại và
    tạo ra một mảng mới để chúng ta gán lại giá trị nên không vân đề gì.
    */
    // const newBoard = { ... board }
    // newBoard.columns = newBoard.columns.concat([createdColumn])
    // newBoard.columnOrderIds = newBoard.columnOrderIds.concat([createdColumn ._id])

    // setBoard(setBoard)
    dispatch(updateCurrentActiveBoard(newBoard))
    // close state
    toggleOpenNewColumnForm()
    setTitleColumn('')
  }

  return (
    <SortableContext
      items={columns?.map(c => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box sx={{
        bgcolor:'inhenrit',
        display: 'flex',
        overflowX:'auto',
        overflowY:'hidden',
        width:'100%',
        height:'100%',
        '&::-webkit-scrollbar-track':{ m:2 }
      }}>
        {columns?.map(column => <Column key={column._id} column={ column }/>)}
        {/* box add new column */}
        {!openNewColumnForm ? (
          <Box
            sx={{
              color:'white',
              minWidth:'250px',
              maxWidth:'250px',
              height:'fit-content',
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#3d7ea3' : '#3d99ce'),
              mx:2,
              borderRadius:'6px'
            }}>
            <Button startIcon={<AddIcon />}
              onClick={toggleOpenNewColumnForm}
              sx={{
                color:'white',
                width: '100%',
                justifyContent:'flex',
                '&:hover': { backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#33779d' : '#3394cc') },
                py:1
              }}>
              Add New Column
            </Button>
          </Box>
        ) : (
          <Box sx={{
            color:'black',
            minWidth:'250px',
            maxWidth:'250px',
            height:'fit-content',
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333743' : 'white'),
            mx:2,
            borderRadius:'6px'
          }}>
            <TextField
              placeholder="Enter column title ... "
              autoFocus
              variant="outlined"
              type="text"
              size="small"
              value={titleColumn}
              inputProps={{ style: { fontSize: 12 } }}
              onChange={(e) => setTitleColumn(e.target.value)}
              sx={ {
                backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#3b434b': 'white'),
                m:1,
                display:'flex',
                // '& label':{ color: 'black' },
                // '& input':{ color: 'black' },
                '& label.Mui-focused':{ color: '#9bc4ff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor:'#8590a2'
                  },
                  '&:hover fieldset':{ borderColor:'#8590a2' },
                  '&.Mui-focused fieldset':{ borderColor:'#9bc4ff' }
                }
              } }
            />
            <Box sx={{ display: 'flex', alignItems:'center' }}>
              <Button
                className='interceptor-loading'
                onClick={addNewColumn}
                variant='contained'
                size='small'
                sx={{
                  color:(theme) => (theme.palette.mode === 'dark' ? 'black': 'white' ),
                  m:1,
                  fontSize: 12,
                  justifyContent:'flex',
                  backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#579dfd': '#0c65e4' ),
                  '&:hover': { backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#76afff' : '#0055cc') }
                }}>
                Save
              </Button>
              <Box onClick={toggleOpenNewColumnForm} sx={{
                p:'6px',
                borderRadius:1,
                display:'flex',
                '&:hover': { backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#6d7780' : '#d0d4db') }
              }}>
                <CloseIcon sx={{
                  color:(theme) => (theme.palette.mode === 'dark' ? 'white': 'black' ),
                  fontSize:20
                }}/>
              </Box>
            </Box>
          </Box>
        )}

      </Box>
    </SortableContext>
  )
}

export default ListColumns

import { Box, Tooltip } from '@mui/material'
import React from 'react'
import WallpaperIcon from '@mui/icons-material/Wallpaper'
import VisuallyHiddenInput from '../Form/VisuallyHiddenInput'
import { singleFileValidator } from '~/utils/validators'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { updateBoardDetailsAPI } from '~/apis'
import { useLocation } from 'react-router-dom'
import { updateDetailsBoard } from '~/redux/activeBoard/activeBoardSlice'
const ChangeBgBoard = ({ color }) => {

  const dispatch = useDispatch()
  const location = useLocation()
  const boardId = location.pathname.split('/')

  const callApiUpdateBoard = async (updateData) => {
    const updateCard = await updateBoardDetailsAPI(boardId[2], updateData)
    // b2: cập nhật lại card trong redux ( nested data)
    dispatch(updateDetailsBoard(updateCard.value))
  }
  const handleChangeBoardBg = (event) => {
    console.log(event.target?.files[0])
    const error = singleFileValidator(event.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }
    let reqData = new FormData()
    reqData.append('boardBg', event.target?.files[0])
    toast.promise(callApiUpdateBoard(reqData).finally(() => { event.target.value = '' }), { pending: 'Uploading...' })
  }


  return (
    <Tooltip title='Change Background Image'>
      <Box
        sx={{
          ...(color ? { backgroundColor: color } : { backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1d2125' : '#1565c0') }),
          display: 'flex',
          padding: '10px',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          xs: { display: 'hidden' },
          cursor: 'pointer'
        }}
        component="label"
      >
        <WallpaperIcon fontSize='small' sx={{ color: 'white' }} />
        <VisuallyHiddenInput type="file" onChange={handleChangeBoardBg} />
      </Box>
    </Tooltip>
  )
}

export default ChangeBgBoard

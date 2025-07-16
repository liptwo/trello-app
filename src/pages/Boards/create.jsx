// board list 

import { Box, Container, Divider, FormControlLabel, FormLabel, InputAdornment, InputLabel, MenuItem, Modal, Pagination, PaginationItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AppBar from '~/components/AppBar/AppBar'
import { styled } from '@mui/material/styles'
import { Link, useLocation } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'
import randomColor from 'randomcolor'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Controller, useForm } from 'react-hook-form'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Alert/Alert'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import AbcIcon from '@mui/icons-material/Abc'
import DescriptionIcon from '@mui/icons-material/Description'
import { createBoard } from '~/apis'
import { toast } from 'react-toastify'


const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}))

const BOARD_TYPE = {
  PUBLIC: 'public',
  PRIVATE: 'private',
}

const SidebarCreateModal = ({ handleAfterCreateBoards }) => {
  const {control, register, handleSubmit, reset, formState: { errors }} = useForm({})
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => {
    setIsOpen(false)
    reset()
  }

  const submitCreateBoard = async (data) => {
    const {title, description, type} = data
    console.log('Create board with data: ', {title, description, type})
    const newBoard = await createBoard({title, description, type}).then( toast.success('Created Board Success'))
    
    if (newBoard) {
      handleAfterCreateBoards(newBoard)
      reset()
      setIsOpen(false)
    }

  } 
  return (
    <>
      <SidebarItem onClick={handleOpen}>
        <AddBoxIcon fontSize='small'/>
        Create New Board
      </SidebarItem>

      <Modal
        open={isOpen} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '60%' },
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
          padding: '20px 30px',
          outline: 'none',
          borderRadius: 2,
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#547792':'white')
        }}>
          
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Board
          </Typography>
          
          <form onSubmit={handleSubmit(submitCreateBoard)}>
            <Box>
              <TextField
                fullWidth
                label="Board Title"
                type="text"
                variant="outlined"
                {...register('title', { required: FIELD_REQUIRED_MESSAGE, minLength: {value: 3, message: 'Title must be at least 3 characters long'},
                maxLength: {value: 50, message: 'Title must be at most 50 characters long'}})}
                error={!!errors['title']}
                sx={{ mt: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AbcIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
              <FieldErrorAlert errors={errors} fieldName={'title'}/>
            </Box>
            <Box>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                label="Description"
                {...register('description', { required: FIELD_REQUIRED_MESSAGE, minLength: {value: 3, message: 'Description must be at least 3 characters long'},
                maxLength: {value: 50, message: 'Description must be at most 50 characters long'}})}
                sx={{ mt: 2 }}
                error={!!errors['description']}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon ptionIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
              <FieldErrorAlert errors={errors} fieldName={'description'}/>
            </Box>
            <Controller 
              name="type"
              control={control}
              defaultValue={BOARD_TYPE.PRIVATE}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field }) => (
                <RadioGroup
                  row
                  sx={{ mt: 2 }}
                  defaultValue={BOARD_TYPE.PUBLIC}
                  onChange={(e, value) => {  field.onChange(value) }}
                  {...field}
                  value={field.value}
                  name="radio-buttons-group"
                >
                  <FormControlLabel value={BOARD_TYPE.PUBLIC} control={<Radio size='small' />} label="Public" labelPlacement='start'/>
                  <FormControlLabel value={BOARD_TYPE.PRIVATE} control={<Radio size='small' />} label="Private" labelPlacement='start'/>
                  <FieldErrorAlert errors={errors} fieldName={'type'}/>
                </RadioGroup>
              )
              }
            >
              {/* <FormLabel id="demo-radio-buttons-group-label">Board Type</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value={BOARD_TYPE.PUBLIC} control={<Radio />} label="Public" />
                  <FormControlLabel value={BOARD_TYPE.PRIVATE} control={<Radio />} label="Private" />
                </RadioGroup> */}
            </Controller>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Create Board
            </Button>
          </form>

          <Button onClick={handleClose} startIcon={<ArrowBackIcon />} sx={{ mt: 2}}></Button>

        </Box>
      </Modal>

    </>
  )
}

export default SidebarCreateModal
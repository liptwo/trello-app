import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined'

import ToggleHeadInput from '~/components/Form/ToggleHeadInput'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import { singleFileValidator } from '~/utils/validators'
import { toast } from 'react-toastify'
import CardUserGroup from './CardUserGroup'
import CardActivitySection from './CardActivitySection'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import { styled } from '@mui/material/styles'
import { Box, Divider, Grid, Modal, Skeleton, Stack, Typography } from '@mui/material'
// import cover from '~/assets/cover.png'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import CardDescriptionMdEditor from './CardDecriptionMdEditor'
import CancelIcon from '@mui/icons-material/Cancel'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { clearAndHideActiveCard, selectCurrentActiveCard, selectIsShowActiveCard, updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import { updateCardDetailsAPI } from '~/apis'
import { updateCardInBoard } from '~/redux/activeBoard/activeBoardSlice'
import pickDominantColor from '~/utils/pickDominantColor'
import { useEffect, useState } from 'react'


const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  color: theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
  backgroundColor: theme.palette.mode === 'dark' ? '#2f3542' : '#091e420f',
  padding: '10px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[100]
    }
  }
}))


const ActiveCard = () => {
  // const [isOpen, setIsOpen] = useState(true)
  // const handleOpenModal = () => setIsOpen(true)
  const dispatch = useDispatch()
  // dùng board_id.jsx để kiểm tra
  const handleCloseModal = () => {
    dispatch(clearAndHideActiveCard())
  }
  const activeCard = useSelector(selectCurrentActiveCard)
  const [bgColor, setBgColor] = useState(activeCard?.domicantColor)
  const isShowActiveCard = useSelector(selectIsShowActiveCard)

  // chuyển cảnh mượt hơn
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isShowActiveCard) {
      setTimeout(() => setVisible(true), 50) // delay nhỏ để kích hoạt hiệu ứng
    } else {
      setVisible(false)
    }
  }, [isShowActiveCard])

  useEffect(() => {
    if (activeCard?.cover) {
      pickDominantColor(activeCard.cover).then(setBgColor)
    }
  }, [activeCard?.cover])
  // function gọi api dùng chung cho các trường hợp update card
  const callApiUpdateCard = async (updateData) => {
    // console.log('callApiUpdateCard: ', cardId, data)
    // gọi api update card
    // console.log('callApiUpdateCard: ', card, updateData)
    const updateCard = await updateCardDetailsAPI(activeCard._id, updateData)
    // console.log('updateCard: ', updateCard)
    // b1: cập nhập lại cái card đang active trong modal hiện tại
    dispatch(updateCurrentActiveCard(updateCard))
    // b2: cập nhật lại card trong redux ( nested data)
    dispatch(updateCardInBoard(updateCard))
  }

  const onUpdateCardTitle = (newTitle) => {
    if ( activeCard ) {
      callApiUpdateCard({ title: newTitle.trim() })
    }
  }

  const onUploadCardCover = (event) => {
    // console.log(event.target?.files[0])
    const error = singleFileValidator(event.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }
    let reqData = new FormData()
    reqData.append('cover', event.target?.files[0])
    toast.promise(callApiUpdateCard(reqData).finally(() => { event.target.value = '' }), { pending: 'Uploading...' })
  }

  const onUpdateDescription = (newDescription) => {
    // console.log('newDescription: ', newDescription)
    callApiUpdateCard({ description: newDescription })
  }

  const onAddCardConmment = async (commentToAdd) => {
    await callApiUpdateCard({ commentToAdd })
  }
  return (
    <Modal
      disableScrollLock
      open={isShowActiveCard}
      onClose={handleCloseModal}
      sx={{ overflowY: 'auto' }}
    >
      <Box
        sx={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.98)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          width: 900,
          maxWidth: {
            xs: '100%',
            sm: '90%',
            md: '80%',
            lg: '70%'
          },
          bgcolor: 'white',
          boxShadow: 24,
          borderRadius: '8px',
          border: 'none',
          outline: 0,
          padding: '40px 20px 20px',
          margin: '50px auto',
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
        }}>
        <Box sx={{
          position: 'absolute',
          top: '12px',
          right: '10px',
          cursor: 'pointer'
        }}>
          <CancelIcon color='error' sx={{ '&:hover':{ color: 'error.light' } }}
            onClick={handleCloseModal}/>
        </Box>
        {/* <Box sx={{
          ...(activeCard?.cover ? { height: '330px' }: { height:'0px', display:'none' })
        }}> */}
        { activeCard?.cover && (
          <Box sx={{ mb: 4, backgroundColor: `${ bgColor }`, borderRadius: '6px', transition: 'background-color 1s ease' }}>
            <img
              style={{
                width: '100%',
                maxHeight: '300px', // hoặc giá trị bạn muốn
                borderRadius: '6px',
                objectFit: 'contain'
              }}
              src={activeCard.cover}
              alt='activeCard-cover'
            />
          </Box>
        )
        }
        {/* </Box> */}
        <Box sx={{ my: 2, mt: -3, pr: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CreditCardIcon fontSize='large'/>

          {/* Feature 01: Xử lý tiêu đề của Card */}
          <ToggleHeadInput
            headTitle={activeCard?.title}
            inputFontSize='2rem'
            onChangedValue={onUpdateCardTitle}
            helperText='Tối đa 30 kí tự'
          />
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {/* Left side */}
          <Box sx={{ flex: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontheight: '600', color: 'primary.main', mb: 1 }}>Members</Typography>

              {/* Feature 02: Xử lý các thành viên của Card */}
              <CardUserGroup boardUser={activeCard?.FE_allUser} />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', position:'absolute', alignItems: 'center', gap: 1.5 }}>
                <SubjectRoundedIcon />
                <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}
                >Description</Typography>
              </Box>

              {/* Feature 3: Xử lý mô tà của Card */}
              <CardDescriptionMdEditor description={activeCard?.description} onUpdateDescription={onUpdateDescription} />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <DvrOutlinedIcon />
                <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}
                >Activity</Typography>
              </Box>

              {/* Feature 4: Xử lý hành động, ví dụ bình luận */}
              <CardActivitySection
                cardComments={activeCard?.comments}
                handleAddComments={onAddCardConmment}
              />
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            {/* <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}> */}
            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Add To Card
            </Typography>
            <Stack spacing={1} sx={{ width: '100%' }}>
              {/* Feature 05: Xử lý hành động bản thân user tự join vào card */}
              <SidebarItem className="active"> <PersonOutlineOutlinedIcon fontSize="small" /> Join</SidebarItem>
              {/* Feature 06: Xử lý hành động cập nhật ảnh Cover của Card */}
              <SidebarItem className="active" component="label">
                <PhotoOutlinedIcon fontSize="small" />
                Cover
                <VisuallyHiddenInput className='hello' type="file" onChange={onUploadCardCover} />
              </SidebarItem>

              <SidebarItem><AttachFileOutlinedIcon fontSize="small" />Attachment</SidebarItem>
              <SidebarItem><LocalOfferOutlinedIcon fontSize="small" />Labels</SidebarItem>
              <SidebarItem><TaskAltOutlinedIcon fontSize="small" />Checklist</SidebarItem>
              <SidebarItem><WatchLaterOutlinedIcon fontSize="small" />Dates</SidebarItem>
              <SidebarItem><AutoFixHighOutlinedIcon fontSize="small" />Custom Fields</SidebarItem>
            </Stack>
            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Power-Ups</Typography>
            <Stack direction="column" spacing={1}>
              <SidebarItem><AspectRatioOutlinedIcon fontSize="small" />Card Size</SidebarItem>
              <SidebarItem><AddToDriveOutlinedIcon fontSize="small" />Google Drive</SidebarItem>
              <SidebarItem><AddOutlinedIcon fontSize="small" />Add Power-Ups</SidebarItem>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Actions</Typography>
            <Stack direction="column" spacing={1}>
              <SidebarItem><ArrowForwardOutlinedIcon fontSize="small" />Move</SidebarItem>
              <SidebarItem><ContentCopyOutlinedIcon fontSize="small" />Copy</SidebarItem>
              <SidebarItem><AutoAwesomeOutlinedIcon fontSize="small" />Make Template</SidebarItem>
              <SidebarItem><ArchiveOutlinedIcon fontSize="small" />Archive</SidebarItem>
              <SidebarItem><ShareOutlinedIcon fontSize="small" />Share</SidebarItem>
            </Stack>
            {/* </Box> */}
          </Box>
        </Stack>
      </Box>

    </Modal>
  )

}
export default ActiveCard
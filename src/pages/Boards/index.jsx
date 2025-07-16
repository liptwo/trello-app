// board list 

import { Avatar, Box, Container, Divider, Pagination, PaginationItem, Stack } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

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
import SidebarCreateModal from './create'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { green } from '@mui/material/colors'
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '~/utils/constants'
import { fetchBoardsApi } from '~/apis'
// import { updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'

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

const Boards = () => {
  const [boards, setBoards] = useState(null)
  const currentUser = useSelector(selectCurrentUser)
  const [totalBoards, setTotalBoards] = useState(null)
  // const refCardHover = useRef(null)
  // xử lí phân trang
  const location = useLocation()
  // const dispatch = useDispatch()
  const updateStateBoard = (res) => {
    setBoards(res.boards || [])
    setTotalBoards(res.totalBoards || 0)
  }
  const query = new URLSearchParams(location.search)

  // lấy giá trị page từ query, default sẽ là 1 nếu không tồn tại page từ url
  const page = parseInt( query.get('page') || '1', 10)

  useEffect(() => {
    // //fake tạm 16 board
    // setBoards([...Array(16)].map((_, i) => i))
    // //fake tổng số board
    // setTotalBoards()
    // dispatch(updateCurrentActiveBoard(null))
    // gọi api
    fetchBoardsApi(location.search).then(updateStateBoard)
  }, [location.search])

  const handleAfterCreateBoards = (data) => {
    setBoards(
      [...boards, data].sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      )
    )
    setTotalBoards(totalBoards+1)
  }

  if (!boards) return <PageLoadingSpinner caption='Loading Board List ...' />

  return (
    <Container disableGutters maxWidth={false} sx={{backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#004065' : 'white'), height: '100vh', overflowY: 'auto'}}>
      <AppBar />
      <Box sx={{ paddingX: 6, my:6}}>
        <Grid container spacing={4} >

          <Grid sx={{mt:4}} size={{ xs: 12, md: 3 }}>
            <Stack direction='column' spacing={1}>
              <SidebarItem className='active'>
                <SpaceDashboardIcon fontSize='small'/>
                Boards
              </SidebarItem>
              <SidebarItem >
                <ListAltIcon fontSize='small'/>
                Templates
              </SidebarItem>
              <SidebarItem >
                <HomeIcon fontSize='small'/>
                Home
              </SidebarItem>


            </Stack>
            <Divider sx={{my:1}}/>
            <SidebarCreateModal handleAfterCreateBoards={handleAfterCreateBoards} />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Box sx={{ display:'flex', alignItems:'center', gap:2, mb:3, ml:2 }}>
              <Avatar sx={{ bgcolor: green[500], width: 56, height: 56 }} alt={currentUser.displayName} src={currentUser.avatar} variant="rounded" />
              <Box sx={{ display:'flex', alignItems:'flex-start', justifyContent:'flex-start', flexDirection:'column', gap:0.5 }}>
                <Typography variant='h5' sx={{fontWeight:'bold'}}>
                  Trello Workspace
                </Typography>
                <Typography variant='span' sx={{fontWeight:'bold', ml:'4px', color:'text.secondary'}}>
                  {currentUser.displayName}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my:1 }}/>
            <Box sx={{ ml:2, mt:3, mb:6, display:'flex', flexDirection:'column', gap:2 }}>
              <Typography variant='h5' sx={{ fontWeight:'bold', mb:1 }}>
                Yours Board:
              </Typography>

              { totalBoards <= 0 && <Typography variant='span' sx={{fontWeight:'bold', mb:3}}>
                No board found!
              </Typography>}

              <Grid container spacing={2}>
                {boards.map((board) =>
                  <Link to={`/boards/${board._id}`}>
                    <Grid xs={2} sm={3} md={4} key={board._id}>
                      <Card sx={{ minWidth: '250px', maxWidth: '250px' }}>
                        {board.boardBg ? (
                          <CardMedia
                            component="img"
                            alt="green iguana"
                            sx={{ height: '100px', objectFit: 'cover',
                              userSelect: 'none',
                              userDrag: 'none', // có thể bị bỏ qua trên một số trình duyệt
                              WebkitUserDrag: 'none' }}
                            image={board.boardBg}
                            draggable={false}
                          />)
                          :
                          (
                            <Box sx={{ height:'100px', backgroundColor: randomColor(),
                              '&:hover': {
                                boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)',
                                // transition: 'boxShadow 2s ease',
                              }
                            }} />
                          )
                        }
                        <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 }}}>
                          <Typography gutterBottom variant="span" component="div">
                            {board.title}
                          </Typography>
                          {/* <Typography variant="body2" sx={{ color: 'text.secondary', overflow:'hidden', whiteSpace: 'nowrap', textOverflow:'ellipsis' }}>
                            Board decription
                        </Typography> */}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Link>
                )}
              </Grid>
              {totalBoards > 0 && (
                <Box sx={{my:3, pr:5, display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                  <Pagination
                    page={page}
                    size="large"
                    count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)} // Giả sử mỗi trang có 5 board
                    renderItem={(item) => (
                      <PaginationItem
                        component={Link}
                        to={`/boards${item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`}`}
                        {...item}
                      />
                    )}/>
                </Box>
              )}
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Container>
  )
}

export default Boards
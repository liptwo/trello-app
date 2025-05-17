import Box from '@mui/material/Box'
import Card from './Card/Card'

const ListCards = ({ cards }) => {
  return (
    <Box sx={{
      display:'flex',
      flexDirection:'column',
      px:'5px',
      mx:'5px',
      gap:1,
      overflowX:'hidden',
      overflowY:'auto',
      py:'2px',
      maxHeight: (theme) => `calc(${ theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.headColumnHeight} - ${theme.trello.footerColumnHeight})`,
      '&::-webkit-scrollbar':{
        width:'7px',
        height:'7px'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgb(137, 147, 171)',
        borderRadius:'8px' },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgb(111, 112, 113)' }
    }}>
      {cards?.map( card => <Card key={card._id} card={card}/>)}

    </Box>

  )
}

export default ListCards

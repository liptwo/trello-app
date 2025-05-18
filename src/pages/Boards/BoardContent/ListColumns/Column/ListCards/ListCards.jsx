import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const ListCards = ({ cards }) => {
  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
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
    </SortableContext>
  )
}

export default ListCards

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import InsertLinkIcon from '@mui/icons-material/InsertLink'

function Card({ card }) {
  const shouldShowAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.memberIds?.length
  }
  return (

    <MuiCard sx={{ cursor:'pointer', overflow:'unset', boxShadow:'0px 1px 1px #091e4240, 0px 0px 1px #091e424f', borderRadius: (card.cover ? '12px':'8px')
    }}>
      {card?.cover && (
        <CardMedia
          sx={{ maxHeight:'400px', height:'250px', borderTopLeftRadius:'12px', borderTopRightRadius:'12px' }}
          image={card.cover}
          title="green iguana"
        />)
      }

      <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
        <Typography>
          {card?.title}
        </Typography>
      </CardContent>
      {shouldShowAction() &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length && (
            <Button size="small" startIcon={<GroupIcon />}>{card.memberIds.length}</Button>
          )}
          {!!card?.comments?.length && (
            <Button size="small" startIcon={<CommentIcon />}>{card.comments.length}</Button>
          )}
          {!!card?.memberIds?.length && (
            <Button size="small" startIcon={<InsertLinkIcon />}>{card.memberIds.length}</Button>
          )}
        </CardActions>
      }

    </MuiCard>
  )
}

export default Card

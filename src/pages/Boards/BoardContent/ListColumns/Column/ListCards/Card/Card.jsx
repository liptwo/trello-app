import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import InsertLinkIcon from '@mui/icons-material/InsertLink'

function Card({ noMedia }) {
  if ( noMedia ) {
    return (
      <MuiCard sx={{ cursor:'pointer', overflow:'unset', boxShadow:'0px 1px 1px #091e4240, 0px 0px 1px #091e424f', borderRadius: '8 px'
      }}>
        <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
          <Typography>
            liptwo dev nè
          </Typography>
        </CardContent>
      </MuiCard>
    )}
  return (
    <MuiCard sx={{ cursor:'pointer', overflow:'unset', boxShadow:'0px 1px 1px #091e4240, 0px 0px 1px #091e424f', borderRadius: '12px'
    }}>
      <CardMedia
        sx={{ maxHeight:'400px', height:'250px', borderTopLeftRadius:'12px', borderTopRightRadius:'12px' }}
        image="https://trello.com/1/cards/6825810c5818ae3042236eb0/attachments/6825810d5818ae3042236faf/download/sergey-shmidt-koy6FlCCy5s-unsplash.jpg"
        title="green iguana"
      />
      <CardContent sx={{ p:1.5, '&:last-child':{ p:1.5 } }}>
        <Typography>
          liptwo dev nè
        </Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>12</Button>
        <Button size="small" startIcon={<CommentIcon />}>43</Button>
        <Button size="small" startIcon={<InsertLinkIcon />}>4</Button>
      </CardActions>
    </MuiCard>

  )
}

export default Card

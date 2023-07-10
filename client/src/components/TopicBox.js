import { Card, CardMedia, Grid, Typography, CardContent, CardActions, Button, Chip } from '@mui/material'
const tagcolor = { "Easy": "success", "Medium": "warning", "Hard": "error"}
export default ({card}) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: '56.25%',
          }}
          image={`images/${card.thumbnail}`}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {card.title}
          </Typography>
          <Typography>
            This topic has {card.numofquestion} questions.
          </Typography>
        </CardContent>
        <CardActions>
          <Chip label={card.level} color={tagcolor[card.level]} size="small"/>
          <Button size="small">View</Button>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

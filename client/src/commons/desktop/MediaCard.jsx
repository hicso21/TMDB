import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const MediaCard = ({prop}) => {
  const imgUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2'
  return (
    <Box sx={{m:'21px'}}>
      <Card sx={{ width: 200 }}>
        <Link to={prop?.title?`/movie/${prop.id}`:`/tv/${prop.id}`} style={{textDecoration:'none', color:'inherit'}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="280"
                image={prop?.poster_path?`${imgUrl}/${prop.poster_path}`:''}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {prop?.title?prop.title:prop.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {prop?.release_date?prop.release_date:prop.first_air_date}
                </Typography>
              </CardContent>
            </CardActionArea>
        </Link>
      </Card>
    </Box>
  )
}

export default MediaCard
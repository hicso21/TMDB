import { CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import numberToStringDate from '../../utils/dateFunction'
import withoutPoster from '../../assets/withoutBackground.svg'

const SearchCard = ({prop}) => {

    const imgUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2'
    console.log(prop)

  return (
    <Box sx={{width:'100%', mt:'20px', boxShadow:'0 2px 8px rgba(0,0,0,0.1)', borderRadius:'15px', display:'flex'}}>
        <Box sx={{display:'flex', justifyContent:'start', borderTopLeftRadius:4, borderBottomLeftRadius:4}}>
            <CardMedia
                component='img'
                image={prop.poster_path?`${imgUrl}/${prop.poster_path}`:`${withoutPoster}`}
                sx={prop.poster_path?{width:100, height:150, borderTopLeftRadius:15, borderBottomLeftRadius:15}:{width:100, height:150, borderTopLeftRadius:15, borderBottomLeftRadius:15, bgcolor:'lightgray'}}
            />
        </Box>
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', pl:2}}>
            <Typography variant='h6'>{prop.title?prop.title:prop.name}</Typography>
            <Typography variant='text.seconday' sx={{pt:1}}>{prop?.release_date?numberToStringDate(prop.release_date):numberToStringDate(prop.first_air_date)}</Typography>
            <Typography variant='body5' sx={{pt:2}}>{prop.overview?prop?.overview.substring(0,150)+'...':''}</Typography>
        </Box>
    </Box>
  )
}

export default SearchCard
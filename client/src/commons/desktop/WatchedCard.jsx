import { Box, Button, CardMedia, Tooltip, Typography } from '@mui/material'
import React from 'react'
import numberToStringDate from '../../utils/dateFunction'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link } from 'react-router-dom';
import fetchAPI from '../../utils/fetchAPI';
import { useSelector } from 'react-redux';
import { setUser } from '../../state/user';

const WatchedCard = ({filter, item, i}) => {
    
    const {user} = useSelector(state=>state)
    const imgUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2'
    const handleClick= ()=>{
        fetchAPI({method:"DELETE",data: item, url:`/api/user/watched/remove/${user._id}`})
            .then(res=>{setUser(res.data);window.location.reload()})
    }

  return (
    <Box sx={{display:'flex', mt:3}}>
        <Box sx={{width:'10%'}}>
            <Tooltip title='Remove'>
                <Button sx={{height:'100%', color:'inherit'}} onClick={handleClick}>
                    <HighlightOffIcon sx={{width:35, height:35}}/>
                </Button>
            </Tooltip>
        </Box>
        <Link style={{textDecoration:'none', color:'inherit'}} to={`/${filter}/${item.id}`}>
            <Box sx={{height:200, display:'flex', flexDirection:'row', boxShadow:'0 2px 8px rgba(0,0,0,0.1)', borderRadius:2}}>
                <Box sx={{width:130, height:200}}>
                    <CardMedia
                        component="img"
                        image={`${imgUrl}/${item.poster_path}`}
                        alt="green iguana"
                        sx={{height:200, width:130, borderTopLeftRadius:8, borderBottomLeftRadius:8}}
                    />
                </Box>
                <Box sx={{width:'100%'}}>
                    <Box sx={{display:'flex'}}>
                        <Typography sx={{pt:2, pl:5, fontSize:22}}><strong>{item?.name?item.name:item.title}</strong></Typography>
                        <Typography sx={{pt:2, pl:1, height:30,fontSize:18, opacity:0.7, display:'flex', alignItems:'end'}}>{`(${filter})`}</Typography>
                    </Box>
                    <Typography sx={{pl:5, opacity:0.4}}>{numberToStringDate(item?.first_air_date?item.first_air_date:item.release_date)}</Typography>
                    <Typography sx={{p:2}}>{item.overview}</Typography>
                </Box>
            </Box>
        </Link>
    </Box>
  )
}

export default WatchedCard
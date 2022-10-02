import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { getOneTvshow } from '../../state/tvshows'
import { Box, CardMedia, Divider, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import ProgressBar from '../../commons/desktop/ProgressBar'
import { Link } from 'react-router-dom'

const SingTv = () => {
    const params = useLocation()
    const dispatch = useDispatch()
    const {tvshows} = useSelector(state=>state)
    const tvUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2'

    let ImageStyle = { width: '90%', height: '80%', display:'flex', flexDirection:'row', margin:'auto'}

    function Slider({ items, type }) {
        return (
          <ImageList sx={ImageStyle} className='imageList'>
            {!items?<ProgressBar/>:items?.map((item) => {
            return(
              <Link to={`/${type}/${item.id}`} style={{color: 'inherit', textDecoration:'none', padding:5, width:200}} key={item.id}>
                <ImageListItem>
                  <img
                    src={item.profile_path?`${tvUrl}/${item.profile_path}`:''}
                    alt={item?.name}
                    loading="lazy"
                    style={{maxHeight:300, borderRadius:15, width:200}}
                    />
                  <ImageListItemBar
                    title={item?.name}
                    subtitle={<Typography variant='text.secondary'>{}</Typography>}
                    position="below"
                    sx={{display:'flex', justifyContent:'center', pt:1}}
                  />
                </ImageListItem>
              </Link>
            )})}
          </ImageList>
        );
      }

    useEffect(()=>{
        dispatch(getOneTvshow(params.pathname.substring(4)))
    },[])

    return (
        <>
            <Box sx={{width:'100%', height:500, display:'flex', paddingTop:5}}>
                <Box sx={{mr:10, ml:10, width:'100%', height:500, display:'flex'}}>
                    <Box sx={{width:'25%'}}>
                        <CardMedia component='img' image={`${tvUrl}/${tvshows.poster_path}`} sx={{borderRadius:2, width:300, height:450, ml:'10%'}}/>
                    </Box>
                    <Box sx={{width:'75%', paddingTop:6, pl:5/* pl:5 temporal */}}>
                        <Box id='firstInfo' sx={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                            <Typography variant='h4'>{tvshows.name}</Typography>
                            <Typography variant='body1'>{tvshows.genres?.map((item, i)=>{
                                return(
                                    <>
                                        {i === tvshows.genres.length-1?(item.name):(item.name+',')}
                                    </>
                                )
                            })}{` - ${tvshows.episode_run_time} min`}</Typography>
                            <Typography variant='text.secondary'>{`(${tvshows.first_air_date?.substring(0, 4)})`}</Typography>
                        </Box>
                        <Box id='userButtons' sx={{display:'flex', justifyContent:'center', width:'100%', pt:1}}>
                            <Typography sx={{p:1}}>fav</Typography>
                            <Typography sx={{p:1}}>watchlist</Typography>
                            <Typography sx={{p:1}}>watched</Typography>
                            <Typography sx={{p:1}}>like</Typography>
                        </Box>
                        <Box id='tagline' sx={{display:'flex', justifyContent:'start', width:'100%', pt:1}}>
                            <Typography variant='body1' sx={{opacity:0.7, fontStyle:'italic'}}>{tvshows.tagline}</Typography>
                        </Box>
                        <Box id='overviewNCreators' sx={{display:'flex', justifyContent:'start', width:'100%', pt:1, flexDirection:'column'}}>
                            <Typography variant='h6'><strong>Overview</strong></Typography>
                            <Typography variant='body2' sx={{pt:1}}>{tvshows.overview}</Typography>
                            <Typography variant='subtitle1' sx={{pt:2}}>{tvshows.created_by?.length>1?'Creators':'Creator'}:  {tvshows.created_by?.map((item, i)=>i===tvshows.created_by.length-1?`${item.name}`:`${item.name}, `)}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider variant="inset" sx={{width:'90%'}}/>
            <Box sx={{display:'flex', width:'100%', justifyContent:'center'}}>
                <Box sx={{mr:10, ml:10, width:'100%', height:500, display:'flex', justifyContent:'center'}}>
                    <Slider items={tvshows.aggregate_credits?.cast} type='person'/>
                </Box>
            </Box>
        </>
    )
}

export default SingTv
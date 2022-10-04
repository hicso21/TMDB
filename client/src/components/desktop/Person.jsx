import React from 'react'
import { Box, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import { searchByPerson } from '../../state/people'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import ProgressBar from '../../commons/desktop/ProgressBar'
import '../../App.css'

const Person = () => {

    const dispatch = useDispatch()
    const params = useLocation()
    const {people} = useSelector(state=>state)
    const imgUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2'

    let ImageStyle = { width: '90%', height: '60%', display:'flex', flexDirection:'row', margin:'auto'}

    function Slider({ items, type }) {
        return (
        <ImageList sx={ImageStyle} className='imageList'>
            {!items[0]?<ProgressBar/>:items.map((item) => {
            return(
            <Link to={`/${type}/${item.id}`} style={{color: 'inherit', textDecoration:'none', padding:5, width:200}} key={item.id.toString()}>
                <ImageListItem>
                <img
                    src={item.poster_path?`${imgUrl}/${item.poster_path}`:''}
                    alt={item.name}
                    loading="lazy"
                    style={{height:195, borderRadius:15, width:130}}
                    />
                <ImageListItemBar
                    title={type === 'movie'?item.title:item.name}
                    subtitle={<Typography variant='text.secondary'>{type === 'movie'?item.release_date:item.first_air_date}</Typography>}
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
        dispatch(searchByPerson(params.pathname.substring(8)))
    },[])

  return (
    <Box sx={{m:5, ml:'12%', mr:'12%', display:'flex', flexDirection:'row'}}>
        <Box sx={{display:'flex', width:'26%', flexDirection:'column'}}>
            <img src={`${imgUrl}/${people.profile_path}`} alt="" style={{width:300, height:450, borderRadius:10}}/>
            <Typography variant='h6' sx={{mt:3}}>Personal info</Typography>
        </Box>
        <Box sx={{display:'flex', width:'74%', flexDirection:'column'}}>
            <Typography variant='h3' style={{fontSize:'250%'}}>{people.name}</Typography>
            <Typography variant='h3' style={{fontSize:'140%'}} sx={{mt:3}}><strong>Biography</strong></Typography>
            <Typography variant='p' sx={{mt:1}}>{people.biography}</Typography>
            <Typography variant='h3' style={{fontSize:'140%'}} sx={{mt:3}}><strong>Know for</strong></Typography>
            <Slider items={!people.movieCredits?.cast[0]?'':people.movieCredits.cast} type='movie'/>
        </Box>
    </Box>
  )
}

export default Person
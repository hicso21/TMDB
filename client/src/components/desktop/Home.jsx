import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularMovies } from '../../state/movies'
import { ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { Link } from 'react-router-dom'
import { Box } from '@mui/system';
import { getPopularShows } from '../../state/tvshows';
import ProgressBar from '../../commons/desktop/ProgressBar';
import '../../App.css'

const Home = () => {

  const imgUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2'
  const [moviesList, setMoviesList] = useState([])
  const [tvshowsList, setTvshowsList] = useState([])

  let ImageStyle = { width: '90%', height: '40%', display:'flex', flexDirection:'row', margin:'auto'}

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
                style={{maxHeight:300, borderRadius:15, width:200}}
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

  const dispatch = useDispatch()
  const {movies} = useSelector(state=>state)
  const {tvshows} = useSelector(state=>state)

  useEffect(()=>{
    dispatch(getPopularMovies())
    .then(resp=>{setMoviesList(resp.payload)})
    dispatch(getPopularShows())
    .then(resp=>{setTvshowsList(resp.payload)})
  },[])

  return (
    <>
      <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', ml:'10%', mr:'10%'}}>
        <Typography variant='h4' sx={{width:'100%', ml:'12%', pt:2}}>Popular Movies</Typography>
        <Slider items={moviesList} type={'movie'}/>
      </Box>
      <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', ml:'10%', mr:'10%'}}>
        <Typography variant='h4' sx={{width:'100%', ml:'12%'}}>Popular TV Shows</Typography>
        <Slider items={tvshows} type={'tv'}/>
      </Box>
    </>
  )
}

export default Home
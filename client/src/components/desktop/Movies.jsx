import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '../../state/movies'
import { Box, Typography } from '@mui/material';
import SideBar from '../../commons/desktop/SideBar';
import MediaContent from '../../commons/desktop/MediaContent';
import { useEffect } from 'react';

const Movies = () => {
    const {movies} = useSelector(state=>state)
    const params = useLocation()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(params.search.substring(7) === 'popular') dispatch(getPopularMovies())
        if(params.search.substring(7) === 'nowPlaying') dispatch(getNowPlayingMovies())
        if(params.search.substring(7) === 'upcoming') dispatch(getTopRatedMovies())
        if(params.search.substring(7) === 'topRated') dispatch(getUpcomingMovies())
        console.log(movies)
    },[params.search])

    return (
        <>
            <Box sx={{marginLeft:4, marginRight:4,padding:5}}>
                <Typography variant='h4'>Popular Movies</Typography>
                    <Box sx={{display:'flex', flexDirection:'row', width:'100%'}}>
                        <Box sx={{display:'flex', flexDirection:'row', width:'30%'}}>
                            <SideBar/>
                        </Box>
                        <MediaContent prop={movies}/>
                    </Box>
            </Box> 
        </>
    )
}

export default Movies
import React, { useState } from 'react'
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
    const [title, setTitle] = useState('')

    useEffect(()=>{
        if(params.search.substring(7) === 'popular') {
            setTitle('Popular Movies')
            dispatch(getPopularMovies())
        }
        if(params.search.substring(7) === 'nowPlaying') {
            setTitle('Now Playing')
            dispatch(getNowPlayingMovies())
        }
        if(params.search.substring(7) === 'upcoming') {
            setTitle('Upcoming')
            dispatch(getTopRatedMovies())
        }
        if(params.search.substring(7) === 'topRated') {
            setTitle('Top Rated')
            dispatch(getUpcomingMovies())
        }
        console.log(movies)
    },[params.search])

    return (
        <>
            <Box sx={{marginLeft:4, marginRight:4,padding:5}}>
                <Typography variant='h4'>{title}</Typography>
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
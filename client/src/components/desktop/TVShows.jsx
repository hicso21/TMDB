import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getAiringTodayShows, getOnTVShows, getPopularShows, getTopRatedShows } from '../../state/tvshows'
import { Box, Typography } from '@mui/material';
import SideBar from '../../commons/desktop/SideBar';
import MediaContent from '../../commons/desktop/MediaContent';
import { useEffect } from 'react';

const TVShows = () => {
    const {tvshows} = useSelector(state=>state)
    const params = useLocation()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(params.search.substring(7) === 'popular') dispatch(getPopularShows())
        if(params.search.substring(7) === 'airingToday') dispatch(getAiringTodayShows())
        if(params.search.substring(7) === 'ontv') dispatch(getOnTVShows())
        if(params.search.substring(7) === 'topRated') dispatch(getTopRatedShows())
        console.log(tvshows)
    },[params.search])

    return (
        <>
            <Box sx={{marginLeft:4, marginRight:4,padding:5}}>
                <Typography variant='h4'>Popular Movies</Typography>
                    <Box sx={{display:'flex', flexDirection:'row', width:'100%'}}>
                        <Box sx={{display:'flex', flexDirection:'row', width:'30%'}}>
                            <SideBar/>
                        </Box>
                        <MediaContent prop={tvshows}/>
                    </Box>
            </Box> 
        </>
    )
}

export default TVShows
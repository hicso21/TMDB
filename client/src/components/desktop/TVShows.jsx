import React, { useState } from 'react'
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
    const [title, setTitle] = useState('')

    useEffect(()=>{
        if(params.search.substring(7) === 'popular') {
            setTitle('Popular Shows')
            dispatch(getPopularShows())
        }
        if(params.search.substring(7) === 'airingToday') {
            setTitle('Airing Today')
            dispatch(getAiringTodayShows())
        }
        if(params.search.substring(7) === 'ontv') {
            setTitle('On TV')
            dispatch(getOnTVShows())
        }
        if(params.search.substring(7) === 'topRated') {
            setTitle('Top Rated')
            dispatch(getTopRatedShows())
        }
        console.log(title)
    },[params.search])

    return (
        <>
            <Box sx={{marginLeft:4, marginRight:4,padding:5}}>
                <Typography variant='h4'>{title}</Typography>
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
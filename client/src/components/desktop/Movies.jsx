import React from 'react'
//import { useDispatch, useSelector } from 'react-redux'
//import { getPopularMovies } from '../../state/movies'
import { Box, Typography } from '@mui/material';
import SideBar from '../../commons/desktop/SideBar';
import MediaContent from '../../commons/desktop/MediaContent';

const Movies = () => {
    // const {movies} = useSelector(state=>state)
    // const dispatch = useDispatch()

    return (
        <>
            <Box sx={{marginLeft:4, marginRight:4,padding:5}}>
                <Typography variant='h4'>Popular Movies</Typography>
                    <Box sx={{display:'flex', flexDirection:'row'}}>
                        <SideBar/>
                        <MediaContent/>
                    </Box>
            </Box> 
        </>
    )
}

export default Movies
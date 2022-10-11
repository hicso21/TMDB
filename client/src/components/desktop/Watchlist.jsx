import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import WatchlistCard from '../../commons/desktop/WatchlistCard'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

const Watchlist = () => {

    const params = useLocation()
    const {user} = useSelector(state=>state)
    const [type, setType] = useState('')

    useEffect(()=>{
        setType('movie')
    },[params])

  return (
    <>
        <Box sx={{height:200}}>
            <Box sx={{height:200, ml:30, mr:30, display:'flex'}}>
                Banner
            </Box>
        </Box>
        <Box sx={{ml:30, mr:30}}>
            <Box sx={{display:'flex'}}>
                <Typography variant='span' sx={{p:2, fontSize:20}}>My Watchlist</Typography>  
                <Button sx={{borderRadius:20,color:'inherit', height:50,p:2}} onClick={()=>{setType('movie')}}>
                    <Typography sx={type=='movie'?{height:20, borderBottom:'2px solid black', fontSize:15}:{height:20, borderBottom:'2px solid transparent', fontSize:15}}>
                        Movies
                    </Typography>
                </Button>
                <Button sx={{borderRadius:20,color:'inherit', height:50,p:2}} onClick={()=>{setType('tv')}}>
                    <Typography sx={type=='tv'?{height:20, borderBottom:'2px solid black', fontSize:15}:{height:20, borderBottom:'2px solid transparent', fontSize:15}}>
                        TV Shows
                    </Typography>
                </Button>
            </Box>
            <Box sx={{pl:2, pr:2}}>
                {type === 'movie'?
                        user.to_watch?.length?
                                user.to_watch?.map((item, i)=>{
                                    let filter
                                    if(item.title) filter = 'movie'
                                    else filter = 'tv'
                                    return(
                                        <WatchlistCard filter={filter} type={type} item={item} i={i} key={item.id}/>
                                    )
                                })
                            :
                                <Typography>You haven't added any Movies to your watchlist.</Typography>
                    :
                        user.to_watch?.length?
                                user.to_watch?.map((item, i)=>{
                                    let filter
                                    if(item.title) filter = 'movie'
                                    else filter = 'tv'
                                    return(
                                        <WatchlistCard filter={filter} type={type} item={item} i={i} key={item.id}/>
                                    )
                                })
                            :
                                <Typography>You haven't added any TV shows to your watchlist.</Typography>
                }
            </Box>
        </Box>
    </>
  )
}

export default Watchlist
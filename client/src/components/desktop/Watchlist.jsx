import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import WatchlistCard from '../../commons/desktop/WatchlistCard'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import ProfileBanner from '../../commons/desktop/ProfileBanner'

const Watchlist = () => {

    const {user} = useSelector(state=>state)
    const [type, setType] = useState('')
    const [movieCounter, setMovieCounter] = useState(0)
    const [tvCounter, setTvCounter] = useState(0)

    useEffect(()=>{
        setType('movie')
        user.to_watch?.map(item=>{
            item.title
            ?setMovieCounter(curr=>curr+1)
            :setTvCounter(curr=>curr+1)
        })
    },[user])

  return (
    <>
        <ProfileBanner/>
        <Box sx={{ml:30, mr:30}}>
            <Box sx={{display:'flex'}}>
                <Typography variant='h4' sx={{p:2}}>My Watchlist</Typography>  
                <Button sx={{borderRadius:20,color:'inherit', height:73,p:2}} onClick={()=>{setType('movie')}}>
                    <Typography sx={type=='movie'?{height:20, borderBottom:'2px solid black', fontSize:15}:{height:20, borderBottom:'2px solid transparent', fontSize:15}}>
                        Movies
                    </Typography>
                </Button>
                <Button sx={{borderRadius:20,color:'inherit', height:73,p:2}} onClick={()=>{setType('tv')}}>
                    <Typography sx={type=='tv'?{height:20, borderBottom:'2px solid black', fontSize:15}:{height:20, borderBottom:'2px solid transparent', fontSize:15}}>
                        TV Shows
                    </Typography>
                </Button>
            </Box>
            <Box sx={{pl:2, pr:2}}>
                {type === 'movie'?
                        movieCounter?
                                user.to_watch?.map((item, i)=>{
                                    let filter
                                    if(item.title) filter = 'movie'
                                    else filter = 'tv'
                                    return(
                                        <WatchlistCard filter={filter} type={type} item={item} i={i} key={item.id} counter={movieCounter}/>
                                    )
                                })
                            :<Typography>{`You haven't added any ${type==='movie'?'Movie':'TV Show'} to your Watchlist.`}</Typography>
                    :
                        tvCounter?
                                user.to_watch?.map((item, i)=>{
                                    let filter
                                    if(item.title) filter = 'movie'
                                    else filter = 'tv'
                                    return(
                                        <WatchlistCard filter={filter} type={type} item={item} i={i} key={item.id} counter={tvCounter}/>
                                    )
                                })
                            :
                                <Typography>{`You haven't added any ${type==='movie'?'Movie':'TV Show'} to your Watchlist.`}</Typography>
                }
            </Box>
        </Box>
    </>
  )
}

export default Watchlist
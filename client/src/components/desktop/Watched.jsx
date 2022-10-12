import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import ProfileBanner from '../../commons/desktop/ProfileBanner'
import WatchedCard from '../../commons/desktop/WatchedCard'

const Watched = () => {

  const {user} = useSelector(state=>state)

  return (
    <>
        <ProfileBanner/>
        <Box sx={{ml:30, mr:30}}>
            <Box sx={{display:'flex'}}>
                <Typography variant='span' sx={{p:2, fontSize:20}}>Watched</Typography>
            </Box>
            <Box sx={{pl:2, pr:2}}>
                {
                  user.watched?.map((item, i)=>{
                    let filter
                    if(item.title) filter = 'movie'
                    else filter = 'tv'
                    return(
                        <WatchedCard filter={filter} item={item} i={i} key={item.id}/>
                    )
                })
                }
            </Box>
        </Box>
    </>
  )
}

export default Watched
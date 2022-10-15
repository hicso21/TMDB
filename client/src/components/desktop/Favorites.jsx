import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import ProfileBanner from '../../commons/desktop/ProfileBanner'
import FavCard from '../../commons/desktop/FavCard'

const Favorites = () => {

  const {user} = useSelector(state=>state)

  return (
    <>
        <ProfileBanner/>
        <Box sx={{ml:30, mr:30}}>
            <Box sx={{display:'flex'}}>
                <Typography variant='h4' sx={{p:2}}>Favorites</Typography>
            </Box>
            <Box sx={{pl:2, pr:2}}>
                {
                  user.favorites?.length
                    ?user.favorites?.map((item, i)=>{
                      let filter
                      if(item.title) filter = 'movie'
                      else filter = 'tv'
                      return(
                          <FavCard filter={filter} item={item} bool={true} key={item.id}/>
                      )
                    })
                    :<Typography>{`You doesn't added any Movie or TV Show to Favorites.`}</Typography>
                }
            </Box>
        </Box>
    </>
  )
}

export default Favorites
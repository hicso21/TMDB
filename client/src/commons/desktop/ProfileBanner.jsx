import { Box, ImageListItem, Typography } from '@mui/material'
import React from 'react'
//import banner from '../../../public/banner'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'

const ProfileBanner = () => {

  const {user} = useSelector(state=>state)

  return (
    <Box sx={{display:'flex', mb:2}}>
      <Box sx={{height:200, width:'100%', backgroundImage:'url(/banner.png)'}}>
          <Box sx={{height:200, ml:30, mr:30, display:'flex'}}>
            <ImageListItem sx={{margin:'auto 0'}}>
              <img src={user?.profile_picture} alt="" style={{borderRadius:1000, height:150, width:150}}/>
            </ImageListItem>
            <Box sx={{width:'100%', p:5, display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
              <Typography color={'#5ce1e6'}><strong>{user?.name} {user?.last_name}</strong></Typography>
              {user?.age?<Typography color={'#5ce1e6'}><strong>{user?.age} years</strong></Typography>:<></>}
              <Typography color={'#5ce1e6'}><strong>Created: {user?.since?.substring(4,15)}</strong></Typography>
            </Box>
          </Box>
      </Box>
    </Box>
  )
}

export default ProfileBanner
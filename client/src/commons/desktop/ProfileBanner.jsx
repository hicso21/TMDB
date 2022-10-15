import { Box } from '@mui/material'
import React from 'react'
//import banner from '../../../public/banner'
import ReactPlayer from 'react-player'

const ProfileBanner = () => {
  return (
    <Box sx={{display:'flex', mb:2}}>
      <Box sx={{height:200, width:'100%', backgroundImage:'url(/banner.png)'}}>
          <Box sx={{height:200, ml:30, mr:30, display:'flex'}}>
          </Box>
      </Box>
    </Box>
  )
}

export default ProfileBanner
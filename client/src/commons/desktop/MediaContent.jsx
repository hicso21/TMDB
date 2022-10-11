import { Box } from '@mui/material'
import React from 'react'
import MediaCard from './MediaCard'
import ProgressBar from './ProgressBar'

const MediaContent = ({prop}) => {
  return (
    <Box sx={{display:'flex', flexDirection:'row', width:'70%', flexWrap:'wrap'}}>
        {!prop[0]?<ProgressBar/>:prop?.map((media)=>{
            return(
                    <MediaCard prop={media} key={media.id}/>
            )
        })}
    </Box>
  )
}

export default MediaContent
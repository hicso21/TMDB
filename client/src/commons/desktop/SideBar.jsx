import { Box, Paper } from '@mui/material'
import React from 'react'
import SortSideBar from '../../components/desktop/SortSideBar'

const SideBar = () => {
  return (
      <Box sx={{width:'80%', display:'flex', justifyContent:'start', alignItems:'start'}}>
        <SortSideBar/>
      </Box>
  )
}

export default SideBar
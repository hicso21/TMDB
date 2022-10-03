import { Pagination, PaginationItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import PeopleCard from '../../commons/desktop/PeopleCard'
import ProgressBar from '../../commons/desktop/ProgressBar'
import { getPopularPeople } from '../../state/people'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const People = () => {
    const {people} = useSelector(state=>state)
    const dispatch = useDispatch()
    const params = useLocation()
    const [page, setPage] = useState(1)
    
    useEffect(()=>{
        dispatch(getPopularPeople(page))
    },[page])


    console.log(people)

    return (
        <Box sx={{m:10, ml:'12%', mr:'12%'}}>
            <Typography></Typography>            
            <Box sx={!people[0]?{}:{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gridGap:'15px'}}>
                {!people[0]?<ProgressBar/>:people.map((item, i)=><PeopleCard prop={item}/>)}
            </Box>
            <Box sx={{width:'100%', display:'flex', justifyContent:'center', mt:5}}>
            <Pagination
                count={10}
                renderItem={(item) => {
                    onclick=()=>{setPage(item.page-1);window.scrollTo(0, 0)}
                return(
                    <PaginationItem
                        components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                    />
                )}}
            />
            </Box>
        </Box>
    )
}

export default People
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import ProgressBar from '../../commons/desktop/ProgressBar'
import { getSearch } from '../../state/search'
import SearchCard from './SearchCard'
import { Link } from 'react-router-dom'

const Search = () => {

  const params = useLocation()
  const dispatch = useDispatch()
  const { search } = useSelector(state=>state)

  useEffect(()=>{
    dispatch(getSearch(params.search.substring(7)))
  },[params.search])

  return (
    <Box sx={{display:'flex', width:'100%', justifyContent:'center'}}>
      <Box sx={{display:'flex', width:'70%', justifyContent:'center', pt:10, flexWrap:'wrap'}}>
        {!search[0]?<ProgressBar/>:search.map(item=>{
          return(
            <Link style={{width:'100%', textDecoration:'none', color:'inherit'}} to={item.media_type === 'tv'?`/tv/${item.id}`:`/movie/${item.id}`}>
              <SearchCard key={item.id} prop={item}/>
            </Link>
          )
        })}
      </Box>
    </Box>
  )
}

export default Search
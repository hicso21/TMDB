import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularShows } from '../../state/tvshows'

const TVShows = () => {
    const {tvshows} = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPopularShows())
    },[])

    return (
        <>
            TVShows
        </>
    )
}

export default TVShows
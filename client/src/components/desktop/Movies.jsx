import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularMovies } from '../../state/movies'

const Movies = () => {
    const {movies} = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPopularMovies())
    },[])

    return (
        <>
            Movies
        </>
    )
}

export default Movies
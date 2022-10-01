import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { getOneMovie } from '../../state/movies'

const SingMovie = () => {
    const params = useLocation()
    const dispatch = useDispatch()
    const {movies} = useSelector(state=>state)

    useEffect(()=>{
        dispatch(getOneMovie(params.pathname.substring(7)))
    },[])
    console.log(movies)

    return (
        <>
            {!movies.adult?
                <></>
                :
                <></>
            }
        </>
    )
}

export default SingMovie
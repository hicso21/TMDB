import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularPeople } from '../../state/people'

const People = () => {
    const {people} = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPopularPeople())
    },[])

    return (
        <>
            People
        </>
    )
}

export default People
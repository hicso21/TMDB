import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import Navbar from '../commons/Navbar'
import { setUser } from '../state/user'

const Layout = ({children}) => {
  const dispatch = useDispatch()
  const params = useLocation()

  useEffect(()=>{
    dispatch(setUser())
  },[params.pathname])
  
  return (
    <>
        <Navbar/>
        {children}
    </>
  )
}

export default Layout
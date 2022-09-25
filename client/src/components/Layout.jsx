import React from 'react'
import Navbar from '../commons/Navbar'

const Layout = ({children}) => {
  return (
    <>
        <Navbar/>
        {children}
    </>
  )
}

export default Layout
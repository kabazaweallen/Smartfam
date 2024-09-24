import React from 'react'
import Navbar from '../pages/Navbar/Navbar'
import Footer from '../pages/Footer/Footer'
import {Outlet} from 'react-router-dom'
function HomeLayout() {
  return (
    <div className='Layout-wrapper'>
 <Navbar/>
    <>
    <Outlet/>
    <Footer/>
    </>

    </div>
   
  )
}

export default HomeLayout
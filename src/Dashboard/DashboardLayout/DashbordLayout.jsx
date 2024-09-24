import React, { useState } from 'react'
import DashboardNav from './DashboardNav'
import Sidebar from './Sidebar'
import './dashboardLayout.css'
import {Navigate, Outlet} from 'react-router-dom'
import { usestateContext } from '../../contexts/ContexProvider'
function DashbordLayout() {
  const{access_token}=usestateContext()
  if(!access_token){
    return <Navigate to='/login'/>
  }
  const [openMenu,setOpenMenu]=useState(false)
  const openSidebar = ()=>{
    setOpenMenu(!openMenu)
  }
  const navBannerClass = openMenu ? 'sidebar':'large-sidebar'
  return (
    <div>
       <DashboardNav openSidebar={openSidebar}/>
    <Sidebar openSidebar={openSidebar}/>
    <div className="main-dashboard">
<Outlet />
    </div>
    </div>
 
    
  )
}

export default DashbordLayout
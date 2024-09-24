import React, { useState } from 'react'
import { links } from '../../assets/data/datalink'
import { Link } from 'react-router-dom'
import { FaAngleLeft, FaArrowLeft } from 'react-icons/fa'
function Sidebar() {
    const [openMenu,setOpenMenu]=useState(false)
    const openSidebar = ()=>{
      setOpenMenu(!openMenu)
    }
    const navBannerClass = openMenu ? 'sidebar':'large-sidebar'
  return (
    <div className='sidebar'>
      {/* <Link to='/' style={{color:'mediumseagreen',fontSize:'17px'}}><FaAngleLeft/></Link> */}
        <div className="links-container">
            {links.map((link)=>(
                <div className='links-dash active' key={link.id}>
                    <span>{link.icon}</span>
                    <Link to={`/admin/${link.name}`} >{link.name}</Link>
                </div>
            ))}
        </div>
        
        </div>
  )
}

export default Sidebar
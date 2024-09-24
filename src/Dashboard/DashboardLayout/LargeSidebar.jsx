import React from 'react'
import { Link } from 'react-router-dom'
import { links } from '../../assets/data/datalink'

function LargeSidebar({openSidebar}) {
  return (
    <div className="large-sidebar-wrapper">
  <div className="large-sidebar">
    {/* <Link to='/'>Back</Link> */}
    <div className="links-container">
        {links.map((link)=>(
            <div className='links-dash active' key={link.id} onClick={openSidebar}>
                <span>{link.icon}</span>
                <Link to={`/admin/${link.name}`} >{link.name}</Link>
            </div>
        ))}
    </div>
    
    </div>
    </div>
  

  )
}

export default LargeSidebar
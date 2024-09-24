import React from 'react'
import farmlogo from '/images/farmlogo.jpg'
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <div className='Nav-container'>
    <div className="nav-header">
      <div className="logo">
        <img src={farmlogo} alt="logo" />
      </div>
    <div className="nav-links">
    <ul>
       <li><Link to=''>Home</Link></li>
       <li><Link to=''>About</Link></li>
       <li><Link to="">Teams</Link></li>
       <li><Link to="">Contact Us</Link></li>
       <li><Link to="/login">Login</Link></li>
      </ul>
    </div>
</div>  
</div>
  )
}

export default Navbar
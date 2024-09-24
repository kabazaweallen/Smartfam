import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='not-found-container'>
        <div className="not-found-content">
        <h1> Error 404 - Page Notfound </h1>
        <Link style={{color:"mediumseagreen",textDecoration:"none"}}   to="/"><FaAngleLeft/>Back</Link>
        </div>
       
    </div>
  )
}

export default NotFound
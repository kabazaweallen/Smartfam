import React from 'react'
import logo from '/images/farmlogo.jpg'
import { FaAngleDown, FaBars } from 'react-icons/fa'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axiosclient from '../../axiosClient'
import { usestateContext } from '../../contexts/ContexProvider'
import LargeSidebar from './LargeSidebar'
import { useJwt } from 'react-jwt'
function DashboardNav() {
  const [logoutModal,setLogoutModal]=useState(false)
 const{user,setUser}=usestateContext()
 const [loading, setLoading] = useState(true); // Add loading state

  const openLogoutModal = ()=>{
    setLogoutModal((prevlogout)=>!prevlogout)
  }
  const handleLogout = ()=>{
    localStorage.removeItem("Token")
    window.location.href = "/"
  }

  const [openMenu,setOpenMenu]=useState(false)
const openSidebar = ()=>{
  setOpenMenu(!openMenu)
}

const loggedUser = localStorage.getItem('Token')
//  console.log(loggedUser)
const { decodedToken, isExpired } = useJwt(loggedUser);
// console.log(decodedToken)

useEffect(() => {
  if (decodedToken?.hasOwnProperty('_id')) {
    axiosclient.get(`/api/v1/user/userbyid/${decodedToken._id}`).then(({ data }) => {
      // console.log(data);
      setUser(data);
    });
  }
  
}, [decodedToken, setUser]);
return (
    <div className='dashboard-nav' onMouseLeave={()=>setLogoutModal(false)}>
      {openMenu &&(<LargeSidebar openSidebar={openSidebar}/>)}
<div className="logo-left">
  <FaBars className='fa-bar-menu' onClick={openSidebar}/>
    <img className='logo' src={logo} />
</div>
<div className="profile-user" >
  <div className='logged-user' onMouseOver={openLogoutModal}>
  <div className='logged'>
              <p>{user.fullNames}</p>
              <FaAngleDown />
  </div>
  </div>
  {logoutModal&& 
  (<div className="logout-modal">
 <Link to='/admin/profile'> Profile</Link>
 <button className='btn-logout' onClick={handleLogout}>Logout</button>
</div>)
}
</div>

    </div>
  )
}

export default DashboardNav
import React, { useEffect } from 'react'
import "./profile.css"
import { Link } from 'react-router-dom'
import { useJwt } from 'react-jwt';
import axiosclient from '../../axiosClient';
import { usestateContext } from '../../contexts/ContexProvider';

function Profile() {

  const{user,setUser}=usestateContext()
  const loggedUser = localStorage.getItem('Token')
//  console.log(loggedUser)
const { decodedToken, isExpired } = useJwt(loggedUser);
// console.log(decodedToken)

useEffect(() => {
  if (decodedToken?.hasOwnProperty('_id')) {
    axiosclient.get(`/api/v1/user/userbyid/${decodedToken._id}`).then(({ data }) => {
      //  console.log(data);
      setUser(data);
    });
  }
  
}, [decodedToken, setUser]);
  return (
    <div className='cattles-manage-wrapper'>
      <div className='edit-profile'>
        <nav className='profile'>Profile</nav>
        /
        <nav className='edit-btn'> Edit</nav>
      </div>
      <div className="profile-preferences">
        <div className='profile-h'>Profile</div>
        <div className='profile-pref'>Preferences</div>
      </div>
      <div className="profile-container">
        <nav className='profile-title'>
          My Profile
        </nav>
        <div className="input-label">
          <form action="" className='form-profile-container'>
            <nav id='cont'>
              <label htmlFor="" id='lab' className='names-ordered'>
                Fullname
                <nav className='ordered'>
                  *
                </nav>
              </label>
              <input type="text" value={user.fullNames} />
            </nav>
            <nav id='cont'>
              <label htmlFor="" id='lab'>
                Email
              </label>
              <input type="email" id='lab' value={user.email} />
            </nav>
            <nav id='cont'>
              <label htmlFor="" id='lab'>
                Role
              </label>
              <input type="text" value={user.role} />
            </nav>
            {/* <nav id='cont'>
              <label htmlFor="" id='lab' className='names-ordered'>
                Phone Number
                <nav className='ordered'>
                  *
                </nav>
              </label>
              <input type="text" value={user.phoneNo} />
            </nav> */}
            <nav id='cont'>
              <label htmlFor="" id='lab' className='names-ordered'>
                Location
                <nav className='ordered'>
                  *
                </nav>
              </label>
              <input type="text" value={user.location} />
            </nav>
            <div className='change-pwd'>
              <p>Want to change Password?</p>
              <Link to='/admin/change-pwd'>Change!</Link>
            </div>
          </form>
          <div className="all-form-btn">
            {/* <div className="delete-form-btn">
              Delete Account
            </div> */}
            <div className="save-form-btn">
          save
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
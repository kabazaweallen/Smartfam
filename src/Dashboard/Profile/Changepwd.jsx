import React, { useState } from 'react'
import { useJwt } from 'react-jwt'
import axiosclient from '../../axiosClient'
import Notiflix from 'notiflix'

function Changepwd() {
    const[currentpassword,setCurrentPassword]=useState()
    const[newpassword,setNewPassword]=useState()
    const[loading,setLoading]=useState(false)
    const [errors, setErrors] = useState({ newpassword: '', currentpassword: '' });
const loggedUser = localStorage.getItem('Token')
// console.log(loggedUser)
const { decodedToken, isExpired } = useJwt(loggedUser);
// console.log(decodedToken)

const validateForm = () => {
    let valid = true;
    const newErrors = { currentpassword: '', newpassword: '' };

    if (!currentpassword) {
        valid = false;
        newErrors.currentpassword = 'please enter new password';
    }

    if (!newpassword) {
        valid = false;
        newErrors.newpassword= 'please fill new password';
    }

    setErrors(newErrors);
    return valid;
};

const handleUpdatePwd = (e)=>{
    e.preventDefault()
    setLoading(true)
const payload = {currentpassword,newpassword}
if(validateForm()){
    if (decodedToken?.hasOwnProperty('_id')){
        axiosclient.post(`/api/v1/user/changepassword/${decodedToken._id}`,payload).then(()=>{
            // alert('success')
            Notiflix.Notify.success('password changed successfully')
            setTimeout(() => {
                window.location.href= "/admin/Profile"
            }, 2000);
            
        }).catch((error)=>{
            // alert(error)
        })
    }

}else{
setLoading(false)
}



}

  return (
    <div className='cattles-manage-wrapper'>
         <p className='change-pwd-p'> Do you want change password ?</p>
         <form action="" className='change-pwd-form' onSubmit={handleUpdatePwd}>
            <label htmlFor="currentPassword"> Current Password<span>*</span></label>
            <input type="password" onChange={(e)=>setCurrentPassword(e.target.value)} placeholder='current password' />
            <div className="error">{errors.currentpassword}</div>
            <label htmlFor="newPassword">New Password <span>*</span></label>
            <input type="password"  onChange={(e)=>setNewPassword(e.target.value)} placeholder='new-password' /> 
            <div className="error">{errors.newpassword}</div>
            <button className='btn-pwd'>{loading ?(<p> changing password ....</p>):(<>Change password</>)}</button>
         </form>
         

        </div>
  )
}

export default Changepwd
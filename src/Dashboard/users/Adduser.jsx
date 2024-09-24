import React from 'react'
import { useState } from 'react'
import axiosclient from '../../axiosClient';

import Notiflix from 'notiflix';
import { useNavigate } from 'react-router-dom';

const Adduser = ({openModal}) => {
  const[email,setEmail]=useState();
  const[fullNames,setFullNames]=useState();
  const[phoneNumber,setPhoneNumber]=useState();
  const[location,setLocation]=useState();
  const [errors, setErrors]=useState({
    fullNames:"",
    email:"",
    phoneNumber:"",
    location:"",
})
const validateForm = ()=>{
  let valid = true;
  const newErrors = {fullNames,email,phoneNumber,location}
   if(!fullNames){
      valid = false
      newErrors.fullNames = "this field is required"
   }
   if(!email){
      valid = false
      newErrors.email = "this field is required"
   }
   if(!phoneNumber){
      valid = false
      newErrors.phoneNumber = "this field is required"
   }
   if(!location){
      valid = false
      newErrors.location = "this field is required"
   }
   setErrors(newErrors);
      return valid;
}

  const userload={email,fullNames,phoneNumber,location}
  const navigate = useNavigate()
  const handlesubmit = (e)=>{
    e.preventDefault()
    if(validateForm()){
      axiosclient.post('/api/v1/Worker/addWorker',userload).then(()=>{
        //  alert('success')
         Notiflix.Notify.success('worker added successful')
         navigate('/admin/users')
         openModal()
         window.location.reload()
     }).catch((error)=>{
         alert(error)
     })
     }
    }
   


  //  const handleRedirect = ()=>{
    
  //  }
  return (
    <div className="user-modal">
        <div className="adduser-wrapper">
          <form action="" onSubmit={handlesubmit}>
            <div className="dead-wrapper">
              <div className="flex-direction">
                <label htmlFor="">Full Names<span>*</span></label><br />
                <input type="text" placeholder='Full name' onChange={(e) => setFullNames(e.target.value)} />
              </div>
              <div className="flex-direction">
                <label htmlFor="">email<span>*</span></label><br />
              
                <input name="" id="" onChange={(e) => setEmail(e.target.value)} placeholder='email'/>
              </div>
              <div className="flex-direction">
                <label htmlFor="">Location<span>*</span></label><br />
                <input type="text" onChange={(e) => setLocation(e.target.value)} placeholder='location' />
              </div>
              <div className="flex-direction">
                <label htmlFor="">Phone Number<span>*</span></label><br />
                <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} placeholder='phone number' />
              </div>
            </div>
           
            <div className="add-user-btn">
              <button className='btn-delete' onClick={openModal}>Cancel</button>
              <button type='submit' className='btn-edit'>
                Add
              </button>
            </div>

          </form>


        </div>

    
    </div>
   
    
   
  )
}

export default Adduser
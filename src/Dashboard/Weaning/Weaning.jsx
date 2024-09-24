import React, { useState } from 'react'
import axiosclient from '../../axiosClient'
import '../Activities/activities.css'
import { useNavigate } from 'react-router-dom'
import Notiflix from 'notiflix'


function Weaning() {
  const[earTag,setEarTag]=useState()
  const[weaningDate,setWeaningDate]=useState()
  const[WeaningWeight,setWeaningWeight]=useState()
  const[activityType,setActivityType]=useState()
  const[Note,setNote]=useState()
  const[loading, setLoading]=useState(false)
  const payload = {earTag,weaningDate,WeaningWeight,Note,activityType}


  const navigate = useNavigate()
   const handleSubmit = (e)=>{
  e.preventDefault()
  setLoading(true)
axiosclient.post('/api/v1/Activity/recordWeaning',payload).then(({data})=>{
  // console.log(data)
  Notiflix.Notify.success('New Weaning recorded successfull');
  setTimeout(() => {
window.location.href= "/admin/report"
  }, 2000);
}).catch((error)=>{
  Notiflix.Notify.failure('Failed to Add Activity')
})
   
  }
  return (
<div className='cattles-manage-wrapper'>
        <div className="dead-actity-h1">
            <p>Weaning Activity</p>
        </div>
        {loading && (
      <div className='loading-wrapper'>
  <div className='loading-indicator'>
        <span className="loader"></span>
        
           </div>
      </div>
    )}
        <div className="dead-activity-form">
        <div className="edit-cattle-wrapper">
        <form action="" onSubmit={handleSubmit}>
 <div className="dead-wrapper">
  <div className="flex-direction">
  <label htmlFor="">EarTag<span>*</span></label><br/>
            <input type="text" placeholder='earTag' onChange={(e)=>setEarTag(e.target.value)} />
  </div>
  <div className="flex-direction">
  <label htmlFor="">Weaning Weight<span>*</span></label><br/>
            <input type="text" placeholder='weaning weight' onChange={(e)=>setWeaningWeight(e.target.value)} />
  </div>
  <div className="flex-direction">
  <label htmlFor="">weaning Date<span>*</span></label><br/>
            <input type="Date" placeholder='weaning weight' onChange={(e)=>setWeaningDate(e.target.value)} />
  </div>
  <div className="flex-direction">
                <label htmlFor="">Activity Type<span>*</span></label><br />
                <select name="" id="" onChange={(e)=>setActivityType(e.target.value)}>
                        <option value="" disabled selected> select Activity</option>
                        <option value="treatment">treatment</option>
                        <option value="sale">sale</option>
                        <option value="weaning">weaning</option>
                        <option value="newbirth">newbirth</option>
                        <option value="castration">castration</option>
                        <option value="dead">dead</option>
                        <option value="breeding">breeding</option>
                        <option value="pregnancyCheck">pregnancyCheck</option>
                        <option value="dead">promote to bull</option>
                      </select>
              </div>

  </div>
  <div className="tex-note-wrapper">
  <div className="flex-direction">
  <label htmlFor="">Note<span>*</span></label><br/>
            <input type="text" onChange={(e)=>setNote(e.target.value)} placeholder='write something' />
  </div>
  </div>
  <div className="btn-edit-wrapper">
            <button className='btn-delete'>Cancel</button>
            <button type='submit' className='btn-edit'>{loading ?(<>Loading...</>):(<>Save</>)}</button>
              </div>
  
  </form>
  </div>

        </div>
    </div>
    )
}

export default Weaning
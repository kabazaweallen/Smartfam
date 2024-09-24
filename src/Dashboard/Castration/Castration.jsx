import React from 'react'
import { useState } from 'react'
import axiosclient from '../../axiosClient'
import Notiflix from 'notiflix'

function Castration() {
const[earTag,setEarTag]=useState()
const[castrationdMethod,setCastrationMtehod]=useState()
const[CastratedBy,setCatratedBy] = useState()
const[castrationdDate,setCastrationDate]=useState()
const[howItWent,setHowItwent] = useState()
const[loading,setLoading]=useState(false)
const payload = {earTag,castrationdMethod,CastratedBy,castrationdDate,howItWent}
const handlesubmit = (e)=>{
    setLoading(true)
 e.preventDefault()
 axiosclient.post('/api/v1/Activity/recordCastration',payload).then(()=>{
    Notiflix.Notify.success("Activity Recorded successful!");
    setTimeout(() => {
        window.location.href = "/admin/report"
    }, 2000);
}).catch((error)=>{
    Notiflix.Notify.failure('Failed to Add Activity')
})
}

    return (
        <div className='cattles-manage-wrapper'>
        <div className="dead-actity-h1">
            <p>Castration Activty</p>
        </div>
        <div className="dead-activity-form">
            
        <div className="edit-cattle-wrapper">
        <form action="" onSubmit={handlesubmit}>
 <div className="dead-wrapper">
  <div className="flex-direction">
  <label htmlFor="">EarTag<span>*</span></label><br/>
            <input type="text" placeholder='EarTag' onChange={(e)=>setEarTag(e.target.value)} />
  </div>
  <div className="flex-direction">
  <label htmlFor="">Castration Method<span>*</span></label><br/>
        <select name="" id="" onChange={(e)=>setCastrationMtehod(e.target.value)}>
            <option value="fever">natural</option>
            <option value="Accident">AI</option>
            <option value="other"> other</option>
        </select>
  </div>
  <div className="flex-direction">
  <label htmlFor="">Castration Date<span>*</span></label><br/>
        <input type="Date" onChange={(e)=>setCastrationDate(e.target.value)} />
  </div>
  <div className="flex-direction">
  <label htmlFor="">Castrated By<span>*</span></label><br/>
        <input type="text" placeholder='Enter name Here' onChange={(e)=>setCatratedBy(e.target.value)}/>
  </div>
  </div>
  <div className="tex-note-wrapper">
  <div className="flex-direction">
  <label htmlFor="">Note<span>*</span></label><br/>
            <input type="text" onChange={(e)=>setHowItwent(e.target.value)} placeholder='enter note' />
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

export default Castration
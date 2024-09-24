import React from 'react'
import "./sale.css"
import { useState } from 'react'
import axiosclient from '../../axiosClient'
import Notiflix from 'notiflix'

function Sale() {
const[earTag,setEarTag] = useState()
const[SaleDate,setSaleDate]=useState()
const[SalePrice,setSalePrice]=useState()
const[SoldTo,setSoldTo]=useState()
const[notes,setNotes]=useState()
const[activityType,setActivityType]=useState()
const[loading,setLoading]=useState(false)
const [errors, setErrors]=useState({
    earTag:"",
    SaleDate:"",
    SalePrice:"",

    SoldTo:"",
})
const validateForm = ()=>{
    let valid = true;
    const newErrors = {earTag,SaleDate,SalePrice,SoldTo}
     if(!earTag){
        valid = false
        newErrors.earTag = "this field is required"
     }
     if(!SaleDate){
        valid = false
        newErrors.SaleDate = "sale datefield is required"
     }
     if(!SalePrice){
        valid = false
        newErrors.SalePrice = "sale Price is required"
     }
     if(!SoldTo){
        valid = false
        newErrors.SoldTo = "this field is required"
     }
     setErrors(newErrors);
        return valid;
}


const handleCancel = ()=>{
    window.location.href = '/admin'
}

const payload = {earTag,SaleDate,SalePrice,SoldTo,notes,activityType}
const handleSubmit = (e)=>{
e.preventDefault()
setLoading(true)
if(validateForm()){
    axiosclient.post('/api/v1/Activity/recordSales',payload).then(()=>{
        // alert('success')
        Notiflix.Notify.success('activity added successfully')
        setTimeout(() => {
            window.location.href="/admin/report"
        }, 2000);
    }).catch((error)=>{
        Notiflix.Notify.failure('Failed to Add Activity')
    })
}
else{
    setLoading(false)
}
}
    return (
        <div className='cattles-manage-wrapper'>
        <div className="dead-actity-h1">
            <p>New sale Activty</p>

        </div>
        <div className="dead-activity-form">   
        <div className="edit-cattle-wrapper">
        <form action="" onSubmit={handleSubmit}>
 <div className="dead-wrapper">
  <div className="flex-direction">
  <label htmlFor="">EarTag<span>*</span></label><br/>
  <div className="error">{errors.earTag}</div>
            <input type="text" placeholder='EarTag'  onChange={(e)=>setEarTag(e.target.value)}/>
  </div>
  <div className="flex-direction">
  <label htmlFor="">Sales date<span>*</span></label><br/>
  <div className="error">{errors.SaleDate}</div>
  <input type="Date" onChange={(e)=>setSaleDate(e.target.value)} />
  </div>
  <div className="flex-direction">
  <label htmlFor="">Sale amount<span>*</span></label><br/>
  <div className="error">{errors.SalePrice}</div>
  <input type="text" placeholder='amount sold' onChange={(e)=>setSalePrice(e.target.value)} />
  </div>
  <div className="flex-direction">
  <label htmlFor="">Sold to<span>*</span></label><br/>
  <div className="error">{errors.SoldTo}</div>
  <input type="text" placeholder='Enter name' onChange={(e)=>setSoldTo(e.target.value)} />
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
            <input type="text" placeholder='write note here'  onChange={(e)=>setNotes(e.target.value)}/>
  </div>
 
  </div>
  <div className="btn-edit-wrapper">
            <button onClick={handleCancel} type='button' className='btn-delete'>Cancel</button>
            <button type='submit' className='btn-edit'>{loading ?(<>Loading...</>):(<>Save</>)}</button>
              </div>
  </form>
  </div>

        </div>
    </div>
    )
}

export default Sale
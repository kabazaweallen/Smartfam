import React from 'react'
import "./Weight.css"
import { useState } from 'react'
import axiosclient from '../../axiosClient'
import Notiflix from 'notiflix'

function Weight() {

const[earTag,setEarTag]=useState()
const[breedingDate,setBreedingDate]=useState()
const[methodOfBreeding,setMethodOfBreeding] = useState()
const[endDate,setEndDate] = useState()
const[loading,setLoading]=useState(false)
const [errors, setErrors]=useState({
  earTag:"",
  breedingDate:"",
  methodOfBreeding:"",
  endDate:"",
})

const validateForm = ()=>{
  let valid = true;
  const newErrors = {earTag,breedingDate,methodOfBreeding,endDate}
   if(!earTag){
      valid = false
      newErrors.earTag = "this field is required"
   }
   if(!breedingDate){
      valid = false
      newErrors.SaleDate = "this field is required"
   }
   if(!methodOfBreeding){
      valid = false
      newErrors.methodOfBreeding = "this field  is required"
   }
   if(!endDate){
      valid = false
      newErrors.endDate = "this field is required"
   }
   if(!breedingDate){
    valid = false
    newErrors.breedingDate = "this field is required"
 }
   setErrors(newErrors);
      return valid;
}

const handleCancel = ()=>{
  window.location.href = '/admin'
}

const payload = {earTag,breedingDate,methodOfBreeding,endDate}
const handleSubmit = (e)=>{
 e.preventDefault()
 setLoading(true)
 if(validateForm()){
  axiosclient.post('/api/v1/Activity/recordBreeding',payload).then(()=>{
    Notiflix.Notify.success("Dead activity Recorded successful!");
    setTimeout(() => {
      window.location.href = "/admin/report"
    }, 2000);

  }).catch((error)=>{
    Notiflix.Notify.failure('Failed to Add Activity')
  })
 }

}

  return (
    <div className='cattles-manage-wrapper'>
    <div className="dead-actity-h1">
        <p> Breeding Activty</p>
    </div>
    <div className="dead-activity-form">
        
    <div className="edit-cattle-wrapper">
    <form action="" onSubmit={handleSubmit}>
<div className="dead-wrapper">
<div className="flex-direction">
<label htmlFor="">EarTag<span>*</span></label><br/>
<div className="error">{!earTag &&(errors.earTag)}</div>
        <input type="text" placeholder='EarTag' onChange={(e)=>setEarTag(e.target.value)} />
</div>
<div className="flex-direction">
<label htmlFor="">Breeding Method<span>*</span></label><br/>
    <select name="" id="" onChange={(e)=>setMethodOfBreeding(e.target.value)}>
        <option value="Artificial">Artificial Breeding</option>
        <option value="Natural">Natural</option>
        <option value="other"> other</option>
    </select>
</div>

<div className="flex-direction">
<label htmlFor="">Breeding Date<span>*</span></label><br/>
<div className="error">{ !breedingDate && (errors.breedingDate)}</div>
        <input type="date" onChange={(e)=>setBreedingDate(e.target.value)} />
</div>
<div className="flex-direction">
<label htmlFor="">Breeding End date<span>*</span></label><br/>
<div className="error">{ errors.endDate}</div>
        <input type="date" onChange={(e)=>setEndDate(e.target.value)}/>
</div>
</div>
<div className="tex-note-wrapper">
<div className="flex-direction">
<label htmlFor="">Note<span>*</span></label><br/>
        <input type="text" placeholder='enter note' />
</div>
</div>
<div className="btn-edit-wrapper">
        <button type='button' onClick={handleCancel} className='btn-delete'>Cancel</button>
        <button type='submit' className='btn-edit'>{loading?(<>Loading...</>):(<>save</>)}</button>
          </div>

</form>
</div>

    </div>
</div>
  )
}

export default Weight
import React, { useState } from 'react'
import axiosclient from '../../axiosClient'
import Notiflix from 'notiflix'

function PastureAdd() {

const[pastureName,setPastureName]=useState()
const[Owner,setOwner]=useState()
const[area,setArea]=useState()
const[numberOfCattles,setNumberOfcattles]=useState()
const[loading,setLoading]=useState(false)
const [errors, setErrors] = useState({ pastureName: '', Owner: '',area:'' });
const payload = {pastureName,Owner,area,numberOfCattles}


 const validateForm = () => {
        let valid = true;
        const newErrors = { pastureName: '', Owner: '',area:'' };

        if (!pastureName) {
            valid = false;
            newErrors.pastureName = 'this field  is required';
        }

        if (!Owner) {
            valid = false;
            newErrors.Owner = 'this field is required';
        }
        
        if (!area) {
          valid = false;
          newErrors.area = 'this field is required';
      }

        setErrors(newErrors);
        return valid;
    };


const handleSubmit = (e)=>{
e.preventDefault()
setLoading(true)
if (validateForm()) {
  axiosclient.post('/api/v1/pasture/addPasture',payload).then(()=>{
    Notiflix.Notify.success('pasture Added succesfully')
    setTimeout(() => {
        window.location.href ="/admin/pasture"
    }, 3000);
    }).catch((error)=>{
      Notiflix.Notify.failure('failed to add pasture')
    })
}
else{
  setLoading(false)
}

}

  return (
    <div className='cattles-manage-wrapper'>
    <div className="dead-actity-h1">
        <p>Add Pature</p>
    </div>
    <div className="dead-activity-form">
    <div className="edit-cattle-wrapper">
    {loading && (
    <div className='loading-wrapper'>
    <div className='loading-indicator'>
      <span class="loader"></span>
         </div>
    </div>
  )}
    <form action="" onSubmit={handleSubmit}>
<div className="dead-wrapper">
<div className="flex-direction">
<label htmlFor="">Pasture Name<span>*</span></label><br/>
        <input type="text" placeholder='Pasture Name' onChange={(e)=>setPastureName(e.target.value)} />
        <div className="error">{errors.pastureName}</div>
</div>
<div className="flex-direction">
<label htmlFor="">Pasture Owner<span>*</span></label><br/>
        <input type="text" placeholder='pasture owner'  onChange={(e)=>setOwner(e.target.value)}/>
        <div className="error">{errors.Owner}</div>
</div>

<div className="flex-direction">
<label htmlFor="">Pasture area<span>*</span></label><br/>
        <input type="text" placeholder='pasture size' onChange={(e)=>setArea(e.target.value)} />
        <div className="error">{errors.area}</div>
</div>
<div className="flex-direction">
<label htmlFor="">Number of Cattles<span>*</span></label><br/>
        <input type="text" placeholder='number of cattles' onChange={(e)=>setNumberOfcattles(e.target.value)} />
</div>
</div>
<div className="btn-edit-wrapper">
        <button type='button' className='btn-delete'>Cancel</button>
        <button type='submit' className='btn-edit'>{loading?(<>loading...</>):(<>Add</>)}</button>
          </div>
</form>
</div>
    </div>
</div>
  )
}

export default PastureAdd
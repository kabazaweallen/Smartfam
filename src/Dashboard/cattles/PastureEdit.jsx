import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosclient from '../../axiosClient'
import Notiflix from 'notiflix'

function PastureEdit() {
const {_id} = useParams()
const[loading,setLoading]=useState(false)
const [pasture,setPasture] = useState({
    _id : "null",
    pastureName:"",
    Owner:"",
    area:"",
    numberOfCattles:50

})


if(_id){
 useEffect(()=>{
    axiosclient.get(`/api/v1/pasture/getPastureById/${_id}`).then(({data})=>{
        console.log(data.data)
        setPasture(data)
    }).catch((err)=>{
        console.log(err)
    })
 },[_id])

}

const handleSubmit = (e)=>{
    e.preventDefault()
const payload = {...pasture}
setLoading(true)
if(pasture._id){
    axiosclient.put(`/api/v1/pasture/updatePasture/${pasture._id}`,payload).then(()=>{
        Notiflix.Notify.success('pasture Edited succesfully')
        setTimeout(() => {
            window.location.href ="/admin/pasture"
        }, 3000);
       
    }).catch((err)=>{
        // alert(err)
        //Notiflix.Notify.failure('failed to updated try again')
    })
}
}
const handleRedirect=()=>{
    window.location.href='/admin/Pasture'
}
  return (
    <div className='cattles-manage-wrapper'>
    <div className="dead-actity-h1">
        <p>Edit Pature</p>
    </div>
    <div className="dead-activity-form">
        
    <div className="edit-cattle-wrapper">
    <form action="" onSubmit={handleSubmit}>
<div className="dead-wrapper">
<div className="flex-direction">
<label htmlFor="">Pasture Name<span>*</span></label><br/>
        <input type="text" placeholder='Pasture Name' value={pasture.pastureName} onChange={(e)=>setPasture({...pasture,pastureName:e.target.value})} />
</div>
<div className="flex-direction">
<label htmlFor="">Pasture Owner<span>*</span></label><br/>
        <input type="text" placeholder='pasture owner' value={pasture.Owner} onChange={(e)=>setPasture({...pasture,Owner:e.target.value})}/>
</div>

<div className="flex-direction">
<label htmlFor="">Pasture area<span>*</span></label><br/>
        <input type="text" placeholder='pasture size' value={pasture.area} onChange={(e)=>setPasture({...pasture,area:e.target.value})} />
</div>
<div className="flex-direction">
<label htmlFor="">Number of Cattles<span>*</span></label><br/>
        <input type="text" placeholder='number of cattles' value={pasture.numberOfCattles} onChange={(e)=>setPasture({...pasture,numberOfCattles:e.target.value})} />
</div>

</div>
<div className="btn-edit-wrapper">
        <button type='button' onClick={handleRedirect} className='btn-delete'>Cancel</button>
        <button type='submit' className='btn-edit'> {loading ?(<>Loading...</>):(<>Update</>)}</button>
          </div>

</form>
</div>

    </div>
</div>
  )
}

export default PastureEdit
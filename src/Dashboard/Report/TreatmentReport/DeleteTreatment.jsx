import React, { useState } from 'react'
import axiosclient from '../../../axiosClient'
import Notiflix from 'notiflix'

function DeleteTreatment({openDelete,treatment}) {
  const[loading,setLoading]=useState(false)
    const handeleDelete = ()=>{
 
      setLoading(true)
        axiosclient.delete(`/api/v1/Activity/deleteActivity/${treatment._id}`).then(()=>{
          Notiflix.Notify.success('Report deleted succesfully')
          //window.location.href = "/admin/cattles"
          setTimeout(()=>{
            window.location.reload()
          },2000)
         
        }).catch((error)=>{
          Notiflix.Notify.failure('failed to delete rep0rt')
        })
       }
  return (
<div className='activity-model-wrapper'>
      <div className="delete-body">
        <h2>Treatment Report delete</h2>
        <p>are you sure you want to delete this report ?  </p>
        <div className="modal-footer">
          <div className="modal-btn">
            <button type='button' onClick={openDelete} className='btn-cancel'>Cancel</button>
            <button className='btn-ok' onClick={handeleDelete}>{loading?(<>Loading...</>):(<>save</>)}</button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default DeleteTreatment
import React, { useState } from 'react'
import axiosclient from '../../axiosClient'
import Notiflix from 'notiflix';
function DeletCattle({ openDelete, cow }) {
const [loading,setLoading]=useState(false)
 const handeleDelete = ()=>{
  setLoading(true)
  axiosclient.delete(`/api/v1/createCow/deleteCow/${cow._id}`).then(()=>{
    Notiflix.Notify.success('cow deleted succesfully')
    //window.location.href = "/admin/cattles"
    setTimeout(()=>{
      window.location.reload()
    },2000)
  }).catch((error)=>{
    alert(error)
    //  console.log(error)
  })
 }

  return (
    <div className='activity-model-wrapper'>
      <div className="delete-body">
        <h2>Cattle delete</h2>
        <p>are you sure you want to delete this cattle </p>
        <div className="modal-footer">
          <div className="modal-btn">
            <button type='button' onClick={openDelete} className='btn-cancel'>Cancel</button>
            <button className='btn-ok' onClick={handeleDelete}>{loading ?(<>loading...</>):(<>Ok</>)}</button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default DeletCattle
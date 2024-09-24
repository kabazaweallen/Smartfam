import React, { useState } from 'react'
import axiosclient from '../../axiosClient'
import Notiflix from 'notiflix'

function DeleteFinancial({item,openDelete}) {
  const[loading,setLoading]=useState(false)
    const handeleDelete = ()=>{
     
 setLoading(true)
        axiosclient.delete(`/api/v1/financial/deleteFinancial/${item._id}`).then(()=>{
          Notiflix.Notify.success('Financial deleted succesfully')
          //window.location.href = "/admin/cattles"
          setTimeout(()=>{
            window.location.reload()
          },2000)
         
        }).catch((error)=>{
          alert(error)
        })
       }
    
  return (
    <div className='activity-model-wrapper'>
    <div className="delete-body">
      <h2>Pregnancy check Report delete</h2>
      <p>are you sure you want to delete this report ?  </p>
      <div className="modal-footer">
        <div className="modal-btn">
          <button type='button' className='btn-cancel'>Cancel</button>
          <button className='btn-ok' onClick={handeleDelete}> {loading ? (<>loading...</>):(<>Ok</>)}</button>
        </div>
      </div>
    </div>
    
  </div>
  )
}

export default DeleteFinancial
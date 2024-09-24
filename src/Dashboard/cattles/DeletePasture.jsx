import Notiflix from 'notiflix'
import React, { useState } from 'react'
import axiosclient from '../../axiosClient'

function DeletePasture({openDelete,pasture}) {
const[loading,setLoading]=useState(false)

    const handeleDelete = ()=>{
      setLoading(true)
        axiosclient.delete(`/api/v1/pasture/deletePasture/${pasture._id}`).then(()=>{
          Notiflix.Notify.success('Pasture deleted succesfully')
          //window.location.href = "/admin/cattles"
          setTimeout(()=>{
            window.location.reload()
          },2000)
         
        }).catch((error)=>{
          // alert(error)
        })
       }
  return (
    <div className='activity-model-wrapper'>
    <div className="delete-body">
      <h2>Delete Pasture</h2>
      <p>are you sure you want to delete this Pasture <span>{pasture.pastureName}</span> </p>
      <div className="modal-footer">
        <div className="modal-btn">
          <button type='button' onClick={openDelete} className='btn-cancel'>Cancel</button>
          <button className='btn-ok' onClick={handeleDelete}>{loading?(<>loading...</>):(<>ok</>)}</button>
        </div>
      </div>
    </div>
    
  </div>
  )
}

export default DeletePasture
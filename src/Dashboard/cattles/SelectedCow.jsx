import React, { useState } from 'react'
import { AiOutlineFilter } from 'react-icons/ai'

function SelectedCow({cow,openActivity,openDelete}) {
 
   
  return (
    <div className="sort-by">
   <div>
      <p className='sorts'>Cattle selected </p>
      
      </div>
    <div className="sort-status-type">
      <button className='btn-sort' onClick={openActivity} > Select activity</button>
      <button className='btn-sort'> Select all</button>
      <button className='btn-deletee' onClick={openDelete}> Delete</button>
    </div>
    <div className="filter-search">
      <input type="text" name='search' placeholder='search by ear'  />
      <button className='btn-filter'>  <AiOutlineFilter/></button>
    </div>
    </div>
  )
}

export default SelectedCow
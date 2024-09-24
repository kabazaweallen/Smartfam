import React from 'react'
import { AiOutlineFilter } from 'react-icons/ai'

function SelectedPasture({openDelete}) {
  return (
    <div className="sort-by">
    <div>
       <p className='sorts'>Pasture selected </p>
       </div>
     <div className="sort-status-type">
       <button className='btn-deletee' onClick={openDelete}> Delete</button>
       <button className='btn-sort'> Cancel</button>
     </div>
     <div className="filter-search">
       <input type="text" name='search' placeholder='search by name'  />
       <button className='btn-filter'>  <AiOutlineFilter/></button>
     </div>
     </div>
  )
}

export default SelectedPasture
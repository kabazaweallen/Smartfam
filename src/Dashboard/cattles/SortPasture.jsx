import React from 'react'
import { AiOutlineFilter } from 'react-icons/ai'
import { FaSort } from 'react-icons/fa'

function SortCattle() {
  return (
    <div className="sort-by">
    <div className="sort-status-type">
    <p className='sort'>Sort By</p>
      <button className='btn-sort'> Last Modified <FaSort/></button>
      <button className='btn-sort'> Most Cow<FaSort/></button>
      <button className='btn-sort'> Large Area <FaSort/></button>
      
    </div>

    <div className="filter-search">
      <input type="text" name='search' placeholder='search Pasture'  />
      <button className='btn-filter'>  <AiOutlineFilter/></button>
    </div>
    </div>
  )
}

export default SortCattle
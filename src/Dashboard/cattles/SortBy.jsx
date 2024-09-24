import React, { useState } from 'react'
import { AiOutlineFilter } from 'react-icons/ai'
import { FaSort } from 'react-icons/fa'

function SortBy({onSearch}) {
  const[searchText,setSearchText]=useState('')

  const handleInputChange = (ev)=>{
    const text = event.target.value;
    setSearchText(text)
    onSearch(text)
  }
  return (
    <div className="sort-by">
      <div className="sort-status-type">
      <p className='sort'>Sort By</p>
        <button className='btn-sort'> Ear tag <FaSort/></button>
        <button className='btn-sort'> Type <FaSort/></button>
        <button className='btn-sort'> status <FaSort/></button>
      </div>

      <div className="filter-search">
        <input type="text" name='search' value={searchText} placeholder='search by ear' onChange={handleInputChange}  />
        <button className='btn-filter'>  <AiOutlineFilter/></button>
      </div>
      </div>
  )
}

export default SortBy
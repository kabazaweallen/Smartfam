import React from 'react'
import "./Filter.css"
import { AiOutlineFilter } from 'react-icons/ai'
import { IoSearch } from "react-icons/io5";



function Filter() {
    return (
        <div className="filter-search-treatment">
            <IoSearch className='search-icons'/>
            <input type="text" name='search' placeholder='Search' />
            <button className='btn-filter-treatment'>
                <AiOutlineFilter/>
             </button>
        </div>
    )
}

export default Filter
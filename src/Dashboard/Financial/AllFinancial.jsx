import React from 'react'
import axiosclient from '../../axiosClient'
import "../../contexts/ContexProvider"
import { FaEdit, FaSort, FaTrash } from "react-icons/fa";
import { usestateContext } from '../../contexts/ContexProvider'
import { useEffect } from 'react';
import { toFormData } from 'axios';
import { useState } from 'react';
import SelectedReport from '../Report/TreatmentReport/SelectedReport';
import DeleteFinancial from './DeleteFinancial';
import { AiOutlineFilter } from 'react-icons/ai';
function AllFinancial() {
   const[fetchFinancial,setFetchfinancial]=useState([]) 
   const [selectedReport,setSelectedReport]=useState(null)
   const[deletee,setDeletee]=useState(false)
   const[isSelected,setIsSelected]=useState(false)
   const[pageNumber,setPageNumber]=useState(0)
    const userPerpage =10
    const pageVisited =pageNumber * userPerpage 

    useEffect(()=>{
      axiosclient.get('/api/v1/financial/getFinancial').then(({data})=>{
        console.log(data)
        setFetchfinancial(data.data)
      }).catch((error)=>{
        alert(error)
      })
    },[])


    function openSelected(){
      setIsSelected((previsSelected)=>!previsSelected)
    }
    function openSelectedReport (item){
    setSelectedReport(item)
      openSelected()
    }
    
    function openDelete(){
      setDeletee(!deletee)
    }
    

    const displayUser = fetchFinancial.slice(pageVisited,pageVisited + userPerpage)?.map((item) => (
      <tr key={item._id}>
        <td><input type="checkbox" onClick={()=>openSelectedReport(item)} /></td>
        <td>{item.financeType}</td>
        <td>{item.litresSold} Rwf</td>
        <td>{item.paymentDate}</td>
        <td>{item.amount}</td>
        <td>{item.dateOfRecord}</td>
        {/* <td>{item.administrator}</td> */}
      </tr>
    ))
    const pageCount = Math.ceil(fetchFinancial.length/userPerpage)
  const changePage = ({selected})=>{
  setPageNumber(selected)
  }
    

  return (
    <>
    <div>

    {deletee &&<DeleteFinancial item={selectedReport} openDelete={openDelete}/>}
    {isSelected? <SelectedReport openDelete={openDelete}/>:(
        <div className='sort-by'>
        <div></div> 
  <div className="filter-search">
  <input type="text" name='search' placeholder='search'  />
  <button className='btn-filter'>  <AiOutlineFilter/></button>
</div>
</div>
      )}
       <div   className="report-table-wrapper text-left">
      <table className='tables-report'>
          <thead>
            <tr>
              <th>
                <div className="flex-th">
                  <p>Select</p>
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Sales type</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>sold amount</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Payment Date</p>
                  <FaSort />
                </div>
              </th>
            
              <th>
                <div className="flex-th">
                  <p>sold to</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>date of record</p>
                  <FaSort />
                </div>
              </th>
              {/* <th>
                <div className="flex-th">
                  <p>Administartor</p>
                  <FaSort />
                </div>
              </th> */}
            </tr>

          </thead>
          <tbody>
          {displayUser}
          </tbody>
        </table>
        </div>
  </div>
  </>
  )
}

export default AllFinancial
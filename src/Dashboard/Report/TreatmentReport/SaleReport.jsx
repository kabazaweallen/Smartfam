import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineFilter } from 'react-icons/ai'
import axiosclient from '../../../axiosClient'
import { FaSort } from 'react-icons/fa'
import treatment from '../../Treatment/treatment'
import ReactPaginate from 'react-paginate'
import { useReactToPrint } from 'react-to-print';
import SelectedPasture from '../../cattles/SelectedPasture'
import SelectedReport from './SelectedReport'
import DeleteReport from './DeleteReport'
function SaleReport() {
const [sales,setSales] = useState([])
const[loading,setLoading] =useState(true)
const [selectedReport,setSelectedReport]=useState(null)
const[deletee,setDeletee]=useState(false)
const[isSelected,setIsSelected]=useState(false)
const[pageNumber,setPageNumber]=useState(0)
 const userPerpage =10
 const pageVisited =pageNumber * userPerpage 


useEffect(()=>{
    axiosclient.get('/api/v1/Report/getSales').then(({data})=>{
        setSales(data.data)
        // console.log(data.data)
        setLoading(false)
    }).catch((err)=>{
        setLoading(true)
    })
},[])

function openSelected(){
    setIsSelected((previsSelected)=>!previsSelected)
  }
  function openSelectedReport (sale){
  setSelectedReport(sale)
    openSelected()
  }
  
  function openDelete(){
    setDeletee(!deletee)
  }


const displayUser = sales.slice(pageVisited,pageVisited + userPerpage)?.map((sale)=>(
    <tr key={sale._id}>
        <td><input type="checkbox" onClick={()=>openSelectedReport(sale)} name="" id="" /></td>
        <td>{sale.earTag}</td>
        <td>{sale.SaleDate}</td>
        <td>{sale.SalePrice}Rwf</td>
        <td>{sale.activityType}</td>
    </tr>
))

const pageCount = Math.ceil(sales.length/userPerpage)
const changePage = ({selected})=>{
setPageNumber(selected)
}

const ComponentPDF=useRef()
 const generatePDF = useReactToPrint ({
  content:()=>ComponentPDF.current, 
  documentTitle:"CattleSaleReport",

 })
  return (
    <div className='cattles-manage-wrapper'>
    <div className="report-title-wrapper">
      <p> Sale Report</p>
      <div className="download-button">
         <button onClick={generatePDF} className='btn-download'> Download Report</button>
      </div>
    </div>
    {deletee &&<DeleteReport sale={selectedReport} openDelete={openDelete}/>}
    <div className="sort-by-wrapper">
      {isSelected? <SelectedReport openDelete={openDelete}/>:(
        <div className='sort-by'>
        <div></div> 
  <div className="filter-search">
  <input type="text" name='search' placeholder='search'  />
  <button className='btn-filter'>  <AiOutlineFilter/></button>
</div>
</div>
      )}
  
    </div>
    {loading && (
      <div className='loading-wrapper'>
  <div className='loading-indicator'>
        <span className="loader"></span>
        
           </div>
      </div>
    )}
<div className="report-table-wrapper text-left">
<div ref={ComponentPDF} >
    <table className='tables-report'>
        <thead>
            <tr>
            <th>
            <div className="flex-th">
                <FaSort/>
            </div>
            </th>
            <th>
            <div className="flex-th">
                <p>Eart tag</p>
                <FaSort/>
            </div>
            </th>
            <th>
            <div className="flex-th">
                <p>Sale Date</p>
                <FaSort/>
            </div>
            </th>
            <th>
            <div className="flex-th">
                <p> Sold amount</p>
                <FaSort/>
            </div>
            </th>
            <th>
            <div className="flex-th">
                <p>activity</p>
                <FaSort/>
            </div>
            </th>
            </tr>
        </thead>
        <tbody>
        {displayUser}
        </tbody>
    </table>
    </div>
</div>
<ReactPaginate
 previousLabel={"previous"}
 nextLabel={"next"}
 pageCount={pageCount}
 onPageChange={changePage}
 containerClassName={"paginationBttns"}
 previousLinkClassName={"previousBttn"}
 nextLinkClassName={"nextBttn"}
 disabledClassName={"paginationDisabled"}
 activeClassName={"paginationActive"}
 />

  </div >
  )
}

export default SaleReport
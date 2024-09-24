import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { GiUnbalanced } from 'react-icons/gi'
import { HiOutlineDocumentChartBar } from 'react-icons/hi2'
import Filter from '../Filter/Filter'
import { FaEdit, FaSort, FaTrash } from 'react-icons/fa'
import axiosclient from '../../../axiosClient'
import { AiOutlineFilter } from 'react-icons/ai'
import { useReactToPrint } from 'react-to-print'
import ReactPaginate from 'react-paginate'
import SelectedReport from '../TreatmentReport/SelectedReport'
import DeletePregnancy from './DeletePreginancy'



function PregnancyReport() {
  const [pregnancy, setPregnancy] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReport,setSelectedReport]=useState(null)
  const[deletee,setDeletee]=useState(false)
  const[isSelected,setIsSelected]=useState(false)
  const[pageNumber,setPageNumber]=useState(0)
   const userPerpage =10
   const pageVisited =pageNumber * userPerpage 

const displayUser = pregnancy.slice(pageVisited,pageVisited + userPerpage)?.map((preg) => (
    <tr key={preg._id}>
       <td><input type="checkbox" name="" id="" onClick={()=>openSelectedReport(preg)} /></td>
      <td>{preg.earTag}</td>
      <td>{preg.checkDate}</td>
      <td>{preg.method}</td>
      <td>{preg.result}</td>

    </tr>
  ))

  useEffect(() => {
    axiosclient.get('/api/v1/Report/getPagination').then(({ data }) => {
      setPregnancy(data.data)
      console.log(data.data)
      setLoading(false)
    }).catch((err) => {
      setLoading(true)
    })
  }, [])

  const pageCount = Math.ceil(pregnancy.length/userPerpage)
  const changePage = ({selected})=>{
  setPageNumber(selected)
  }
  
  function openSelected(){
    setIsSelected((previsSelected)=>!previsSelected)
  }
  function openSelectedReport (preg){
  setSelectedReport(preg)
    openSelected()
  }
  
  function openDelete(){
    setDeletee(!deletee)
  }


  // function to print report


  const ComponentPDF = useRef()
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "PregnancyReport",
    // onAfterPrint: () => {
    //   Notiflix.Notify.success("Report downladed succesfully");
    // }
  })
  return (
    <div className='cattles-manage-wrapper'>
      <div className="report-title-wrapper">
        <p>Pregnancy Check Report</p>
        <div className="download-button">
          <button onClick={generatePDF} className='btn-download'> Download Report</button>
        </div>
      </div>
      {deletee &&<DeletePregnancy preg={selectedReport} openDelete={openDelete}/>}
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

      <div ref={ComponentPDF} className="report-table-wrapper text-left">
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
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Check Date</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Method</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Result</p>
                  <FaSort />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayUser}
          </tbody>

        </table>
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

export default PregnancyReport
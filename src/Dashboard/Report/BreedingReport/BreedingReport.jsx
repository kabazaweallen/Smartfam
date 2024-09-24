import React, { useEffect, useRef, useState } from 'react'
import { GiUnbalanced } from 'react-icons/gi'
import { HiOutlineDocumentChartBar } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Filter from '../Filter/Filter'
import { AiOutlineFilter } from 'react-icons/ai'
import axiosclient from '../../../axiosClient'
import { FaSort } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'
import ReactPaginate from 'react-paginate'
import DeleteBreeding from './DeleteBreeding'
import SelectedReport from '../TreatmentReport/SelectedReport'


function BreedingReport() {
  const [breedings, setBreedings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReport,setSelectedReport]=useState(null)
  const[deletee,setDeletee]=useState(false)
  const[isSelected,setIsSelected]=useState(false)
  const[pageNumber,setPageNumber]=useState(0)
   const userPerpage =10
   const pageVisited =pageNumber * userPerpage 



   const displayUser = breedings.slice(pageVisited,pageVisited + userPerpage)?.map((breeding) => (
    <tr key={breeding._id}>
      <div>
      <input type="checkbox" onClick={()=>openSelectedReport(breeding)} />
      </div>
      
      <td>{breeding.earTag}</td>
      <td>{breeding.breedingDate}</td>
      <td>{breeding.methodOfBreeding}</td>
      <td>{breeding.endDate}</td>
      <td>{breeding.activityType}</td>
    </tr>
  ))

  useEffect(() => {
    axiosclient.get('/api/v1/Report/getBreeding').then(({ data }) => {
      setBreedings(data.data)
      // console.log(data.data)
      setLoading(false)
    }).catch((err) => {
      setLoading(true)
    })
  }, [])


  const pageCount = Math.ceil(breedings.length/userPerpage)
  const changePage = ({selected})=>{
  setPageNumber(selected)
  }
  
  function openSelected(){
    setIsSelected((previsSelected)=>!previsSelected)
  }
  function openSelectedReport (breeding){
  setSelectedReport(breeding)
    openSelected()
  }
  
  function openDelete(){
    setDeletee(!deletee)
  }


  // function to print report
  const ComponentPDF = useRef()
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "BreedingReport",
    // onAfterPrint: () => {
    //   Notiflix.Notify.success("Report downladed succesfully");
    // }
  })

  return (
    <div className='cattles-manage-wrapper'>
      <div className="report-title-wrapper">
        <p> Breeding Report</p>
        <div className="download-button">
          <button className='btn-download' onClick={generatePDF}> Download Report</button>
        </div>
      </div>
      {deletee &&<DeleteBreeding breeding={selectedReport} openDelete={openDelete}/>}
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
                  <p>Select</p>
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
                  <p>Breeding Date</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Breeding Method</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Estimated End Date</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Activity</p>
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

export default BreedingReport
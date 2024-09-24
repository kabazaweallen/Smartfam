import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineDocumentChartBar } from 'react-icons/hi2'
import Filter from '../Filter/Filter'
import { AiOutlineFilter } from 'react-icons/ai'
import axiosclient from '../../../axiosClient'
import { FaSort } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'
import SelectedReport from '../TreatmentReport/SelectedReport'
import ReactPaginate from 'react-paginate'
import DeleteDeathReport from './DeleteDeadReport'



function DeadReport() {
  const [deathReport, setDeathReport] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReport,setSelectedReport]=useState(null)
const[deletee,setDeletee]=useState(false)
const[isSelected,setIsSelected]=useState(false)
const[pageNumber,setPageNumber]=useState(0)
 const userPerpage =10
 const pageVisited =pageNumber * userPerpage 

  useEffect(() => {
    axiosclient.get('/api/v1/Report/getDeadCow').then(({ data }) => {

      // console.log(data.data)
      setDeathReport(data.data)
      setLoading(false)
    }).catch((err) => {
      setLoading(true)
    })
  }, [])
  const displayUser = deathReport.slice(pageVisited,pageVisited + userPerpage)?.map((death) => (
    <tr key={death._id}>
      <td><input type="checkbox" onClick={()=>openSelectedReport(death)} /></td>
      <td>{death.earTag}</td>
      <td>{death.DeathDate}</td>
      <td>{death.deathCause}</td>
      <td>{death.Notes}</td>
      <td>{death.activityType}</td>
    </tr>
  ))
  const pageCount = Math.ceil(deathReport.length/userPerpage)
const changePage = ({selected})=>{
setPageNumber(selected)
}

function openSelected(){
  setIsSelected((previsSelected)=>!previsSelected)
}
function openSelectedReport (death){
setSelectedReport(death)
  openSelected()
}

function openDelete(){
  setDeletee(!deletee)
}


  const ComponentPDF = useRef()
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "Dead-Report",
    // onAfterPrint: () => {
    //   Notiflix.Notify.success("Report downladed succesfully");
    // }
  })

  return (
    <div className='cattles-manage-wrapper'>
      <div className="report-title-wrapper">
        <p> New Birth Report</p>
        <div className="download-button">
          <button className='btn-download' onClick={generatePDF} > Download Report</button>
        </div>
      </div>
      {deletee &&<DeleteDeathReport death={selectedReport} openDelete={openDelete}/>}
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
                  <p>Dead Date</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Death Cause</p>
                  <FaSort />
                </div>
              </th>
            
              <th>
                <div className="flex-th">
                  <p>Note</p>
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

export default DeadReport
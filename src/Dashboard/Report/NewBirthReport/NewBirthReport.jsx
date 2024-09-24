import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineDocumentChartBar } from 'react-icons/hi2'
import Filter from '../Filter/Filter'
import { AiOutlineFilter } from 'react-icons/ai'
import axiosclient from '../../../axiosClient'
import { FaSort } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'
import SelectedReport from '../TreatmentReport/SelectedReport'
import ReactPaginate from 'react-paginate'
import DeleteBirth from './DeleteBirth'



function NewBirthReport() {
  const [newBirth, setNewBirth] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReport,setSelectedReport]=useState(null)
const[deletee,setDeletee]=useState(false)
const[isSelected,setIsSelected]=useState(false)
const[pageNumber,setPageNumber]=useState(0)
 const userPerpage =10
 const pageVisited =pageNumber * userPerpage 
 const displayUser = newBirth.slice(pageVisited,pageVisited + userPerpage)?.map((birth) => (
  <tr key={birth._id}>
    <td><input type="checkbox" onClick={()=>openSelectedReport(birth)} /></td>
    <td>{birth.earTag}</td>
    <td>{birth.BirthDate}</td>
    <td>{birth.BirthWeight}</td>
    <td>{birth.Notes}</td>
    <td>{birth.activityType}</td>
  </tr>
))
  useEffect(() => {
    axiosclient.get('/api/v1/Report/getNewbirth').then(({ data }) => {

    //   console.log(data.data)
      setNewBirth(data.data)
      setLoading(false)
    }).catch((err) => {
      setLoading(true)
    })
  }, [])
  const pageCount = Math.ceil(newBirth.length/userPerpage)
const changePage = ({selected})=>{
setPageNumber(selected)
}

function openSelected(){
  setIsSelected((previsSelected)=>!previsSelected)
}
function openSelectedReport (birth){
setSelectedReport(birth)
  openSelected()
}

function openDelete(){
  setDeletee(!deletee)
}


  const ComponentPDF = useRef()
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "New-Birth-report",
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
      {deletee &&<DeleteBirth birth={selectedReport} openDelete={openDelete}/>}
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
                  <p>Birth Date</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Birth weight(kg)</p>
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

export default NewBirthReport
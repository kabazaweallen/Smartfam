import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineFilter } from 'react-icons/ai'
import { FaEdit, FaSort, FaTrash } from 'react-icons/fa'
import axiosclient from '../../../axiosClient'
import "../TreatmentReport/TreatmentReport.css"
import { useReactToPrint } from 'react-to-print'
import SelectedReport from '../TreatmentReport/SelectedReport'
import DeleteBull from './deleteBull'
import ReactPaginate from 'react-paginate'


function Bull() {
  const [bullCOw, setBullCOw] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReport,setSelectedReport]=useState(null)
  const[deletee,setDeletee]=useState(false)
  const[isSelected,setIsSelected]=useState(false)
  const[pageNumber,setPageNumber]=useState(0)
   const userPerpage =10
   const pageVisited =pageNumber * userPerpage 



   const displayUser = bullCOw.slice(pageVisited,pageVisited + userPerpage)?.map((bull) => (
    <tr key={bull._id}>
      <input type="checkbox" onClick={()=>openSelectedReport(bull)} />
      <td>{bull.earTag}</td>
      <td>{bull.promotionDate}</td>
     
    </tr>
  ))

  useEffect(() => {
    axiosclient.get('/api/v1/Report/getPromoted').then(({ data }) => {
      setBullCOw(data.data)
      // console.log(data.data)
      setLoading(false)
    }).catch((err) => {
      setLoading(true)
    })
  }, [])

  const pageCount = Math.ceil(bullCOw.length/userPerpage)
  const changePage = ({selected})=>{
  setPageNumber(selected)
  }
  
  function openSelected(){
    setIsSelected((previsSelected)=>!previsSelected)
  }
  function openSelectedReport (bull){
  setSelectedReport(bull)
    openSelected()
  }
  
  function openDelete(){
    setDeletee(!deletee)
  }

//function to delete component
  const ComponentPDF = useRef()
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "Bull/CowReport",
    // onAfterPrint: () => {
    //   Notiflix.Notify.success("Report downladed succesfully");
    // }
  })

  return (
    <div className='cattles-manage-wrapper'>
      <div className="report-title-wrapper">
        <p>Promote to Cow/Bull Report</p>
        <div className="download-button">
          <button className='btn-download' onClick={generatePDF}> Download Report</button>
        </div>
      </div>
      {deletee &&<DeleteBull bull={selectedReport} openDelete={openDelete}/>}
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
                  <FaSort />
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
                  <p>Promoted Date</p>
                  {/* <FaSort /> */}
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

export default Bull